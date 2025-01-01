import { render, screen } from '@testing-library/react';
import Main from '@components/Main';

describe('Main', () => {
  test('should render correctly', () => {
    render(<Main />);
    expect(screen.getByText('Veronica')).toBeInTheDocument();
  });
});
