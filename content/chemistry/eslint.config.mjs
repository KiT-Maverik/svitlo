import { contentProductionImportPolicy } from '../../eslint/content-production-imports.mjs';
// Next.js app rules no longer apply. Source types are checked with tsc.
export default [
  ...contentProductionImportPolicy,{ files: ['scripts/*.mjs'], rules: { 'no-unused-vars': 'error' } }];
