import { Suspense } from 'react';
import { notFound } from 'next/navigation';
import { DEFAULT_SUPPORTED_LANGUAGES } from '@svitlo/engine/localization';
import { CoursesPage } from '@svitlo/ui-kit/course';
import { getMockCourseMessages, getMockCourses } from '@/lib/mockCourses';

type Props = { params: Promise<{ language: string }> };

async function Content({ params }: Props) {
  const { language } = await params;
  if (!DEFAULT_SUPPORTED_LANGUAGES.some(item => item.language === language)) notFound();

  const courses = getMockCourses(language).map(({ preview }) => ({
    course: preview,
    href: `/${language}/course/${preview.id}`,
  }));

  return <CoursesPage courses={courses} messages={getMockCourseMessages(language)} />;
}
export default function CourseCatalogRoute(props: Props) {
  return (
    <Suspense fallback={<div role="status">Loading courses…</div>}>
      <Content {...props} />
    </Suspense>
  );
}
