'use client';

import Link from 'next/link';
import { Navbar, NavbarContent } from '@heroui/react';
import { usePathname } from 'next/navigation';
import { useState, useMemo } from 'react';

// models
import { ProductModel } from '@/models';

// constants
import { NAVITEMS } from '@/constants';

// components
import {
  HeaderAuthMenu,
  HeaderGuestMenu,
  HeaderNavLinks,
  MiniCartPopupWrapper,
} from '@/components';

// components

interface HeaderProps {
  username?: string;
  isAuthenticated?: boolean;
  avatar?: string;
  cartItems?: ProductModel[];
}

export const Header = ({
  isAuthenticated,
  avatar,
  username,
  cartItems = [],
}: HeaderProps) => {
  const pathname = usePathname();

  const [isCartOpen, setIsCartOpen] = useState(false);

  const totalQuantity = useMemo(() => {
    const items = Array.isArray(cartItems) ? cartItems : [];
    return items.reduce((total, item) => total + item.quantity, 0);
  }, [cartItems]);

  const handleToggleCart = () => {
    setIsCartOpen((prev) => !prev);
  };

  return (
    <header className="w-full py-4 flex justify-between items-center">
      <Navbar className="flex items-center w-[1282px] mx-auto">
        {/* Logo */}
        <Link href="/" className="text-4xl font-extrabold font-serif">
          FASCO
        </Link>

        {/* Navigation links */}
        <NavbarContent className="flex items-center justify-between w-[300px]">
          <HeaderNavLinks pathname={pathname} navItems={NAVITEMS} />
        </NavbarContent>

        {/* Right section */}
        <NavbarContent className="flex items-center w-[300px] gap-7 justify-end relative">
          {isAuthenticated ? (
            <HeaderAuthMenu
              avatar={avatar}
              username={username}
              totalQuantity={totalQuantity}
              onToggleCart={handleToggleCart}
            />
          ) : (
            <HeaderGuestMenu />
          )}
          {/* Mini Cart */}
          <MiniCartPopupWrapper
            isOpen={isCartOpen}
            onClose={handleToggleCart}
          />
        </NavbarContent>
      </Navbar>
    </header>
  );
};
