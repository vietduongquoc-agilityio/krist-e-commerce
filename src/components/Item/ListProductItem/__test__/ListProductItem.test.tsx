import { ListProductItem } from '@/components/Item';
import { render } from '@testing-library/react';

// Mock
import { PRODUCTMOCK } from '@/mocks';

describe('ListProductItem', () => {
  it('should render ListProductItem component and match snapshot', () => {
    const { container } = render(<ListProductItem items={PRODUCTMOCK} />);
    expect(container).toMatchSnapshot();
  });

  it('should render ListProductItem component with no items', () => {
    const { container } = render(<ListProductItem items={[]} />);
    expect(container).toMatchSnapshot();
  });
});
