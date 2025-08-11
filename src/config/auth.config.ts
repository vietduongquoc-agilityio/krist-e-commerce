import type { NextAuthConfig } from 'next-auth';

// Constants
import { ROUTER } from '@/constants';

// Interfaces
import { IUser } from '@/interfaces';

declare module 'next-auth' {
  interface Session {
    user: IUser;
  }

  interface User {
    id?: string;
    username?: string;
    email?: string;
    token?: string;
    avatar?: string;
  }
}

export const authConfig = {
  pages: {
    signIn: ROUTER.SIGNIN,
  },

  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        const { id, username, email, token: userToken, avatar } = user;

        token = {
          ...token,
          id,
          username,
          email,
          token: userToken,
          avatar,
        };
      }

      return token;
    },

    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string;
        session.user.username = token.username as string;
        session.user.email = token.email as string;
        session.user.token = token.token as string;
        session.user.avatar = token.avatar as string;
      }

      return session;
    },
  },

  session: {
    strategy: 'jwt',
    maxAge: 60 * 15, // 15 minutes
  },

  trustHost: true,
  providers: [],
} satisfies NextAuthConfig;
