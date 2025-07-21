'use client';

import Link from 'next/link';
import { Navbar, NavbarContent } from '@heroui/react';

// Components
import { Button } from '@/components/commons/Button';
import { IconAvatar, IconCart, IconSearch, IconStar } from '@/components';

interface HeaderProps {
  username?: string;
  isAuthenticated?: boolean;
  avatar?: string;
}

const navItems = [
  { text: 'Home', path: '/' },
  { text: 'Shop', path: '/shop' },
  { text: 'Product', path: '/product' },
  { text: 'Cart', path: '/cart' },
];

export const Header = ({ isAuthenticated }: HeaderProps) => {
  return (
    <header className="w-full px-10 py-4 flex justify-between items-center shadow-sm">
      {/* Logo */}
      <Link href="/" className="text-4xl font-extrabold font-serif">
        FASCO
      </Link>

      {/* Navigation Menu */}
      <Navbar className="flex gap-10 items-center">
        <NavbarContent />

        {navItems.map((item) => (
          <Link
            key={item.text}
            href={item.path}
            className="text-gray-600 hover:text-black transition-colors"
          >
            {item.text}
          </Link>
        ))}

        {/* Right side: Auth buttons or icons */}
        <div className="flex items-center gap-6">
          {isAuthenticated ? (
            <>
              <IconSearch />
              <IconAvatar />
              <IconStar />
              <IconCart />
            </>
          ) : (
            <>
              <Button href="/signin" variant="solid">
                Sign in
              </Button>
              <Button
                variant="solid"
                className="bg-black text-white shadow-xl px-6 py-2 rounded-xl"
              >
                Sign Up
              </Button>
            </>
          )}
        </div>
      </Navbar>
    </header>
  );
};
