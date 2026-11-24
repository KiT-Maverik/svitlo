/**
 * @fileoverview Verify and load only already-merged, immutable Lesson
 * Configurators from the trusted default-branch tree. No PR-head TypeScript
 * is compiled/executed by the privileged Course publisher. A Course-local
 * override still requires its original reviewed raw Build expression; a
 * built Props patch is never reverse-engineered or passed off as raw input.
 */
import fs from 'node:fs';
import path from 'node:path';
import { spawnSync } from 'node:child_process';
import Module from 'node:module';
import { fileURLToPath } from 'node:url';
import { gitBlob } from './course-gate.mjs';

const uuid = /^[0-9a-f]{8}-(?:[0-9a-f]{4}-){3}[0-9a-f]{12}$/;
const sha = /^[a-f0-9]{40}$/;
const book = /^content\/[a-z][a-z0-9-]*$/;

function git(root, ...args) {
  const command = spawnSync('git', args, {
    cwd: root,
    encoding: 'utf8',
    maxBuffer: 16 * 1024 * 1024,
  });
  if (command.status !== 0 || command.error)
    throw Error(
      'Cannot verify pinned existing Lesson Git source: ' + (command.stderr || command.error?.message || args[0]),
    );
  return command.stdout.trimEnd();
}

function readRegular(root, relative) {
  const absolute = path.resolve(root, relative);
  if (
    !absolute.startsWith(path.resolve(root) + path.sep) ||
    !fs.existsSync(absolute) ||
    !fs.lstatSync(absolute).isFile() ||
    fs.lstatSync(absolute).isSymbolicLink()
  )
    throw Error('Missing/nonregular existing Lesson authored source: ' + relative);
  let ancestor = path.dirname(absolute);
  while (ancestor !== root) {
    if (fs.lstatSync(ancestor).isSymbolicLink()) throw Error('Symlinked existing Lesson source ancestor: ' + relative);
    ancestor = path.dirname(ancestor);
  }
  return fs.readFileSync(absolute);
}

/** A Course must not smuggle changes to an independently authored Lesson dependency. */
function assertIdenticalLessonTree(trusted, candidate, lessonRoot) {
  const walk = (base, relative) => {
    const directory = path.join(base, relative);
    return fs.readdirSync(directory, { withFileTypes: true }).flatMap(entry => {
      const child = path.posix.join(relative, entry.name);
      if (entry.name === 'draft.ts') throw Error('Unmaterialized editorial draft in existing Lesson: ' + child);
      if (entry.isSymbolicLink() || (!entry.isFile() && !entry.isDirectory()))
        throw Error('Symlink or unsupported file in trusted Lesson dependency tree: ' + child);
      return entry.isDirectory() ? walk(base, child) : [child];
    });
  };
  const trustedFiles = walk(trusted, lessonRoot).sort();
  const candidateFiles = git(candidate, 'ls-files', '--', lessonRoot).split('\n').filter(Boolean).sort();
  if (
    !trustedFiles.length ||
    trustedFiles.length !== candidateFiles.length ||
    trustedFiles.some((filename, index) => filename !== candidateFiles[index])
  )
    throw Error('Existing Lesson tree differs from trusted independently reviewed source');
  for (const filename of trustedFiles) {
    const expected = readRegular(trusted, filename);
    if (!readRegular(candidate, filename).equals(expected))
      throw Error('Existing Lesson dependency differs from trusted source: ' + filename);
  }
}

function assertPinnedRevision(root, filename, bytes, expected) {
  if (!sha.test(expected ?? '')) throw Error('Invalid reviewed Lesson source SHA');
  if (gitBlob(bytes) === expected) return;
  const atRevision = spawnSync('git', ['show', expected + ':' + filename], {
    cwd: root,
    encoding: 'buffer',
    maxBuffer: 16 * 1024 * 1024,
  });
  if (
    atRevision.status !== 0 ||
    atRevision.error ||
    !Buffer.isBuffer(atRevision.stdout) ||
    !atRevision.stdout.equals(bytes)
  )
    throw Error('Existing Lesson differs from its pinned authored revision');
  const ancestor = spawnSync('git', ['merge-base', '--is-ancestor', expected, 'HEAD'], {
    cwd: root,
  });
  if (ancestor.status !== 0) throw Error('Existing Lesson reviewed commit is not in Course branch ancestry');
}

function trustedConfigurator(trustedFile, id) {
  // Trusted default-branch source ONLY: never point esbuild at candidate/.
  // esbuild's synchronous API cannot use plugins. Keep the AST resolver synchronous
  // and run only the trusted bundling helper in a bounded subprocess.
  const output = spawnSync(
    process.execPath,
    [fileURLToPath(new URL('./bundle-trusted-lesson.mjs', import.meta.url)), trustedFile],
    {
      cwd: path.dirname(trustedFile),
      encoding: 'utf8',
      maxBuffer: 32 * 1024 * 1024,
      timeout: 60_000,
      env: { ...process.env, GH_TOKEN: undefined, GITHUB_TOKEN: undefined },
    },
  );
  if (output.status !== 0 || output.error)
    throw Error('Cannot load trusted existing Lesson Configurator: ' + (output.stderr || output.error?.message));
  const cjs = new Module(trustedFile);
  cjs.filename = trustedFile;
  cjs.paths = Module._nodeModulePaths(path.dirname(trustedFile));
  cjs._compile(output.stdout, trustedFile);
  const matches = Object.entries(cjs.exports).filter(
    ([, value]) =>
      value?.type === 'lesson' &&
      value?.id === id &&
      value?.config?.base?.id === id &&
      value?.config?.base?.type === 'lesson' &&
      typeof value?.build?.props === 'function' &&
      typeof value?.build?.overrides === 'function',
  );
  if (matches.length !== 1 || !/^[A-Za-z][A-Za-z0-9]*$/.test(matches[0][0]))
    throw Error('Cannot identify one genuine trusted existing Lesson Configurator export');
  return { exportName: matches[0][0], configurator: matches[0][1] };
}

/**
 * Create a per-run resolver. The trustedRoot is the checked-out default-branch
 * implementation, not the candidate tree. Both trees must contain byte-for-
 * byte identical Lesson source+methodology, and the candidate must prove its
 * original source SHA. Only genuine completed Configurator exports are reused.
 */
export function createTrustedCourseLessonResolver({ trustedRoot, candidateRoot, textbookRoot }) {
  if (!book.test(textbookRoot ?? '')) throw Error('Invalid Course textbook workspace');
  const trusted = fs.realpathSync(trustedRoot);
  const candidate = fs.realpathSync(candidateRoot);
  if (trusted === candidate) throw Error('Trusted and candidate source roots must be separate');
  const loaded = new Map();

  const load = id => {
    if (!uuid.test(id ?? '')) throw Error('Unsafe imported existing Lesson UUID');
    if (loaded.has(id)) return loaded.get(id);
    const root = textbookRoot + '/data/lessons/' + id.at(-1) + '/' + id;
    assertIdenticalLessonTree(trusted, candidate, root);
    const sourcePath = root + '/index.ts';
    const methodologyPath = root + '/methodology.md';
    const candidateSource = readRegular(candidate, sourcePath);
    const trustedSource = readRegular(trusted, sourcePath);
    if (!candidateSource.equals(trustedSource))
      throw Error('Untrusted or divergent existing Lesson source; merge and review it independently first');
    if (!readRegular(candidate, methodologyPath).equals(readRegular(trusted, methodologyPath)))
      throw Error('Existing Lesson methodology differs from its trusted source');
    const status = git(candidate, 'ls-files', '--stage', '--', sourcePath);
    if (!/^100644 [a-f0-9]{40} 0\t/.test(status))
      throw Error('Existing Lesson source is not an ordinary tracked Git file');
    const resolved = {
      ...trustedConfigurator(path.join(trusted, sourcePath), id),
      sourcePath,
      methodologyPath,
      source: candidateSource,
    };
    loaded.set(id, resolved);
    return resolved;
  };

  const resolve = ({ id, matching, languages }) => {
    if (!uuid.test(id ?? '') || !sha.test(matching?.sourceSha ?? '') || !Array.isArray(languages) || !languages.length)
      throw Error('Cannot resolve unverified existing Lesson identity/revision');
    const verified = load(id);
    if (matching.methodologySourcePath !== verified.methodologyPath)
      throw Error('Existing Lesson matching must reference its real canonical methodology source');
    assertPinnedRevision(candidate, verified.sourcePath, verified.source, matching.sourceSha);
    const supported = verified.configurator.config.base.params?.languages;
    if (!Array.isArray(supported) || languages.some(language => !supported.includes(language)))
      throw Error('Verified Lesson does not support the requested Course document language');
    return {
      id,
      sourceSha: matching.sourceSha,
      importPath: '#lessonsData/' + id.at(-1) + '/' + id + '/index',
      exportName: verified.exportName,
      languages: supported,
      configurator: verified.configurator,
    };
  };

  /**
   * Import aliases can only reference the exact Lesson UUID root already
   * merged to the trusted default branch. This loads that trusted symbol,
   * NEVER a value import from the candidate PR checkout.
   */
  resolve.loadImport = (specifier, name) => {
    const match =
      typeof specifier === 'string' &&
      specifier.match(new RegExp('^#lessonsData/([0-9a-f])/(' + uuid.source.slice(1, -1) + ')/index$'));
    if (!match || match[1] !== match[2].at(-1))
      throw Error('Only canonical trusted Lesson Configurator imports are allowed');
    const result = load(match[2]);
    if (result.exportName !== name) throw Error('Existing Lesson export is not the actual trusted Configurator');
    return result.configurator;
  };
  return resolve;
}
