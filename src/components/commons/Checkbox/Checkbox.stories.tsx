import type { Meta, StoryObj } from '@storybook/nextjs';

// Components
import { Checkbox } from '@/components';
import { useState } from 'react';

const meta: Meta<typeof Checkbox> = {
  title: 'Components/Checkbox',
  component: Checkbox,
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof Checkbox>;

export const Default: Story = {
  render: () => {
    const [checked, setChecked] = useState(false);
    return (
      <Checkbox isSelected={checked} onValueChange={setChecked}></Checkbox>
    );
  },
};
