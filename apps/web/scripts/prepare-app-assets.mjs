#!/usr/bin/env node
/**
 * Stage UI Kit-owned static assets in the universal Web host.
 * Independent of SVITLO_TEXTBOOK and textbook content publication.
 */
import { resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { spawnSync } from 'node:child_process';

const webRoot = resolve(fileURLToPath(new URL('..', import.meta.url)));
const script = resolve(webRoot, '../../shared/ui-kit/scripts/syncFlags.mjs');
const result = spawnSync(process.execPath, [script, webRoot], { stdio: 'inherit' });
if (result.error || result.status !== 0) {
  throw new Error('UI Kit flag synchronization failed: ' + (result.error?.message ?? result.status));
}
