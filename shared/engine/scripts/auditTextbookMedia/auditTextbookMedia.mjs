#!/usr/bin/env node
/**
 * Read-only, build-independent audit of textbook-wide media assets.
 *
 * It compares physical assets/ files with literal UUID.extension references in
 * authored textbook source. It deliberately reports *candidates*, not proof of
 * dead assets: runtime-computed references and imports outside the textbook
 * cannot be inferred from a static scan. No files are modified or deleted.
 *
 * Usage: node auditTextbookMedia.mjs --package content/<book> [--json]
 */
import { lstatSync, readdirSync, readFileSync, realpathSync, statSync } from 'node:fs';
import { basename, dirname, extname, join, relative, resolve, sep } from 'node:path';
import { fileURLToPath } from 'node:url';

const repoRoot = resolve(dirname(fileURLToPath(import.meta.url)), '../../../..');
const assetKinds = new Set(['images', 'audio', 'video', 'subtitles']);
const ignoredDirectories = new Set([
  'assets',
  'generated',
  'dist',
  'node_modules',
  'temp',
  'coverage',
  '.git',
  '.next',
  '.test-build',
  '__tests__',
  'fixtures',
]);
const ignoredSourceNames = new Set(['readme.md', 'specification.md', 'methodology.md', 'review.md']);
const sourceExtensions = new Set([
  '.ts',
  '.tsx',
  '.js',
  '.jsx',
  '.mjs',
  '.cjs',
  '.json',
  '.jsonc',
  '.yaml',
  '.yml',
  '.css',
  '.scss',
  '.html',
  '.md',
  '.mdx',
  '.svg',
]);
const uuidFileName = /^[0-9a-f]{8}-(?:[0-9a-f]{4}-){3}[0-9a-f]{12}\.[a-z0-9]+$/;
const sourceReference = /(?<![a-zA-Z0-9_-])([0-9a-f]{8}-(?:[0-9a-f]{4}-){3}[0-9a-f]{12}\.[a-z0-9]+)(?![a-zA-Z0-9_-])/g;
const nilUuid = '00000000-0000-0000-0000-000000000000';

function childrenOf(folder) {
  return readdirSync(folder, { withFileTypes: true }).sort((a, b) => a.name.localeCompare(b.name, 'en'));
}

function assertNotSymlink(fullPath) {
  if (lstatSync(fullPath).isSymbolicLink()) {
    throw new Error('Media audit refuses symbolic link: ' + fullPath);
  }
}

function getAssets(textbookRoot) {
  const folder = join(textbookRoot, 'assets');
  try {
    assertNotSymlink(folder);
  } catch (error) {
    if (error.code === 'ENOENT') return [];
    throw error;
  }
  if (!statSync(folder).isDirectory()) throw new Error('Expected assets/ directory: ' + folder);
  const assets = [];
  function visit(directory) {
    for (const entry of childrenOf(directory)) {
      const fullPath = join(directory, entry.name);
      assertNotSymlink(fullPath);
      if (entry.isDirectory()) visit(fullPath);
      else if (entry.isFile()) {
        const file = relative(folder, fullPath).split(sep).join('/');
        const parts = file.split('/');
        const validShape =
          parts.length === 2 &&
          assetKinds.has(parts[0]) &&
          uuidFileName.test(parts[1]) &&
          !parts[1].startsWith(nilUuid + '.');
        assets.push({
          path: 'assets/' + file,
          name: basename(fullPath),
          bytes: lstatSync(fullPath).size,
          nonstandard: !validShape,
        });
      }
    }
  }
  visit(folder);
  return assets.sort((a, b) => a.path.localeCompare(b.path, 'en'));
}

function getSourceReferences(textbookRoot) {
  const references = new Set();
  let scanned = 0;
  function visit(directory) {
    for (const entry of childrenOf(directory)) {
      const fullPath = join(directory, entry.name);
      if (entry.isDirectory()) {
        if (!ignoredDirectories.has(entry.name) && !entry.name.startsWith('.')) visit(fullPath);
        continue;
      }
      if (!entry.isFile() || !sourceExtensions.has(extname(entry.name).toLowerCase())) continue;
      const lowerName = entry.name.toLowerCase();
      if (ignoredSourceNames.has(lowerName) || /\.(?:spec|test)\./.test(lowerName)) continue;
      // Even if a source directory contains a symlink, never follow it.
      assertNotSymlink(fullPath);
      const source = readFileSync(fullPath, 'utf8');
      scanned++;
      for (const match of source.matchAll(sourceReference)) {
        if (!match[1].startsWith(nilUuid + '.')) references.add(match[1]);
      }
    }
  }
  visit(textbookRoot);
  return { references, scanned };
}

/** Compare physical files with literal source references; never mutate the textbook. */
export function auditTextbookMedia(textbookRoot) {
  const root = resolve(textbookRoot);
  assertNotSymlink(root);
  const assets = getAssets(root);
  const { references, scanned } = getSourceReferences(root);
  const unused = assets.filter(asset => !references.has(asset.name));
  const nonstandard = assets.filter(asset => asset.nonstandard);
  return {
    textbook: basename(root),
    totalAssets: assets.length,
    referencedAssets: assets.length - unused.length,
    sourceFilesScanned: scanned,
    unusedBytes: unused.reduce((sum, asset) => sum + asset.bytes, 0),
    unused: unused.map(({ path, bytes }) => ({ path, bytes })),
    nonstandard: nonstandard.map(({ path }) => path),
  };
}

export function formatMediaAudit(report) {
  const lines = [
    `Unused media candidates — ${report.textbook}`,
    `Assets: ${report.totalAssets}; referenced: ${report.referencedAssets}; unreferenced: ${report.unused.length}`,
    `Potentially unused: ${report.unusedBytes} bytes; source files scanned: ${report.sourceFilesScanned}`,
  ];
  if (report.unused.length) {
    lines.push('', 'Unreferenced candidates:');
    for (const entry of report.unused) lines.push(`  ${entry.path} (${entry.bytes} bytes)`);
  }
  if (report.nonstandard.length) {
    lines.push('', 'Nonstandard asset paths (informational):');
    for (const entry of report.nonstandard) lines.push('  ' + entry);
  }
  lines.push(
    '',
    'Static source scan only; dynamically constructed references may not be detected. No files were changed.',
  );
  return lines.join('\n');
}

export function parseArgs(args) {
  let selected;
  let json = false;
  for (let index = 0; index < args.length; index++) {
    if (args[index] === '--package' && !selected) selected = args[++index];
    else if (args[index] === '--json' && !json) json = true;
    else throw new Error('Usage: --package content/<textbook> [--json]');
  }
  if (!selected || typeof selected !== 'string') {
    throw new Error('Usage: --package content/<textbook> [--json]');
  }
  const textbookRoot = resolve(repoRoot, selected);
  const contentRoot = realpathSync(join(repoRoot, 'content'));
  if (
    !textbookRoot.startsWith(join(repoRoot, 'content') + sep) ||
    !realpathSync(textbookRoot).startsWith(contentRoot + sep) ||
    !statSync(join(textbookRoot, 'package.json')).isFile()
  ) {
    throw new Error('Expected a textbook package under content/: ' + selected);
  }
  return { textbookRoot, json };
}

export function main(args) {
  const { textbookRoot, json } = parseArgs(args);
  const report = auditTextbookMedia(textbookRoot);
  process.stdout.write((json ? JSON.stringify(report, null, 2) : formatMediaAudit(report)) + '\n');
}

if (process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  try {
    main(process.argv.slice(2));
  } catch (error) {
    console.error(error);
    process.exitCode = 1;
  }
}
