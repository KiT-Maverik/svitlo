/** Preserve each authored TypeScript module's file URL when bundling to CommonJS. */
import fs from 'node:fs';
import path from 'node:path';
import { pathToFileURL } from 'node:url';

export function preserveImportMetaUrl() {
  return {
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
  };
}
