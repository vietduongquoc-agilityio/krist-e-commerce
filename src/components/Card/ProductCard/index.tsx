'use client';

import Image from 'next/image';
import { Card } from '@heroui/react';
import { useRouter } from 'next/navigation';

// Components
import { StarIcon } from '@/components';

// Constants
import { ROUTER } from '@/constants';

// Models
import { ProductModel } from '@/models';

interface ProductCardProps {
  productCard: ProductModel;
}

export const ProductCard = ({ productCard }: ProductCardProps) => {
  const router = useRouter();

  const handleCardClick = () => {
    router.push(`${ROUTER.PRODUCT}/${productCard.id}`);
  };

  const renderStars = (count: number = 4) => {
    return Array.from({ length: count }, (_, index) => (
      <StarIcon key={index} />
    ));
  };

  return (
    <Card
      onClick={handleCardClick}
      className="bg-white rounded-[10px] shadow-md pt-5 px-6 w-full max-w-[386px] cursor-pointer hover:bg-whiteSmoke transition"
    >
      <figure className="rounded-2xl overflow-hidden">
        <Image
          src={productCard.thumbnailUrl || '/images/product-img.webp'}
          alt={productCard.title}
          width={336}
          height={244}
          className="w-[336px] h-[244px] object-cover"
          sizes="(100vw - 20px) 100vw, 336px"
        />
      </figure>

      <div className="mt-4 space-y-1">
        <div className="flex items-center justify-between pb-4">
          <div>
            <h3 className="text-xl font-medium text-charcoal">
              {productCard.title}
            </h3>
            <p className="text-xs text-gray">{productCard.brand}</p>
          </div>

          <div className="flex items-center space-x-0.5">
            {renderStars(productCard.rating)}
          </div>
        </div>

        <p className="text-xs text-charcoal">
          ({productCard.reviews}) Customer Reviews
        </p>

        <div className="flex items-center justify-between pt-4 pb-6">
          <span className="text-2xl font-medium text-charcoal">
            ${productCard.price.toFixed(2)}
          </span>
          {productCard.status && (
            <span className="text-sm text-coralRed font-medium">
              {productCard.status}
            </span>
          )}
        </div>
      </div>
    </Card>
  );
};
