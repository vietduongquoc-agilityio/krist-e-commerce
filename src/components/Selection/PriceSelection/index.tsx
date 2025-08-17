'use client';

import { useSearchParams, useRouter } from 'next/navigation';
import { cn } from '@heroui/react';

// Constants
import { PRICE_RANGE, SELECTION_KEY } from '@/constants';

export const PriceSelection = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const selectedPrice = searchParams.get(SELECTION_KEY.PRICE);

  const handleClick = (value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (selectedPrice === value) {
      params.delete(SELECTION_KEY.PRICE);
    } else {
      params.set(SELECTION_KEY.PRICE, value);
    }
    router.push(`?${params.toString()}`);
  };
  return (
    <div className="mb-6">
      <h2 className="text-[18px] font-secondary mb-4">Prices</h2>
      <ul className="space-y-3 text-gray text-sm">
        {PRICE_RANGE.map((range, i) => (
          <li
            key={i}
            onClick={() => handleClick(range.value)}
            className={cn('hover:text-black transition cursor-pointer', {
              'text-black font-semibold': selectedPrice === range.value,
              'text-gray': selectedPrice !== range.value,
            })}
          >
            {range.label}
          </li>
        ))}
      </ul>
    </div>
  );
};
