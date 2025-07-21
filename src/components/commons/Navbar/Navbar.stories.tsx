import type { Meta, StoryObj } from '@storybook/nextjs';

// Constants
import { ROUTER } from '@/constants/router';

// Components
import { Navbar } from '@/components';

const meta: Meta<typeof Navbar> = {
  title: 'Components/Navbar',
  component: Navbar,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
  },
  argTypes: {
    className: {
      control: 'object',
      description: 'Custom class names',
    },
  },
  args: {
    className: {
      baseClass: 'text-xl',
      activeClass: 'font-bold text-blue-600',
      inactiveClass: 'text-gray-400',
    },
  },
};

export default meta;

type Story = StoryObj<typeof Navbar>;

export const Default: Story = {
  args: {
    navbarList: [
      { text: 'Home', path: ROUTER.HOME },
      { text: 'Shop', path: ROUTER.SHOP },
      { text: 'Cart', path: ROUTER.CART },
      { text: 'Sign In', path: ROUTER.SIGNIN },
      { text: 'Sign Up', path: ROUTER.SIGNUP },
    ],
    className: {
      baseClass: 'text-xl',
      activeClass: 'font-bold text-blue-600',
      inactiveClass: 'text-gray-400',
    },
  },
};
