import { Suspense } from 'react';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { Container } from '@mui/material';
import { resolveEntityPath } from '@svitlo/engine';
import { DEFAULT_SUPPORTED_LANGUAGES } from '@svitlo/engine/localization';
import { loadLessonResponse } from '@/lib/lessons/loadLessonResponse';
import LessonV2 from '@/components/pages/Lesson/LessonV2';

type LessonPageProps = PageProps<'/[language]/lesson/[lessonId]'>;

async function localizedLesson({ params }: LessonPageProps) {
  const { language: code, lessonId } = await params;
  let canonicalId: string;
  try {
    canonicalId = resolveEntityPath(lessonId).split('/')[1];
  } catch {
    notFound();
  }

  const language = DEFAULT_SUPPORTED_LANGUAGES.find(entry => entry.language === code);
  if (!language) notFound();
  return { locale: language.locale, response: await loadLessonResponse(canonicalId, language.language) };
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
  return <LessonV2 response={response} locale={locale} href={`/${response.locale.code}/lesson/${response.id}`} />;
}
