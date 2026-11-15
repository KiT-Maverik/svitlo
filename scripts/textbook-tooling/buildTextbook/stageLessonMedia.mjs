/**
 * Package only conventionally named, colocated Lesson binary/text media.
 * Runtime URLs are /textbooks/<book>/lessons/<bucket>/<uuid>/<module>/<file>.
 * This is a packaging helper, never an authoring generator or runtime import.
 */
import { copyFileSync, existsSync, mkdirSync } from 'node:fs';
import path from 'node:path';

const uuid = /^[0-9a-f]{8}-(?:[0-9a-f]{4}-){3}[0-9a-f]{12}$/;
const slug = /^[a-z][a-zA-Z0-9]*$/;
const supported = new Set([
  'png', 'jpg', 'jpeg', 'webp', 'gif', 'avif', 'svg',
  'mp4', 'webm', 'mp3', 'wav', 'ogg', 'm4a', 'flac', 'vtt', 'srt',
]);
const imageExtensions = new Set(['svg', 'png', 'jpg', 'jpeg', 'webp', 'gif', 'avif']);

/**
 * @param {object} config
 * @param {string} config.textbookRoot
 * @param {string} config.textbookId
 * @param {string} config.staticRoot
 * @param {string[]} config.files output of the existing symlink-rejecting filesUnder(data/lessons)
 */
export function stageLessonMedia({ textbookRoot, textbookId, staticRoot, files }) {
  const destinations = [];
  const roles = new Set();
  const candidates = new Set(files);
  for (const name of files) {
    const extension = path.posix.extname(name).slice(1);
    if (!supported.has(extension)) continue;
    const parts = name.split('/');
    if (parts.length < 6 || !/^[0-9a-f]$/.test(parts[0]) ||
        !uuid.test(parts[1]) || parts[1].at(-1) !== parts[0]) {
      throw new Error('Invalid Lesson media UUID path: ' + name);
    }
    const localized = parts.at(-2) === 'locale';
    const moduleParts = parts.slice(2, localized ? -2 : -1);
    if (moduleParts.length < 2 ||
        !['sections', 'questions', 'flashcards'].includes(moduleParts[0]) ||
        moduleParts.some(segment => !slug.test(segment))) {
      throw new Error('Invalid Lesson media module path: ' + name);
    }
    const sourceStem = moduleParts.at(-1);
    const stem = parts.at(-1).slice(0, -(extension.length + 1));
    const valid = localized
      ? (/^[a-z]{2}(?:\.poster)?$/.test(stem))
      : (stem === sourceStem || stem === 'poster');
    if (!valid || (stem.endsWith('.poster') || stem === 'poster') && !imageExtensions.has(extension)) {
      throw new Error('Unexpected Lesson media file naming/format: ' + name);
    }
    const index = [parts[0], parts[1], ...moduleParts, 'index.ts'].join('/');
    if (!candidates.has(index)) throw new Error('Lesson media missing defining index.ts: ' + name);
    const logicalRole = [parts[0], parts[1], ...moduleParts, localized ? 'locale' : '',
      stem === sourceStem ? 'source' : stem].join('/');
    if (roles.has(logicalRole)) throw new Error('Ambiguous Lesson media extensions for ' + logicalRole);
    roles.add(logicalRole);
    const output = path.join(staticRoot, 'textbooks', textbookId, 'lessons', ...parts);
    if (existsSync(output)) throw new Error('Duplicate textbook Lesson media publication: ' + name);
    destinations.push({ source: path.join(textbookRoot, 'data/lessons', ...parts), target: output });
  }
  for (const { source, target } of destinations) {
    mkdirSync(path.dirname(target), { recursive: true });
    copyFileSync(source, target);
  }
  return destinations.length;
}
