#!/usr/bin/env node
/** Run only relevant, supported fast checks; full Quality remains manual. */
import fs from 'node:fs';
import path from 'node:path';
import { execFileSync, spawnSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';

const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
function assert(ok, message) {
  if (!ok) throw new Error(message);
}
function json(file) {
  return JSON.parse(fs.readFileSync(path.join(repoRoot, file), 'utf8'));
}
function exec(command, args) {
  const result = spawnSync(command, args, { cwd: repoRoot, stdio: 'inherit', shell: false });
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
  const global = changed.some(f => f === 'package.json' || f.startsWith('scripts/check-workspaces'));
  const lockChange = changed.includes('package-lock.json');
  for (const file of changed) {
    const pkg = packageFor(file, workspaces);
    if (pkg) affected.add(pkg.name);
    if (
      file.startsWith('shared/') &&
      pkg &&
      ['@svitlo/contracts', '@svitlo/engine', '@svitlo/indexdb', '@svitlo/ui-kit'].includes(pkg.name)
    ) {
      affected.add('@svitlo/math');
    }
  }
  if (global) for (const name of packages.keys()) affected.add(name);
  if (lockChange)
    for (const name of ['@svitlo/contracts', '@svitlo/engine', '@svitlo/indexdb', '@svitlo/ui-kit', '@svitlo/math']) {
      if (packages.has(name)) affected.add(name);
    }
  const taxonomy =
    global ||
    lockChange ||
    changed.some(
      f =>
        f.startsWith('content/math/data/skills/') ||
        f.startsWith('scripts/check-skills-taxonomy-structure') ||
        f.startsWith('shared/contracts/') ||
        f.startsWith('shared/engine/'),
    );
  const mathComponents = changed.some(f => f.startsWith('content/math/src/') && /\.(ts|tsx|js|jsx)$/.test(f));
  const jsFiles = changed.filter(f => /\.(?:mjs|cjs|js)$/.test(f) && fs.existsSync(path.join(repoRoot, f)));
  const jsonFiles = changed.filter(f => f.endsWith('.json') && fs.existsSync(path.join(repoRoot, f)));
  return { affected, taxonomy, mathComponents, jsFiles, jsonFiles };
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
  exec('node', ['--test', 'scripts/check-skills-taxonomy-structure.spec.mjs', 'scripts/run-fast-gate.spec.mjs']);
  if (
    changed.some(
      f =>
        f.startsWith('scripts/generators/pages/skillAnalytics/') ||
        f.startsWith('content/playground/data/skills/'),
    )
  ) {
    exec('node', ['--test', 'scripts/generators/pages/skillAnalytics/generate-skill-analytics.spec.mjs']);
    exec('node', [
      'scripts/generators/pages/skillAnalytics/generate-skill-analytics.mjs',
      '--package',
      'content/playground',
      '--measure',
    ]);
  }
  if (
    changed.some(f =>
      /^scripts\/(?:implement-skills-taxonomy|generate-skills-taxonomy)(?:\.mjs|\.spec\.mjs|\.roundtrip\.spec\.mjs)$/.test(
        f,
      ),
    )
  ) {
    exec('node', [
      '--test',
      'scripts/implement-skills-taxonomy.spec.mjs',
      'scripts/generate-skills-taxonomy.spec.mjs',
      'scripts/generate-skills-taxonomy.roundtrip.spec.mjs',
    ]);
  }
  if (plan.taxonomy) exec('node', ['scripts/check-skills-taxonomy-structure.mjs']);

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
      if (d.path.startsWith('shared/') && d.scripts?.build && !built.has(dep)) {
        exec('npm', ['run', 'build', '--workspace', dep]);
        built.add(dep);
      }
    }
  }
  // Validate the foundational runtime first. An unrelated textbook's unfinished
  // content translations must not hide failures in a changed shared package.
  const priority = [
    '@svitlo/contracts',
    '@svitlo/engine',
    '@svitlo/indexdb',
    '@svitlo/ui-kit',
    '@svitlo/nextjs-adapter',
    '@svitlo/playground',
    '@svitlo/web',
  ];
  const rank = name => {
    const index = priority.indexOf(name);
    return index < 0 ? priority.length : index;
  };
  const targets = [...plan.affected].sort((a, b) => rank(a) - rank(b) || a.localeCompare(b));
  // A non-Next React DOM browser bundle proves that textbook exports and lazy
  // Scenes work without the Next.js compiler. Run before unrelated typechecks.
  if (changed.some(file =>
    file.startsWith('apps/web/') ||
    file.startsWith('content/playground/src/components/scenes/') ||
    file.startsWith('content/playground/scripts/check-react-dom-portability') ||
    file === 'content/playground/package.json' ||
    file === 'shared/ui-kit/src/scene-locale.tsx'
  )) {
    exec('npm', ['run', 'test:portability', '--workspace', '@svitlo/playground']);
  }

  // Authored textbook taxonomy imports @svitlo/engine/taxonomy. Its exported declarations
  // exist only after the shared Engine build; data/ is now included in textbook tsconfigs.
  // Build this prerequisite for affected textbooks even when their manifests have not
  // yet declared an explicit Engine dependency.
  const textbookTaxonomyChanged = targets.some(name => {
    const pkg = all.get(name);
    return pkg?.path.startsWith('content/') && fs.existsSync(path.join(repoRoot, pkg.path, 'data/skills'));
  });
  if (textbookTaxonomyChanged) {
    ensureSharedDependencies('@svitlo/engine');
    if (!built.has('@svitlo/engine')) {
      exec('npm', ['run', 'build', '--workspace', '@svitlo/engine']);
      built.add('@svitlo/engine');
    }
  }
  for (const name of targets) {
    const pkg = all.get(name);
    if (!pkg?.scripts?.typecheck) continue;
    ensureSharedDependencies(name);
    // Some shared packages typecheck their own public dist exports (e.g. IndexDB browser tests).
    if (pkg.path.startsWith('shared/') && pkg.scripts?.build && !built.has(name)) {
      exec('npm', ['run', 'build', '--workspace', name]);
      built.add(name);
    }
    exec('npm', ['run', 'typecheck', '--workspace', name]);
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
          file.startsWith('shared/nextjs-adapter/') ||
          file.startsWith('shared/ui-kit/src/components/lesson/') ||
          file.startsWith('shared/ui-kit/src/components/widgets/ContentBlockRenderer/blocks/Image/') ||
          file.startsWith('content/playground/src/components/scenes/') ||
          file.startsWith('apps/web/'),
      )
    ) {
      exec('npm', ['run', 'build', '--workspace', name]);
      exec('npm', ['run', 'test:selection', '--workspace', name]);
      exec('npm', ['run', 'test:components', '--workspace', name]);
    }
  }
  if (
    changed.some(
      file =>
        file.startsWith('scripts/generate-lessons-markdown.') ||
        file.startsWith('scripts/generate-lesson-review-artifacts.') ||
        file.startsWith('scripts/lib/lesson-markdown.') ||
        file.startsWith('shared/engine/src/utils/generators/lessons/') ||
        file.startsWith('content/playground/data/lessons/'),
    )
  ) {
    ensureSharedDependencies('@svitlo/engine');
    if (!built.has('@svitlo/engine')) {
      exec('npm', ['run', 'build', '--workspace', '@svitlo/engine']);
      built.add('@svitlo/engine');
    }
    exec('node', [
      '--test',
      'scripts/generate-lessons-markdown.spec.mjs',
      'scripts/generate-lesson-review-artifacts.spec.mjs',
    ]);
  }

  if (plan.mathComponents) {
    ensureSharedDependencies('@svitlo/math');
    exec('npm', ['run', 'test:components', '--workspace', '@svitlo/math']);
  }
}

if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  try {
    const args = process.argv.slice(2);
    if (args.length === 1 && args[0] === '--all') {
      runGate(['package.json', 'content/math/data/skills/index.ts']);
    } else if (args.length === 2) {
      runGate(changedFiles(args[0], args[1]));
    } else throw new Error('Usage: node scripts/run-fast-gate.mjs <base-sha> <head-sha> | --all');
  } catch (error) {
    console.error(error.message);
    process.exitCode = 1;
  }
}
