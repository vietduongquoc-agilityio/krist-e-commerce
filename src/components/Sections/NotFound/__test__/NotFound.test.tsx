import { NotFound } from '@/components';
import { render } from '@testing-library/react';

describe('NotFound component', () => {
  it('renders correctly and matches snapshot', () => {
    const { container } = render(<NotFound />);
    expect(container).toMatchSnapshot();
  });
});
