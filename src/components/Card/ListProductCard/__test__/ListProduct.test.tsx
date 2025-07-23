import { render } from '@testing-library/react';
import { ListProductCard } from '@/components';

describe('ListProductCard Component', () => {
  const products = [
    {
      id: '1',
      documentId: 'doc-1',
      title: 'Product 1',
      thumbnailUrl: '/images/product1.webp',
      brand: 'Brand 1',
      rating: 4,
      reviews: '100',
      price: 49.99,
      status: 'In stock',
    },
    {
      id: '2',
      documentId: 'doc-2',
      title: 'Product 2',
      thumbnailUrl: '/images/product2.webp',
      brand: 'Brand 2',
      rating: 5,
      reviews: '200',
      price: 79.99,
      status: 'Only few left',
    },
  ];

  it('should render ListProductCard correctly and match snapshot', () => {
    const { asFragment } = render(<ListProductCard products={products} />);
    expect(asFragment()).toMatchSnapshot();
  });
});
