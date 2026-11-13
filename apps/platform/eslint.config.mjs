import { engineRuntimeBoundary } from '../../eslint/engine-runtime-boundary.mjs';
import { defineConfig, globalIgnores } from 'eslint/config';
import nextVitals from 'eslint-config-next/core-web-vitals';
import nextTs from 'eslint-config-next/typescript';

export default defineConfig([
  engineRuntimeBoundary,
  ...nextVitals,
  ...nextTs,
  globalIgnores(['.next/**', 'out/**', 'build/**', 'next-env.d.ts', 'test-results/**', 'playwright-report/**']),
]);
