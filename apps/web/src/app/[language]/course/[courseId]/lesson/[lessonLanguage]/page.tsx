import { Suspense } from 'react';
import { notFound, redirect } from 'next/navigation';
import { DEFAULT_SUPPORTED_LANGUAGES } from '+@svitlo/contracts/localization';

type Props = {
  params: Promise<{ language: string; courseId: string; lessonLanguage: string }>;
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};

/** Legacy course URLs retain the interface locale as their default lesson locale. */
async function LegacyRedirect({ params, searchParams }: Props) {
  const { language, courseId, lessonLanguage: lessonId } = await params;
  if (!DEFAULT_SUPPORTED_LANGUAGES.some(item => item.language === language)) notFound();
  const query = new URLSearchParams();
  for (const [name, value] of Object.entries(await searchParams)) {
    if (Array.isArray(value)) value.forEach(item => query.append(name, item));
    else if (value !== undefined) query.append(name, value);
  }
  const suffix = query.toString();
  return redirect(
    '/' + language + '/course/' + courseId + '/lesson/' + language + '/' + lessonId + (suffix ? '?' + suffix : ''),
  );
}

export default function LegacyCourseLessonPage(props: Props) {
  return (
    <Suspense fallback={null}>
      <LegacyRedirect {...props} />
    </Suspense>
  );
}
