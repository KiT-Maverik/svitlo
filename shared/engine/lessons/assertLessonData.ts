import type { Lesson, Locale_Languages } from '+@svitlo/contracts/content';
import type { LanguageCode } from '+@svitlo/contracts/localization';
import { resolveEntityPath } from '../utils/entityPath/resolveEntityPath.utils';
import { assertFlashcardLinks } from './assertFlashcardLinks';
import { assertFlashcardFlags } from './assertFlashcardFlags';

/** Runtime validation complements (rather than replaces) authoring TypeScript checks. */
type LessonData = {
  id: string;
  slug: string;
  parameters: { languages: readonly LanguageCode[] };
  flashcards: unknown[];
  questions: Record<string, Record<string, unknown>>;
  skills: string[];
  sections: unknown[];
  [key: string]: unknown;
};

const isRecord = (value: unknown): value is Record<string, unknown> =>
  value !== null && typeof value === 'object' && !Array.isArray(value);

export function assertLessonData(value: unknown): asserts value is Lesson<'data', Locale_Languages> {
  if (
    !isRecord(value) ||
    typeof value.id !== 'string' ||
    typeof value.slug !== 'string' ||
    !/^[a-z][A-Za-z0-9]*$/.test(value.slug)
  ) {
    throw new Error('Lesson must declare a canonical UUID id and camelCase slug');
  }
  const relativePath = resolveEntityPath(value.id);
  const parameters = value.parameters;
  if (
    !isRecord(parameters) ||
    !Array.isArray(parameters.languages) ||
    parameters.languages.length === 0 ||
    !parameters.languages.every(code => typeof code === 'string')
  ) {
    throw new Error(`Lesson ${relativePath} has no valid parameters.languages`);
  }
  if (
    !Array.isArray(value.flashcards) ||
    !isRecord(value.questions) ||
    !Array.isArray(value.sections) ||
    !Array.isArray(value.skills)
  ) {
    throw new Error(`Lesson ${relativePath} is missing flashcards, questions, or sections`);
  }
  assertFlashcardLinks(value.flashcards as readonly unknown[]);
  assertFlashcardFlags(value.flashcards as readonly unknown[]);
  if (
    new Set(value.skills).size !== value.skills.length ||
    value.skills.some(id => typeof id !== 'string' || !/^[0-9a-f-]{36}$/i.test(id))
  ) {
    throw new Error('Invalid Lesson Skill IDs');
  }
  // Validate authored event scenes before sparse publication. Custom event reactions cannot be false.
  if (value.events !== undefined) {
    if (!isRecord(value.events)) throw new Error('Lesson events must be a keyed object');
    const standard = new Set(['lessonStarted', 'lessonCompleted', 'quizCompleted', 'quizFailed']);
    for (const [eventId, reaction] of Object.entries(value.events)) {
      if (!/^[a-z][A-Za-z0-9]*$/.test(eventId)) throw new Error('Invalid lesson event ID: ' + eventId);
      if (reaction === false && standard.has(eventId)) continue;
      if (
        !isRecord(reaction) ||
        reaction.type !== 'scene' ||
        typeof reaction.id !== 'string' ||
        typeof reaction.slug !== 'string' ||
        !isRecord(reaction.locales)
      ) {
        throw new Error('Lesson event reaction must be an authored Scene: ' + eventId);
      }
    }
  }
  const sectionSlugs = new Set<string>();
  for (const [index, entry] of value.sections.entries()) {
    if (
      !isRecord(entry) ||
      typeof entry.slug !== 'string' ||
      (entry.type === 'quiz'
        ? !isRecord(entry.parameters) || entry.content !== undefined
        : !Array.isArray(entry.content))
    ) {
      throw new Error(`Invalid ordered section at ${relativePath}/sections[${index}]`);
    }
    if (sectionSlugs.has(entry.slug)) throw new Error(`Duplicate section slug: ${entry.slug}`);
    sectionSlugs.add(entry.slug);
    if (entry.type === 'quiz') continue;
    const blockKeys = new Set<string>();
    for (const [blockIndex, item] of (entry.content as unknown[]).entries()) {
      if (
        !isRecord(item) ||
        typeof item.id !== 'string' ||
        typeof item.slug !== 'string' ||
        typeof item.type !== 'string'
      ) {
        throw new Error(`Invalid content block at ${relativePath}/sections[${index}]/content[${blockIndex}]`);
      }
      const key = item.type + '/' + item.slug;
      if (blockKeys.has(key)) throw new Error(`Duplicate content block: ${key}`);
      blockKeys.add(key);
    }
  }
}
