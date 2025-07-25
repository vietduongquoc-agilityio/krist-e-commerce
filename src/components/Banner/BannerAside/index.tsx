import Link from 'next/link';

// Components
import { IconScroll, IconShop } from '@/components';

// Constants
import { ROUTER } from '@/constants';

export const BannerAside = () => {
  return (
    <aside className="absolute bottom-1 right-14 flex items-end justify-end gap-7">
      <Link href={ROUTER.SHOP}>
        <IconShop className="bg-black p-4 rounded-[10px] cursor-pointer hover:bg-charcoal transition" />
      </Link>
      <Link href={ROUTER.HOME}>
        <IconScroll className="cursor-pointer hover:bg-gray rounded-full transition" />
      </Link>
    </aside>
  );
};
