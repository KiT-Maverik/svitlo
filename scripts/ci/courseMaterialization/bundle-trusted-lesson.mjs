/** Bundle trusted Lesson source without executing it; called by the synchronous AST resolver. */
import path from 'node:path';
import { build } from 'esbuild';
import { preserveImportMetaUrl } from '../../../shared/engine/scripts/loadAuthoredConfigurators/preserveImportMetaUrl.mjs';

const source = process.argv[2];
if (!source || !path.isAbsolute(source) || path.basename(source) !== 'index.ts')
  throw Error('Expected an absolute trusted Lesson entrypoint');
const result = await build({
  entryPoints: [source],
  absWorkingDir: path.dirname(source),
  platform: 'node',
  format: 'cjs',
  target: 'node24',
  bundle: true,
  write: false,
  logLevel: 'silent',
  plugins: [preserveImportMetaUrl()],
});
if (result.outputFiles?.length !== 1) throw Error('Cannot bundle trusted existing Lesson Configurator');
process.stdout.write(result.outputFiles[0].text);
