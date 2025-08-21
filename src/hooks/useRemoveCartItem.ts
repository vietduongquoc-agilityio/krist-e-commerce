'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';

// services
import { removeCartItem } from '@/services';

// constants
import { cartQueryKeys } from '@/constants';

export function useRemoveCartItem() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      userId,
      cartItemDocumentId,
    }: {
      userId: string;
      cartItemDocumentId: string;
    }) => removeCartItem(cartItemDocumentId),

    onSuccess: (_data, variables) => {
      queryClient.invalidateQueries({
        queryKey: cartQueryKeys.list(variables.userId),
      });
    },
  });
}
