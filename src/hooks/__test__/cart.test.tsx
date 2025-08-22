import { renderHook, act, waitFor } from '@testing-library/react';

import {
  useGetCartItems,
  useUpsertCart,
  useRemoveCartItem,
  useCheckoutCart,
} from '..';
import * as services from '@/services';
import { CartModel } from '@/models';
import Providers from '@/app/provider';

jest.mock('../../services');

const createWrapper = () => {
  return ({ children }: { children: React.ReactNode }) => (
    <Providers>{children}</Providers>
  );
};

describe('cart hooks', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('useGetCartItems', () => {
    it('fetches cart items when authenticated', async () => {
      const mockData: CartModel[] = [
        {
          documentId: '1',
          product: { documentId: 'p1' } as any,
          color: 'red',
          size: 'M',
          quantity: 1,
        },
      ];
      (services.getCartItemsByUserId as jest.Mock).mockResolvedValue(mockData);

      const { result } = renderHook(
        () =>
          useGetCartItems({
            userId: 'u1',
            isAuthenticated: true,
          }),
        { wrapper: createWrapper() },
      );

      await waitFor(() => expect(result.current.isSuccess).toBe(true));
      expect(result.current.data).toEqual(mockData);
    });
  });

  describe('useUpsertCart', () => {
    it('calls addCartItemByAccountId if item not exists', async () => {
      (services.addCartItemByAccountId as jest.Mock).mockResolvedValue({
        documentId: 'new-id',
      });

      const { result } = renderHook(() => useUpsertCart(), {
        wrapper: createWrapper(),
      });

      await act(async () => {
        await result.current.mutateAsync({
          userId: 'u1',
          productDocumentId: 'p1',
          colorName: 'red',
          size: 'M',
          quantity: 1,
        });
      });

      expect(services.addCartItemByAccountId).toHaveBeenCalledWith(
        expect.objectContaining({
          usersPermissionsUser: 'u1',
          product: 'p1',
          quantity: 1,
        }),
      );
    });
  });

  describe('useRemoveCartItem', () => {
    it('removes a cart item', async () => {
      (services.removeCartItem as jest.Mock).mockResolvedValue({});

      const { result } = renderHook(() => useRemoveCartItem(), {
        wrapper: createWrapper(),
      });

      await act(async () => {
        await result.current.mutateAsync({
          userId: 'u1',
          cartItemDocumentId: 'c1',
        });
      });

      expect(services.removeCartItem).toHaveBeenCalledWith('c1');
    });
  });

  describe('useCheckoutCart', () => {
    it('removes all items from cart', async () => {
      (services.removeCartItem as jest.Mock).mockResolvedValue({});

      const { result } = renderHook(() => useCheckoutCart(), {
        wrapper: createWrapper(),
      });

      const items: CartModel[] = [
        {
          documentId: 'c1',
          product: { documentId: 'p1' } as any,
          color: 'red',
          size: 'M',
          quantity: 1,
        },
        {
          documentId: 'c2',
          product: { documentId: 'p2' } as any,
          color: 'blue',
          size: 'L',
          quantity: 2,
        },
      ];

      await act(async () => {
        await result.current.mutateAsync({ userId: 'u1', cartItems: items });
      });

      expect(services.removeCartItem).toHaveBeenCalledTimes(2);
      expect(services.removeCartItem).toHaveBeenCalledWith('c1');
      expect(services.removeCartItem).toHaveBeenCalledWith('c2');
    });
  });
});
