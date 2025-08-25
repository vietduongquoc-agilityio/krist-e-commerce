// src/app/sitemap.ts
import { MetadataRoute } from 'next';

// Constants
import { PUBLIC_URL, ROUTER } from '@/constants';

// Services
import { getProducts } from '@/services';

// Models
import { ProductModel } from '@/models';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // Static routes
  const staticRoutes = [
    ROUTER.HOME,
    ROUTER.SIGNIN,
    ROUTER.SIGNUP,
    ROUTER.SHOP,
  ].map((route) => ({
    url: `${PUBLIC_URL}${route}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: route === ROUTER.HOME ? 1 : 0.8,
  }));

  // Dynamic routes (products)
  const { productsData } = await getProducts({ searchParams: {} });

  const dynamicRoutes =
    productsData?.map((product: ProductModel) => ({
      url: `${PUBLIC_URL}${ROUTER.SHOP}/${product.documentId}`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.7,
    })) ?? [];

  return [...staticRoutes, ...dynamicRoutes];
}
