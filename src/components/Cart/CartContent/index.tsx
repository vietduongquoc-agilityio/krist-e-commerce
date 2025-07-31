'use client';

import { useEffect, useState } from 'react';

// Models
import { ProductModel } from '@/models';

// Components
import { CartItemRow, PaymentCard } from '@/components';

interface CartContentProps {
  items: ProductModel[];
}

export const CartContent = ({ items }: CartContentProps) => {
  const [cartItems, setCartItems] = useState<ProductModel[]>([]);

  // Load from localStorage
  useEffect(() => {
    const stored = localStorage.getItem('cart');
    setCartItems(stored ? JSON.parse(stored) : []);
  }, []);

  // Update quantity
  const handleUpdateQuantity = (id: string, quantity: number) => {
    const updated = cartItems.map((item) =>
      item.id === id ? { ...item, quantity } : item,
    );
    setCartItems(updated);
    localStorage.setItem('cart', JSON.stringify(updated));
  };

  // Remove item
  const handleRemoveItem = (id: string) => {
    const updated = cartItems.filter((item) => item.id !== id);
    setCartItems(updated);
    localStorage.setItem('cart', JSON.stringify(updated));
  };

  const handleCheckout = () => {
    alert('Proceeding to checkout...');
    setCartItems([]);
    localStorage.removeItem('cart');
  };

  const subtotal = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );

  if (cartItems.length === 0) {
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
          {items.length === 0 ? (
            <p className="text-xl text-red">Your cart is empty.</p>
          ) : (
            items.map((item) => (
              <CartItemRow
                key={item.id}
                productItem={item}
                onQuantityChange={(id, qty) => handleUpdateQuantity(id, qty)}
                onRemove={() => handleRemoveItem(item.id)}
              />
            ))
          )}
        </div>
      </div>

      {/* Payment Summary */}
      {items.length > 0 && (
        <div className="flex justify-end">
          <PaymentCard subtotal={subtotal} onCheckout={handleCheckout} />
        </div>
      )}
    </div>
  );
};
