import type {
  Chapter,
  Course_LessonOverride,
  Course_PublicationItems,
  Episode,
  Lesson,
  Locale_Languages,
  Module,
} from '@svitlo/contracts/content';

/** A Lesson Data object is not discriminated by type: unlike Chapter/Episode it has slug + parameters. */
export function isCourseLesson(value: unknown): value is Lesson<'data', any> {
  return value !== null && typeof value === 'object' &&
    'id' in value && 'slug' in value && 'parameters' in value &&
    !('type' in value);
}

export function isCourseCreator(value: unknown): value is {
  getData(): unknown;
  toToc(context: unknown): unknown;
  toResource(context: unknown): unknown;
  getPublicationItems(): unknown;
} {
  return value !== null && typeof value === 'object' &&
    'getData' in value && typeof value.getData === 'function' &&
    'toToc' in value && typeof value.toToc === 'function' &&
    'getPublicationItems' in value && typeof value.getPublicationItems === 'function';
}

/**
 * The single Course authoring traversal. All entity creators expose it through
 * getPublicationItems(); publishers do not need to know how content is nested.
 *
 * It deliberately retains full Lesson objects only until resource generation.
 */
export function collectCoursePublicationItems<L extends Locale_Languages>(
  content: readonly unknown[],
): Course_PublicationItems<L> {
  const lessons: Lesson<'data', L>[] = [];
  const episodes: Episode<'data', L>[] = [];
  const groups: (Module<'data', L> | Chapter<'data', L>)[] = [];
  const overrides: Course_LessonOverride<L>[] = [];

  function visit(source: unknown): void {
    const item = isCourseCreator(source) ? source.getData() : source;
    if (isCourseLesson(item)) {
      lessons.push(item as Lesson<'data', L>);
      return;
    }
    if (item === null || typeof item !== 'object' || !('type' in item)) {
      throw new Error('Invalid authored Course content entry');
    }
    const entry = item as { type: string; id?: string; content?: readonly unknown[] };
    if (entry.type === 'lessonOverride') {
      const override = item as Course_LessonOverride<L>;
      overrides.push(override);
      lessons.push(override.lesson);
      return;
    }
    if (entry.type === 'episode') {
      episodes.push(item as Episode<'data', L>);
      return;
    }
    if (entry.type === 'module' || entry.type === 'chapter') {
      if (!Array.isArray(entry.content)) throw new Error('Invalid Course group content');
      groups.push(item as Module<'data', L> | Chapter<'data', L>);
      for (const child of entry.content) visit(child);
      return;
    }
    throw new Error('Unsupported Course entry: ' + entry.type);
  }
  for (const entry of content) visit(entry);
  return { lessons, episodes, groups, overrides };
}
