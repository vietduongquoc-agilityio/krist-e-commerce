import { CollectionSelection } from '@/components';
import { render } from '@testing-library/react';

describe('CollectionSelection Component', () => {
  it('should render CollectionSelection component and match snapshot', () => {
    const { container } = render(<CollectionSelection />);
    expect(container).toMatchSnapshot();
  });
});
