import { ProductDetailCard, ProductInfoPanel } from '@/components';
import { productMock } from '@/mocks';

export default function Shop() {
  return (
    <div>
      <ProductInfoPanel />
      <ProductDetailCard product={productMock} />
    </div>
  );
}
