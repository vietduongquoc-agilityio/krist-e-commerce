'use client';

import React, { createContext, useState, ReactNode } from 'react';

// Models
import { ItemCardProps } from '@/types';

export interface CartContextType {
  cartItems: ItemCardProps[];
  addToCart: (item: ItemCardProps) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
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
      } else {
        return [...prev, item];
      }
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

  return (
    <CartContext.Provider
      value={{ cartItems, addToCart, updateQuantity, clearCart }}
    >
      {children}
    </CartContext.Provider>
  );
};
