#!/usr/bin/env node
/**
 * @fileoverview Compose an explicitly selected installed content package into
 * the universal Web host; publish atomically staged, validated package resources.
 * No implicit Playground/content fallback or authoring-source imports.
 */
import {
  existsSync, readFileSync, rmSync, mkdirSync, writeFileSync, readdirSync,
  copyFileSync, lstatSync, realpathSync,
} from 'node:fs';
import { resolve, join, relative, isAbsolute, sep, dirname, parse } from 'node:path';
import { spawnSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import { mkdtempSync } from 'node:fs';
import { resolveSelectedTextbook, assertSelectedArtifacts, webRoot } from './resolve-selected-textbook.mjs';

const repoRoot = resolve(webRoot, '../..');
const selected = resolveSelectedTextbook();
const outputRoot = join(webRoot, 'public');
const ownedRoot = join(outputRoot, '.svitlo');
const stagingParent = join(webRoot, '.test-build');
const legacyResource = /^(?:data\/(?:pages\/(?:skillAnalytics|lessons|courses)|(?:skills|lessons|courses|questions|flashcards|assessments))|generated\/skills|textbooks\/[a-z][a-z0-9-]*)\/[a-zA-Z0-9_./-]+$/;

function fail(message) { throw new Error('Web content selection: ' + message); }
function run(command, args, cwd = repoRoot) {
  const result = spawnSync(command, args, { cwd, stdio: 'inherit', env: process.env });
  if (result.error || result.status !== 0) fail(command + ' ' + args.join(' ') + ' failed (' + (result.error?.message ?? result.status) + ')');
}
function safeName(name) {
  return typeof name === 'string' && legacyResource.test(name) &&
    name.split('/').every(part => part !== '.' && part !== '..' && part.length > 0);
}
function safeFile(root, name) {
  if (!safeName(name)) fail('unsafe published resource path: ' + String(name));
  const target = resolve(root, name);
  if (!target.startsWith(resolve(root) + sep) || isAbsolute(name)) fail('resource path escapes host: ' + name);
  let cursor = parse(target).root;
  for (const part of target.slice(cursor.length).split(sep).filter(Boolean)) {
    cursor = join(cursor, part);
    if (existsSync(cursor) && lstatSync(cursor).isSymbolicLink()) fail('symlink in published resource path: ' + cursor);
  }
  return target;
}
function manifestFiles(file, identity) {
  let manifest;
  try { manifest = JSON.parse(readFileSync(file, 'utf8')); }
  catch (error) { fail('missing or malformed ownership manifest ' + file + ': ' + error.message); }
  if (manifest?.version !== 1 || manifest.textbook !== identity || !Array.isArray(manifest.files) ||
      manifest.files.some(name => !safeName(name)) || new Set(manifest.files).size !== manifest.files.length) {
    fail('invalid publication manifest for ' + identity);
  }
  return manifest.files;
}
function existingOwnership() {
  if (!existsSync(ownedRoot)) return [];
  const result = [];
  for (const file of readdirSync(ownedRoot).filter(n => /^publish-[a-z][a-z0-9-]*\.json$/.test(n))) {
    const id = file.slice('publish-'.length, -'.json'.length);
    result.push({ file, files: manifestFiles(join(ownedRoot, file), id) });
  }
  return result;
}
function validateStaged(staged) {
  const manifest = join(staged, '.svitlo', 'publish-' + selected.id + '.json');
  const names = manifestFiles(manifest, selected.id);
  const compiled = manifestFiles(join(selected.root, 'dist', 'manifest.json'), selected.id);
  if (JSON.stringify(names) !== JSON.stringify(compiled)) fail('Publish CLI output disagrees with compiled manifest');
  for (const name of names) {
    const file = safeFile(staged, name);
    if (!existsSync(file) || !lstatSync(file).isFile()) fail('missing published artifact: ' + name);
    if (name.endsWith('.json')) {
      try {
        const value = JSON.parse(readFileSync(file, 'utf8'));
        if (!value || typeof value !== 'object' || Array.isArray(value)) throw Error('expected JSON object');
      } catch (error) { fail('invalid published JSON ' + name + ': ' + error.message); }
    }
  }
  // A published locale requires the matching base. Entire resource categories are optional.
  for (const name of names.filter(n => /^data\/(?:skills|courses|lessons)\//.test(n) && n.endsWith('.json') && !n.endsWith('/base.json'))) {
    const base = name.slice(0, name.lastIndexOf('/') + 1) + 'base.json';
    if (!names.includes(base)) fail('localized resource has no published base: ' + name);
  }
  return names;
}
function buildSelected() {
  const helper = join(repoRoot, 'scripts/ci/packageBuildReuse/package-build-reuse.mjs');
  const rootPackage = join(repoRoot, 'package.json');
  if (existsSync(helper) && existsSync(rootPackage)) {
    const root = JSON.parse(readFileSync(rootPackage, 'utf8'));
    const withinRepo = relative(repoRoot, selected.root).split(sep).join('/');
    if (!withinRepo.startsWith('../') && withinRepo !== '..' && !withinRepo.startsWith('node_modules/')) {
      const workspaces = (root.workspaces ?? []).filter(p => p.endsWith('/*')).map(p => p.slice(0, -1));
      if (workspaces.some(prefix => withinRepo.startsWith(prefix) && !withinRepo.slice(prefix.length).includes('/'))) {
        run(process.execPath, [helper, selected.name]);
      }
    }
  }
}

buildSelected();
assertSelectedArtifacts(selected);
mkdirSync(stagingParent, { recursive: true });
const staging = mkdtempSync(join(stagingParent, 'web-content-'));
try {
  // The same Publish CLI is used for real production package deployment.
  run(process.execPath, [join(selected.root, selected.manifest.bin[selected.cli]), 'publish', '--output', staging], selected.root);
  const names = validateStaged(staging);
  // UI Kit messages are host-owned and independent of the selected content package.
  const localeOutput = join(stagingParent, 'ui-kit-' + process.pid);
  const uiGenerator = join(repoRoot, 'shared/ui-kit/scripts/generateLocales/generateLocales.mjs');
  if (!existsSync(uiGenerator)) fail('host UI Kit locale publisher is unavailable in this build environment');
  run(process.execPath, [uiGenerator, '--package', 'apps/web', '--output', relative(repoRoot, localeOutput)]);
  for (const name of ['assessmentMethods/base.json', 'assessmentMethods/uk.json', 'components/uk.json']) {
    if (!existsSync(join(localeOutput, name))) fail('missing host UI Kit resource: ' + name);
  }

  const previous = existingOwnership();
  const current = new Set(names);
  for (const { file, files } of previous) {
    for (const name of files) {
      if (!current.has(name)) rmSync(safeFile(outputRoot, name), { force: true });
    }
    rmSync(join(ownedRoot, file));
  }
  for (const name of names) {
    const destination = safeFile(outputRoot, name);
    mkdirSync(dirname(destination), { recursive: true });
    copyFileSync(safeFile(staging, name), destination);
  }
  mkdirSync(ownedRoot, { recursive: true });
  copyFileSync(join(staging, '.svitlo', 'publish-' + selected.id + '.json'), join(ownedRoot, 'publish-' + selected.id + '.json'));
  rmSync(join(outputRoot, 'data/uiKit'), { recursive: true, force: true });
  mkdirSync(join(outputRoot, 'data/uiKit'), { recursive: true });
  for (const directory of ['components', 'assessmentMethods', 'educationStandards']) {
    const source = join(localeOutput, directory);
    if (existsSync(source)) {
      // A separate host-owned subtree cannot conflict with textbook resources.
      const target = join(outputRoot, 'data/uiKit', directory);
      mkdirSync(target, { recursive: true });
      for (const name of readdirSync(source)) {
        copyFileSync(join(source, name), join(target, name));
      }
    }
  }
  rmSync(localeOutput, { recursive: true, force: true });

  const generated = join(webRoot, 'src/generated');
  mkdirSync(generated, { recursive: true });
  const source = '// Generated by prepare-textbook.mjs for explicit SVITLO_TEXTBOOK=' + selected.name + '.\n';
  writeFileSync(join(generated, 'selectedTextbook.json'), JSON.stringify({
    name: selected.name, id: selected.id, hasScenes: selected.hasScenes, hasStyles: selected.hasStyles,
  }, null, 2) + '\n');
  writeFileSync(join(generated, 'textbook.ts'), source +
    "import type { TextbookDescriptor } from '@/lib/textbookDescriptor';\n" +
    "import { textbook as selectedTextbook } from '" + selected.name + "';\n" +
    'export const textbook: TextbookDescriptor = selectedTextbook;\n');
  writeFileSync(join(generated, 'textbookScenes.ts'), source + (selected.hasScenes ?
    "export { resolveScene, preloadScene } from '" + selected.name + "/scenes';\n" :
    "import type { SceneRegistry } from '@svitlo/ui-kit';\n" +
    "export const resolveScene: SceneRegistry = () => undefined;\n" +
    "export async function preloadScene(id: string): Promise<void> { throw new Error('No Scene registry in selected package: ' + id); }\n"));
  writeFileSync(join(generated, 'textbookStyles.ts'), source +
    (selected.hasStyles ? "import '" + selected.name + "/styles';\n" : 'export {};\n'));
  console.log('Prepared explicitly selected ' + selected.name + ' (' + names.length + ' published resources) for Web');
} finally {
  rmSync(staging, { recursive: true, force: true });
}
