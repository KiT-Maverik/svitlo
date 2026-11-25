/** Isolate ONLY default-branch Lesson dependency execution, never candidate draft.ts.
 * All path/SHA checks happen before launching an unprivileged Docker worker.
 */
import fs from 'node:fs';
import path from 'node:path';
import { execFileSync, spawnSync } from 'node:child_process';
import { randomUUID } from 'node:crypto';
import { fileURLToPath } from 'node:url';
import { assertTokenless } from './trusted-draft.mjs';

const SHA = /^[a-f0-9]{40}$/;
const UUID = /^[a-f0-9]{8}-(?:[a-f0-9]{4}-){3}[a-f0-9]{12}$/;
const worker = fileURLToPath(new URL('./course-dependency-worker.mjs', import.meta.url));
export const image = 'node:26.13.1-bookworm-slim@sha256:5df79989ed685e09f0a98019db4cebfb22fb9df1a53c0161664a011f7ff6b0f1';
const git = (root, ...args) =>
  execFileSync('git', ['-C', root, ...args], {
    encoding: 'utf8', stdio: ['ignore', 'pipe', 'pipe'], maxBuffer: 8 * 1024 * 1024,
  }).trim();

export function courseLessonReferences(input) {
  const seen = new Set();
  const entries = new Map();
  let count = 0;
  const walk = (node, depth) => {
    if (!node || typeof node !== 'object') return;
    if (depth > 80 || ++count > 100000) throw Error('Oversized Course dependency tree');
    if (seen.has(node)) return;
    seen.add(node);
    if (Array.isArray(node)) {
      for (const child of node) walk(child, depth + 1);
      return;
    }
    if (node.production?.kind === 'existing') {
      const id = node.production.existing?.id;
      const sourceSha = node.production.matching?.sourceSha;
      const exportName = node.production.sourceExportName;
      if (!UUID.test(id ?? '') || !SHA.test(sourceSha ?? '') ||
          !/^[A-Za-z_$][A-Za-z0-9_$]*$/.test(exportName ?? ''))
        throw Error('Unsafe Course Lesson dependency reference');
      entries.set(id + ':' + sourceSha + ':' + exportName, { id, sourceSha, exportName });
    }
    for (const [key, child] of Object.entries(node)) {
      if (key !== 'production') walk(child, depth + 1);
    }
  };
  walk(input, 0);
  if (entries.size > 250) throw Error('Too many Course dependencies');
  return [...entries.values()];
}


/** Only top-level Lesson Section additions have a concrete declarative binding.
 * The trusted runner checks the referenced Section itself, not a PR status.
 */
export function courseAddedSectionReferences(input) {
  const references = new Map();
  const seen = new Set();
  let count = 0;
  const walk = (node, depth) => {
    if (!node || typeof node !== 'object') return;
    if (depth > 80 || ++count > 100000) throw Error('Oversized Course Section reference tree');
    if (seen.has(node)) return;
    seen.add(node);
    if (Array.isArray(node)) {
      for (const child of node) walk(child, depth + 1);
      return;
    }
    if (node.production?.kind === 'existing') {
      const additions = node.production.sourcePatch?.section?.additionalItems;
      if (additions !== undefined) {
        if (!additions || typeof additions !== 'object' || Array.isArray(additions))
          throw Error('Invalid Course additional Section references');
        for (const [slug, section] of Object.entries(additions)) {
          if (!/^[A-Za-z][A-Za-z0-9]*$/.test(slug) ||
              !section || typeof section !== 'object' || Array.isArray(section) ||
              Object.keys(section).sort().join(',') !== '$ref,exportName,lessonId,sectionId,sourceSha' ||
              section.$ref !== 'lesson-section' ||
              !UUID.test(section.lessonId ?? '') || !UUID.test(section.sectionId ?? '') ||
              !SHA.test(section.sourceSha ?? '') ||
              !/^[A-Za-z][A-Za-z0-9]*$/.test(section.exportName ?? '')) {
            throw Error('Invalid Course additional Section reference at ' + slug);
          }
          const ref = {
            id: section.sectionId,
            ownerLessonId: section.lessonId,
            sourceSha: section.sourceSha,
            slug,
            exportName: section.exportName,
          };
          references.set(Object.values(ref).join(':'), ref);
        }
      }
    }
    for (const [key, child] of Object.entries(node)) {
      if (key !== 'production') walk(child, depth + 1);
    }
  };
  walk(input, 0);
  if (references.size > 250) throw Error('Too many Course additional Section dependencies');
  return [...references.values()];
}

/** Require precisely pinned *trusted default-branch* Section source. */
function checkedSectionReference(ref, textbookRoot, candidateRoot, trustedRoot) {
  const relative = textbookRoot + '/data/lessons/' + ref.ownerLessonId.at(-1) + '/' +
    ref.ownerLessonId + '/sections/' + ref.slug + '/index.ts';
  const blob = git(trustedRoot, 'rev-parse', 'HEAD:' + relative);
  if (!SHA.test(blob) || git(candidateRoot, 'rev-parse', 'HEAD:' + relative) !== blob)
    throw Error('Added Section differs from trusted default branch');
  if (git(trustedRoot, 'ls-files', '--stage', '--', relative) !== '100644 ' + blob + ' 0\t' + relative)
    throw Error('Added Section is not ordinary trusted source');
  const revisionType = git(trustedRoot, 'cat-file', '-t', ref.sourceSha);
  if (revisionType === 'blob') {
    if (ref.sourceSha !== blob) throw Error('Added Section source blob changed');
  } else if (revisionType === 'commit') {
    git(trustedRoot, 'merge-base', '--is-ancestor', ref.sourceSha, 'HEAD');
    if (git(trustedRoot, 'rev-parse', ref.sourceSha + ':' + relative) !== blob)
      throw Error('Added Section source revision changed');
  } else {
    throw Error('Added Section SHA is neither a blob nor ancestor commit');
  }
  let at = trustedRoot;
  for (const segment of relative.split('/')) {
    at = path.join(at, segment);
    if (fs.lstatSync(at).isSymbolicLink()) throw Error('Symlink in trusted added Section path');
  }
}

function checkedReference(ref, textbookRoot, candidateRoot, trustedRoot) {
  const relative = textbookRoot + '/data/lessons/' + ref.id.at(-1) + '/' + ref.id + '/index.ts';
  const treeBlob = git(trustedRoot, 'rev-parse', 'HEAD:' + relative);
  if (!SHA.test(treeBlob)) throw Error('Missing default-branch Lesson Git blob');
  if (git(candidateRoot, 'rev-parse', 'HEAD:' + relative) !== treeBlob)
    throw Error('Reused Lesson differs from trusted default branch');
  const mode = git(trustedRoot, 'ls-files', '--stage', '--', relative);
  if (mode !== '100644 ' + treeBlob + ' 0\t' + relative)
    throw Error('Reused Lesson is not ordinary trusted source');
  const revisionType = git(trustedRoot, 'cat-file', '-t', ref.sourceSha);
  if (revisionType === 'blob') {
    if (ref.sourceSha !== treeBlob) throw Error('Reused Lesson source blob changed');
  } else if (revisionType === 'commit') {
    git(trustedRoot, 'merge-base', '--is-ancestor', ref.sourceSha, 'HEAD');
    if (git(trustedRoot, 'rev-parse', ref.sourceSha + ':' + relative) !== treeBlob)
      throw Error('Reused Lesson source commit changed');
  } else throw Error('Reused Lesson SHA is neither a blob nor ancestor commit');
  let at = trustedRoot;
  for (const part of relative.split('/')) {
    at = path.join(at, part);
    if (fs.lstatSync(at).isSymbolicLink()) throw Error('Symlink in trusted Lesson path');
  }
}

export function runIsolatedCourseDependencies({ input, source, textbookRoot, candidateRoot, trustedRoot }, spawn = spawnSync) {
  assertTokenless();
  if (!/^content\/[a-z][a-z0-9-]*$/.test(textbookRoot) ||
      !source?.sourcePath?.startsWith(textbookRoot + '/data/courses/') ||
      !SHA.test(source.sourceBlobSha ?? '') || !SHA.test(source.sourceCommitSha ?? ''))
    throw Error('Invalid pinned Course root');
  const checkedTrusted = fs.realpathSync(trustedRoot);
  const checkedCandidate = fs.realpathSync(candidateRoot);
  const references = courseLessonReferences(input);
  const sections = courseAddedSectionReferences(input);
  if (!references.length) throw Error('Dependency worker requires a real reused Lesson');
  for (const ref of references) checkedReference(ref, textbookRoot, checkedCandidate, checkedTrusted);
  for (const ref of sections) checkedSectionReference(ref, textbookRoot, checkedCandidate, checkedTrusted);
  const mount = (filename, target, directory = false) => {
    const stat = fs.lstatSync(filename);
    if (stat.isSymbolicLink() || (directory ? !stat.isDirectory() : !stat.isFile()) || filename.includes(','))
      throw Error('Unsafe trusted Course Docker mount');
    return ['--mount', 'type=bind,source=' + filename + ',target=' + target + ',readonly'];
  };
  const name = 'svitlo-trusted-course-' + randomUUID();
  const args = [
    'run', '--rm', '--name', name, '--pull=never', '--interactive',
    '--network=none', '--read-only', '--cap-drop=ALL',
    '--security-opt=no-new-privileges', '--user=65534:65534',
    '--pids-limit=64', '--memory=1g', '--memory-swap=1g', '--cpus=2',
    '--tmpfs=/tmp:rw,noexec,nosuid,nodev,size=64m',
    '--log-driver=none', '--env=HOME=/tmp', '--workdir=/work',
    ...mount(path.join(checkedTrusted, 'node_modules'), '/work/node_modules', true),
    ...mount(path.join(checkedTrusted, 'shared/engine/dist'), '/work/shared/engine/dist', true),
    ...mount(path.join(checkedTrusted, 'shared/engine/package.json'), '/work/shared/engine/package.json'),
    ...mount(path.join(checkedTrusted, textbookRoot), '/work/' + textbookRoot, true),
    ...mount(worker, '/work/course-dependency-worker.mjs'),
    image, 'node', '/work/course-dependency-worker.mjs',
  ];
  try {
    const result = spawn('docker', args, {
      input: JSON.stringify({ input, source, textbookRoot, references, sections }),
      encoding: 'utf8', timeout: 120000, maxBuffer: 36 * 1024 * 1024,
    });
    if (result.error || result.status !== 0)
      throw Error('Isolated trusted Course dependency failed (' +
        (result.error ? 'launch error' : 'exit ' + result.status) + ')');
    let plan;
    try { plan = JSON.parse(result.stdout); }
    catch { throw Error('Isolated Course did not return one JSON source plan'); }
    return plan;
  } finally {
    spawn('docker', ['rm', '--force', name], { stdio: 'ignore', timeout: 15000 });
  }
}
