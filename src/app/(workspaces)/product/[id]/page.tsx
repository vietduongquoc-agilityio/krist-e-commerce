import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Product Page',
  description: 'View and manage products',
};

export default async function ProductPage({
  params,
}: {
  params: { productId: string };
}) {
  console.log(`Fetching product with ID: ${params.productId}`);

  return (
    <div className="p-8">
      <h1 className="text-green-600 text-4xl">Product {params.productId}</h1>
      <p className="font-secondary text-base text-coralRed">
        Description for product {params.productId}
      </p>
    </div>
  );
}
