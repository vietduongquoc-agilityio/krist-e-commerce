import { ProductCardSkeleton } from '@/components/Skeletons';

export const ListProductCardSkeleton = () => {
  return (
    <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-14">
      {Array.from({ length: 6 }).map((_, idx) => (
        <ProductCardSkeleton key={idx} />
      ))}
    </section>
  );
};
