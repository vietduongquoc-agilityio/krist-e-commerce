import { Banner } from '@/components';

import { ProductCard } from '@/components';

export default function LandingPage() {
  return (
    <>
      <Banner />
      <ProductCard
        thumbnailUrl="/images/product-img.webp"
        title="Shiny Dress"
        brand="Al Karam"
        rating={3}
        reviews="4.1k"
        price={95.5}
        status="Almost Sold Out"
        id={''}
        documentId={''}
      />
    </>
  );
}
