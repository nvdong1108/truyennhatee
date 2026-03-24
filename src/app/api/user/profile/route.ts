import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/authOptions';
import dbConnect from '@/lib/mongoose';
import { User } from '@/models/User';

export async function GET() {
  const session = await getServerSession(authOptions);
  
  if (!session || !session.user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const providerAccountId = (session.user as any).providerAccountId;
  
  await dbConnect();
  const user = await User.findOne({ providerAccountId });

  if (!user) {
    return NextResponse.json({ error: 'User not found' }, { status: 404 });
  }

  const userObj = user.toObject();
  userObj.userId = userObj._id.toString();

  return NextResponse.json(userObj, { status: 200 });
}
