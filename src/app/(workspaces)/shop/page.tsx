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

// Services
import { getProducts } from '@/services';

export const metadata: Metadata = {
  title: 'Shop Page',
  description: 'Browse and purchase products',
};

interface ShopPageProps {
  searchParams: Promise<{
    page: string;
    pageSize: string;
  }>;
}

export default async function ShopPage({ searchParams }: ShopPageProps) {
  const params = await searchParams;
  const { productsData, meta } = await getProducts({ searchParams: params });

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
          <ListProductItem items={productsData || []} meta={meta} />
        </div>
      </div>

      {/* About Section */}
      <AboutSection />

      {/* Model Section */}
      <ModelSection />
    </section>
  );
}
