import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Product Page',
  description: 'View and manage products',
};

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  console.log(`Fetching product with ID: ${id}`);

  return (
    <div className="p-8">
      <h1 className="text-green-600 text-4xl">Product {id}</h1>
      <p className="font-secondary text-base text-coralRed">
        Description for product {id}
      </p>
    </div>
  );
}
