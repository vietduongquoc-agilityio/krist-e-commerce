'use client';

import { useSearchParams, useRouter } from 'next/navigation';
import { cn } from '@heroui/react';

// Constants
import { BRANDS, SELECTION_KEY } from '@/constants';

export const BrandSelection = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const selectedBrand = searchParams.get(SELECTION_KEY.BRAND);

  const handleClick = (brand: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (selectedBrand === brand) {
      params.delete(SELECTION_KEY.BRAND);
    } else {
      params.set(SELECTION_KEY.BRAND, brand);
    }
    router.push(`?${params.toString()}`);
  };

  return (
    <div className="mb-6 w-full">
      <div className="flex items-center justify-between cursor-pointer max-w-[310px]">
        <h2 className="text-[18px] font-secondary">Brands</h2>
      </div>

      <div className="flex flex-wrap gap-2 mt-3 text-gray max-w-[220px]">
        {BRANDS.map((brand, i) => (
          <span
            key={i}
            onClick={() => handleClick(brand)}
            className={cn('hover:text-black transition cursor-pointer', {
              'text-black font-semibold': selectedBrand === brand,
              'text-gray': selectedBrand !== brand,
            })}
          >
            {brand}
          </span>
        ))}
      </div>
    </div>
  );
};
