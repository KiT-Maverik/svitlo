/**
 * Build-only publication of already rendered Lesson Props.
 * The complete output tree is staged before replacing the owned directory.
 */
import { randomUUID } from 'node:crypto';
import fs from 'node:fs';
import path from 'node:path';
import { assertSafeDirectoryPath } from '../../generators/safeGeneratedPath/assertSafeDirectoryPath.mjs';
export { assertSafeDirectoryPath } from '../../generators/safeGeneratedPath/assertSafeDirectoryPath.mjs';

const lessonFile =
  /^([0-9a-f])\/([0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12})\/(base|[a-z]{2})\.json$/;
const assessmentFile =
  /^(?:assessments\/manifest\.json|(questions|flashcards)\/([0-9a-f])\/([0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12})\/(base|[a-z]{2})\.json)$/;

function validateFiles(files, mode = 'lesson') {
  if (!(files instanceof Map)) throw new Error('Expected a Map of generated files');
  if (mode !== 'lesson' && mode !== 'assessment') throw new Error('Unknown generated resource mode');
  for (const [relative, body] of files) {
    if (typeof relative !== 'string') throw new Error('Invalid generated path: ' + String(relative));
    if (mode === 'lesson') {
      const match = lessonFile.exec(relative);
      if (!match || match[1] !== match[2].slice(-1)) throw new Error('Invalid generated Lesson path: ' + relative);
    } else {
      const match = assessmentFile.exec(relative);
      if (!match || (relative !== 'assessments/manifest.json' && match[2] !== match[3].slice(-1)))
        throw new Error('Invalid generated Assessment path: ' + relative);
    }
    if (typeof body !== 'string')
      throw new Error('Invalid generated ' + (mode === 'lesson' ? 'Lesson' : 'Assessment') + ' body: ' + relative);
  }
}

/** Scan without following symlinks; unexpected nodes must not be silently removed. */
function currentFiles(root) {
  assertSafeDirectoryPath(root);
  const files = new Set();
  const visit = (directory, prefix = '') => {
    if (!fs.existsSync(directory)) return;
    for (const entry of fs.readdirSync(directory, { withFileTypes: true })) {
      const relative = prefix ? prefix + '/' + entry.name : entry.name;
      const full = path.join(directory, entry.name);
      if (entry.isSymbolicLink()) throw new Error('Unexpected symlink in generated Lessons: ' + relative);
      if (entry.isDirectory()) visit(full, relative);
      else if (entry.isFile()) files.add(relative);
      else throw new Error('Unexpected generated Lesson entry: ' + relative);
    }
  };
  visit(root);
  return files;
}

/** Read-only, byte-exact verification including stale generated files. */
export function checkLessonProps(root, files, mode = 'lesson') {
  validateFiles(files, mode);
  const actual = currentFiles(root);
  const changed = [...files]
    .filter(
      ([relative, content]) => !actual.has(relative) || fs.readFileSync(path.join(root, relative), 'utf8') !== content,
    )
    .map(([relative]) => relative);
  const stale = [...actual].filter(relative => !files.has(relative));
  if (changed.length || stale.length) {
    throw new Error('Generated Lessons differ: ' + JSON.stringify({ changed, stale }));
  }
}

/**
 * Stage a complete new tree on the same filesystem, then swap it into place.
 * If the final rename fails, restore the previous output instead of leaving
 * a partially published directory. Files outside root are never touched.
 */
export function publishLessonProps(root, files, mode = 'lesson') {
  validateFiles(files, mode);
  currentFiles(root);
  const destination = path.resolve(root);
  const parent = path.dirname(destination);
  fs.mkdirSync(parent, { recursive: true });
  const staging = fs.mkdtempSync(path.join(parent, '.lessons-staging-'));
  const backup = path.join(parent, '.lessons-backup-' + randomUUID());
  let backedUp = false;
  let published = false;
  try {
    for (const [relative, body] of files) {
      const target = path.join(staging, relative);
      fs.mkdirSync(path.dirname(target), { recursive: true });
      fs.writeFileSync(target, body, 'utf8');
    }
    if (fs.existsSync(destination)) {
      fs.renameSync(destination, backup);
      backedUp = true;
    }
    fs.renameSync(staging, destination);
    published = true;
  } catch (error) {
    if (backedUp && !published) fs.renameSync(backup, destination);
    throw error;
  } finally {
    if (fs.existsSync(staging)) fs.rmSync(staging, { recursive: true, force: true });
    if (published && backedUp) fs.rmSync(backup, { recursive: true, force: true });
  }
}
