import { useSessionToast } from '@/hooks';
import { renderHook } from '@testing-library/react';

// mock toastManager
jest.mock('@/utils', () => ({
  toastManager: {
    showToast: jest.fn(),
  },
}));

describe('useSessionToast', () => {
  const { toastManager } = require('@/utils');

  beforeEach(() => {
    jest.clearAllMocks();
    sessionStorage.clear();
  });

  it('should call toastManager.showToast and remove flag when sessionStorage has "true"', () => {
    sessionStorage.setItem('cart-success', 'true');

    renderHook(() => useSessionToast('cart-success', 'Added to cart'));

    expect(toastManager.showToast).toHaveBeenCalledWith(
      'Added to cart',
      'success',
    );
    expect(sessionStorage.getItem('cart-success')).toBeNull();
  });

  it('should NOT call toastManager.showToast if flag is missing', () => {
    renderHook(() => useSessionToast('cart-success', 'Added to cart'));

    expect(toastManager.showToast).not.toHaveBeenCalled();
  });

  it('should NOT call toastManager.showToast if flag is not "true"', () => {
    sessionStorage.setItem('cart-success', 'false');

    renderHook(() => useSessionToast('cart-success', 'Added to cart'));

    expect(toastManager.showToast).not.toHaveBeenCalled();
    expect(sessionStorage.getItem('cart-success')).toBe('false');
  });
});
