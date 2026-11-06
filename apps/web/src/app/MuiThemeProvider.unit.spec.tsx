import { afterEach, describe, expect, it } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { useColorScheme, useTheme } from '@mui/material/styles';
import MuiThemeProvider from './MuiThemeProvider';

function ThemeConsumer() {
  const { mode, setMode } = useColorScheme();
  const theme = useTheme();

  return (
    <>
      <output data-testid="mode">{mode}</output>
      <output data-testid="palette-mode">{theme.palette.mode}</output>
      <button type="button" onClick={() => setMode('dark')}>
        Dark theme
      </button>
      <button type="button" onClick={() => setMode('light')}>
        Light theme
      </button>
    </>
  );
}

describe('Web color scheme provider', () => {
  afterEach(() => {
    window.localStorage.removeItem('mui-mode');
  });

  it('updates MUI theme consumers along with the selected color scheme', async () => {
    window.localStorage.removeItem('mui-mode');
    render(
      <MuiThemeProvider direction="ltr">
        <ThemeConsumer />
      </MuiThemeProvider>,
    );

    await waitFor(() => expect(screen.getByTestId('mode')).not.toHaveTextContent(''));
    await userEvent.click(screen.getByRole('button', { name: 'Dark theme' }));
    await waitFor(() => {
      expect(screen.getByTestId('mode')).toHaveTextContent('dark');
      expect(screen.getByTestId('palette-mode')).toHaveTextContent('dark');
      expect(document.documentElement).toHaveAttribute('data-dark');
    });

    await userEvent.click(screen.getByRole('button', { name: 'Light theme' }));
    await waitFor(() => {
      expect(screen.getByTestId('mode')).toHaveTextContent('light');
      expect(screen.getByTestId('palette-mode')).toHaveTextContent('light');
      expect(document.documentElement).toHaveAttribute('data-light');
    });
  });
});
