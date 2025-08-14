import { ListProductItem } from '@/components';
import { render } from '@testing-library/react';

// Mock
import { PRODUCT_MOCK } from '@/mocks';

describe('ListProductItem', () => {
  it('should render ListProductItem component and match snapshot', () => {
    const { container } = render(<ListProductItem items={PRODUCT_MOCK} />);
    expect(container).toMatchSnapshot();
  });

  it('should render ListProductItem component with no items', () => {
    const { container } = render(<ListProductItem items={[]} />);
    expect(container).toMatchSnapshot();
  });
});
