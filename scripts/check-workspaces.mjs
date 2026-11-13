import { readFileSync, existsSync } from 'node:fs';
import { resolve } from 'node:path';

const root = process.cwd();
const readJson = path => JSON.parse(readFileSync(resolve(root, path), 'utf8'));
const expected = [
  {
    path: 'apps/web',
    name: '@svitlo/web',
  },
  {
    path: 'backend/server',
    name: '@svitlo/server',
  },
  {
    path: 'apps/platform',
    name: '@svitlo/platform',
  },
  {
    path: 'content/informatics',
    name: '@svitlo/informatics',
  },
  {
    path: 'content/biology',
    name: '@svitlo/biology',
  },
  {
    path: 'content/geography',
    name: '@svitlo/geography',
  },
  {
    path: 'content/math',
    name: '@svitlo/math',
  },
  {
    path: 'content/physics',
    name: '@svitlo/physics',
  },
  {
    path: 'content/playground',
    name: '@svitlo/playground',
  },
  {
    path: 'content/language-literature',
    name: '@svitlo/language-literature',
  },
  {
    path: 'content/languages/ukrainian',
    name: '@svitlo/ukrainian',
  },
  {
    path: 'content/chemistry',
    name: '@svitlo/chemistry',
  },
  {
    path: 'content/astronomy',
    name: '@svitlo/astronomy',
  },
  {
    path: 'content/history',
    name: '@svitlo/history',
  },
  {
    path: 'content/philosophy',
    name: '@svitlo/philosophy',
  },
  {
    path: 'content/psychology',
    name: '@svitlo/psychology',
  },
  {
    path: 'content/economics',
    name: '@svitlo/economics',
  },
  {
    path: 'content/art',
    name: '@svitlo/art',
  },
  {
    path: 'content/health-safety',
    name: '@svitlo/health-safety',
  },
  {
    path: 'content/engineering',
    name: '@svitlo/engineering',
  },
  {
    path: 'shared/contracts',
    name: '@svitlo/contracts',
  },
  {
    path: 'shared/indexdb',
    name: '@svitlo/indexdb',
  },
  {
    path: 'shared/engine',
    name: '@svitlo/engine',
  },
  {
    path: 'shared/adapters/nextjs',
    name: '@svitlo/adapter-nextjs',
  },
  {
    path: 'shared/ui-kit',
    name: '@svitlo/ui-kit',
  },
];
const manifest = readJson('package.json');
const lock = readJson('package-lock.json');
const patterns = ['apps/*', 'backend/*', 'content/*', 'content/languages/*', 'shared/*', 'shared/adapters/*'];

function assert(ok, description) {
  if (!ok) throw new Error(description);
}

assert(
  JSON.stringify(manifest.workspaces) === JSON.stringify(patterns),
  'Root workspace patterns differ from the expected layout',
);
assert(
  JSON.stringify(lock.packages[''].workspaces) === JSON.stringify(patterns),
  'Lockfile workspace patterns are out of sync',
);
for (const { path, name } of expected) {
  const pkgPath = path + '/package.json';
  const tsconfigPath = path + '/tsconfig.json';
  assert(existsSync(resolve(root, pkgPath)), 'Missing ' + pkgPath);
  assert(existsSync(resolve(root, tsconfigPath)), 'Missing ' + tsconfigPath);
  const pkg = readJson(pkgPath);
  const tsconfig = readJson(tsconfigPath);
  assert(pkg.name === name && pkg.private === true, 'Invalid workspace manifest: ' + pkgPath);
  if (
    !new Set([
      '@svitlo/playground',
      ...[
        'math',
        'physics',
        'psychology',
        'philosophy',
        'language-literature',
        'ukrainian',
        'art',
        'chemistry',
        'economics',
        'engineering',
        'health-safety',
        'astronomy',
        'biology',
        'geography',
        'history',
        'informatics',
      ].map(id => '@svitlo/' + id),
    ]).has(name)
  ) {
    assert(
      name === '@svitlo/engine' ||
      name === '@svitlo/indexdb' ||
      name === '@svitlo/adapter-nextjs'
        ? !Object.keys(tsconfig.compilerOptions?.paths || {}).some(alias => alias.includes('*'))
        : tsconfig.compilerOptions?.paths?.['@/*']?.[0] === 'src/*',
      'Invalid local aliases in ' + tsconfigPath,
    );
    if (name === '@svitlo/engine') {
      for (const [alias, targets] of Object.entries(tsconfig.compilerOptions.paths)) {
        assert(
          alias.startsWith('#') && targets.length === 1 && targets[0].endsWith('/index.ts'),
          'Invalid Engine directory alias: ' + alias,
        );
        assert(
          pkg.imports?.[alias] === './dist/' + targets[0].replace(/\.ts$/, '.js'),
          'Engine alias lacks matching runtime import: ' + alias,
        );
      }
    }
  }
  if (
    [
      'math',
      'physics',
      'psychology',
      'philosophy',
      'language-literature',
      'ukrainian',
      'art',
      'chemistry',
      'economics',
      'engineering',
      'health-safety',
      'astronomy',
      'biology',
      'geography',
      'history',
      'informatics',
    ]
      .map(id => '@svitlo/' + id)
      .includes(name)
  ) {
    assert(!tsconfig.compilerOptions?.paths?.['@/*'], 'Migrated textbook retains app alias: ' + name);
    assert(
      !pkg.dependencies?.next && pkg.exports?.['.']?.default?.startsWith('./dist/'),
      'Textbook needs compiled exports: ' + name,
    );
  }
  if (
    ['math', 'physics', 'psychology', 'philosophy', 'language-literature', 'ukrainian']
      .map(id => '@svitlo/' + id)
      .includes(name)
  ) {
    assert(!existsSync(resolve(root, path, 'src/app')), 'Old Next.js shell remains: ' + path);
    assert(pkg.exports?.['.']?.default === './dist/textbook/index.js', 'Missing textbook JS export: ' + path);
    assert(
      pkg.bin?.['svitlo-' + name.slice('@svitlo/'.length)] === './dist/publish.mjs',
      'Missing Publisher CLI: ' + path,
    );
  }
  if (
    ['@svitlo/astronomy', '@svitlo/biology', '@svitlo/geography', '@svitlo/history', '@svitlo/informatics'].includes(
      name,
    )
  ) {
    assert(!tsconfig.compilerOptions?.paths?.['@/*'], 'Migrated textbook retains local alias: ' + name);
    assert(
      !pkg.dependencies?.next && pkg.exports?.['.']?.default === './dist/textbook/index.js',
      'Migrated textbook must export compiled metadata: ' + name,
    );
  }
  assert(lock.packages[path]?.name === name, 'Missing workspace lockfile package: ' + name);
  assert(lock.packages['node_modules/' + name]?.resolved === path, 'Missing workspace lockfile link: ' + name);
}
console.log('Workspace scaffold verified (' + expected.length + ' packages).');
