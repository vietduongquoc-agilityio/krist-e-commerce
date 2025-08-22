'use client';

interface ProductDetailCardSkeletonProps {
  count?: number;
}

export const ProductDetailCardSkeleton = ({
  count = 4,
}: ProductDetailCardSkeletonProps) => {
  return (
    <section className="flex gap-[50px] justify-center pt-[78px] animate-pulse">
      {/* Left thumbnails skeleton */}
      <div className="flex flex-col gap-4">
        {Array.from({ length: count }).map((_, i) => (
          <div key={i} className="w-[70px] h-[90px] bg-gray rounded" />
        ))}
      </div>

      {/* Main image skeleton */}
      <div className="w-[491px] h-[655px] bg-gray rounded" />

      {/* Right details skeleton */}
      <div className="flex flex-col w-[615px] gap-6">
        <div className="h-6 w-40 bg-gray rounded" /> {/* title */}
        <div className="h-5 w-24 bg-gray rounded" /> {/* rating */}
        <div className="h-8 w-32 bg-gray rounded" /> {/* price */}
        <div className="h-6 w-full bg-gray rounded" /> {/* stock bar */}
        <div className="h-10 w-full bg-gray rounded" /> {/* sizes */}
        <div className="h-10 w-full bg-gray rounded" /> {/* colors */}
        <div className="h-12 w-full bg-gray rounded" />{' '}
        {/* quantity + button */}
      </div>
    </section>
  );
};
