'use client';

// Libs
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

// Components
import { ProductItem } from '@/components/Item';
import { Pagination } from '@/components';

// Models
import { ProductModel } from '@/models';

type ListItemProps = {
  items: ProductModel[];
  meta?: {
    pagination?: {
      page: number;
      pageCount: number;
    };
  };
};

export const ListProductItem = ({ items, meta }: ListItemProps) => {
  const { push } = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();

  const updateSearchParams = (newPage: number) => {
    const params = new URLSearchParams(searchParams);
    params.set('page', String(newPage));
    push(`${pathname}?${params.toString()}`);
  };

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

      {meta?.pagination && (
        <Pagination
          currentPage={meta?.pagination?.page}
          totalPages={meta?.pagination?.pageCount}
          onPageChange={updateSearchParams}
        />
      )}
    </section>
  );
};
