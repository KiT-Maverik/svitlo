#!/usr/bin/env node
/** Copy prebuilt textbook resources without writing into host source or deleting foreign assets. */
import { existsSync, lstatSync, readFileSync, mkdirSync, copyFileSync, writeFileSync, renameSync, rmSync } from 'node:fs';
import { dirname, isAbsolute, join, parse, relative, resolve, sep } from 'node:path';
import { fileURLToPath } from 'node:url';
const id = 'art';
const root = resolve(fileURLToPath(new URL('..', import.meta.url)));
const dist = join(root, 'dist');
const staticRoot = join(dist, 'static');
const manifest = join(dist, 'manifest.json');
const ownedFile = '.svitlo/publish-' + id + '.json';
function fail(message) { throw new Error('svitlo-' + id + ': ' + message); }
function owned(name) {
  return typeof name === 'string' && !isAbsolute(name) &&
    /^(?:data\/pages\/lessons|data\/pages\/skillAnalytics|textbooks\/art)\/[a-zA-Z0-9_./-]+$/.test(name) &&
    name.split('/').every(part => part.length > 0 && part !== '.' && part !== '..');
}
function safePath(path) {
  let cursor = parse(path).root;
  for (const part of path.slice(cursor.length).split(sep).filter(Boolean)) {
    cursor = join(cursor, part);
    if (existsSync(cursor) && lstatSync(cursor).isSymbolicLink()) fail('refusing symlink: ' + cursor);
  }
}
function readManifest(path) {
  let data;
  try { data = JSON.parse(readFileSync(path, 'utf8')); }
  catch (error) { fail('missing or invalid manifest: ' + path + ' (' + error.message + ')'); }
  if (data?.version !== 1 || data.textbook !== id || !Array.isArray(data.files) ||
      data.files.some(name => !owned(name)) || new Set(data.files).size !== data.files.length) {
    fail('invalid ' + id + ' ownership manifest: ' + path);
  }
  return data.files; // A no-content textbook is a legitimate empty manifest.
}
function pathWithin(dir, name) {
  if (!owned(name)) fail('unsafe published path: ' + name);
  const target = resolve(dir, name);
  const rel = relative(dir, target);
  if (!rel || rel === '..' || rel.startsWith('..' + sep) || isAbsolute(rel)) fail('path escapes output: ' + name);
  safePath(target);
  return target;
}
function publish(args) {
  if (args.length !== 3 || args[0] !== 'publish' || args[1] !== '--output' ||
      !args[2] || args[2].startsWith('--')) fail('usage: svitlo-' + id + ' publish --output <directory>');
  const output = resolve(process.cwd(), args[2]);
  safePath(output);
  if (output === parse(output).root || output === resolve(process.cwd()) ||
      output === root || root.startsWith(output + sep) ||
      output === dist || output.startsWith(dist + sep)) fail('unsafe output directory: ' + output);
  if (!existsSync(staticRoot) || !existsSync(manifest)) fail('textbook is not built');
  const names = readManifest(manifest);
  for (const name of names) {
    const source = pathWithin(staticRoot, name);
    if (!existsSync(source) || !lstatSync(source).isFile()) fail('missing built resource: ' + name);
  }
  const ownership = join(output, ownedFile);
  safePath(ownership);
  const previous = existsSync(ownership) ? readManifest(ownership) : [];
  mkdirSync(output, { recursive: true });
  for (const name of names) {
    const destination = pathWithin(output, name);
    mkdirSync(dirname(destination), { recursive: true });
    copyFileSync(pathWithin(staticRoot, name), destination);
  }
  const current = new Set(names);
  for (const name of previous) {
    if (current.has(name)) continue;
    const target = pathWithin(output, name);
    if (existsSync(target)) {
      if (!lstatSync(target).isFile()) fail('stale resource is not a file: ' + name);
      rmSync(target);
    }
  }
  mkdirSync(dirname(ownership), { recursive: true });
  const temporary = ownership + '.tmp-' + process.pid;
  writeFileSync(temporary, JSON.stringify({ version: 1, textbook: id, files: names }, null, 2) + '\n');
  renameSync(temporary, ownership);
  console.log('Published ' + names.length + ' ' + id + ' resources to ' + output);
}
try { publish(process.argv.slice(2)); }
catch (error) { console.error(error.message); process.exitCode = 1; }
