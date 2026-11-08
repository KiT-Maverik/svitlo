import { Suspense } from 'react';
import { notFound, redirect } from 'next/navigation';
import { resolveEntityPath } from '@svitlo/engine';
import { DEFAULT_SUPPORTED_LANGUAGES } from '@svitlo/contracts/localization';

/** Redirect existing links to the canonical two-language lesson URL. */
async function LegacyRedirect({
  params,
  searchParams,
}: {
  params: Promise<{ language: string; lessonLanguage: string }>;
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const { language, lessonLanguage: lessonId } = await params;
  if (!DEFAULT_SUPPORTED_LANGUAGES.some(entry => entry.language === language)) notFound();
  try {
    resolveEntityPath(lessonId);
  } catch {
    notFound();
  }

  const query = new URLSearchParams();
  for (const [name, value] of Object.entries(await searchParams)) {
    if (Array.isArray(value)) value.forEach(item => query.append(name, item));
    else if (value !== undefined) query.append(name, value);
  }
  const suffix = query.toString();
  return redirect(`/${language}/lesson/${language}/${lessonId}${suffix ? '?' + suffix : ''}`);
}

/** Next.js Cache Components require async URL inspection beneath Suspense. */
export default function LegacyLessonPage(props: {
  params: Promise<{ language: string; lessonLanguage: string }>;
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  return (
    <Suspense fallback={null}>
      <LegacyRedirect {...props} />
    </Suspense>
  );
}
