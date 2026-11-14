#!/usr/bin/env node
/** Run only relevant, supported fast checks; full Quality remains manual. */
import fs from 'node:fs';
import path from 'node:path';
import { execFileSync, spawnSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';

const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../..');
function assert(ok, message) {
  if (!ok) throw new Error(message);
}
function json(file) {
  return JSON.parse(fs.readFileSync(path.join(repoRoot, file), 'utf8'));
}
function exec(command, args, cwd = repoRoot) {
  const result = spawnSync(command, args, { cwd, stdio: 'inherit', shell: false });
  assert(
    !result.error && result.status === 0,
    'FastGate command failed: ' + command + ' ' + args.join(' ') + (result.error ? ': ' + result.error.message : ''),
  );
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
export function chooseChecks(changed, workspaces) {
  const affected = new Set();
  const packages = new Map(workspaces.map(w => [w.name, w]));
  const global = changed.some(f => f === 'package.json' || f.startsWith('scripts/checkWorkspaces/check-workspaces'));
  const lockChange = changed.includes('package-lock.json');
  for (const file of changed) {
    const pkg = packageFor(file, workspaces);
    if (pkg) affected.add(pkg.name);
  }
  if (global) for (const name of packages.keys()) affected.add(name);
  if (lockChange)
    for (const name of ['@svitlo/engine', '@svitlo/indexdb', '@svitlo/ui-kit']) {
      if (packages.has(name)) affected.add(name);
    }

  // IndexDB depends on Engine runtime schemas, not just on its own source files.
  // A changed upstream contract must validate the dependent package as well.
  const indexdbRuntimeContractChanged = changed.some(
    file =>
      file === 'shared/engine/runtime.ts' ||
      file === 'shared/engine/package.json' ||
      file.startsWith('shared/engine/schemas/') ||
      file.startsWith('shared/engine/types/') ||
      file.startsWith('shared/engine/configurators/questions/') ||
      file.startsWith('shared/engine/configurators/lessons/') ||
      file.startsWith('shared/engine/configurators/sections/'),
  );
  if (indexdbRuntimeContractChanged && packages.has('@svitlo/indexdb')) {
    affected.add('@svitlo/indexdb');
  }
  const jsFiles = changed.filter(f => /\.(?:mjs|cjs|js)$/.test(f) && fs.existsSync(path.join(repoRoot, f)));
  const jsonFiles = changed.filter(f => f.endsWith('.json') && fs.existsSync(path.join(repoRoot, f)));
  return { affected, jsFiles, jsonFiles };
}
function changedFiles(base, head) {
  assert(/^[a-f0-9]{40}$/.test(base) && /^[a-f0-9]{40}$/.test(head), 'Base and head must be 40-character commit SHAs');
  return execFileSync('git', ['diff', '--name-only', '-z', base, head], { cwd: repoRoot })
    .toString('utf8')
    .split('\0')
    .filter(Boolean);
}
function runGate(changed) {
  const workspaces = expandWorkspaces();
  const all = new Map(workspaces.map(w => [w.name, w]));
  const plan = chooseChecks(changed, workspaces);
  for (const f of plan.jsFiles) exec('node', ['--check', f]);
  for (const f of plan.jsonFiles) json(f);
  exec('node', ['--test', 'scripts/runFastGate/run-fast-gate.spec.mjs']);
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

  // Run the complete Art preview only when the migration utility changes.
  // It writes to an isolated temporary directory; authored Skills stay untouched.
  if (
    changed.some(f => f.startsWith('shared/engine/scripts/migrateSkillsConfigurators/migrate-skills-configurators.'))
  ) {
    exec('node', ['--test', 'shared/engine/scripts/migrateSkillsConfigurators/migrate-skills-configurators.spec.mjs']);
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
      if (d.path.startsWith('shared/') && d.scripts?.['package:build'] && !built.has(dep)) {
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
  for (const name of targets) {
    const pkg = all.get(name);
    if (!pkg?.scripts?.['code:check:types']) continue;
    ensureSharedDependencies(name);
    // Some shared packages typecheck their own public dist exports (e.g. IndexDB browser tests).
    if (pkg.path.startsWith('shared/') && pkg.scripts?.['package:build'] && !built.has(name)) {
      exec('npm', ['run', 'package:build', '--workspace', name]);
      built.add(name);
    }
    exec('npm', ['run', 'code:check:types', '--workspace', name]);
    // Validate shared package behavior before unrelated textbooks can fail on
    // incomplete authored data. Dependencies are built in the same pass.
    if (pkg.path.startsWith('shared/') && pkg.scripts?.test) {
      exec('npm', ['run', 'test', '--workspace', name]);
    }
    // A Lesson/App Router extraction needs a real Next.js production build, not
    // only TypeScript. Run it before unrelated textbook data checks can block CI.
    if (
      name === '@svitlo/web' &&
      changed.some(
        file =>
          file.startsWith('shared/adapters/nextjs/') ||
          file.startsWith('shared/ui-kit/src/components/lesson/') ||
          file.startsWith('shared/ui-kit/src/components/widgets/ContentBlockRenderer/blocks/Image/') ||
          file.startsWith('content/playground/scenes/') ||
          file.startsWith('content/playground/scripts/') ||
          file === 'content/playground/package.json' ||
          file.startsWith('apps/web/'),
      )
    ) {
      exec('npm', ['run', 'app:build', '--workspace', name]);
      exec('npm', ['run', 'test:unit:selection', '--workspace', name]);
      exec('npm', ['run', 'test:components', '--workspace', name]);
    }
  }
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
      runGate(['package.json']);
    } else if (args.length === 2) {
      runGate(changedFiles(args[0], args[1]));
    } else throw new Error('Usage: node scripts/runFastGate/run-fast-gate.mjs <base-sha> <head-sha> | --all');
  } catch (error) {
    console.error(error.message);
    process.exitCode = 1;
  }
}
