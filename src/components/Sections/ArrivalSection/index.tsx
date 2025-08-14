'use client';

import { Chip } from '@heroui/react';

const categories = [
  'Men’s Fashion',
  'Women’s Fashion',
  'Women Accessories',
  'Men Accessories',
  'Discount Deals',
];

export const ArrivalSection = () => {
  return (
    <section className="flex flex-col gap-[50px] w-full max-w-[1281px] mx-auto items-center">
      {/* Title */}
      <div className="flex flex-col gap-5 max-w-[620px] w-full items-center text-center">
        <h2 className="font-secondary text-charcoal text-[46px]">
          New Arrivals
        </h2>
        <p className="text-gray">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Scelerisque
          duis ultrices sollicitudin aliquam sem. Scelerisque duis ultrices
          sollicitudin
        </p>
      </div>

      {/* Categories */}
      <div className="flex flex-wrap gap-2 w-full max-w-[1155px] justify-center md:justify-between">
        {categories.map((category) => (
          <Chip
            key={category}
            variant="light"
            className="bg-whiteSmoke rounded-[10px] py-4 px-8 text-charcoal hover:bg-black hover:text-white transition cursor-not-allowed"
          >
            {category}
          </Chip>
        ))}
      </div>
    </section>
  );
};
