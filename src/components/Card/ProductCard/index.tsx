'use client';

import Image from 'next/image';
import { Card } from '@heroui/react';
import { useRouter } from 'next/navigation';

// Models
import { ProductCardProps } from '@/models';

// Components
import { StarIcon } from '@/components';
import { ROUTER } from '@/constants';

export const ProductCard = ({
  id,
  thumbnailUrl,
  title,
  brand = 'Al Karam',
  rating,
  reviews = '(4.1k) Customer Reviews',
  price,
  status = 'Almost Sold Out',
}: ProductCardProps) => {
  const router = useRouter();

  const handleCardClick = () => {
    router.push(`${ROUTER.PRODUCT}/${id}`);
  };

  const renderStars = (count: number = 4) => {
    return Array.from({ length: count }, (_, index) => (
      <StarIcon key={`${id}-star-${index}`} />
    ));
  };

  return (
    <Card
      onClick={handleCardClick}
      className="bg-white rounded-[10px] shadow-md pt-5 px-6 w-full max-w-[386px] cursor-pointer hover:bg-whiteSmoke transition"
    >
      <figure className="rounded-2xl overflow-hidden">
        <Image
          src={thumbnailUrl || '/images/product-img.webp'}
          alt={title}
          width={336}
          height={244}
          sizes="(100vw - 20px) 100vw, 336px"
        />
      </figure>

      <div className="mt-4 space-y-1">
        <div className="flex items-center justify-between pb-4">
          <div>
            <h3 className="text-xl font-medium text-charcoal">{title}</h3>
            <p className="text-xs text-gray">{brand}</p>
          </div>

          <div className="flex items-center space-x-0.5">
            {renderStars(rating)}
          </div>
        </div>

        <p className="text-xs text-charcoal">({reviews}) Customer Reviews</p>

        <div className="flex items-center justify-between pt-4 pb-6">
          <span className="text-2xl font-medium text-charcoal">
            ${price.toFixed(2)}
          </span>
          {status && (
            <span className="text-sm text-coralRed font-medium">{status}</span>
          )}
        </div>
      </div>
    </Card>
  );
};
