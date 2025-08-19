'use client';

import { Header, Footer } from '@/components';
import type { CartModel } from '@/models';
import { useCart } from '@/hooks/useCart';

interface Props {
  children: React.ReactNode;
  username?: string;
  userId?: string;
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
  const { cartItems } = useCart(userId, isAuthenticated, initialCartItems);

  return (
    <>
      <Header
        username={username}
        avatar={avatar}
        isAuthenticated={isAuthenticated}
        cartItems={cartItems}
      />
      {children}
      <Footer />
    </>
  );
};
