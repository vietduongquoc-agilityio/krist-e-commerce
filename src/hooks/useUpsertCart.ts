'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';

// services
import { addCartItemByAccountId, updateCartItemById } from '@/services';

// models
import { CartModel } from '@/models';

// Constants
import { cartQueryKeys } from '@/constants';

type UpsertCartArgs = {
  userId: string;
  productDocumentId: string;
  colorName: string;
  size: string;
  quantity: number;
};

export function useUpsertCart() {
  const queryClient = useQueryClient();
  const parseQty = (q: any) => Number(q) || 0;

  return useMutation({
    mutationFn: async (args: UpsertCartArgs) => {
      const { userId, productDocumentId, colorName, size, quantity } = args;

      const current =
        queryClient.getQueryData<CartModel[]>(cartQueryKeys.list(userId)) || [];

      const existing = current.find(
        (i) =>
          i.product?.documentId === productDocumentId &&
          i.color === colorName &&
          i.size === size &&
          !String(i.documentId).startsWith('optimistic'),
      );

      if (existing) {
        return updateCartItemById(existing.documentId, {
          quantity: parseQty(quantity),
        });
      }

      return addCartItemByAccountId({
        color: colorName,
        size,
        quantity,
        usersPermissionsUser: userId,
        product: productDocumentId,
      });
    },

    onMutate: async (args: UpsertCartArgs) => {
      const { userId, productDocumentId, colorName, size, quantity } = args;

      await queryClient.cancelQueries({ queryKey: cartQueryKeys.list(userId) });

      const previous =
        queryClient.getQueryData<CartModel[]>(cartQueryKeys.list(userId)) || [];

      const existed = previous.find(
        (i) =>
          i.product?.documentId === productDocumentId &&
          i.color === colorName &&
          i.size === size,
      );

      const next: CartModel[] = existed
        ? previous.map((i) =>
            i.documentId === existed.documentId
              ? { ...i, quantity: parseQty(quantity) }
              : i,
          )
        : [
            ...previous,
            {
              documentId: `optimistic-${Date.now()}` as any,
              quantity,
              color: colorName,
              size,
              product: { documentId: productDocumentId } as any,
            },
          ];

      queryClient.setQueryData<CartModel[]>(cartQueryKeys.list(userId), next);

      return { previous };
    },

    onError: (_err, args, context) => {
      if (context?.previous && args?.userId) {
        queryClient.setQueryData<CartModel[]>(
          cartQueryKeys.list(args.userId),
          context.previous,
        );
      }
    },

    onSettled: (_data, _err, args) => {
      if (args?.userId) {
        queryClient.invalidateQueries({
          queryKey: cartQueryKeys.list(args.userId),
        });
      }
    },
  });
}
