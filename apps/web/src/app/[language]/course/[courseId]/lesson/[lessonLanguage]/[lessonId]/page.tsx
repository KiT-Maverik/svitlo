import { notFound } from 'next/navigation';
import { Suspense } from 'react';

import { loadPublishedCourseLessonProps, loadPublishedUiKitMessages } from '@svitlo/adapter-nextjs';
import { courseActivities, DEFAULT_SUPPORTED_LANGUAGES } from '@svitlo/engine/runtime';

import WebLesson from '@/components/pages/Lesson/Lesson';
import { courseTocToTopics } from '@/lib/courseNavigation';
import { courseHasLesson, loadCourseToc, loadCourseTree } from '@/lib/courseResources';

type Props = {
  params: Promise<{ language: string; courseId: string; lessonLanguage: string; lessonId: string }>;
  searchParams: Promise<{ placement?: string | string[] }>;
};

async function Content({ params, searchParams }: Props) {
  const { language, courseId, lessonLanguage, lessonId } = await params;
  const descriptor = DEFAULT_SUPPORTED_LANGUAGES.find(item => item.language === language);
  const lessonDescriptor = DEFAULT_SUPPORTED_LANGUAGES.find(item => item.language === lessonLanguage);
  if (!descriptor || !lessonDescriptor) notFound();

  let course;
  try {
    course = await loadCourseTree(courseId, lessonDescriptor.language);
  } catch {
    notFound();
  }
  if (!courseHasLesson(course, lessonId)) notFound();
  const candidates = courseActivities(course).filter(({ node }) => node.type === 'lesson' && node.id === lessonId);
  const placement = (await searchParams).placement;
  if (
    Array.isArray(placement) ||
    (placement !== undefined && !candidates.some(item => item.placement === placement)) ||
    (placement === undefined && candidates.length !== 1)
  )
    notFound();

  const selected = candidates.find(candidate => candidate.placement === (placement ?? candidates[0]?.placement));
  if (selected && 'draft' in selected.node && selected.node.draft === true) {
    return (
      <main aria-label="Draft Lesson preview">
        <h1>Not implemented</h1>
        <p>This Lesson has a reserved place in the Course but has not been produced.</p>
        <a href={'/' + language + '/course/' + courseId}>Back to Course</a>
      </main>
    );
  }

  const [response, messages, toc] = await Promise.all([
    loadPublishedCourseLessonProps(courseId, lessonId, lessonDescriptor.language, { placement }),
    loadPublishedUiKitMessages(descriptor.locale),
    loadCourseToc(courseId, lessonDescriptor.language),
  ]);

  const href =
    '/' +
    language +
    '/course/' +
    courseId +
    '/lesson/' +
    lessonLanguage +
    '/' +
    lessonId +
    (placement ? '?placement=' + encodeURIComponent(placement) : '');
  return (
    <WebLesson
      response={response}
      locale={descriptor.locale}
      lessonLocale={lessonDescriptor.locale}
      href={href}
      messages={messages}
      topics={courseTocToTopics(toc, language, lessonLanguage)}
    />
  );
}

export default function CourseLessonPage(props: Props) {
  return (
    <Suspense
      fallback={
        <div role="status" aria-busy="true">
          Loading lesson…
        </div>
      }
    >
      <Content {...props} />
    </Suspense>
  );
}
