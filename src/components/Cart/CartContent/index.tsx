'use client';

import { useEffect, useState } from 'react';

// Components
import { CartItemRow, CartItemRowSkeleton, PaymentCard } from '@/components';
import { ProductModel } from '@/models';
import {
  // clearCart,
  getCartItemsByUserId,
  removeCartItem,
  updateCartItemQuantity,
} from '@/services';

// Hooks
import { useSession } from 'next-auth/react';

export const CartContent = () => {
  const { data: session } = useSession();
  const [cartItems, setCartItems] = useState<ProductModel[]>([]);
  const [loading, setLoading] = useState(true);

  const jwt = session?.user.token;
  const userId = session?.user?.id;

  useEffect(() => {
    if (!userId || !jwt) return;
    getCartItemsByUserId(userId, jwt)
      .then((data) => setCartItems(data as ProductModel[]))
      .finally(() => setLoading(false));
  }, [userId, jwt]);

  const handleUpdateQuantity = async (id: string, quantity: number) => {
    await updateCartItemQuantity(id, quantity, jwt);
    setCartItems((prev) =>
      prev.map((c) => (c.id === id ? { ...c, quantity } : c)),
    );
  };

  const handleRemove = async (id: string) => {
    await removeCartItem(id, jwt);
    setCartItems((prev) => prev.filter((c) => c.id !== id));
  };

  // const handleCheckout = async () => {
  //   await clearCart(userId!, jwt);
  //   setCartItems([]);
  // };

  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );

  if (loading) {
    return (
      <div>
        {Array(3)
          .fill(0)
          .map((_, i) => (
            <CartItemRowSkeleton key={i} />
          ))}
      </div>
    );
  }

  if (!cartItems.length) {
    return (
      <p className="text-center py-10 text-red text-xl font-secondary">
        Your cart is empty.
      </p>
    );
  }

  return (
    <div className="flex flex-col  justify-between gap-10 max-w-[1280px] mx-auto">
      <div className="flex-1">
        {/* Table Header */}
        <div className="text-[22px] pb-[34px] font-secondary flex justify-between">
          <p className="w-[335px]">Product</p>
          <p>Price</p>
          <p>Quantity</p>
          <p className="pl-[57px]">Total</p>
        </div>
        {/* Item Rows */}
        <div className="border-y border-gray divide-y divide-gray">
          {cartItems.map((item) => (
            <CartItemRow
              key={item.id}
              productItem={item}
              onQuantityChange={(id, qty) => handleUpdateQuantity(id, qty)}
              onRemove={() => handleRemove(item.id)}
            />
          ))}
        </div>
      </div>

      {/* Payment Summary */}
      {cartItems.length > 0 && (
        <div className="flex justify-end">
          <PaymentCard
            subtotal={subtotal}
            // onCheckout={() => handleCheckout()}
          />
        </div>
      )}
    </div>
  );
};
