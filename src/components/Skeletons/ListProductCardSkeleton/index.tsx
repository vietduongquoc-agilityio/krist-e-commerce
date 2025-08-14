import { ProductCardSkeleton } from '@/components/Skeletons';

interface ListProductCardSkeletonProps {
  count?: number;
}

export const ListProductCardSkeleton = ({
  count = 6,
}: ListProductCardSkeletonProps) => {
  return (
    <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-14">
      {Array.from({ length: count }).map((_, idx) => (
        <ProductCardSkeleton key={idx} />
      ))}
    </section>
  );
};
