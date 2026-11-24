/** Build-time loading of authored Build API configurators (never used by runtime). */
import fs from 'node:fs';
import path from 'node:path';
import { createRequire } from 'node:module';
import { pathToFileURL } from 'node:url';
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
      plugins: [
        {
          name: 'preserve-import-meta-url',
          setup(builder) {
            builder.onLoad({ filter: /[.]tsx?$/ }, async args => {
              if (path.basename(args.path) === 'draft.ts')
                throw new Error('Editorial draft cannot be imported by a materialized Configurator: ' + args.path);
              return {
                contents: (await fs.promises.readFile(args.path, 'utf8')).replace(
                  /\bimport[.]meta[.]url\b/g,
                  JSON.stringify(pathToFileURL(args.path).href),
                ),
                loader: args.path.endsWith('.tsx') ? 'tsx' : 'ts',
              };
            });
          },
        },
      ],
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
