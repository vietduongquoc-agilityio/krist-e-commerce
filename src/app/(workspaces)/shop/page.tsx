import { Metadata } from 'next';

// Components
import { Breadcrumb, ColorSelection } from '@/components';
import { SizeSelection } from '@/components/Selection/SizeSelection';

export const metadata: Metadata = {
  title: 'Shop Page',
  description: 'Browse and purchase products',
};

export default function ShopPage() {
  return (
    <div>
      <Breadcrumb items={[{ name: 'Home', href: '/' }, { name: 'Shop' }]} />
      <div className="ml-96">
        <SizeSelection />

        <ColorSelection />
      </div>
    </div>
  );
}
