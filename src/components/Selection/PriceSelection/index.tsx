'use client';

import { useSearchParams, useRouter } from 'next/navigation';

// Constants
import { PRICE_RANGE, QUERY_KEY } from '@/constants';

export const PriceSelection = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const selectedPrice = searchParams.get(QUERY_KEY.PRICE);

  const handleClick = (value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (selectedPrice === value) {
      params.delete(QUERY_KEY.PRICE);
    } else {
      params.set(QUERY_KEY.PRICE, value);
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
            className="cursor-pointer hover:text-black transition"
          >
            {range.label}
          </li>
        ))}
      </ul>
    </div>
  );
};
