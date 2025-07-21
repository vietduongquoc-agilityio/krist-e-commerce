'use client';

import Link from 'next/link';
import {
  Navbar,
  NavbarContent,
  Dropdown,
  DropdownMenu,
  DropdownTrigger,
  DropdownItem,
} from '@heroui/react';
import router from 'next/router';
import { usePathname } from 'next/navigation';

// Components
import { Button } from '@/components/commons/Button';
import { IconUser, IconCart, IconSearch, IconStar } from '@/components';

// Constants
import { ROUTER } from '@/constants';

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
  const pathname = usePathname();

  return (
    <header className="w-full py-4 flex justify-between items-center shadow-sm">
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

        <NavbarContent className="flex items-center w-[300px] gap-7 justify-end relative">
          {isAuthenticated ? (
            <>
              <IconSearch className="cursor-not-allowed" />
              {/* IconUser + Dropdown */}
              <Dropdown placement="bottom-end">
                <DropdownTrigger>
                  <IconUser className="cursor-pointer" />
                </DropdownTrigger>
                <DropdownMenu className="border-1 rounded-xl bg-black text-white hover:bg-gray transition w-[160px] py-3">
                  <DropdownItem
                    key="logout"
                    className="flex items-center justify-center"
                    onClick={() => {
                      router.push('/signin');
                    }}
                  >
                    Logout
                  </DropdownItem>
                </DropdownMenu>
              </Dropdown>

              <IconStar className="cursor-not-allowed" />
              <IconCart className="cursor-pointer" />
            </>
          ) : (
            <>
              <Button
                href="/signin"
                variant="solid"
                type="button"
                onClick={() => router.push(ROUTER.SIGNIN)}
              >
                Sign in
              </Button>
              <Button
                variant="solid"
                href="/signup"
                type="button"
                onClick={() => router.push(ROUTER.SIGNUP)}
              >
                Sign Up
              </Button>
            </>
          )}
        </NavbarContent>
      </Navbar>
    </header>
  );
};
