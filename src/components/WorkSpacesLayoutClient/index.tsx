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
  userId?: string;
  avatar?: string;
  isAuthenticated?: boolean;
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
  const [cartItems, setCartItems] = useState<CartModel[]>(initialCartItems);

  const fetchCart = useCallback(async () => {
    if (!isAuthenticated || !userId) {
      setCartItems([]);
      return;
    }
    try {
      const data = await getCartItemsByUserId(userId);

      setCartItems(Array.isArray(data) ? [...data] : []);
    } catch (err) {
      console.error('Failed to fetch cart on layout mount', err);
      setCartItems([]);
    }
  }, [isAuthenticated, userId]);

  useEffect(() => {
    fetchCart();
  }, [fetchCart]);

  useEffect(() => {
    const onCartUpdated = (
      e: CustomEvent<{
        type: 'add' | 'remove' | 'update' | 'checkout';
        item?: CartModel;
        documentId?: string;
      }>,
    ) => {
      if (['add', 'remove', 'update'].includes(e.detail.type)) {
        fetchCart();
      } else if (e.detail.type === 'checkout') {
        setCartItems([]);
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
