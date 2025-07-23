import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';

// Component
import { ModelSection } from '@/components';

describe('ModelSection', () => {
  it('should renders correctly and matches snapshot', () => {
    const { container } = render(<ModelSection />);
    expect(container).toMatchSnapshot();
  });

  it('displays heading and paragraph text', () => {
    render(<ModelSection />);
    expect(
      screen.getByRole('heading', { name: /Follow Us On Instagram/i }),
    ).toBeInTheDocument();
    expect(screen.getByText(/Lorem ipsum dolor sit amet/i)).toBeInTheDocument();
  });
});
