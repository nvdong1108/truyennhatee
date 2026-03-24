import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/authOptions';
import dbConnect from '@/lib/mongoose';
import { User } from '@/models/User';
import { UNLOCK_COST } from '@/lib/auth';

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);
  
  if (!session || !session.user) {
    return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
  }

  const body = await req.json();
  const { storyId } = body;

  if (!storyId) {
    return NextResponse.json({ success: false, error: 'Missing storyId' }, { status: 400 });
  }

  const providerAccountId = (session.user as any).providerAccountId;

  await dbConnect();
  const user = await User.findOne({ providerAccountId });

  if (!user) {
    return NextResponse.json({ success: false, error: 'User not found' }, { status: 404 });
  }

  if (user.role === 'VIP' || user.unlockedStoryIds.includes(storyId)) {
    return NextResponse.json({ success: true });
  }

  if (user.gems < UNLOCK_COST) {
    return NextResponse.json({ success: false, error: 'Không đủ ngọc. Vui lòng nạp thêm.' }, { status: 400 });
  }

  user.gems -= UNLOCK_COST;
  user.unlockedStoryIds.push(storyId);
  await user.save();

  return NextResponse.json({ success: true });
}
