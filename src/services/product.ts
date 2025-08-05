// Models
import { ProductModel } from '@/models';

// Constants
import { API_ENDPOINTS } from '@/constants';

// Services
import { apiClient } from '@/services';

export const getProducts = async () => {
  const url = `${API_ENDPOINTS.PRODUCTS}`;

  const { data, error } = await apiClient.get<{
    data: ProductModel[];
    meta: any;
  }>(url, {
    next: { revalidate: 3600 },
  });

  return { productsData: data?.data, error };
};
