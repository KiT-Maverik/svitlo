import { notFound, redirect } from 'next/navigation';
import { resolveEntityPath } from '@svitlo/engine';
import { DEFAULT_SUPPORTED_LANGUAGES } from '@svitlo/engine/localization';

/** Redirect existing links to the canonical two-language lesson URL. */
export default async function LegacyLessonPage({
  params,
  searchParams,
}: {
  params: Promise<{ language: string; lessonId: string }>;
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const { language, lessonId } = await params;
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
  redirect(`/${language}/lesson/${language}/${lessonId}${suffix ? '?' + suffix : ''}`);
}
