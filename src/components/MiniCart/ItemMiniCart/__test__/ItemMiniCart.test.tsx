import { render } from '@testing-library/react';

// Components
import { ItemMiniCart } from '@/components';

// Mocks
import { PRODUCT_MOCK } from '@/mocks';

describe('ItemMiniCart', () => {
  it('should render ItemMiniCart component and match snapshot', () => {
    const { container } = render(
      <ItemMiniCart
        productItem={PRODUCT_MOCK[0]}
        color={''}
        quantity={0}
        cartItemId={''}
      />,
    );
    expect(container).toMatchSnapshot();
  });
});
