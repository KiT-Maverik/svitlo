#!/usr/bin/env node
/**
 * @fileoverview Run the production-only component suites absent from root npm test.
 * The shared workspace planner builds their dependency closure without rerunning
 * UI Kit and Math component suites already included in the root unit suite.
 */
import { fileURLToPath } from 'node:url';
import { execute } from '../../runWorkspaceScript/run-workspace-script.mjs';

export const additionalComponentWorkspaces = ['@svitlo/playground', '@svitlo/web'];

if (process.argv[1] && fileURLToPath(import.meta.url) === process.argv[1]) {
  try {
    if (process.argv.length !== 2) throw Error('No arguments accepted by production component runner');
    execute('test:components', { onlyWorkspaces: additionalComponentWorkspaces });
  } catch (error) {
    console.error('::error::' + error.message);
    process.exitCode = 1;
  }
}
