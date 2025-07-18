import { render } from '@testing-library/react';

// Components
import { QuantityInput } from '@/components';

describe('QuantityInput component', () => {
  it('should render correctly and match snapshot', () => {
    const { asFragment } = render(<QuantityInput />);
    expect(asFragment()).toMatchSnapshot();
  });
});
