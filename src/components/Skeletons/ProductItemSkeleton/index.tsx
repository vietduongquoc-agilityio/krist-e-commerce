'use client';

export const ProductItemSkeleton = () => {
  return (
    <div className="cursor-pointer flex flex-col gap-5 group relative overflow-hidden animate-pulse">
      {/* Image placeholder */}
      <div className="w-[302px] h-[403px] bg-gray" />

      {/* Text + colors */}
      <div className="ml-4 mb-3 w-full">
        {/* Title */}
        <div className="h-5 w-3/4 bg-gray rounded mb-2" />
        {/* Price */}
        <div className="h-4 w-1/4 bg-gray rounded" />

        {/* Color circles */}
        <div className="flex gap-2 mt-4">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="w-5 h-5 rounded-full bg-gray" />
          ))}
        </div>
      </div>
    </div>
  );
};
