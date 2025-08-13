import { Metadata } from 'next';
import { Suspense } from 'react';

// Components
import {
  AboutSection,
  BrandSelection,
  Breadcrumb,
  ColorSelection,
  ModelSection,
  PriceSelection,
  SizeSelection,
} from '@/components';
import { ListProductItemContainer } from '@/components/Item';
import { ListProductItemSkeleton } from '@/components/Skeletons';

export const metadata: Metadata = {
  title: 'Shop Page',
  description: 'Browse and purchase products',
};

interface ShopPageProps {
  searchParams: Promise<{
    page?: string;
    pageSize?: string;
    size?: string;
    color?: string;
    brand?: string;
    price?: string;
    search?: string;
  }>;
}

export default async function ShopPage({ searchParams }: ShopPageProps) {
  const params = await searchParams;

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

        {/* <Suspense fallback={<ListProductItemSkeleton />}> */}
        <ListProductItemContainer searchParams={params} />
        {/* </Suspense> */}
      </div>

      {/* About Section */}
      <AboutSection />

      {/* Model Section */}
      <ModelSection />
    </section>
  );
}
