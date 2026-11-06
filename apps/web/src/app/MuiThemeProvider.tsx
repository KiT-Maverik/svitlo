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
  // Recalculate JS palette consumers while MUI updates data-light / data-dark CSS variables.
  // The shared layout must read useColorScheme from this host's MUI instance.
  return (
    <ThemeProvider theme={themes[direction]} disableTransitionOnChange forceThemeRerender>
      {children}
    </ThemeProvider>
  );
}
