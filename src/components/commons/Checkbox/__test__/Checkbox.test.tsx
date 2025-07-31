import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';

// Component
import { Checkbox } from '@/components';

describe('Checkbox', () => {
  it('renders correctly and matches snapshot', () => {
    const { asFragment } = render(<Checkbox>Accept terms</Checkbox>);
    expect(asFragment()).toMatchSnapshot();
  });

  it('renders with label', () => {
    render(<Checkbox>Accept terms</Checkbox>);
    expect(screen.getByText(/Accept terms/i)).toBeInTheDocument();
  });

  it('can toggle on and off', () => {
    let selected = false;
    const onValueChange = jest.fn((val) => (selected = val));

    render(
      <Checkbox isSelected={selected} onValueChange={onValueChange}>
        Subscribe
      </Checkbox>,
    );

    const label = screen.getByText(/Subscribe/i);
    fireEvent.click(label);

    expect(onValueChange).toHaveBeenCalledWith(true);
  });

  it('respects controlled `isSelected` prop', () => {
    const { rerender } = render(
      <Checkbox isSelected={false} onValueChange={() => {}}>
        Label
      </Checkbox>,
    );

    const checkboxBox = screen.getByRole('checkbox');
    expect(checkboxBox).not.toBeChecked();

    rerender(
      <Checkbox isSelected={true} onValueChange={() => {}}>
        Label
      </Checkbox>,
    );

    expect(checkboxBox).toBeChecked();
  });
});
