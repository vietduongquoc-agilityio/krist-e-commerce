import { render } from '@testing-library/react';

// Components
import { MiniCartPopup } from '@/components';

describe('MiniCartPopup', () => {
  it('should render MiniCartPopup component and match snapshot', () => {
    const { container } = render(
      <MiniCartPopup
        isOpen={false}
        onClose={function (): void {
          throw new Error('Function not implemented.');
        }}
        cartItems={[]}
      />,
    );
    expect(container).toMatchSnapshot();
  });
});
