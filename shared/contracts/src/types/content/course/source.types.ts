import type { ContentBlock } from '../blocks';
import type { Lesson_Override, Section_Override } from './override.types';
import type { Locale_Languages } from '../locale.types';
import type { Lesson } from '../lesson.types';
import type { Section } from '../section.types';

/** Authoring/renderer owner, not the source of the last data edit. */
export type Course_ContentSource = { type: 'lesson'; lessonId: string } | { type: 'course' };

export type Course_SectionAddition<Languages extends Locale_Languages> = {
  section: Section<'data', Languages>;
  source: Extract<Course_ContentSource, { type: 'course' }>;
};

export type Course_BlockAddition<Languages extends Locale_Languages> = {
  block: ContentBlock<'data', Languages>;
  source: Extract<Course_ContentSource, { type: 'course' }>;
};

/** Partial kind-specific content patch; identity and block kind never change. */
export type Course_BlockOverride<Languages extends Locale_Languages> =
  ContentBlock<'data', Languages> extends infer Block
    ? Block extends ContentBlock<'data', Languages>
      ? Partial<Omit<Block, 'id' | 'slug' | 'type'>>
      : never
    : never;

export type Course_BlockChanges<Languages extends Locale_Languages> = {
  /** Slugs in final order. Only emitted when the order or membership changes. */
  order?: readonly string[];
  added?: readonly Course_BlockAddition<Languages>[];
  removed?: readonly string[];
  bySlug?: Readonly<Record<string, Course_BlockOverride<Languages>>>;
};

export type Course_SectionChanges<Languages extends Locale_Languages> = {
  order?: readonly string[];
  added?: readonly Course_SectionAddition<Languages>[];
  removed?: readonly string[];
  /** Only changed existing section fields/blocks; new sections are in added. */
  bySlug?: Readonly<
    Record<string, Omit<Section_Override<Languages>, 'content'> & { content?: Course_BlockChanges<Languages> }>
  >;
};

/**
 * Sparse, serializable patch for one use of a canonical Lesson.
 * Generic deep-merge applies to ordinary object fields. Ordered Section and
 * ContentBlock collections require applying their explicit operations, NOT
 * generic index-based array merging. Original Lesson Data remains untouched.
 */
export type Course_LessonOverride<Languages extends Locale_Languages, CustomEvents extends string = never> = {
  type: 'lessonOverride';
  lessonId: string;
  /** Canonical Lesson Data; kept in authoring only, never emitted in override JSON. */
  lesson: Lesson<'data', Languages>;
  overrides: Omit<Lesson_Override<Languages, CustomEvents>, 'sections'> & {
    sections?: Course_SectionChanges<Languages>;
  };
};
