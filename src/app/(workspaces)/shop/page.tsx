import { Metadata } from 'next';

// Components
import {
  AboutSection,
  BrandSelection,
  Breadcrumb,
  ColorSelection,
  ListProductItem,
  ModelSection,
  PriceSelection,
  SizeSelection,
} from '@/components';

// Mocks
import { ITEMS } from '@/mocks';

export const metadata: Metadata = {
  title: 'Shop Page',
  description: 'Browse and purchase products',
};

export default function ShopPage() {
  return (
    <section>
      {/* Breadcrumb */}
      <Breadcrumb items={[{ name: 'Home', href: '/' }, { name: 'Shop' }]} />

      {/* Filter Section */}
      <div className="w-full max-w-[1281px] mx-auto flex">
        <div className="mr-5 flex flex-col gap-6">
          <h4 className="text-[30px] font-secondary">Filter</h4>
          <SizeSelection />

          <ColorSelection />

          <PriceSelection />

          <BrandSelection />
        </div>

        <div>
          <ListProductItem items={ITEMS} />
        </div>
      </div>

      {/* About Section */}
      <AboutSection />

      {/* Model Section */}
      <ModelSection />
    </section>
  );
}
