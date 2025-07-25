import { Metadata } from 'next';

// Components
import { Breadcrumb } from '@/components';

export const metadata: Metadata = {
  title: 'Shop Page',
  description: 'Browse and purchase products',
};

export default function ShopPage() {
  return (
    <div>
      <Breadcrumb items={[{ name: 'Home', href: '/' }, { name: 'Shop' }]} />
    </div>
  );
}
