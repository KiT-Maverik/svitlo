import { Suspense } from 'react';
import { notFound } from 'next/navigation';
import { DEFAULT_SUPPORTED_LANGUAGES } from '@svitlo/engine/runtime';
import { CoursePage } from '@svitlo/ui-kit';
import { getCourseMessages } from '@/lib/courseMessages';
import { loadPublishedCourseCatalog } from '@/lib/publishedCourseCatalog';
import { loadCourseTree, loadCourseLessonTitles } from '@/lib/courseResources';
import { coursePropsToTopics } from '@/lib/courseNavigation';

type Props = { params: Promise<{ language: string; courseId: string }> };

async function Content({ params }: Props) {
  const { language, courseId } = await params;
  const interfaceLocale = DEFAULT_SUPPORTED_LANGUAGES.find(item => item.language === language);
  if (!interfaceLocale) notFound();
  const preview = (await loadPublishedCourseCatalog(interfaceLocale.language)).find(course => course.id === courseId);
  if (!preview) notFound();
  const published = await loadCourseTree(courseId, interfaceLocale.language);
  const titles = await loadCourseLessonTitles(published, interfaceLocale.language);
  return (
    <CoursePage
      course={preview}
      outline={coursePropsToTopics(published, language, language, titles)}
      messages={getCourseMessages(language)}
      catalogHref={'/' + language + '/courses'}
      interfaceLanguage={interfaceLocale.language}
    />
  );
}
export default function CourseDetailRoute(props: Props) {
  return (
    <Suspense fallback={<div role="status">Loading course…</div>}>
      <Content {...props} />
    </Suspense>
  );
}
