'use client';

import { useState, useEffect, useCallback } from 'react';

// Components
import { Header, Footer } from '@/components';

// Models
import { CartModel } from '@/models';

// Services
import { getCartItemsByUserId } from '@/services';

interface Props {
  children: React.ReactNode;
  username?: string;
  avatar?: string;
  isAuthenticated?: boolean;
}

export const WorkspacesLayoutClient = ({
  children,
  username,
  avatar,
  isAuthenticated,
}: Props) => {
  const [cartItems, setCartItems] = useState<CartModel[]>([]);

  const fetchCart = useCallback(async () => {
    if (!isAuthenticated || !username) {
      setCartItems([]);
      return;
    }
    try {
      const userId = username;
      const data = await getCartItemsByUserId(userId);
      setCartItems(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error('Failed to fetch cart on layout mount', err);
      setCartItems([]);
    }
  }, [isAuthenticated, username]);

  useEffect(() => {
    fetchCart();
  }, [fetchCart]);

  useEffect(() => {
    const onCartUpdated = (
      e: CustomEvent<{
        type: 'add' | 'remove' | 'update';
        item?: CartModel;
        documentId?: string;
      }>,
    ) => {
      if (['add', 'remove', 'update'].includes(e.detail.type)) {
        fetchCart();
      }
    };

    window.addEventListener('cartUpdated', onCartUpdated as EventListener);
    return () =>
      window.removeEventListener('cartUpdated', onCartUpdated as EventListener);
  }, [fetchCart]);

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
