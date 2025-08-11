import { Metadata } from 'next';

// Components
import { Breadcrumb, CartContent } from '@/components';

// Config
import { auth } from '@/config/auth';

// Services
import { getCartItemsByUserId } from '@/services';

export const metadata: Metadata = {
  title: 'Cart Page',
  description: 'View and manage your shopping cart',
};

export default async function CartPage() {
  const session = await auth();

  if (!session) return;

  const { id: userId } = session.user;

  const data = await getCartItemsByUserId(userId);

  return (
    <section>
      {/* Breadcrumb */}
      <Breadcrumb
        items={[{ name: 'Home', href: '/' }, { name: 'Shopping Cart' }]}
      />

      <CartContent cartItems={data || []} />
    </section>
  );
}
