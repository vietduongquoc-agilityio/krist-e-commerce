import { render } from '@testing-library/react';
import '@testing-library/jest-dom';

// Component
import { SignUpForm } from '@/components';

describe('SignUpForm', () => {
  it('should render SignUpForm correctly and match snapshot', () => {
    const { container } = render(<SignUpForm />);
    expect(container).toMatchSnapshot();
  });
});
