import type { Lesson_Override } from './override.types';
import type { Locale_Languages } from '../locale.types';
import type { Section } from '../section.types';

/**
 * The registry/definition owner, not the author of the most recent data patch.
 * 'course' means the containing Course; its ID is supplied by the Course tree.
 * These references are build-time metadata, not fields on canonical Sections.
 */
export type Course_ContentSource =
  | { type: 'lesson'; lessonId: string }
  | { type: 'course' };

export type Course_BlockPlacement = {
  slug: string;
  source: Course_ContentSource;
};

/** Section data together with sources used to resolve Scene registries. */
export type Course_SectionPlacement<Languages extends Locale_Languages> = {
  section: Section<'data', Languages>;
  source: Course_ContentSource;
  blocks: readonly Course_BlockPlacement[];
};

/**
 * Build-time Course entry. The Lesson remains canonical; only explicit
 * per-course changes and the effective ordered section composition are stored.
 * A Course publisher will materialize/localize this entry separately.
 */
export type Course_LessonOverride<
  Languages extends Locale_Languages,
  CustomEvents extends string = never,
> = {
  type: 'lessonOverride';
  lessonId: string;
  overrides: Omit<Lesson_Override<Languages, CustomEvents>, 'sections'> & {
    sections?: readonly Course_SectionPlacement<Languages>[];
  };
};
