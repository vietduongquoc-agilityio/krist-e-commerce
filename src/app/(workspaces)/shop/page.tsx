import { ProductItem } from '@/components';
import { colors } from '@/themes/colors';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Shop Page',
  description: 'Browse and purchase products',
};

export default function ShopPage() {
  return (
    <div className="flex mx-auto items-center justify-center">
      <ProductItem
        thumbnailUrl="/images/productItem1.webp"
        title="Rounded Red Hat"
        price={1212}
        colors={[colors.aquaMint, colors.iceBlue]}
      />
      <ProductItem
        thumbnailUrl="/images/productItem1.webp"
        title="Rounded Red Hat"
        price={1212}
        colors={[colors.aquaMint, colors.iceBlue]}
        isSoldOut={true}
      />
    </div>
  );
}
