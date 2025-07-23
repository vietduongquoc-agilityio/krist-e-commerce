import { Banner, ListProductCard } from '@/components';
import { PRODUCTS } from '@/mocks';

export default function LandingPage() {
  return (
    <>
      <Banner />
      <ListProductCard
        products={PRODUCTS.map((product) => ({
          ...product,
          documentId: product.id, // or assign a suitable value if different
        }))}
      />
    </>
  );
}
