'use client';

import { useState } from 'react';
import { Button } from '@heroui/react';

interface QuantityInputProps {
  value?: number;
  min?: number;
  max?: number;
  onChange?: (value: number) => void;
  isDisabled?: boolean;
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

  const isDecrementDisabled = count <= min;
  const isIncrementDisabled = count >= max;

  const commonButtonStyle = 'transition hover:bg-whiteSmoke';
  const disabledStyle = 'cursor-not-allowed opacity-50';

  return (
    <div className="flex items-center border border-gray rounded-lg px-4 py-2 w-fit hover:bg-whiteSmoke transition">
      <Button
        size="sm"
        variant="ghost"
        disabled={isDecrementDisabled}
        onPress={() => updateCount(count - 1)}
        className={`${commonButtonStyle} ${isDecrementDisabled ? disabledStyle : ''}`}
        title={isDecrementDisabled ? 'Cannot reduce further' : undefined}
      >
        −
      </Button>
      <span className="mx-4 w-4 text-center text-lg transition-all duration-200 ease-in-out">
        {count}
      </span>
      <Button
        size="sm"
        variant="ghost"
        disabled={isIncrementDisabled}
        onPress={() => updateCount(count + 1)}
        className={`${commonButtonStyle} ${isIncrementDisabled ? disabledStyle : ''}`}
        title={isIncrementDisabled ? 'Cannot increase' : undefined}
      >
        +
      </Button>
    </div>
  );
};
