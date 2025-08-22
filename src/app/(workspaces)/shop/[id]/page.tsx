import { Suspense } from 'react';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

// Components
import { AboutSection } from '@/components';
import { ProductDetailCard } from '@/components/Card';

// Services
import { getProductDetail } from '@/services';

// Components
import { ProductDetailCardSkeleton } from '@/components/Skeletons';

interface Props {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const { productData, error } = await getProductDetail(id);

  if (error) {
    return {
      title: 'Error loading product',
      description:
        'There was a problem fetching product details. Please try again later.',
    };
  }

  if (!productData) {
    return {
      title: 'Product not found',
      description: 'The requested product could not be found',
    };
  }

  return {
    title: productData.title,
    description: productData.description?.slice(0, 160) ?? 'Product details',
    openGraph: {
      title: productData.title,
      description: productData.description ?? 'Check out this product',
      images: [
        {
          url: productData.thumbnailUrl,
          alt: productData.title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: productData.title,
      description: productData.description ?? 'Check out this product',
      images: [productData.thumbnailUrl],
    },
  };
}

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
      <Suspense fallback={<ProductDetailCardSkeleton />}>
        <ProductDetailCard product={productData} />
      </Suspense>

      {/* About Section */}
      <AboutSection />
    </div>
  );
}
