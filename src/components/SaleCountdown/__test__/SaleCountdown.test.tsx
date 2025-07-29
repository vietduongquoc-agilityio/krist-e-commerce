import { render } from '@testing-library/react';

// Components
import { SaleCountdown } from '@/components';

describe('SaleCountdown', () => {
  it('should render SaleCountdown component and match snapshot', () => {
    const { container } = render(<SaleCountdown />);
    expect(container).toMatchSnapshot();
  });
});
