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
 * Serialize independently built Question/Flashcard Props without inserting them
 * into Lesson output. Each Lesson receives a metadata-only manifest; no bank
 * bodies, answer keys, or locale contents appear in that manifest.
 *
 * Paths are relative to the publisher's data/lessons root.
 */
export function renderAssessmentResourceFiles(
  entries: readonly AssessmentPublicationEntry[],
): AssessmentPublicationFiles {
  const files: AssessmentPublicationFiles = new Map();
  const owners = new Map<string, string>();
  const manifests = new Map<string, Record<string, AssessmentResourceEntry>>();

  for (const entry of [...entries].sort(
    (a, b) => compare(a.lessonId, b.lessonId) || compare(a.publication.base?.id ?? '', b.publication.base?.id ?? ''),
  )) {
    const { source, lessonId, kind, publication } = entry;
    const lessonPath = resolveEntityPath(lessonId);
    if (!publication || !publication.base || typeof publication.base !== 'object')
      throw new Error('Missing built Assessment Props at ' + source);
    const itemId = resolveEntityPath(publication.base.id).split('/')[1];
    if (publication.base.id !== itemId) throw new Error('Assessment UUID is not canonical at ' + source);
    const key = itemId; // UUID identity must not collide across Lessons or resource kinds.
    const previous = owners.get(key);
    if (previous) throw new Error('Duplicate Assessment UUID ' + itemId + ': ' + previous + ' and ' + source);
    owners.set(key, source);
    const type = publication.base.type;
    if (kind === 'question' && !questionTypes.some(candidate => candidate === type))
      throw new Error('Invalid Question kind at ' + source + ': ' + type);
    if (kind === 'flashcard' && type !== 'flashcard') throw new Error('Expected Flashcard Props at ' + source);

    const languages = [...entry.languages];
    for (const language of languages) languageCode_Schema.parse(language);
    if (!languages.length || new Set(languages).size !== languages.length)
      throw new Error('Assessment publication needs unique nonempty languages: ' + source);

    const prefix = lessonPath + '/' + (kind === 'question' ? 'questions' : 'flashcards') + '/' + itemId;
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
    const item: AssessmentResourceEntry = {
      lessonId,
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
    (manifests.get(lessonPath) ?? (manifests.set(lessonPath, {}), manifests.get(lessonPath)!))[itemId] = item;
  }
  for (const [lessonPath, items] of [...manifests].sort(([a], [b]) => compare(a, b))) {
    const lessonId = lessonPath.split('/')[1];
    const manifest = assessmentResourceManifest_Schema.parse({ lessonId, entries: items });
    files.set(lessonPath + '/assessment-manifest.json', JSON.stringify(manifest, null, 2) + '\n');
  }
  return files;
}

/**
 * Compose separately generated Question and Flashcard batches without touching
 * their source files. A bank stage may emit only its own kind; the final static
 * publisher must merge metadata manifests rather than letting the last writer
 * replace another bank's manifest.
 *
 * Inputs are already-rendered, relative assessment file maps. All assets remain
 * individual immutable resources, not embedded inside the merged metadata.
 */
export function mergeAssessmentResourceFiles(
  batches: readonly ReadonlyMap<string, string>[],
): AssessmentPublicationFiles {
  const merged = new Map<string, string>();
  const owners = new Map<string, Record<string, AssessmentResourceEntry>>();
  const globallyOwned = new Map<string, string>();
  const assets: { filename: string; lessonId: string; itemId: string; kind: AssessmentResourceKind; locale: string }[] =
    [];

  for (const batch of batches) {
    for (const [filename, body] of batch) {
      if (typeof body !== 'string') throw new Error('Invalid Assessment resource body: ' + filename);
      const manifestMatch = /^([a-f0-9])\/([a-f0-9-]{36})\/assessment-manifest\.json$/.exec(filename);
      if (manifestMatch) {
        const [, bucket, lessonId] = manifestMatch;
        if (resolveEntityPath(lessonId) !== bucket + '/' + lessonId) {
          throw new Error('Invalid Assessment manifest path: ' + filename);
        }
        const manifest = assessmentResourceManifest_Schema.parse(JSON.parse(body));
        if (manifest.lessonId !== lessonId) throw new Error('Assessment manifest owner mismatch: ' + filename);
        const entries = owners.get(lessonId) ?? {};
        for (const [id, item] of Object.entries(manifest.entries)) {
          if (Object.hasOwn(entries, id)) throw new Error('Duplicate Assessment UUID across stages: ' + id);
          if (globallyOwned.has(id) && globallyOwned.get(id) !== lessonId) {
            throw new Error('Duplicate Assessment UUID across Lessons: ' + id);
          }
          globallyOwned.set(id, lessonId);
          entries[id] = item;
        }
        owners.set(lessonId, entries);
        continue;
      }
      const assetMatch =
        /^([a-f0-9])\/([a-f0-9-]{36})\/(questions|flashcards)\/([a-f0-9-]{36})\/(base|[a-z]{2})\.json$/.exec(filename);
      if (!assetMatch) throw new Error('Invalid Assessment resource path: ' + filename);
      const [, bucket, lessonId, collection, itemId, locale] = assetMatch;
      if (
        resolveEntityPath(lessonId) !== bucket + '/' + lessonId ||
        resolveEntityPath(itemId).split('/')[1] !== itemId
      ) {
        throw new Error('Invalid Assessment UUID path: ' + filename);
      }
      if (merged.has(filename)) throw new Error('Duplicate Assessment resource file: ' + filename);
      JSON.parse(body); // Refuse malformed input rather than publishing an apparently complete file.
      merged.set(filename, body);
      assets.push({
        filename,
        lessonId,
        itemId,
        kind: collection === 'questions' ? 'question' : 'flashcard',
        locale,
      });
    }
  }
  const assetFiles = new Set(assets.map(asset => asset.filename));
  for (const asset of assets) {
    const entry = owners.get(asset.lessonId)?.[asset.itemId];
    if (!entry || entry.kind !== asset.kind || entry.lessonId !== asset.lessonId) {
      throw new Error('Unindexed Assessment resource file: ' + asset.filename);
    }
    if (asset.locale !== 'base' && !entry.localeFiles?.includes(asset.locale as LanguageCode)) {
      throw new Error('Assessment locale file is not declared in manifest: ' + asset.filename);
    }
  }
  for (const [lessonId, entries] of owners) {
    const lessonPath = resolveEntityPath(lessonId);
    for (const [id, entry] of Object.entries(entries)) {
      const folder = lessonPath + '/' + (entry.kind === 'question' ? 'questions' : 'flashcards') + '/' + id;
      if (!assetFiles.has(folder + '/base.json')) throw new Error('Assessment resource base is missing: ' + folder);
      for (const locale of entry.localeFiles ?? []) {
        if (!assetFiles.has(folder + '/' + locale + '.json')) {
          throw new Error('Assessment resource locale is missing: ' + folder + '/' + locale);
        }
      }
    }
    const manifest = assessmentResourceManifest_Schema.parse({
      lessonId,
      entries: Object.fromEntries(Object.entries(entries).sort(([left], [right]) => compare(left, right))),
    });
    merged.set(lessonPath + '/assessment-manifest.json', JSON.stringify(manifest, null, 2) + '\n');
  }
  return new Map([...merged].sort(([a], [b]) => compare(a, b)));
}
