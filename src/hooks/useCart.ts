import { useContext } from 'react';

// Context
import { CartContext, CartContextType } from '@/context/cart';

export const useCart = (): CartContextType => {
  const context = useContext(CartContext);
  if (!context) throw new Error('useCart must be used within CartProvider');
  return context;
};
