#!/usr/bin/env node
/**
 * Framework-agnostic copier for already-built textbook resources.
 * A per-textbook manifest tracks ownership without deleting host resources.
 */
import {
  existsSync,
  lstatSync,
  readFileSync,
  mkdirSync,
  copyFileSync,
  writeFileSync,
  renameSync,
  rmSync,
} from 'node:fs';
import { dirname, isAbsolute, join, parse, relative, resolve, sep } from 'node:path';
import { fileURLToPath } from 'node:url';

const packageRoot = resolve(fileURLToPath(new URL('..', import.meta.url)));
const dist = join(packageRoot, 'dist');
const staticRoot = join(dist, 'static');
const manifestFile = join(dist, 'manifest.json');
const ownerFile = '.svitlo/publish-psychology.json';

function fail(reason) {
  throw new Error('svitlo-psychology: ' + reason);
}
function owned(name) {
  return (
    typeof name === 'string' &&
    !isAbsolute(name) &&
    /^(?:data\/pages\/lessons|data\/pages\/skillAnalytics|textbooks\/psychology)\/[a-zA-Z0-9_./-]+$/.test(name) &&
    name.split('/').every(part => part !== '.' && part !== '..' && part.length > 0)
  );
}
function safePath(path) {
  let cursor = parse(path).root;
  for (const part of path.slice(cursor.length).split(sep).filter(Boolean)) {
    cursor = join(cursor, part);
    if (existsSync(cursor) && lstatSync(cursor).isSymbolicLink()) fail('refusing symlink: ' + cursor);
  }
}
function readManifest(path) {
  let document;
  try {
    document = JSON.parse(readFileSync(path, 'utf8'));
  } catch (error) {
    fail('missing or invalid build manifest ' + path + ' (' + error.message + ')');
  }
  if (
    document?.version !== 1 ||
    document.textbook !== 'psychology' ||
    !Array.isArray(document.files) ||
    document.files.some(name => !owned(name)) ||
    new Set(document.files).size !== document.files.length
  ) {
    fail('invalid Психологія ownership manifest: ' + path);
  }
  return document.files;
}
function outputPath(root, name) {
  if (!owned(name)) fail('unsafe published path: ' + name);
  const target = resolve(root, name);
  const rel = relative(root, target);
  if (!rel || rel === '..' || rel.startsWith('..' + sep) || isAbsolute(rel)) fail('path escapes output: ' + name);
  safePath(target);
  return target;
}
function publish(args) {
  if (args.length !== 3 || args[0] !== 'publish' || args[1] !== '--output' || !args[2] || args[2].startsWith('--')) {
    fail('usage: svitlo-psychology publish --output <directory>');
  }
  const output = resolve(process.cwd(), args[2]);
  safePath(output);
  if (
    output === parse(output).root ||
    output === resolve(process.cwd()) ||
    output === packageRoot ||
    packageRoot.startsWith(output + sep) ||
    output === dist ||
    output.startsWith(dist + sep)
  ) {
    fail('unsafe output directory: ' + output);
  }
  if (!existsSync(staticRoot) || !existsSync(manifestFile)) {
    fail('textbook is not built; run npm run build --workspace @svitlo/psychology first');
  }
  const files = readManifest(manifestFile);
  for (const name of files) {
    const source = outputPath(staticRoot, name);
    if (!existsSync(source) || !lstatSync(source).isFile()) fail('missing built resource: ' + name);
  }
  const ownership = join(output, ownerFile);
  safePath(ownership);
  const previous = existsSync(ownership) ? readManifest(ownership) : [];
  mkdirSync(output, { recursive: true });
  for (const name of files) {
    const source = outputPath(staticRoot, name);
    const destination = outputPath(output, name);
    mkdirSync(dirname(destination), { recursive: true });
    copyFileSync(source, destination);
  }
  const current = new Set(files);
  for (const name of previous) {
    if (current.has(name)) continue;
    const stale = outputPath(output, name);
    if (existsSync(stale)) {
      if (!lstatSync(stale).isFile()) fail('stale resource is not a file: ' + name);
      rmSync(stale);
    }
  }
  mkdirSync(dirname(ownership), { recursive: true });
  const temporary = ownership + '.tmp-' + process.pid;
  writeFileSync(temporary, JSON.stringify({ version: 1, textbook: 'psychology', files }, null, 2) + '\n');
  renameSync(temporary, ownership);
  console.log('Published ' + files.length + ' Психологія resources to ' + output);
}
try {
  publish(process.argv.slice(2));
} catch (error) {
  console.error(error.message);
  process.exitCode = 1;
}
