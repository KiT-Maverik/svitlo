import { notFound } from 'next/navigation';
import { DEFAULT_SUPPORTED_LANGUAGES } from '@svitlo/engine/localization';
import { CoursesPage } from '@svitlo/ui-kit/course';
import { getMockCourseMessages, getMockCourses } from '@/lib/mockCourses';

type Props = { params: Promise<{ language: string }> };

export default async function CourseCatalogRoute({ params }: Props) {
  const { language } = await params;
  if (!DEFAULT_SUPPORTED_LANGUAGES.some(item => item.language === language)) notFound();

  const courses = getMockCourses(language).map(({ preview }) => ({
    course: preview,
    href: `/${language}/course/${preview.id}`,
  }));

  return <CoursesPage courses={courses} messages={getMockCourseMessages(language)} />;
}
