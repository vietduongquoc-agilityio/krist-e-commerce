import { render } from '@testing-library/react';

// Components
import { Button } from '@/components/commons/Button';

describe('Button component', () => {
  it('renders default solid variant correctly', () => {
    const { container } = render(<Button>Click me</Button>);
    expect(container).toMatchSnapshot();
  });

  it('renders ghost variant correctly', () => {
    const { container } = render(<Button variant="ghost">Ghost</Button>);
    expect(container).toMatchSnapshot();
  });

  it('renders light variant correctly', () => {
    const { container } = render(<Button variant="light">Light</Button>);
    expect(container).toMatchSnapshot();
  });

  it('applies disabled styles', () => {
    const { container } = render(
      <Button isDisabled onClick={() => {}}>
        Disabled
      </Button>,
    );
    expect(container).toMatchSnapshot();
  });
});
