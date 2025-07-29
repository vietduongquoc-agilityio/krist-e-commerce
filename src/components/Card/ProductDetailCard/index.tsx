'use client';

import {
  Button,
  ColorButton,
  IconStar,
  ProductInfoPanel,
  QuantityInput,
  SaleCountdown,
  StarRating,
  StockStatusBar,
  ViewerCount,
} from '@/components';
import { ProductModel } from '@/models';

import Image from 'next/image';
import { useState } from 'react';

interface ProductDetailCardProps {
  product: ProductModel;
}

export const ProductDetailCard = ({ product }: ProductDetailCardProps) => {
  const {
    title,
    price,
    salePrice,
    thumbnailUrl,
    colors,
    sizes,
    rating,
    reviewCount,
    onChange,
    stock = 4,
    maxStock,
  } = product;

  const [selectedColor, setSelectedColor] = useState<string | null>(null);

  const handleSelect = (color: string) => {
    const newColor = selectedColor === color ? null : color;
    setSelectedColor(newColor);
    onChange?.(newColor || '');
  };

  return (
    <div className="flex gap-[50px] justify-center">
      <figure>
        <Image
          src={thumbnailUrl}
          alt={title}
          width={491}
          height={655}
          sizes="(100vw - 20px) 100vw, 491px"
        />
      </figure>

      {/* Right Details */}
      <div className="flex flex-col w-[615px]">
        <div className="mb-16 px-4">
          <p className="font-secondary text-charcoal/80 text-[14px] mb-2">
            Fasco
          </p>
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-semibold">{title}</h2>
            <IconStar className="w-11 h-11 border border-lightGray rounded-full p-[11px] cursor-not-allowed hover:bg-whiteSmoke transition" />
          </div>

          <StarRating rating={rating} reviewCount={reviewCount} />

          <div className="flex items-center gap-3 my-8">
            {salePrice && (
              <span className="text-[24px] font-secondary">
                ${salePrice.toLocaleString()}
              </span>
            )}
            <span
              className={`text-gray line-through ${
                salePrice
                  ? 'text-base'
                  : 'text-xl font-bold text-black line-none'
              }`}
            >
              ${price.toLocaleString()}
            </span>
            {salePrice && (
              <span className="text-sm font-secondary text-white bg-strawberry py-[1px] px-3 rounded-10">
                Save 33%
              </span>
            )}
          </div>
          {/* Viewer Count */}
          <ViewerCount />

          {/* Sale Countdown */}
          <SaleCountdown />

          {/* Stock Status Bar */}
          <StockStatusBar inStock={stock} maxStock={maxStock || 100} />

          {/* Sizes */}
          <div className="flex gap-2 flex-col my-5">
            <span className="font-bold font-secondary">Sizes</span>
            <div className="flex gap-2">
              {sizes.map((size) => (
                <div
                  key={size}
                  className="w-11 h-11 flex items-center justify-center border text-[18px ] border-gray text-black rounded cursor-pointer hover:border-black hover:bg-black hover:text-white transition"
                >
                  {size}
                </div>
              ))}
            </div>
          </div>

          {/* Colors */}
          <div className="flex gap-3 flex-col">
            <span className="font-bold font-secondary">Colors</span>
            <div className="flex gap-[10px]">
              {(colors ?? []).map((color) => {
                const isSelected = selectedColor === color;
                return (
                  <ColorButton
                    key={color}
                    color={color}
                    isSelected={isSelected}
                    onClick={() => handleSelect(color)}
                    as="div"
                  />
                );
              })}
            </div>
          </div>

          {/* Add to Cart Button */}
          <div className="flex mt-7 flex-col">
            <span className="font-bold font-secondary">Quantity</span>
            <div className="flex gap-9 mt-3">
              <QuantityInput />
              <Button variant="ghost" className="font-secondary">
                Add to cart
              </Button>
            </div>
          </div>
        </div>

        {/* Product Info Panel */}
        <ProductInfoPanel />
      </div>
    </div>
  );
};
