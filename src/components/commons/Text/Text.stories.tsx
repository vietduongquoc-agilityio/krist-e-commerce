import type { Meta, StoryObj } from '@storybook/nextjs';

// Components
import { Text } from '@/components';

// Interfaces
import { TEXT_SIZE, TEXT_VARIANT } from '@/interfaces';

const meta: Meta<typeof Text> = {
  title: 'Components/Text',
  component: Text,
  tags: ['autodocs'],
  args: {
    children:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Scelerisque duis ultrices sollicitudin aliquam sem. Scelerisque duis ultrices sollicitudin ',
  },
};

export default meta;

type Story = StoryObj<typeof Text>;

export const Default: Story = {};

export const Primary: Story = {
  args: {
    variant: TEXT_VARIANT.PRIMARY,
  },
};

export const Caption: Story = {
  args: {
    variant: TEXT_VARIANT.CAPTION,
    size: TEXT_SIZE['2XL'],
  },
};

export const Error: Story = {
  args: {
    variant: TEXT_VARIANT.ERROR,
    size: TEXT_SIZE['2XL'],
  },
};

export const CustomTag: Story = {
  args: {
    as: 'span',
    variant: TEXT_VARIANT.DESCRIPTION,
    size: TEXT_SIZE['XL-22'],
  },
};

export const WithClassName: Story = {
  args: {
    className: 'font-bold italic underline',
    size: TEXT_SIZE['2XL-26'],
  },
};
