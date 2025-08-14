import { Suspense } from 'react';
import { notFound } from 'next/navigation';

// Components
import { AboutSection } from '@/components';
import { ProductDetailCard } from '@/components/Card';

// Services
import { getProductDetail } from '@/services';

export default async function ProductDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const { productData, error } = await getProductDetail(id);

  if (error) {
    return (
      <h2 className="text-red text-2xl p-4 font-medium tracking-[2%]">
        No product found
      </h2>
    );
  }

  if (!productData) {
    notFound();
  }

  return (
    <div>
      {/* Product Detail Card */}
      <Suspense>
        <ProductDetailCard product={productData} />
      </Suspense>

      {/* About Section */}
      <AboutSection />
    </div>
  );
}
