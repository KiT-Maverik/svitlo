import { Suspense } from 'react';
import type { Metadata } from 'next';
import { Container } from '@mui/material';
import { DEFAULT_SUPPORTED_LANGUAGES } from '@svitlo/engine/localization';
import type { Locale } from '@svitlo/engine/localization';
import { resolveLocale } from '@/i18n/resolveLocale';
import { loadLessonResponse } from '@/lib/lessons/loadLessonResponse';
import LessonV2 from '@/components/pages/Lesson/LessonV2';

const group = '1';
const slug = 'howLightMoves';

async function localizedLesson(searchParams: Promise<{ lang?: string | string[] }>) {
  const locale = resolveLocale(
    (await searchParams).lang,
    DEFAULT_SUPPORTED_LANGUAGES.map(language => language.locale),
    'uk-UA',
  ) as Locale;
  const language = DEFAULT_SUPPORTED_LANGUAGES.find(entry => entry.locale === locale);
  if (!language) throw new Error('No language mapping for ' + locale);
  return { locale, response: await loadLessonResponse(group, slug, language.language) };
}

export async function generateMetadata({ searchParams }: PageProps<'/topics/light'>): Promise<Metadata> {
  const { response } = await localizedLesson(searchParams);
  return {
    title: response.title + ' — Світло',
    description: response.title,
  };
}

export default function LightTopic({ searchParams }: PageProps<'/topics/light'>) {
  return (
    <Suspense fallback={<Container maxWidth="md" sx={{ py: 6 }} />}>
      <LocalizedLightTopic searchParams={searchParams} />
    </Suspense>
  );
}

async function LocalizedLightTopic({ searchParams }: Pick<PageProps<'/topics/light'>, 'searchParams'>) {
  const { locale, response } = await localizedLesson(searchParams);
  return <LessonV2 response={response} locale={locale} href="/topics/light" />;
}
