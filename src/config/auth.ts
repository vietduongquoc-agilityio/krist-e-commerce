import Credentials from 'next-auth/providers/credentials';
import NextAuth from 'next-auth';
import { z } from 'zod';

// Config
import { authConfig } from '@/config/auth.config';

// Constants
import { SERVER_URL } from '@/constants';

export const { handlers, auth, signIn, signOut, unstable_update } = NextAuth({
  ...authConfig,
  secret: process.env.AUTH_SECRET,

  providers: [
    Credentials({
      name: 'Credentials',
      credentials: {
        identifier: { placeholder: 'Username or Email address', type: 'text' },
        password: { placeholder: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        if (!credentials) return null;

        const parsedCredentials = z
          .object({ identifier: z.string(), password: z.string().min(6) })
          .safeParse(credentials);

        // avoid returning strings to avoid runtime errors in NextAuth
        if (!parsedCredentials.success) return null;

        const { identifier, password } = parsedCredentials.data;

        // Check user credentials from Strapi api
        try {
          const response = await fetch(`${SERVER_URL}/auth/local`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ identifier, password }),
          });

          // avoid returning strings to avoid runtime errors in NextAuth
          if (!response.ok) return null;

          const { jwt, user } = await response.json();

          return { ...user, token: jwt };
        } catch (error) {
          console.error('[Authorize Error]', error);
          return null;
        }
      },
    }),
  ],
});
