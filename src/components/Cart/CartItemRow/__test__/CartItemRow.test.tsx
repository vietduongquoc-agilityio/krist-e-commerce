import { render } from '@testing-library/react';

// Components
import { CartItemRow } from '@/components';

// Mock
import { PRODUCTMOCK } from '@/mocks';

describe('CartItemRow', () => {
  it('should render CartItemRow component and match snapshot', () => {
    const { container } = render(
      <CartItemRow productItem={PRODUCTMOCK[0]} color={''} quantity={0} />,
    );
    expect(container).toMatchSnapshot();
  });
});
