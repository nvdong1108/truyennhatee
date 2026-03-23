'use client';

import { useState, FormEvent } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';

export default function LoginPage() {
  const { login } = useAuth();
  const router = useRouter();
  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!identifier.trim() || !password.trim()) {
      setError('Vui lòng nhập đầy đủ thông tin');
      return;
    }
    setIsLoading(true);
    setError('');
    const result = await login(identifier.trim(), password);
    if (result.success) {
      router.push('/');
    } else {
      setError(result.error || 'Đăng nhập thất bại');
    }
    setIsLoading(false);
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <div className="bg-gray-900 border border-gray-800 rounded-2xl p-8 shadow-2xl">
          <div className="text-center mb-8">
            <h1 className="text-2xl font-bold text-white mb-2">Đăng Nhập</h1>
            <p className="text-gray-500 text-sm">Chào mừng bạn trở lại TruyệnNhàTee</p>
          </div>

          {/* Demo accounts hint */}
          <div className="bg-gray-800/60 border border-gray-700 rounded-xl p-3 mb-6 text-xs text-gray-400">
            <p className="font-semibold text-gray-300 mb-1">💡 Tài khoản demo:</p>
            <p>• <span className="text-orange-400">demo</span> / demo123 (MEMBER, 50k ngọc)</p>
            <p>• <span className="text-amber-400">vip</span> / vip123 (VIP, đọc tất cả)</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1.5">
                Tên đăng nhập / Email / Số điện thoại
              </label>
              <input
                type="text"
                value={identifier}
                onChange={(e) => setIdentifier(e.target.value)}
                className="w-full bg-gray-800 border border-gray-600 text-gray-100 placeholder-gray-500 rounded-xl px-4 py-3 focus:outline-none focus:border-orange-500 transition-colors"
                placeholder="Nhập username, email hoặc số điện thoại"
                autoComplete="username"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1.5">
                Mật khẩu
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-gray-800 border border-gray-600 text-gray-100 placeholder-gray-500 rounded-xl px-4 py-3 focus:outline-none focus:border-orange-500 transition-colors"
                placeholder="Nhập mật khẩu"
                autoComplete="current-password"
              />
            </div>

            {error && (
              <p className="text-red-400 text-sm bg-red-900/20 border border-red-800/30 rounded-lg px-3 py-2">
                {error}
              </p>
            )}

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-orange-500 hover:bg-orange-600 disabled:opacity-60 text-white font-semibold py-3 rounded-xl transition-colors mt-2"
            >
              {isLoading ? 'Đang đăng nhập...' : 'Đăng Nhập'}
            </button>
          </form>

          <p className="text-center text-sm text-gray-500 mt-6">
            Chưa có tài khoản?{' '}
            <Link href="/register" className="text-orange-400 hover:text-orange-300 font-medium">
              Đăng ký ngay
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
