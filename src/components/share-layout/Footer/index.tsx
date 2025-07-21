'use client';

import { Navbar, NavbarContent } from '@heroui/react';
import { usePathname } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { Text } from '@/components/commons';

const navItems = [
  { text: 'Home', path: '/' },
  { text: 'Shop', path: '/shop' },
  { text: 'Product', path: '/product' },
  { text: 'Cart', path: '/cart' },
];

export const Footer = () => {
  const pathname = usePathname();
  return (
    <footer className="w-full items-center flex flex-col pt-36">
      <figure>
        <Image
          src="/images/footer.webp"
          alt="Footer banner"
          width={1400}
          height={747}
          priority
        />
      </figure>

      <div className="w-full border-t border-lightGray mt-12 pt-7">
        <Navbar className="flex items-center w-[1282px] mx-auto">
          <Link href="/" className="text-4xl font-extrabold font-serif">
            FASCO
          </Link>

          <NavbarContent className="flex items-center justify-between w-[432px]">
            {navItems.map((item) => {
              const isActive = pathname === item.path;
              return (
                <Link
                  key={item.text}
                  href={item.path}
                  className={`transition-colors ${
                    isActive
                      ? 'text-black font-semibold text-lg'
                      : 'text-charcoal hover:text-black'
                  }`}
                >
                  {item.text}
                </Link>
              );
            })}
          </NavbarContent>
        </Navbar>
      </div>
      <Text className="text-xs pt-8 pb-5">
        Copyright © 2022 Xpro . All Rights Reseved.
      </Text>
    </footer>
  );
};
