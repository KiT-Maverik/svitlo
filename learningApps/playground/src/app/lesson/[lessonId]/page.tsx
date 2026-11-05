import { Suspense } from 'react';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { Container } from '@mui/material';
import { resolveEntityPath } from '@svitlo/engine';
import { DEFAULT_SUPPORTED_LANGUAGES } from '@svitlo/engine/localization';
import type { Locale } from '@svitlo/engine/localization';
import { resolveLocale } from '@/i18n/resolveLocale';
import { loadLessonResponse } from '@/lib/lessons/loadLessonResponse';
import LessonV2 from '@/components/pages/Lesson/LessonV2';

type LessonPageProps = PageProps<'/lesson/[lessonId]'>;

async function localizedLesson({ params, searchParams }: LessonPageProps) {
  const { lessonId } = await params;
  let canonicalId: string;
  try {
    canonicalId = resolveEntityPath(lessonId).split('/')[1];
  } catch {
    notFound();
  }

  const locale = resolveLocale(
    (await searchParams).lang,
    DEFAULT_SUPPORTED_LANGUAGES.map(language => language.locale),
    'uk-UA',
  ) as Locale;
  const language = DEFAULT_SUPPORTED_LANGUAGES.find(entry => entry.locale === locale);
  if (!language) throw new Error('No language mapping for ' + locale);
  return { locale, response: await loadLessonResponse(canonicalId, language.language) };
}

export async function generateMetadata(props: LessonPageProps): Promise<Metadata> {
  const { response } = await localizedLesson(props);
  return {
    title: response.title,
    description: response.title,
  };
}

export default function LessonPage(props: LessonPageProps) {
  return (
    <Suspense fallback={<Container maxWidth="md" sx={{ py: 6 }} />}>
      <LocalizedLesson {...props} />
    </Suspense>
  );
}

async function LocalizedLesson(props: LessonPageProps) {
  const { locale, response } = await localizedLesson(props);
  return <LessonV2 response={response} locale={locale} href={`/lesson/${response.id}`} />;
}
