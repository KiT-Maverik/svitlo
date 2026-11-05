import '@/generated/textbookStyles';
import type { ReactNode } from 'react';
import { AppRouterCacheProvider } from '@mui/material-nextjs/v15-appRouter';
import CssBaseline from '@mui/material/CssBaseline';
import InitColorSchemeScript from '@mui/material/InitColorSchemeScript';
import type { TextDirection } from '@svitlo/engine/localization';
import MuiThemeProvider from './MuiThemeProvider';

export default function AppDocument({
  children,
  lang,
  direction,
}: {
  children: ReactNode;
  lang: string;
  direction: TextDirection;
}) {
  return (
    <html lang={lang} dir={direction} suppressHydrationWarning>
      <body>
        <InitColorSchemeScript attribute="data" />
        <AppRouterCacheProvider options={{ enableCssLayer: true }}>
          <MuiThemeProvider direction={direction}>
            <CssBaseline />
            {children}
          </MuiThemeProvider>
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}
