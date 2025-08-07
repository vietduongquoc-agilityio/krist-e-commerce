'use client';

import React, { createContext, useState, ReactNode, useMemo } from 'react';

// Models
import { ItemCardProps } from '@/types';
import { toastManager } from '@/utils';
import { SUCCESS_MESSAGES } from '@/constants';

export interface CartContextType {
  cartItems: ItemCardProps[];
  addToCart: (item: ItemCardProps) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
  removeItem: (id: string) => void;
  subtotal: number;
  totalQuantity: number;
}

export const CartContext = createContext<CartContextType | undefined>(
  undefined,
);

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cartItems, setCartItems] = useState<ItemCardProps[]>([]);

  const addToCart = (item: ItemCardProps) => {
    setCartItems((prev) => {
      const exists = prev.find((p) => p.id === item.id);

      if (exists) {
        return prev.map((p) =>
          p.id === item.id ? { ...p, quantity: p.quantity + item.quantity } : p,
        );
      }

      return [...prev, item];
    });
  };

  const updateQuantity = (id: string, quantity: number) => {
    setCartItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, quantity } : item)),
    );
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const removeItem = (id: string) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
    toastManager.showToast(
      SUCCESS_MESSAGES.REMOVE_PRODUCT_FROM_CART,
      'success',
    );
  };

  const subtotal = useMemo(() => {
    return cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  }, [cartItems]);

  const totalQuantity = useMemo(() => {
    return cartItems.reduce((total, item) => total + item.quantity, 0);
  }, [cartItems]);

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        updateQuantity,
        clearCart,
        removeItem,
        subtotal,
        totalQuantity,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
