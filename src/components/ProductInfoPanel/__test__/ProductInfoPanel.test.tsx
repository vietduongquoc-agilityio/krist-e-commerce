import { render } from '@testing-library/react';

// Components
import { ProductInfoPanel } from '@/components';

describe('ProductInfoPanel', () => {
  it('should render ProductInfoPanel component and match snapshot', () => {
    const { container } = render(<ProductInfoPanel />);
    expect(container).toMatchSnapshot();
  });
});
