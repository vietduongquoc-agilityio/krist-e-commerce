import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';

// Mocks
import { PRODUCTS } from '@/mocks';

// Component
import { ArrivalSection } from '@/components';

// Mock children components used inside ArrivalSection

describe('ArrivalSection', () => {
  it('should render correctly and matches snapshot', () => {
    const { asFragment } = render(<ArrivalSection />);
    expect(asFragment()).toMatchSnapshot();
  });

  it('renders heading and description correctly', () => {
    render(<ArrivalSection />);
    expect(screen.getByText('New Arrivals')).toBeInTheDocument();
    expect(
      screen.getByText(
        /Lorem ipsum dolor sit amet, consectetur adipiscing elit/,
      ),
    ).toBeInTheDocument();
  });

  it('renders all chip categories', () => {
    const categories = [
      'Men’s Fashion',
      'Women’s Fashion',
      'Women Accessories',
      'Men Accessories',
      'Discount Deals',
    ];

    render(<ArrivalSection />);
    categories.forEach((category) => {
      expect(screen.getByText(category)).toBeInTheDocument();
    });
  });

  it('renders the View More button', () => {
    render(<ArrivalSection />);
    expect(
      screen.getByRole('button', { name: /View More/i }),
    ).toBeInTheDocument();
  });
});
