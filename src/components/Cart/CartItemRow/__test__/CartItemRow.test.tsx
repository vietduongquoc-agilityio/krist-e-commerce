import { render } from '@testing-library/react';

// Components
import { CartItemRow } from '@/components';

// Mock
import { productMock } from '@/mocks';

describe('CartItemRow', () => {
  it('should render CartItemRow component and match snapshot', () => {
    const { container } = render(<CartItemRow productItem={productMock[0]} />);
    expect(container).toMatchSnapshot();
  });
});
