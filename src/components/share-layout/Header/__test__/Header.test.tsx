import { render } from '@testing-library/react';

// Components
import { Header } from '@/components';

describe('Header', () => {
  it('renders correctly when user is not authenticated (snapshot)', () => {
    const { container } = render(<Header isAuthenticated={false} />);
    expect(container).toMatchSnapshot();
  });

  it('renders correctly when user is authenticated (snapshot)', () => {
    const { container } = render(<Header isAuthenticated={true} />);
    expect(container).toMatchSnapshot();
  });
});
