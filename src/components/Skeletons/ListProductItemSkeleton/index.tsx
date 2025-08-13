'use client';

import { ProductItemSkeleton } from '@/components';

interface ListProductItemSkeletonProps {
  count?: number;
}

export const ListProductItemSkeleton = ({
  count = 6,
}: ListProductItemSkeletonProps) => {
  return (
    <section className="items-center flex flex-col gap-16">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-14">
        {Array.from({ length: count }).map((_, i) => (
          <ProductItemSkeleton key={i} />
        ))}
      </div>

      <div className="w-full flex justify-center mt-8">
        <div className="h-10 w-48 bg-gray rounded animate-pulse"></div>
      </div>
    </section>
  );
};
