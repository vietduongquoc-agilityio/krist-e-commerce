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
      <Checkbox
        classNames={{
          wrapper: 'rounded-[3px]  border-[2px] border-black bg-white w-8 h-8',
        }}
        isSelected={checked}
        onValueChange={setChecked}
      >
        <span className="pl-3 bg-white">Checkbox</span>
      </Checkbox>
    );
  },
};

export const WithCustomClass: Story = {
  args: {
    classNames: {
      wrapper: 'rounded-full border-[2px] border-black bg-white w-8 h-8',
    },
  },
};
