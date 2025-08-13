import Image from 'next/image';
import Link from 'next/link';

// Components

// Constants
import { ROUTER } from '@/constants';
import { Button } from '@/components/commons/Button';

export const BannerMainContent = () => {
  return (
    <div className="w-full max-w-[1281px] mx-auto flex gap-[35px]">
      <figure className="bg-platinum rounded-[10px] h-[756px]">
        <Image
          src="/images/banner-img-left.webp"
          alt="Banner left"
          width={392}
          height={570}
          className="pt-[186px]"
          priority
        />
      </figure>

      <div className="flex flex-col">
        <figure className="bg-platinum rounded-2xl px-4">
          <Image
            src="/images/banner-img-top.webp"
            alt="Banner top"
            width={399}
            height={150}
          />
        </figure>

        <div className="flex flex-col items-center">
          <p className="font-medium text-[91px] text-charcoal">ULTIMATE</p>
          <Image
            src="/images/banner-img-center.webp"
            alt="Banner center"
            width={394}
            height={120}
          />
          <p className="text-xl">NEW COLLECTION</p>
          <Link href={ROUTER.SHOP}>
            <Button
              type="button"
              variant="solid"
              className="mt-6 mb-9 w-[210px] h-auto"
            >
              SHOP NOW
            </Button>
          </Link>
        </div>

        <figure className="rounded-2xl">
          <Image
            src="/images/banner-img-bottom.webp"
            alt="Banner bottom"
            width={430}
            height={150}
          />
        </figure>
      </div>

      <figure className="bg-platinum rounded-[10px] px-16 h-[756px]">
        <Image
          src="/images/banner-img-right.webp"
          alt="Banner right"
          width={249}
          height={560}
          className="pt-[186px]"
        />
      </figure>
    </div>
  );
};
