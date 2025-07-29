import { render } from '@testing-library/react';

// Components
import { ViewerCount } from '@/components';

describe('ViewerCount', () => {
  it('should render ViewerCount component and match snapshot', () => {
    const { container } = render(<ViewerCount />);
    expect(container).toMatchSnapshot();
  });
});
