import { cache, createElement, Suspense, type ReactElement } from 'react';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { resolveEntityPath } from '@svitlo/engine';
import { DEFAULT_SUPPORTED_LANGUAGES, type LanguageCode, type Locale } from '@svitlo/engine/localization';
import type { UiKit_Global } from '@svitlo/ui-kit';

/** Only the framework-specific route shape is Next.js-owned. */
export type LessonPageInput = {
  params: Promise<{ language: string; lessonId: string }>;
};

/** The textbook supplies its published JSON loader and scene-bound Lesson renderer. */
export type LessonPageBindings<Response extends { id: string; title: string }> = {
  loadLesson: (id: string, language: LanguageCode) => Promise<Response>;
  loadMessages: (locale: Locale) => Promise<UiKit_Global<'response'>>;
  renderLesson: (props: {
    response: Response;
    locale: Locale;
    href: string;
    messages: UiKit_Global<'response'>;
  }) => ReactElement;
};

/**
 * The only Next.js-specific lesson orchestration. No app-specific imports:
 * standalone textbooks inject their data loader and client-renderer boundary.
 */
export function createLessonPage<Response extends { id: string; title: string }>(
  bindings: LessonPageBindings<Response>,
) {
  const load = cache(async ({ params }: LessonPageInput) => {
    const { language: code, lessonId } = await params;
    const descriptor = DEFAULT_SUPPORTED_LANGUAGES.find(entry => entry.language === code);
    if (!descriptor) notFound();

    let id: string;
    try {
      id = resolveEntityPath(lessonId).split('/')[1];
    } catch {
      notFound();
    }

    const [response, messages] = await Promise.all([
      bindings.loadLesson(id, descriptor.language),
      bindings.loadMessages(descriptor.locale),
    ]);
    return { response, messages, locale: descriptor.locale, code: descriptor.language };
  });

  async function generateMetadata(props: LessonPageInput): Promise<Metadata> {
    const { response } = await load(props);
    return { title: response.title, description: response.title };
  }

  async function LocalizedLesson(props: LessonPageInput): Promise<ReactElement> {
    const { response, messages, locale, code } = await load(props);
    return bindings.renderLesson({
      response,
      messages,
      locale,
      href: `/${code}/lesson/${response.id}`,
    });
  }

  /** Stream dynamic lesson resources inside Suspense for Next.js Cache Components. */
  function Page(props: LessonPageInput): ReactElement {
    return createElement(
      Suspense,
      { fallback: createElement('div', { role: 'status', 'aria-busy': true, style: { minHeight: 120 } }) },
      createElement(LocalizedLesson, props),
    );
  }

  return { Page, generateMetadata };
}
