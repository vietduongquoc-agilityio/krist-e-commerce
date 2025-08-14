// Services
import { getCartItemsByUserId } from '@/services';

// Components
import { CartContent } from '@/components';

interface CartContentServerProps {
  userId: string;
}

export const CartContentContainer = async ({
  userId,
}: CartContentServerProps) => {
  const data = await getCartItemsByUserId(userId);
  return <CartContent cartItems={data || []} />;
};
