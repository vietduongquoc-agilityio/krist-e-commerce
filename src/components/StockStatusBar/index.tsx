'use client';

interface StockStatusBarProps {
  inStock: number;
  maxStock: number;
}

export const StockStatusBar = ({
  inStock,
  maxStock = 100,
}: StockStatusBarProps) => {
  const percent = Math.min((inStock / maxStock) * 100, 100);

  return (
    <div className="mt-2 mb-5">
      <p className="text-sm mb-3 text-gray">
        Only <b>{inStock}</b> item(s) left in stock!
      </p>
      <div className="w-full h-2 bg-lightGray rounded-full">
        <div
          className="h-2 bg-red/80 rounded-full"
          style={{ width: `${percent}%` }}
        />
      </div>
    </div>
  );
};
