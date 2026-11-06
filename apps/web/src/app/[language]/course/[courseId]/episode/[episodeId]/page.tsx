import { Suspense } from 'react';
import { notFound } from 'next/navigation';
import { DEFAULT_SUPPORTED_LANGUAGES } from '@svitlo/engine/localization';
import { loadPublishedUiKitMessages } from '@svitlo/adapter-nextjs/lesson';
import type { LessonResponse } from '@svitlo/engine/lesson';
import { courseHasEpisode, flattenCourseToc, loadCourseEpisode, loadCourseToc } from '@/lib/courseResources';
import WebLesson from '@/components/pages/Lesson/Lesson';

type Props = { params: Promise<{ language: string; courseId: string; episodeId: string }> };
type AuthoredEpisode = {
  id: string;
  title: { value: string } | string;
  sections: {
    id: string;
    slug: string;
    type: 'scenario';
    title: string;
    navigationLabel: string;
    content: {
      id: string;
      slug: string;
      type: string;
      locales?: unknown;
    }[];
  }[];
};
async function Content({ params }: Props) {
  const { language, courseId, episodeId } = await params;
  const descriptor = DEFAULT_SUPPORTED_LANGUAGES.find(item => item.language === language);
  if (!descriptor) notFound();
  let toc;
  try {
    toc = await loadCourseToc(courseId, descriptor.language);
  } catch {
    notFound();
  }
  if (!courseHasEpisode(toc, episodeId)) notFound();
  const [raw, messages] = await Promise.all([
    loadCourseEpisode(courseId, episodeId, descriptor.language),
    loadPublishedUiKitMessages(descriptor.locale),
  ]);
  const episode = raw as AuthoredEpisode;
  if (episode.id !== episodeId || !Array.isArray(episode.sections)) notFound();
  const title = typeof episode.title === 'string' ? episode.title : episode.title.value;
  const response = {
    id: episodeId,
    slug: 'episode',
    title,
    locale: { code: descriptor.language },
    parameters: {
      requireQuiz: false,
      languages: [descriptor.language],
      sections: { allowNavigation: true, allowSkipping: true, showIndexes: true },
    },
    flashcards: [],
    skills: [],
    questions: {},
    localeSources: { config: {}, questions: {}, flashcards: {} },
    sections: episode.sections.map(section => ({
      ...section,
      questions: [],
      content: section.content.map(block => {
        if (block.type === 'markdown') {
          const { locales, ...rest } = block;
          return { ...rest, text: locales };
        }
        return block;
      }),
    })),
  } as LessonResponse;
  const href = '/' + language + '/course/' + courseId + '/episode/' + episodeId;
  return (
    <WebLesson
      response={response}
      locale={descriptor.locale}
      href={href}
      messages={messages}
      topics={flattenCourseToc(toc, language)}
    />
  );
}
export default function CourseEpisodePage(props: Props) {
  return (
    <Suspense
      fallback={
        <div role="status" aria-busy="true">
          Loading episode…
        </div>
      }
    >
      <Content {...props} />
    </Suspense>
  );
}
