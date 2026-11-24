/** Build-time loading of authored Build API configurators (never used by runtime). */
import fs from 'node:fs';
import path from 'node:path';
import { createRequire } from 'node:module';
import { preserveImportMetaUrl } from './preserveImportMetaUrl.mjs';
import { build } from 'esbuild';

const require = createRequire(import.meta.url);

export async function loadAuthoredConfigurators(source, type, { includeExports = false } = {}) {
  if (path.basename(source) === 'draft.ts')
    throw new Error('Editorial draft cannot be loaded as a Configurator: ' + source);
  const directory = fs.mkdtempSync(path.join(path.dirname(source), '.configurator-load-'));
  const outfile = path.join(directory, 'configurators.cjs');
  try {
    await build({
      entryPoints: [source],
      outfile,
      bundle: true,
      platform: 'node',
      format: 'cjs',
      packages: 'external',
      target: 'node20',
      logLevel: 'silent',
      plugins: [preserveImportMetaUrl()],
    });
    const moduleExports = require(outfile);
    const exported = Object.values(moduleExports);
    const configurators = exported.filter(item => item !== null && typeof item === 'object' && item.type === type);
    if (!configurators.length) throw new Error('No ' + type + ' Build configurators exported from ' + source);
    for (const item of configurators) {
      if (!item.build || typeof item.build.props !== 'function') {
        throw new Error('Expected a stateless ' + type + ' Build API: ' + source);
      }
    }
    return includeExports ? { configurators, moduleExports } : configurators;
  } finally {
    fs.rmSync(directory, { recursive: true, force: true });
  }
}
