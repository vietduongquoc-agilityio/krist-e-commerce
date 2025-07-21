import { Footer } from '@/components';
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
    <div>
      <h1 className="text-2xl font-bold mb-4">Workspaces</h1>
      {children}
      <Footer />
    </div>
  );
}
