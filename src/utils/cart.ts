import { CartModel } from '@/models/cart';

export function calculateSubtotal(cartItems: CartModel[]): number {
  if (!Array.isArray(cartItems)) return 0;
  return cartItems.reduce(
    (acc, item) => acc + item.product.price * item.quantity,
    0,
  );
}
