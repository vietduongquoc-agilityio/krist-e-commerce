// Models
import { ProductModel } from '@/models';

// Constants
import { API_ENDPOINTS, PAGE_SIZE } from '@/constants';

// Services
import { apiClient } from '@/services';

// Utils
import { parseCommaStringToArray } from '@/utils';

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
    next: { revalidate: 3600 },
  });

  let products = data?.data ?? [];

  if (searchParams?.size) {
    const selectedSizes = Array.isArray(searchParams.size)
      ? searchParams.size
      : searchParams.size.split(',');

    products = products.filter((p) => {
      return selectedSizes.some((size) => p.sizes.includes(size));
    });
  }

  if (searchParams?.color) {
    const selectedColors = searchParams.color.split(',');

    products = products.filter((p) => {
      return selectedColors.some((color) => p.colors.includes(color));
    });
  }

  if (searchParams?.brand) {
    products = products.filter((p) => p.brand === searchParams.brand);
  }

  if (searchParams?.price) {
    console.log(searchParams.price);

    const [min, max] = searchParams.price
      .replace(/\$/g, '')
      .split('-')
      .map(Number);

    products = products.filter((p) => {
      return (
        (!isNaN(min) ? p.price >= min : true) &&
        (!isNaN(max) ? p.price <= max : true)
      );
    });
  }

  if (searchParams?.search) {
    const search = searchParams.search.toLowerCase();
    products = products.filter((p) => p.title.toLowerCase().includes(search));
  }
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
