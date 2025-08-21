import { render } from '@testing-library/react';

// Components
import { Header } from '@/components';

// Providers
import Providers from '@/app/provider';

describe('Header', () => {
  it('renders correctly when user is not authenticated (snapshot)', () => {
    const { container } = render(
      <Providers>
        <Header isAuthenticated={false} userId={''} />,
      </Providers>,
    );
    expect(container).toMatchSnapshot();
  });
});
