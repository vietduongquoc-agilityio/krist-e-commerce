'use client';

import { useState } from 'react';
import { Button } from '@heroui/react';

interface QuantityInputProps {
  value?: number;
  min?: number;
  max?: number;
  onChange?: (value: number) => void;
}

export const QuantityInput = ({
  value = 1,
  min = 1,
  max = 99,
  onChange,
}: QuantityInputProps) => {
  const [count, setCount] = useState(value);

  const updateCount = (newValue: number) => {
    if (newValue >= min && newValue <= max) {
      setCount(newValue);
      onChange?.(newValue);
    }
  };

  return (
    <div className="flex items-center border border-gray-200 rounded-lg px-4 py-2 w-fit hover:bg-whiteSmoke transition">
      <Button
        size="sm"
        variant="ghost"
        disabled={count <= min}
        onPress={() => updateCount(count - 1)}
        className="text-xl font-medium text-gray-700 disabled:opacity-50"
      >
        −
      </Button>
      <span className="mx-4 w-4 text-center text-lg">{count}</span>
      <Button
        size="sm"
        variant="ghost"
        disabled={count >= max}
        onPress={() => updateCount(count + 1)}
        className="text-xl font-medium text-gray-700 disabled:opacity-50"
      >
        +
      </Button>
    </div>
  );
};
