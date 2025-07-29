import { render } from '@testing-library/react';

// Components
import { StarRating } from '@/components';

describe('StarRating', () => {
  it('should render StarRating component and match snapshot', () => {
    const { container } = render(<StarRating rating={0} reviewCount={0} />);
    expect(container).toMatchSnapshot();
  });
});
