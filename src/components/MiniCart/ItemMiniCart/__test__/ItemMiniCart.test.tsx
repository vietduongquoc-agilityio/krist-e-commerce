import { render } from '@testing-library/react';

// Components
import { ItemMiniCart } from '@/components';

// Mocks
import { productMock } from '@/mocks';

describe('ItemMiniCart', () => {
  it('should render ItemMiniCart component and match snapshot', () => {
    const { container } = render(<ItemMiniCart productItem={productMock[0]} />);
    expect(container).toMatchSnapshot();
  });
});
