import { createHash } from 'node:crypto';

import {
  assessmentResourceManifest_Schema,
  type AssessmentResourceEntry,
  type AssessmentResourceKind,
} from '../../assemblers/assessmentResources/assessmentResources';
import { questionTypes } from '../../configurators/questions/question.constants';
import { languageCode_Schema, type LanguageCode } from '../../schemas/languages.schemas';
import { resolveEntityPath } from '../../utils/entityPath/resolveEntityPath.utils';

type BuiltAssessment = {
  base: { id: string; type: string };
  locale?: Partial<Record<LanguageCode, unknown>>;
};

/** A separate approved bank author supplies already-built, data-only Props. */
export type AssessmentPublicationEntry = {
  source: string;
  lessonId: string;
  kind: AssessmentResourceKind;
  languages: readonly LanguageCode[];
  publication: BuiltAssessment;
};

/** A complete batch is assembled without filesystem or runtime imports. */
export type AssessmentPublicationFiles = Map<string, string>;

const forbiddenKeys = new Set(['__proto__', 'prototype', 'constructor']);
const compare = (left: string, right: string) => (left < right ? -1 : left > right ? 1 : 0);

/** Canonical JSON for reproducible hashes, rejecting information-losing values. */
function canonical(value: unknown, at: string, ancestors = new Set<object>()): string {
  if (value === null || typeof value === 'string' || typeof value === 'boolean') return JSON.stringify(value);
  if (typeof value === 'number' && Number.isFinite(value)) return JSON.stringify(value);
  if (value === null || typeof value !== 'object') throw new Error('Non-JSON Assessment Props at ' + at);
  if (ancestors.has(value)) throw new Error('Circular Assessment Props at ' + at);
  if (Object.getOwnPropertySymbols(value).length > 0) throw new Error('Symbol-keyed Assessment Props at ' + at);
  if (!Array.isArray(value)) {
    const prototype: unknown = Object.getPrototypeOf(value);
    if (prototype !== Object.prototype && prototype !== null) throw new Error('Non-plain Assessment Props at ' + at);
  }
  ancestors.add(value);
  try {
    if (Array.isArray(value)) {
      return (
        '[' +
        value
          .map((item, i) => {
            if (!Object.hasOwn(value, i)) throw new Error('Sparse Assessment array at ' + at);
            return canonical(item, at + '/' + i, ancestors);
          })
          .join(',') +
        ']'
      );
    }
    return (
      '{' +
      Object.keys(value)
        .sort(compare)
        .map(key => {
          if (forbiddenKeys.has(key)) throw new Error('Unsafe Assessment Props key at ' + at + '/' + key);
          return (
            JSON.stringify(key) + ':' + canonical((value as Record<string, unknown>)[key], at + '/' + key, ancestors)
          );
        })
        .join(',') +
      '}'
    );
  } finally {
    ancestors.delete(value);
  }
}

/**
 * Serialize Question/Flashcard Props as globally addressed UUID resources.
 * Only metadata lives in assessments/manifest.json, never Question answers.
 * Keys are relative to the generated assessments root (the textbook build
 * stages the entire tree at static/data/).
 */
export function renderAssessmentResourceFiles(
  entries: readonly AssessmentPublicationEntry[],
): AssessmentPublicationFiles {
  const files: AssessmentPublicationFiles = new Map();
  const owners = new Map<string, string>();
  const index: Record<string, AssessmentResourceEntry> = {};

  for (const entry of [...entries].sort(
    (a, b) =>
      compare(a.publication.base?.id ?? '', b.publication.base?.id ?? '') ||
      compare(a.lessonId, b.lessonId) ||
      compare(a.kind, b.kind),
  )) {
    const { source, lessonId, kind, publication } = entry;
    resolveEntityPath(lessonId);
    if (!publication || !publication.base || typeof publication.base !== 'object')
      throw new Error('Missing built Assessment Props at ' + source);
    const itemPath = resolveEntityPath(publication.base.id);
    const itemId = itemPath.split('/')[1];
    if (publication.base.id !== itemId) throw new Error('Assessment UUID is not canonical at ' + source);
    const previous = owners.get(itemId);
    if (previous) throw new Error('Duplicate Assessment UUID ' + itemId + ': ' + previous + ' and ' + source);
    owners.set(itemId, source);
    const type = publication.base.type;
    if (kind === 'question' && !questionTypes.some(candidate => candidate === type))
      throw new Error('Invalid Question kind at ' + source + ': ' + type);
    if (kind === 'flashcard' && type !== 'flashcard') throw new Error('Expected Flashcard Props at ' + source);

    const languages = [...entry.languages];
    for (const language of languages) languageCode_Schema.parse(language);
    if (!languages.length || new Set(languages).size !== languages.length)
      throw new Error('Assessment publication needs unique nonempty languages: ' + source);

    const prefix = (kind === 'question' ? 'questions/' : 'flashcards/') + itemPath;
    const baseString = canonical(publication.base, source + '/base');
    files.set(prefix + '/base.json', JSON.stringify(JSON.parse(baseString), null, 2) + '\n');
    const locale: Record<string, unknown> = {};
    for (const [language, body] of Object.entries(publication.locale ?? {}).sort(([a], [b]) => compare(a, b))) {
      languageCode_Schema.parse(language);
      if (!languages.includes(language as LanguageCode))
        throw new Error('Unexpected Assessment publication language ' + language + ' at ' + source);
      if (body === undefined) continue;
      if (body === null || typeof body !== 'object' || Array.isArray(body))
        throw new Error('Invalid Assessment locale body for ' + language + ' at ' + source);
      const serialized = canonical(body, source + '/' + language);
      if (serialized === '{}') continue;
      locale[language] = JSON.parse(serialized);
      files.set(prefix + '/' + language + '.json', JSON.stringify(locale[language], null, 2) + '\n');
    }

    const hash = createHash('sha256')
      .update(canonical({ base: JSON.parse(baseString), locale }, source))
      .digest('hex');
    index[itemId] = {
      ownerLessonId: lessonId,
      kind,
      ...(kind === 'question' ? { questionType: type as AssessmentResourceEntry['questionType'] } : {}),
      ...(kind === 'flashcard'
        ? {
            disabilities:
              (publication.base as { parameters?: { disabilities?: AssessmentResourceEntry['disabilities'] } })
                .parameters?.disabilities ?? [],
          }
        : {}),
      languages,
      localeFiles: Object.keys(locale) as LanguageCode[],
      contentHash: hash,
    };
  }
  const manifest = assessmentResourceManifest_Schema.parse({
    entries: Object.fromEntries(Object.entries(index).sort(([a], [b]) => compare(a, b))),
  });
  files.set('assessments/manifest.json', JSON.stringify(manifest, null, 2) + '\n');
  return new Map([...files].sort(([a], [b]) => compare(a, b)));
}

/**
 * Merge two independently produced stages into one textbook-scoped manifest.
 * Validate path/UUID/kind/locale completeness, global collisions, and content
 * hashes before emitting even one publication file.
 */
export function mergeAssessmentResourceFiles(
  batches: readonly ReadonlyMap<string, string>[],
): AssessmentPublicationFiles {
  const files = new Map<string, string>();
  const index: Record<string, AssessmentResourceEntry> = {};
  for (const batch of batches) {
    for (const [filename, body] of batch) {
      if (typeof body !== 'string') throw new Error('Invalid Assessment resource body: ' + filename);
      if (filename === 'assessments/manifest.json') {
        const manifest = assessmentResourceManifest_Schema.parse(JSON.parse(body));
        for (const [id, entry] of Object.entries(manifest.entries)) {
          if (Object.hasOwn(index, id)) throw new Error('Duplicate Assessment UUID across stages: ' + id);
          resolveEntityPath(entry.ownerLessonId);
          index[id] = entry;
        }
        continue;
      }
      const matched = /^(questions|flashcards)\/([0-9a-f])\/([0-9a-f-]{36})\/(base|[a-z]{2})\.json$/.exec(filename);
      if (!matched) throw new Error('Invalid Assessment resource path: ' + filename);
      const [, collection, bucket, id] = matched;
      if (resolveEntityPath(id) !== bucket + '/' + id) throw new Error('Invalid Assessment UUID path: ' + filename);
      if (files.has(filename)) throw new Error('Duplicate Assessment resource file: ' + filename);
      const parsed = JSON.parse(body);
      if (parsed === null || typeof parsed !== 'object' || Array.isArray(parsed)) {
        throw new Error('Invalid Assessment resource JSON: ' + filename);
      }
      if (collection !== 'questions' && collection !== 'flashcards')
        throw new Error('Invalid Assessment resource kind: ' + filename);
      files.set(filename, body);
    }
  }

  for (const [filename] of files) {
    const match = /^(questions|flashcards)\/[0-9a-f]\/([0-9a-f-]{36})\/(base|[a-z]{2})\.json$/.exec(filename)!;
    const [, collection, id, language] = match;
    const entry = index[id];
    if (!entry || (collection === 'questions' ? 'question' : 'flashcard') !== entry.kind) {
      throw new Error('Unindexed Assessment resource file: ' + filename);
    }
    if (language !== 'base' && !entry.localeFiles.includes(language as LanguageCode)) {
      throw new Error('Assessment locale file is not declared in manifest: ' + filename);
    }
  }

  for (const [id, entry] of Object.entries(index)) {
    const folder = (entry.kind === 'question' ? 'questions/' : 'flashcards/') + resolveEntityPath(id);
    if (
      new Set(entry.languages).size !== entry.languages.length ||
      new Set(entry.localeFiles).size !== entry.localeFiles.length ||
      entry.localeFiles.some(code => !entry.languages.includes(code))
    ) {
      throw new Error('Invalid Assessment publication languages: ' + id);
    }
    const baseFile = folder + '/base.json';
    if (!files.has(baseFile)) throw new Error('Assessment resource base is missing: ' + folder);
    const base = JSON.parse(files.get(baseFile)!);
    if (base.id !== id) throw new Error('Assessment resource UUID mismatch: ' + id);
    if (entry.kind === 'question' && base.type !== entry.questionType)
      throw new Error('Assessment Question type mismatch: ' + id);
    if (entry.kind === 'flashcard' && base.type !== 'flashcard')
      throw new Error('Assessment Flashcard type mismatch: ' + id);
    const locale: Record<string, unknown> = {};
    for (const language of entry.localeFiles) {
      const file = folder + '/' + language + '.json';
      if (!files.has(file)) throw new Error('Assessment resource locale is missing: ' + folder + '/' + language);
      locale[language] = JSON.parse(files.get(file)!);
    }
    const hash = createHash('sha256').update(canonical({ base, locale }, id)).digest('hex');
    if (hash !== entry.contentHash) throw new Error('Assessment resource content hash mismatch: ' + id);
  }
  const manifest = assessmentResourceManifest_Schema.parse({
    entries: Object.fromEntries(Object.entries(index).sort(([a], [b]) => compare(a, b))),
  });
  files.set('assessments/manifest.json', JSON.stringify(manifest, null, 2) + '\n');
  return new Map([...files].sort(([a], [b]) => compare(a, b)));
}
