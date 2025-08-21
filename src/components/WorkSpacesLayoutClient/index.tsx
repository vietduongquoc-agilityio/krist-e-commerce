'use client';

import { Header, Footer } from '@/components';
import { SUCCESS_MESSAGES } from '@/constants';
import { useGetCartItems, useSessionToast } from '@/hooks';
import type { CartModel } from '@/models';

interface Props {
  children: React.ReactNode;
  username?: string;
  userId: string;
  avatar?: string;
  isAuthenticated: boolean;
  cartItems?: CartModel[];
}

export const WorkspacesLayoutClient = ({
  userId,
  children,
  username,
  avatar,
  isAuthenticated,
  cartItems: initialCartItems = [],
}: Props) => {
  const { data: cartItems = [] } = useGetCartItems({
    userId: userId || '',
    isAuthenticated,
    initialData: initialCartItems,
  });

  useSessionToast('loginSuccess', SUCCESS_MESSAGES.LOGIN);

  return (
    <>
      <Header
        username={username}
        avatar={avatar}
        isAuthenticated={isAuthenticated}
        cartItems={cartItems}
        userId={userId}
      />
      {children}
      <Footer />
    </>
  );
};
