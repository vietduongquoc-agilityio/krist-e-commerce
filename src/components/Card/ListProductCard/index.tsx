// // Components
// import { ProductCard } from '@/components';

// // Services
// import { getProducts } from '@/services';

// export const ListProductCard = async () => {
//   const { productsData, error } = await getProducts();

//   console.log('productsData', productsData);

//   if (error || !productsData || productsData.length === 0) {
//     return (
//       <h2 className="text-center text-red text-xl py-10">No products found.</h2>
//     );
//   }

//   return (
//     <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-14">
//       {productsData.slice(0, 6).map((product) => (
//         <ProductCard key={product.id} productCard={product} />
//       ))}
//     </section>
//   );
// };

'use client';

import { useEffect, useState } from 'react';
import { getProducts } from '@/services';
import { ProductCard } from '@/components';
import { ProductModel } from '@/models';

export const ListProductCard = () => {
  const [productsData, setProductsData] = useState<ProductModel[]>([]);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      const { productsData, error } = await getProducts();
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
