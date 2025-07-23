'use client';

import Link from 'next/link';
import { Chip } from '@heroui/react';

// Components
import { Button, ListProductCard } from '@/components';

// Mocks
import { PRODUCTS } from '@/mocks';

const categories = [
  'Men’s Fashion',
  'Women’s Fashion',
  'Women Accessories',
  'Men Accessories',
  'Discount Deals',
];

export const ArrivalSection = () => (
  <section className="flex flex-col gap-[50px] w-full max-w-[1281px] mx-auto items-center">
    <div className="flex flex-col gap-5 max-w-[620px] w-full items-center text-center">
      <h2 className="font-secondary text-charcoal text-[46px]">New Arrivals</h2>
      <p className="text-gray">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Scelerisque
        duis ultrices sollicitudin aliquam sem. Scelerisque duis ultrices
        sollicitudin
      </p>
    </div>

    <div className="flex flex-wrap gap-2 w-full max-w-[1155px] justify-center md:justify-between">
      {categories.map((category) => (
        <Chip
          key={category}
          className="bg-whiteSmoke rounded-[10px] py-4 px-8 text-charcoal hover:bg-black hover:text-white transition cursor-not-allowed"
        >
          {category}
        </Chip>
      ))}
    </div>

    <ListProductCard products={PRODUCTS} />
    <Link href="/shop">
      <Button variant="solid" className="py-4 w-[220px]">
        View More
      </Button>
    </Link>
  </section>
);
