import { Suspense } from 'react';
import { notFound } from 'next/navigation';
import { DEFAULT_SUPPORTED_LANGUAGES } from '@svitlo/contracts/localization';
import { CoursesPage } from '@svitlo/ui-kit/course';
import { getMockCourseMessages, getMockCourses } from '@/lib/mockCourses';

type Props = { params: Promise<{ language: string }> };

async function Content({ params }: Props) {
  const { language } = await params;
  const interfaceLocale = DEFAULT_SUPPORTED_LANGUAGES.find(item => item.language === language);
  if (!interfaceLocale) notFound();

  const courses = getMockCourses(language).map(({ preview }) => ({
    course: preview,
    href: `/${language}/course/${preview.id}`,
  }));

  return (
    <CoursesPage
      courses={courses}
      messages={getMockCourseMessages(language)}
      interfaceLanguage={interfaceLocale.language}
    />
  );
}
export default function CourseCatalogRoute(props: Props) {
  return (
    <Suspense fallback={<div role="status">Loading courses…</div>}>
      <Content {...props} />
    </Suspense>
  );
}
