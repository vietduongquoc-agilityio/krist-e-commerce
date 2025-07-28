import { render } from '@testing-library/react';

// Components
import { PriceSelection } from '@/components';

describe('PriceSelection Component', () => {
  it('should render PriceSelection component and match snapshot', () => {
    const { container } = render(<PriceSelection />);
    expect(container).toMatchSnapshot();
  });
});
