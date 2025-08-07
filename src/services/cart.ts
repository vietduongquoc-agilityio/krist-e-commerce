import { API_ENDPOINTS } from '@/constants';

import { apiClient } from '@/services/api';

export interface CartPayload {
  color: string;
  product: string;
  documentId?: string;
  title: string;
  price: string;
  thumbnailUrl: string;
  quantity: number;
  stock: number;
}

export const addNewCardByAccountId = async (
  users_permissions_user: string,
  payload: CartPayload,
  jwtToken?: string,
) => {
  try {
    const response = await apiClient.post(API_ENDPOINTS.CARTS, {
      headers: { Authorization: `Bearer ${jwtToken}` },
      body: {
        users_permissions_user,
        data: payload,
      },
    });

    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getCartItemsByUserId = async (
  userId: string,
  jwtToken?: string,
) => {
  try {
    const response = await apiClient.get(
      `${API_ENDPOINTS.CARTS}?filters[users_permissions_user][id][$eq]=${userId}`,
      {
        headers: { Authorization: `Bearer ${jwtToken}` },
      },
    );

    return response.data || [];
  } catch (error) {
    throw error;
  }
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

    return response.data;
  } catch (error) {
    throw error;
  }
};

export const removeCartItem = async (cartItemId: string, jwtToken?: string) => {
  try {
    const response = await apiClient.delete(
      `${API_ENDPOINTS.CARTS}/${cartItemId}`,
      {
        headers: { Authorization: `Bearer ${jwtToken}` },
      },
    );

    return response.data;
  } catch (error) {
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
