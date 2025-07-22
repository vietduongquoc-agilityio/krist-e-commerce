import { render, screen } from '@testing-library/react';

import { Header } from '@/components';

describe('Header', () => {
  it('renders correctly when user is not authenticated (snapshot)', () => {
    const { container } = render(<Header isAuthenticated={false} />);
    expect(container).toMatchSnapshot();
  });

  it('renders correctly when user is authenticated (snapshot)', () => {
    const { container } = render(<Header isAuthenticated={true} />);
    expect(container).toMatchSnapshot();
  });

  it('displays the correct title and auth buttons', () => {
    render(<Header />);

    const titleElement = screen.getByText('FASCO');
    expect(titleElement).toBeInTheDocument();

    const signInButton = screen.getByRole('button', { name: 'Sign in' });
    expect(signInButton).toBeInTheDocument();

    const signUpButton = screen.getByRole('button', { name: 'Sign Up' });
    expect(signUpButton).toBeInTheDocument();
  });
});
