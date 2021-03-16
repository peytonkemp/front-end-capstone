import { render, screen } from '@testing-library/react';
import TeeBox from './TeeBox';

test('renders learn react link', () => {
  render(<TeeBox />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
