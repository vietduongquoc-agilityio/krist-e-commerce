import {
  filterBySize,
  filterByColor,
  filterByBrand,
  filterByPrice,
  filterBySearch,
} from '../filter';

// Mock
import { PRODUCTMOCK } from '@/mocks';

describe('filterBySize', () => {
  it('returns all products if size is empty', () => {
    expect(filterBySize(PRODUCTMOCK, '')).toEqual(PRODUCTMOCK);
  });
});

describe('filterByColor', () => {
  it('returns all products if color is empty', () => {
    expect(filterByColor(PRODUCTMOCK, '')).toEqual(PRODUCTMOCK);
  });
});

describe('filterByBrand', () => {
  it('returns all products if brand is empty', () => {
    expect(filterByBrand(PRODUCTMOCK, '')).toEqual(PRODUCTMOCK);
  });

  it('returns empty array if no product matches', () => {
    expect(filterByBrand(PRODUCTMOCK, 'Puma')).toEqual([]);
  });
});

describe('filterByPrice', () => {
  it('returns all products if price is empty', () => {
    expect(filterByPrice(PRODUCTMOCK, '')).toEqual(PRODUCTMOCK);
  });
});

describe('filterBySearch', () => {
  it('returns all products if search is empty', () => {
    expect(filterBySearch(PRODUCTMOCK, '')).toEqual(PRODUCTMOCK);
  });

  it('returns empty array if no title matches', () => {
    expect(filterBySearch(PRODUCTMOCK, 'jacket')).toEqual([]);
  });
});
