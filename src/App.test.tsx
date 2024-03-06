import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

test('renders the navigation bar', () => {
  render(<App />);
  const navElement = screen.getByRole('navigation');
  expect(navElement).toBeInTheDocument();
});
