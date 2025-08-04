'use client';

import Link from 'next/link';
import {
  Navbar,
  NavbarContent,
  Dropdown,
  DropdownMenu,
  DropdownTrigger,
  DropdownItem,
  Avatar,
} from '@heroui/react';
import { useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';

// Components
import { Button } from '@/components/commons/Button';
import { IconUser, IconCart, IconSearch, IconStar } from '@/components';

// Constants
import { NAVITEMS, ROUTER } from '@/constants';
import { MiniCartPopup } from '@/components/MiniCart/MiniCartPopup';

// Mocks
import { productMock } from '@/mocks';

// Models
import { ProductModel } from '@/models';

interface HeaderProps {
  username?: string;
  isAuthenticated?: boolean;
  avatar?: string;
}

export const Header = ({ isAuthenticated, avatar, username }: HeaderProps) => {
  const pathname = usePathname();
  const router = useRouter();
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState<ProductModel[]>([]);

  const handleUpdateQuantity = (id: string, quantity: number) => {
    setCartItems((prevItems) =>
      prevItems.map((item) => (item.id === id ? { ...item, quantity } : item)),
    );
  };

  const handleSignIn = () => {
    router.push(ROUTER.SIGNIN);
  };

  const handleSignUp = () => {
    router.push(ROUTER.SIGNUP);
  };

  const handleLogout = () => {
    router.push(ROUTER.SIGNIN);
  };

  const handleToggleCart = () => {
    setIsCartOpen((prevCartState) => !prevCartState);
  };

  const handleCheckout = () => {
    console.log('Checkout successful');
  };

  return (
    <header className="w-full py-4 flex justify-between items-center">
      <Navbar className="flex items-center w-[1282px] mx-auto">
        <Link href="/" className="text-4xl font-extrabold font-serif">
          FASCO
        </Link>

        <NavbarContent className="flex items-center justify-between w-[300px]">
          {NAVITEMS.map((item) => {
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
                  <Avatar
                    alt="User Avatar"
                    src={avatar || '/images/avatar.webp'}
                    className="cursor-pointer"
                    fallback="/images/avatar.webp"
                    classNames={{
                      base: 'w-8 h-8',
                      img: 'opacity-1',
                    }}
                  />
                </DropdownTrigger>
                <DropdownMenu className="border-1 rounded-md w-[120px]">
                  <DropdownItem
                    key="username"
                    className="rounded-t-[5px] text-center bg-black text-white hover:bg-gray transition"
                  >
                    <p>{username}</p>
                  </DropdownItem>
                  <DropdownItem
                    key="logout"
                    className="rounded-b-[5px] border-t-1 border-gray text-center bg-black text-white hover:bg-gray transition"
                    onClick={handleLogout}
                  >
                    Logout
                  </DropdownItem>
                </DropdownMenu>
              </Dropdown>

              <IconStar className="cursor-not-allowed" />

              <IconCart className="cursor-pointer" onClick={handleToggleCart} />

              <MiniCartPopup
                isOpen={isCartOpen}
                onClose={handleToggleCart}
                cartItems={cartItems.length === 0 ? productMock : cartItems}
                onUpdateQuantity={handleUpdateQuantity}
                onCheckout={handleCheckout}
              />
            </>
          ) : (
            <>
              <Button variant="solid" type="button" onClick={handleSignIn}>
                Sign in
              </Button>
              <Button variant="solid" type="button" onClick={handleSignUp}>
                Sign Up
              </Button>
            </>
          )}
        </NavbarContent>
      </Navbar>
    </header>
  );
};
