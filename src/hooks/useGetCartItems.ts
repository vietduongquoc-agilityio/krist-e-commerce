'use client';

import { useQuery } from '@tanstack/react-query';

// services
import { getCartItemsByUserId } from '@/services';

// models
import { CartModel } from '@/models';

// constants
import { cartQueryKeys } from '@/constants';

export function useGetCartItems({
  userId,
  isAuthenticated,
  initialData,
}: {
  userId: string;
  isAuthenticated: boolean;
  initialData?: CartModel[];
}) {
  return useQuery<CartModel[]>({
    queryKey: cartQueryKeys.list(userId),
    queryFn: () => getCartItemsByUserId(userId),
    enabled: isAuthenticated && !!userId,
    initialData,
  });
}
