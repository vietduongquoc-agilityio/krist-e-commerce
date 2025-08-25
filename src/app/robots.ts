import { MetadataRoute } from 'next';

// Constants
import { PUBLIC_URL, ROUTER } from '@/constants';

export const robots = (): MetadataRoute.Robots => ({
  rules: {
    userAgent: '*',
    allow: [ROUTER.SIGNIN, ROUTER.SIGNUP, ROUTER.HOME, ROUTER.SHOP],
    disallow: [ROUTER.CART],
  },
  sitemap: `${PUBLIC_URL}/sitemap.xml`,
});

export default robots;
