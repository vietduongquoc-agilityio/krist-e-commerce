'use client';

import Image from 'next/image';
import { useState } from 'react';
import { useSession } from 'next-auth/react';

// Components
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

import { colorNameToHex, parseCommaStringToArray, toastManager } from '@/utils';

// Models
import { ProductModel } from '@/models';

// Constants
import { ERROR_MESSAGES, SUCCESS_MESSAGES } from '@/constants';

// Services
import { addNewCardByAccountId, CartPayload } from '@/services';

interface ProductDetailCardProps {
  product: ProductModel;
}

export const ProductDetailCard = ({ product }: ProductDetailCardProps) => {
  const {
    title,
    price,
    salePrice,
    thumbnailUrl,
    rating,
    reviewCount,
    stock = 0,
    id,
  } = product;

  const images = Array.isArray(product.images)
    ? product.images
    : product.images
      ? parseCommaStringToArray(product.images)
      : [];

  const sizes = Array.isArray(product.sizes)
    ? product.sizes
    : product.sizes
      ? parseCommaStringToArray(product.sizes)
      : [];

  const colors = Array.isArray(product.colors)
    ? product.colors
    : product.colors
      ? parseCommaStringToArray(product.colors)
      : [];

  const [quantity, setQuantity] = useState(1);
  const [selectedColor, setSelectedColor] = useState<string | null>(null);
  const [selectedImage, setSelectedImage] = useState(thumbnailUrl);
  const [selectedSize, setSelectedSize] = useState<string | null>(null);

  const handleSelectColor = (color: string) => {
    const newColor = selectedColor === color ? null : color;
    setSelectedColor(newColor);
  };

  const handleSelectSize = (size: string) => {
    const newSize = selectedSize === size ? null : size;
    setSelectedSize(newSize);
  };

  const { data: session } = useSession();

  const handleAddToCart = async () => {
    if (!selectedColor || !selectedSize) {
      toastManager.showToast(
        ERROR_MESSAGES.PLEASE_SELECT_COLOR,
        'error',
        'top-center',
      );
      return;
    }

    const item: CartPayload = {
      title,
      thumbnailUrl,
      price: salePrice || price,
      color: colorNameToHex[selectedColor] || selectedColor,
      quantity,
      stock,
      product: id,
    };
    try {
      await addNewCardByAccountId(
        session?.user.id || '',
        item,
        session?.user.token,
      );
    } catch (error) {
      toastManager.showToast(
        ERROR_MESSAGES.ADD_TO_CART_FAIL,
        'error',
        'top-center',
      );
    }

    toastManager.showToast(
      SUCCESS_MESSAGES.ADD_PRODUCT_TO_CART,
      'success',
      'top-center',
    );
  };

  return (
    <section key={id} className="flex gap-[50px] justify-center pt-[78px]">
      <div className="flex flex-col gap-4">
        {(images.length > 0 ? images : [thumbnailUrl]).map((img, index) => (
          <Button
            key={index}
            onClick={() => setSelectedImage(img)}
            className={`w-[70px] h-[90px] relative ${
              selectedImage === img
                ? 'border-whiteSmoke ring-2 ring-gray ring-offset-2'
                : 'border-transparent'
            }  border-whiteSmoke rounded-none overflow-hidden hover:border-gray transition`}
          >
            <Image
              src={img}
              alt={`Thumbnail ${index + 1}`}
              fill
              sizes="(100vw - 20px) 100vw, 70px"
              className="object-cover"
            />
          </Button>
        ))}
      </div>

      {/* Main image */}
      <figure>
        <Image
          src={selectedImage}
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
                ${salePrice.toFixed(2)}
              </span>
            )}
            <span
              className={`text-gray line-through ${
                salePrice
                  ? 'text-base'
                  : 'text-xl font-bold text-black line-none'
              }`}
            >
              ${price.toFixed(2)}
            </span>
            {salePrice && (
              <span className="text-sm font-secondary text-white bg-strawberry py-[1px] px-3 rounded-10">
                Save {Math.round(((price - salePrice) / price) * 100)}%
              </span>
            )}
          </div>

          {/* Viewer Count */}
          <ViewerCount />

          {/* Sale Countdown */}
          <SaleCountdown />

          {/* Stock Status Bar */}
          <StockStatusBar inStock={stock} maxStock={100} />

          {/* Sizes */}
          <div className="flex gap-2 flex-col my-5">
            <span className="font-bold font-secondary">Sizes</span>
            <div className="flex gap-2">
              {sizes.map((size) => {
                const isSelectedSize = selectedSize === size;
                return (
                  <div
                    key={size}
                    onClick={() => handleSelectSize(size)}
                    className={`w-11 h-11 flex items-center justify-center text-[18px] border rounded cursor-pointer transition
                            ${
                              isSelectedSize
                                ? 'bg-black text-white border-black'
                                : 'border-gray text-black hover:border-black hover:bg-black hover:text-white'
                            }
                            `}
                  >
                    {size}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Colors */}
          <div className="flex gap-3 flex-col">
            <span className="font-bold font-secondary">Colors</span>
            <div className="flex gap-[10px]">
              {colors.map((color) => {
                const isSelected = selectedColor === color;
                return (
                  <ColorButton
                    key={color}
                    color={colorNameToHex[color] || color}
                    isSelected={isSelected}
                    onClick={() => handleSelectColor(color)}
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
              {/* <QuantityInput /> */}
              <QuantityInput
                value={quantity}
                max={stock}
                min={1}
                onChange={setQuantity}
                aria-label="Select product quantity"
              />
              <Button
                variant="ghost"
                className="font-secondary"
                onClick={handleAddToCart}
                isDisabled={stock === 0}
              >
                {stock === 0 ? 'Out of stock' : 'Add to cart'}
              </Button>
            </div>
          </div>
        </div>

        {/* Product Info Panel */}
        <ProductInfoPanel />
      </div>
    </section>
  );
};
