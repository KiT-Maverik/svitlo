import { Suspense } from 'react';
import { notFound } from 'next/navigation';
import { DEFAULT_SUPPORTED_LANGUAGES } from '@svitlo/engine/localization';
import { loadPublishedLesson, loadPublishedUiKitMessages } from '@svitlo/adapter-nextjs/lesson';
import { courseHasLesson, loadCourseLesson, loadCourseToc } from '@/lib/courseResources';
import WebLesson from '@/components/pages/Lesson/Lesson';
import { courseTocToTopics } from '@/lib/courseNavigation';

type Props = { params: Promise<{ language: string; courseId: string; lessonLanguage: string; lessonId: string }> };

async function Content({ params }: Props) {
  const { language, courseId, lessonLanguage, lessonId } = await params;
  const descriptor = DEFAULT_SUPPORTED_LANGUAGES.find(item => item.language === language);
  const lessonDescriptor = DEFAULT_SUPPORTED_LANGUAGES.find(item => item.language === lessonLanguage);
  if (!descriptor || !lessonDescriptor) notFound();

  let toc;
  try {
    toc = await loadCourseToc(courseId, descriptor.language);
  } catch {
    notFound();
  }
  if (!courseHasLesson(toc, lessonId)) notFound();

  const [lesson, messages] = await Promise.all([
    loadPublishedLesson(lessonId, lessonDescriptor.language),
    loadPublishedUiKitMessages(descriptor.locale),
  ]);
  const response = await loadCourseLesson(courseId, lesson, lessonDescriptor.language);
  const href = '/' + language + '/course/' + courseId + '/lesson/' + lessonLanguage + '/' + lessonId;
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
