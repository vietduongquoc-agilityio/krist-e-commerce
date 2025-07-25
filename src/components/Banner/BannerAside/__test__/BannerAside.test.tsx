import { render } from '@testing-library/react';

// Components
import { BannerAside } from '@/components/Banner/BannerAside';

describe('BannerAside Component', () => {
  it('should render BannerAside component and match snapshot', () => {
    const { container } = render(<BannerAside />);
    expect(container).toMatchSnapshot();
  });
});
