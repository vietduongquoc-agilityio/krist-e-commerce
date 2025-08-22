// constants/queryKeys.ts
export const SELECTION_KEY = {
  COLOR: 'color',
  SIZE: 'size',
  PRICE: 'price',
  BRAND: 'brand',
};

export const STORAGE_KEY = 'cart-items';

export const cartQueryKeys = {
  all: ['cart'] as const,
  list: (userId: string) => [...cartQueryKeys.all, userId] as const,
  upsert: (userId: string) => [...cartQueryKeys.all, 'upsert', userId] as const,
};
