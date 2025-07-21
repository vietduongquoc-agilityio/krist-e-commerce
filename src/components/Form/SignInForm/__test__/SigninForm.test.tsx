import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { SignInForm } from '@/components';

describe('SignInForm', () => {
  it('should render SignInForm correctly and match snapshot', () => {
    const { container } = render(<SignInForm />);
    expect(container).toMatchSnapshot();
  });

  it('renders title, inputs, and buttons', () => {
    render(<SignInForm />);

    // Title
    expect(
      screen.getByRole('heading', { name: /sign in to fasco/i }),
    ).toBeInTheDocument();

    // Email and password fields
    expect(screen.getByPlaceholderText(/email/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/password/i)).toBeInTheDocument();

    // Buttons
    expect(
      screen.getByRole('button', { name: /sign in with google/i }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: /sign in with github/i }),
    ).toBeInTheDocument();

    // Text link
    expect(screen.getByText(/forget password/i)).toBeInTheDocument();
  });
});
