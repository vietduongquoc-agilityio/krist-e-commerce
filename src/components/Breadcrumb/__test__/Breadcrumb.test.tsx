import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';

// Component
import { Breadcrumb } from '@/components';

describe('Breadcrumb component', () => {
  const breadcrumbItems = [{ name: 'Home', href: '/' }, { name: 'Fashion' }];

  it('should render correctly and matches snapshot', () => {
    const { asFragment } = render(<Breadcrumb items={breadcrumbItems} />);
    expect(asFragment()).toMatchSnapshot();
  });

  it('renders breadcrumb title correctly', () => {
    render(<Breadcrumb items={breadcrumbItems} />);
    expect(screen.getByRole('heading')).toHaveTextContent('Fashion');
  });
});
