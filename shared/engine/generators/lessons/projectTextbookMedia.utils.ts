import { existsSync, lstatSync } from 'node:fs';
import { join, resolve } from 'node:path';
import {
  imageFileName_Schema,
  audioFileName_Schema,
  videoFileName_Schema,
  subtitlesFileName_Schema,
  UNRESOLVED_RESOURCE_UUID,
} from '../../schemas/media.schemas';

type Folder = 'images' | 'audio' | 'video' | 'subtitles';
export type MediaPublicationMode = 'draft' | 'production';
export type MediaDiagnostic = {
  source: string;
  location: string;
  blockId?: string;
  kind: Folder;
  fileName: string;
  expectedPath: string;
  reason: string;
};
export type MediaPublicationOptions = {
  textbookRoot: string;
  textbookId: string;
  source: string;
  mode: MediaPublicationMode;
  diagnostics: MediaDiagnostic[];
};

const slots: Record<string, Record<string, Folder>> = {
  image: { src: 'images' },
  audio: { fileLocation: 'audio' },
  video: { fileLocation: 'video', poster: 'images' },
  subtitles: { fileLocation: 'subtitles' },
};
const schemas = {
  images: imageFileName_Schema,
  audio: audioFileName_Schema,
  video: videoFileName_Schema,
  subtitles: subtitlesFileName_Schema,
} as const;
const isRecord = (value: unknown): value is Record<string, unknown> =>
  value !== null && typeof value === 'object' && !Array.isArray(value);

// UUIDs minted by Draft-only pending configurators are not publishable identities.
// These can appear anywhere in built Props, including nested Course references
// and bank-side content that is not a media slot.
const pendingUuid = /\bfeedc0de-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}\b/i;
const pendingAssessmentLabels = new Set(['PENDING QUIZ', 'PENDING FLASHCARDS']);

function inferredFolder(field: string, value: unknown): Folder | undefined {
  if (typeof value !== 'string') return undefined;
  if (field === 'src') return schemas.images.safeParse(value).success ? 'images' : undefined;
  if (field === 'poster') return schemas.images.safeParse(value).success ? 'images' : undefined;
  if (field !== 'fileLocation') return undefined;
  for (const kind of ['audio', 'video', 'subtitles'] as const) {
    if (schemas[kind].safeParse(value).success) return kind;
  }
  return undefined;
}

/**
 * Resolve only known typed media slots from completed Build Props; do not
 * reconstruct Config, reorder children or merge locale/override patches.
 * Sparse media overrides without a discriminator are recognized by their
 * known runtime field and category-specific filename schema.
 */
export function projectTextbookMedia<T>(publication: T, options: MediaPublicationOptions): T {
  const root = resolve(options.textbookRoot);
  const validId = /^[a-z][a-z0-9-]*$/.test(options.textbookId);
  if (!validId) throw new Error('Invalid textbook ID for media publication');
  const rejectPending = (value: unknown, location: string) => {
    if (options.mode !== 'production') return;
    if (typeof value === 'string' && (pendingUuid.test(value) || pendingAssessmentLabels.has(value))) {
      throw new Error('Unresolved Preview value in production publication: ' + options.source + ' at ' + location);
    }
    if (!isRecord(value)) return;
    // A Quest has a Build Configurator but is not a playable Lesson Section yet.
    if (value.type === 'quest') {
      throw new Error('Unimplemented Quest in production publication: ' + options.source + ' at ' + location);
    }
    // Pending Lesson/Section factories return valid Build Props. Their explicit
    // scaffold identity is not review evidence, even if an author replaced IDs.
    if (
      (value.type === 'content' && value.slug === 'pendingContent' && isRecord(value.locale) && value.locale.title === 'Not implemented') ||
      (value.type === 'text' && value.slug === 'pendingNotice' && isRecord(value.locale) && value.locale.value === 'Not implemented')
    ) {
      throw new Error('Unimplemented Preview scaffold in production publication: ' + options.source + ' at ' + location);
    }
  };
  const report = (location: string, blockId: string | undefined, kind: Folder, fileName: string, reason: string) => {
    options.diagnostics.push({
      source: options.source,
      location,
      blockId,
      kind,
      fileName,
      expectedPath: join(root, 'assets', kind, fileName),
      reason,
    });
  };
  const resolveMedia = (value: unknown, kind: Folder, location: string, blockId?: string): unknown => {
    rejectPending(value, location);
    if (typeof value !== 'string') {
      report(location, blockId, kind, String(value), 'not a string');
      return value;
    }
    if (/^https?:\/\//i.test(value)) return value;
    if (!schemas[kind].safeParse(value).success) {
      report(location, blockId, kind, value, 'malformed or incompatible UUID filename');
      return value;
    }
    // The Nil UUID is a draft sentinel, not an asset, even if a file exists.
    if (value.startsWith(UNRESOLVED_RESOURCE_UUID + '.')) {
      report(location, blockId, kind, value, 'unresolved resource placeholder');
      return '/textbooks/' + options.textbookId + '/assets/' + kind + '/' + value;
    }
    const asset = join(root, 'assets', kind, value);
    for (const part of [join(root, 'assets'), join(root, 'assets', kind), asset]) {
      if (existsSync(part) && lstatSync(part).isSymbolicLink()) {
        report(location, blockId, kind, value, 'unsafe symbolic link');
        return value;
      }
    }
    if (!existsSync(asset)) report(location, blockId, kind, value, 'file is missing');
    else if (!lstatSync(asset).isFile()) report(location, blockId, kind, value, 'not a regular file');
    else if (lstatSync(asset).size === 0) report(location, blockId, kind, value, 'file is empty');
    return '/textbooks/' + options.textbookId + '/assets/' + kind + '/' + value;
  };
  const visit = (value: unknown, location: string, inheritedType?: string, inheritedId?: string): unknown => {
    rejectPending(value, location);
    if (Array.isArray(value)) return value.map((item, index) => visit(item, location + '[' + index + ']'));
    if (!isRecord(value)) return value;
    const currentType = typeof value.type === 'string' ? value.type : inheritedType;
    const blockId = typeof value.id === 'string' ? value.id : inheritedId;
    const output: Record<string, unknown> = {};
    for (const [key, child] of Object.entries(value)) {
      if (key === 'locale' && isRecord(child)) {
        const locale: Record<string, unknown> = {};
        for (const [field, fieldValue] of Object.entries(child)) {
          const kind = slots[currentType ?? '']?.[field] ?? inferredFolder(field, fieldValue);
          locale[field] = kind
            ? resolveMedia(fieldValue, kind, location + '.locale.' + field, blockId)
            : visit(fieldValue, location + '.locale.' + field);
        }
        output[key] = locale;
      } else {
        // A language-scoped fragment may have no type. Inherit a media block's
        // discriminator only across the root publication locale envelope.
        output[key] = visit(child, location + '.' + key, key === 'locale' ? currentType : undefined, blockId);
      }
    }
    return output;
  };
  return visit(publication, options.source) as T;
}

/** Production is all-or-nothing: report every missing/unsafe referenced file. */
export function assertMediaPublicationReady(diagnostics: readonly MediaDiagnostic[], mode: MediaPublicationMode) {
  const fatal =
    mode === 'production'
      ? diagnostics
      : diagnostics.filter(item => !['file is missing', 'unresolved resource placeholder'].includes(item.reason));
  if (!fatal.length) return;
  throw new Error(
    'Textbook media publication failed (' +
      fatal.length +
      ' reference(s)):\n' +
      fatal
        .map(d => [d.source, d.location, d.blockId ?? '-', d.kind, d.fileName, d.expectedPath, d.reason].join(' | '))
        .join('\n'),
  );
}
