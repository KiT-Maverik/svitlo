import { Suspense } from 'react';
import { notFound } from 'next/navigation';
import { DEFAULT_SUPPORTED_LANGUAGES } from '@svitlo/engine/localization';
import { loadPublishedLesson, loadPublishedUiKitMessages } from '@svitlo/adapter-nextjs/lesson';
import { courseHasLesson, flattenCourseToc, loadCourseLesson, loadCourseToc } from '@/lib/courseResources';
import WebLesson from '@/components/pages/Lesson/Lesson';

type Props = { params: Promise<{ language: string; courseId: string; lessonId: string }> };

async function Content({ params }: Props) {
  const { language, courseId, lessonId } = await params;
  const descriptor = DEFAULT_SUPPORTED_LANGUAGES.find(item => item.language === language);
  if (!descriptor) notFound();
  let toc;
  try {
    toc = await loadCourseToc(courseId, descriptor.language);
  } catch {
    notFound();
  }
  if (!courseHasLesson(toc, lessonId)) notFound();
  const [lesson, messages] = await Promise.all([
    loadPublishedLesson(lessonId, descriptor.language),
    loadPublishedUiKitMessages(descriptor.locale),
  ]);
  const response = await loadCourseLesson(courseId, lesson, descriptor.language);
  const href = '/' + language + '/course/' + courseId + '/lesson/' + lessonId;
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
