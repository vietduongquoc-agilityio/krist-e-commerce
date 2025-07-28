import { render } from '@testing-library/react';

// Components
import { ColorButton } from '@/components';

describe('ColorButton', () => {
  it('renders correctly by default', () => {
    const { container } = render(<ColorButton color="#FF0000" />);
    expect(container).toMatchSnapshot();
  });

  it('renders correctly when selected', () => {
    const { container } = render(<ColorButton color="#00FF00" isSelected />);
    expect(container).toMatchSnapshot();
  });

  it('renders correctly when disabled', () => {
    const { container } = render(<ColorButton color="#0000FF" isDisabled />);
    expect(container).toMatchSnapshot();
  });

  it('renders as a button', () => {
    const { container } = render(
      <ColorButton color="#FACC15" isSelected as="button" />,
    );
    expect(container).toMatchSnapshot();
  });

  it('calls onClick when clicked', () => {
    const onClick = jest.fn();
    const { getByRole } = render(
      <ColorButton color="#FF0000" onClick={onClick} as="button" />,
    );
    getByRole('button').click();
    expect(onClick).toHaveBeenCalledTimes(1);
  });
});
