#!/usr/bin/env node
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { renderTextbookLessonFiles, writeLessonFiles } from '@svitlo/engine/utils';

const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../../../..');

async function main(args) {
  let packageName;
  let outputOverride;
  let action;
  for (let i = 0; i < args.length; i++) {
    if (args[i] === '--package' && !packageName) packageName = args[++i];
    else if (args[i] === '--output' && !outputOverride) outputOverride = args[++i];
    else if (['--write', '--check'].includes(args[i]) && !action) action = args[i];
    else throw new Error('Usage: --package content/<textbook> [--output <repo-relative-dir>] --write|--check');
  }
  if (!packageName || !action || (outputOverride !== undefined && !outputOverride)) {
    throw new Error('Usage: --package content/<textbook> [--output <repo-relative-dir>] --write|--check');
  }
  const packageDirectory = path.resolve(repoRoot, packageName);
  if (
    !packageDirectory.startsWith(path.join(repoRoot, 'content') + path.sep) ||
    !fs.existsSync(path.join(packageDirectory, 'package.json'))
  ) {
    throw new Error('Invalid textbook package');
  }
  const files = await renderTextbookLessonFiles(packageDirectory);
  const output = outputOverride
    ? path.resolve(repoRoot, outputOverride)
    : path.join(packageDirectory, 'public/data/pages/lessons');
  if (!output.startsWith(repoRoot + path.sep)) throw new Error('Output must stay inside the repository');
  if (action === '--write') {
    writeLessonFiles(output, files);
    console.log(`Published ${files.size} lesson files in ${output}`);
    return;
  }
  const expected = new Set(files.keys());
  const actual = new Set();
  function visit(directory, relative = '') {
    if (!fs.existsSync(directory)) return;
    for (const entry of fs.readdirSync(directory, { withFileTypes: true })) {
      const name = path.join(relative, entry.name);
      if (entry.isDirectory()) visit(path.join(directory, entry.name), name);
      else if (entry.isFile()) actual.add(name);
    }
  }
  visit(output);
  const differences = [...files]
    .filter(([name, content]) => !actual.has(name) || fs.readFileSync(path.join(output, name), 'utf8') !== content)
    .map(([name]) => name);
  const stale = [...actual].filter(name => !expected.has(name));
  if (differences.length || stale.length) throw new Error(JSON.stringify({ differences, stale }));
  console.log(`Verified ${files.size} lesson files`);
}

main(process.argv.slice(2)).catch(error => {
  console.error(error);
  process.exitCode = 1;
});
