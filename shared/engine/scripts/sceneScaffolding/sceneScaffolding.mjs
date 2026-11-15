#!/usr/bin/env node
/**
 * @fileoverview Opt-in React Scene draft scaffolder.
 *
 * Reads a Lesson's paired config/production YAML but does NOT generate
 * defineScene modules, mutate Lesson sources, validate/publish Props, or
 * register unfinished React components. The Lesson Builder owns the first
 * boundary; this separate specialist handoff owns executable Scene drafts.
 *
 * An existing Scene UUID directory is always SKIP (no merge/no overwrite).
 * Every newly created TS/TSX module parses, but unfinished components and
 * Storybook locale fixtures deliberately retain unresolved TypeScript names.
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import yaml from 'yaml';
import { splitScaffoldDocument } from '../yamlScaffolding/productionScaffolding.mjs';

export const repoRoot = path.resolve(fileURLToPath(new URL('../../../..', import.meta.url)));

const isRecord = value => value !== null && typeof value === 'object' && !Array.isArray(value);
const uuid = /^[0-9a-f]{8}-(?:[0-9a-f]{4}-){3}[0-9a-f]{12}$/;
const slug = /^[A-Za-z][A-Za-z0-9]*$/;

function noSymlinks(location) {
  let current = path.parse(path.resolve(location)).root;
  for (const part of path.resolve(location).slice(current.length).split(path.sep).filter(Boolean)) {
    current = path.join(current, part);
    try {
      if (fs.lstatSync(current).isSymbolicLink()) throw new Error('Refusing symlink: ' + current);
    } catch (error) {
      if (error.code !== 'ENOENT') throw error;
    }
  }
}

/** Do not infer identities or choose a textbook from the current directory. */
function resolveSource(source, repo) {
  const location = path.resolve(repo, source);
  noSymlinks(location);
  const file = fs.statSync(location).isDirectory() ? path.join(location, 'config.yaml') : location;
  if (path.basename(file) !== 'config.yaml') throw new Error('Expected a Lesson config.yaml');
  noSymlinks(file);
  if (!fs.statSync(file).isFile()) throw new Error('Expected a regular config.yaml');
  const relative = path.relative(repo, file).split(path.sep).join('/');
  const match = /^content\/((?:languages\/)?[a-z][a-z-]*)\/.+\/config\.yaml$/.exec(relative);
  if (!match) throw new Error('Lesson config.yaml must be inside content/<book>/');
  const bookRoot = path.join(repo, 'content', match[1]);
  return { file, bookRoot };
}

/**
 * An executable Scene requires an actual textbook Scene registry and TSX
 * workspace support. Never silently introduce app-level dependencies.
 */
function assertSceneWorkspace(bookRoot) {
  noSymlinks(bookRoot);
  const manifest = JSON.parse(fs.readFileSync(path.join(bookRoot, 'package.json'), 'utf8'));
  const tsconfig = JSON.parse(fs.readFileSync(path.join(bookRoot, 'tsconfig.json'), 'utf8'));
  const includes = tsconfig.include ?? [];
  const covers = ext => includes.some(value =>
    value === 'scenes/**/*' || value === 'scenes/**' || value === 'scenes/**/*.{' + (ext === 'ts' ? 'ts,tsx' : 'tsx,ts') + '}' ||
    value === 'scenes/**/*.' + ext
  );
  if (!manifest.exports?.['./scenes'] ||
      !manifest.scripts?.['content:generate:scenes'] ||
      !fs.existsSync(path.join(bookRoot, 'scenes/createSceneRegistry.ts')) ||
      !fs.existsSync(path.join(bookRoot, 'scenes/sceneLoader.ts')) ||
      !covers('ts') || !covers('tsx') ||
      !(manifest.dependencies?.react || manifest.devDependencies?.react) ||
      !(manifest.dependencies?.['@svitlo/engine'] || manifest.devDependencies?.['@svitlo/engine']) ||
      !(manifest.dependencies?.['@svitlo/ui-kit'] || manifest.devDependencies?.['@svitlo/ui-kit']) ||
      !(manifest.devDependencies?.vitest || manifest.dependencies?.vitest)) {
    throw new Error(
      'Textbook is not Scene-ready: requires ./scenes export, registry/generator, ' +
      'TS/TSX tsconfig inclusion, React, Engine, UI Kit, and Vitest: ' + bookRoot,
    );
  }
}

/** PascalCase executable name; existing lowerCamelCase Config slugs remain usable. */
export function sceneComponentName(authoredSlug) {
  if (typeof authoredSlug !== 'string' || !slug.test(authoredSlug))
    throw new Error('Unsafe Scene slug (expected PascalCase or legacy lowerCamelCase): ' + String(authoredSlug));
  return authoredSlug[0].toUpperCase() + authoredSlug.slice(1);
}

/** Keep Configurator and executable component symbols distinct at the handoff. */
export function sceneSymbols(authoredSlug) {
  const component = sceneComponentName(authoredSlug);
  return { component, configurator: component + 'Config' };
}

function readScenes(file) {
  const document = yaml.parseDocument(fs.readFileSync(file, 'utf8'), {
    strict: true, uniqueKeys: true, version: '1.2',
  });
  if (document.errors.length) throw new Error('config.yaml: ' + document.errors.map(x => x.message).join('; '));
  const { config, documentLanguage, tasks } = splitScaffoldDocument(document.toJS({ maxAliasCount: 0 }));
  if (config.type !== 'lesson') throw new Error('config.yaml: expected a Lesson root');
  if (typeof documentLanguage !== 'string' || !documentLanguage)
    throw new Error('config.yaml: production.documentLanguage is required');
  const specs = new Map();
  for (const task of tasks) {
    if (task.type !== 'scene') continue;
    if (specs.has(task.id)) throw new Error('Duplicate Scene production identity: ' + task.id);
    specs.set(task.id, task.production.specification);
  }
  const scenes = [];
  function visit(value) {
    if (!isRecord(value)) {
      if (Array.isArray(value)) value.forEach(visit);
      return;
    }
    if (value.type === 'scene' && Object.hasOwn(value, 'id')) {
      if (!uuid.test(value.id)) throw new Error('Invalid Scene UUID: ' + String(value.id));
      const symbols = sceneSymbols(value.slug);
      const specification = specs.get(value.id);
      scenes.push({ id: value.id, slug: value.slug, ...symbols, specification, documentLanguage });
    }
    for (const entry of Object.values(value)) visit(entry);
  }
  visit(config);
  const ids = new Set();
  const names = new Set();
  for (const scene of scenes) {
    if (ids.has(scene.id)) throw new Error('Duplicate Scene UUID: ' + scene.id);
    if (names.has(scene.component)) throw new Error('Colliding Scene component name: ' + scene.component);
    ids.add(scene.id);
    names.add(scene.component);
  }
  return scenes.sort((a, b) => a.id.localeCompare(b.id));
}

/**
 * Pure template rendering: no fabricated learning content, translations,
 * accessible labels, or test outcomes. The source specification is verbatim
 * apart from a single normalized final newline, as in Lesson Builder.
 */
export function renderSceneFiles(scene) {
  const { id, component: name, documentLanguage, specification } = scene;
  if (typeof specification !== 'string' || !specification.trim())
    throw new Error('Scene ' + id + ' needs production.specification; refusing to invent it');
  const rootTestId = 'scene-' + id;
  const files = new Map();
  files.set('specification.md', specification.trimEnd() + '\n');
  files.set('index.ts', "export { " + name + " as default } from './" + name + "';\n");
  files.set(name + '.constants.ts', [
    'export const testIds = {',
    '  root: ' + JSON.stringify(rootTestId) + ',',
    '} as const;',
    '',
  ].join('\n'));
  files.set(name + '.module.css', [
    '.root {',
    '  inline-size: 100%;',
    '  min-inline-size: 0;',
    '}',
    '',
  ].join('\n'));
  files.set(name + '.tsx', [
    "'use client';",
    '',
    "import type { ContentBlock_Scene_Props } from '@svitlo/engine/runtime';",
    "import { testIds } from './" + name + ".constants';",
    "import styles from './" + name + ".module.css';",
    '',
    'export type ' + name + 'Props = {',
    "  locales: ContentBlock_Scene_Props['locale']['value'];",
    '};',
    '',
    'export function ' + name + '({ locales }: ' + name + 'Props) {',
    '  void locales;',
    '  // TODO(scene): implement the approved Scene specification and its accessible,',
    '  // source-language (' + documentLanguage + ') interactions before building this textbook.',
    '  // The unresolved identifier deliberately prevents an incomplete Scene from typechecking.',
    '  return <section className={styles.root} data-testid={testIds.root}>{sceneImplementationRequired}</section>;',
    '}',
    '',
  ].join('\n'));
  files.set(name + '.stories.tsx', [
    "import type { ComponentProps } from 'react';",
    "import { " + name + " } from './" + name + "';",
    '',
    'export default { title: ' + JSON.stringify('Scenes/' + name) + ', component: ' + name + ' };',
    '',
    'export const SourceLanguage = {',
    '  args: {',
    '    // TODO(i18n): use a verified ' + documentLanguage + ' fixture from the Lesson source, not invented copy.',
    '    locales: sceneSourceLocaleRequired,',
    '  },',
    '} satisfies { args: ComponentProps<typeof ' + name + '> };',
    '',
  ].join('\n'));
  files.set(name + '.spec.tsx', [
    "import { describe, it } from 'vitest';",
    '',
    "describe('" + name + "', () => {",
    "  it.todo('implements the approved Scene interactions and state transitions');",
    "  it.todo('provides source-locale accessibility and keyboard/touch parity');",
    '});',
    '',
  ].join('\n'));
  return files;
}

/**
 * Creation-only. check mode verifies handoff file presence, not byte identity:
 * implementation/stories/specification become human-owned after creation.
 */
export function runOne(source, mode = 'check', repo = repoRoot, selectedSceneId) {
  if (!['generate', 'check'].includes(mode)) throw new Error('Mode must be generate or check');
  const { file, bookRoot } = resolveSource(source, repo);
  assertSceneWorkspace(bookRoot);
  if (selectedSceneId !== undefined && !uuid.test(selectedSceneId))
    throw new Error('Expected --scene-id to be a canonical Scene UUID');
  const all = readScenes(file);
  const scenes = selectedSceneId === undefined ? all : all.filter(x => x.id === selectedSceneId);
  if (selectedSceneId && !scenes.length)
    throw new Error('Scene UUID is not present in this Lesson: ' + selectedSceneId);
  const plans = [];
  const results = [];
  // Validate all pending scenes before the first write.
  for (const scene of scenes) {
    const directory = path.join(bookRoot, 'scenes', scene.id.at(-1), scene.id);
    noSymlinks(directory);
    if (mode === 'generate' && fs.existsSync(directory)) {
      results.push({ id: scene.id, changed: 0, skipped: true });
      continue;
    }
    const files = renderSceneFiles(scene);
    for (const filename of files.keys()) noSymlinks(path.join(directory, filename));
    if (mode === 'check') {
      for (const filename of files.keys()) {
        const target = path.join(directory, filename);
        if (!fs.existsSync(target) || !fs.statSync(target).isFile())
          throw new Error('Missing Scene scaffold file: ' + target);
      }
      results.push({ id: scene.id, changed: 0, skipped: false });
    } else {
      plans.push({ scene, directory, files });
    }
  }
  if (mode === 'generate') {
    for (const { scene, directory, files } of plans) {
      fs.mkdirSync(directory, { recursive: true });
      for (const [filename, content] of files)
        fs.writeFileSync(path.join(directory, filename), content, { flag: 'wx' });
      results.push({ id: scene.id, changed: files.size, skipped: false });
    }
  }
  return results.sort((a, b) => a.id.localeCompare(b.id));
}

export function main(args = process.argv.slice(2), repo = repoRoot) {
  const [mode, ...rest] = args;
  if (!['generate', 'check'].includes(mode)) throw new Error('Expected generate|check');
  let source;
  let selectedSceneId;
  for (let i = 0; i < rest.length; i += 2) {
    if (rest[i] === '--source' && rest[i + 1] && source === undefined) source = rest[i + 1];
    else if (rest[i] === '--scene-id' && rest[i + 1] && selectedSceneId === undefined)
      selectedSceneId = rest[i + 1];
    else throw new Error('Usage: sceneScaffolding.mjs generate|check --source content/<book>/.../config.yaml [--scene-id UUID]');
  }
  if (!source) throw new Error('Scene scaffolding needs an explicit --source Lesson config.yaml');
  const results = runOne(source, mode, repo, selectedSceneId);
  for (const result of results)
    console.log(result.skipped
      ? 'SKIP Scene ' + result.id + ': existing UUID directory; no files modified'
      : 'Scene ' + result.id + ': ' + (mode === 'check' ? 'scaffold files present' : result.changed + ' files written'));
  console.log('Processed ' + results.length + ' Scene(s); registry not modified');
  return results;
}

if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  try { main(); } catch (error) {
    console.error(error.message);
    process.exitCode = 1;
  }
}
