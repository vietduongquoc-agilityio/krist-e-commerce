// Components
import { ProductCard } from '@/components';

// Models
import { ProductCardProps } from '@/models';

type ListProductCardProps = {
  products: ProductCardProps[];
};

export const ListProductCard = ({ products }: ListProductCardProps) => {
  return (
    <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {products.slice(0, 6).map((product) => (
        <ProductCard key={product.id} {...product} />
      ))}
    </section>
  );
};
