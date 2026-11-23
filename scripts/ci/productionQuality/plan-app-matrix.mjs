#!/usr/bin/env node
/**
 * @fileoverview Discover every buildable app and its production test capabilities.
 * Never hard-code an app list, silently omit E2E coverage, or build source here.
 */
import { appendFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { discoverWorkspaces } from '../../runWorkspaceScript/run-workspace-script.mjs';

export function planProductionApps(packages) {
  const apps = packages.filter(pkg => Object.hasOwn(pkg.scripts || {}, 'app:build'));
  if (!apps.length) throw Error('No production applications declare app:build');
  const names = new Set(apps.map(pkg => pkg.name));
  for (const pkg of packages) {
    if (Object.hasOwn(pkg.scripts || {}, 'test:e2e') && !names.has(pkg.name)) {
      throw Error('E2E workspace without app:build needs an explicit production execution plan: ' + pkg.name);
    }
  }
  const include = apps.map(pkg => {
    if (!/^[a-z0-9@/._-]+$/.test(pkg.name) || !/^(?:apps|content)\/[a-z0-9/-]+$/.test(pkg.path)) {
      throw Error('Unsafe production application identity: ' + pkg.name);
    }
    return {
      workspace: pkg.name,
      slug: pkg.path.replaceAll('/', '-'),
      path: pkg.path,
      e2e: Object.hasOwn(pkg.scripts || {}, 'test:e2e'),
      integration: Object.hasOwn(pkg.scripts || {}, 'test:integration'),
    };
  });
  if (new Set(include.map(app => app.slug)).size !== include.length) throw Error('Duplicate app slug');
  return { include };
}

if (process.argv[1] && fileURLToPath(import.meta.url) === process.argv[1]) {
  try {
    if (process.argv.length !== 2 || !process.env.GITHUB_OUTPUT) {
      throw Error('Run this manifest-only discovery inside a GitHub Actions step with GITHUB_OUTPUT');
    }
    const matrix = planProductionApps(discoverWorkspaces());
    appendFileSync(process.env.GITHUB_OUTPUT, 'matrix=' + JSON.stringify(matrix) + '\n');
    console.log('Production applications: ' + matrix.include.map(app => app.workspace).join(', '));
  } catch (error) {
    console.error('::error::' + error.message);
    process.exitCode = 1;
  }
}
