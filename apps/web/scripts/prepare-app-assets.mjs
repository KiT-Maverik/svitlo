#!/usr/bin/env node
/**
 * Stage UI Kit-owned static assets in the universal Web host.
 * Independent of SVITLO_TEXTBOOK and textbook content publication.
 */
import { resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { syncFlags } from '@svitlo/ui-kit/sync-flags';

const webRoot = resolve(fileURLToPath(new URL('..', import.meta.url)));
syncFlags(webRoot);
