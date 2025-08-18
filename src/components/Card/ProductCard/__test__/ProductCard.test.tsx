import { ProductCard } from '@/components/Card';
import { PRODUCT_MOCK } from '@/mocks';
import { render } from '@testing-library/react';

describe('ProductCard', () => {
  it('should render correctly and match snapshot', () => {
    const { asFragment } = render(
      <ProductCard productCard={PRODUCT_MOCK[0]} />,
    );
    expect(asFragment()).toMatchSnapshot();
  });
});
