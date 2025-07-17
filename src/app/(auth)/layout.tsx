import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'auth layout',
  description: 'Authentication layout for the application',
};

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Authentication</h1>
      {children}
    </div>
  );
}
