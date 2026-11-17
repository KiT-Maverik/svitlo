#!/usr/bin/env node
/**
 * @fileoverview Assert real, staged physical media and generated content for a
 * deliberately labeled Course/Lesson PR, at its exact Ready-for-Review commit.
 *
 * Draft scaffolding is intentionally incomplete. This read-only verification
 * invokes existing STRICT textbook package builds; it does not create media,
 * approve reviews, or change source data. Only touched textbook workspaces are
 * built. A label on an unrelated PR fails instead of producing a green no-op.
 */
import fs from 'node:fs';
import path from 'node:path';
import { execFileSync, spawnSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';

const repoRoot = path.resolve(fileURLToPath(new URL('../../../', import.meta.url)));
const uuid = '[0-9a-f]{8}-(?:[0-9a-f]{4}-){3}[0-9a-f]{12}';
const scoped = /^(content\/(?:languages\/)?[a-z][a-z0-9-]*)\/(data\/(lessons|courses)\/|assets\/)/;
const source = new RegExp('^data/(lessons|courses)/([0-9a-f])?/(' + uuid + ')/');
const safeManifestPath = /^(?:data|textbooks)\/[a-zA-Z0-9_./-]+$/;

export function targetWorkspaces(changedFiles) {
  const targets = new Map();
  for (const filename of changedFiles) {
    const match = scoped.exec(filename);
    if (!match) continue;
    const [, workspace, prefix, kind] = match;
    if (!targets.has(workspace)) targets.set(workspace, { workspace, kinds: new Set(), entities: new Set() });
    const target = targets.get(workspace);
    if (kind) {
      target.kinds.add(kind);
      const remaining = filename.slice(workspace.length + 1);
      const entity = source.exec(remaining);
      if (entity && entity[1] === kind && (kind === 'courses' || entity[2] === entity[3].slice(-1))) {
        target.entities.add(kind + '/' + entity[3]);
      }
    } else if (prefix === 'assets/') {
      target.kinds.add('assets');
    }
  }
  return [...targets.values()].sort((a, b) => a.workspace.localeCompare(b.workspace));
}

function readJson(filename) {
  return JSON.parse(fs.readFileSync(filename, 'utf8'));
}

export function assertPublishedResources(repository, target) {
  const workspacePath = path.join(repository, target.workspace);
  const packagePath = path.join(workspacePath, 'package.json');
  if (!fs.existsSync(packagePath)) throw new Error('No textbook workspace: ' + target.workspace);
  const pkg = readJson(packagePath);
  if (!pkg.name?.startsWith('@svitlo/') || !pkg.scripts?.['package:build']) {
    throw new Error('Textbook workspace has no supported package:build: ' + target.workspace);
  }
  const dist = path.join(workspacePath, 'dist');
  const manifestFile = path.join(dist, 'manifest.json');
  if (!fs.existsSync(manifestFile)) throw new Error('No generated textbook manifest: ' + target.workspace);
  const manifest = readJson(manifestFile);
  if (!Array.isArray(manifest.files) || !manifest.files.length) {
    throw new Error('No generated resource files in textbook manifest: ' + target.workspace);
  }
  const files = new Set();
  for (const entry of manifest.files) {
    if (typeof entry !== 'string' || !safeManifestPath.test(entry) ||
        entry.split('/').includes('..') || entry.split('/').includes('.')) {
      throw new Error('Unsafe or invalid published resource path: ' + String(entry));
    }
    if (files.has(entry)) throw new Error('Duplicate resource in manifest: ' + entry);
    files.add(entry);
    const published = path.join(dist, 'static', entry);
    const info = fs.lstatSync(published, { throwIfNoEntry: false });
    if (!info?.isFile() || info.isSymbolicLink() || info.size === 0) {
      throw new Error('Missing/empty/non-file published resource: ' + published);
    }
  }
  for (const kind of ['lessons', 'courses']) {
    if (!target.kinds.has(kind)) continue;
    const prefix = kind === 'lessons' ? /^data\/lessons\/[0-9a-f]\/[0-9a-f-]{36}\/base\.json$/ :
      /^data\/courses\/[0-9a-f-]{36}\/base\.json$/;
    if (![...files].some(name => prefix.test(name))) {
      throw new Error('Changed ' + kind + ' have no generated base Props in ' + target.workspace);
    }
  }
  for (const entity of target.entities) {
    const [kind, id] = entity.split('/');
    const entry = 'data/' + kind + '/' + (kind === 'lessons' ? id.slice(-1) + '/' : '') + id + '/base.json';
    if (!files.has(entry)) {
      throw new Error('Changed ' + kind + ' UUID has no generated base Props: ' + target.workspace + '/' + id);
    }
  }
  return { packageName: pkg.name, count: files.size, entities: target.entities.size };
}

function gitChangedFiles(base, head) {
  if (![base, head].every(value => /^[0-9a-f]{40}$/.test(value))) {
    throw new Error('Expected full Git BASE_SHA and HEAD_SHA');
  }
  return execFileSync('git', ['diff', '--name-only', '-z', '--diff-filter=ACMR', base, head, '--', 'content'], {
    cwd: repoRoot,
  }).toString('utf8').split('\0').filter(Boolean);
}

function execute(argv) {
  if (argv.length !== 2) throw new Error('Usage: assert-media.mjs <base-sha> <head-sha>');
  const targets = targetWorkspaces(gitChangedFiles(...argv));
  if (!targets.length) throw new Error('assert: media requires changes under a textbook Lesson, Course or assets/; found none');
  for (const target of targets) {
    const manifest = path.join(repoRoot, target.workspace, 'package.json');
    if (!fs.existsSync(manifest)) throw new Error('Unknown textbook workspace: ' + target.workspace);
    const pkg = readJson(manifest);
    if (!pkg.name?.startsWith('@svitlo/') || !pkg.scripts?.['package:build']) {
      throw new Error('Missing textbook production build: ' + target.workspace);
    }
    console.log('::group::assert: media — ' + target.workspace);
    try {
      const run = spawnSync('npm', ['run', 'package:build', '--workspace', pkg.name], {
        cwd: repoRoot,
        stdio: 'inherit',
        env: { ...process.env, SVITLO_MEDIA_MODE: 'production' },
      });
      if (run.error || run.status !== 0) {
        throw new Error('Strict production build failed for ' + target.workspace +
          (run.error ? ': ' + run.error.message : ''));
      }
      const result = assertPublishedResources(repoRoot, target);
      console.log('Verified ' + result.count + ' staged files for ' + result.packageName +
        ' (' + result.entities + ' changed UUID-addressed entity/entities)');
    } finally {
      console.log('::endgroup::');
    }
  }
}

if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  try {
    execute(process.argv.slice(2));
  } catch (error) {
    console.error('::error::' + (error instanceof Error ? error.message : String(error)));
    process.exitCode = 1;
  }
}
