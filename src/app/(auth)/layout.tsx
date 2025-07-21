'use client';

// Libs
import { usePathname } from 'next/navigation';
import Image from 'next/image';

// Constants
import { ROUTER } from '@/constants';

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();

  const bgImage =
    pathname === ROUTER.SIGNUP
      ? '/images/bg-signup.webp'
      : '/images/bg-signin.webp';

  return (
    <div className="w-screen h-screen margin-auto flex items-center justify-center">
      <div className="w-[1920px] justify-between flex border border-gray rounded-tr-[30px] rounded-br-[30px] shadow-lg">
        <Image
          src={bgImage}
          alt="Young students raising hands in a classroom"
          width={950}
          height={1077}
          quality={100}
          priority
          sizes="(100vw - 20px) 100vw, 950px"
        />

        <div className="flex flex-col justify-between pt-14 pl-28 pr-20 w-[920px]">
          {/* FASCO title */}
          <h1 className="text-4xl font-secondary color-charcoal mb-2 text-[66px]">
            FASCO
          </h1>

          {/* Terms & Conditions */}
          {children}

          <p className=" text-black mb-6 text-right">
            FASCO Terms & Codnitions
          </p>
        </div>
      </div>
    </div>
  );
}
