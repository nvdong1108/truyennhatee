import { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import FacebookProvider from "next-auth/providers/facebook";
import dbConnect from "@/lib/mongoose";
import { User } from "@/models/User";

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
    FacebookProvider({
      clientId: process.env.FACEBOOK_CLIENT_ID as string,
      clientSecret: process.env.FACEBOOK_CLIENT_SECRET as string,
    }),
    {
      id: "zalo",
      name: "Zalo",
      type: "oauth",
      authorization: "https://oauth.zaloapp.com/v4/permission",
      token: "https://oauth.zaloapp.com/v4/oa/access_token",
      userinfo: "https://graph.zalo.me/v2.0/me?fields=id,name,picture",
      clientId: process.env.NEXT_PUBLIC_ZALO_APP_ID as string,
      clientSecret: process.env.ZALO_APP_SECRET as string,
      profile(profile) {
        return {
          id: profile.id,
          name: profile.name,
          image: profile.picture?.data?.url
        }
      }
    }
  ],
  callbacks: {
    async signIn({ user, account, profile }) {
      if (!account || !user) return false;

      await dbConnect();

      try {
        const existingUser = await User.findOne({
          providerAccountId: account.providerAccountId,
          providerId: account.provider
        });

        if (!existingUser) {
          await User.create({
            username: user.name || `user_${account.providerAccountId.slice(0, 8)}`,
            email: user.email || '',
            providerId: account.provider,
            providerAccountId: account.providerAccountId,
            avatar: user.image || '',
            role: 'MEMBER',
            gems: 1000,
            unlockedStoryIds: []
          });
        }
        return true;
      } catch (error) {
        console.error("Error saving user to MongoDB:", error);
        return false;
      }
    },
    async jwt({ token, account }) {
      if (account) {
        token.providerAccountId = account.providerAccountId;
        token.providerId = account.provider;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        (session.user as any).providerAccountId = token.providerAccountId;
      }
      return session;
    }
  },
  session: {
    strategy: "jwt"
  },
  secret: process.env.NEXTAUTH_SECRET,
};
