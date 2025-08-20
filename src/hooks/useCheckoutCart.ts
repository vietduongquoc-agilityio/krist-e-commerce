// hooks/useCheckoutCart.ts
'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';

// services
import { removeCartItem } from '@/services';

// models
import { CartModel } from '@/models';

// constants
import { cartQueryKeys } from '@/constants';

export function useCheckoutCart() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      userId,
      cartItems,
    }: {
      userId: string;
      cartItems: CartModel[];
    }) => {
      if (!cartItems.length) return;
      await Promise.all(
        cartItems.map((item) => removeCartItem(item.documentId)),
      );
    },

    onSuccess: (_data, { userId }) => {
      queryClient.setQueryData(cartQueryKeys.list(userId), []);
    },
  });
}
