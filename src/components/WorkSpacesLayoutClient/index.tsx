'use client';

import { useState, useEffect, useCallback } from 'react';
import { useSession } from 'next-auth/react';

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
  const { data: session } = useSession();
  const [cartItems, setCartItems] = useState<CartModel[]>([]);

  const fetchCart = useCallback(async () => {
    if (!session?.user) return;
    try {
      const { token, id: userId } = session.user;
      const data = await getCartItemsByUserId(userId);
      setCartItems(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error('Failed to fetch cart on layout mount', err);
      setCartItems([]);
    }
  }, [session]);

  useEffect(() => {
    fetchCart();
  }, [fetchCart]);

  useEffect(() => {
    const onCartUpdated = (
      e: CustomEvent<{
        type: 'add' | 'remove';
        item?: CartModel;
        documentId?: string;
      }>,
    ) => {
      if (['add', 'remove'].includes(e.detail.type)) {
        fetchCart();
      }
    };

    window.addEventListener('cartUpdated', onCartUpdated as EventListener);
    return () =>
      window.removeEventListener('cartUpdated', onCartUpdated as EventListener);
  }, []);

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
