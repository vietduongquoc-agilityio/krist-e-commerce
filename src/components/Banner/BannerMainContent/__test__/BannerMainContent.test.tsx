import { render } from '@testing-library/react';

// Components
import { BannerMainContent } from '@/components/Banner/BannerMainContent';

describe('BannerMainContent', () => {
  it('should render Banner component and match snapshot', () => {
    const { container } = render(<BannerMainContent />);
    expect(container).toMatchSnapshot();
  });
});
