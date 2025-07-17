import { Metadata } from 'next';

interface Params {
  params: { productId: string };
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  return {
    title: `Product ${params.productId}`,
    description: `Description for product ${params.productId}`,
  };
}

export default async function ProductPage({ params }: Params) {
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
