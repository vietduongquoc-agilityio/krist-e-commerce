import type { Metadata } from 'next';

import { SessionProvider } from 'next-auth/react';

// Components
import { Footer, Header } from '@/components';

// Config
import { auth } from '@/config/auth';

// Context
import { CartProvider } from '@/context/cart';

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

  const username = session?.user?.username;
  const avatar = session?.user?.avatar;

  return (
    <SessionProvider session={session}>
      <CartProvider>
        <Header
          username={username}
          avatar={avatar}
          isAuthenticated={isAuthenticated}
        />
        {children}
        <Footer />
      </CartProvider>
    </SessionProvider>
  );
}
