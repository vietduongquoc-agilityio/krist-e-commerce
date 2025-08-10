// Constants
import { API_ENDPOINTS, PAGE_SIZE } from '@/constants';

// Models
import { CartModel } from '@/models';

import { apiClient } from '@/services/api';

export interface CartPayload {
  color: string;
  users_permissions_user: string;
  size: string;
  product: string;
  quantity: number;
}

export const addNewproductByAccountId = async (
  payload: CartPayload,
  jwtToken?: string,
) => {
  try {
    const response = await apiClient.post(API_ENDPOINTS.CARTS, {
      body: {
        data: payload,
      },
      headers: { Authorization: `Bearer ${jwtToken}` },
    });

    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getCartItemsByUserId = async (
  userId: string,
  jwtToken?: string,
  searchParams?: {
    page: string;
    pageSize: string;
  },
): Promise<CartModel[]> => {
  const params = new URLSearchParams();

  const page = searchParams?.page ?? '1';
  const pageSize = searchParams?.pageSize ?? String(PAGE_SIZE);

  params.set('pagination[page]', page);
  params.set('pagination[pageSize]', pageSize);

  const url = `${API_ENDPOINTS.CARTS}?filters[users_permissions_user][id][$eq]=${userId}&populate=*&`;

  const { data, error } = await apiClient.get<{ data: CartModel[] }>(url, {
    headers: {
      Authorization: `Bearer ${jwtToken}`,
    },
  });

  if (error || !data) {
    console.error('Error fetching cart items:', error?.message);
    return [];
  }

  return data.data ?? [];
};

export const updateCartItemQuantity = async (
  cartItemId: string,
  newQuantity: number,
  jwtToken?: string,
) => {
  try {
    const response = await apiClient.put(
      `${API_ENDPOINTS.CARTS}/${cartItemId}`,
      {
        headers: { Authorization: `Bearer ${jwtToken}` },
        body: {
          data: { quantity: newQuantity },
        },
      },
    );

    console.log('response update cart item', response.data);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// export const removeCartItem = async (cartItemId: string, jwtToken?: string) => {
//   try {
//     const response = await apiClient.delete(
//       `${API_ENDPOINTS.CARTS}/${cartItemId}`,
//       {
//         headers: { Authorization: `Bearer ${jwtToken}` },
//       },
//     );

//     console.log(`${API_ENDPOINTS.CARTS}/${cartItemId}`);

//     console.log('response remove cart item', response.data);

//     return response.data;
//   } catch (error) {
//     throw error;
//   }
// };

export const removeCartItem = async (
  cartItemDocumentId: string,
  jwtToken?: string,
) => {
  try {
    const response = await apiClient.delete(
      `${API_ENDPOINTS.CARTS}/${cartItemDocumentId}`,
      {
        headers: { Authorization: `Bearer ${jwtToken}` },
      },
    );

    return response.data;
  } catch (error) {
    console.error('Error removing cart item', error);
    throw error;
  }
};

// export const clearCart = async (userId: string, jwtToken?: string) => {
//   try {
//     const cartItems = await getCartItemsByUserId(userId, jwtToken);

//     const deletePromises = cartItems.map((item: any) =>
//       removeCartItem(item.id, jwtToken),
//     );

//     await Promise.all(deletePromises);
//   } catch (error) {
//     throw error;
//   }
// };
