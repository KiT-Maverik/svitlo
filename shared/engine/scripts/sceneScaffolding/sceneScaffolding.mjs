#!/usr/bin/env node
/**
 * @fileoverview Create-only, source-owned executable React Scene scaffolding.
 *
 * Accepts a Scene, Lesson, Episode or Course YAML authoring document. Scene
 * identity belongs to its config and implementation guidance belongs to its
 * own production.specification; neither is inferred from a Lesson filename.
 * Generates Draft-only, compilable React stubs and explicitly synchronizes
 * the existing textbook lazy Scene registry. Never writes authored Config.
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import yaml from 'yaml';
import { syncSceneRegistry } from '../../../../scripts/textbook-tooling/generateScenes/generate-scenes.mjs';

export const repoRoot = path.resolve(fileURLToPath(new URL('../../../..', import.meta.url)));

const isRecord = value => value !== null && typeof value === 'object' && !Array.isArray(value);
const uuid = /^[0-9a-f]{8}-(?:[0-9a-f]{4}-){3}[0-9a-f]{12}$/;
const slug = /^[A-Za-z][A-Za-z0-9]*$/;
const language = /^[a-z]{2,3}(?:-[A-Za-z0-9]{2,8})?$/;

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

/** Select an explicit authoring source without guessing a textbook or Lesson. */
function resolveSource(source, repo) {
  const location = path.resolve(repo, source);
  noSymlinks(location);
  const stat = fs.statSync(location);
  let file = location;
  if (stat.isDirectory()) {
    const candidates = ['scene.yaml', 'lesson.yaml', 'course.yaml']
      .map(name => path.join(location, name))
      .filter(candidate => fs.existsSync(candidate));
    if (candidates.length !== 1)
      throw new Error('Source directory must contain exactly one scene.yaml, lesson.yaml or course.yaml: ' + location);
    file = candidates[0];
  }
  noSymlinks(file);
  if (!fs.statSync(file).isFile() || !/\.ya?ml$/.test(file))
    throw new Error('Expected a regular YAML Scene authoring source: ' + file);
  const relative = path.relative(repo, file).split(path.sep).join('/');
  const match = /^content\/((?:languages\/)?[a-z][a-z-]*)\/.+\.ya?ml$/.exec(relative);
  if (!match) throw new Error('Scene source must be inside content/<book>/');
  return { file, bookRoot: path.join(repo, 'content', match[1]) };
}

/** Prevent accidentally adding Scenes to an unrelated textbook workspace. */
function assertSceneWorkspace(bookRoot) {
  noSymlinks(bookRoot);
  const manifest = JSON.parse(fs.readFileSync(path.join(bookRoot, 'package.json'), 'utf8'));
  const tsconfig = JSON.parse(fs.readFileSync(path.join(bookRoot, 'tsconfig.json'), 'utf8'));
  const includes = tsconfig.include ?? [];
  const covers = ext => includes.some(value =>
    value === 'scenes/**/*' || value === 'scenes/**' ||
    value === 'scenes/**/*.{ts,tsx}' || value === 'scenes/**/*.{tsx,ts}' ||
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
      'TS/TSX tsconfig inclusion, React, Engine, UI Kit and Vitest: ' + bookRoot,
    );
  }
  return manifest.name;
}

export function sceneComponentName(authoredSlug) {
  if (typeof authoredSlug !== 'string' || !slug.test(authoredSlug))
    throw new Error('Unsafe Scene slug (expected PascalCase or lowerCamelCase): ' + String(authoredSlug));
  return authoredSlug[0].toUpperCase() + authoredSlug.slice(1);
}

export function sceneSymbols(authoredSlug) {
  const component = sceneComponentName(authoredSlug);
  return { component, configurator: component + 'Config' };
}

/**
 * Recognize the same {config, production} authoring nodes in both parent
 * trees, including nested Carousel and Quest Scenes. An unwrapped Engine
 * Config node may instead carry its own production sibling (Course Episode).
 */
export function readScenes(file, selectedLanguage) {
  const document = yaml.parseDocument(fs.readFileSync(file, 'utf8'), {
    strict: true, uniqueKeys: true, version: '1.2',
  });
  if (document.errors.length)
    throw new Error(path.basename(file) + ': ' + document.errors.map(x => x.message).join('; '));
  const root = document.toJS({ maxAliasCount: 0 });
  if (!isRecord(root)) throw new Error('Scene source must be a YAML object');

  const declaredLanguage = root.production?.documentLanguage ?? root.documentLanguage;
  if (selectedLanguage !== undefined && declaredLanguage !== undefined && selectedLanguage !== declaredLanguage)
    throw new Error('--document-language conflicts with source documentLanguage');
  const documentLanguage = selectedLanguage ?? declaredLanguage;
  if (typeof documentLanguage !== 'string' || !language.test(documentLanguage))
    throw new Error('Scene source requires a valid documentLanguage or explicit --document-language');

  const scenes = [];
  function addScene(config, production, location) {
    if (!uuid.test(config.id ?? '')) throw new Error('Invalid Scene UUID at ' + location);
    const symbols = sceneSymbols(config.slug);
    if (!isRecord(production) || typeof production.specification !== 'string' ||
        !production.specification.trim()) {
      throw new Error('Scene ' + config.id + ' needs its own production.specification at ' + location);
    }
    scenes.push({
      id: config.id,
      slug: config.slug,
      ...symbols,
      specification: production.specification,
      documentLanguage,
    });
  }
  function visit(node, location) {
    if (Array.isArray(node)) {
      node.forEach((entry, index) => visit(entry, location + '[' + index + ']'));
      return;
    }
    if (!isRecord(node)) return;
    if (isRecord(node.config) && typeof node.config.type === 'string') {
      if (node.config.type === 'scene') addScene(node.config, node.production, location);
      else visit(node.config, location + '.config');
      return;
    }
    if (node.type === 'scene') {
      addScene(node, node.production, location);
      return;
    }
    // Do not search localized values and editorial text for entities.
    for (const [key, value] of Object.entries(node)) {
      if (!['production', 'locale', 'params', 'events', 'review'].includes(key))
        visit(value, location + '.' + key);
    }
  }
  visit(root, '$');
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

/** No fabricated learning content, translations, interactions or test evidence. */
export function renderSceneFiles(scene) {
  const { id, component: name, documentLanguage, specification } = scene;
  if (typeof specification !== 'string' || !specification.trim())
    throw new Error('Scene ' + id + ' needs production.specification; refusing to invent it');
  const files = new Map();
  files.set('specification.md', specification.trimEnd() + '\n');
  files.set('index.ts', "export { " + name + " as default } from './" + name + "';\n");
  files.set(name + '.constants.ts', [
    'export const testIds = {',
    '  root: ' + JSON.stringify('scene-' + id) + ',',
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
    "import { SceneStub } from '@svitlo/ui-kit';",
    "import { testIds } from './" + name + ".constants';",
    "import styles from './" + name + ".module.css';",
    '',
    'export type ' + name + 'Props = {',
    "  locales: ContentBlock_Scene_Props['locale']['value'];",
    '};',
    '',
    'export function ' + name + '({ locales }: ' + name + 'Props) {',
    '  // TODO (BLOCKER): Implement Scene ' + id + ' using specification.md.',
    '  // Author only verified ' + documentLanguage + ' content and accessible interactions.',
    '  return (',
    '    <div className={styles.root} data-testid={testIds.root}>',
    '      <SceneStub locales={locales} />',
    '    </div>',
    '  );',
    '}',
    '',
  ].join('\n'));
  files.set(name + '.stories.tsx', [
    "import type { ComponentProps } from 'react';",
    "import { " + name + " } from './" + name + "';",
    '',
    'export default { title: ' + JSON.stringify('Scenes/' + name) + ', component: ' + name + ' };',
    '',
    '// Empty locale input is used only to preview the invariant Draft placeholder.',
    'export const DraftPreview = {',
    '  args: { locales: {} },',
    '} satisfies { args: ComponentProps<typeof ' + name + '> };',
    '',
  ].join('\n'));
  files.set(name + '.unit.spec.tsx', [
    "import { renderToStaticMarkup } from 'react-dom/server';",
    "import { describe, expect, it } from 'vitest';",
    "import { " + name + " } from './" + name + "';",
    '',
    "describe('" + name + "', () => {",
    "  it('renders an accessible Draft placeholder', () => {",
    '    const html = renderToStaticMarkup(<' + name + ' locales={{}} />);',
    "    expect(html).toContain('role=\"status\"');",
    "    expect(html).toContain('Not implemented');",
    '  });',
    "  it.todo('implements the approved Scene interactions and state transitions');",
    "  it.todo('provides source-language accessibility and keyboard/touch parity');",
    '});',
    '',
  ].join('\n'));
  return files;
}

/**
 * Generate only new UUID folders; existing Scene implementation/spec/story/test
 * always wins. Registry update is explicit here, not in unrelated builds.
 */
export async function runOne(source, mode = 'check', repo = repoRoot, selectedSceneId, selectedLanguage) {
  if (!['generate', 'check'].includes(mode)) throw new Error('Mode must be generate or check');
  const { file, bookRoot } = resolveSource(source, repo);
  const packageName = assertSceneWorkspace(bookRoot);
  if (selectedSceneId !== undefined && !uuid.test(selectedSceneId))
    throw new Error('Expected --scene-id to be a canonical Scene UUID');
  const all = readScenes(file, selectedLanguage);
  const scenes = selectedSceneId === undefined ? all : all.filter(x => x.id === selectedSceneId);
  if (selectedSceneId && !scenes.length)
    throw new Error('Scene UUID is not present in the selected source: ' + selectedSceneId);
  if (!scenes.length) throw new Error('No Scene nodes found in the selected source');
  const plans = [];
  const results = [];
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
  // The canonical generator produces the only runtime registry format.
  await syncSceneRegistry(bookRoot, mode === 'generate' ? '--write' : '--check', packageName);
  if (mode === 'generate') await syncSceneRegistry(bookRoot, '--check', packageName);
  return results.sort((a, b) => a.id.localeCompare(b.id));
}

export async function main(args = process.argv.slice(2), repo = repoRoot) {
  const [mode, ...rest] = args;
  if (!['generate', 'check'].includes(mode)) throw new Error('Expected generate|check');
  let source;
  let selectedSceneId;
  let selectedLanguage;
  for (let i = 0; i < rest.length; i += 2) {
    if (rest[i] === '--source' && rest[i + 1] && source === undefined) source = rest[i + 1];
    else if (rest[i] === '--scene-id' && rest[i + 1] && selectedSceneId === undefined)
      selectedSceneId = rest[i + 1];
    else if (rest[i] === '--document-language' && rest[i + 1] && selectedLanguage === undefined)
      selectedLanguage = rest[i + 1];
    else throw new Error('Usage: sceneScaffolding.mjs generate|check --source content/<book>/.../source.yaml [--scene-id UUID] [--document-language LANG]');
  }
  if (!source) throw new Error('Scene scaffolding needs an explicit --source YAML file');
  const results = await runOne(source, mode, repo, selectedSceneId, selectedLanguage);
  for (const result of results)
    console.log(result.skipped
      ? 'SKIP Scene ' + result.id + ': existing UUID directory; no authored files modified'
      : 'Scene ' + result.id + ': ' + (mode === 'check' ? 'scaffold files and registry verified' : result.changed + ' files written'));
  console.log('Processed ' + results.length + ' Scene(s); canonical registry verified');
  return results;
}

if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  main().catch(error => {
    console.error(error.message);
    process.exitCode = 1;
  });
}
