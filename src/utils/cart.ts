// Constants
import { SUCCESS_MESSAGES } from '@/constants';

// Utils
import { toastManager } from '@/utils/notification';

export const handleCheckout = (clearCart: () => void) => {
  toastManager.showToast(
    SUCCESS_MESSAGES.CHECKOUT_SUCCESS,
    'success',
    'top-center',
  );
  clearCart();
};
