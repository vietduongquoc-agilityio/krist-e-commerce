import { Header } from '@/components';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Workspaces',
  description: 'Manage your workspaces efficiently',
};

export default function WorkspacesLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="p-4">
      <Header isAuthenticated={false} />
      <Header isAuthenticated={true} />
      {children}
    </div>
  );
}
