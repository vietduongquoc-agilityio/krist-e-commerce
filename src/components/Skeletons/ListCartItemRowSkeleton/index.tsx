'use client';

// Components
import { CartItemRowSkeleton } from '@/components';

interface ListCartItemRowSkeletonProps {
  count?: number;
}

export const ListCartItemRowSkeleton = ({
  count = 3,
}: ListCartItemRowSkeletonProps) => {
  return (
    <div className="border-y border-gray divide-y divide-gray w-full max-w-[1280px] mx-auto">
      {Array.from({ length: count }).map((_, idx) => (
        <CartItemRowSkeleton key={idx} />
      ))}
    </div>
  );
};
