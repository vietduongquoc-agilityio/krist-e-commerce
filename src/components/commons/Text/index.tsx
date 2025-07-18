'use client';

// interfaces
import { TEXT_SIZE, TEXT_VARIANT } from '@/interfaces';
import { cn } from '@heroui/react';

// Interfaces

const sizes: { [key in TEXT_SIZE]: string } = {
  [TEXT_SIZE['BASE']]: 'text-base',
  [TEXT_SIZE['XL-22']]: 'text-xl-22',
  [TEXT_SIZE['2XL']]: 'text-2xl',
  [TEXT_SIZE['2XL-26']]: 'text-2xl-26',
  [TEXT_SIZE['4XL-42']]: 'text-4xl-42',
};

const variants: { [key in TEXT_VARIANT]: string } = {
  [TEXT_VARIANT.DEFAULT]: 'text-charcoal',
  [TEXT_VARIANT.PRIMARY]: 'text-gray',
  [TEXT_VARIANT.CAPTION]: 'text-customColor-caption',
  [TEXT_VARIANT.DESCRIPTION]: 'text-customColor-description-100',
  [TEXT_VARIANT.ERROR]: 'text-red',
};

export interface TextProps {
  size?: TEXT_SIZE;
  variant?: TEXT_VARIANT;
  as?: React.ElementType;
  className?: string;
}

export const Text = ({
  children,
  size = TEXT_SIZE['2XL'],
  as: Component = 'p',
  variant = TEXT_VARIANT.DEFAULT,
  className,
  ...props
}: React.PropsWithChildren<TextProps>) => {
  const ComponentType = Component as React.ElementType;
  return (
    <ComponentType
      className={`leading-180p ${variants[variant]} ${cn(sizes[size], className)}`}
      {...props}
    >
      {children}
    </ComponentType>
  );
};
