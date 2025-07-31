import { Metadata } from 'next';

// Components
import { Breadcrumb, CartContent } from '@/components';

// Mock
import { productMock } from '@/mocks';

export const metadata: Metadata = {
  title: 'Cart Page',
  description: 'View and manage your shopping cart',
};

export default function CartPage() {
  return (
    <section>
      {/* Breadcrumb */}
      <Breadcrumb
        items={[{ name: 'Home', href: '/' }, { name: 'Shopping Cart' }]}
      />

      <CartContent items={productMock} />
    </section>
  );
}
