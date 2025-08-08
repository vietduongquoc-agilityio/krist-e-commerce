import { Metadata } from 'next';

// Components
import { Breadcrumb, CartContent } from '@/components';
import { auth } from '@/config/auth';
import { getCartItemsByUserId } from '@/services';

export const metadata: Metadata = {
  title: 'Cart Page',
  description: 'View and manage your shopping cart',
};

export default async function CartPage() {
  const session = await auth();

  if (!session) return;

  const { token, id: userId } = session.user;

  const data = await getCartItemsByUserId(userId, token);

  return (
    <section>
      {/* Breadcrumb */}
      <Breadcrumb
        items={[{ name: 'Home', href: '/' }, { name: 'Shopping Cart' }]}
      />

      <CartContent cartsList={data || []} />
    </section>
  );
}
