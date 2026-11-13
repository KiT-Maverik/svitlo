/**
 * Publish an already-prepared, textbook-wide Skill taxonomy.
 *
 * The caller owns configurator.build.props({ languages }), nested composition,
 * child ordering and validation. This module only serializes the completed
 * Props-shaped { base, locale } publication and manages its owned output folder.
 *
 * Each file contains the entire tree: base.json and one <language>.json for
 * each supplied translation. Locale payloads are written as-is; do not add an
 * extra "locale" wrapper or try to deep-merge nested Props arrays here.
 */
import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';

const localePattern = /^[a-z]{2,8}$/;

function assert(condition, message) {
  if (!condition) throw new Error(message);
}

function isRecord(value) {
  return value !== null && typeof value === 'object' && !Array.isArray(value);
}

/** JSON.stringify silently loses undefined, functions and nonfinite numbers. Fail instead. */
function assertJson(value, location, ancestors = new Set()) {
  if (value === null || typeof value === 'string' || typeof value === 'boolean') return;
  if (typeof value === 'number') {
    assert(Number.isFinite(value), 'Nonfinite value in ' + location);
    return;
  }
  assert(typeof value === 'object', 'Non-JSON value in ' + location);
  assert(!ancestors.has(value), 'Circular reference in ' + location);
  assert(
    Array.isArray(value) || Object.getPrototypeOf(value) === Object.prototype || Object.getPrototypeOf(value) === null,
    'Non-plain JSON object in ' + location,
  );
  ancestors.add(value);
  try {
    if (Array.isArray(value)) {
      for (let i = 0; i < value.length; i++) {
        assert(Object.hasOwn(value, i), 'Sparse array in ' + location);
        assertJson(value[i], location + '[' + i + ']', ancestors);
      }
    } else {
      for (const [key, child] of Object.entries(value)) assertJson(child, location + '.' + key, ancestors);
      assert(Object.getOwnPropertySymbols(value).length === 0, 'Symbol keys in ' + location);
    }
  } finally {
    ancestors.delete(value);
  }
}

function serialize(value, context) {
  assertJson(value, context);
  return JSON.stringify(value, null, 2) + '\n';
}

/**
 * Serialize an already-composed Skill tree, not individual Domain/Group/Skill
 * resources. Language keys are the only basis for writing localized files.
 * The caller supplies the desired order of keys and children in each payload.
 *
 * @param {{ base: Record<string, unknown>, locale?: Record<string, Record<string, unknown> | undefined> }} publication
 * @returns {Map<string, string>}
 */
export function renderSkillTree(publication) {
  assert(isRecord(publication), 'Expected a completed Skills publication');
  assert(isRecord(publication.base) && Object.keys(publication.base).length > 0, 'Skills base tree must be nonempty');
  assert(
    publication.locale === undefined || isRecord(publication.locale),
    'Skills locale must be a language-keyed object or undefined',
  );
  const files = new Map([['base.json', serialize(publication.base, 'base')]]);
  for (const [language, payload] of Object.entries(publication.locale ?? {})) {
    assert(localePattern.test(language), 'Invalid Skill language: ' + language);
    if (payload === undefined) continue;
    assert(isRecord(payload) && Object.keys(payload).length > 0, 'Empty Skill translation: ' + language);
    files.set(language + '.json', serialize(payload, 'locale.' + language));
  }
  return files;
}

function currentFiles(root) {
  const files = new Map();
  if (!fs.existsSync(root)) return files;
  assert(
    fs.lstatSync(root).isDirectory() && !fs.lstatSync(root).isSymbolicLink(),
    'Published Skills output must be a real directory: ' + root,
  );
  function visit(dir, relative) {
    for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
      assert(!entry.isSymbolicLink(), 'Symlinks are not permitted in generated output');
      const name = relative ? relative + '/' + entry.name : entry.name;
      if (entry.isDirectory()) visit(path.join(dir, entry.name), name);
      else {
        assert(entry.isFile(), 'Non-file in generated output: ' + name);
        files.set(name, fs.readFileSync(path.join(dir, entry.name), 'utf8'));
      }
    }
  }
  visit(root, '');
  return files;
}

export function checkSkillFiles(root, expected) {
  const actual = currentFiles(root);
  return {
    missing: [...expected.keys()].filter(name => !actual.has(name)),
    changed: [...expected.keys()].filter(name => actual.has(name) && actual.get(name) !== expected.get(name)),
    stale: [...actual.keys()].filter(name => !expected.has(name)),
  };
}

/** Stage the complete output and atomically replace only the Skills directory. */
export function writeSkillFiles(root, files) {
  assert(files instanceof Map && files.has('base.json'), 'Expected Skills files with base.json');
  for (const [name, content] of files) {
    assert(
      name === 'base.json' || (name.endsWith('.json') && localePattern.test(name.slice(0, -5))),
      'Invalid Skills output filename: ' + name,
    );
    assert(typeof content === 'string', 'Expected serialized JSON for ' + name);
  }
  const parent = path.dirname(root);
  fs.mkdirSync(parent, { recursive: true });
  assert(
    !fs.existsSync(root) || (fs.lstatSync(root).isDirectory() && !fs.lstatSync(root).isSymbolicLink()),
    'Refusing to replace a non-directory or symlink: ' + root,
  );
  const staging = fs.mkdtempSync(path.join(parent, '.Skills-staging-'));
  const backup = path.join(parent, '.Skills-backup-' + crypto.randomUUID());
  let backedUp = false;
  try {
    for (const [name, content] of files) fs.writeFileSync(path.join(staging, name), content, 'utf8');
    if (fs.existsSync(root)) {
      fs.renameSync(root, backup);
      backedUp = true;
    }
    try {
      fs.renameSync(staging, root);
    } catch (error) {
      if (backedUp) fs.renameSync(backup, root);
      backedUp = false;
      throw error;
    }
    if (backedUp) fs.rmSync(backup, { recursive: true, force: true });
  } finally {
    if (fs.existsSync(staging)) fs.rmSync(staging, { recursive: true, force: true });
  }
}
