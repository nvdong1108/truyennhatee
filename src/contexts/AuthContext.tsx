'use client';

import React, { createContext, useContext, useEffect, useMemo, useState, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { User } from '@/lib/types';
import { canReadChapter as canReadChapterRule, UNLOCK_COST } from '@/lib/auth';
import { signOutFirebase, subscribeToAuthState } from '@/lib/firebaseAuth';
import { getOrCreateUserProfile, unlockStoryForUser } from '@/lib/userProfile';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase';

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  logout: () => Promise<void>;
  canReadChapter: (storyId: string, chapterNumber: number) => boolean;
  unlockStory: (storyId: string) => Promise<{ success: boolean; error?: string }>;
  refreshProfile: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const refreshProfile = useCallback(async () => {
    if (!user?.userId) return;
    const ref = doc(db, 'users', user.userId);
    const snap = await getDoc(ref);
    if (snap.exists()) setUser(snap.data() as User);
  }, [user?.userId]);

  useEffect(() => {
    const unsub = subscribeToAuthState(async (fbUser: any) => {
      try {
        setIsLoading(true);

        if (!fbUser) {
          setUser(null);
          return;
        }

        const profile = await getOrCreateUserProfile({
          uid: fbUser.uid,
          email: fbUser.email,
          displayName: fbUser.displayName,
          photoURL: fbUser.photoURL,
        });

        setUser(profile);
      } finally {
        setIsLoading(false);
      }
    });

    return () => {
      if (typeof unsub === 'function') unsub();
    };
  }, []);

  const logout = useCallback(async () => {
    await signOutFirebase();
    setUser(null);
    router.push('/');
  }, [router]);

  const canReadChapter = useCallback(
    (storyId: string, chapterNumber: number) => {
      return canReadChapterRule(user, storyId, chapterNumber);
    },
    [user]
  );

  const unlockStory = useCallback(
    async (storyId: string): Promise<{ success: boolean; error?: string }> => {
      if (!user) return { success: false, error: 'Vui lòng đăng nhập' };
      if (user.role === 'VIP') return { success: true };
      if (user.unlockedStoryIds.includes(storyId)) return { success: true };
      if (user.gems < UNLOCK_COST) return { success: false, error: 'Không đủ ngọc. Vui lòng nạp thêm.' };

      try {
        await unlockStoryForUser(user.userId, storyId, UNLOCK_COST);

        // refresh local state
        const ref = doc(db, 'users', user.userId);
        const snap = await getDoc(ref);
        if (snap.exists()) setUser(snap.data() as User);

        return { success: true };
      } catch (e: any) {
        return { success: false, error: e?.message || 'Mở khóa thất bại' };
      }
    },
    [user]
  );

  const value = useMemo(
    () => ({
      user,
      isLoading,
      logout,
      canReadChapter,
      unlockStory,
      refreshProfile,
    }),
    [user, isLoading, logout, canReadChapter, unlockStory, refreshProfile]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth(): AuthContextType {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}