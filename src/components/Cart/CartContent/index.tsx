'use client';

// Components
import { CartItemRow, CartItemRowSkeleton, PaymentCard } from '@/components';

// Hooks
import { useCart } from '@/hooks/useCart';

// Utils
import { handleCheckout } from '@/utils';

export const CartContent = () => {
  const { cartItems, updateQuantity, removeItem, clearCart } = useCart();

  const isLoading = cartItems === undefined;

  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );

  if (!isLoading && cartItems.length === 0) {
    return (
      <p className="text-center py-10 text-red text-xl font-secondary">
        Your cart is empty.
      </p>
    );
  }

  return (
    <div className="flex flex-col  justify-between gap-10 max-w-[1280px] mx-auto">
      <div className="flex-1">
        {/* Table Header */}
        <div className="text-[22px] pb-[34px] font-secondary flex justify-between">
          <p className="w-[335px]">Product</p>
          <p>Price</p>
          <p>Quantity</p>
          <p className="pl-[57px]">Total</p>
        </div>
        {/* Item Rows */}
        <div className="border-y border-gray divide-y divide-gray">
          {isLoading
            ? Array.from({ length: 3 }).map((_, i) => (
                <CartItemRowSkeleton key={i} />
              ))
            : cartItems.map((item) => (
                <CartItemRow
                  key={item.id}
                  productItem={item}
                  onQuantityChange={(id, qty) => updateQuantity(id, qty)}
                  onRemove={() => removeItem(item.id)}
                />
              ))}
        </div>
      </div>

      {/* Payment Summary */}
      {cartItems.length > 0 && (
        <div className="flex justify-end">
          <PaymentCard
            subtotal={subtotal}
            onCheckout={() => handleCheckout(clearCart)}
          />
        </div>
      )}
    </div>
  );
};
