import { render } from '@testing-library/react';

// Components
import { ProductDetailCard } from '@/components';

// Mock
import { productMock } from '@/mocks';

describe('ProductDetailCard', () => {
  it('should render ProductDetailCard component and match snapshot', () => {
    const { container } = render(
      <ProductDetailCard product={productMock[0]} />,
    );
    expect(container).toMatchSnapshot();
  });
});
