import Input from '@/components/commons/Input';
import { render, screen, fireEvent } from '@testing-library/react';

describe('Input Component', () => {
  it('renders with label and placeholder', () => {
    render(<Input label="Username" placeholder="Enter your name" />);
    expect(screen.getByLabelText('Username')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Enter your name')).toBeInTheDocument();
  });

  it('displays error message when provided', () => {
    render(
      <Input
        label="Email"
        placeholder="Enter email"
        errorMessage="Email is invalid"
        isInvalid
      />,
    );

    expect(screen.getByText('Email is invalid')).toBeInTheDocument();
    const input = screen.getByLabelText('Email');
    expect(input).toHaveClass('border-red');
    expect(input).toHaveClass('text-red');
  });

  it('applies additional class names', () => {
    render(
      <Input
        label="Name"
        labelClassName="text-blue"
        inputClassName="bg-yellow"
      />,
    );
    expect(screen.getByText('Name')).toHaveClass('text-blue');
    expect(screen.getByLabelText('Name')).toHaveClass('bg-yellow');
  });

  it('is disabled when specified', () => {
    render(<Input label="Disabled" disabled />);
    expect(screen.getByLabelText('Disabled')).toBeDisabled();
  });

  it('handles change event', () => {
    const handleChange = jest.fn();
    render(<Input label="Phone" onChange={handleChange} />);
    const input = screen.getByLabelText('Phone');
    fireEvent.change(input, { target: { value: '123456' } });
    expect(handleChange).toHaveBeenCalled();
  });

  it('Should render correctly and matches snapshot', () => {
    const { asFragment } = render(
      <Input
        label="Password"
        placeholder="Enter password"
        errorMessage="Required"
        isInvalid
      />,
    );
    expect(asFragment()).toMatchSnapshot();
  });
});
