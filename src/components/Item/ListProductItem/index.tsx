'use client';

// Models
import { ItemCardProps } from '@/models';

// Components
import { ProductItem } from '@/components/Item';
import { Pagination } from '@/components';
import { useState } from 'react';

type ListItemProps = {
  items: ItemCardProps[];
};

export const ListProductItem = ({ items }: ListItemProps) => {
  const [currentPage, setCurrentPage] = useState(1);
  if (!items || items.length === 0) {
    return (
      <div className="text-center text-red text-xl py-10">No items found.</div>
    );
  }

  return (
    <section className="items-center flex flex-col gap-16">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-14">
        {items.map((item) => (
          <ProductItem key={item.id} {...item} />
        ))}
      </div>
      <Pagination
        currentPage={currentPage}
        totalPages={10}
        onPageChange={setCurrentPage}
      />
    </section>
  );
};
