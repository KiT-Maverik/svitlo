import {
  flashcard_Props_Schema,
  type Flashcard_Props,
} from '../../configurators/flashcards/defineFlashcard/defineFlashcard.schemas';
import { selectOneAnswer_Props_Schema } from '../../configurators/questions/defineSelectOneAnswer/defineSelectOneAnswer.schemas';
import { selectMultipleAnswers_Props_Schema } from '../../configurators/questions/defineSelectMultipleAnswers/defineSelectMultipleAnswers.schemas';
import { matchBlocks_Props_Schema } from '../../configurators/questions/defineMatchBlocks/defineMatchBlocks.schemas';
import { answerWithText_Props_Schema } from '../../configurators/questions/defineAnswerWithText/defineAnswerWithText.schemas';
import { answerWithNumber_Props_Schema } from '../../configurators/questions/defineAnswerWithNumber/defineAnswerWithNumber.schemas';
import { orderSequence_Props_Schema } from '../../configurators/questions/defineOrderSequence/defineOrderSequence.schemas';
import { buildAnswerWithBlocks_Props_Schema } from '../../configurators/questions/defineBuildAnswerWithBlocks/defineBuildAnswerWithBlocks.schemas';
import { fillBlanksWithBlocks_Props_Schema } from '../../configurators/questions/defineFillBlanksWithBlocks/defineFillBlanksWithBlocks.schemas';
import { fillBlanksWithText_Props_Schema } from '../../configurators/questions/defineFillBlanksWithText/defineFillBlanksWithText.schemas';
import type { Question_Props } from '../../configurators/questions/question.types';
import {
  assessmentResourceManifest_Schema,
  assessmentManifestPath,
  assessmentResourcePath,
  validateAssessmentReferences,
  selectAccessibleFlashcardIds,
  type AssessmentResourceEntry,
  type AssessmentLanguageFallback,
  type AssessmentResourceKind,
  type AssessmentResourceLoader,
  type AssessmentResourceManifest,
} from './assessmentResources';

/**
 * Hosts supply this batch reader from packaged/offline/browser assets.
 * No global fetch, Node filesystem, URL origin or app-specific imports.
 * Missing paths MUST be omitted; null is a legitimate JSON value and fails schema validation.
 */
export type ReadAssessmentFiles = (
  paths: readonly string[],
  signal?: AbortSignal,
) => Promise<ReadonlyMap<string, unknown>>;

const questionSchemas = {
  selectOneAnswer: selectOneAnswer_Props_Schema,
  selectMultipleAnswers: selectMultipleAnswers_Props_Schema,
  matchBlocks: matchBlocks_Props_Schema,
  answerWithText: answerWithText_Props_Schema,
  answerWithNumber: answerWithNumber_Props_Schema,
  orderSequence: orderSequence_Props_Schema,
  buildAnswerWithBlocks: buildAnswerWithBlocks_Props_Schema,
  fillBlanksWithBlocks: fillBlanksWithBlocks_Props_Schema,
  fillBlanksWithText: fillBlanksWithText_Props_Schema,
} as const;

function merge(base: unknown, patch: unknown): unknown {
  if (patch === undefined) return base;
  if (!isRecord(base) || !isRecord(patch)) return patch;
  const result: Record<string, unknown> = { ...base };
  for (const [key, value] of Object.entries(patch)) {
    if (key === '__proto__' || key === 'prototype' || key === 'constructor')
      throw new Error('Unsafe assessment resource key: ' + key);
    result[key] = merge(base[key], value);
  }
  return result;
}

function isRecord(input: unknown): input is Record<string, unknown> {
  return input !== null && typeof input === 'object' && !Array.isArray(input);
}

function parseResolved(kind: AssessmentResourceKind, id: string, entry: AssessmentResourceEntry, value: unknown) {
  if (!isRecord(value) || value.id !== id) throw new Error('Assessment resource UUID mismatch: ' + id);
  if (kind === 'flashcard') {
    const card = flashcard_Props_Schema.parse(value) as Flashcard_Props;
    const indexed = entry.disabilities;
    const authored = card.parameters.disabilities;
    if (!indexed || indexed.length !== authored.length || indexed.some(value => !authored.includes(value))) {
      throw new Error('Flashcard disability metadata mismatch for ' + id);
    }
    return card;
  }
  if (typeof value.type !== 'string' || !Object.hasOwn(questionSchemas, value.type)) {
    throw new Error('Unknown Question resource type for ' + id);
  }
  if (entry.questionType !== value.type) throw new Error('Question kind mismatch for ' + id);
  return questionSchemas[value.type as keyof typeof questionSchemas].parse(value) as Question_Props;
}

/**
 * Pick an actually published language. Sparse invariant-only records may omit
 * every locale file; a missing requested translation otherwise falls back to
 * genuine English, not to an unrelated language or fabricated text.
 */
function resolveLanguage(
  entry: AssessmentResourceEntry,
  id: string,
  requested: Parameters<AssessmentResourceLoader['loadQuestions']>[0]['language'],
) {
  if (entry.localeFiles.includes(requested)) return { language: requested, fallback: false };
  if (!entry.localeFiles.length && entry.languages.includes(requested)) {
    return { language: undefined, fallback: false };
  }
  if (entry.localeFiles.includes('en') || (!entry.localeFiles.length && entry.languages.includes('en'))) {
    return { language: entry.localeFiles.includes('en') ? ('en' as const) : undefined, fallback: requested !== 'en' };
  }
  throw new Error('Missing assessment locale ' + requested + ' and English fallback for UUID ' + id);
}

/** Read only selected UUID resources. Cache by ID, kind and effective language. */
export function createAssessmentResourceLoader(read: ReadAssessmentFiles): AssessmentResourceLoader {
  let manifest: AssessmentResourceManifest | undefined;
  const items = new Map<string, Question_Props | Flashcard_Props>();

  async function readFiles(paths: readonly string[], signal?: AbortSignal): Promise<ReadonlyMap<string, unknown>> {
    if (signal?.aborted) throw new Error('Assessment resource load aborted');
    const result = await read(paths, signal);
    if (signal?.aborted) throw new Error('Assessment resource load aborted');
    if (!(result instanceof Map)) throw new Error('Assessment reader must return a Map');
    for (const path of paths) if (!result.has(path)) throw new Error('Missing assessment published file: ' + path);
    return result;
  }

  async function getManifest(signal?: AbortSignal): Promise<AssessmentResourceManifest> {
    if (manifest) return manifest;
    const raw = (await readFiles([assessmentManifestPath], signal)).get(assessmentManifestPath);
    const parsed = assessmentResourceManifest_Schema.parse(raw);
    manifest = parsed;
    return parsed;
  }

  async function load(
    language: Parameters<AssessmentResourceLoader['loadQuestions']>[0]['language'],
    ids: readonly string[],
    kind: AssessmentResourceKind,
    signal?: AbortSignal,
    accessNeeds: Parameters<AssessmentResourceLoader['loadFlashcards']>[0]['accessNeeds'] = [],
  ) {
    const index = await getManifest(signal);
    const entries = validateAssessmentReferences(index, { kind, ids });
    const selectedIds = kind === 'flashcard' ? selectAccessibleFlashcardIds(entries, ids, accessNeeds ?? []) : [...ids];
    const selectedEntries = selectedIds.map(id => entries[ids.indexOf(id)]);
    const languages = selectedIds.map((id, n) => resolveLanguage(selectedEntries[n], id, language));
    const paths = new Set<string>();
    for (const [i, id] of selectedIds.entries()) {
      const effective = languages[i].language;
      const cacheKey = kind + ':' + id + ':' + (effective ?? 'base');
      if (items.has(cacheKey)) continue;
      paths.add(assessmentResourcePath(kind, id));
      if (effective) paths.add(assessmentResourcePath(kind, id, effective));
    }
    const resources = paths.size ? await readFiles([...paths], signal) : new Map<string, unknown>();
    if (signal?.aborted) throw new Error('Assessment resource load aborted');
    const fallbacks: AssessmentLanguageFallback[] = [];
    const resolved = selectedIds.map((id, i) => {
      const effective = languages[i].language;
      if (languages[i].fallback) fallbacks.push({ id, requestedLanguage: language, resolvedLanguage: 'en' });
      const cacheKey = kind + ':' + id + ':' + (effective ?? 'base');
      const cached = items.get(cacheKey);
      if (cached) return structuredClone(cached);
      const base = resources.get(assessmentResourcePath(kind, id));
      const patch = effective ? resources.get(assessmentResourcePath(kind, id, effective)) : undefined;
      const value = parseResolved(kind, id, selectedEntries[i], merge(base, patch));
      items.set(cacheKey, value);
      return structuredClone(value);
    });
    return { items: resolved, fallbacks };
  }

  return {
    loadQuestions: async ({ language, ids, signal }) =>
      (await load(language, ids, 'question', signal)) as Awaited<ReturnType<AssessmentResourceLoader['loadQuestions']>>,
    loadFlashcards: async ({ language, ids, signal, accessNeeds }) =>
      (await load(language, ids, 'flashcard', signal, accessNeeds)) as Awaited<
        ReturnType<AssessmentResourceLoader['loadFlashcards']>
      >,
  };
}
