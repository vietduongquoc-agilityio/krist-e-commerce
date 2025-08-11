import { CartModel } from '@/models/cart';

// Services
import { updateCartItemQuantity } from '@/services';

// Utils
import { toastManager } from '@/utils';

// Constants
import { ERROR_MESSAGES, SUCCESS_MESSAGES } from '@/constants';

export function calculateSubtotal(cartItems: CartModel[]): number {
  if (!Array.isArray(cartItems)) return 0;
  return cartItems.reduce(
    (acc, item) => acc + item.product.price * item.quantity,
    0,
  );
}

export async function handleQuantityChange(
  cartItemDocumentId: string,
  newQuantity: number,
  setCartItems: React.Dispatch<React.SetStateAction<CartModel[]>>,
) {
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

    toastManager.showToast(
      SUCCESS_MESSAGES.UPDATE_CART_ITEM_QUANTITY,
      'success',
    );

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
}
