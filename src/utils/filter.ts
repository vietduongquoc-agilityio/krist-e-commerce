// Models
import { ProductModel } from '@/models';

export const filterBySize = (
  products: ProductModel[],
  size: string,
): ProductModel[] => {
  const selectedSizes = Array.isArray(size) ? size : size.split(',');
  return products.filter((p) => selectedSizes.some((s) => p.sizes.includes(s)));
};

export const filterByColor = (
  products: ProductModel[],
  color: string,
): ProductModel[] => {
  const selectedColors = color.split(',');
  return products.filter((p) =>
    selectedColors.some((c) => p.colors.includes(c)),
  );
};

export const filterByBrand = (
  products: ProductModel[],
  brand: string,
): ProductModel[] => {
  return products.filter((p) => p.brand === brand);
};

export const filterByPrice = (
  products: ProductModel[],
  price: string,
): ProductModel[] => {
  const [min, max] = price.replace(/\$/g, '').split('-').map(Number);
  return products.filter((p) => {
    return (
      (!isNaN(min) ? p.price >= min : true) &&
      (!isNaN(max) ? p.price <= max : true)
    );
  });
};

export const filterBySearch = (
  products: ProductModel[],
  search: string,
): ProductModel[] => {
  const lowerSearch = search.toLowerCase();
  return products.filter((p) => p.title.toLowerCase().includes(lowerSearch));
};
