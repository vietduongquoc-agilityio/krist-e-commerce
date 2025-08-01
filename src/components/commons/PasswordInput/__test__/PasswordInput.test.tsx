/* eslint-disable @typescript-eslint/no-explicit-any */
import { render } from '@testing-library/react';
import { PasswordInput } from '@/components';

describe('PasswordInput', () => {
  it('Should render match snapshot', () => {
    const container = render(<PasswordInput />);
    expect(container).toMatchSnapshot();
  });
});
