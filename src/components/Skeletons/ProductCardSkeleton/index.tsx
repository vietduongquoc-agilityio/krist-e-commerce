interface ProductCardSkeletonProps {
  starCount?: number;
}

export const ProductCardSkeleton = ({
  starCount = 5,
}: ProductCardSkeletonProps) => {
  return (
    <div className="bg-white rounded-[10px] shadow-md pt-5 px-6 w-full max-w-[386px] animate-pulse">
      {/* Image */}
      <div className="w-[336px] h-[244px] bg-gray rounded-2xl" />

      <div className="mt-4 space-y-1">
        {/* Title + Brand + Stars */}
        <div className="flex items-center justify-between pb-4">
          <div>
            <div className="h-5 w-40 bg-gray rounded mb-2" />
            <div className="h-3 w-20 bg-gray rounded" />
          </div>
          <div className="flex items-center space-x-1">
            {Array.from({ length: starCount }).map((_, idx) => (
              <div key={idx} className="w-4 h-4 bg-gray rounded-full" />
            ))}
          </div>
        </div>

        {/* Reviews */}
        <div className="h-3 w-32 bg-gray rounded" />

        {/* Price + Status */}
        <div className="flex items-center justify-between pt-4 pb-6">
          <div className="h-5 w-16 bg-gray rounded" />
          <div className="h-4 w-12 bg-gray rounded" />
        </div>
      </div>
    </div>
  );
};
