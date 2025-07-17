import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Cart Page',
  description: 'View and manage your shopping cart',
};

export default function CartPage() {
  return (
    <div>
      <h1 className="text-green-600 text-4xl">Cart Page</h1>
      <p className="font-secondary text-base text-coralRed">
        Manage your shopping cart.
      </p>
    </div>
  );
}
