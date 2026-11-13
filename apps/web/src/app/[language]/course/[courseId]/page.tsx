import { Suspense } from 'react';
import { notFound } from 'next/navigation';
import { DEFAULT_SUPPORTED_LANGUAGES } from '@svitlo/engine/runtime';
import { CoursePage } from '@svitlo/ui-kit';
import { getMockCourse, getMockCourseMessages, mockCourseOutline } from '@/lib/mockCourses';
import { loadCourseTree, loadCourseLessonTitles } from '@/lib/courseResources';
import { coursePropsToTopics } from '@/lib/courseNavigation';

type Props = { params: Promise<{ language: string; courseId: string }> };

async function Content({ params }: Props) {
  const { language, courseId } = await params;
  const interfaceLocale = DEFAULT_SUPPORTED_LANGUAGES.find(item => item.language === language);
  if (!interfaceLocale) notFound();

  const course = getMockCourse(courseId, language);
  if (!course) notFound();
  const outline = course.published
    ? await (async () => {
        const published = await loadCourseTree(courseId, interfaceLocale.language);
        const titles = await loadCourseLessonTitles(published, interfaceLocale.language);
        return coursePropsToTopics(published, language, language, titles);
      })()
    : mockCourseOutline(course, language);

  return (
    <CoursePage
      course={course.preview}
      outline={outline}
      messages={getMockCourseMessages(language)}
      catalogHref={`/${language}/courses`}
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
