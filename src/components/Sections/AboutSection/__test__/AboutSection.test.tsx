import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';

// Component
import { AboutSection } from '@/components';

describe('AboutSection', () => {
  it('renders correctly and matches snapshot', () => {
    const { container } = render(<AboutSection />);
    expect(container).toMatchSnapshot();
  });

  it('renders all about items with correct text', () => {
    render(<AboutSection />);

    // Check for 4 items
    expect(screen.getByText(/High Quality/i)).toBeInTheDocument();
    expect(screen.getByText(/crafted from top materials/i)).toBeInTheDocument();

    expect(screen.getByText(/Warrany Protection/i)).toBeInTheDocument();
    expect(screen.getByText(/Over 2 years/i)).toBeInTheDocument();

    expect(screen.getByText(/Free Shipping/i)).toBeInTheDocument();
    expect(screen.getByText(/Order over 150/i)).toBeInTheDocument();

    expect(screen.getByText(/24 \/ 7 Support/i)).toBeInTheDocument();
    expect(screen.getByText(/Dedicated support/i)).toBeInTheDocument();
  });
});
