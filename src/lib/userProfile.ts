'use client';

import { doc, getDoc, serverTimestamp, setDoc, updateDoc, arrayUnion, increment } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { User } from '@/lib/types';

export const INITIAL_MEMBER_GEMS = 1000;

export async function getOrCreateUserProfile(params: {
  uid: string;
  email?: string | null;
  displayName?: string | null;
  photoURL?: string | null;
}): Promise<User> {
  const ref = doc(db, 'users', params.uid);
  const snap = await getDoc(ref);

  if (snap.exists()) return snap.data() as User;

  const username =
    (params.displayName || (params.email ? params.email.split('@')[0] : null) || `user_${params.uid.slice(0, 6)}`)
      .trim()
      .toLowerCase();

  const newUser: User = {
    userId: params.uid,
    username,
    email: params.email || undefined,
    role: 'MEMBER',
    gems: INITIAL_MEMBER_GEMS,
    unlockedStoryIds: [],
  };

  await setDoc(ref, { ...newUser, createdAt: serverTimestamp(), updatedAt: serverTimestamp() });
  return newUser;
}

export async function unlockStoryForUser(uid: string, storyId: string, cost: number): Promise<void> {
  const ref = doc(db, 'users', uid);
  await updateDoc(ref, {
    gems: increment(-cost),
    unlockedStoryIds: arrayUnion(storyId),
    updatedAt: serverTimestamp(),
  });
}