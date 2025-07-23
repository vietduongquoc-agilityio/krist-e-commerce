import { ProductCard } from '@/components';
import { render, screen } from '@testing-library/react';
import { useRouter } from 'next/navigation';

jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
}));

describe('ProductCard', () => {
  const mockPush = jest.fn();

  beforeEach(() => {
    (useRouter as jest.Mock).mockReturnValue({ push: mockPush });
  });

  const props = {
    id: '123',
    title: 'Test Product',
    thumbnailUrl: '/images/test.webp',
    brand: 'Test Brand',
    rating: 3,
    reviews: '120',
    price: 99.99,
    status: 'Only few left',
  };

  it('should render correctly and match snapshot', () => {
    const { asFragment } = render(<ProductCard documentId={''} {...props} />);
    expect(asFragment()).toMatchSnapshot();
  });

  it('renders product information correctly', () => {
    render(<ProductCard documentId={''} {...props} />);
    expect(screen.getByText('Test Product')).toBeInTheDocument();
    expect(screen.getByText('Test Brand')).toBeInTheDocument();
    expect(screen.getByText(/\(120\)\s*Customer Reviews/i)).toBeInTheDocument();
    expect(screen.getByText('$99.99')).toBeInTheDocument();
    expect(screen.getByText('Only few left')).toBeInTheDocument();
    expect(screen.getAllByLabelText('star icon')).toHaveLength(3);
  });
});
