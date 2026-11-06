import type { Lesson } from '../lesson.types';
import type { LessonEventOverrides } from '../lesson.events.types';
import type { Lesson_Locale } from '../locale.types';
import type { Section } from '../section.types';

/**
 * Authored, course-local changes to a reusable Lesson.
 *
 * Identity, slug, supported languages, question bank, flashcards and requireQuiz
 * remain owned by the canonical Lesson. Section order/content may be replaced.
 * A future build-time helper will apply this patch without mutating the source.
 */
export type Lesson_Override<
  SupportedLanguages extends Lesson_Locale,
  CustomEvents extends string = never,
> = Partial<Pick<Lesson<'data', SupportedLanguages, CustomEvents>, 'title' | 'sections'>> & {
  /** Only presentation/navigation controls are configurable per course. */
  parameters?: {
    sections?: Partial<Lesson<'data', SupportedLanguages, CustomEvents>['parameters']['sections']>;
  };
  /** Override or disable reactions, including declared custom events. */
  events?: LessonEventOverrides<CustomEvents, SupportedLanguages, 'data'>;
};

/**
 * Authored changes to a single Section.
 *
 * Section id, slug and type stay stable. Replacing content as a complete ordered
 * array permits adding, removing, filtering and reordering individual blocks;
 * there is intentionally no separate ContentBlock override contract.
 */
export type Section_Override<SupportedLanguages extends Lesson_Locale> = Partial<
  Pick<Section<'data', SupportedLanguages>, 'title' | 'navigationLabel' | 'content'>
> & {
  /** false means omit skippable in the resolved Section (which only accepts true). */
  skippable?: boolean;
};
