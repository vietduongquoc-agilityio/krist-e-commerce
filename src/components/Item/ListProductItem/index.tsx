// Models
import { ItemCardProps } from '@/models';

// Components
import { ProductItem } from '@/components/Item';

type ListItemProps = {
  items: ItemCardProps[];
};

export const ListProductItem = ({ items }: ListItemProps) => {
  if (!items || items.length === 0) {
    return (
      <div className="text-center text-red text-xl py-10">No items found.</div>
    );
  }

  return (
    <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-14">
      {items.slice(0, 9).map((item) => (
        <ProductItem key={item.id} {...item} />
      ))}
    </section>
  );
};
