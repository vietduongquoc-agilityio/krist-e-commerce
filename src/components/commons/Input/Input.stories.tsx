import Input from '@/components/commons/Input';
import type { Meta, StoryObj } from '@storybook/nextjs';

const meta: Meta<typeof Input> = {
  title: 'Components/Input',
  component: Input,
  argTypes: {
    type: { control: 'text' },
    label: { control: 'text' },
    placeholder: { control: 'text' },
    errorMessage: { control: 'text' },
    isInvalid: { control: 'boolean' },
    disabled: { control: 'boolean' },
    labelClassName: { control: 'text' },
    inputClassName: { control: 'text' },
    onChange: { action: 'onChange' },
    className: {
      control: 'object',
      description: 'Custom class names',
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Input>;

export const Default: Story = {
  args: {
    label: 'Username',
    placeholder: 'Enter username',
  },
};

export const Disabled: Story = {
  args: {
    label: 'Disabled Input',
    placeholder: 'Cannot type here',
    disabled: true,
  },
};

export const WithErrorMessage: Story = {
  args: {
    isInvalid: true,
    label: 'Email',
    type: 'email',
    errorMessage: 'Please enter a valid email address',
    defaultValue: 'Email',
  },
};
