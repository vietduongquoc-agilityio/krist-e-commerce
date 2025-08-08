'use client';

// Components
import { CartItemRow, PaymentCard } from '@/components';

// Hooks
import { CartModel } from '@/models/cart';

interface CartContentProps {
  cartsItems: CartModel[];
}

export const CartContent = ({ cartsItems }: CartContentProps) => {
  const subtotal = cartsItems.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0,
  );

  if (!cartsItems.length) {
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
          {cartsItems.map(({ product, color, quantity, id }) => {
            return (
              <CartItemRow
                key={id}
                productItem={product}
                color={color}
                quantity={quantity}
                // onQuantityChange={(id, quantity) => handleUpdateQuantity(id, quantity)}
                // onRemove={(id) => handleRemove(id)}
              />
            );
          })}
        </div>
      </div>

      {/* Payment Summary */}
      {cartsItems.length > 0 && (
        <div className="flex justify-end">
          <PaymentCard
            subtotal={subtotal}
            // onCheckout={() => handleCheckout()}
          />
        </div>
      )}
    </div>
  );
};
