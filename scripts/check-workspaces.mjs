import { readFileSync, existsSync } from 'node:fs';
import { resolve } from 'node:path';

const root = process.cwd();
const readJson = path => JSON.parse(readFileSync(resolve(root, path), 'utf8'));
const expected = [
  {
    path: 'backend/server',
    name: '@svitlo/server',
  },
  {
    path: 'frontend/platform',
    name: '@svitlo/platform',
  },
  {
    path: 'learningApps/informatics',
    name: '@svitlo/informatics',
  },
  {
    path: 'learningApps/biology',
    name: '@svitlo/biology',
  },
  {
    path: 'learningApps/geography',
    name: '@svitlo/geography',
  },
  {
    path: 'learningApps/math',
    name: '@svitlo/math',
  },
  {
    path: 'learningApps/physics',
    name: '@svitlo/physics',
  },
  {
    path: 'learningApps/playground',
    name: '@svitlo/playground',
  },
  {
    path: 'learningApps/language-literature',
    name: '@svitlo/language-literature',
  },
  {
    path: 'learningApps/languages/ukrainian',
    name: '@svitlo/ukrainian',
  },
  {
    path: 'learningApps/chemistry',
    name: '@svitlo/chemistry',
  },
  {
    path: 'learningApps/astronomy',
    name: '@svitlo/astronomy',
  },
  {
    path: 'learningApps/history',
    name: '@svitlo/history',
  },
  {
    path: 'learningApps/philosophy',
    name: '@svitlo/philosophy',
  },
  {
    path: 'learningApps/psychology',
    name: '@svitlo/psychology',
  },
  {
    path: 'learningApps/economics',
    name: '@svitlo/economics',
  },
  {
    path: 'learningApps/art',
    name: '@svitlo/art',
  },
  {
    path: 'learningApps/health-safety',
    name: '@svitlo/health-safety',
  },
  {
    path: 'learningApps/engineering',
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
    path: 'shared/nextjs-adapter',
    name: '@svitlo/nextjs-adapter',
  },
  {
    path: 'shared/ui-kit',
    name: '@svitlo/ui-kit',
  },
];
const manifest = readJson('package.json');
const lock = readJson('package-lock.json');
const patterns = ['backend/*', 'frontend/*', 'learningApps/*', 'learningApps/languages/*', 'shared/*'];

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
  assert(tsconfig.compilerOptions?.paths?.['@/*']?.[0] === 'src/*', 'Missing local alias in ' + tsconfigPath);
  assert(lock.packages[path]?.name === name, 'Missing workspace lockfile package: ' + name);
  assert(lock.packages['node_modules/' + name]?.resolved === path, 'Missing workspace lockfile link: ' + name);
}
console.log('Workspace scaffold verified (' + expected.length + ' packages).');
