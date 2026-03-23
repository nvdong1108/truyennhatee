import { User, Role } from './types';

const STORAGE_KEY = 'truyennhatee_user';

// Hardcoded accounts
const HARDCODED_ACCOUNTS: Record<string, { password: string; role: Role; gems: number }> = {
  vip: { password: 'vip123', role: 'VIP', gems: 0 },
  demo: { password: 'demo123', role: 'MEMBER', gems: 50000 },
};

export function getStoredUser(): User | null {
  if (typeof window === 'undefined') return null;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

export function saveUser(user: User): void {
  if (typeof window === 'undefined') return;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(user));
}

export function clearUser(): void {
  if (typeof window === 'undefined') return;
  localStorage.removeItem(STORAGE_KEY);
}

export function login(username: string, password: string): User | null {
  const lowerUsername = username.toLowerCase();
  const hardcoded = HARDCODED_ACCOUNTS[lowerUsername];

  if (hardcoded && hardcoded.password === password) {
    const user: User = {
      userId: lowerUsername,
      username: lowerUsername,
      role: hardcoded.role,
      gems: hardcoded.gems,
      unlockedStoryIds: [],
    };
    // Check if there's already stored state for this user (to preserve gems/unlocks)
    const storedUsers = getStoredRegisteredUsers();
    const existingStored = storedUsers[lowerUsername];
    if (existingStored) {
      user.gems = existingStored.gems;
      user.unlockedStoryIds = existingStored.unlockedStoryIds;
    }
    saveUser(user);
    return user;
  }

  // Check registered users
  const registeredUsers = getStoredRegisteredUsers();
  const registeredUser = registeredUsers[lowerUsername];
  if (registeredUser && registeredUser.password === password) {
    const user: User = {
      userId: registeredUser.userId,
      username: registeredUser.username,
      role: registeredUser.role,
      gems: registeredUser.gems,
      unlockedStoryIds: registeredUser.unlockedStoryIds,
    };
    saveUser(user);
    return user;
  }

  return null;
}

interface RegisteredUserData {
  userId: string;
  username: string;
  password: string;
  role: Role;
  gems: number;
  unlockedStoryIds: string[];
}

function getStoredRegisteredUsers(): Record<string, RegisteredUserData> {
  if (typeof window === 'undefined') return {};
  try {
    const raw = localStorage.getItem('truyennhatee_registered_users');
    return raw ? JSON.parse(raw) : {};
  } catch {
    return {};
  }
}

function saveRegisteredUsers(users: Record<string, RegisteredUserData>): void {
  if (typeof window === 'undefined') return;
  localStorage.setItem('truyennhatee_registered_users', JSON.stringify(users));
}

export function register(username: string, password: string): { success: boolean; error?: string } {
  const lowerUsername = username.toLowerCase();

  if (HARDCODED_ACCOUNTS[lowerUsername]) {
    return { success: false, error: 'Tên đăng nhập đã tồn tại' };
  }

  const registeredUsers = getStoredRegisteredUsers();
  if (registeredUsers[lowerUsername]) {
    return { success: false, error: 'Tên đăng nhập đã tồn tại' };
  }

  const newUser: RegisteredUserData = {
    userId: `user_${Date.now()}`,
    username: lowerUsername,
    password,
    role: 'MEMBER',
    gems: 50000,
    unlockedStoryIds: [],
  };

  registeredUsers[lowerUsername] = newUser;
  saveRegisteredUsers(registeredUsers);

  const user: User = {
    userId: newUser.userId,
    username: newUser.username,
    role: newUser.role,
    gems: newUser.gems,
    unlockedStoryIds: newUser.unlockedStoryIds,
  };
  saveUser(user);

  return { success: true };
}

export function updateUserData(user: User): void {
  saveUser(user);
  // Also update in registered users storage if applicable
  const registeredUsers = getStoredRegisteredUsers();
  const lowerUsername = user.username.toLowerCase();
  if (registeredUsers[lowerUsername]) {
    registeredUsers[lowerUsername].gems = user.gems;
    registeredUsers[lowerUsername].unlockedStoryIds = user.unlockedStoryIds;
    saveRegisteredUsers(registeredUsers);
  } else if (HARDCODED_ACCOUNTS[lowerUsername]) {
    // For hardcoded accounts, store their updated data
    const existingReg = registeredUsers[lowerUsername];
    const base: RegisteredUserData = existingReg || {
      userId: lowerUsername,
      username: lowerUsername,
      password: HARDCODED_ACCOUNTS[lowerUsername].password,
      role: HARDCODED_ACCOUNTS[lowerUsername].role,
      gems: user.gems,
      unlockedStoryIds: user.unlockedStoryIds,
    };
    registeredUsers[lowerUsername] = {
      ...base,
      gems: user.gems,
      unlockedStoryIds: user.unlockedStoryIds,
    };
    saveRegisteredUsers(registeredUsers);
  }
}

export function canReadChapter(user: User | null, storyId: string, chapterNumber: number): boolean {
  if (!user) return chapterNumber <= 10;
  if (user.role === 'VIP') return true;
  if (user.role === 'MEMBER') {
    return chapterNumber <= 10 || user.unlockedStoryIds.includes(storyId);
  }
  return false;
}

export const UNLOCK_COST = 35000;
