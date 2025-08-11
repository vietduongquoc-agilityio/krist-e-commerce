'use client';

import { Skeleton } from '@heroui/react';

export const CartItemRowSkeleton = () => {
  return (
    <div className="flex w-full items-center gap-4 py-4 border-b border-gray-200">
      <Skeleton className="w-20 h-20 rounded-md" />

      <div className="flex-1 space-y-2">
        <Skeleton className="h-4 w-2/3 rounded" />
        <Skeleton className="h-3 w-1/3 rounded" />
      </div>

      <div className="flex flex-col items-end space-y-2">
        <Skeleton className="h-4 w-12 rounded" />
        <Skeleton className="h-4 w-16 rounded" />
      </div>
    </div>
  );
};
