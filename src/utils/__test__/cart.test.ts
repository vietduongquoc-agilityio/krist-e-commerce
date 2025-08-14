import { calculateSubtotal } from '../cart';
import { CartModel } from '@/models/cart';

describe('calculateSubtotal', () => {
  it('should return 0 if input is not an array', () => {
    // @ts-expect-error intentional invalid type for test
    expect(calculateSubtotal(null)).toBe(0);
    // @ts-expect-error intentional invalid type for test
    expect(calculateSubtotal(undefined)).toBe(0);
    // @ts-expect-error intentional invalid type for test
    expect(calculateSubtotal({})).toBe(0);
  });

  it('should return 0 for an empty cart', () => {
    expect(calculateSubtotal([])).toBe(0);
  });

  it('should correctly calculate subtotal for single item', () => {
    const cart: CartModel[] = [
      { product: { price: 100 }, quantity: 2 } as CartModel,
    ];
    expect(calculateSubtotal(cart)).toBe(200);
  });

  it('should correctly calculate subtotal for multiple items', () => {
    const cart: CartModel[] = [
      { product: { price: 100 }, quantity: 2 } as CartModel, // 200
      { product: { price: 50 }, quantity: 3 } as CartModel, // 150
      { product: { price: 20 }, quantity: 5 } as CartModel, // 100
    ];
    expect(calculateSubtotal(cart)).toBe(450);
  });

  it('should handle decimal prices correctly', () => {
    const cart: CartModel[] = [
      { product: { price: 19.99 }, quantity: 2 } as CartModel, // 39.98
      { product: { price: 5.5 }, quantity: 3 } as CartModel, // 16.5
    ];
    expect(calculateSubtotal(cart)).toBeCloseTo(56.48, 2);
  });

  it('should handle items with zero quantity or zero price', () => {
    const cart: CartModel[] = [
      { product: { price: 100 }, quantity: 0 } as CartModel, // 0
      { product: { price: 0 }, quantity: 5 } as CartModel, // 0
    ];
    expect(calculateSubtotal(cart)).toBe(0);
  });
});
