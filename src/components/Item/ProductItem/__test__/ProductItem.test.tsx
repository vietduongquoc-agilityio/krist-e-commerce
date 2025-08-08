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
      <ProductItem
        sizes={[]}
        quantity={0}
        stock={0}
        id={''}
        documentId={''}
        {...defaultProps}
      />,
    );
    expect(container).toMatchSnapshot();
  });
});
