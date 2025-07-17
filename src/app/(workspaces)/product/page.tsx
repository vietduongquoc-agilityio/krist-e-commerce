import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Product Page',
  description: 'View and purchase products',
};

export default function ProductPage() {
  return (
    <div>
      <h1 className="text-green-600 text-4xl">Product Page</h1>
      <p className="font-secondary text-base text-coralRed">
        Explore our range of products.
      </p>
    </div>
  );
}
