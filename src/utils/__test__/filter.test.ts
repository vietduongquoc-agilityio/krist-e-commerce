import {
  filterBySize,
  filterByColor,
  filterByBrand,
  filterByPrice,
  filterBySearch,
} from '../filter';

// Mock
import { PRODUCT_MOCK } from '@/mocks';

describe('filterBySize', () => {
  it('returns all products if size is empty', () => {
    expect(filterBySize(PRODUCT_MOCK, '')).toEqual(PRODUCT_MOCK);
  });
});

describe('filterByColor', () => {
  it('returns all products if color is empty', () => {
    expect(filterByColor(PRODUCT_MOCK, '')).toEqual(PRODUCT_MOCK);
  });
});

describe('filterByBrand', () => {
  it('returns all products if brand is empty', () => {
    expect(filterByBrand(PRODUCT_MOCK, '')).toEqual(PRODUCT_MOCK);
  });

  it('returns empty array if no product matches', () => {
    expect(filterByBrand(PRODUCT_MOCK, 'Puma')).toEqual([]);
  });
});

describe('filterByPrice', () => {
  it('returns all products if price is empty', () => {
    expect(filterByPrice(PRODUCT_MOCK, '')).toEqual(PRODUCT_MOCK);
  });
});

describe('filterBySearch', () => {
  it('returns all products if search is empty', () => {
    expect(filterBySearch(PRODUCT_MOCK, '')).toEqual(PRODUCT_MOCK);
  });

  it('returns empty array if no title matches', () => {
    expect(filterBySearch(PRODUCT_MOCK, 'jacket')).toEqual([]);
  });
});
