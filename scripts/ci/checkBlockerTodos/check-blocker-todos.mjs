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
  '.ts', '.tsx', '.mts', '.cts', '.js', '.jsx', '.mjs', '.cjs',
  '.yml', '.yaml', '.sh', '.bash', '.py', '.css', '.scss', '.html', '.sql',
]);
const blockingComment = /(?:^|[\s{])(?:\/\/|\/\*+|\*|#|<!--|--)\s*TODO \(BLOCKER\):/;
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

/** Scan tracked source, excluding untracked outputs, binary assets, and Markdown. */
export function scanFull(root) {
  const findings = [];
  const files = git(root, 'ls-files', '-z').split('\0').filter(isSourceFile);
  for (const file of files) {
    const location = path.join(root, file);
    if (!fs.existsSync(location) || !fs.lstatSync(location).isFile()) continue;
    const lines = fs.readFileSync(location, 'utf8').split(/\r?\n/);
    for (let line = 0; line < lines.length; line++) {
      if (blockingComment.test(lines[line])) {
        findings.push(finding(file, line + 1, lines[line]));
      }
    }
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
  const patch = git(root, '-c', 'core.quotePath=false', 'diff', '--no-ext-diff',
    '--no-color', '--find-renames', '--unified=0', '--diff-filter=ACMR',
    base + '...' + head, '--');
  const findings = [];
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
      if (file && blockingComment.test(line.slice(1))) {
        findings.push(finding(file, lineNumber, line.slice(1)));
      }
      lineNumber++;
    } else if (line.startsWith(' ')) {
      lineNumber++;
    } else if (!line.startsWith('-') && !line.startsWith('\\')) {
      inHunk = false;
    }
  }
  return findings;
}

function escapeAnnotation(value) {
  return String(value).replace(/%/g, '%25').replace(/\r/g, '%0D')
    .replace(/\n/g, '%0A').replace(/,/g, '%2C');
}

export function main(args, root = path.resolve(fileURLToPath(new URL('../../..', import.meta.url)))) {
  const [mode, base, head] = args;
  if ((mode !== 'full' && mode !== 'diff') ||
    (mode === 'full' && args.length !== 1) ||
    (mode === 'diff' && args.length !== 3)) {
    throw new Error('Usage: check-blocker-todos.mjs full | diff <base-sha> <head-sha>');
  }
  const findings = mode === 'full' ? scanFull(root) : scanDiff(root, base, head);
  for (const item of findings) {
    console.error('::error file=' + escapeAnnotation(item.file) +
      ',line=' + item.line + '::' + escapeAnnotation(item.text));
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
