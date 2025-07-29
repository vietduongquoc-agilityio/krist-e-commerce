import { render } from '@testing-library/react';

// Components
import { Pagination } from '@/components';

describe('Pagination component', () => {
  it('should render correctly and match snapshot', () => {
    const { asFragment } = render(
      <Pagination
        currentPage={1}
        totalPages={10}
        onPageChange={function (page: number): void {
          throw new Error('Function not implemented.');
        }}
      />,
    );
    expect(asFragment()).toMatchSnapshot();
  });
});
