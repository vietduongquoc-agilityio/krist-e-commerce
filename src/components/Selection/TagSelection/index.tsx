// Constants
import { TAGS } from '@/constants';

export const TagSelection = () => {
  return (
    <div className="mb-6 max-w-[320px]">
      <h2 className="text-[18px] font-secondary mb-4">Tags</h2>
      <div className="flex flex-wrap gap-2 text-gray">
        {TAGS.map((tag, i) => (
          <span key={i} className="cursor-pointer hover:text-black transition">
            {tag}
          </span>
        ))}
      </div>
    </div>
  );
};
