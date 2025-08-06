import { render } from '@testing-library/react';

// Components
import { Header } from '@/components';

// Context
import { CartProvider } from '@/context/cart';

describe('Header', () => {
  it('renders correctly when user is not authenticated (snapshot)', () => {
    const { container } = render(
      <CartProvider>
        <Header isAuthenticated={false} />
      </CartProvider>,
    );
    expect(container).toMatchSnapshot();
  });

  it('renders correctly when user is authenticated (snapshot)', () => {
    const { container } = render(
      <CartProvider>
        <Header isAuthenticated={true} />
      </CartProvider>,
    );
    expect(container).toMatchSnapshot();
  });
});
