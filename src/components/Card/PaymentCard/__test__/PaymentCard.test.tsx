import { render } from '@testing-library/react';

// Components
import { PaymentCard } from '@/components/Card';

describe('PaymentCard', () => {
  it('should render PaymentCard component and match snapshot', () => {
    const { container } = render(<PaymentCard subtotal={100} />);
    expect(container).toMatchSnapshot();
  });
});
