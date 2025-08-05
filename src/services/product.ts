// Models
import { ProductModel } from '@/models';

// Constants
import { API_ENDPOINTS } from '@/constants';

// Services
import { apiClient } from '@/services';

export const getProducts = async () => {
  const url = `${API_ENDPOINTS.PRODUCTS}`;

  console.log('url', url);

  const { data, error } = await apiClient.get<{
    data: ProductModel[];
    meta: any;
  }>(url, {
    next: { revalidate: 3600 },
  });

  console.log('dataServices', data);

  return { productsData: data?.data, error };
};
