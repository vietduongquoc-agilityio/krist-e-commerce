// 'use client';

// import { useEffect, useState } from 'react';
// import { useSession } from 'next-auth/react';

// // Services
// import { getCartItemsByUserId } from '@/services';

// // Components
// import { MiniCartPopupClient } from '@/components';

// // Models
// import { CartModel } from '@/models';

// interface MiniCartPopupWrapperProps {
//   isOpen: boolean;
//   onClose: () => void;
//   cartItems?: CartModel[];
//   onQuantityChange?: (cartItemDocumentId: string, newQuantity: number) => void;
// }

// export const MiniCartPopupWrapper = ({
//   isOpen,
//   onClose,
//   onQuantityChange,
// }: MiniCartPopupWrapperProps) => {
//   const { data: session } = useSession();
//   const [cartItem, setCartItems] = useState<CartModel[]>([]);

//   useEffect(() => {
//     if (!isOpen || !session?.user) return;

//     const fetchCart = async () => {
//       const { id: userId } = session.user;
//       const data = await getCartItemsByUserId(userId);

//       setCartItems(data);
//     };

//     fetchCart();
//   }, [isOpen, session]);

//   return (
//     <MiniCartPopupClient
//       isOpen={isOpen}
//       onClose={onClose}
//       cartItems={cartItem}
//       onQuantityChange={onQuantityChange}
//     />
//   );
// };

'use client';

import { useEffect, useMemo, useState } from 'react';
import { useSession } from 'next-auth/react';

// Services
import { getCartItemsByUserId, updateCartItemQuantity } from '@/services';

// Models
import { CartModel } from '@/models';

import { Button, Modal } from '@heroui/react';

// Components
import { ItemMiniCart, PaymentCard } from '@/components';
import { calculateSubtotal, toastManager } from '@/utils';
import { ERROR_MESSAGES } from '@/constants';

interface MiniCartPopupProps {
  isOpen: boolean;
  onClose: () => void;
}

export const MiniCartPopup = ({ isOpen, onClose }: MiniCartPopupProps) => {
  const { data: session } = useSession();
  const [cartItems, setCartItems] = useState<CartModel[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!isOpen || !session?.user) return;

    const fetchCart = async () => {
      setIsLoading(true);
      const { id: userId } = session.user;
      const data = await getCartItemsByUserId(userId);

      if (data?.length) {
        setCartItems(data);
      }

      setIsLoading(false);
    };

    fetchCart();
  }, [isOpen, session]);

  const subtotal = useMemo(() => calculateSubtotal(cartItems), [cartItems]);

  const handleQuantityChange = async (
    cartItemDocumentId: string,
    newQuantity: number,
  ) => {
    if (newQuantity < 1) return;

    try {
      setCartItems((prev) =>
        prev.map((item) =>
          item.documentId === cartItemDocumentId
            ? { ...item, quantity: newQuantity }
            : item,
        ),
      );

      await updateCartItemQuantity(cartItemDocumentId, newQuantity);

      window.dispatchEvent(
        new CustomEvent('cartUpdated', {
          detail: { type: 'update', documentId: cartItemDocumentId },
        }),
      );
    } catch (error) {
      console.error('Error updating quantity:', error);

      toastManager.showToast(
        ERROR_MESSAGES.UPDATE_CART_ITEM_QUANTITY_FAIL,
        'error',
      );
    }
  };

  const renderCartItems = useMemo(() => {
    if (isLoading) {
      return <p className="text-xl text-red">Loading cart...</p>;
    }

    if (!cartItems.length)
      return <p className="text-xl text-red">Your cart is empty.</p>;

    return cartItems.map((item) => {
      const { documentId, product, color, quantity } = item;

      return (
        <ItemMiniCart
          key={documentId}
          productItem={product}
          color={color}
          quantity={quantity}
          onQuantityChange={handleQuantityChange}
          cartItemId={documentId}
        />
      );
    });
  }, [cartItems, isLoading]);

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      className="relative z-50"
      aria-label="Mini cart popup"
    >
      <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
      <div className="fixed inset-y-0 right-0 w-full max-w-[720px] bg-white p-10 overflow-y-auto shadow-xl">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-[42px] font-secondary">Shopping Cart</h2>
          <Button
            onPress={onClose}
            className="text-gray text-2xl hover:text-black transition"
          >
            ×
          </Button>
        </div>

        <div className="space-y-8">{renderCartItems}</div>

        {cartItems.length > 0 && (
          <div className="mt-10">
            <PaymentCard subtotal={subtotal} />
          </div>
        )}
      </div>
    </Modal>
  );
};
