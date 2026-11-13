import { existsSync, readFileSync } from 'node:fs';
import { resolve } from 'node:path';

const root = process.cwd();
function assert(ok, detail) {
  if (!ok) throw new Error(detail);
}
const packages = [
  'shared/contracts',
  'shared/engine',
  'shared/indexdb',
  'shared/ui-kit',
  'shared/adapters/nextjs',
  'content/playground',
  'content/art',
  'content/chemistry',
  'content/economics',
  'content/engineering',
  'content/health-safety',
  'content/math',
  'content/physics',
  'content/psychology',
  'content/philosophy',
  'content/language-literature',
  'content/languages/ukrainian',
  'content/astronomy',
  'content/biology',
  'content/geography',
  'content/history',
  'content/informatics',
];

const cli = process.argv.slice(2);
let selected = packages;
if (cli.length) {
  assert(
    cli[0] === '--packages' && cli.length > 1,
    'Usage: check-built-package-exports.mjs [--packages <workspace-path> ...]',
  );
  selected = cli.slice(1);
  assert(
    selected.every(path => packages.includes(path)),
    'Unknown workspace in artifact check: ' + selected.join(', '),
  );
  assert(new Set(selected).size === selected.length, 'Duplicate workspace in artifact check');
}

let checked = 0;
for (const path of selected) {
  const name = path.split('/').at(-1);
  const pkg = JSON.parse(readFileSync(resolve(root, path, 'package.json'), 'utf8'));
  for (const [subpath, entry] of Object.entries(pkg.exports ?? {})) {
    if (subpath.includes('*') || subpath === './sync-flags') continue;
    if (subpath === './styles') {
      assert(entry.default === './dist/styles.css', 'Playground must export compiled Scene styles');
      assert(existsSync(resolve(root, path, entry.default)), 'Playground Scene styles missing');
      checked++;
      continue;
    }
    for (const key of ['default', 'types']) {
      const target = entry[key];
      assert(
        typeof target === 'string' && target.startsWith('./dist/'),
        `${pkg.name}${subpath}: invalid ${key} export target`,
      );
      assert(existsSync(resolve(root, path, target)), `${pkg.name}${subpath}: missing built ${key} target ${target}`);
      checked++;
    }
  }
  if (name === 'playground') {
    assert(pkg.bin?.['svitlo-playground'] === './dist/publish.mjs', 'Playground Publish CLI missing');
    assert(existsSync(resolve(root, path, 'dist/publish.mjs')), 'Playground Publish CLI file missing');
    const manifestPath = resolve(root, path, 'dist/manifest.json');
    assert(existsSync(manifestPath), 'Playground static resource manifest missing');
    const manifest = JSON.parse(readFileSync(manifestPath, 'utf8'));
    assert(manifest.textbook === 'playground' && Array.isArray(manifest.files), 'Invalid textbook build manifest');
    assert(
      manifest.files.some(file => file.startsWith('data/lessons/')),
      'Compiled lesson JSON missing',
    );
    assert(
      manifest.files.some(file => file.startsWith('data/skills/')),
      'Compiled Skills JSON missing',
    );
    for (const file of manifest.files) {
      assert(existsSync(resolve(root, path, 'dist/static', file)), 'Missing built textbook resource: ' + file);
    }
  }
  if (['art', 'chemistry', 'economics', 'engineering', 'health-safety'].includes(name)) {
    assert(pkg.bin?.['svitlo-' + name] === './dist/publish.mjs', 'Missing Publish CLI: ' + name);
    assert(existsSync(resolve(root, path, 'dist/publish.mjs')), 'Missing CLI executable: ' + name);
    const manifestPath = resolve(root, path, 'dist/manifest.json');
    assert(existsSync(manifestPath), 'Missing published manifest: ' + name);
    const manifest = JSON.parse(readFileSync(manifestPath, 'utf8'));
    assert(
      manifest.version === 1 && manifest.textbook === name && Array.isArray(manifest.files),
      'Invalid textbook manifest: ' + name,
    );
    assert(
      manifest.files.some(file => file.startsWith('data/skills/')),
      'Missing authored Skills JSON: ' + name,
    );
    for (const file of manifest.files) {
      assert(existsSync(resolve(root, path, 'dist/static', file)), 'Missing built ' + name + ' resource: ' + file);
    }
  }
  if (['math', 'physics', 'psychology', 'philosophy', 'language-literature', 'ukrainian'].includes(name)) {
    assert(pkg.bin?.['svitlo-' + name] === './dist/publish.mjs', 'Publish CLI missing: ' + pkg.name);
    assert(existsSync(resolve(root, path, 'dist/publish.mjs')), 'Publish script missing: ' + path);
    const manifest = JSON.parse(readFileSync(resolve(root, path, 'dist/manifest.json'), 'utf8'));
    assert(
      manifest.version === 1 && manifest.textbook === name && Array.isArray(manifest.files),
      'Invalid manifest: ' + path,
    );
    assert(new Set(manifest.files).size === manifest.files.length, 'Duplicate published resource: ' + path);
    if (['math', 'physics', 'psychology', 'philosophy'].includes(name)) {
      assert(
        manifest.files.some(file => file.startsWith('data/skills/')),
        'Authored taxonomy not published: ' + path,
      );
    } else assert(manifest.files.length === 0, 'Metadata-only package must not fabricate resources: ' + path);
    for (const file of manifest.files) {
      assert(
        !file.includes('..') && existsSync(resolve(root, path, 'dist/static', file)),
        'Missing owned resource: ' + path + '/' + file,
      );
    }
  }
  if (['astronomy', 'biology', 'geography', 'history', 'informatics'].includes(name)) {
    assert(
      pkg.exports?.['.']?.default === './dist/textbook/index.js',
      'Textbook metadata must use compiled ESM: ' + name,
    );
    assert(pkg.bin?.['svitlo-' + name] === './dist/publish.mjs', 'Missing textbook Publish CLI: ' + name);
    const manifestPath = resolve(root, path, 'dist/manifest.json');
    assert(existsSync(manifestPath), 'Missing textbook resource manifest: ' + name);
    const manifest = JSON.parse(readFileSync(manifestPath, 'utf8'));
    assert(
      manifest.version === 1 && manifest.textbook === name && Array.isArray(manifest.files),
      'Invalid textbook resource manifest: ' + name,
    );
    assert(
      manifest.files.some(file => file.startsWith('data/skills/')),
      'Missing authored Skill taxonomy: ' + name,
    );
    assert(
      !manifest.files.some(file => file.startsWith('data/lessons/')),
      'Unexpected non-authored Lesson JSON: ' + name,
    );
    for (const file of manifest.files)
      assert(
        existsSync(resolve(root, path, 'dist/static', file)),
        'Missing built textbook resource: ' + name + '/' + file,
      );
  }
  if (name === 'ui-kit') {
    assert(existsSync(resolve(root, path, 'assets/flags')), 'UI Kit packaged flag assets missing');
    assert(
      existsSync(resolve(root, path, 'scripts/syncFlags.mjs')),
      'UI Kit packaged flag synchronization script missing',
    );
  }
}
console.log(
  `Built export entrypoints verified: ${checked} JavaScript/declaration paths across ${selected.length} workspaces`,
);
