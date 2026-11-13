import tseslint from 'typescript-eslint';
import { engineRuntimeBoundary } from '../../eslint/engine-runtime-boundary.mjs';

export default tseslint.config(
  { ignores: ['android/**', 'ios/**', 'dist/**', 'public/**', 'node_modules/**'] },
  ...tseslint.configs.recommended,
  engineRuntimeBoundary,
);
