import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IUser extends Document {
  username: string;
  email: string;
  role: 'MEMBER' | 'VIP' | 'ADMIN';
  gems: number;
  unlockedStoryIds: string[];
  providerId: string;    // google, facebook, zalo
  providerAccountId: string; // The unique ID from provider
  avatar?: string;
  createdAt: Date;
  updatedAt: Date;
  userId: string;
}

const UserSchema: Schema<IUser> = new Schema(
  {
    username: { type: String, required: true },
    email: { type: String, sparse: true },
    role: { type: String, enum: ['MEMBER', 'VIP', 'ADMIN'], default: 'MEMBER' },
    gems: { type: Number, default: 1000 },
    unlockedStoryIds: { type: [String], default: [] },
    providerId: { type: String, required: true },
    providerAccountId: { type: String, required: true, unique: true },
    avatar: { type: String },
  },
  {
    timestamps: true,
  }
);

// Tránh lỗi overwrite model khi Next.js hot-reloads
export const User: Model<IUser> = mongoose.models.User || mongoose.model<IUser>('User', UserSchema);
