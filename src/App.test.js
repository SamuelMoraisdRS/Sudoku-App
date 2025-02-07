import { render, screen } from '@testing-library/react';
import App from './App';

// TODO: Add Tests

test('renders learn react link', () => {
  render(<App />);
  const linkElement = screen.getByText(/Sudoku/i);
  expect(linkElement).toBeInTheDocument();
});
