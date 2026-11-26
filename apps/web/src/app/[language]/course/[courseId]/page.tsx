import { notFound } from 'next/navigation';
import { Suspense } from 'react';

import { CoursePage } from '@svitlo/ui-kit';

import { loadCourseDetail } from '@/lib/courseDetail';
import { getCourseLanguageFallbackNotice, getCourseMessages } from '@/lib/courseMessages';

type Props = { params: Promise<{ language: string; courseId: string }> };

async function Content({ params }: Props) {
  const { language, courseId } = await params;
  const detail = await loadCourseDetail(courseId, language);
  if (!detail) notFound();
  return (
    <>
      {detail.contentLanguage !== detail.interfaceLanguage && (
        <aside
          role="status"
          aria-live="polite"
          aria-atomic="true"
          data-testid="course-language-notice"
          style={{
            maxWidth: 1100,
            margin: '16px auto 0',
            padding: '12px 20px',
            border: '1px solid currentColor',
            borderRadius: 8,
          }}
        >
          {getCourseLanguageFallbackNotice(language, detail.interfaceLanguage, detail.contentLanguage)}
        </aside>
      )}
      <CoursePage
        course={detail.course}
        outline={detail.outline}
        messages={getCourseMessages(language)}
        catalogHref={'/' + language + '/courses'}
        interfaceLanguage={detail.interfaceLanguage}
      />
    </>
  );
}
export default function CourseDetailRoute(props: Props) {
  return (
    <Suspense fallback={<div role="status">Loading course…</div>}>
      <Content {...props} />
    </Suspense>
  );
}
