import { Suspense } from 'react';
import { notFound } from 'next/navigation';
import { DEFAULT_SUPPORTED_LANGUAGES } from '@svitlo/engine/runtime';
import { loadPublishedCourseLessonProps, loadPublishedUiKitMessages } from '@svitlo/adapter-nextjs';
import { courseHasLesson, loadCourseLessonTitles, loadCourseTree } from '@/lib/courseResources';
import { coursePropsToTopics } from '@/lib/courseNavigation';
import WebLesson from '@/components/pages/Lesson/Lesson';

type Props = { params: Promise<{ language: string; courseId: string; lessonLanguage: string; lessonId: string }> };

async function Content({ params }: Props) {
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

  const [response, messages, titles] = await Promise.all([
    loadPublishedCourseLessonProps(courseId, lessonId, lessonDescriptor.language),
    loadPublishedUiKitMessages(descriptor.locale),
    loadCourseLessonTitles(course, lessonDescriptor.language),
  ]);

  const href = '/' + language + '/course/' + courseId + '/lesson/' + lessonLanguage + '/' + lessonId;
  return (
    <WebLesson
      response={response}
      locale={descriptor.locale}
      lessonLocale={lessonDescriptor.locale}
      href={href}
      messages={messages}
      topics={coursePropsToTopics(course, language, lessonLanguage, titles)}
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
