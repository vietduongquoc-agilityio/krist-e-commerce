import { StarIcon } from '@/components/icons';

interface StarRatingProps {
  rating: number; // e.g. 4.5
  reviewCount: number; // e.g. 3
}

export const StarRating = ({ rating, reviewCount }: StarRatingProps) => {
  const fullStars = Math.floor(rating);
  const hasHalf = rating % 1 >= 0.5;

  return (
    <div className="flex items-center space-x-1">
      {[...Array(5)].map((_, i) => (
        <StarIcon
          key={i}
          className={`w-4 h-4 ${
            i < fullStars
              ? 'text-yellow-400'
              : hasHalf && i === fullStars
                ? 'text-yellow-300'
                : 'text-gray-300'
          }`}
          fill={
            i < fullStars || (hasHalf && i === fullStars)
              ? 'currentColor'
              : 'none'
          }
        />
      ))}
      <span className="text-sm text-gray-600 ml-2">({reviewCount})</span>
    </div>
  );
};
