'use client';

import { useEffect, useState } from 'react';

// Components
import { ProductCard } from '@/components';

// Services
import { getProducts } from '@/services';

// Models
import { ProductModel } from '@/models';

interface ListProductCardProps {
  searchParams?: {
    page: string;
    pageSize: string;
  };
}

export const ListProductCard = ({ searchParams }: ListProductCardProps) => {
  const [productsData, setProductsData] = useState<ProductModel[]>([]);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      const { productsData, error } = await getProducts({ searchParams });
      if (!error) {
        setProductsData(productsData ?? []);
      }
      setLoading(false);
    };

    fetchProducts();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

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
