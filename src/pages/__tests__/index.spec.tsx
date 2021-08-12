import { render, screen } from '@testing-library/react';
import React from 'react';
import Home from '..';


jest.mock('next/router', () => {
  return {
    useRouter() {
      return {
        asPath: '/',
      };
    },
  };
});

describe('Home Page', () => {
  it('renders correctly', () => {
    const { getByText, getByAltText } = render(
      <Home/>,
    );

    expect(getByText('Olá Dev!')).toBeInTheDocument();
    expect(getByAltText('Home image!')).toBeInTheDocument();

  });

});
