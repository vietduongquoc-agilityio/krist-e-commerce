import { Text } from '@/components';
import { Button } from '@/components/commons/Button';
import { TEXT_SIZE, TEXT_VARIANT } from '@/interfaces';

export default function LandingPage() {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Welcome to the Landing Page</h1>

      <Button variant="solid" className="mb-4">
        Click Me
      </Button>
      <Button variant="ghost" className="mb-4">
        Click Me (Ghost)
      </Button>
      <Button className="mb-4 bg-coralRed">Click Me (Light)</Button>

      <Text size={TEXT_SIZE['2XL']} className="mb-4">
        This is a primary text with size 2XL.
      </Text>

      <Text
        size={TEXT_SIZE['2XL']}
        variant={TEXT_VARIANT.PRIMARY}
        className="mb-4"
      >
        This is a primary text with size 2XL.
      </Text>
    </div>
  );
}
