'use client';

import { useMutation, useQueryClient, useQuery } from '@tanstack/react-query';

// services
import {
  addCartItemByAccountId,
  updateCartItemById,
  getCartItemsByUserId,
} from '@/services';

// models
import { CartModel } from '@/models';

// constants
import { cartQueryKeys } from '@/constants';

type UpsertCartArgs = {
  userId: string;
  productDocumentId: string;
  colorName: string;
  size: string;
  quantity: number;
  mode?: 'increment' | 'set';
};

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
    staleTime: 1000 * 60 * 5,
  });
}

export function useUpsertCart() {
  const queryClient = useQueryClient();
  const parseQty = (q: any) => Number(q) || 0;

  return useMutation({
    mutationFn: async (args: UpsertCartArgs) => {
      const {
        userId,
        productDocumentId,
        colorName,
        size,
        quantity,
        mode = 'increment',
      } = args;

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
        const nextQty =
          mode === 'set'
            ? parseQty(quantity)
            : parseQty(existing.quantity) + parseQty(quantity);

        return updateCartItemById(existing.documentId, { quantity: nextQty });
      }

      return addCartItemByAccountId({
        color: colorName,
        size,
        quantity: parseQty(quantity),
        usersPermissionsUser: userId,
        product: productDocumentId,
      });
    },

    onMutate: async (args: UpsertCartArgs) => {
      const {
        userId,
        productDocumentId,
        colorName,
        size,
        quantity,
        mode = 'increment',
      } = args;

      await queryClient.cancelQueries({ queryKey: cartQueryKeys.list(userId) });

      const previous =
        queryClient.getQueryData<CartModel[]>(cartQueryKeys.list(userId)) || [];

      const existed = previous.find(
        (i) =>
          i.product?.documentId === productDocumentId &&
          i.color === colorName &&
          i.size === size &&
          !String(i.documentId).startsWith('optimistic'),
      );

      if (!existed) {
        const next: CartModel[] = [
          ...previous,
          {
            documentId: `optimistic-${Date.now()}` as any,
            quantity: parseQty(quantity),
            color: colorName,
            size,
            product: { documentId: productDocumentId } as any,
          },
        ];
        queryClient.setQueryData<CartModel[]>(cartQueryKeys.list(userId), next);
      } else if (mode === 'set') {
        const next: CartModel[] = previous.map((i) =>
          i.documentId === existed.documentId
            ? { ...i, quantity: parseQty(quantity) }
            : i,
        );
        queryClient.setQueryData<CartModel[]>(cartQueryKeys.list(userId), next);
      }

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
