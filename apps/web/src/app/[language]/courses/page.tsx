import { notFound } from 'next/navigation';
import { Suspense } from 'react';

import { DEFAULT_SUPPORTED_LANGUAGES } from '@svitlo/engine/runtime';
import { CoursesPage } from '@svitlo/ui-kit';

import { getCourseMessages } from '@/lib/courseMessages';
import { loadPublishedCourseCatalog } from '@/lib/publishedCourseCatalog';

type Props = { params: Promise<{ language: string }> };

async function Content({ params }: Props) {
  const { language } = await params;
  const interfaceLocale = DEFAULT_SUPPORTED_LANGUAGES.find(item => item.language === language);
  if (!interfaceLocale) notFound();
  const courses = (await loadPublishedCourseCatalog(interfaceLocale.language)).map(course => ({
    course,
    href: '/' + language + '/course/' + course.id,
  }));
  return (
    <CoursesPage
      courses={courses}
      messages={getCourseMessages(language)}
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
