'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { signInWithGoogle } from '@/lib/firebaseAuth';
import { useAuth } from '@/contexts/AuthContext';

export default function LoginPage() {
  const router = useRouter();
  const { user, isLoading } = useAuth();
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    if (!isLoading && user) router.push('/');
  }, [user, isLoading, router]);

  const handleGoogle = async () => {
    setBusy(true);
    setError('');
    try {
      await signInWithGoogle();
      router.push('/');
    } catch (e: any) {
      setError(e?.message || 'Đăng nhập Google thất bại');
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="min-h-[80vh] flex items-start justify-center px-4 pt-10 bg-gradient-to-b from-sky-50 to-white">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
          <div className="px-6 py-8 text-center">
            <h1 className="text-4xl font-extrabold text-gray-800">Đăng nhập</h1>
            <p className="mt-2 text-gray-500">Sử dụng tài khoản mạng xã hội của bạn</p>

            <button
              onClick={handleGoogle}
              disabled={busy}
              className="mt-8 w-full flex items-center justify-center gap-3 rounded-xl bg-red-500 hover:bg-red-600 disabled:opacity-60 text-white font-semibold py-4 transition-colors"
            >
              <span className="inline-flex items-center justify-center w-10 h-10 bg-white/15 rounded-lg">
                <span className="text-xl font-black">G</span>
              </span>
              <span>{busy ? 'Đang đăng nhập...' : 'Đăng nhập với Google'}</span>
            </button>

            {error && (
              <p className="mt-4 text-sm text-red-600 bg-red-50 border border-red-100 rounded-lg px-3 py-2">
                {error}
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}