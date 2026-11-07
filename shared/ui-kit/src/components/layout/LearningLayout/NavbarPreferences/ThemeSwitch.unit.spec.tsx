import { afterEach, describe, expect, it, vi } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { createTheme, ThemeProvider, useColorScheme } from '@mui/material/styles';
import ThemeSwitch from './ThemeSwitch';
import { navbarPreferences } from '../../../../../data/locale/navbarPreferences';

const { uk, ar } = navbarPreferences;
const muiTheme = createTheme({
  cssVariables: { colorSchemeSelector: 'data' },
  colorSchemes: { light: true, dark: true },
});

function ConnectedThemeSwitch() {
  const { mode, systemMode, setMode } = useColorScheme();
  return (
    <>
      <output data-testid="selected-theme-mode">{mode}</output>
      <ThemeSwitch label={uk.theme.dark} mode={mode} systemMode={systemMode} onThemeChange={setMode} />
    </>
  );
}

describe('Animated navbar ThemeSwitch', () => {
  const setMode = vi.fn();
  const toggle = () => screen.getByRole('switch', { name: uk.theme.dark });

  afterEach(() => {
    vi.clearAllMocks();
    window.localStorage.removeItem('mui-mode');
  });

  it('has no visible label or tooltip but remains accessible', async () => {
    render(<ThemeSwitch label={uk.theme.dark} mode="light" onThemeChange={setMode} />);
    expect(toggle()).toBeEnabled();
    expect(screen.queryByText(uk.theme.light)).not.toBeInTheDocument();
    expect(screen.queryByText(uk.theme.dark)).not.toBeInTheDocument();
    await userEvent.hover(toggle());
    expect(screen.queryByRole('tooltip')).not.toBeInTheDocument();
  });

  it('uses the compact navbar size without exposing selectable static text', () => {
    const { container } = render(<ThemeSwitch label={uk.theme.dark} mode="light" onThemeChange={setMode} />);
    const root = container.querySelector('.MuiSwitch-root');
    expect(root).toHaveStyle({ width: '54px', height: '30px' });
    expect(root).toHaveStyle({ userSelect: 'none', cursor: 'pointer' });
  });

  it('toggles both ways and preserves sun and moon nodes for crossfade', async () => {
    const view = render(<ThemeSwitch label={uk.theme.dark} mode="light" onThemeChange={setMode} />);
    const sun = screen.getByTestId('WbSunnyRoundedIcon');
    const moon = screen.getByTestId('DarkModeRoundedIcon');
    await userEvent.click(toggle());
    expect(setMode).toHaveBeenCalledWith('dark');
    view.rerender(<ThemeSwitch label={uk.theme.dark} mode="dark" onThemeChange={setMode} />);
    expect(toggle()).toBeChecked();
    expect(screen.getByTestId('WbSunnyRoundedIcon')).toBe(sun);
    expect(screen.getByTestId('DarkModeRoundedIcon')).toBe(moon);
    await userEvent.click(toggle());
    expect(setMode).toHaveBeenLastCalledWith('light');
  });

  it('works during hydration and resolves a dark system mode', async () => {
    const view = render(<ThemeSwitch label={uk.theme.dark} onThemeChange={setMode} />);
    await userEvent.click(toggle());
    expect(setMode).toHaveBeenCalledWith('dark');
    view.rerender(<ThemeSwitch label={uk.theme.dark} mode="system" systemMode="dark" onThemeChange={setMode} />);
    expect(toggle()).toBeChecked();
  });

  it('supports localized RTL accessible names', () => {
    render(
      <div dir="rtl">
        <ThemeSwitch label={ar.theme.dark} mode="dark" onThemeChange={setMode} />
      </div>,
    );
    expect(screen.getByRole('switch', { name: ar.theme.dark })).toBeChecked();
  });

  it('updates real MUI light and dark color schemes', async () => {
    window.localStorage.removeItem('mui-mode');
    render(
      <ThemeProvider theme={muiTheme}>
        <ConnectedThemeSwitch />
      </ThemeProvider>,
    );
    await waitFor(() => expect(screen.getByTestId('selected-theme-mode')).not.toHaveTextContent(''));
    await userEvent.click(toggle());
    await waitFor(() => {
      expect(screen.getByTestId('selected-theme-mode')).toHaveTextContent('dark');
      expect(document.documentElement).toHaveAttribute('data-dark');
    });
    await userEvent.click(toggle());
    await waitFor(() => {
      expect(screen.getByTestId('selected-theme-mode')).toHaveTextContent('light');
      expect(document.documentElement).toHaveAttribute('data-light');
    });
  });
});
