import { ProductCard } from '@/components/Card';
import { PRODUCT_MOCK } from '@/mocks';
import { render } from '@testing-library/react';
import { useRouter } from 'next/navigation';

jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
}));

describe('ProductCard', () => {
  const mockPush = jest.fn();

  beforeEach(() => {
    (useRouter as jest.Mock).mockReturnValue({ push: mockPush });
  });

  it('should render correctly and match snapshot', () => {
    const { asFragment } = render(
      <ProductCard productCard={PRODUCT_MOCK[0]} />,
    );
    expect(asFragment()).toMatchSnapshot();
  });
});
