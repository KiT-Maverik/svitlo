import { notFound } from 'next/navigation';
import { Suspense } from 'react';

import { DEFAULT_SUPPORTED_LANGUAGES } from '@svitlo/engine/runtime';
import { CoursePage } from '@svitlo/ui-kit';

import { getCourseMessages } from '@/lib/courseMessages';
import { courseTocToTopics } from '@/lib/courseNavigation';
import { toCoursePreview } from '@/lib/coursePreview';
import { loadCourseToc, loadCourseTree } from '@/lib/courseResources';

type Props = { params: Promise<{ language: string; courseId: string }> };

async function Content({ params }: Props) {
  const { language, courseId } = await params;
  const interfaceLocale = DEFAULT_SUPPORTED_LANGUAGES.find(item => item.language === language);
  if (!interfaceLocale) notFound();
  const [published, toc] = await Promise.all([
    loadCourseTree(courseId, interfaceLocale.language),
    loadCourseToc(courseId, interfaceLocale.language),
  ]);
  const preview = toCoursePreview(published);
  return (
    <CoursePage
      course={preview}
      outline={courseTocToTopics(toc, language, language)}
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
