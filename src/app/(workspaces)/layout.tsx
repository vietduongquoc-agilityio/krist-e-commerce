import type { Metadata } from 'next';

import { SessionProvider } from 'next-auth/react';

// Components
import { WorkspacesLayoutClient } from '@/components';

// Config
import { auth } from '@/config/auth';

// Services
import { getCartItemsByUserId } from '@/services';

export const metadata: Metadata = {
  title: 'Workspaces',
  description: 'Manage your workspaces efficiently',
};

export default async function WorkspacesLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth();

  const isAuthenticated = !!session;

  const userId = session?.user.id || '';
  const username = session?.user.username;
  const avatar = session?.user.avatar;

  const cartItems =
    isAuthenticated && userId ? await getCartItemsByUserId(userId) : [];

  return (
    <SessionProvider session={session}>
      <WorkspacesLayoutClient
        username={username}
        userId={userId}
        avatar={avatar}
        isAuthenticated={isAuthenticated}
        cartItems={cartItems}
      >
        {children}
      </WorkspacesLayoutClient>
    </SessionProvider>
  );
}
