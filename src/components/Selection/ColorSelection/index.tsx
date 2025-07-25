'use client';

import { useState } from 'react';
import { Button, cn } from '@heroui/react';

// Constants
import { COLOR_LIST } from '@/constants';

interface ColorSelectionProps {
  onChange?: (color: string) => void;
}

export const ColorSelection = ({ onChange }: ColorSelectionProps) => {
  const [selectedColor, setSelectedColor] = useState<string | null>(null);

  const handleSelect = (color: string) => {
    const isSame = selectedColor === color;
    const newColor = isSame ? null : color;
    setSelectedColor(newColor);
    onChange?.(newColor || '');
  };

  return (
    <div className="mb-6">
      <h2 className="text-[18px] font-secondary mb-4">Colors</h2>
      <div className="grid grid-cols-7 gap-3 max-w-[320px]">
        {COLOR_LIST.map((color, index) => (
          <Button
            onPress={() => handleSelect(color)}
            key={index}
            className={cn(
              'w-[30px] h-[33px] rounded-full border-1 transition-all',
              {
                'border-charcoal': selectedColor === color,
                'border-transparent': selectedColor !== color,
              },
            )}
            style={{ backgroundColor: color }}
            aria-label={`Color ${color}`}
          />
        ))}
      </div>
    </div>
  );
};
