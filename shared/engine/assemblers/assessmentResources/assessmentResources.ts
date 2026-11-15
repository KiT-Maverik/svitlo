import { z } from 'zod';

import { questionTypes, type Question_Type } from '../../configurators/questions/question.constants';
import type { Question_Props } from '../../configurators/questions/question.types';
import type { Flashcard_Props } from '../../configurators/flashcards/defineFlashcard/defineFlashcard.schemas';
import { languageCode_Schema, type LanguageCode } from '../../schemas/languages.schemas';
import { resolveEntityPath } from '../../utils/entityPath/resolveEntityPath.utils';

/**
 * Data-only index for independent Question/Flashcard resources. The index is
 * build-time metadata and MUST NOT contain complete Question/Flashcard Props.
 */
export const assessmentResourceEntry_Schema = z.strictObject({
  lessonId: z.uuid(),
  kind: z.enum(['question', 'flashcard']),
  questionType: z.enum(questionTypes).optional(),
  languages: z.array(languageCode_Schema).nonempty(),
  contentHash: z.string().regex(/^[0-9a-f]{64}$/, 'Expected a SHA-256 content hash'),
});
export type AssessmentResourceEntry = z.infer<typeof assessmentResourceEntry_Schema>;

export const assessmentResourceManifest_Schema = z.strictObject({
  lessonId: z.uuid(),
  entries: z.record(z.uuid(), assessmentResourceEntry_Schema),
});
export type AssessmentResourceManifest = z.infer<typeof assessmentResourceManifest_Schema>;
export type AssessmentResourceKind = AssessmentResourceEntry['kind'];

export type AssessmentSelection = {
  lessonId: string;
  sectionId: string;
  kind: AssessmentResourceKind;
  ids: readonly string[];
  language: LanguageCode;
};

/** A portable, host-injected loader: no Next.js paths, filesystem, or global fetch. */
export interface AssessmentResourceLoader {
  loadQuestions(input: {
    lessonId: string;
    language: LanguageCode;
    ids: readonly string[];
    signal?: AbortSignal;
  }): Promise<readonly Question_Props[]>;
  loadFlashcards(input: {
    lessonId: string;
    language: LanguageCode;
    ids: readonly string[];
    signal?: AbortSignal;
  }): Promise<readonly Flashcard_Props[]>;
}

/** The URL is a relative static publication path, not an application origin. */
export function assessmentResourcePath(
  lessonId: string,
  kind: AssessmentResourceKind,
  id: string,
  language?: LanguageCode,
): string {
  const ownerPath = resolveEntityPath(lessonId);
  const normalizedId = z.uuid().parse(id).toLowerCase();
  if (kind !== 'question' && kind !== 'flashcard') throw new Error('Unknown assessment resource kind');
  if (language !== undefined) languageCode_Schema.parse(language);
  const collection = kind === 'question' ? 'questions' : 'flashcards';
  return 'data/lessons/' + ownerPath + '/' + collection + '/' + normalizedId + '/' + (language ?? 'base') + '.json';
}

/**
 * Check every explicitly selected UUID against a published metadata index.
 * An unfinished draft may contain unresolved references; a complete publisher
 * calls this before emitting any selected resources or Lesson publication.
 */
export function validateAssessmentReferences(
  rawManifest: AssessmentResourceManifest,
  selection: AssessmentSelection,
): AssessmentResourceEntry[] {
  const manifest = assessmentResourceManifest_Schema.parse(rawManifest);
  const lessonId = z.uuid().parse(selection.lessonId);
  const sectionId = z.uuid().parse(selection.sectionId);
  const language = languageCode_Schema.parse(selection.language);
  if (manifest.lessonId !== lessonId) {
    throw new Error('Assessment manifest belongs to a different Lesson: ' + lessonId);
  }
  if (selection.kind !== 'question' && selection.kind !== 'flashcard') {
    throw new Error('Unknown assessment resource kind in Section ' + sectionId);
  }
  if (!selection.ids.length) throw new Error('Empty assessment selection in Section ' + sectionId);
  const seen = new Set<string>();
  return selection.ids.map(rawId => {
    const id = z.uuid().parse(rawId);
    if (seen.has(id)) throw new Error('Duplicate assessment UUID ' + id + ' in Section ' + sectionId);
    seen.add(id);
    const entry = manifest.entries[id];
    if (!entry) throw new Error('Missing assessment UUID ' + id + ' in Section ' + sectionId);
    if (entry.lessonId !== lessonId) {
      throw new Error('Assessment UUID ' + id + ' belongs to a different Lesson');
    }
    if (entry.kind !== selection.kind) {
      throw new Error('Assessment UUID ' + id + ' has the wrong resource type in Section ' + sectionId);
    }
    if (entry.kind === 'question' && !entry.questionType) {
      throw new Error('Question UUID ' + id + ' is missing its Question type');
    }
    if (entry.kind === 'flashcard' && entry.questionType !== undefined) {
      throw new Error('Flashcard UUID ' + id + ' cannot declare a Question type');
    }
    if (entry.languages.length !== new Set(entry.languages).size) {
      throw new Error('Duplicate language for assessment UUID ' + id);
    }
    if (!entry.languages.includes(language)) {
      throw new Error('Assessment UUID ' + id + ' is unavailable in ' + language);
    }
    return entry;
  });
}

export type QuizQuestionSelection = {
  mode: 'all' | 'sample';
  questionIds: readonly string[];
  count?: number;
  shuffle?: boolean;
  seed?: number;
};

/** Preserve the established stable hash/shuffle semantics on an explicit UUID candidate set. */
function stableHash(value: string): number {
  let hash = 2166136261;
  for (const char of value) hash = Math.imul(hash ^ char.charCodeAt(0), 16777619);
  return hash >>> 0;
}

export function selectQuizQuestionIds(selection: QuizQuestionSelection, sectionId: string): string[] {
  z.uuid().parse(sectionId);
  if (!Array.isArray(selection.questionIds) || !selection.questionIds.length) {
    throw new Error('Quiz requires explicit questionIds in Section ' + sectionId);
  }
  const seen = new Set<string>();
  for (const id of selection.questionIds) {
    z.uuid().parse(id);
    if (seen.has(id)) throw new Error('Duplicate Quiz Question UUID: ' + id);
    seen.add(id);
  }
  const ordered = selection.shuffle
    ? [...selection.questionIds].sort((a, b) => {
        const seed = sectionId + ':' + String(selection.seed ?? 0);
        return stableHash(seed + a) - stableHash(seed + b) || a.localeCompare(b);
      })
    : [...selection.questionIds];
  if (selection.mode === 'sample') {
    if (!Number.isInteger(selection.count) || selection.count! <= 0 || selection.count! > ordered.length) {
      throw new Error('Invalid Quiz sample count: ' + sectionId);
    }
    return ordered.slice(0, selection.count);
  }
  if (selection.mode !== 'all') throw new Error('Unknown Quiz selection mode');
  if (selection.count !== undefined) throw new Error('Quiz count only applies to sample mode');
  return ordered;
}

export type { Question_Type };
