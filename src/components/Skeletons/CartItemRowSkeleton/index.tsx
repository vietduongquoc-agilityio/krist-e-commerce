'use client';

export const CartItemRowSkeleton = () => {
  return (
    <div className="flex justify-between items-center py-6 animate-pulse">
      <div className="flex gap-6 w-full max-w-[366px]">
        <div className="bg-gray w-[168px] h-[255px] rounded"></div>
        <div className="flex flex-col gap-4">
          <div className="bg-gray h-6 w-48 rounded"></div>
          <div className="bg-gray h-5 w-32 rounded"></div>
          <div className="bg-gray h-5 w-20 rounded"></div>
        </div>
      </div>
      <div className="bg-gray h-6 w-20 rounded"></div>
      <div className="bg-gray h-10 w-24 rounded"></div>
      <div className="bg-gray h-6 w-20 rounded"></div>
    </div>
  );
};
