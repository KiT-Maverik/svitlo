import { Suspense } from 'react';
import type { Metadata } from 'next';
import { Container } from '@mui/material';
import Lesson from '@/components/pages/Lesson/Lesson';
import { resolveLocale } from '@/i18n/resolveLocale';
import { DEFAULT_SUPPORTED_LANGUAGES } from '@svitlo/engine/localization';
import { demoLessonConfig, demoLessonCatalog } from '@/data/demoLesson/demoLesson';
import { buildTextContentBlock } from '@svitlo/engine/builders';

export async function generateMetadata({ searchParams }: PageProps<'/topics/demo'>): Promise<Metadata> {
  const locale = resolveLocale(
    (await searchParams).lang,
    DEFAULT_SUPPORTED_LANGUAGES.map(language => language.locale),
    'uk-UA',
  );
  return {
    title: `${buildTextContentBlock(demoLessonCatalog.text[demoLessonConfig.title], locale).value} — Svitlo Playground`,
    description: 'Нейтральний приклад інтерактивного уроку, навігації та оцінювання.',
  };
}

export default function DemoTopic({ searchParams }: PageProps<'/topics/demo'>) {
  return (
    <Suspense fallback={<Container maxWidth="md" sx={{ py: 6 }} />}>
      <LocalizedDemoTopic searchParams={searchParams} />
    </Suspense>
  );
}

async function LocalizedDemoTopic({ searchParams }: Pick<PageProps<'/topics/demo'>, 'searchParams'>) {
  const locale = resolveLocale(
    (await searchParams).lang,
    DEFAULT_SUPPORTED_LANGUAGES.map(language => language.locale),
    'uk-UA',
  );
  return <Lesson config={demoLessonConfig} catalog={demoLessonCatalog} locale={locale} href="/topics/demo" />;
}
