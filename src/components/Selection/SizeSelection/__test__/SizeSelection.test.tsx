import { render } from '@testing-library/react';

// Components
import { SizeSelection } from '@/components';

describe('SizeSelection', () => {
  it('should render corectly  and match snapshot', () => {
    const { container } = render(<SizeSelection />);
    expect(container).toMatchSnapshot();
  });
});
