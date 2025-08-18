import type { NextAuthConfig } from 'next-auth';

// Constants
import { ROUTER, SERVER_URL } from '@/constants';

// Types
import { IUser } from '@/types';

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
    async signIn({ user, account, profile }) {
      try {
        // 1. Check existing user by email
        const res = await fetch(
          `${SERVER_URL}/users?filters[email][$eq]=${encodeURIComponent(user.email!)}`,
          { method: 'GET' },
        );

        if (!res.ok) {
          console.error('Error fetching user:', res.statusText);
          return false;
        }

        const existing = await res.json();

        let strapiUser = existing[0];

        // 2. If user does not exist → create
        if (!strapiUser) {
          const rolesRes = await fetch(`${SERVER_URL}/users-permissions/roles`);
          const rolesData = await rolesRes.json();

          const authenticatedRole = rolesData.roles.find(
            (r: { type: string }) => r.type === 'authenticated',
          );

          const roleId = authenticatedRole?.id;

          const createRes = await fetch(`${SERVER_URL}/auth/local/register`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              username: profile?.name ?? user.name ?? user.email?.split('@')[0],
              email: profile?.email ?? user.email,
              provider: account?.provider ?? 'credentials',
              confirmed: true,
              password: Math.random().toString(36).slice(-12),
              role: roleId,
            }),
          });

          if (!createRes.ok) {
            console.error('Error creating user:', await createRes.text());
            return false;
          }
          strapiUser = await createRes.json();
        }
        user.id = strapiUser.id;
        user.username = strapiUser.username;
        user.email = strapiUser.email;

        return true;
      } catch (error) {
        console.error('[SignIn Error]', error);
        return false;
      }
    },

    async jwt({ token, user }) {
      if (user) {
        const { id, username, email, token: userToken, avatar } = user;
        token = { ...token, id, username, email, token: userToken, avatar };
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
