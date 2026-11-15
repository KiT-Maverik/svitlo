/**
 * Resolve colocated Lesson media into existing textbook-owned public URLs.
 * Build-only: do not re-export from Engine's runtime/root entrypoints.
 *
 * A source module is:
 *   content/<book>/data/lessons/<uuid-tail>/<uuid>/<roles>/<slug>/index.ts
 * Primary asset: <slug>.<ext> or locale/<language>.<ext>.
 * Video poster: poster.<ext> or locale/<language>.poster.<ext>.
 * Only the final URL string is retained in authored Config/Props.
 */
import { existsSync, lstatSync, readdirSync, statSync, realpathSync } from 'node:fs';
import { basename, dirname, extname, join, resolve, sep } from 'node:path';
import { fileURLToPath } from 'node:url';

const suffixes = {
  image: ['svg', 'png', 'jpg', 'jpeg', 'webp', 'gif', 'avif'],
  carouselSlide: ['svg', 'png', 'jpg', 'jpeg', 'webp', 'gif', 'avif'],
  video: ['mp4', 'webm'],
  audio: ['mp3', 'wav', 'ogg', 'm4a', 'flac'],
  subtitles: ['vtt', 'srt'],
  poster: ['svg', 'png', 'jpg', 'jpeg', 'webp', 'gif', 'avif'],
} as const;

type Kind = 'image' | 'carouselSlide' | 'video' | 'audio' | 'subtitles';
type Role = 'source' | 'poster';

const uuid = /^[0-9a-f]{8}-(?:[0-9a-f]{4}-){3}[0-9a-f]{12}$/;
const slug = /^[a-z][a-zA-Z0-9]*$/;
const locale = /^[a-z]{2}$/;

function mediaLocation(moduleUrl: string): {
  directory: string;
  textbookId: string;
  assetPath: string[];
  slug: string;
} {
  const moduleFile = resolve(fileURLToPath(moduleUrl));
  if (basename(moduleFile) !== 'index.ts')
    throw new Error('Lesson media source must be defined in an index.ts module: ' + moduleFile);
  const chunks = moduleFile.split(sep);
  // Find the LAST canonical data/lessons path, which is unique inside a
  // textbook and avoids depending on working directory or build outdir.
  let start = -1;
  for (let i = 0; i < chunks.length - 5; i++) {
    if (
      chunks[i] === 'data' &&
      chunks[i + 1] === 'lessons' &&
      /^[0-9a-f]$/.test(chunks[i + 2]) &&
      uuid.test(chunks[i + 3])
    ) {
      start = i;
    }
  }
  if (
    start < 2 ||
    !(
      chunks[start - 2] === 'content' ||
      (start >= 3 && chunks[start - 3] === 'content' && chunks[start - 2] === 'languages')
    )
  )
    throw new Error('Lesson media definition must be inside a textbook UUID folder: ' + moduleFile);
  const textbookId = chunks[start - 1];
  if (!slug.test(textbookId) || chunks[start + 3].at(-1) !== chunks[start + 2])
    throw new Error('Invalid Lesson media textbook/bucket path: ' + moduleFile);
  const assetPath = chunks.slice(start + 4, -1);
  if (
    assetPath.length < 2 ||
    !['sections', 'questions', 'flashcards'].includes(assetPath[0]) ||
    assetPath.some(x => !slug.test(x))
  )
    throw new Error('Invalid Lesson media module hierarchy: ' + moduleFile);
  // Compilation may have a temporary output folder, but the moduleUrl supplied
  // by the caller is the original authored index.ts (esbuild preserves it).
  const directory = dirname(moduleFile);
  if (!existsSync(moduleFile) || realpathSync(moduleFile) !== moduleFile)
    throw new Error('Missing or linked authored Lesson media definition: ' + moduleFile);
  return {
    directory,
    textbookId,
    assetPath: [chunks[start + 2], chunks[start + 3], ...assetPath],
    slug: assetPath.at(-1)!,
  };
}

/** Select one local asset without guessing the file extension or locale. */
export function resolveLessonMedia(moduleUrl: string, kind: Kind, role: Role = 'source', language?: string): string {
  if (!(kind in suffixes) || (role === 'poster' && kind !== 'video') || !['source', 'poster'].includes(role))
    throw new Error('Unsupported Lesson media role: ' + kind + '/' + role);
  if (language !== undefined && !locale.test(language)) throw new Error('Invalid Lesson media locale: ' + language);
  const { directory, textbookId, assetPath, slug: entitySlug } = mediaLocation(moduleUrl);
  const files = language ? join(directory, 'locale') : directory;
  const name = role === 'poster' ? (language ? language + '.poster' : 'poster') : (language ?? entitySlug);
  const extensions: readonly string[] = suffixes[role === 'poster' ? 'poster' : kind];
  if (!existsSync(files)) throw new Error('Missing Lesson media directory: ' + files);
  if (realpathSync(files) !== resolve(files)) throw new Error('Symlinked Lesson media source directory: ' + files);
  const matches = readdirSync(files).filter(file => {
    const extension = extname(file).slice(1);
    return file === name + '.' + extension && extensions.includes(extension);
  });
  if (matches.length !== 1) {
    throw new Error(
      'Lesson media requires exactly one ' +
        kind +
        '/' +
        role +
        ' source for ' +
        (language ?? 'invariant') +
        ' in ' +
        files +
        '; found ' +
        matches.length,
    );
  }
  const file = join(files, matches[0]);
  if (!lstatSync(file).isFile()) throw new Error('Non-regular Lesson media file: ' + file);
  // A zero-byte asset is never a valid playable/displayable file.
  if (statSync(file).size === 0) throw new Error('Empty Lesson media asset: ' + file);
  const publicParts = ['textbooks', textbookId, 'lessons', ...assetPath, ...(language ? ['locale'] : []), matches[0]];
  return '/' + publicParts.map(encodeURIComponent).join('/');
}
