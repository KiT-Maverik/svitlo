'use client';

import type { ReactNode } from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import type { TextDirection } from '@svitlo/engine/localization';

const options = {
  cssVariables: { colorSchemeSelector: 'data' },
  colorSchemes: {
    light: true,
    dark: { palette: { primary: { main: '#1976d2', contrastText: '#fff' } } },
  },
} as const;

const themes = {
  ltr: createTheme({ ...options, direction: 'ltr' }),
  rtl: createTheme({ ...options, direction: 'rtl' }),
};

export default function MuiThemeProvider({ children, direction }: { children: ReactNode; direction: TextDirection }) {
  // CSS-variable palettes follow MUI's data-light / data-dark selectors.
  // Quick Settings must use the host's MUI useColorScheme to read and change the mode.
  return <ThemeProvider theme={themes[direction]}>{children}</ThemeProvider>;
}
