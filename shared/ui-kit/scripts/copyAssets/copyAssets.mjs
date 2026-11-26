import { readdirSync, mkdirSync, copyFileSync } from 'node:fs';
import { join, relative, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
const src = fileURLToPath(new URL('../../src/', import.meta.url));
const dist = fileURLToPath(new URL('../../dist/src/', import.meta.url));
function copy(dir) {
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const path = join(dir, entry.name);
    if (entry.isDirectory()) copy(path);
    else if (entry.isFile() && entry.name.endsWith('.module.css')) {
      const output = join(dist, relative(src, path));
      mkdirSync(dirname(output), { recursive: true });
      copyFileSync(path, output);
    }
  }
}
copy(src);
