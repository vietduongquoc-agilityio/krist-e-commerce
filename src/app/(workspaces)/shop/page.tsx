import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Shop Page',
  description: 'Browse and purchase products',
};

export default function ShopPage() {
  return (
    <div>
      <h1 className="text-green-600 text-4xl">Shop Page</h1>
      <p className="font-secondary text-base text-coralRed">
        Welcome to the shop!
      </p>
    </div>
  );
}
