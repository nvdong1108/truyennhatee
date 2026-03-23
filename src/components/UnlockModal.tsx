'use client';

import { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { UNLOCK_COST } from '@/lib/auth';

interface UnlockModalProps {
  storyId: string;
  storyTitle: string;
  onClose: () => void;
  onSuccess: () => void;
}

export default function UnlockModal({ storyId, storyTitle, onClose, onSuccess }: UnlockModalProps) {
  const { user, unlockStory } = useAuth();
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState('');

  if (!user) return null;

  const hasEnoughGems = user.gems >= UNLOCK_COST;

  const handleUnlock = async () => {
    setIsProcessing(true);
    setError('');
    const result = unlockStory(storyId);
    if (result.success) {
      onSuccess();
    } else {
      setError(result.error || 'Có lỗi xảy ra');
    }
    setIsProcessing(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={onClose} />

      {/* Modal */}
      <div className="relative bg-gray-900 border border-gray-700 rounded-2xl p-8 max-w-md w-full shadow-2xl">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-300 transition-colors"
        >
          ✕
        </button>

        <div className="text-center mb-6">
          <div className="text-5xl mb-4">🔓</div>
          <h2 className="text-xl font-bold text-white mb-1">Mở Khóa Truyện</h2>
          <p className="text-gray-400 text-sm">{storyTitle}</p>
        </div>

        <div className="bg-gray-800 rounded-xl p-4 mb-6">
          <div className="flex justify-between items-center mb-2">
            <span className="text-gray-400 text-sm">Chi phí mở khóa</span>
            <span className="text-amber-400 font-bold">💎 {UNLOCK_COST.toLocaleString('vi-VN')}</span>
          </div>
          <div className="flex justify-between items-center mb-2">
            <span className="text-gray-400 text-sm">Số dư của bạn</span>
            <span className={`font-semibold ${hasEnoughGems ? 'text-green-400' : 'text-red-400'}`}>
              💎 {user.gems.toLocaleString('vi-VN')}
            </span>
          </div>
          {hasEnoughGems && (
            <div className="flex justify-between items-center pt-2 border-t border-gray-700">
              <span className="text-gray-400 text-sm">Số dư sau khi mở</span>
              <span className="text-gray-300 font-semibold">
                💎 {(user.gems - UNLOCK_COST).toLocaleString('vi-VN')}
              </span>
            </div>
          )}
        </div>

        {error && (
          <p className="text-red-400 text-sm text-center mb-4">{error}</p>
        )}

        {hasEnoughGems ? (
          <div className="flex gap-3">
            <button
              onClick={onClose}
              className="flex-1 bg-gray-700 hover:bg-gray-600 text-gray-200 font-semibold py-3 rounded-xl transition-colors"
            >
              Hủy
            </button>
            <button
              onClick={handleUnlock}
              disabled={isProcessing}
              className="flex-1 bg-orange-500 hover:bg-orange-600 disabled:opacity-60 text-white font-semibold py-3 rounded-xl transition-colors"
            >
              {isProcessing ? 'Đang xử lý...' : 'Xác nhận mở khóa'}
            </button>
          </div>
        ) : (
          <div className="text-center">
            <p className="text-red-400 text-sm mb-4">
              Bạn cần thêm 💎 {(UNLOCK_COST - user.gems).toLocaleString('vi-VN')} ngọc
            </p>
            <button
              onClick={onClose}
              className="w-full bg-amber-500 hover:bg-amber-600 text-white font-semibold py-3 rounded-xl transition-colors"
            >
              💎 Nạp Ngọc (Mock)
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
