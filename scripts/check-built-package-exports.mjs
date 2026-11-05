import { existsSync, readFileSync } from 'node:fs';
import { resolve } from 'node:path';

const root = process.cwd();
function assert(ok, detail) {
  if (!ok) throw new Error(detail);
}
const packages = ['shared/contracts', 'shared/engine', 'shared/indexdb', 'shared/ui-kit', 'shared/adapters/nextjs'];

let checked = 0;
for (const path of packages) {
  const name = path.split('/').at(-1);
  const pkg = JSON.parse(readFileSync(resolve(root, path, 'package.json'), 'utf8'));
  for (const [subpath, entry] of Object.entries(pkg.exports ?? {})) {
    if (subpath.includes('*') || subpath === './sync-flags') continue;
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
  if (name === 'ui-kit') {
    assert(existsSync(resolve(root, path, 'assets/flags')), 'UI Kit packaged flag assets missing');
    assert(
      existsSync(resolve(root, path, 'scripts/sync-flags.mjs')),
      'UI Kit packaged flag synchronization script missing',
    );
  }
}
console.log(`Built shared export entrypoints verified: ${checked} JavaScript/declaration paths`);
