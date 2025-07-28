import type { Meta, StoryObj } from '@storybook/nextjs';

// Components
import { ColorButton } from '@/components';

const meta: Meta<typeof ColorButton> = {
  title: 'Components/ColorButton',
  component: ColorButton,
  tags: ['autodocs'],
  argTypes: {
    color: { control: 'color' },
    isSelected: { control: 'boolean' },
    isDisabled: { control: 'boolean' },
    as: {
      control: 'select',
      options: ['div', 'button'],
    },
  },
};

export default meta;
type Story = StoryObj<typeof ColorButton>;

export const Default: Story = {
  args: {
    color: '#FF0000',
    isSelected: false,
    isDisabled: false,
    as: 'div',
  },
};

export const Selected: Story = {
  args: {
    color: '#00FF00',
    isSelected: true,
    isDisabled: false,
    as: 'div',
  },
};

export const Disabled: Story = {
  args: {
    color: '#0000FF',
    isSelected: false,
    isDisabled: true,
    as: 'div',
  },
};

export const AsButton: Story = {
  args: {
    color: '#FACC15',
    isSelected: true,
    isDisabled: false,
    as: 'button',
  },
};
