#!/usr/bin/env node
/** Build changed content distributions; FastGate owns general TypeScript stability checks. */
import { existsSync, readFileSync, readdirSync, writeFileSync, unlinkSync } from 'node:fs';
import { join, resolve } from 'node:path';
import { execFileSync, spawnSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';

const repo = resolve(fileURLToPath(new URL('../../..', import.meta.url)));
const readJson = name => JSON.parse(readFileSync(join(repo, name), 'utf8'));

function run(command, args, cwd = repo) {
  const result = spawnSync(command, args, { cwd, env: process.env, stdio: 'inherit' });
  if (result.error || result.status !== 0) {
    throw new Error(command + ' ' + args.join(' ') + ' failed' + (result.error ? ': ' + result.error.message : ''));
  }
}
function contentWorkspaces() {
  const result = [];
  for (const folder of ['content', 'content/languages']) {
    for (const entry of readdirSync(join(repo, folder), { withFileTypes: true })) {
      if (!entry.isDirectory()) continue;
      const path = folder + '/' + entry.name;
      if (!existsSync(join(repo, path, 'package.json'))) continue;
      const pkg = readJson(path + '/package.json');
      if (pkg.name?.startsWith('@svitlo/') && pkg.scripts?.['package:build']) {
        result.push({ path, name: pkg.name, scripts: pkg.scripts });
      }
    }
  }
  return result.sort((a, b) => a.path.localeCompare(b.path));
}
function changedFiles(base, head) {
  if (![base, head].every(sha => /^[a-f0-9]{40}$/.test(sha))) {
    throw new Error('BASE_SHA and HEAD_SHA must be 40-character SHA values');
  }
  return execFileSync('git', ['diff', '--name-only', '-z', base, head], { cwd: repo })
    .toString('utf8')
    .split('\0')
    .filter(Boolean);
}
const representative = new Set(['@svitlo/math', '@svitlo/art', '@svitlo/playground', '@svitlo/astronomy']);
export function selectContentBuilds(changed, workspaces, all = false) {
  if (all) return workspaces.map(w => w.path);
  const selected = new Set();
  for (const file of changed) {
    const w = workspaces.filter(w => file.startsWith(w.path + '/')).sort((a, b) => b.path.length - a.path.length)[0];
    if (w) selected.add(w.path);
  }
  // A change to common packaging affects consumers. Sample representative
  // distributions rather than rebuilding all textbooks on every tooling PR.
  if (changed.some(file => file.startsWith('scripts/textbook-tooling/'))) {
    for (const w of workspaces) if (representative.has(w.name)) selected.add(w.path);
  }
  return workspaces.map(w => w.path).filter(path => selected.has(path));
}
export function resolveAgentScope(baseRef, headRef, changed, workspaces, owners) {
  const agent = /^feat\/([a-z-]+)-skills-agent-([1-4])$/.exec(headRef || '');
  if (!agent || baseRef !== 'feat/' + agent[1] + '-skills-integration') return null;
  const workspace = workspaces.find(w => w.name === '@svitlo/' + agent[1]);
  const domains = owners[agent[1]]?.[agent[2]];
  if (!workspace || !domains?.length) throw new Error('No mapping for agent branch ' + headRef);
  if (!changed.some(f => f.startsWith(workspace.path + '/'))) return null;
  return { workspace, domains };
}
function validateAgent({ workspace, domains }) {
  // Preserve strict ownership checks for incomplete agent integration branches.
  run('node', [
    'shared/engine/scripts/checkSkillsTaxonomyStructure/check-skills-taxonomy-structure.mjs',
    workspace.path + '/data/skills',
  ]);
  run('npm', ['run', 'package:build', '--workspace', '@svitlo/contracts']);
  run('npm', ['run', 'package:build', '--workspace', '@svitlo/engine']);
  const file = join(repo, workspace.path, 'tsconfig.agent-ci.tmp.json');
  try {
    writeFileSync(
      file,
      JSON.stringify(
        {
          extends: './tsconfig.json',
          compilerOptions: { strict: true, incremental: false },
          include: domains.map(domain => 'data/skills/' + domain + '/**/*.ts'),
          exclude: [],
        },
        null,
        2,
      ) + '\n',
    );
    run('npx', ['tsc', '--noEmit', '-p', file]);
  } finally {
    if (existsSync(file)) unlinkSync(file);
  }
}
function verifyPackage(pkg, changed) {
  console.log('::group::' + pkg.name);
  try {
    run('npm', ['run', 'package:build', '--workspace', pkg.name]); // includes Skills graph checks
    if (pkg.scripts['code:lint:check']) run('npm', ['run', 'code:lint:check', '--workspace', pkg.name]);
    if (pkg.name === '@svitlo/math' && changed.some(f => f.startsWith('content/math/'))) {
      run('npm', ['run', 'test:types', '--workspace', pkg.name]);
      run('npm', ['run', 'test:components', '--workspace', pkg.name]);
    }
    if (pkg.name === '@svitlo/biology') {
      run('npm', ['run', 'test', '--workspace', '@svitlo/engine']);
    }
    const cwd = join(repo, pkg.path);
    const publisher = join(repo, 'scripts/textbook-tooling/publishTextbook/test-publish.mjs');
    const tests = pkg.name === '@svitlo/playground' ? [publisher, 'test-course-output.mjs'] : [publisher];
    run('node', ['--test', ...tests], cwd);
    run('node', [join(repo, 'scripts/textbook-tooling/checkPortability/check-portability.mjs')], cwd);
  } finally {
    console.log('::endgroup::');
  }
}
function execute(changed, all, baseRef, headRef) {
  run('node', ['--test', 'scripts/ci/buildChangedContent/build-changed-content.spec.mjs']);
  if (changed.some(f => /^scripts\/check-skills-taxonomy-structure(?:\.mjs|\.spec\.mjs)$/.test(f))) {
    run('node', [
      '--test',
      'shared/engine/scripts/checkSkillsTaxonomyStructure/check-skills-taxonomy-structure.spec.mjs',
    ]);
  }
  const workspaces = contentWorkspaces();
  const agent = resolveAgentScope(
    baseRef,
    headRef,
    changed,
    workspaces,
    readJson('scripts/ci/buildChangedContent/skills-agent-owners.json'),
  );
  if (agent) return validateAgent(agent);
  const targets = selectContentBuilds(changed, workspaces, all);
  if (!targets.length) {
    console.log('No changed content packages; no builds needed');
    return;
  }
  run('npm', ['run', 'repo:check:packages']);
  run('node', ['--test', 'scripts/checkBuiltPackageExports/check-built-package-exports.spec.mjs']);
  let failures = 0;
  for (const path of targets) {
    const pkg = workspaces.find(w => w.path === path);
    try {
      verifyPackage(pkg, changed);
    } catch (error) {
      failures++;
      console.error('::error title=' + pkg.name + '::' + error.message);
    }
  }
  if (failures) throw new Error(failures + ' content package(s) failed verification');
  run('npm', ['run', 'repo:check:artifacts', '--', '--packages', ...targets]);
}

if (process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  try {
    const all = process.argv[2] === '--all';
    const changed = all ? [] : changedFiles(process.env.BASE_SHA, process.env.HEAD_SHA);
    execute(changed, all, process.env.BASE_REF || '', process.env.HEAD_REF || '');
  } catch (error) {
    console.error(error);
    process.exitCode = 1;
  }
}
