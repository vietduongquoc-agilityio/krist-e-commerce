// filters.test.ts
import {
  filterBySize,
  filterByColor,
  filterByBrand,
  filterByPrice,
  filterBySearch,
} from '../filter';
import { ProductModel } from '@/models';

const mockProducts: ProductModel[] = [
  {
    id: '1',
    title: 'Red Shirt',
    sizes: ['S', 'M'],
    colors: ['red', 'blue'],
    brand: 'Nike',
    price: 50,
    documentId: '',
    thumbnailUrl: '',
    images: [],
    rating: 0,
    quantity: 0,
    reviewCount: 0,
    stock: 0,
  },
  {
    id: '2',
    title: 'Blue Pants',
    sizes: ['L'],
    colors: ['blue'],
    brand: 'Adidas',
    price: 80,
    documentId: '',
    thumbnailUrl: '',
    images: [],
    rating: 0,
    quantity: 0,
    reviewCount: 0,
    stock: 0,
  },
  {
    id: '3',
    title: 'Green Hat',
    sizes: ['S', 'L'],
    colors: ['green'],
    brand: 'Nike',
    price: 20,
    documentId: '',
    thumbnailUrl: '',
    images: [],
    rating: 0,
    quantity: 0,
    reviewCount: 0,
    stock: 0,
  },
];

describe('filterBySize', () => {
  it('returns all products if size is empty', () => {
    expect(filterBySize(mockProducts, '')).toEqual(mockProducts);
  });
});

describe('filterByColor', () => {
  it('returns all products if color is empty', () => {
    expect(filterByColor(mockProducts, '')).toEqual(mockProducts);
  });
});

describe('filterByBrand', () => {
  it('returns all products if brand is empty', () => {
    expect(filterByBrand(mockProducts, '')).toEqual(mockProducts);
  });

  it('returns empty array if no product matches', () => {
    expect(filterByBrand(mockProducts, 'Puma')).toEqual([]);
  });
});

describe('filterByPrice', () => {
  it('returns all products if price is empty', () => {
    expect(filterByPrice(mockProducts, '')).toEqual(mockProducts);
  });
});

describe('filterBySearch', () => {
  it('returns all products if search is empty', () => {
    expect(filterBySearch(mockProducts, '')).toEqual(mockProducts);
  });

  it('returns empty array if no title matches', () => {
    expect(filterBySearch(mockProducts, 'jacket')).toEqual([]);
  });
});
