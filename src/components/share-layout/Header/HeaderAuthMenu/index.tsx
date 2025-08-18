'use client';

import {
  Dropdown,
  DropdownMenu,
  DropdownTrigger,
  DropdownItem,
  Avatar,
} from '@heroui/react';
import { useRouter } from 'next/navigation';

// Components
import { IconSearch, IconStar, IconCart } from '@/components';

// Actions
import { signOut } from '@/actions/auth';

// Constants
import { ROUTER, ERROR_MESSAGES, SUCCESS_MESSAGES, IMAGES } from '@/constants';

// Utils
import { toastManager } from '@/utils';

interface HeaderAuthMenuProps {
  avatar?: string;
  username?: string;
  totalQuantity: number;
  onToggleCart: () => void;
  isShowCartIcon?: boolean;
}

export const HeaderAuthMenu = ({
  avatar,
  username,
  totalQuantity,
  onToggleCart,
  isShowCartIcon = false,
}: HeaderAuthMenuProps) => {
  const router = useRouter();

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

  return (
    <>
      <IconSearch className="cursor-not-allowed" />

      {/* Avatar + Dropdown */}
      <Dropdown placement="bottom-end">
        <DropdownTrigger>
          <Avatar
            alt="User Avatar"
            src={avatar || IMAGES.AVATAR}
            className="cursor-pointer"
            fallback={IMAGES.AVATAR}
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

      {/* Cart icon */}
      {!isShowCartIcon && (
        <div className="relative cursor-pointer" onClick={onToggleCart}>
          <IconCart />
          {totalQuantity > 0 && (
            <span className="absolute -top-2 -right-2 bg-red text-white text-xs font-bold px-2 py-1 rounded-full">
              {totalQuantity}
            </span>
          )}
        </div>
      )}
    </>
  );
};
