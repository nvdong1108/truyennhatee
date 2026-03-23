'use client';

import { useState, FormEvent } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';

export default function RegisterPage() {
  const { register } = useAuth();
  const router = useRouter();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!username.trim() || !password.trim()) {
      setError('Vui lòng nhập đầy đủ thông tin');
      return;
    }
    if (username.trim().length < 3) {
      setError('Tên đăng nhập phải có ít nhất 3 ký tự');
      return;
    }
    if (password.length < 6) {
      setError('Mật khẩu phải có ít nhất 6 ký tự');
      return;
    }
    if (password !== confirm) {
      setError('Mật khẩu xác nhận không khớp');
      return;
    }

    setIsLoading(true);
    setError('');
    const result = await register(username.trim(), password);
    if (result.success) {
      router.push('/');
    } else {
      setError(result.error || 'Đăng ký thất bại');
    }
    setIsLoading(false);
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <div className="bg-gray-900 border border-gray-800 rounded-2xl p-8 shadow-2xl">
          <div className="text-center mb-8">
            <h1 className="text-2xl font-bold text-white mb-2">Đăng Ký</h1>
            <p className="text-gray-500 text-sm">Tạo tài khoản để nhận ngay <span className="text-amber-400 font-semibold">50,000 💎</span></p>
          </div>

          {/* Benefits */}
          <div className="bg-amber-900/20 border border-amber-700/30 rounded-xl p-3 mb-6 text-xs text-amber-300/80">
            <p className="font-semibold text-amber-400 mb-1">🎁 Ưu đãi thành viên mới:</p>
            <p>• Nhận ngay 50,000 💎 ngọc miễn phí</p>
            <p>• Mở khóa truyện chỉ 35,000 💎/truyện</p>
            <p>• Theo dõi lịch sử đọc truyện</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1.5">
                Tên đăng nhập
              </label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full bg-gray-800 border border-gray-600 text-gray-100 placeholder-gray-500 rounded-xl px-4 py-3 focus:outline-none focus:border-orange-500 transition-colors"
                placeholder="Nhập tên đăng nhập (tối thiểu 3 ký tự)"
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
                placeholder="Nhập mật khẩu (tối thiểu 6 ký tự)"
                autoComplete="new-password"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1.5">
                Xác nhận mật khẩu
              </label>
              <input
                type="password"
                value={confirm}
                onChange={(e) => setConfirm(e.target.value)}
                className="w-full bg-gray-800 border border-gray-600 text-gray-100 placeholder-gray-500 rounded-xl px-4 py-3 focus:outline-none focus:border-orange-500 transition-colors"
                placeholder="Nhập lại mật khẩu"
                autoComplete="new-password"
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
              {isLoading ? 'Đang tạo tài khoản...' : 'Đăng Ký Miễn Phí'}
            </button>
          </form>

          <p className="text-center text-sm text-gray-500 mt-6">
            Đã có tài khoản?{' '}
            <Link href="/login" className="text-orange-400 hover:text-orange-300 font-medium">
              Đăng nhập
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
