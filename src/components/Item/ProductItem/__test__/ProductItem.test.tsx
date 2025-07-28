import { ProductItem } from '@/components';
import { render, screen } from '@testing-library/react';

describe('ProductItem', () => {
  const defaultProps = {
    thumbnailUrl: '/images/productItem1.webp',
    title: 'Test Product',
    price: 99,
    colors: ['#000000', '#ffffff'],
    onChange: jest.fn(),
  };

  it('renders correctly and matches snapshot', () => {
    const { container } = render(
      <ProductItem id={''} documentId={''} {...defaultProps} />,
    );
    expect(container).toMatchSnapshot();
  });

  it('displays title and price correctly', () => {
    render(<ProductItem id={''} documentId={''} {...defaultProps} />);
    expect(screen.getByText('Test Product')).toBeInTheDocument();
    expect(screen.getByText('$99')).toBeInTheDocument();
  });
});
