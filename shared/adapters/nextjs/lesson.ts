import { cache, createElement, Suspense, type ReactElement } from 'react';
import path from 'node:path';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { resolveEntityPath, languageCode_Schema, type Lesson_Props } from '@svitlo/engine/runtime';
import { DEFAULT_SUPPORTED_LANGUAGES, type LanguageCode, type Locale } from '@svitlo/contracts/localization';
import type { UiKitMessages } from '@svitlo/ui-kit';
import { loadPublishedLessonProps } from './publishedLessonProps';
import { loadPublishedUiKitMessages } from './publishedUiKitMessages';

/** Only the framework-specific route shape is Next.js-owned. */
export type LessonPageInput = {
  params: Promise<{ language: string; lessonLanguage?: string; lessonId: string }>;
};

/** The host supplies its published Props loader and scene-bound Lesson renderer. */
export type LessonPageBindings = {
  loadLesson: (id: string, language: LanguageCode) => Promise<Lesson_Props>;
  loadMessages: (locale: Locale) => Promise<UiKitMessages>;
  renderLesson: (props: {
    response: Lesson_Props;
    locale: Locale;
    lessonLocale: Locale;
    href: string;
    messages: UiKitMessages;
  }) => ReactElement;
};

/**
 * The only Next.js-specific lesson orchestration. No app-specific imports:
 * standalone textbooks inject their data loader and client-renderer boundary.
 */
export function createLessonPage(bindings: LessonPageBindings) {
  const load = cache(async ({ params }: LessonPageInput) => {
    const { language: code, lessonLanguage: requestedLessonLanguage, lessonId } = await params;
    const descriptor = DEFAULT_SUPPORTED_LANGUAGES.find(entry => entry.language === code);
    const lessonDescriptor = DEFAULT_SUPPORTED_LANGUAGES.find(
      entry => entry.language === (requestedLessonLanguage ?? code),
    );
    if (!descriptor || !lessonDescriptor) notFound();

    let id: string;
    try {
      id = resolveEntityPath(lessonId).split('/')[1];
    } catch {
      notFound();
    }

    const [response, messages] = await Promise.all([
      bindings.loadLesson(id, lessonDescriptor.language),
      bindings.loadMessages(descriptor.locale),
    ]);
    return {
      response,
      messages,
      locale: descriptor.locale,
      lessonLocale: lessonDescriptor.locale,
      code: descriptor.language,
      lessonCode: lessonDescriptor.language,
    };
  });

  async function generateMetadata(props: LessonPageInput): Promise<Metadata> {
    const { response } = await load(props);
    const title = response.locale.title;
    return { title, description: title };
  }

  async function LocalizedLesson(props: LessonPageInput): Promise<ReactElement> {
    const { response, messages, locale, lessonLocale, code, lessonCode } = await load(props);
    return bindings.renderLesson({
      response,
      messages,
      locale,
      lessonLocale,
      href: `/${code}/lesson/${lessonCode}/${response.id}`,
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

/**
 * Engine-first published Lesson route. It loads the new `data/lessons` Props
 * resources rather than the retired three-collection LessonResponse format.
 *
 * Hosts provide a renderer accepting `Lesson_Props`; no lossy cast to the
 * legacy UI Kit LessonView is performed.
 */
export function createPublishedLessonPropsPage(
  bindings: Pick<LessonPageBindings, 'renderLesson'> &
    Partial<Pick<LessonPageBindings, 'loadLesson' | 'loadMessages'>>,
) {
  return createLessonPage({
    loadLesson:
      bindings.loadLesson ??
      ((id, language) =>
        loadPublishedLessonProps({
          rootDirectory: path.join(process.cwd(), 'public', 'data', 'lessons'),
          id,
          language: languageCode_Schema.parse(language),
        })),
    loadMessages: bindings.loadMessages ?? loadPublishedUiKitMessages,
    renderLesson: bindings.renderLesson,
  });
}

export { loadPublishedUiKitMessages } from './publishedUiKitMessages';
