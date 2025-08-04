import { render } from '@testing-library/react';

// Components
import { Text } from '@/components';

// Constants
import { TEXT_SIZE, TEXT_VARIANT } from '@/constants';

describe('Text component', () => {
  it('renders default correctly', () => {
    const { container } = render(<Text>Default Text</Text>);
    expect(container).toMatchSnapshot();
  });

  it('renders with custom size and variant', () => {
    const { container } = render(
      <Text size={TEXT_SIZE['2XL']} variant={TEXT_VARIANT.PRIMARY}>
        Custom Text
      </Text>,
    );
    expect(container).toMatchSnapshot();
  });

  it('renders as a custom HTML element', () => {
    const { container } = render(
      <Text as="span" size={TEXT_SIZE['BASE']} variant={TEXT_VARIANT.ERROR}>
        Span Text
      </Text>,
    );
    expect(container).toMatchSnapshot();
  });

  it('applies additional className correctly', () => {
    const { container } = render(
      <Text className="font-bold">Styled Text</Text>,
    );
    expect(container).toMatchSnapshot();
  });
});
