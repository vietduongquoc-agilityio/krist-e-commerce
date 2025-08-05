// Models
import { ProductModel } from '@/models';

// Constants
import { API_ENDPOINTS, PAGE_SIZE } from '@/constants';

// Services
import { apiClient } from '@/services';

type IParams = {
  searchParams?: {
    page: string;
    pageSize: string;
  };
};

export const getProducts = async ({ searchParams }: IParams) => {
  const params = new URLSearchParams();
  const page = searchParams?.page ?? '1';
  const pageSize = searchParams?.pageSize ?? String(PAGE_SIZE);

  params.set('pagination[page]', page);
  params.set('pagination[pageSize]', pageSize);

  const url = `${API_ENDPOINTS.PRODUCTS}?${params.toString()}`;

  console.log(url);

  const { data, error } = await apiClient.get<{
    data: ProductModel[];
    meta: any;
  }>(url, {
    next: { revalidate: 3600 },
  });

  return {
    productsData: data?.data,
    meta: data?.meta,
    error,
  };
};
