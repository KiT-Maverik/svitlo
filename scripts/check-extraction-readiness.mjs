import { existsSync, readFileSync, readdirSync } from 'node:fs';
import { builtinModules } from 'node:module';
import { dirname, isAbsolute, join, relative, resolve, sep } from 'node:path';
import { importedModules } from './production-imports.mjs';

const root = process.cwd();
const readJson = name => JSON.parse(readFileSync(resolve(root, name), 'utf8'));
const builtins = new Set(builtinModules.map(name => name.replace(/^node:/, '')));
const workspaces = [
  ['shared/contracts', readJson('shared/contracts/package.json')],
  ['shared/engine', readJson('shared/engine/package.json')],
  ['shared/indexdb', readJson('shared/indexdb/package.json')],
  ['shared/ui-kit', readJson('shared/ui-kit/package.json')],
  ['shared/nextjs-adapter', readJson('shared/nextjs-adapter/package.json')],
  ['learningApps/playground', readJson('learningApps/playground/package.json')],
  ['learningApps/math', readJson('learningApps/math/package.json')],
  ['learningApps/physics', readJson('learningApps/physics/package.json')],
  ['learningApps/biology', readJson('learningApps/biology/package.json')],
  ['learningApps/geography', readJson('learningApps/geography/package.json')],
  ['learningApps/informatics', readJson('learningApps/informatics/package.json')],
  ['learningApps/language-literature', readJson('learningApps/language-literature/package.json')],
  ['learningApps/languages/ukrainian', readJson('learningApps/languages/ukrainian/package.json')],
  ['learningApps/chemistry', readJson('learningApps/chemistry/package.json')],
  ['learningApps/astronomy', readJson('learningApps/astronomy/package.json')],
  ['learningApps/history', readJson('learningApps/history/package.json')],
  ['learningApps/philosophy', readJson('learningApps/philosophy/package.json')],
  ['learningApps/psychology', readJson('learningApps/psychology/package.json')],
  ['learningApps/economics', readJson('learningApps/economics/package.json')],
  ['learningApps/art', readJson('learningApps/art/package.json')],
  ['learningApps/health-safety', readJson('learningApps/health-safety/package.json')],
  ['learningApps/engineering', readJson('learningApps/engineering/package.json')],
  ['frontend/platform', readJson('frontend/platform/package.json')],
];
const byName = new Map(workspaces.map(([path, pkg]) => [pkg.name, { path, pkg }]));
function assert(ok, message) {
  if (!ok) throw new Error(message);
}
function walk(dir) {
  return readdirSync(dir, { withFileTypes: true }).flatMap(entry => {
    const item = join(dir, entry.name);
    return entry.isDirectory() ? walk(item) : entry.isFile() ? [item] : [];
  });
}
function isProductionSource(file) {
  return (
    /\.(ts|tsx)$/.test(file) &&
    !/\.(spec|test|e2e|stories|typecheck|unit\.fx|unit\.mx)\.(ts|tsx)$/.test(file) &&
    !file.includes(sep + 'testing' + sep) &&
    // Generation utilities run only while publishing authored textbook data.
    !file.includes(sep + 'utils' + sep + 'generators' + sep)
  );
}
function packageName(specifier) {
  return specifier.startsWith('@') ? specifier.split('/').slice(0, 2).join('/') : specifier.split('/')[0];
}
function isPublicImport(pkg, specifier) {
  const subpath = specifier === pkg.name ? '.' : '.' + specifier.slice(pkg.name.length);
  return Object.keys(pkg.exports || {}).some(key => {
    if (key === subpath) return true;
    const wildcard = key.indexOf('*');
    return wildcard >= 0 && subpath.startsWith(key.slice(0, wildcard)) && subpath.endsWith(key.slice(wildcard + 1));
  });
}

function isDeclaredPackageImport(pkg, specifier) {
  return Object.keys(pkg.imports || {}).some(key => {
    if (key === specifier) return true;
    const wildcard = key.indexOf('*');
    return wildcard >= 0 && specifier.startsWith(key.slice(0, wildcard)) && specifier.endsWith(key.slice(wildcard + 1));
  });
}

for (const [path, pkg] of workspaces) {
  const packageRoot = resolve(root, path);
  const tsconfig = readJson(path + '/tsconfig.json');
  if (tsconfig.extends && tsconfig.extends.startsWith('.')) {
    const base = relative(packageRoot, resolve(packageRoot, tsconfig.extends));
    assert(
      base !== '..' && !base.startsWith('..' + sep) && !isAbsolute(base),
      'External TypeScript config prevents standalone extraction: ' + path + ' -> ' + tsconfig.extends,
    );
  }
  const declared = new Set(Object.keys({ ...(pkg.dependencies || {}), ...(pkg.peerDependencies || {}) }));
  const localAliases = readJson(path + '/tsconfig.json').compilerOptions?.paths || {};
  for (const file of walk(join(packageRoot, 'src')).filter(isProductionSource)) {
    for (const specifier of importedModules(readFileSync(file, 'utf8'), file)) {
      const description = relative(root, file) + ' -> ' + specifier;
      if (specifier.startsWith('.')) {
        const target = resolve(dirname(file), specifier);
        const remainder = relative(packageRoot, target);
        assert(
          remainder !== '..' && !remainder.startsWith('..' + sep) && !isAbsolute(remainder),
          'Cross-package relative import: ' + description,
        );
        continue;
      }
      if (specifier.startsWith('#')) {
        assert(isDeclaredPackageImport(pkg, specifier), 'Undeclared package-local import: ' + description);
        continue;
      }
      if (specifier.startsWith('@/') || Object.hasOwn(localAliases, specifier)) {
        assert(
          path.startsWith('learningApps/') || path.startsWith('frontend/'),
          'Unrewritten shared source alias: ' + description,
        );
        continue;
      }
      if (specifier.startsWith('node:') || builtins.has(specifier)) continue;
      // Next.js compile-time markers are not standalone runtime dependencies.
      if ((path.startsWith('learningApps/') || path.startsWith('frontend/')) &&
          (specifier === 'server-only' || specifier === 'client-only')) continue;
      const name = packageName(specifier);
      if (byName.has(name)) {
        assert(name !== pkg.name, 'Self-import through workspace resolver: ' + description);
        assert(declared.has(name), 'Undeclared workspace dependency: ' + description);
        assert(isPublicImport(byName.get(name).pkg, specifier), 'Non-public package import: ' + description);
      } else {
        assert(!specifier.startsWith('@svitlo/'), 'Unknown Svitlo workspace: ' + description);
        assert(declared.has(name), 'Undeclared production dependency: ' + description);
        assert(
          path !== 'shared/engine' && path !== 'shared/contracts',
          'Engine and Contracts cannot depend on external runtime modules: ' + description,
        );
        assert(path !== 'shared/ui-kit' || name !== 'next',
          'UI Kit depends on unsupported Next.js runtime: ' + description);
      }
    }
  }
}

for (const [path, pkg] of workspaces.filter(([name]) => name.startsWith('shared/'))) {
  for (const [subpath, entry] of Object.entries(pkg.exports || {})) {
    if (subpath.includes('*')) continue;
    const target = entry.default;
    assert(typeof target === 'string', 'Missing runtime export: ' + pkg.name + subpath);
    if (target.startsWith('./scripts/')) {
      assert(existsSync(resolve(root, path, target)), 'Missing public script: ' + pkg.name + subpath);
    } else {
      assert(
        target.startsWith('./dist/') && target.endsWith('.js'),
        'Invalid compiled entrypoint: ' + pkg.name + subpath,
      );
      const sourcePath = target.replace('./dist/', 'src/').replace(/\.js$/, '');
      assert(
        ['.ts', '.tsx'].some(ext => existsSync(resolve(root, path, sourcePath + ext))),
        'Missing public entrypoint source: ' + pkg.name + subpath,
      );
      assert(entry.types === target.replace(/\.js$/, '.d.ts'), 'Mismatched declarations: ' + pkg.name + subpath);
    }
  }
}

const kit = readJson('shared/ui-kit/package.json');
for (const path of ['dist', 'assets/flags', 'scripts/sync-flags.mjs']) {
  assert(kit.files && kit.files.includes(path), 'UI Kit package files omit ' + path);
  if (path !== 'dist') assert(existsSync(resolve(root, 'shared/ui-kit', path)), 'Missing asset: ' + path);
}
assert(
  kit.exports?.['./sync-flags']?.default === './scripts/sync-flags.mjs',
  'UI Kit must export the included flag sync script',
);
assert(
  readdirSync(resolve(root, 'shared/ui-kit/assets/flags')).some(name => name.endsWith('.svg')),
  'Flag assets are missing',
);
console.log('Stage 5 extraction readiness: source imports, dependencies, public exports, and static assets verified.');

// Storybook is owned by UI Kit, not coupled to either Next.js application.
const storybookMain = readFileSync(resolve(root, 'shared/ui-kit/.storybook/main.ts'), 'utf8');
assert(
  !/\b(?:apps|learningApps)\/|\.\.\/\.\.\/shared\/|\.\.\/\.\.\/(?:apps|learningApps)\//.test(storybookMain),
  'UI Kit Storybook must not read application or monorepo source paths',
);
assert(
  readJson('shared/ui-kit/package.json').scripts?.['build-storybook'],
  'UI Kit must own the Storybook build command',
);
for (const application of [
  'learningApps/playground',
  'learningApps/math',
  'learningApps/physics',
  'learningApps/geography',
  'learningApps/informatics',
  'learningApps/biology',
  'learningApps/language-literature',
  'learningApps/languages/ukrainian',
  'learningApps/chemistry',
  'learningApps/astronomy',
  'learningApps/history',
  'learningApps/philosophy',
  'learningApps/psychology',
  'learningApps/economics',
  'learningApps/art',
  'learningApps/health-safety',
  'learningApps/engineering',
]) {
  assert(
    !existsSync(resolve(root, application, '.storybook')),
    'Application Storybook must not depend on shared source trees: ' + application,
  );
  const appManifest = readJson(application + '/package.json');
  assert(
    !appManifest.scripts?.storybook && !appManifest.scripts?.['build-storybook'],
    'Storybook commands must be owned by UI Kit: ' + application,
  );
}
