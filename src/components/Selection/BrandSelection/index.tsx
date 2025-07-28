// Constants
import { BRANDS } from '@/constants';

export const BrandSelection = () => {
  return (
    <div className="mb-6 w-full">
      <div className="flex items-center justify-between cursor-pointer max-w-[310px]">
        <h2 className="text-[18px] font-secondary">Brands</h2>
        <span>▼</span>
      </div>

      <div className="flex flex-wrap gap-2 mt-3 text-gray max-w-[220px]">
        {BRANDS.map((brand, i) => (
          <span key={i} className="cursor-pointer hover:text-black transition">
            {brand}
          </span>
        ))}
      </div>
    </div>
  );
};
