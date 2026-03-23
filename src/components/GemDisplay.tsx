import { Role } from '@/lib/types';

interface GemDisplayProps {
  gems: number;
  role: Role;
}

export default function GemDisplay({ gems, role }: GemDisplayProps) {
  if (role === 'VIP') {
    return (
      <span className="flex items-center gap-1 bg-gradient-to-r from-yellow-600 to-amber-500 text-white text-xs font-bold px-3 py-1 rounded-full">
        👑 VIP
      </span>
    );
  }

  return (
    <span className="flex items-center gap-1 bg-gray-800 text-amber-400 text-xs font-semibold px-3 py-1 rounded-full border border-amber-700">
      💎 {gems.toLocaleString('vi-VN')}
    </span>
  );
}
