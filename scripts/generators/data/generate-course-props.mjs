#!/usr/bin/env node
/** Package-wide Course publication from stateless configurators to generated/courses. */
import fs from 'node:fs';
import path from 'node:path';
import { randomUUID } from 'node:crypto';
import { fileURLToPath } from 'node:url';
import { loadAuthoredConfigurators } from './load-authored-configurators.mjs';
import { renderCourseFiles } from './publish-course-data.mjs';

const repo = path.resolve(fileURLToPath(new URL('../../..', import.meta.url)));
const usage = 'Usage: --package content/<textbook> [--output <generated-dir>] --write|--check';

function options(argv) {
  let name, output, action;
  for (let i = 0; i < argv.length; i++) {
    if (argv[i] === '--package' && !name) name = argv[++i];
    else if (argv[i] === '--output' && !output) output = argv[++i];
    else if (['--write', '--check'].includes(argv[i]) && !action) action = argv[i];
    else throw new Error(usage);
  }
  if (!name || !action) throw new Error(usage);
  const pkg = path.resolve(repo, name);
  if (!pkg.startsWith(path.join(repo, 'content') + path.sep) || !fs.existsSync(path.join(pkg, 'package.json'))) {
    throw new Error('Invalid textbook package');
  }
  const outputDirectory = output ? path.resolve(repo, output) : path.join(pkg, 'generated/courses');
  if (!outputDirectory.startsWith(path.join(pkg, 'generated') + path.sep)) {
    throw new Error('Course output must remain in textbook generated/');
  }
  return { pkg, outputDirectory, action };
}

function readCurrent(root, prefix = '', files = new Map()) {
  if (!fs.existsSync(root)) return files;
  if (fs.lstatSync(root).isSymbolicLink()) throw new Error('Symlink in generated Course output: ' + root);
  for (const entry of fs.readdirSync(root, { withFileTypes: true })) {
    const fullPath = path.join(root, entry.name);
    const name = prefix ? prefix + '/' + entry.name : entry.name;
    if (entry.isDirectory()) readCurrent(fullPath, name, files);
    else if (entry.isFile()) files.set(name, fs.readFileSync(fullPath, 'utf8'));
    else throw new Error('Unexpected generated Course entry: ' + name);
  }
  return files;
}

async function render(pkg) {
  const directory = path.join(pkg, 'data/courses');
  const files = new Map();
  if (!fs.existsSync(directory)) return files;
  const ids = new Set();
  for (const name of fs.readdirSync(directory).filter(name => name.endsWith('.data.ts')).sort()) {
    const source = path.join(directory, name);
    const courses = await loadAuthoredConfigurators(source, 'course');
    if (courses.length !== 1) throw new Error('Expected one Course per source: ' + source);
    const course = courses[0];
    if (ids.has(course.id)) throw new Error('Duplicate Course ID: ' + course.id);
    ids.add(course.id);
    for (const [file, body] of renderCourseFiles(course)) {
      files.set(course.id + '/' + file, body);
    }
  }
  return files;
}

function publish(root, files) {
  const parent = path.dirname(root);
  fs.mkdirSync(parent, { recursive: true });
  if (fs.existsSync(root) && (!fs.lstatSync(root).isDirectory() || fs.lstatSync(root).isSymbolicLink())) {
    throw new Error('Refusing to replace non-directory Course output: ' + root);
  }
  const staging = fs.mkdtempSync(path.join(parent, '.courses-staging-'));
  const backup = path.join(parent, '.courses-backup-' + randomUUID());
  let backedUp = false;
  try {
    for (const [relative, body] of files) {
      if (!/^[0-9a-f-]{36}[/](?:base|[a-z]{2,8})[.]json$/.test(relative)) {
        throw new Error('Invalid generated Course path: ' + relative);
      }
      const destination = path.join(staging, relative);
      fs.mkdirSync(path.dirname(destination), { recursive: true });
      fs.writeFileSync(destination, body, 'utf8');
    }
    if (fs.existsSync(root)) {
      fs.renameSync(root, backup);
      backedUp = true;
    }
    try {
      fs.renameSync(staging, root);
    } catch (error) {
      if (backedUp) fs.renameSync(backup, root);
      backedUp = false;
      throw error;
    }
    if (backedUp) fs.rmSync(backup, { recursive: true, force: true });
  } finally {
    if (fs.existsSync(staging)) fs.rmSync(staging, { recursive: true, force: true });
  }
}

async function main(argv) {
  const { pkg, outputDirectory, action } = options(argv);
  const files = await render(pkg);
  if (action === '--write') {
    publish(outputDirectory, files);
    console.log('Generated ' + files.size + ' Course files in ' + outputDirectory);
    return;
  }
  const existing = readCurrent(outputDirectory);
  const missing = [...files].filter(([name, body]) => existing.get(name) !== body).map(([name]) => name);
  const stale = [...existing.keys()].filter(name => !files.has(name));
  if (missing.length || stale.length) throw new Error('Generated Course files differ: ' + JSON.stringify({ missing, stale }));
  console.log('Verified ' + files.size + ' Course files in ' + outputDirectory);
}

if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  main(process.argv.slice(2)).catch(error => {
    console.error(error);
    process.exitCode = 1;
  });
}
