import { render } from '@testing-library/react';

// Mocks
import { productMock } from '@/mocks';

// Components
import { CartContent } from '@/components';

describe('CartContent', () => {
  it('should render CartContent component and match snapshot', () => {
    const { container } = render(<CartContent items={productMock} />);
    expect(container).toMatchSnapshot();
  });
});
