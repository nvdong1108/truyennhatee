import { User, Role } from './types';

const STORAGE_KEY = 'truyennhatee_user';
const REGISTERED_USERS_KEY = 'truyennhatee_registered_users';
const REGISTRATION_OTP_KEY = 'truyennhatee_registration_otps';
const OTP_EXPIRES_MS = 5 * 60 * 1000;
const OTP_RESEND_COOLDOWN_MS = 60 * 1000;
const OTP_MAX_ATTEMPTS = 5;

// Hardcoded accounts
const HARDCODED_ACCOUNTS: Record<string, { password: string; role: Role; gems: number }> = {
  vip: { password: 'vip123', role: 'VIP', gems: 0 },
  demo: { password: 'demo123', role: 'MEMBER', gems: 50000 },
};

interface RegisteredUserData {
  userId: string;
  username: string;
  email?: string;
  phone?: string;
  password: string;
  role: Role;
  gems: number;
  unlockedStoryIds: string[];
}

interface OtpRecord {
  target: string;
  channel: 'email' | 'phone';
  otp: string;
  expiresAt: number;
  attempts: number;
  lastSentAt: number;
}

interface ParsedIdentifier {
  kind: 'username' | 'email' | 'phone';
  value: string;
}

function normalizePhone(raw: string): string {
  const trimmed = raw.trim();
  const hasPlus = trimmed.startsWith('+');
  const digits = trimmed.replace(/\D/g, '');
  return hasPlus ? `+${digits}` : digits;
}

function parseIdentifier(raw: string): ParsedIdentifier {
  const input = raw.trim();
  const lower = input.toLowerCase();

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (emailRegex.test(lower)) {
    return { kind: 'email', value: lower };
  }

  const normalizedPhone = normalizePhone(input);
  const phoneRegex = /^\+?\d{9,15}$/;
  if (phoneRegex.test(normalizedPhone)) {
    return { kind: 'phone', value: normalizedPhone };
  }

  return { kind: 'username', value: lower };
}

function parseRegistrationContact(raw: string):
  | { success: true; kind: 'email' | 'phone'; value: string }
  | { success: false; error: string } {
  const parsed = parseIdentifier(raw);
  if (parsed.kind === 'username') {
    return { success: false, error: 'Vui lòng nhập email hoặc số điện thoại hợp lệ' };
  }
  return { success: true, kind: parsed.kind, value: parsed.value };
}

function getStoredRegisteredUsers(): Record<string, RegisteredUserData> {
  if (typeof window === 'undefined') return {};
  try {
    const raw = localStorage.getItem(REGISTERED_USERS_KEY);
    return raw ? JSON.parse(raw) : {};
  } catch {
    return {};
  }
}

function saveRegisteredUsers(users: Record<string, RegisteredUserData>): void {
  if (typeof window === 'undefined') return;
  localStorage.setItem(REGISTERED_USERS_KEY, JSON.stringify(users));
}

function getStoredOtps(): Record<string, OtpRecord> {
  if (typeof window === 'undefined') return {};
  try {
    const raw = localStorage.getItem(REGISTRATION_OTP_KEY);
    return raw ? JSON.parse(raw) : {};
  } catch {
    return {};
  }
}

function saveStoredOtps(otps: Record<string, OtpRecord>): void {
  if (typeof window === 'undefined') return;
  localStorage.setItem(REGISTRATION_OTP_KEY, JSON.stringify(otps));
}

function findRegisteredUserByIdentifier(
  users: Record<string, RegisteredUserData>,
  parsed: ParsedIdentifier
): RegisteredUserData | null {
  if (parsed.kind === 'username') {
    return users[parsed.value] || null;
  }

  const match = Object.values(users).find((user) =>
    parsed.kind === 'email' ? user.email === parsed.value : user.phone === parsed.value
  );

  return match || null;
}

function userExistsByContact(users: Record<string, RegisteredUserData>, target: string): boolean {
  return Object.values(users).some((user) => user.email === target || user.phone === target);
}

function generateOtp(): string {
  return String(Math.floor(100000 + Math.random() * 900000));
}

function buildUsernameFromContact(
  contactValue: string,
  kind: 'email' | 'phone',
  users: Record<string, RegisteredUserData>
): string {
  const base =
    kind === 'email'
      ? contactValue.split('@')[0].replace(/[^a-z0-9]/gi, '').toLowerCase()
      : `user${contactValue.replace(/\D/g, '').slice(-6)}`;

  const fallbackBase = base.length >= 3 ? base : 'user';
  let candidate = fallbackBase;
  let i = 1;

  while (HARDCODED_ACCOUNTS[candidate] || users[candidate]) {
    candidate = `${fallbackBase}${i}`;
    i += 1;
  }

  return candidate;
}

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

export function requestRegistrationOtp(
  contact: string
): { success: boolean; error?: string; resendInSeconds?: number; otpPreview?: string } {
  const parsed = parseRegistrationContact(contact);
  if (!parsed.success) return { success: false, error: parsed.error };

  const registeredUsers = getStoredRegisteredUsers();
  if (userExistsByContact(registeredUsers, parsed.value)) {
    return { success: false, error: 'Email hoặc số điện thoại đã được đăng ký' };
  }

  const now = Date.now();
  const otps = getStoredOtps();
  const existing = otps[parsed.value];
  if (existing && now - existing.lastSentAt < OTP_RESEND_COOLDOWN_MS) {
    const remaining = Math.ceil((OTP_RESEND_COOLDOWN_MS - (now - existing.lastSentAt)) / 1000);
    return {
      success: false,
      error: `Vui lòng chờ ${remaining} giây để gửi lại OTP`,
      resendInSeconds: remaining,
    };
  }

  const otp = generateOtp();
  otps[parsed.value] = {
    target: parsed.value,
    channel: parsed.kind,
    otp,
    expiresAt: now + OTP_EXPIRES_MS,
    attempts: 0,
    lastSentAt: now,
  };
  saveStoredOtps(otps);

  // Demo app: expose OTP for local testing.
  return { success: true, otpPreview: otp };
}

export function register(
  contact: string,
  password: string,
  otp: string
): { success: boolean; error?: string } {
  const parsed = parseRegistrationContact(contact);
  if (!parsed.success) return { success: false, error: parsed.error };

  if (password.length < 6) {
    return { success: false, error: 'Mật khẩu phải có ít nhất 6 ký tự' };
  }

  if (!/^\d{6}$/.test(otp)) {
    return { success: false, error: 'OTP phải gồm 6 chữ số' };
  }

  const otps = getStoredOtps();
  const otpRecord = otps[parsed.value];
  if (!otpRecord) {
    return { success: false, error: 'Vui lòng yêu cầu mã OTP trước khi đăng ký' };
  }

  if (Date.now() > otpRecord.expiresAt) {
    delete otps[parsed.value];
    saveStoredOtps(otps);
    return { success: false, error: 'Mã OTP đã hết hạn. Vui lòng yêu cầu mã mới' };
  }

  if (otpRecord.attempts >= OTP_MAX_ATTEMPTS) {
    return { success: false, error: 'Bạn đã nhập sai OTP quá nhiều lần. Vui lòng yêu cầu mã mới' };
  }

  if (otpRecord.otp !== otp) {
    otpRecord.attempts += 1;
    otps[parsed.value] = otpRecord;
    saveStoredOtps(otps);
    return { success: false, error: 'Mã OTP không chính xác' };
  }

  delete otps[parsed.value];
  saveStoredOtps(otps);

  const registeredUsers = getStoredRegisteredUsers();
  if (userExistsByContact(registeredUsers, parsed.value)) {
    return { success: false, error: 'Email hoặc số điện thoại đã được đăng ký' };
  }

  const username = buildUsernameFromContact(parsed.value, parsed.kind, registeredUsers);
  const newUser: RegisteredUserData = {
    userId: `user_${Date.now()}`,
    username,
    email: parsed.kind === 'email' ? parsed.value : undefined,
    phone: parsed.kind === 'phone' ? parsed.value : undefined,
    password,
    role: 'MEMBER',
    gems: 50000,
    unlockedStoryIds: [],
  };

  registeredUsers[username] = newUser;
  saveRegisteredUsers(registeredUsers);

  const user: User = {
    userId: newUser.userId,
    username: newUser.username,
    email: newUser.email,
    phone: newUser.phone,
    role: newUser.role,
    gems: newUser.gems,
    unlockedStoryIds: newUser.unlockedStoryIds,
  };
  saveUser(user);

  return { success: true };
}

export function login(identifier: string, password: string): User | null {
  const parsed = parseIdentifier(identifier);
  const lookupValue = parsed.value;
  const hardcoded = parsed.kind === 'username' ? HARDCODED_ACCOUNTS[lookupValue] : undefined;

  if (hardcoded && hardcoded.password === password) {
    const user: User = {
      userId: lookupValue,
      username: lookupValue,
      role: hardcoded.role,
      gems: hardcoded.gems,
      unlockedStoryIds: [],
    };

    const storedUsers = getStoredRegisteredUsers();
    const existingStored = storedUsers[lookupValue];
    if (existingStored) {
      user.gems = existingStored.gems;
      user.unlockedStoryIds = existingStored.unlockedStoryIds;
    }

    saveUser(user);
    return user;
  }

  const registeredUsers = getStoredRegisteredUsers();
  const registeredUser = findRegisteredUserByIdentifier(registeredUsers, parsed);
  if (registeredUser && registeredUser.password === password) {
    const user: User = {
      userId: registeredUser.userId,
      username: registeredUser.username,
      email: registeredUser.email,
      phone: registeredUser.phone,
      role: registeredUser.role,
      gems: registeredUser.gems,
      unlockedStoryIds: registeredUser.unlockedStoryIds,
    };
    saveUser(user);
    return user;
  }

  return null;
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
