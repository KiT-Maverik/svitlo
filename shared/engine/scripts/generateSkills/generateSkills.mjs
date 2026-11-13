#!/usr/bin/env node
/**
 * Publish textbook-wide Skills using only stateless SkillDomain Build API outputs.
 * No source-text AST parsing, legacy collection wrappers, or runtime authoring imports.
 *
 * Outputs: <textbook>/generated/skills/{base,<locale>}.json
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { allLanguageCodes } from '@svitlo/engine/build';
import { loadAuthoredConfigurators } from '../loadAuthoredConfigurators/loadAuthoredConfigurators.mjs';
import { prepareSkillPublication } from './prepareSkillsPublication.mjs';
import {
  renderSkillTree,
  writeSkillFiles,
  checkSkillFiles,
} from '../../generators/skills/publishSkillTree.mjs';

const repo = path.resolve(fileURLToPath(new URL('../../../..', import.meta.url)));
const usage = 'Usage: --package content/<textbook> [--output <generated-dir>] --write|--check';

function options(argv) {
  let name, output, action;
  for (let i = 0; i < argv.length; i++) {
    const arg = argv[i];
    if (arg === '--package' && !name) name = argv[++i];
    else if (arg === '--output' && !output) output = argv[++i];
    else if ((arg === '--write' || arg === '--check') && !action) action = arg;
    else throw new Error(usage);
  }
  if (!name || !action) throw new Error(usage);
  const pkg = path.resolve(repo, name);
  if (!pkg.startsWith(path.join(repo, 'content') + path.sep) || !fs.existsSync(path.join(pkg, 'package.json'))) {
    throw new Error('Invalid textbook package');
  }
  const directory = output ? path.resolve(repo, output) : path.join(pkg, 'generated/skills');
  if (!directory.startsWith(path.join(pkg, 'generated') + path.sep)) {
    throw new Error('Skills output must remain in textbook generated/');
  }
  return { pkg, directory, action };
}

async function main(argv) {
  const { pkg, directory, action } = options(argv);
  const source = path.join(pkg, 'data/skills/index.ts');
  if (!fs.existsSync(source)) throw new Error('Missing SkillDomain index: ' + source);
  const domains = await loadAuthoredConfigurators(source, 'skillDomain');
  const publication = prepareSkillPublication(domains, [...allLanguageCodes]);
  const files = renderSkillTree(publication);
  if (action === '--write') {
    writeSkillFiles(directory, files);
    console.log('Generated ' + files.size + ' Skill files in ' + directory);
    return;
  }
  const diff = checkSkillFiles(directory, files);
  if (diff.missing.length || diff.changed.length || diff.stale.length) {
    throw new Error('Skills files differ: ' + JSON.stringify(diff));
  }
  console.log('Verified ' + files.size + ' Skill files in ' + directory);
}

if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  main(process.argv.slice(2)).catch(error => {
    console.error(error);
    process.exitCode = 1;
  });
}
