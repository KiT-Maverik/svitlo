import { afterEach, describe, expect, it } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { useColorScheme, useTheme } from '@mui/material/styles';
import { SvitloThemeProvider } from './theme';

function ThemeProbe() {
  const { mode, setMode } = useColorScheme();
  const theme = useTheme();
  return (
    <>
      <output data-testid="mode">{mode}</output>
      <output data-testid="direction">{theme.direction}</output>
      <output data-testid="background">{theme.vars?.palette.background.default}</output>
      <button type="button" onClick={() => setMode('dark')}>
        Use dark
      </button>
      <button type="button" onClick={() => setMode('light')}>
        Use light
      </button>
    </>
  );
}

describe('Portable SvitloThemeProvider', () => {
  afterEach(() => {
    window.localStorage.removeItem('mui-mode');
  });

  it('provides CSS-variable light/dark palettes and lets all hosts change modes', async () => {
    window.localStorage.removeItem('mui-mode');
    render(
      <SvitloThemeProvider direction="ltr" defaultMode="light" noSsr>
        <ThemeProbe />
      </SvitloThemeProvider>,
    );
    await waitFor(() => expect(screen.getByTestId('mode')).toHaveTextContent('light'));
    expect(screen.getByTestId('background')).toHaveTextContent('var(--mui-palette-background-default)');

    await userEvent.click(screen.getByRole('button', { name: 'Use dark' }));
    await waitFor(() => {
      expect(screen.getByTestId('mode')).toHaveTextContent('dark');
      expect(document.documentElement).toHaveAttribute('data-dark');
    });

    await userEvent.click(screen.getByRole('button', { name: 'Use light' }));
    await waitFor(() => {
      expect(screen.getByTestId('mode')).toHaveTextContent('light');
      expect(document.documentElement).toHaveAttribute('data-light');
    });
  });

  it('updates MUI text direction without recreating the consumer', () => {
    const view = render(
      <SvitloThemeProvider direction="ltr" noSsr>
        <ThemeProbe />
      </SvitloThemeProvider>,
    );
    const direction = screen.getByTestId('direction');
    expect(direction).toHaveTextContent('ltr');
    view.rerender(
      <SvitloThemeProvider direction="rtl" noSsr>
        <ThemeProbe />
      </SvitloThemeProvider>,
    );
    expect(screen.getByTestId('direction')).toBe(direction);
    expect(direction).toHaveTextContent('rtl');
  });
});
