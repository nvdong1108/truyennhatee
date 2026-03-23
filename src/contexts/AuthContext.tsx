'use client';

import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { User } from '@/lib/types';
import {
  getStoredUser,
  login as authLogin,
  requestRegistrationOtp as authRequestRegistrationOtp,
  register as authRegister,
  clearUser,
  updateUserData,
  canReadChapter as authCanRead,
  UNLOCK_COST,
} from '@/lib/auth';

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  login: (username: string, password: string) => Promise<{ success: boolean; error?: string }>;
  requestRegistrationOtp: (
    contact: string
  ) => Promise<{ success: boolean; error?: string; resendInSeconds?: number; otpPreview?: string }>;
  register: (contact: string, password: string, otp: string) => Promise<{ success: boolean; error?: string }>;
  logout: () => void;
  canReadChapter: (storyId: string, chapterNumber: number) => boolean;
  unlockStory: (storyId: string) => { success: boolean; error?: string };
}

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const stored = getStoredUser();
    setUser(stored);
    setIsLoading(false);
  }, []);

  const login = useCallback(
    async (username: string, password: string): Promise<{ success: boolean; error?: string }> => {
      const result = authLogin(username, password);
      if (result) {
        setUser(result);
        return { success: true };
      }
      return { success: false, error: 'Tên đăng nhập hoặc mật khẩu không đúng' };
    },
    []
  );

  const requestRegistrationOtp = useCallback(
    async (
      contact: string
    ): Promise<{ success: boolean; error?: string; resendInSeconds?: number; otpPreview?: string }> => {
      return authRequestRegistrationOtp(contact);
    },
    []
  );

  const register = useCallback(
    async (contact: string, password: string, otp: string): Promise<{ success: boolean; error?: string }> => {
      const result = authRegister(contact, password, otp);
      if (result.success) {
        const stored = getStoredUser();
        setUser(stored);
      }
      return result;
    },
    []
  );

  const logout = useCallback(() => {
    clearUser();
    setUser(null);
  }, []);

  const canReadChapter = useCallback(
    (storyId: string, chapterNumber: number): boolean => {
      return authCanRead(user, storyId, chapterNumber);
    },
    [user]
  );

  const unlockStory = useCallback(
    (storyId: string): { success: boolean; error?: string } => {
      if (!user) return { success: false, error: 'Vui lòng đăng nhập' };
      if (user.role === 'VIP') return { success: true };
      if (user.unlockedStoryIds.includes(storyId)) return { success: true };
      if (user.gems < UNLOCK_COST) {
        return { success: false, error: 'Không đủ ngọc. Vui lòng nạp thêm.' };
      }

      const updatedUser: User = {
        ...user,
        gems: user.gems - UNLOCK_COST,
        unlockedStoryIds: [...user.unlockedStoryIds, storyId],
      };
      updateUserData(updatedUser);
      setUser(updatedUser);
      return { success: true };
    },
    [user]
  );

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        login,
        requestRegistrationOtp,
        register,
        logout,
        canReadChapter,
        unlockStory,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth(): AuthContextType {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}
