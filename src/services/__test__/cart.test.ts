import {
  addCartItemByAccountId,
  getCartItemsByUserId,
  updateCartItemQuantity,
  removeCartItem,
  checkoutCart,
} from '../cart';
import { apiClient } from '@/services/api';
import { keysToCamel, keysToSnake } from '@/utils';
import { API_ENDPOINTS, ERROR_MESSAGES } from '@/constants';
import type { CartModel } from '@/models';

jest.mock('../../services/api', () => ({
  apiClient: {
    post: jest.fn(),
    get: jest.fn(),
    put: jest.fn(),
    delete: jest.fn(),
  },
}));

jest.mock('../../utils', () => ({
  keysToCamel: jest.fn((x) => x),
  keysToSnake: jest.fn((x) => x),
}));

jest.mock('../../constants/color', () => ({
  colorNameToHex: { red: '#ff0000', blue: '#0000ff' },
  colorHexToName: { '#ff0000': 'red', '#0000ff': 'blue' },
}));

describe('CartService', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('addCartItemByAccountId', () => {
    it('should convert payload to snake case and return camelized data', async () => {
      const payload = {
        color: 'red',
        size: 'M',
        usersPermissionsUser: 'u1',
        product: 'p1',
        quantity: 2,
      };
      const mockData = { id: 1 };
      (apiClient.post as jest.Mock).mockResolvedValueOnce({ data: mockData });

      const result = await addCartItemByAccountId(payload);

      expect(keysToSnake).toHaveBeenCalledWith(payload);
      expect(apiClient.post).toHaveBeenCalledWith(API_ENDPOINTS.CARTS, {
        body: { data: payload },
      });
      expect(keysToCamel).toHaveBeenCalledWith(mockData);
      expect(result).toEqual(mockData);
    });
  });

  describe('getCartItemsByUserId', () => {
    it('should return empty array when API returns error', async () => {
      (apiClient.get as jest.Mock).mockResolvedValueOnce({
        data: null,
        error: { message: 'fail' },
      });
      const consoleSpy = jest
        .spyOn(console, 'error')
        .mockImplementation(() => {});

      const result = await getCartItemsByUserId('user1');

      expect(result).toEqual([]);
      expect(consoleSpy).toHaveBeenCalledWith(
        'Error fetching cart items:',
        'fail',
      );
      consoleSpy.mockRestore();
    });
  });

  describe('updateCartItemQuantity', () => {
    it('should update quantity and return camelized data', async () => {
      const mockData: CartModel = { documentId: '1' } as CartModel;
      (apiClient.put as jest.Mock).mockResolvedValueOnce({
        data: mockData,
        error: null,
      });

      const result = await updateCartItemQuantity('item1', 5);

      expect(apiClient.put).toHaveBeenCalledWith(
        `${API_ENDPOINTS.CARTS}/item1`,
        {
          body: { data: { quantity: 5 } },
        },
      );
      expect(keysToSnake).toHaveBeenCalledWith({ quantity: 5 });
      expect(keysToCamel).toHaveBeenCalledWith(mockData);
      expect(result).toEqual(mockData);
    });

    it('should throw error when API returns error', async () => {
      (apiClient.put as jest.Mock).mockResolvedValueOnce({
        data: null,
        error: { message: 'fail' },
      });
      const consoleSpy = jest
        .spyOn(console, 'error')
        .mockImplementation(() => {});

      await expect(updateCartItemQuantity('item1', 5)).rejects.toThrow(
        ERROR_MESSAGES.UPDATE_CART_ITEM_QUANTITY_FAIL,
      );

      expect(consoleSpy).toHaveBeenCalledWith(
        ERROR_MESSAGES.UPDATE_CART_ITEM_QUANTITY_FAIL,
        { message: 'fail' },
      );
      consoleSpy.mockRestore();
    });
  });

  describe('removeCartItem', () => {
    it('should call delete and return boolean', async () => {
      (apiClient.delete as jest.Mock).mockResolvedValueOnce({ data: true });

      const result = await removeCartItem('item1');

      expect(apiClient.delete).toHaveBeenCalledWith(
        `${API_ENDPOINTS.CARTS}/item1`,
      );
      expect(result).toBe(true);
    });
  });

  describe('checkoutCart', () => {
    it('should remove all items and call clearCart', async () => {
      const cartItems: CartModel[] = [
        { documentId: '1' } as CartModel,
        { documentId: '2' } as CartModel,
      ];
      (apiClient.delete as jest.Mock).mockResolvedValue({ data: true });
      const clearCart = jest.fn();

      await checkoutCart(cartItems, clearCart);

      expect(apiClient.delete).toHaveBeenCalledTimes(2);
      expect(clearCart).toHaveBeenCalled();
    });

    it('should log error if removeCartItem throws', async () => {
      const cartItems: CartModel[] = [{ documentId: '1' } as CartModel];
      (apiClient.delete as jest.Mock).mockRejectedValueOnce(new Error('fail'));
      const clearCart = jest.fn();
      const consoleSpy = jest
        .spyOn(console, 'error')
        .mockImplementation(() => {});

      await checkoutCart(cartItems, clearCart);

      expect(consoleSpy).toHaveBeenCalledWith(
        'Error during checkout:',
        expect.any(Error),
      );
      consoleSpy.mockRestore();
    });
  });
});
