'use client';

import { useState } from 'react';
import { cn } from '@heroui/react';

// Constants
import { COLOR_LIST } from '@/constants';

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
            <button
              key={color}
              type="button"
              className={cn(
                'w-8 h-8 rounded-full flex items-center justify-center border-1 transition-colors',
                isSelected ? 'border-black' : 'border-gray',
              )}
              onClick={() => handleSelect(color)}
            >
              <div
                className={cn(
                  'rounded-full transition-all',
                  isSelected ? 'w-6 h-6 hover:scale-105' : 'w-8 h-8',
                )}
                style={{ backgroundColor: color }}
              />
            </button>
          );
        })}
      </div>
    </div>
  );
};
