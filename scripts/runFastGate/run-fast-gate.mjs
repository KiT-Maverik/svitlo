#!/usr/bin/env node
/** Run only relevant, supported fast checks; full Quality remains manual. */
import fs from 'node:fs';
import path from 'node:path';
import { spawn, spawnSync } from 'node:child_process';
import { changedFiles } from '../ci/prDiff/changed-files.mjs';
import { changedPublicContracts } from './public-contract-impact.mjs';
import { fileURLToPath } from 'node:url';

const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../..');
const markdownRendererPath = 'shared/ui-kit/src/components/widgets/ContentBlockRenderer/blocks/Markdown/';
function assert(ok, message) {
  if (!ok) throw new Error(message);
}
function json(file) {
  return JSON.parse(fs.readFileSync(path.join(repoRoot, file), 'utf8'));
}
const quietRunner = path.join(repoRoot, 'scripts/ci/quietRun/quiet-run.mjs');
function exec(command, args, cwd = repoRoot) {
  const result = spawnSync(process.execPath, [quietRunner, '--', command, ...args], {
    cwd,
    stdio: 'inherit',
    shell: false,
  });
  assert(
    !result.error && result.status === 0,
    'FastGate command failed: ' + command + ' ' + args.join(' ') + (result.error ? ': ' + result.error.message : ''),
  );
}
function execAsync(command, args) {
  return new Promise((resolve, reject) => {
    const child = spawn(process.execPath, [quietRunner, '--', command, ...args], {
      cwd: repoRoot,
      stdio: 'inherit',
      shell: false,
    });
    child.once('error', reject);
    child.once('close', code =>
      code === 0
        ? resolve()
        : reject(new Error('FastGate command failed: ' + command + ' ' + args.join(' ') + ' (exit ' + code + ')')),
    );
  });
}
async function runParallel(targets, action) {
  const configured = Number(process.env.SVITLO_FASTGATE_PARALLELISM || 2);
  assert(
    Number.isInteger(configured) && configured >= 1 && configured <= 8,
    'SVITLO_FASTGATE_PARALLELISM must be an integer from 1 to 8',
  );
  let index = 0;
  const failures = [];
  async function worker() {
    while (index < targets.length) {
      const name = targets[index++];
      try {
        await action(name);
      } catch (error) {
        failures.push(name + ': ' + error.message);
      }
    }
  }
  await Promise.all(Array.from({ length: Math.min(configured, targets.length) }, () => worker()));
  if (failures.length) throw new Error('FastGate failed workspaces:\\n' + failures.join('\\n'));
}
function expandWorkspaces() {
  const result = [];
  for (const pattern of json('package.json').workspaces) {
    assert(pattern.endsWith('/*'), 'Unsupported workspace pattern: ' + pattern);
    const dir = path.join(repoRoot, pattern.slice(0, -2));
    for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
      if (!entry.isDirectory()) continue;
      const relative = path.posix.join(pattern.slice(0, -2), entry.name);
      const manifest = path.join(repoRoot, relative, 'package.json');
      if (fs.existsSync(manifest)) result.push({ path: relative, ...json(relative + '/package.json') });
    }
  }
  const seen = new Set();
  for (const pkg of result) {
    assert(!seen.has(pkg.name), 'Duplicate workspace name: ' + pkg.name);
    seen.add(pkg.name);
  }
  return result;
}
function packageFor(file, workspaces) {
  return workspaces.filter(w => file.startsWith(w.path + '/')).sort((a, b) => b.path.length - a.path.length)[0];
}
/**
 * Select only edited owners and downstream consumers of changed public APIs or
 * package manifests. Graph edges include declared development dependencies,
 * which are required to typecheck many textbooks.
 */
export function workspaceDependents(workspaces) {
  const packages = new Map(workspaces.map(pkg => [pkg.name, pkg]));
  const edges = new Map(workspaces.map(pkg => [pkg.name, new Set()]));
  const dependencies = new Map();
  for (const pkg of workspaces) {
    const deps = new Set(
      ['dependencies', 'devDependencies', 'peerDependencies', 'optionalDependencies']
        .flatMap(key => Object.keys(pkg[key] || {}))
        .filter(name => packages.has(name)),
    );
    const missing = ['dependencies', 'devDependencies', 'peerDependencies', 'optionalDependencies']
      .flatMap(key => Object.keys(pkg[key] || {}))
      .filter(name => name.startsWith('@svitlo/') && !packages.has(name));
    assert(!missing.length, 'Unknown workspace dependency in ' + pkg.name + ': ' + missing.join(', '));
    dependencies.set(pkg.name, deps);
    for (const dep of deps) edges.get(dep).add(pkg.name);
  }
  const done = new Set();
  function checkCycle(name, visiting = new Set()) {
    assert(!visiting.has(name), 'Cyclic workspace dependency: ' + [...visiting, name].join(' → '));
    if (done.has(name)) return;
    const next = new Set([...visiting, name]);
    for (const dep of dependencies.get(name)) checkCycle(dep, next);
    done.add(name);
  }
  for (const name of packages.keys()) checkCycle(name);
  return edges;
}

export function chooseChecks(changed, workspaces, { publicChanges = [] } = {}) {
  const affected = new Set();
  const packages = new Map(workspaces.map(pkg => [pkg.name, pkg]));
  const global = changed.some(file => file === 'package.json' || file.startsWith('scripts/checkWorkspaces/check-workspaces'));
  const lockChange = changed.includes('package-lock.json');
  const triggers = new Set();
  for (const file of changed) {
    const pkg = packageFor(file, workspaces);
    if (pkg) affected.add(pkg.name);
    if (pkg && file === pkg.path + '/package.json') triggers.add(pkg.name);
  }
  for (const file of publicChanges) {
    const pkg = packageFor(file, workspaces);
    if (pkg) triggers.add(pkg.name);
  }
  const dependents = workspaceDependents(workspaces);
  const visit = [...triggers];
  while (visit.length) {
    const parent = visit.pop();
    for (const child of dependents.get(parent) || []) {
      if (!affected.has(child)) affected.add(child);
      if (!triggers.has(child)) {
        triggers.add(child);
        visit.push(child);
      }
    }
  }
  // Root manifest/lockfile edits may alter dependency resolution everywhere.
  // Validate all workspaces rather than pretending a changed external version
  // affects only a hand-picked subset.
  if (global || lockChange) for (const name of packages.keys()) affected.add(name);
  // The host's CSS bundling is not represented by TypeScript declarations.
  if (changed.some(file => file.startsWith(markdownRendererPath)) && packages.has('@svitlo/web')) {
    affected.add('@svitlo/web');
  }
  const jsFiles = changed.filter(file => /\.(?:mjs|cjs|js)$/.test(file) && fs.existsSync(path.join(repoRoot, file)));
  const jsonFiles = changed.filter(file => file.endsWith('.json') && fs.existsSync(path.join(repoRoot, file)));
  return { affected, jsFiles, jsonFiles };
}
/** A host production build catches CSS dependencies that UI Kit's TS tests cannot. */
export function requiresWebBuild(changed) {
  return changed.some(
    file =>
      file.startsWith('shared/adapters/nextjs/') ||
      file.startsWith('shared/ui-kit/src/components/lesson/') ||
      file.startsWith('shared/ui-kit/src/components/widgets/ContentBlockRenderer/blocks/Image/') ||
      file.startsWith(markdownRendererPath) ||
      file.startsWith('content/playground/scenes/') ||
      file.startsWith('content/playground/scripts/') ||
      file === 'content/playground/package.json' ||
      file.startsWith('apps/web/'),
  );
}

/** Build dependencies that a workspace typecheck consumes through published exports. */
export function shouldBuildDependency(owner, dependency) {
  return (
    Boolean(dependency.scripts?.['package:build']) &&
    (dependency.path.startsWith('shared/') ||
      (owner.path.startsWith('apps/') && dependency.path.startsWith('content/')))
  );
}

async function runGate(changed, base, head) {
  const workspaces = expandWorkspaces();
  const all = new Map(workspaces.map(w => [w.name, w]));
  const publicChanges = base && head ? changedPublicContracts(changed, workspaces, base, head) : [];
  if (publicChanges.length) console.log('Changed public contracts: ' + publicChanges.join(', '));
  const plan = chooseChecks(changed, workspaces, { publicChanges });
  for (const f of plan.jsFiles) exec('node', ['--check', f]);
  for (const f of plan.jsonFiles) json(f);
  exec('node', ['--test', 'scripts/runFastGate/run-fast-gate.spec.mjs', 'scripts/runFastGate/public-contract-impact.spec.mjs', 'scripts/ci/prDiff/changed-files.spec.mjs']);
  // A migration helper must never reintroduce deleted package imports.
  if (changed.some(file => file.startsWith('scripts/migrateEngineImports/'))) {
    exec('node', ['--test', 'scripts/migrateEngineImports/migrate-engine-imports.spec.mjs']);
  }
  // Engine build-only filesystem use must be distinguished from runtime leakage.
  // Exercise the canonical package boundary guard when it or Engine changes.
  if (changed.some(file => file.startsWith('scripts/checkPackageBoundaries/') || file.startsWith('shared/engine/'))) {
    exec('node', ['scripts/checkPackageBoundaries/check-package-boundaries.mjs']);
  }
  // Validate editorial Course composition independently of unrelated workspace
  // typecheck errors; the Course builder is deterministic repository tooling.
  if (
    changed.some(
      f =>
        f.startsWith('shared/engine/scripts/courseBuilder/') ||
        f === 'studio/skills/course-workflow/course-toc.schema.json',
    )
  ) {
    exec('node', ['--test', 'shared/engine/scripts/courseBuilder/courseBuilder.spec.mjs']);
  }

  if (
    changed.some(file => file === 'package.json' || file.startsWith('scripts/runWorkspaceScript/run-workspace-script.'))
  ) {
    exec('node', ['--test', 'scripts/runWorkspaceScript/run-workspace-script.spec.mjs']);
  }
  if (
    changed.some(
      f => f.startsWith('shared/engine/scripts/generateSkills/') || f.startsWith('content/playground/data/skills/'),
    )
  ) {
    exec('node', [
      '--test',
      'shared/engine/scripts/generateSkills/prepareSkillsPublication.spec.mjs',
      'shared/engine/generators/skills/publishSkillTree.spec.mjs',
    ]);
  }

  if (
    changed.some(
      f =>
        f.startsWith('shared/engine/scripts/implementSkillsTaxonomy/') ||
        f.startsWith('shared/engine/scripts/generateSkillsTaxonomy/'),
    )
  ) {
    exec('node', [
      '--test',
      'shared/engine/scripts/implementSkillsTaxonomy/implement-skills-taxonomy.spec.mjs',
      'shared/engine/scripts/generateSkillsTaxonomy/generate-skills-taxonomy.spec.mjs',
      'shared/engine/scripts/generateSkillsTaxonomy/generate-skills-taxonomy.roundtrip.spec.mjs',
    ]);
  }

  if (
    changed.some(
      file =>
        file.startsWith(
          'shared/ui-kit/scripts/generateAssessmentMethodsReference/generate-assessment-methods-reference.',
        ) ||
        file === 'scripts/generateTranslationReviewArtifacts/generate-translation-review-artifacts.mjs' ||
        file.startsWith('shared/ui-kit/data/definitions/assessmentMethods/'),
    )
  ) {
    exec('node', [
      '--test',
      'shared/ui-kit/scripts/generateAssessmentMethodsReference/generate-assessment-methods-reference.spec.mjs',
    ]);
  }

  // Keep review-reference generators testable independently of incomplete textbooks.
  if (
    changed.some(
      file =>
        file.startsWith('shared/ui-kit/scripts/generateUiKitLocaleReference/') ||
        file.startsWith('content/geography/scripts/generateHomeCopyReference/') ||
        file.startsWith('shared/engine/scripts/readSupportedLanguages/') ||
        file === 'scripts/generateTranslationReviewArtifacts/generate-translation-review-artifacts.mjs',
    )
  ) {
    exec('node', [
      '--test',
      'shared/ui-kit/scripts/generateUiKitLocaleReference/generate-ui-kit-locale-reference.spec.mjs',
      'content/geography/scripts/generateHomeCopyReference/generate-home-copy-reference.spec.mjs',
    ]);
  }

  // Markdown reference tests run when their code changes, not on each agent-artifacts request.
  if (
    changed.some(
      file =>
        file.startsWith('scripts/generateTranslationReviewArtifacts/') ||
        file.startsWith('shared/engine/scripts/generateLessonReviewArtifacts/') ||
        file === 'shared/engine/scripts/generateLessonsMarkdown/generate-lessons-markdown.mjs',
    )
  ) {
    exec('node', [
      '--test',
      'scripts/generateTranslationReviewArtifacts/generate-translation-review-artifacts.spec.mjs',
      'scripts/generateTranslationReviewArtifacts/education-standards-reference.spec.mjs',
      'shared/engine/scripts/generateLessonReviewArtifacts/generate-lesson-review-artifacts.spec.mjs',
    ]);
  }

  // Lesson builder is Engine-owned deterministic tooling: test it only when its
  // implementation, dependency, or canonical editorial input schemas change.
  if (
    changed.some(
      file =>
        file.startsWith('shared/engine/scripts/lessonBuilder/') ||
        file === 'package.json' ||
        file === 'package-lock.json' ||
        /^studio\/skills\/lesson-workflow\/lesson-(?:content|questions|methodology-frontmatter)\.schema\.json$/.test(
          file,
        ),
    )
  ) {
    exec('node', ['--test', 'shared/engine/scripts/lessonBuilder/lessonBuilder.spec.mjs']);
  }

  const built = new Set();
  function ensureSharedDependencies(name, visiting = new Set()) {
    assert(!visiting.has(name), 'Cyclic workspace dependency: ' + name);
    const pkg = all.get(name);
    assert(pkg, 'Unknown workspace: ' + name);
    const next = new Set([...visiting, name]);
    for (const dep of Object.keys(pkg.dependencies || {})) {
      if (!all.has(dep)) continue;
      ensureSharedDependencies(dep, next);
      const d = all.get(dep);
      if (shouldBuildDependency(pkg, d) && !built.has(dep)) {
        exec('npm', ['run', 'package:build', '--workspace', dep]);
        built.add(dep);
      }
    }
  }
  // Validate the foundational runtime first. An unrelated textbook's unfinished
  // content translations must not hide failures in a changed shared package.
  const priority = [
    '@svitlo/engine',
    '@svitlo/indexdb',
    '@svitlo/ui-kit',
    '@svitlo/adapter-nextjs',
    '@svitlo/playground',
    '@svitlo/web',
  ];
  const rank = name => {
    const index = priority.indexOf(name);
    return index < 0 ? priority.length : index;
  };
  const targets = [...plan.affected].sort((a, b) => rank(a) - rank(b) || a.localeCompare(b));
  // Content package compilation, Skills validation and portability belong to
  // the dedicated Content Build workflow. FastGate validates workspace types.
  // Prebuild each shared export once in dependency order before parallel checks.
  for (const name of targets) {
    const pkg = all.get(name);
    if (!pkg?.scripts?.['code:check:types']) continue;
    ensureSharedDependencies(name);
    if (pkg.path.startsWith('shared/') && pkg.scripts?.['package:build'] && !built.has(name)) {
      exec('npm', ['run', 'package:build', '--workspace', name]);
      built.add(name);
    }
  }
  // Independent workspace typechecks and tests run concurrently after dependencies
  // exist. Checks within each workspace preserve their original order.
  await runParallel(
    targets.filter(name => all.get(name)?.scripts?.['code:check:types']),
    async name => {
      const pkg = all.get(name);
      await execAsync('npm', ['run', 'code:check:types', '--workspace', name]);
      if (pkg.path.startsWith('shared/') && pkg.scripts?.test) {
        await execAsync('npm', ['run', 'test', '--workspace', name]);
      }
      if (name === '@svitlo/web' && requiresWebBuild(changed)) {
        await execAsync('npm', ['run', 'app:build', '--workspace', name]);
        await execAsync('npm', ['run', 'test:unit:selection', '--workspace', name]);
        await execAsync('npm', ['run', 'test:components', '--workspace', name]);
      }
    },
  );
  // Verify the on-demand coverage workflow itself when its implementation changes.
  // Ordinary Engine PRs do not pay for a second instrumented test run.
  if (
    changed.some(
      file =>
        file === '.github/workflows/engine-coverage.yml' ||
        file === 'shared/engine/tsconfig.test.json' ||
        file.startsWith('shared/engine/scripts/coverage/'),
    )
  ) {
    ensureSharedDependencies('@svitlo/engine');
    if (!built.has('@svitlo/engine')) {
      exec('npm', ['run', 'package:build', '--workspace', '@svitlo/engine']);
      built.add('@svitlo/engine');
    }
    exec('npm', ['run', 'test:coverage', '--workspace', '@svitlo/engine']);
  }

  if (
    changed.some(
      f =>
        f.startsWith('scripts/textbook-tooling/generate-scenes') ||
        f.startsWith('content/playground/scenes/') ||
        f === 'content/playground/package.json',
    )
  ) {
    ensureSharedDependencies('@svitlo/engine');
    if (!built.has('@svitlo/engine')) {
      exec('npm', ['run', 'package:build', '--workspace', '@svitlo/engine']);
      built.add('@svitlo/engine');
    }
    exec('node', ['--test', 'scripts/textbook-tooling/generateScenes/generate-scenes.spec.mjs']);
  }
  if (
    changed.some(
      file =>
        file.startsWith('shared/engine/scripts/generateLessonsMarkdown/generate-lessons-markdown.') ||
        file.startsWith('shared/engine/scripts/generateLessonReviewArtifacts/generate-lesson-review-artifacts.') ||
        file.startsWith('shared/engine/scripts/generateLessonsBySkill/generate-lessons-by-skill.') ||
        file === 'scripts/generateTranslationReviewArtifacts/generate-translation-review-artifacts.mjs' ||
        file.startsWith('shared/engine/scripts/generateLessonsMarkdown/lesson-markdown.') ||
        file.startsWith('shared/engine/src/utils/generators/lessons/') ||
        file.startsWith('content/playground/data/lessons/'),
    )
  ) {
    ensureSharedDependencies('@svitlo/engine');
    if (!built.has('@svitlo/engine')) {
      exec('npm', ['run', 'package:build', '--workspace', '@svitlo/engine']);
      built.add('@svitlo/engine');
    }
    exec('node', [
      '--test',
      'shared/engine/scripts/generateLessonsMarkdown/generate-lessons-markdown.spec.mjs',
      'shared/engine/scripts/generateLessonReviewArtifacts/generate-lesson-review-artifacts.spec.mjs',
      'shared/engine/scripts/generateLessonsBySkill/generate-lessons-by-skill.spec.mjs',
    ]);
  }
}

if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  try {
    const args = process.argv.slice(2);
    if (args.length === 1 && args[0] === '--all') {
      await runGate(['package.json']);
    } else if (args.length === 2) {
      await runGate(changedFiles(args[0], args[1]), args[0], args[1]);
    } else throw new Error('Usage: node scripts/runFastGate/run-fast-gate.mjs <base-sha> <head-sha> | --all');
  } catch (error) {
    console.error(error.message);
    process.exitCode = 1;
  }
}
