'use client';

import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';

// Services
import { getCartItemsByUserId } from '@/services';

// Components
import { MiniCartPopupClient } from '@/components';

// Models
import { CartModel } from '@/models/cart';

interface MiniCartPopupWrapperProps {
  isOpen: boolean;
  onClose: () => void;
}

export function MiniCartPopupWrapper({
  isOpen,
  onClose,
}: MiniCartPopupWrapperProps) {
  const { data: session } = useSession();
  const [cartItems, setCartItems] = useState<CartModel[]>([]);

  useEffect(() => {
    if (!isOpen || !session?.user) return;

    const fetchCart = async () => {
      const { token, id: userId } = session.user;
      const data = await getCartItemsByUserId(userId, token);

      setCartItems(data);
    };

    fetchCart();
  }, [isOpen, session]);

  return (
    <MiniCartPopupClient
      isOpen={isOpen}
      onClose={onClose}
      cartItems={cartItems}
    />
  );
}
