import {
  filterBySize,
  filterByColor,
  filterByBrand,
  filterByPrice,
  filterBySearch,
} from '../filter';

// Mock
import { productMock } from '@/mocks';

describe('filterBySize', () => {
  it('returns all products if size is empty', () => {
    expect(filterBySize(productMock, '')).toEqual(productMock);
  });
});

describe('filterByColor', () => {
  it('returns all products if color is empty', () => {
    expect(filterByColor(productMock, '')).toEqual(productMock);
  });
});

describe('filterByBrand', () => {
  it('returns all products if brand is empty', () => {
    expect(filterByBrand(productMock, '')).toEqual(productMock);
  });

  it('returns empty array if no product matches', () => {
    expect(filterByBrand(productMock, 'Puma')).toEqual([]);
  });
});

describe('filterByPrice', () => {
  it('returns all products if price is empty', () => {
    expect(filterByPrice(productMock, '')).toEqual(productMock);
  });
});

describe('filterBySearch', () => {
  it('returns all products if search is empty', () => {
    expect(filterBySearch(productMock, '')).toEqual(productMock);
  });

  it('returns empty array if no title matches', () => {
    expect(filterBySearch(productMock, 'jacket')).toEqual([]);
  });
});
