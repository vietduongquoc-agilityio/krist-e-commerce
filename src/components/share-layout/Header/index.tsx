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
import { IconCart, IconSearch, IconStar } from '@/components';
import AvatarImageBackup from '@/public/images/avatar.webp';

// Constants
import {
  ERROR_MESSAGES,
  NAVITEMS,
  ROUTER,
  SUCCESS_MESSAGES,
} from '@/constants';
import { MiniCartPopup } from '@/components/MiniCart/MiniCartPopup';

// Actions
import { signOut } from '@/actions/auth';

// Utils
import { toastManager } from '@/utils';

// Hooks
import { useCart } from '@/hooks/useCart';

interface HeaderProps {
  username?: string;
  isAuthenticated?: boolean;
  avatar?: string;
}

export const Header = ({ isAuthenticated, avatar, username }: HeaderProps) => {
  const pathname = usePathname();
  const router = useRouter();
  const [isCartOpen, setIsCartOpen] = useState(false);

  const { cartItems, updateQuantity, totalQuantity } = useCart();

  const handleSignIn = () => {
    router.push(ROUTER.SIGNIN);
  };

  const handleSignUp = () => {
    router.push(ROUTER.SIGNUP);
  };

  const handleSignOut = async () => {
    try {
      await signOut();

      toastManager.showToast(SUCCESS_MESSAGES.SIGN_OUT, 'success');

      router.replace(ROUTER.HOME);
      router.refresh();
    } catch (error) {
      toastManager.showToast(ERROR_MESSAGES.SIGN_OUT_ERROR, 'error');
    }
  };

  const handleToggleCart = () => {
    setIsCartOpen((prevCartState) => !prevCartState);
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
                    src={avatar || AvatarImageBackup.src}
                    className="cursor-pointer"
                    fallback={AvatarImageBackup.src}
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
                    <p>{username || 'User'}</p>
                  </DropdownItem>
                  <DropdownItem
                    key="logout"
                    className="rounded-b-[5px] border-t-1 border-gray text-center bg-black text-white hover:bg-gray transition"
                    onClick={handleSignOut}
                  >
                    Logout
                  </DropdownItem>
                </DropdownMenu>
              </Dropdown>

              <IconStar className="cursor-not-allowed" />

              <div
                className="relative cursor-pointer"
                onClick={handleToggleCart}
              >
                <IconCart />
                {totalQuantity > 0 && (
                  <span className="absolute -top-2 -right-2 bg-red text-white text-xs font-bold px-2 py-1 rounded-full">
                    {totalQuantity}
                  </span>
                )}
              </div>

              <MiniCartPopup
                isOpen={isCartOpen}
                onClose={handleToggleCart}
                cartItems={cartItems}
                onUpdateQuantity={updateQuantity}
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
