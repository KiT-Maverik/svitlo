#!/usr/bin/env node
/**
 * Self-contained Publish CLI. Copied into dist/publish.mjs during textbook
 * build and shipped by npm pack; it has no monorepo or Engine dependency.
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

const dist = dirname(fileURLToPath(import.meta.url));
const root = dirname(dist);
function fail(reason) {
  throw new Error('svitlo textbook publish: ' + reason);
}
const pkg = JSON.parse(readFileSync(join(root, 'package.json'), 'utf8'));
const id = pkg.name?.match(/^@svitlo\/([a-z][a-z-]*)$/)?.[1];
if (!id || resolve(root, 'dist') !== dist) fail('invalid package identity or CLI location');
const staticRoot = join(dist, 'static');
const manifestFile = join(dist, 'manifest.json');
const ownershipName = '.svitlo/publish-' + id + '.json';

function owned(name) {
  return (
    typeof name === 'string' &&
    !isAbsolute(name) &&
    /^(?:data\/pages\/lessons|data\/pages\/courses|data\/pages\/skillAnalytics|textbooks\/[a-z][a-z-]*)\/[a-zA-Z0-9_./-]+$/.test(
      name,
    ) &&
    (name.startsWith('data/') || name.startsWith('textbooks/' + id + '/')) &&
    name.split('/').every(part => part && part !== '.' && part !== '..')
  );
}
function safePath(target) {
  let cursor = parse(target).root;
  for (const part of target.slice(cursor.length).split(sep).filter(Boolean)) {
    cursor = join(cursor, part);
    if (existsSync(cursor) && lstatSync(cursor).isSymbolicLink()) fail('refusing symlink: ' + cursor);
  }
}
function readManifest(filename) {
  let data;
  try {
    data = JSON.parse(readFileSync(filename, 'utf8'));
  } catch (error) {
    fail('missing or invalid ownership manifest: ' + filename + ' (' + error.message + ')');
  }
  if (
    data?.version !== 1 ||
    data.textbook !== id ||
    !Array.isArray(data.files) ||
    data.files.some(name => !owned(name)) ||
    new Set(data.files).size !== data.files.length
  ) {
    fail('invalid ' + id + ' ownership manifest: ' + filename);
  }
  return data.files;
}
function outputPath(base, name) {
  if (!owned(name)) fail('unsafe published path: ' + name);
  const target = resolve(base, name);
  const rel = relative(base, target);
  if (!rel || rel === '..' || rel.startsWith('..' + sep) || isAbsolute(rel)) {
    fail('path escapes output: ' + name);
  }
  safePath(target);
  return target;
}
function publish(args) {
  if (args.length !== 3 || args[0] !== 'publish' || args[1] !== '--output' || !args[2] || args[2].startsWith('--')) {
    fail('usage: svitlo-' + id + ' publish --output <directory>');
  }
  const output = resolve(process.cwd(), args[2]);
  safePath(output);
  if (
    output === parse(output).root ||
    output === resolve(process.cwd()) ||
    output === root ||
    root.startsWith(output + sep) ||
    output === dist ||
    output.startsWith(dist + sep)
  ) {
    fail('unsafe output directory: ' + output);
  }
  if (!existsSync(staticRoot) || !existsSync(manifestFile)) fail('textbook is not built');
  const names = readManifest(manifestFile);
  if (
    id === 'playground' &&
    (!names.some(name => name.startsWith('data/pages/lessons/')) ||
      !names.some(name => name.startsWith('data/pages/skillAnalytics/')))
  ) {
    fail('missing required lesson or analytics resources in build');
  }
  for (const name of names) {
    const source = outputPath(staticRoot, name);
    if (!existsSync(source) || !lstatSync(source).isFile()) fail('missing built resource: ' + name);
  }
  const ownership = join(output, ownershipName);
  safePath(ownership);
  const previous = existsSync(ownership) ? readManifest(ownership) : [];
  mkdirSync(output, { recursive: true });
  for (const name of names) {
    const destination = outputPath(output, name);
    mkdirSync(dirname(destination), { recursive: true });
    copyFileSync(outputPath(staticRoot, name), destination);
  }
  const current = new Set(names);
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
  writeFileSync(temporary, JSON.stringify({ version: 1, textbook: id, files: names }, null, 2) + '\n');
  renameSync(temporary, ownership);
  console.log('Published ' + names.length + ' ' + id + ' resources to ' + output);
}
try {
  publish(process.argv.slice(2));
} catch (error) {
  console.error(error.message);
  process.exitCode = 1;
}
