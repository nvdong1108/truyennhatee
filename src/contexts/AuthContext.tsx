'use client';

import React, { createContext, useContext, useEffect, useMemo, useState, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { useSession, signOut, SessionProvider } from 'next-auth/react';
import { User } from '@/lib/types';
import { canReadChapter as canReadChapterRule, UNLOCK_COST } from '@/lib/auth';

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  logout: () => Promise<void>;
  canReadChapter: (storyId: string, chapterNumber: number) => boolean;
  unlockStory: (storyId: string) => Promise<{ success: boolean; error?: string }>;
  refreshProfile: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | null>(null);

function AuthProviderContent({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const { data: session, status } = useSession();
  const [user, setUser] = useState<User | null>(null);
  const [isProfileLoading, setIsProfileLoading] = useState(true);

  const fetchProfile = async () => {
    try {
      const res = await fetch('/api/user/profile');
      if (res.ok) {
        const data = await res.json();
        setUser(data);
      } else {
        setUser(null);
      }
    } catch {
      setUser(null);
    }
  };

  const refreshProfile = useCallback(async () => {
    await fetchProfile();
  }, []);

  useEffect(() => {
    if (status === 'loading') {
      setIsProfileLoading(true);
      return;
    }

    if (status === 'authenticated') {
      fetchProfile().finally(() => setIsProfileLoading(false));
    } else {
      setUser(null);
      setIsProfileLoading(false);
    }
  }, [status]);

  const logout = useCallback(async () => {
    await signOut({ redirect: false });
    setUser(null);
    router.push('/');
  }, [router]);

  const canReadChapter = useCallback(
    (storyId: string, chapterNumber: number) => {
      // Ép kiểu user về cấu trúc cũ để logic cũ hiểu
      return canReadChapterRule(user as any, storyId, chapterNumber);
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
        const res = await fetch('/api/user/unlock', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ storyId, cost: UNLOCK_COST })
        });
        
        const data = await res.json();
        if (data.success) {
          await refreshProfile();
          return { success: true };
        } else {
          return { success: false, error: data.error || 'Mở khóa thất bại' };
        }
      } catch (e: any) {
        return { success: false, error: e?.message || 'Lỗi mạng khi mở khóa' };
      }
    },
    [user, refreshProfile]
  );

  const isLoading = status === 'loading' || isProfileLoading;

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

export function AuthProvider({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider>
      <AuthProviderContent>{children}</AuthProviderContent>
    </SessionProvider>
  );
}

export function useAuth(): AuthContextType {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}