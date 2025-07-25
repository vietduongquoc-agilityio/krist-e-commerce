import { render } from '@testing-library/react';

// Components
import { BrandSelection } from '@/components';

describe('BrandSelection Component', () => {
  it('should render BrandSelection component and match snapshot', () => {
    const { container } = render(<BrandSelection />);
    expect(container).toMatchSnapshot();
  });
});
