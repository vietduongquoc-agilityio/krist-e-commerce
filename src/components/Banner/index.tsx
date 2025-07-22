'use client';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

// Components
import { Button } from '@/components/commons';

// Constants
import { ROUTER } from '@/constants';
import { IconScroll, IconShop } from '@/components/icons';

export const Banner = () => {
  const router = useRouter();

  return (
    <section className="w-full max-w-[1920px] mx-auto flex">
      <div className="flex w-full max-w-[1281px] mx-auto gap-[35px]">
        <figure className="bg-platinum rounded-[10px] h-[756px]">
          <Image
            src="/images/banner-img-left.webp"
            alt="Banner left"
            width={392}
            height={570}
            sizes="(100vw - 20px) 100vw, 392px"
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
              sizes="(100vw - 20px) 100vw, 399px"
            />
          </figure>
          <div className="flex flex-col items-center">
            <p className="font-medium text-[91px] text-charcoal">ULTIMATE</p>
            <Image
              src="/images/banner-img-center.webp"
              alt="Banner center"
              width={394}
              height={120}
              sizes="(100vw - 30px) 100vw, 394px"
            />
            <p className="text-xl">NEW COLLECTION</p>
            <Button
              type="button"
              variant="solid"
              className="mt-6 mb-9 w-[210px]"
              onClick={() => router.push(ROUTER.SHOP)}
            >
              SHOP NOW
            </Button>
          </div>
          <figure className="rounded-2xl">
            <Image
              src="/images/banner-img-bottom.webp"
              alt="Banner bottom"
              width={430}
              height={150}
              sizes="(100vw - 20px) 100vw, 430px"
            />
          </figure>
        </div>
        <figure className="bg-platinum rounded-[10px] px-16 h-[756px]">
          <Image
            src="/images/banner-img-right.webp"
            alt="Banner right"
            width={249}
            height={560}
            sizes="(100vw - 20px) 100vw, 249px"
            className="pt-[186px]"
          />
        </figure>
      </div>
      <aside className="flex items-end justify-end gap-9 mr-10">
        <IconShop
          className="bg-black p-4 rounded-[10px] cursor-pointer hover:bg-charcoal transition"
          onClick={() => router.push(ROUTER.SHOP)}
        />
        <IconScroll
          className="cursor-pointer hover:bg-gray rounded-full transition"
          onClick={() => router.push(ROUTER.HOME)}
        />
      </aside>
    </section>
  );
};
