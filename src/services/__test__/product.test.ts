import { getProducts, getProductDetail } from '../product';
import { apiClient } from '@/services';
import {
  filterByBrand,
  filterByColor,
  filterByPrice,
  filterBySearch,
  filterBySize,
} from '@/utils';
import { API_ENDPOINTS } from '@/constants';
import type { ProductModel } from '@/models';

jest.mock('../../services/api', () => ({
  apiClient: {
    get: jest.fn(),
  },
}));

jest.mock('../../utils', () => ({
  filterByBrand: jest.fn((items) => items),
  filterByColor: jest.fn((items) => items),
  filterByPrice: jest.fn((items) => items),
  filterBySearch: jest.fn((items) => items),
  filterBySize: jest.fn((items) => items),
}));

jest.mock('../../constants', () => ({
  API_ENDPOINTS: { PRODUCTS: '/products', CARTS: '/carts' },
  PAGE_SIZE: 10,
  ERROR_MESSAGES: {},
  colorNameToHex: { red: '#FF0000', blue: '#0000FF' },
  colorHexToName: { '#FF0000': 'red', '#0000FF': 'blue' },
}));

describe('Product Service', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('getProducts', () => {
    it('should fetch products and apply all filters with pagination', async () => {
      const mockProducts: ProductModel[] = [
        { documentId: 'p1' } as ProductModel,
        { documentId: 'p2' } as ProductModel,
        { documentId: 'p3' } as ProductModel,
      ];

      (apiClient.get as jest.Mock).mockResolvedValueOnce({
        data: { data: mockProducts },
        error: null,
      });

      const searchParams = {
        page: '1',
        pageSize: '2',
        size: 'M',
        color: 'red',
        brand: 'nike',
        price: '100-200',
        search: 'shirt',
      };

      const result = await getProducts({ searchParams });

      expect(apiClient.get).toHaveBeenCalledWith(API_ENDPOINTS.PRODUCTS, {
        next: { revalidate: 3600 },
      });
      expect(filterBySize).toHaveBeenCalledWith(mockProducts, 'M');
      expect(filterByColor).toHaveBeenCalledWith(mockProducts, 'red');
      expect(filterByBrand).toHaveBeenCalledWith(mockProducts, 'nike');
      expect(filterByPrice).toHaveBeenCalledWith(mockProducts, '100-200');
      expect(filterBySearch).toHaveBeenCalledWith(mockProducts, 'shirt');

      expect(result.productsData).toHaveLength(2);
      expect(result.meta.pagination).toEqual({
        page: 1,
        pageSize: 2,
        total: mockProducts.length,
        pageCount: Math.ceil(mockProducts.length / 2),
      });
      expect(result.error).toBeNull();
    });

    it('should handle when API returns no data', async () => {
      (apiClient.get as jest.Mock).mockResolvedValueOnce({
        data: null,
        error: null,
      });

      const result = await getProducts({});

      expect(result.productsData).toEqual([]);
      expect(result.meta.pagination.total).toBe(0);
    });
  });

  describe('getProductDetail', () => {
    it('should throw error when id is missing', async () => {
      await expect(getProductDetail('')).rejects.toThrow(
        'Product id is required to fetch product detail,',
      );
    });

    it('should fetch product detail by id', async () => {
      const mockProduct: ProductModel = { documentId: 'p1' } as ProductModel;
      (apiClient.get as jest.Mock).mockResolvedValueOnce({
        data: { data: mockProduct },
        error: null,
      });

      const result = await getProductDetail('p1');

      expect(apiClient.get).toHaveBeenCalledWith(
        `${API_ENDPOINTS.PRODUCTS}/p1?populate=*`,
        { next: { revalidate: 3600 } },
      );
      expect(result.productData).toEqual(mockProduct);
      expect(result.error).toBeNull();
    });
  });
});
