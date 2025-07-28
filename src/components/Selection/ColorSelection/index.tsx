'use client';

import { useState } from 'react';

// Constants
import { COLOR_LIST } from '@/constants';
import { ColorButton } from '@/components';

interface ColorSelectionProps {
  onChange?: (color: string) => void;
}

export const ColorSelection = ({ onChange }: ColorSelectionProps) => {
  const [selectedColor, setSelectedColor] = useState<string | null>(null);

  const handleSelect = (color: string) => {
    const newColor = selectedColor === color ? null : color;
    setSelectedColor(newColor);
    onChange?.(newColor || '');
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
              color={color}
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
