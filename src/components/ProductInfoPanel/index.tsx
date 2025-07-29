import Image from 'next/image';
import {
  IconCar,
  IconCompare,
  IconQuestion,
  IconShare,
  IconShopping,
} from '@/components/icons';

export const ProductInfoPanel = () => {
  return (
    <div className="pt-6 space-y-6 px-4 flex flex-col">
      {/* Quick Actions */}
      <div className="flex space-x-2 w-[585px] border-b-1 pb-4 border-lightGray mb-7">
        <IconCompare />
        <span>Compare</span>
        <IconQuestion />
        <span>Ask a question</span>
        <IconShare />
        <span>Share</span>
      </div>

      {/* Delivery & Shipping */}
      <div className="flex flex-col pb-7">
        <div className="flex items-center mb-3">
          <IconCar />
          <span className="font-bold font-secondary mr-2">
            Estimated Delivery:
          </span>
          <span>Jul 30 - Aug 03</span>
        </div>
        <div className="flex items-center">
          <IconShopping />
          <span className="font-bold font-secondary mr-2">
            Free Shipping & Returns:
          </span>
          <span>On all orders over $75</span>
        </div>
      </div>
      <figure>
        <Image
          src="/images/payment-options-img.webp"
          alt="Product Image"
          width={585}
          height={110}
          sizes="(100vw - 20px) 100vw, 585px"
        />
      </figure>
    </div>
  );
};
