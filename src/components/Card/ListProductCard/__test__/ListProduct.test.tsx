import { render } from '@testing-library/react';
import { ListProductCard } from '@/components/Card';

describe('ListProductCard Component', () => {
  it('should render ListProductCard correctly and match snapshot', () => {
    const { asFragment } = render(<ListProductCard productsData={[]} />);
    expect(asFragment()).toMatchSnapshot();
  });
});
