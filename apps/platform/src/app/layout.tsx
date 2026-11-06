import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import { AppRouterCacheProvider } from '@mui/material-nextjs/v15-appRouter';
import CssBaseline from '@mui/material/CssBaseline';
import InitColorSchemeScript from '@mui/material/InitColorSchemeScript';
import PlatformThemeProvider from './ThemeProvider';
import { SiteFooter, SiteHeader } from '@/components/SiteChrome';
import './globals.css';

export const metadata: Metadata = {
  title: { default: 'Світло Academy — NextGen Learning', template: '%s | Світло Academy' },
  description: 'Світло Academy — проєкт безплатних інтерактивних підручників та доступного навчання для кожної дитини.',
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="uk" suppressHydrationWarning>
      <body>
        <InitColorSchemeScript attribute="data" />
        <AppRouterCacheProvider options={{ enableCssLayer: true }}>
          <PlatformThemeProvider>
            <CssBaseline />
            <div className="site-shell">
              <SiteHeader />
              {children}
              <SiteFooter />
            </div>
          </PlatformThemeProvider>
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}
