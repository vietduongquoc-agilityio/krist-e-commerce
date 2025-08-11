'use client';

import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';

// Services
import { getCartItemsByUserId } from '@/services';

// Components
import { MiniCartPopupClient } from '@/components';

// Models
import { CartModel } from '@/models';

interface MiniCartPopupWrapperProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems?: CartModel[];
  onQuantityChange?: (cartItemDocumentId: string, newQuantity: number) => void;
}

export const MiniCartPopupWrapper = ({
  isOpen,
  onClose,
  onQuantityChange,
}: MiniCartPopupWrapperProps) => {
  const { data: session } = useSession();
  const [cartItem, setCartItems] = useState<CartModel[]>([]);

  useEffect(() => {
    if (!isOpen || !session?.user) return;

    const fetchCart = async () => {
      const { id: userId } = session.user;
      const data = await getCartItemsByUserId(userId);

      setCartItems(data);
    };

    fetchCart();
  }, [isOpen, session]);

  return (
    <MiniCartPopupClient
      isOpen={isOpen}
      onClose={onClose}
      cartItems={cartItem}
      onQuantityChange={onQuantityChange}
    />
  );
};
