'use client';

import { createTheme, ThemeProvider } from '@mui/material/styles';
import type { ReactNode } from 'react';

const theme = createTheme({
  cssVariables: { colorSchemeSelector: 'data' },
  colorSchemes: { light: true, dark: true },
  typography: {
    fontFamily: 'Arial, Helvetica, sans-serif',
  },
});

export default function PlatformThemeProvider({ children }: { children: ReactNode }) {
  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
}
