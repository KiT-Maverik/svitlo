import { flashcard_Props_Schema, type Flashcard_Props } from '../../configurators/flashcards/defineFlashcard/defineFlashcard.schemas';
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
import { resolveEntityPath } from '../../utils/entityPath/resolveEntityPath.utils';
import {
  assessmentResourceManifest_Schema,
  assessmentResourcePath,
  validateAssessmentReferences,
  type AssessmentResourceEntry,
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
    return flashcard_Props_Schema.parse(value) as Flashcard_Props;
  }
  if (typeof value.type !== 'string' || !Object.hasOwn(questionSchemas, value.type)) {
    throw new Error('Unknown Question resource type for ' + id);
  }
  if (entry.questionType !== value.type) throw new Error('Question kind mismatch for ' + id);
  return questionSchemas[value.type as keyof typeof questionSchemas].parse(value) as Question_Props;
}

/** Read the smallest selected scope: one metadata index, then one batched resource request. */
export function createAssessmentResourceLoader(read: ReadAssessmentFiles): AssessmentResourceLoader {
  const manifests = new Map<string, AssessmentResourceManifest>();
  const items = new Map<string, Question_Props | Flashcard_Props>();

  async function readFiles(paths: readonly string[], signal?: AbortSignal): Promise<ReadonlyMap<string, unknown>> {
    if (signal?.aborted) throw new Error('Assessment resource load aborted');
    const result = await read(paths, signal);
    if (signal?.aborted) throw new Error('Assessment resource load aborted');
    if (!(result instanceof Map)) throw new Error('Assessment reader must return a Map');
    for (const path of paths) if (!result.has(path)) throw new Error('Missing assessment published file: ' + path);
    return result;
  }

  async function getManifest(lessonId: string, signal?: AbortSignal): Promise<AssessmentResourceManifest> {
    const canonicalId = resolveEntityPath(lessonId).split('/')[1];
    const cached = manifests.get(canonicalId);
    if (cached) return cached;
    const path = 'data/lessons/' + resolveEntityPath(canonicalId) + '/assessment-manifest.json';
    const raw = (await readFiles([path], signal)).get(path);
    const manifest = assessmentResourceManifest_Schema.parse(raw);
    if (manifest.lessonId !== canonicalId) throw new Error('Assessment manifest Lesson mismatch: ' + canonicalId);
    manifests.set(canonicalId, manifest);
    return manifest;
  }

  async function load(
    lessonId: string,
    language: Parameters<AssessmentResourceLoader['loadQuestions']>[0]['language'],
    ids: readonly string[],
    kind: AssessmentResourceKind,
    signal?: AbortSignal,
  ): Promise<readonly (Question_Props | Flashcard_Props)[]> {
    const manifest = await getManifest(lessonId, signal);
    const entries = validateAssessmentReferences(manifest, { lessonId, kind, ids, language });
    const paths = new Set<string>();
    for (const [index, id] of ids.entries()) {
      const cacheKey = kind + ':' + lessonId + ':' + id + ':' + language;
      if (items.has(cacheKey)) continue;
      paths.add(assessmentResourcePath(lessonId, kind, id));
      if (entries[index].localeFiles?.includes(language)) paths.add(assessmentResourcePath(lessonId, kind, id, language));
    }
    const resources = paths.size ? await readFiles([...paths], signal) : new Map<string, unknown>();
    if (signal?.aborted) throw new Error('Assessment resource load aborted');
    const response = ids.map((id, index) => {
      const cacheKey = kind + ':' + lessonId + ':' + id + ':' + language;
      const existing = items.get(cacheKey);
      if (existing) return structuredClone(existing);
      const base = resources.get(assessmentResourcePath(lessonId, kind, id));
      const patch = entries[index].localeFiles?.includes(language)
        ? resources.get(assessmentResourcePath(lessonId, kind, id, language))
        : undefined;
      const resolved = parseResolved(kind, id, entries[index], merge(base, patch));
      items.set(cacheKey, resolved);
      return structuredClone(resolved);
    });
    return response;
  }

  return {
    loadQuestions: async ({ lessonId, language, ids, signal }) =>
      (await load(lessonId, language, ids, 'question', signal)) as Question_Props[],
    loadFlashcards: async ({ lessonId, language, ids, signal }) =>
      (await load(lessonId, language, ids, 'flashcard', signal)) as Flashcard_Props[],
  };
}
