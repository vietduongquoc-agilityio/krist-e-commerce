import { render } from '@testing-library/react';

// Components
import { StockStatusBar } from '@/components';

describe('StockStatusBar', () => {
  it('should render StockStatusBar component and match snapshot', () => {
    const { container } = render(<StockStatusBar inStock={0} maxStock={0} />);
    expect(container).toMatchSnapshot();
  });
});
