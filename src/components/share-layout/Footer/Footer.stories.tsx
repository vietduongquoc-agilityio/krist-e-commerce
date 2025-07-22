import type { Meta, StoryObj } from '@storybook/nextjs';

// Components
import { Footer } from '@/components';

const meta: Meta<typeof Footer> = {
  title: 'Components/Layout/Footer',
  component: Footer,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Footer>;

export const Default: Story = {
  render: () => <Footer />,
};
