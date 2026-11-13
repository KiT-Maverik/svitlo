'use client';

import type { ReactNode } from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import GlobalStyles from '@mui/material/GlobalStyles';
import { createTheme, ThemeProvider } from '@mui/material/styles';

// Export the hook from the same MUI module instance that owns ThemeProvider.
// Cross-platform consumers must not mix ESM and CommonJS MUI color-scheme contexts.
export { useColorScheme as useSvitloColorScheme } from '@mui/material/styles';
import type { TextDirection } from '+@svitlo/contracts/localization';

/**
 * The same MUI palette, CSS-variable color schemes and motion are used by
 * Next.js, Electron and Capacitor. The host owns only routing, persistence
 * and (for SSR) the initial color-scheme script.
 */
const colorSchemes = {
  light: true,
  dark: { palette: { primary: { main: '#1976d2', contrastText: '#fff' } } },
} as const;

const themes = {
  ltr: createTheme({ cssVariables: { colorSchemeSelector: 'data' }, colorSchemes, direction: 'ltr' }),
  rtl: createTheme({ cssVariables: { colorSchemeSelector: 'data' }, colorSchemes, direction: 'rtl' }),
};

/**
 * Keep theme surface timing in one pair of CSS variables. The Stepper uses a
 * masked solid-color layer so its bottom fade follows the same background-color
 * interpolation as the page itself. Animate only the large surfaces that
 * establish the page's colors. Applying
 * transitions to every MUI child (especially Select, Typography and SvgIcon)
 * stacks multiple paint animations and makes Quick Settings appear to flash.
 * Keep foreground text instant to prevent intermediate low-contrast states
 * when disabled buttons or title colors change against their backgrounds.
 * Navbar chrome keeps its opaque background instantaneous: interpolating
 * inverted foreground/background colors makes text disappear at mid-transition.
 * Its border still blends smoothly with the surrounding lesson surface.
 */
const themeTransitions = {
  ':root': {
    '--svitlo-theme-transition-duration': '280ms',
    '--svitlo-theme-transition-easing': 'ease-in-out',
  },
  '@media (prefers-reduced-motion: no-preference)': {
    ':where(body, .svitlo-theme-surface, .MuiPaper-root), .svitlo-theme-stepper::before': {
      transitionProperty: 'background-color, border-color',
      transitionDuration: 'var(--svitlo-theme-transition-duration)',
      transitionTimingFunction: 'var(--svitlo-theme-transition-easing)',
    },
    ':where(.svitlo-theme-chrome)': {
      transitionProperty: 'border-color',
      transitionDuration: 'var(--svitlo-theme-transition-duration)',
      transitionTimingFunction: 'var(--svitlo-theme-transition-easing)',
    },
  },
} as const;

export type SvitloThemeProviderProps = {
  children: ReactNode;
  direction: TextDirection;
  /** The host can keep its existing initial mode without defining palettes. */
  defaultMode?: 'light' | 'dark' | 'system';
  /** Browser-only hosts can skip the server hydration reconciliation. */
  noSsr?: boolean;
};

export function SvitloThemeProvider({ children, direction, defaultMode, noSsr }: SvitloThemeProviderProps) {
  return (
    <ThemeProvider theme={themes[direction]} defaultMode={defaultMode} noSsr={noSsr}>
      <CssBaseline />
      <GlobalStyles styles={themeTransitions} />
      {children}
    </ThemeProvider>
  );
}
