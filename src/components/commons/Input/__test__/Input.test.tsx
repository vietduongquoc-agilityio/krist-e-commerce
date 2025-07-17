import Input from '@/components/commons/Input';
import { render, screen } from '@testing-library/react';

describe('Input component', () => {
  it('should render correctly and match snapshot', () => {
    const { asFragment } = render(<Input placeholder="Enter value" />);
    expect(asFragment()).toMatchSnapshot();
  });

  it('renders input without label', () => {
    render(<Input placeholder="Enter value" />);
    expect(screen.getByPlaceholderText('Enter value')).toBeInTheDocument();
  });

  it('shows error message when isInvalid is true', () => {
    render(
      <Input
        label="Email"
        type="email"
        isInvalid={true}
        errorMessage="Invalid email address"
      />,
    );
    expect(screen.getByText('Invalid email address')).toBeInTheDocument();
  });
});
