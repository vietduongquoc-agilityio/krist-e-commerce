// Components
import { ProductCard } from '@/components';

// Types
import { ProductCardProps } from '@/types';

type ListProductCardProps = {
  products: ProductCardProps[];
};

export const ListProductCard = ({ products }: ListProductCardProps) => {
  if (!products || products.length === 0) {
    return (
      <div className="text-center text-red text-xl py-10">
        No products found.
      </div>
    );
  }

  return (
    <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-14">
      {products.slice(0, 6).map((product) => (
        <ProductCard key={product.id} {...product} />
      ))}
    </section>
  );
};
