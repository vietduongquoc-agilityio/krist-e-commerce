import { render } from '@testing-library/react';

// Components
import { TagSelection } from '@/components';

describe('TagSelection Component', () => {
  it('should render TagSelection component and match snapshot', () => {
    const { container } = render(<TagSelection />);
    expect(container).toMatchSnapshot();
  });
});
