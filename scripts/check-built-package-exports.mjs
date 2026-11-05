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
  'content/math',
  'content/physics',
  'content/psychology',
  'content/philosophy',
  'content/language-literature',
  'content/languages/ukrainian',
];

let checked = 0;
for (const path of packages) {
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
    assert(pkg.bin?.['svitlo-playground'] === './scripts/publish.mjs', 'Playground Publish CLI missing');
    assert(existsSync(resolve(root, path, 'scripts/publish.mjs')), 'Playground Publish CLI file missing');
    const manifestPath = resolve(root, path, 'dist/manifest.json');
    assert(existsSync(manifestPath), 'Playground static resource manifest missing');
    const manifest = JSON.parse(readFileSync(manifestPath, 'utf8'));
    assert(manifest.textbook === 'playground' && Array.isArray(manifest.files), 'Invalid textbook build manifest');
    assert(
      manifest.files.some(file => file.startsWith('data/pages/lessons/')),
      'Compiled lesson JSON missing',
    );
    assert(
      manifest.files.some(file => file.startsWith('data/pages/skillAnalytics/')),
      'Compiled analytics JSON missing',
    );
    for (const file of manifest.files) {
      assert(existsSync(resolve(root, path, 'dist/static', file)), 'Missing built textbook resource: ' + file);
    }
  }
  if (['math', 'physics', 'psychology', 'philosophy', 'language-literature', 'ukrainian'].includes(name)) {
    assert(pkg.bin?.['svitlo-' + name] === './scripts/publish.mjs', 'Publish CLI missing: ' + pkg.name);
    assert(existsSync(resolve(root, path, 'scripts/publish.mjs')), 'Publish script missing: ' + path);
    const manifest = JSON.parse(readFileSync(resolve(root, path, 'dist/manifest.json'), 'utf8'));
    assert(manifest.version === 1 && manifest.textbook === name && Array.isArray(manifest.files), 'Invalid manifest: ' + path);
    assert(new Set(manifest.files).size === manifest.files.length, 'Duplicate published resource: ' + path);
    if (['math', 'physics', 'psychology', 'philosophy'].includes(name)) {
      assert(manifest.files.some(file => file.startsWith('data/pages/skillAnalytics/')), 'Authored taxonomy not published: ' + path);
    } else assert(manifest.files.length === 0, 'Metadata-only package must not fabricate resources: ' + path);
    for (const file of manifest.files) {
      assert(!file.includes('..') && existsSync(resolve(root, path, 'dist/static', file)), 'Missing owned resource: ' + path + '/' + file);
    }
  }
  if (name === 'ui-kit') {
    assert(existsSync(resolve(root, path, 'assets/flags')), 'UI Kit packaged flag assets missing');
    assert(
      existsSync(resolve(root, path, 'scripts/sync-flags.mjs')),
      'UI Kit packaged flag synchronization script missing',
    );
  }
}
console.log(`Built shared export entrypoints verified: ${checked} JavaScript/declaration paths`);
