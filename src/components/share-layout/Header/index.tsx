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
import { useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';

// Components
import { Button } from '@/components/commons/Button';
import {
  IconUser,
  IconCart,
  IconSearch,
  IconStar,
  MiniCartPopup,
} from '@/components';

// Constants
import { NAVITEMS, ROUTER } from '@/constants';

// Mocks
import { productMock } from '@/mocks';

// Models
import { ProductModel } from '@/models';

interface HeaderProps {
  username?: string;
  isAuthenticated?: boolean;
  avatar?: string;
}

export const Header = ({ isAuthenticated }: HeaderProps) => {
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
                  <IconUser className="cursor-pointer" />
                </DropdownTrigger>
                <DropdownMenu className="border-1 rounded-xl bg-black text-white hover:bg-gray transition w-[160px] py-3">
                  <DropdownItem
                    key="logout"
                    className="flex items-center justify-center"
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
