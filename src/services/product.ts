// Models
import { ProductModel } from '@/models';

// Constants
import { API_ENDPOINTS, PAGE_SIZE } from '@/constants';

// Services
import { apiClient } from '@/services';

// Utils
import {
  filterByBrand,
  filterByColor,
  filterByPrice,
  filterBySearch,
  filterBySize,
} from '@/utils';

type IParams = {
  searchParams?: {
    page?: string;
    pageSize?: string;
    size?: string;
    color?: string;
    brand?: string;
    price?: string;
    search?: string;
  };
};

export const getProducts = async ({ searchParams }: IParams) => {
  const page = Number(searchParams?.page ?? 1);
  const pageSize = Number(searchParams?.pageSize ?? PAGE_SIZE);

  const { data, error } = await apiClient.get<{
    data: ProductModel[];
  }>(API_ENDPOINTS.PRODUCTS, {
    next: { revalidate: 300 },
  });

  let products = data?.data ?? [];

  products = filterBySize(products, searchParams?.size ?? '');
  products = filterByColor(products, searchParams?.color ?? '');
  products = filterByBrand(products, searchParams?.brand ?? '');
  products = filterByPrice(products, searchParams?.price ?? '');
  products = filterBySearch(products, searchParams?.search ?? '');

  const total = products.length;
  const start = (page - 1) * pageSize;
  const end = start + pageSize;
  const paginatedItems = products.slice(start, end);

  return {
    productsData: paginatedItems,
    meta: {
      pagination: {
        page,
        pageSize,
        total,
        pageCount: Math.ceil(total / pageSize),
      },
    },
    error,
  };
};

export const getProductDetail = async (id: string) => {
  if (!id) {
    throw new Error('Product id is required to fetch product detail,');
  }

  const url = `${API_ENDPOINTS.PRODUCTS}/${id}?populate=*`;

  const { data, error } = await apiClient.get<{ data: ProductModel }>(url, {
    next: { revalidate: 300 },
  });

  return {
    productData: data?.data,
    error,
  };
};
