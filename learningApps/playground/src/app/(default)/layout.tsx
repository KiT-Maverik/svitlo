import type { ReactNode } from 'react';
import AppDocument from '../AppDocument';

export default function RootLayout({ children }: { children: ReactNode }) {
  return <AppDocument lang="uk" direction="ltr">{children}</AppDocument>;
}
