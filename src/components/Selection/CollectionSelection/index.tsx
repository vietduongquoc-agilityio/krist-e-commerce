// Constants
import { COLLECTIONS } from '@/constants';

export const CollectionSelection = () => {
  return (
    <div className="mb-6">
      <div className="flex items-center justify-between cursor-pointer max-w-[310px]">
        <h2 className="text-[18px] font-secondary">Collections</h2>
        <span>▼</span>
      </div>

      <ul className="mt-3 space-y-2 text-gray">
        {COLLECTIONS.map((collection, i) => (
          <li key={i} className="cursor-pointer hover:text-black transition">
            {collection}
          </li>
        ))}
      </ul>
    </div>
  );
};
