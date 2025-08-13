// Models
import { ProductModel } from '@/models';

// Components
import { ProductCard } from '@/components/Card';

interface ListProductCardProps {
  productsData: ProductModel[];
}

export const ListProductCard = ({ productsData }: ListProductCardProps) => {
  if (!productsData || productsData.length === 0) {
    return (
      <h2 className="text-center text-red text-xl py-10">No products found.</h2>
    );
  }

  return (
    <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-14">
      {productsData.slice(0, 6).map((product) => (
        <ProductCard key={product.id} productCard={product} />
      ))}
    </section>
  );
};
