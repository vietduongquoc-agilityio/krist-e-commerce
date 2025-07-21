import { render, screen } from '@testing-library/react';

import { usePathname } from 'next/navigation';
import { ROUTER } from '@/constants/router';
import { Navbar } from '@/components';

// Mock pathname hook
jest.mock('next/navigation', () => ({
  usePathname: jest.fn(),
}));

describe('Navbar component', () => {
  const navbarList = [
    { text: 'Home', path: ROUTER.HOME },
    { text: 'Shop', path: ROUTER.SHOP },
    { text: 'Cart', path: ROUTER.CART },
    { text: 'Sign In', path: ROUTER.SIGNIN },
    { text: 'Sign Up', path: ROUTER.SIGNUP },
  ];

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders all navbar items correctly and matches snapshot', () => {
    (usePathname as jest.Mock).mockReturnValue(ROUTER.SHOP);

    const { container } = render(
      <Navbar
        navbarList={navbarList}
        className={{
          baseClass: 'text-xl',
          activeClass: 'font-bold text-blue-600',
          inactiveClass: 'text-gray-400',
        }}
      />,
    );

    navbarList.forEach((item) => {
      expect(screen.getByText(item.text)).toBeInTheDocument();
    });

    expect(container).toMatchSnapshot();
  });

  it('applies active class to current path', () => {
    (usePathname as jest.Mock).mockReturnValue(ROUTER.CART);

    render(<Navbar navbarList={navbarList} />);

    expect(screen.getByText('Cart')).toHaveClass('font-semibold text-charcoal');
    expect(screen.getByText('Home')).toHaveClass('text-gray');
  });
});
