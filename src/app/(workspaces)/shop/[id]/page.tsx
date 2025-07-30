// Components
import { AboutSection, ProductDetailCard } from '@/components';

// Mock
import { productMock } from '@/mocks';

export default function Shop() {
  return (
    <div>
      {/* Product Detail Card */}
      <ProductDetailCard product={productMock} />

      {/* About Section */}
      <AboutSection />
    </div>
  );
}
