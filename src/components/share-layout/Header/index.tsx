'use client';

import Link from 'next/link';
import { Navbar, NavbarContent } from '@heroui/react';
import { usePathname } from 'next/navigation';
import { useState, useMemo, useEffect } from 'react';

// Models
import { CartModel } from '@/models';

// Constants
import { NAVITEMS } from '@/constants';

// Components
import {
  HeaderAuthMenu,
  HeaderGuestMenu,
  HeaderNavLinks,
  MiniCartPopup,
} from '@/components';

interface HeaderProps {
  username?: string;
  isAuthenticated: boolean;
  avatar?: string;
  userId: string;
  cartItems?: CartModel[];
}

export const Header = ({
  isAuthenticated,
  avatar,
  username,
  userId,
  cartItems = [],
}: HeaderProps) => {
  const pathname = usePathname();
  const [isCartOpen, setIsCartOpen] = useState(false);

  const isCartPage = pathname === '/cart';

  useEffect(() => {
    if (isCartPage && isCartOpen) {
      setIsCartOpen(false);
    }
  }, [isCartPage, isCartOpen]);

  const totalQuantity = useMemo(() => {
    return Array.isArray(cartItems) ? cartItems.length : 0;
  }, [cartItems]);

  const handleToggleCart = () => {
    if (!isCartPage) {
      setIsCartOpen((prev) => !prev);
    }
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
              isShowCartIcon={isCartPage}
            />
          ) : (
            !isCartPage && <HeaderGuestMenu />
          )}

          {/* Mini Cart */}
          {!isCartPage && (
            <MiniCartPopup
              isOpen={isCartOpen}
              onClose={handleToggleCart}
              cartItems={cartItems}
              userId={userId}
              isAuthenticated={isAuthenticated}
            />
          )}
        </NavbarContent>
      </Navbar>
    </header>
  );
};
