import { notFound } from 'next/navigation';
import { DEFAULT_SUPPORTED_LANGUAGES } from '@svitlo/engine/localization';
import AppDocument from '../AppDocument';

export function generateStaticParams() {
  return DEFAULT_SUPPORTED_LANGUAGES.map(({ language }) => ({ language }));
}

export default async function LanguageLayout({ children, params }: LayoutProps<'/[language]'>) {
  const { language: code } = await params;
  const language = DEFAULT_SUPPORTED_LANGUAGES.find(entry => entry.language === code);
  if (!language) notFound();
  return (
    <AppDocument lang={language.locale} direction={language.direction}>
      {children}
    </AppDocument>
  );
}
