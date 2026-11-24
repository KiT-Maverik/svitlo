/** Runs only inside the credential-free worker container. */
import fs from 'node:fs';
import path from 'node:path';
import { createRequire } from 'node:module';
import { createHash } from 'node:crypto';
import { createJiti } from 'jiti';

const require = createRequire(import.meta.url);
const { executeMaterializerEntrypoint } = require(
  './shared/engine/dist/generators/materializers/directMaterialization/directMaterialization.js',
);
const request = JSON.parse(fs.readFileSync(0, 'utf8'));
const { operation, source } = request;
if (
  operation !== 'lesson-stage6' ||
  !/^content\/[a-z][a-z0-9-]*\/data\/lessons\/[a-f0-9]\/[a-f0-9-]{36}\/draft\.ts$/.test(source?.sourcePath) ||
  !/^[a-f0-9]{40}$/.test(source.sourceBlobSha) ||
  !/^[a-f0-9]{40}$/.test(source.sourceCommitSha)
) throw Error('Unsupported materializer request');
const entrypoint = path.resolve('/work', source.sourcePath);
const bytes = fs.readFileSync(entrypoint);
const blob = createHash('sha1').update('blob ' + bytes.length + '\0').update(bytes).digest('hex');
if (blob !== source.sourceBlobSha) throw Error('Candidate source blob mismatch');
const sourceText = bytes.toString('utf8');
const jiti = createJiti(import.meta.url, { fsCache: false });
const plan = await executeMaterializerEntrypoint(
  operation,
  {
    source,
    sourceText,
    verifySourceInput: (_input, pinned, text) =>
      pinned.sourcePath === source.sourcePath &&
      pinned.sourceBlobSha === source.sourceBlobSha &&
      pinned.sourceCommitSha === source.sourceCommitSha &&
      text === sourceText,
  },
  () => jiti.import(entrypoint),
);
process.stdout.write(JSON.stringify(plan));
