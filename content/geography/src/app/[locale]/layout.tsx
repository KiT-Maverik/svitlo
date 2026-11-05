import type { ReactNode } from 'react';
import { DEFAULT_SUPPORTED_LANGUAGES } from '@svitlo/contracts/localization';
import { AppRouterCacheProvider } from '@mui/material-nextjs/v15-appRouter';
import CssBaseline from '@mui/material/CssBaseline';
import InitColorSchemeScript from '@mui/material/InitColorSchemeScript';
import { notFound } from 'next/navigation';
import MuiThemeProvider from './themeProvider';

type Props = { children: ReactNode; params: Promise<{ locale: string }> };
export function generateStaticParams() {
  return DEFAULT_SUPPORTED_LANGUAGES.map(({ locale }) => ({ locale }));
}
export default async function LocaleRootLayout({ children, params }: Props) {
  const { locale } = await params;
  const language = DEFAULT_SUPPORTED_LANGUAGES.find(entry => entry.locale === locale);
  if (!language) notFound();
  return (
    <html lang={language.language} dir={language.direction} suppressHydrationWarning>
      <body>
        <InitColorSchemeScript attribute="data" />
        <AppRouterCacheProvider options={{ enableCssLayer: true }}>
          <MuiThemeProvider>
            <CssBaseline />
            {children}
          </MuiThemeProvider>
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}
