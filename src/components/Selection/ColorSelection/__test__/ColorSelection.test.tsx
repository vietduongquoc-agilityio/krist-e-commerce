import { render } from '@testing-library/react';

// Components
import { ColorSelection } from '@/components';

describe('ColorSelection', () => {
  it('should render corectly  and match snapshot', () => {
    const { container } = render(<ColorSelection />);
    expect(container).toMatchSnapshot();
  });
});
