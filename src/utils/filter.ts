// Models
import { ProductModel } from '@/models';

export const filterBySize = (
  products: ProductModel[],
  size: string,
): ProductModel[] => {
  if (!size) return products;

  const selectedSizes = Array.isArray(size) ? size : size.split(',');
  return products.filter((p) => selectedSizes.some((s) => p.sizes.includes(s)));
};

export const filterByColor = (
  products: ProductModel[],
  color: string,
): ProductModel[] => {
  if (!color) return products;

  const selectedColors = color.split(',');
  return products.filter((p) =>
    selectedColors.some((c) => p.colors.includes(c)),
  );
};

export const filterByBrand = (
  products: ProductModel[],
  brand: string,
): ProductModel[] => {
  if (!brand) return products;

  return products.filter((p) => p.brand === brand);
};

export const filterByPrice = (
  products: ProductModel[],
  price: string,
): ProductModel[] => {
  if (!price) return products;

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
  if (!search) return products;

  const lowerSearch = search.toLowerCase();
  return products.filter((p) => p.title.toLowerCase().includes(lowerSearch));
};
