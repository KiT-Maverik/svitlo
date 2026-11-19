#!/usr/bin/env node
/**
 * @fileoverview Read-only CI guard for explicit blocking TODO comments.
 *
 * diff: inspect only newly added lines in a PR's merge-base diff.
 * full: inspect all Git-tracked source files in the checked-out tree.
 * This is not a content-validity, resource, or editorial approval validator.
 */
import fs from 'node:fs';
import path from 'node:path';
import { execFileSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';

const sourceExtensions = new Set([
  '.ts',
  '.tsx',
  '.mts',
  '.cts',
  '.js',
  '.jsx',
  '.mjs',
  '.cjs',
  '.yml',
  '.yaml',
  '.sh',
  '.bash',
  '.py',
  '.css',
  '.scss',
  '.html',
  '.sql',
]);
const commitSha = /^[0-9a-f]{40}$/i;

function isSourceFile(file) {
  return sourceExtensions.has(path.extname(file).toLowerCase());
}

function git(root, ...args) {
  return execFileSync('git', args, {
    cwd: root,
    encoding: 'utf8',
    maxBuffer: 32 * 1024 * 1024,
  });
}

function finding(file, line, text) {
  return { file, line, text: text.trim() };
}

/**
 * Find actual comments, not comment-shaped text within quoted strings.
 * Tracks strings, template literals, and block comments across lines.
 * This is not a full language parser.
 */
export function scanSource(file, source) {
  const extension = path.extname(file).toLowerCase();
  const slashComments = [
    '.ts',
    '.tsx',
    '.mts',
    '.cts',
    '.js',
    '.jsx',
    '.mjs',
    '.cjs',
    '.css',
    '.scss',
    '.sql',
  ].includes(extension);
  const hashComments = ['.yml', '.yaml', '.sh', '.bash', '.py'].includes(extension);
  const dashComments = extension === '.sql';
  const htmlComments = extension === '.html';
  const marker = /^\s*\**\s*TODO \(BLOCKER\):/;
  const lines = source.split(/\r?\n/);
  const findings = [];
  let quoted = null;
  let block = null;

  for (let lineIndex = 0; lineIndex < lines.length; lineIndex++) {
    const line = lines[lineIndex];
    const report = text => {
      if (marker.test(text)) findings.push(finding(file, lineIndex + 1, line));
    };
    let i = 0;

    // A multi-line block comment may start on a previous line.
    if (block) {
      const end = line.indexOf(block);
      report(line.slice(0, end < 0 ? undefined : end));
      if (end < 0) continue;
      i = end + block.length;
      block = null;
    }

    while (i < line.length) {
      const char = line[i];
      if (quoted) {
        if (char === '\\') {
          i += 2;
          continue;
        }
        if (char === quoted) quoted = null;
        i++;
        continue;
      }

      if (char === "'" || char === '"' || char === String.fromCharCode(96)) {
        quoted = char;
        i++;
        continue;
      }

      if (slashComments && line.startsWith('//', i)) {
        report(line.slice(i + 2));
        break;
      }
      if (slashComments && line.startsWith('/*', i)) {
        const end = line.indexOf('*/', i + 2);
        report(line.slice(i + 2, end < 0 ? undefined : end));
        if (end < 0) {
          block = '*/';
          break;
        }
        i = end + 2;
        continue;
      }
      if (htmlComments && line.startsWith('<!--', i)) {
        const end = line.indexOf('-->', i + 4);
        report(line.slice(i + 4, end < 0 ? undefined : end));
        if (end < 0) {
          block = '-->';
          break;
        }
        i = end + 3;
        continue;
      }
      if (hashComments && char === '#' && (i === 0 || /\s/.test(line[i - 1]))) {
        report(line.slice(i + 1));
        break;
      }
      if (dashComments && line.startsWith('--', i) && (i === 0 || /\s/.test(line[i - 1]))) {
        report(line.slice(i + 2));
        break;
      }
      i++;
    }
    // A single/double quote can only span source lines via continuation.
    // Template strings can always span lines.
    if (quoted && quoted !== String.fromCharCode(96) && !/\\$/.test(line)) quoted = null;
  }
  return findings;
}

/** Scan tracked source, excluding untracked outputs, binary assets, and Markdown. */
export function scanFull(root) {
  const findings = [];
  const files = git(root, 'ls-files', '-z').split('\0').filter(isSourceFile);
  for (const file of files) {
    const location = path.join(root, file);
    if (!fs.existsSync(location) || !fs.lstatSync(location).isFile()) continue;
    findings.push(...scanSource(file, fs.readFileSync(location, 'utf8')));
  }
  return findings;
}

/**
 * Scan new (+) lines in the complete PR patch. Parsing the entire patch
 * rather than diffing each path separately preserves rename detection, so
 * moving a file with a pre-existing blocker doesn't turn it into an addition.
 */
export function scanDiff(root, base, head) {
  if (!commitSha.test(base) || !commitSha.test(head)) {
    throw new Error('Diff mode requires two full 40-character commit SHAs');
  }
  const patch = git(
    root,
    '-c',
    'core.quotePath=false',
    'diff',
    '--no-ext-diff',
    '--no-color',
    '--find-renames',
    '--unified=0',
    '--diff-filter=ACMR',
    base + '...' + head,
    '--',
  );
  const added = new Map();
  let file = null;
  let lineNumber = 0;
  let inHunk = false;
  for (const line of patch.split('\n')) {
    if (line.startsWith('diff --git ')) {
      file = null;
      inHunk = false;
      continue;
    }
    if (!inHunk && line.startsWith('+++ ')) {
      const match = /^\+\+\+ (?:b\/|"b\/)(.*?)(?:"|)$/.exec(line);
      file = match && isSourceFile(match[1]) ? match[1] : null;
      continue;
    }
    const hunk = /^@@ -\d+(?:,\d+)? \+(\d+)(?:,\d+)? @@/.exec(line);
    if (hunk) {
      lineNumber = Number(hunk[1]);
      inHunk = true;
      continue;
    }
    if (!inHunk) continue;
    if (line.startsWith('+')) {
      if (file) {
        if (!added.has(file)) added.set(file, new Set());
        added.get(file).add(lineNumber);
      }
      lineNumber++;
    } else if (line.startsWith(' ')) {
      lineNumber++;
    } else if (!line.startsWith('-') && !line.startsWith('\\')) {
      inHunk = false;
    }
  }
  const findings = [];
  for (const [changedFile, numbers] of added) {
    const location = path.join(root, changedFile);
    if (!fs.existsSync(location) || !fs.lstatSync(location).isFile()) continue;
    findings.push(...scanSource(changedFile, fs.readFileSync(location, 'utf8')).filter(hit => numbers.has(hit.line)));
  }
  return findings;
}

function escapeAnnotation(value) {
  return String(value).replace(/%/g, '%25').replace(/\r/g, '%0D').replace(/\n/g, '%0A').replace(/,/g, '%2C');
}

export function main(args, root = path.resolve(fileURLToPath(new URL('../../..', import.meta.url)))) {
  const [mode, base, head] = args;
  if (
    (mode !== 'full' && mode !== 'diff' && mode !== 'report-diff') ||
    (mode === 'full' && args.length !== 1) ||
    ((mode === 'diff' || mode === 'report-diff') && args.length !== 3)
  ) {
    throw new Error('Usage: check-blocker-todos.mjs full | diff <base-sha> <head-sha> | report-diff <base-sha> <head-sha>');
  }
  const findings = mode === 'full' ? scanFull(root) : scanDiff(root, base, head);
  const informational = mode === 'report-diff';
  for (const item of findings) {
    console.error(
      (informational ? '::warning file=' : '::error file=') + escapeAnnotation(item.file) + ',line=' + item.line + '::' + escapeAnnotation(item.text),
    );
  }
  if (informational) {
    console.log('Draft TODO report: ' + findings.length + ' pending blocker comment(s); authoring may continue.');
    return;
  }
  if (findings.length) {
    throw new Error(findings.length + ' unresolved TODO (BLOCKER) comment(s) in ' + mode + ' mode');
  }
  console.log('Blocker TODOs / clean (' + mode + '): no blocking comments found.');
}

const invoked = process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url);
if (invoked) {
  try {
    main(process.argv.slice(2));
  } catch (error) {
    console.error(error.message);
    process.exitCode = 1;
  }
}
