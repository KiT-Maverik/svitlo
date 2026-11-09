import { existsSync, readdirSync, rmSync } from 'node:fs';
import { join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { spawnSync } from 'node:child_process';

const root = resolve(fileURLToPath(new URL('..', import.meta.url)));
const dist = join(root, 'dist');
rmSync(dist, { recursive: true, force: true });

function run(command, args) {
  const result = spawnSync(command, args, { cwd: root, stdio: 'inherit' });
  if (result.error || result.status !== 0) {
    throw new Error(`${command} ${args.join(' ')} failed: ${result.error?.message ?? result.status}`);
  }
}

run('tsc', ['-p', 'tsconfig.build.json']);

// Source dictionaries are build-time data. Publish their declarations for
// import type consumers, without shipping the full translations as JS.
const localeDist = join(dist, 'data/locale');
if (!existsSync(localeDist)) throw new Error('Missing UI Kit locale declarations');
for (const file of readdirSync(localeDist)) {
  if (file.endsWith('.js') || file.endsWith('.js.map')) rmSync(join(localeDist, file));
}
run(process.execPath, ['scripts/copyAssets.mjs']);
