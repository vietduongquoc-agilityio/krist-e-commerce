'use client';

// Constants
import { PRICE_RANGE } from '@/constants';

export const PriceSelection = () => {
  return (
    <div className="mb-6">
      <h2 className="text-[18px] font-secondary mb-4">Prices</h2>
      <ul className="space-y-3 text-gray text-sm">
        {PRICE_RANGE.map((range, i) => (
          <li key={i} className="cursor-pointer hover:text-black transition">
            {range}
          </li>
        ))}
      </ul>
    </div>
  );
};
