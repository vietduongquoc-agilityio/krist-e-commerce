import { Text } from '@/components/commons/Text';

// Constants
import { TEXT_SIZE } from '@/constants';

export default function ErrorFallback({ error }: { error: Error }) {
  return (
    <div className=" flex items-center justify-center">
      <Text size={TEXT_SIZE['2XL-26']} className="font-bold !text-red">
        An error has occurred: {error.message}
      </Text>
    </div>
  );
}
