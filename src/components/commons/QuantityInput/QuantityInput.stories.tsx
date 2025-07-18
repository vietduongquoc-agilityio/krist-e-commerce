import type { Meta, StoryObj } from '@storybook/nextjs';

// Components
import { QuantityInput } from '@/components';

const meta: Meta<typeof QuantityInput> = {
  title: 'Components/QuantityInput',
  component: QuantityInput,
  tags: ['autodocs'],
  args: {
    value: 1,
    min: 1,
    max: 10,
  },
};

export default meta;
type Story = StoryObj<typeof QuantityInput>;

export const Default: Story = {};

export const WithCustomRange: Story = {
  args: {
    value: 5,
    min: 3,
    max: 7,
  },
};

export const DisabledDecrement: Story = {
  args: {
    value: 1,
    min: 1,
    max: 10,
  },
};

export const DisabledIncrement: Story = {
  args: {
    value: 10,
    min: 1,
    max: 10,
  },
};
