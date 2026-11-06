import { test } from 'node:test';
import assert from 'node:assert/strict';
import { build } from 'esbuild';
import { resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = resolve(fileURLToPath(new URL('..', import.meta.url)));
test('preserved Geography landing copy covers every supported language', async () => {
  const compiled = await build({
    entryPoints: [resolve(root, 'data/homeCopy.ts')],
    bundle: true,
    platform: 'neutral',
    format: 'esm',
    write: false,
    logLevel: 'silent',
  });
  const url = 'data:text/javascript;base64,' + Buffer.from(compiled.outputFiles[0].contents).toString('base64');
  const { geographyHomeCopy } = await import(url);
  assert.equal(Object.keys(geographyHomeCopy).length, 29);
  for (const [language, pair] of Object.entries(geographyHomeCopy)) {
    assert.match(language, /^[a-z]{2}$/);
    assert.ok(Array.isArray(pair) && pair.length === 2);
    for (const message of pair) assert.ok(typeof message === 'string' && message.trim().length > 0);
  }
  assert.equal(geographyHomeCopy.uk[0], 'Географія');
  assert.equal(geographyHomeCopy.qm[0], 'Coğrafiya');
  assert.equal(geographyHomeCopy.ar[0], 'الجغرافيا');
});
