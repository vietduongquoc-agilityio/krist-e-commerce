import { Banner } from '@/components';
import { render } from '@testing-library/react';

describe('Banner Component', () => {
  it('should render Banner component and match snapshot', () => {
    const { container } = render(<Banner />);
    expect(container).toMatchSnapshot();
  });
});
