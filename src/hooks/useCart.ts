'use client';

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

// services
import {
  getCartItemsByUserId,
  addCartItemByAccountId,
  updateCartItemById,
  removeCartItem,
} from '@/services';

// models
import type { CartModel } from '@/models';

type UpsertCartArgs = {
  userId: string;
  productDocumentId: string;
  colorName: string;
  size: string;
  quantity: number;
};

export function useCart(
  userId?: string,
  isAuthenticated?: boolean,
  initialCartItems: CartModel[] = [],
) {
  const queryClient = useQueryClient();
  const parseQty = (q: any): number => Number(q) || 0;

  // Fetch Cart
  const {
    data: cartItems = [],
    isLoading,
    isFetching,
  } = useQuery<CartModel[]>({
    queryKey: ['cart', userId],
    queryFn: () => {
      if (!isAuthenticated || !userId) return Promise.resolve([]);
      return getCartItemsByUserId(userId);
    },
    enabled: !!isAuthenticated && !!userId,
    staleTime: 60_000,
    initialData: initialCartItems,
    placeholderData: (prev) => prev,
  });

  // Upsert (ADD if not exists, UPDATE quantity if exists)
  const upsertMutation = useMutation({
    mutationKey: ['cart-upsert', userId],

    mutationFn: async (args: UpsertCartArgs) => {
      const {
        userId: _userId,
        productDocumentId,
        colorName,
        size,
        quantity,
      } = args;

      const current =
        queryClient.getQueryData<CartModel[]>(['cart', _userId]) || [];
      const existing = current.find(
        (i) =>
          i.product?.documentId === productDocumentId &&
          i.color === colorName &&
          i.size === size &&
          !String(i.documentId).startsWith('optimistic'),
      );

      if (existing) {
        const nextQty = parseQty(quantity);

        return updateCartItemById(existing.documentId, { quantity: nextQty });
      } else {
        // call API add
        return addCartItemByAccountId({
          color: colorName,
          size,
          quantity,
          usersPermissionsUser: _userId,
          product: productDocumentId,
        });
      }
    },
    // Optimistic Update
    onMutate: async (args: UpsertCartArgs) => {
      const {
        userId: _userId,
        productDocumentId,
        colorName,
        size,
        quantity,
      } = args;

      await queryClient.cancelQueries({ queryKey: ['cart', _userId] });
      const previous =
        queryClient.getQueryData<CartModel[]>(['cart', _userId]) || [];

      // Set up optimistic state
      const existed = previous.find(
        (i) =>
          i.product?.documentId === productDocumentId &&
          i.color === colorName &&
          i.size === size,
      );

      let next: CartModel[];
      if (existed) {
        next = previous.map((i) =>
          i.documentId === existed.documentId
            ? {
                ...i,
                quantity: parseQty(quantity),
              }
            : i,
        );
      } else {
        // create dummy item (at least enough to render badge / header)
        const optimisticId = `optimistic-${Date.now()}`;
        next = [
          ...previous,
          {
            documentId: optimisticId as any,
            quantity,
            color: colorName,
            size,
            product: { documentId: productDocumentId } as any,
          } as CartModel,
        ];
      }

      queryClient.setQueryData<CartModel[]>(['cart', _userId], next);
      return { previous };
    },
    // rollback on error
    onError: (_err, args, context) => {
      if (context?.previous && args?.userId) {
        queryClient.setQueryData(['cart', args.userId], context.previous);
      }
    },
    // refresh the cache to replace the optimistic item with the real item from Strapi
    onSettled: (_data, _err, args) => {
      if (args?.userId) {
        queryClient.invalidateQueries({ queryKey: ['cart', args.userId] });
      }
    },
  });

  const removeMutation = useMutation({
    mutationFn: (cartItemDocumentId: string) =>
      removeCartItem(cartItemDocumentId),
    onMutate: async (id) => {
      await queryClient.cancelQueries({ queryKey: ['cart', userId] });
      const previous =
        queryClient.getQueryData<CartModel[]>(['cart', userId]) || [];
      queryClient.setQueryData<CartModel[]>(
        ['cart', userId],
        previous.filter((item) => item.documentId !== id),
      );
      return { previous };
    },
    onError: (_err, id, ctx) => {
      if (ctx?.previous) {
        queryClient.setQueryData(['cart', userId], ctx.previous);
      }
    },
    onSettled: () => {
      if (userId) queryClient.invalidateQueries({ queryKey: ['cart', userId] });
    },
  });

  const checkoutMutation = useMutation({
    mutationFn: async () => {
      if (!cartItems.length) return;
      await Promise.all(
        cartItems.map((item) => removeCartItem(item.documentId)),
      );
    },
    onSuccess: () => {
      queryClient.setQueryData(['cart', userId], []);
    },
  });

  return {
    cartItems,
    isLoading,
    isFetching,
    upsertCart: upsertMutation.mutate,
    upsertCartAsync: upsertMutation.mutateAsync,
    isUpserting: upsertMutation.isPending,
    removeCartItem: removeMutation.mutate,
    checkoutCart: checkoutMutation.mutate,
  };
}
