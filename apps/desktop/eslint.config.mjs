import { engineRuntimeBoundary } from '../../eslint/engine-runtime-boundary.mjs';
import js from '@eslint/js';
import tseslint from 'typescript-eslint';

export default tseslint.config(
  engineRuntimeBoundary,
  { ignores: ['dist-main/**', 'dist-renderer/**', 'public/**', 'release/**', 'node_modules/**'] },
  js.configs.recommended,
  ...tseslint.configs.recommended,
  {
    files: ['**/*.ts', '**/*.tsx', '**/*.mjs'],
    languageOptions: {
      globals: {
        window: 'readonly',
        document: 'readonly',
        process: 'readonly',
        console: 'readonly',
        fetch: 'readonly',
        URL: 'readonly',
        navigator: 'readonly',
        setTimeout: 'readonly',
      },
    },
    rules: { 'no-unused-vars': 'off', '@typescript-eslint/no-non-null-assertion': 'off' },
  },
);
