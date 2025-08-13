import { Metadata } from 'next';
import { Suspense } from 'react';

// Components
import {
  Breadcrumb,
  CartContentContainer,
  ListCartItemRowSkeleton,
} from '@/components';

// Config
import { auth } from '@/config/auth';

export const metadata: Metadata = {
  title: 'Cart Page',
  description: 'View and manage your shopping cart',
};

export default async function CartPage() {
  const session = await auth();

  if (!session) return;

  const { id: userId } = session.user;

  return (
    <section>
      {/* Breadcrumb */}
      <Breadcrumb
        items={[{ name: 'Home', href: '/' }, { name: 'Shopping Cart' }]}
      />

      <Suspense fallback={<ListCartItemRowSkeleton />}>
        <CartContentContainer userId={userId} />
      </Suspense>
    </section>
  );
}
