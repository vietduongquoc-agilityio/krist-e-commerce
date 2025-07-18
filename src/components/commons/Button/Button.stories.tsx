import type { Meta, StoryObj } from '@storybook/react';

// Components
import { Button } from '@/components';

const meta: Meta<typeof Button> = {
  title: 'Components/Button',
  component: Button,
  tags: ['autodocs'],
  args: {
    children: 'Click Me',
    isDisabled: false,
  },
  argTypes: {
    onClick: { action: 'clicked' },
    isDisabled: { control: 'boolean' },
    variant: {
      control: 'select',
      options: ['solid', 'ghost', 'light'],
    },
  },
};

export default meta;

type Story = StoryObj<typeof Button>;

export const Solid: Story = {
  args: {
    variant: 'solid',
  },
};

export const Ghost: Story = {
  args: {
    variant: 'ghost',
  },
};

export const Light: Story = {
  args: {
    variant: 'light',
  },
};

export const Disabled: Story = {
  args: {
    isDisabled: true,
  },
};
