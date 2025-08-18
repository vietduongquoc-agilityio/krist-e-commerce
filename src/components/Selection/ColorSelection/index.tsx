'use client';

import { useSearchParams, useRouter } from 'next/navigation';

// Constants
import { COLOR_LIST, HexColorMapping, SELECTION_KEY } from '@/constants';

// Components
import { ColorButton } from '@/components';

export const ColorSelection = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const selectedColor = searchParams.get(SELECTION_KEY.COLOR);

  const handleSelect = (color: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (selectedColor === color) {
      params.delete(SELECTION_KEY.COLOR);
    } else {
      params.set(SELECTION_KEY.COLOR, color);
    }
    router.push(`?${params.toString()}`);
  };

  return (
    <div className="mb-6">
      <h2 className="text-[18px] font-secondary mb-4">Colors</h2>
      <div className="grid grid-cols-7 gap-3 max-w-[320px]">
        {COLOR_LIST.map((color) => {
          const isSelected = selectedColor === color;
          return (
            <ColorButton
              key={color}
              color={HexColorMapping[color]}
              isSelected={isSelected}
              onClick={() => handleSelect(color)}
              as="button"
            />
          );
        })}
      </div>
    </div>
  );
};
