'use client';
import type { ReactNode } from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
const theme = createTheme({ cssVariables: { colorSchemeSelector: 'data' }, colorSchemes: { light: true, dark: true } });
export default function MuiThemeProvider({ children }: { children: ReactNode }) {
  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
}
