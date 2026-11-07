import '@/generated/textbookStyles';
import type { ReactNode } from 'react';
import { AppRouterCacheProvider } from '@mui/material-nextjs/v15-appRouter';
import InitColorSchemeScript from '@mui/material/InitColorSchemeScript';
import type { TextDirection } from '@svitlo/engine/localization';
import { SvitloThemeProvider } from '@svitlo/ui-kit/theme';

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
          <SvitloThemeProvider direction={direction}>{children}</SvitloThemeProvider>
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}
