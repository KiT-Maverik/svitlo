import { notFound } from 'next/navigation';
import { Suspense } from 'react';

import { loadPublishedCourseLessonProps, loadPublishedUiKitMessages } from '@svitlo/adapter-nextjs';
import { DEFAULT_SUPPORTED_LANGUAGES, findCourseActivityByPlacement } from '@svitlo/engine/runtime';
import { toLessonProps } from '@svitlo/ui-kit';

import WebLesson from '@/components/pages/Lesson/Lesson';
import {
  assertCourseTocMatchesTree,
  coursePlacementHref,
  courseTocToTopics,
  parseCoursePlacement,
} from '@/lib/courseNavigation';
import { loadCourseToc, loadExistingCourseTree } from '@/lib/courseResources';

type Props = {
  params: Promise<{
    language: string;
    courseId: string;
    lessonLanguage: string;
    placement: string[];
  }>;
};

async function Content({ params }: Props) {
  const { language, courseId, lessonLanguage, placement: segments } = await params;
  const ui = DEFAULT_SUPPORTED_LANGUAGES.find(item => item.language === language);
  const selected = DEFAULT_SUPPORTED_LANGUAGES.find(item => item.language === lessonLanguage);
  const placement = parseCoursePlacement(segments);
  if (!ui || !selected || placement === null) notFound();

  const course = await loadExistingCourseTree(courseId, selected.language);
  if (!course) notFound();
  const activity = findCourseActivityByPlacement(course, placement);
  if (!activity || activity.node.type !== 'lesson') notFound();

  if ('draft' in activity.node && activity.node.draft === true) {
    return (
      <main aria-label="Draft Lesson preview">
        <h1>Not implemented</h1>
        <p>This Lesson has a reserved place in the Course but has not been produced.</p>
        <a href={'/' + language + '/course/' + course.id}>Back to Course</a>
      </main>
    );
  }

  const [data, messages, toc] = await Promise.all([
    loadPublishedCourseLessonProps(course.id, activity.node.id, selected.language, { placement }),
    loadPublishedUiKitMessages(ui.locale),
    loadCourseToc(course.id, selected.language),
  ]);
  assertCourseTocMatchesTree(course, toc);

  return (
    <WebLesson
      response={toLessonProps(data)}
      locale={ui.locale}
      lessonLocale={selected.locale}
      href={coursePlacementHref(course.id, language, lessonLanguage, 'lesson', placement)}
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
