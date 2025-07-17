import { Metadata } from 'next';
import Image from 'next/image';

export const metadata: Metadata = {
  title: 'FASCO Auth Layout',
  description: 'Authentication layout for the FASCO application',
};

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const bgImage = '/images/bg-login.webp';

  return (
    <div className="w-screen h-screen margin-auto flex items-center justify-center">
      <div className=" w-[1920px] flex justify-between">
        <Image
          src={bgImage}
          alt="Young students raising hands in a classroom"
          width={950}
          height={1077}
          quality={100}
          priority
        />

        <div className="p-8 flex flex-col justify-center max-w-md">
          {/* FASCO title */}
          <h1 className="text-4xl font-extrabold mb-2">FASCO</h1>

          {/* Terms & Conditions */}
          {children}
          <p className="text-sm text-gray-500 mb-6">FASCO Terms & Codnitions</p>
        </div>
      </div>
    </div>
  );
}
