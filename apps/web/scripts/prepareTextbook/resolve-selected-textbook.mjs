/**
 * @fileoverview Resolve a build-selected Svitlo content package through its
 * installed npm identity and compiled public contract, never a Web catalog.
 */
import { existsSync, lstatSync, readFileSync, realpathSync, statSync } from 'node:fs';
import { createRequire } from 'node:module';
import { dirname, join, resolve, sep } from 'node:path';
import { fileURLToPath } from 'node:url';

export const webRoot = fileURLToPath(new URL('../..', import.meta.url));
const requireFromWeb = createRequire(join(webRoot, 'package.json'));

export function selectedPackageName(input = process.env.SVITLO_TEXTBOOK) {
  if (!input)
    throw new Error(
      'SVITLO_TEXTBOOK is required. Supply an installed Svitlo content package explicitly (e.g. SVITLO_TEXTBOOK=math).',
    );
  if (!/^(?:@svitlo\/)?[a-z][a-z0-9-]*$/.test(input)) {
    throw new Error('Unsafe SVITLO_TEXTBOOK value: expected a Svitlo package slug or @svitlo/<slug>, not a path.');
  }
  return input.startsWith('@svitlo/') ? input : '@svitlo/' + input;
}

function publicExport(pkg, key, optional = false) {
  const entry = pkg.exports?.[key];
  if (optional && !entry) return null;
  if (!entry || typeof entry !== 'object' || typeof entry.default !== 'string') {
    throw new Error(pkg.name + ' is missing a compiled public export ' + key);
  }
  const artifact = entry.default;
  if (!/^\.\/dist\/[a-zA-Z0-9_./-]+$/.test(artifact) || artifact.split('/').includes('..')) {
    throw new Error(pkg.name + ' has an unsafe public export ' + key);
  }
  if (
    key !== './styles' &&
    (!/^\.\/dist\/[a-zA-Z0-9_./-]+$/.test(entry.types ?? '') || entry.types.split('/').includes('..'))
  ) {
    throw new Error(pkg.name + ' is missing compiled declarations for ' + key);
  }
  return entry;
}

export function resolveSelectedTextbook(input = process.env.SVITLO_TEXTBOOK, searchPaths) {
  const name = selectedPackageName(input);
  const id = name.slice('@svitlo/'.length);
  const paths = searchPaths ?? requireFromWeb.resolve.paths(name) ?? [];
  let root = null;
  for (const path of paths) {
    const candidate = join(path, '@svitlo', id, 'package.json');
    if (existsSync(candidate)) {
      root = realpathSync(dirname(candidate));
      break;
    }
  }
  if (!root)
    throw new Error(
      'Selected package ' + name + ' is not installed. Install it in the deployment build before running Web.',
    );
  const manifest = JSON.parse(readFileSync(join(root, 'package.json'), 'utf8'));
  if (manifest.name !== name) throw new Error('Installed content package identity mismatch for ' + name);
  publicExport(manifest, '.');
  const scenes = publicExport(manifest, './scenes', true);
  const styles = publicExport(manifest, './styles', true);
  if (styles && !scenes) throw new Error(name + ' exposes Scene styles without a Scene registry');
  const cli = 'svitlo-' + id;
  if (!manifest.bin || Object.keys(manifest.bin).length !== 1 || manifest.bin[cli] !== './dist/publish.mjs') {
    throw new Error(name + ' must expose its compiled public Publish CLI as ' + cli);
  }
  return { id, name, root, manifest, hasScenes: !!scenes, hasStyles: !!styles, cli };
}

export function assertSelectedArtifacts(selected) {
  const dist = join(selected.root, 'dist');
  if (!existsSync(dist) || lstatSync(dist).isSymbolicLink() || !statSync(dist).isDirectory()) {
    throw new Error('Missing or unsafe compiled dist for ' + selected.name);
  }
  const base = realpathSync(dist) + sep;
  function assertFile(artifact, label) {
    const target = resolve(selected.root, artifact);
    if (
      !target.startsWith(resolve(dist) + sep) ||
      !existsSync(target) ||
      lstatSync(target).isSymbolicLink() ||
      !statSync(target).isFile() ||
      !realpathSync(target).startsWith(base)
    ) {
      throw new Error('Missing or unsafe compiled ' + label + ' of ' + selected.name + ': ' + artifact);
    }
  }
  const entries = ['.', ...(selected.hasScenes ? ['./scenes'] : []), ...(selected.hasStyles ? ['./styles'] : [])];
  for (const key of entries) {
    const entry = selected.manifest.exports[key];
    for (const artifact of [entry.default, ...(entry.types ? [entry.types] : [])]) {
      assertFile(artifact, key + ' export');
    }
  }
  assertFile(selected.manifest.bin[selected.cli], 'Publish CLI');
}
