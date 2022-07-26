import { render, screen } from '@testing-library/react';
import App from './App';

test('renders the landing page', async () => {
  render(<App />);
  expect(screen.getByTestId("page_title")).toHaveTextContent("The awesome Q/A tool")

});
