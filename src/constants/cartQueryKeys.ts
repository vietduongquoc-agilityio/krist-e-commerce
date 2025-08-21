export const cartQueryKeys = {
  all: ['cart'] as const,
  list: (userId: string) => [...cartQueryKeys.all, userId] as const,
  upsert: (userId: string) => [...cartQueryKeys.all, 'upsert', userId] as const,
};
