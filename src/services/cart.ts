// Constants
import { API_ENDPOINTS, ERROR_MESSAGES, PAGE_SIZE } from '@/constants';

// Models
import { CartModel } from '@/models';

// Services
import { apiClient } from '@/services/api';

// Utils
import { keysToCamel, keysToSnake } from '@/utils';

export interface CartPayload {
  color: string;
  usersPermissionsUser: string;
  size: string;
  product: string;
  quantity: number;
}

export const addCartItemByAccountId = async (payload: CartPayload) => {
  const snakePayload = keysToSnake(payload);

  const response = await apiClient.post(API_ENDPOINTS.CARTS, {
    body: { data: snakePayload },
  });

  return keysToCamel(response.data);
};

export const getCartItemsByUserId = async (
  userId: string,
  searchParams?: { page: string; pageSize: string },
): Promise<CartModel[]> => {
  const params = new URLSearchParams();

  const page = searchParams?.page ?? '1';
  const pageSize = searchParams?.pageSize ?? String(PAGE_SIZE);

  params.set('pagination[page]', page);
  params.set('pagination[pageSize]', pageSize);

  const url = `${API_ENDPOINTS.CARTS}?filters[users_permissions_user][id][$eq]=${userId}&populate=*&${params.toString()}`;

  const { data, error } = await apiClient.get<{ data: CartModel[] }>(url);

  if (error || !data) {
    console.error('Error fetching cart items:', error?.message);
    return [];
  }

  return data.data.map(keysToCamel);
};

export const updateCartItemQuantity = async (
  cartItemId: string,
  newQuantity: number,
): Promise<CartModel> => {
  const { data, error } = await apiClient.put<CartModel>(
    `${API_ENDPOINTS.CARTS}/${cartItemId}`,
    {
      body: { data: keysToSnake({ quantity: newQuantity }) },
    },
  );

  if (error || !data) {
    console.error(ERROR_MESSAGES.UPDATE_CART_ITEM_QUANTITY_FAIL, error);
    throw new Error(ERROR_MESSAGES.UPDATE_CART_ITEM_QUANTITY_FAIL);
  }

  return keysToCamel(data);
};

export const removeCartItem = async (cartItemId: string): Promise<boolean> => {
  const { data, error } = await apiClient.delete(
    `${API_ENDPOINTS.CARTS}/${cartItemId}`,
  );

  if (error) {
    console.error(ERROR_MESSAGES.REMOVE_CART_ITEM_FAIL, error);
    throw new Error(ERROR_MESSAGES.REMOVE_CART_ITEM_FAIL);
  }

  return data as boolean;
};
