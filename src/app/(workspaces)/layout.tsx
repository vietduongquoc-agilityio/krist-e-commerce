import { Footer, Header } from '@/components/share-layout';
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
      <Header />
      {children}
      <Footer />
    </div>
  );
}
