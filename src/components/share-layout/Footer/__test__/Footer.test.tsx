import { render, screen } from '@testing-library/react';

// Components
import { Footer } from '@/components';

describe('Footer Component', () => {
  it('renders correctly and matches snapshot', () => {
    const { asFragment } = render(<Footer />);
    expect(asFragment()).toMatchSnapshot();
  });
  it('displays copyright information', () => {
    render(<Footer />);
    expect(screen.getByText(/copyright/i)).toBeInTheDocument();
  });
});
