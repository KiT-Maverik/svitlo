import { existsSync, readFileSync, readdirSync } from 'node:fs';
import { builtinModules } from 'node:module';
import { dirname, isAbsolute, join, relative, resolve, sep } from 'node:path';
import { importedModules } from './production-imports.mjs';

const root = process.cwd();
const readJson = name => JSON.parse(readFileSync(resolve(root, name), 'utf8'));
const builtins = new Set(builtinModules.map(name => name.replace(/^node:/, '')));
const workspaces = [
  ['apps/web', readJson('apps/web/package.json')],
  ['shared/engine', readJson('shared/engine/package.json')],
  ['shared/indexdb', readJson('shared/indexdb/package.json')],
  ['shared/ui-kit', readJson('shared/ui-kit/package.json')],
  ['shared/adapters/nextjs', readJson('shared/adapters/nextjs/package.json')],
  ['content/playground', readJson('content/playground/package.json')],
  ['content/math', readJson('content/math/package.json')],
  ['content/physics', readJson('content/physics/package.json')],
  ['content/biology', readJson('content/biology/package.json')],
  ['content/geography', readJson('content/geography/package.json')],
  ['content/informatics', readJson('content/informatics/package.json')],
  ['content/language-literature', readJson('content/language-literature/package.json')],
  ['content/languages/ukrainian', readJson('content/languages/ukrainian/package.json')],
  ['content/chemistry', readJson('content/chemistry/package.json')],
  ['content/astronomy', readJson('content/astronomy/package.json')],
  ['content/history', readJson('content/history/package.json')],
  ['content/philosophy', readJson('content/philosophy/package.json')],
  ['content/psychology', readJson('content/psychology/package.json')],
  ['content/economics', readJson('content/economics/package.json')],
  ['content/art', readJson('content/art/package.json')],
  ['content/health-safety', readJson('content/health-safety/package.json')],
  ['content/engineering', readJson('content/engineering/package.json')],
  ['apps/platform', readJson('apps/platform/package.json')],
];
const byName = new Map(workspaces.map(([path, pkg]) => [pkg.name, { path, pkg }]));
function assert(ok, message) {
  if (!ok) throw new Error(message);
}
function walk(dir) {
  if (!existsSync(dir)) return []; // Compiled textbook packages intentionally omit src/.
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
  // Compiled textbook packages may not own any src/ tree. Their authored data/
  // is consumed by build-time Engine generators, never by runtime entrypoints.
  const sourceRoots =
    path === 'shared/engine'
      ? [
          'index.ts',
          'build.ts',
          'runtime.ts',
          'assemblers',
          'builders',
          'configurators',
          'content',
          'data',
          'definitions',
          'generation',
          'lesson',
          'lessons',
          'localization',
          'schemas',
          'taxonomy',
          'types',
          'utils',
        ].map(name => join(packageRoot, name))
      : [join(packageRoot, 'src')];
  const sourceFiles = sourceRoots.flatMap(folder =>
    existsSync(folder) ? (folder.endsWith('.ts') ? [folder] : walk(folder)) : [],
  );
  for (const file of sourceFiles.filter(isProductionSource)) {
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
          path.startsWith('content/') || path.startsWith('apps/'),
          'Unrewritten shared source alias: ' + description,
        );
        continue;
      }
      if (specifier.startsWith('node:') || builtins.has(specifier)) continue;
      // Next.js compile-time markers are not standalone runtime dependencies.
      if (
        (path.startsWith('content/') || path.startsWith('apps/')) &&
        (specifier === 'server-only' || specifier === 'client-only')
      )
        continue;
      const name = packageName(specifier);
      if (byName.has(name)) {
        assert(name !== pkg.name, 'Self-import through workspace resolver: ' + description);
        assert(declared.has(name), 'Undeclared workspace dependency: ' + description);
        assert(isPublicImport(byName.get(name).pkg, specifier), 'Non-public package import: ' + description);
      } else {
        assert(!specifier.startsWith('@svitlo/'), 'Unknown Svitlo workspace: ' + description);
        assert(declared.has(name), 'Undeclared production dependency: ' + description);
        assert(
          path !== 'shared/engine' || name === 'zod',
          'Engine cannot depend on external runtime modules: ' + description,
        );
        assert(
          path !== 'shared/ui-kit' || name !== 'next',
          'UI Kit depends on unsupported Next.js runtime: ' + description,
        );
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
      // Shared package entrypoints may live at the package root (Engine,
      // IndexedDB, adapters) or in src/ (UI Kit). Match the emitted relative path
      // without assuming that every workspace uses a src/ directory.
      const source = target.replace(/^\.\/dist\//, '').replace(/\.js$/, '');
      const candidates = path === 'shared/engine' ? [source] : [source, 'src/' + source.replace(/^src\//, '')];
      assert(
        candidates.some(candidate => ['.ts', '.tsx'].some(ext => existsSync(resolve(root, path, candidate + ext)))),
        'Missing public entrypoint source: ' + pkg.name + subpath,
      );
      assert(entry.types === target.replace(/\.js$/, '.d.ts'), 'Mismatched declarations: ' + pkg.name + subpath);
    }
  }
}

const kit = readJson('shared/ui-kit/package.json');
for (const path of ['dist', 'assets/flags', 'scripts/syncFlags/syncFlags.mjs']) {
  assert(kit.files && kit.files.includes(path), 'UI Kit package files omit ' + path);
  if (path !== 'dist') assert(existsSync(resolve(root, 'shared/ui-kit', path)), 'Missing asset: ' + path);
}
assert(
  kit.bin?.['svitlo-sync-flags'] === './scripts/syncFlags/syncFlags.mjs' && Object.keys(kit.exports ?? {}).length === 1,
  'UI Kit flag sync must remain a bin script, not a public subpath export',
);
assert(
  readdirSync(resolve(root, 'shared/ui-kit/assets/flags')).some(name => name.endsWith('.svg')),
  'Flag assets are missing',
);
console.log('Stage 5 extraction readiness: source imports, dependencies, public exports, and static assets verified.');

// Storybook is owned by UI Kit, not coupled to either Next.js application.
const storybookMain = readFileSync(resolve(root, 'shared/ui-kit/.storybook/main.ts'), 'utf8');
assert(
  !/\b(?:apps|content)\/|\.\.\/\.\.\/shared\/|\.\.\/\.\.\/(?:apps|content)\//.test(storybookMain),
  'UI Kit Storybook must not read application or monorepo source paths',
);
assert(
  readJson('shared/ui-kit/package.json').scripts?.['storybook:build'],
  'UI Kit must own the Storybook build command',
);
for (const application of [
  'content/playground',
  'content/math',
  'content/physics',
  'content/geography',
  'content/informatics',
  'content/biology',
  'content/language-literature',
  'content/languages/ukrainian',
  'content/chemistry',
  'content/astronomy',
  'content/history',
  'content/philosophy',
  'content/psychology',
  'content/economics',
  'content/art',
  'content/health-safety',
  'content/engineering',
]) {
  assert(
    !existsSync(resolve(root, application, '.storybook')),
    'Application Storybook must not depend on shared source trees: ' + application,
  );
  const appManifest = readJson(application + '/package.json');
  assert(
    !appManifest.scripts?.['storybook:start'] && !appManifest.scripts?.['storybook:build'],
    'Storybook commands must be owned by UI Kit: ' + application,
  );
}
