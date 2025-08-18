'use client';

import { usePathname } from 'next/navigation';
import Image from 'next/image';

// Constants
import { AUTH_IMAGES, ROUTER } from '@/constants';

export default function AuthLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const pathname = usePathname();

  const bgImage = AUTH_IMAGES[pathname] || AUTH_IMAGES[ROUTER.SIGNIN];

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

        <div className="flex flex-col justify-between pt-24 px-28 w-[920px] pb-12">
          <h1 className="text-4xl font-secondary text-charcoal mb-2 text-[66px]">
            FASCO
          </h1>

          {children}

          <p className=" text-black text-right">FASCO Terms & Conditions</p>
        </div>
      </div>
    </div>
  );
}
