import type { Metadata } from 'next';

import { SessionProvider } from 'next-auth/react';

// Components
import { WorkspacesLayoutClient } from '@/components';

// Config
import { auth } from '@/config/auth';

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
      <WorkspacesLayoutClient
        username={username}
        avatar={avatar}
        isAuthenticated={isAuthenticated}
      >
        {children}
      </WorkspacesLayoutClient>
    </SessionProvider>
  );
}
