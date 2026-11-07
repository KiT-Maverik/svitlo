import { useState } from 'react';
import { afterEach, describe, expect, it } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { useColorScheme, useTheme } from '@mui/material/styles';
import { SvitloThemeProvider } from '@svitlo/ui-kit/theme';

function ThemeConsumer() {
  const { mode, setMode } = useColorScheme();
  const theme = useTheme();
  const [count, setCount] = useState(0);

  return (
    <>
      <output data-testid="mode">{mode}</output>
      <output data-testid="palette-background">{theme.vars?.palette.background.default}</output>
      <output data-testid="local-state">{count}</output>
      <button type="button" onClick={() => setCount(value => value + 1)}>
        Keep state
      </button>
      <button type="button" onClick={() => setMode('dark')}>
        Dark theme
      </button>
      <button type="button" onClick={() => setMode('light')}>
        Light theme
      </button>
    </>
  );
}

describe('Web integration with shared color scheme provider', () => {
  afterEach(() => {
    window.localStorage.removeItem('mui-mode');
  });

  it('switches the active CSS color scheme without losing page state', async () => {
    window.localStorage.removeItem('mui-mode');
    render(
      <SvitloThemeProvider direction="ltr">
        <ThemeConsumer />
      </SvitloThemeProvider>,
    );

    await waitFor(() => expect(screen.getByTestId('mode')).not.toHaveTextContent(''));
    expect(screen.getByTestId('palette-background')).toHaveTextContent('var(--mui-palette-background-default)');
    await userEvent.click(screen.getByRole('button', { name: 'Keep state' }));
    expect(screen.getByTestId('local-state')).toHaveTextContent('1');
    await userEvent.click(screen.getByRole('button', { name: 'Dark theme' }));
    await waitFor(() => {
      expect(screen.getByTestId('mode')).toHaveTextContent('dark');
      expect(document.documentElement).toHaveAttribute('data-dark');
      expect(screen.getByTestId('local-state')).toHaveTextContent('1');
    });

    await userEvent.click(screen.getByRole('button', { name: 'Light theme' }));
    await waitFor(() => {
      expect(screen.getByTestId('mode')).toHaveTextContent('light');
      expect(document.documentElement).toHaveAttribute('data-light');
      expect(screen.getByTestId('local-state')).toHaveTextContent('1');
    });
  });
});
