import js from '@eslint/js';
import tseslint from 'typescript-eslint';
import { engineRuntimeOnly } from '../../eslint/engine-runtime-only.mjs';

export default tseslint.config(
  { ignores: ['android/**', 'ios/**', 'dist/**', 'public/**', 'node_modules/**'] },
  js.configs.recommended,
  ...tseslint.configs.recommended,
  {
    files: ['**/*.{js,mjs,ts,tsx}'],
    languageOptions: {
      globals: {
        window: 'readonly', document: 'readonly', navigator: 'readonly',
        console: 'readonly', process: 'readonly', fetch: 'readonly',
        URL: 'readonly', setTimeout: 'readonly',
      },
    },
  },
  engineRuntimeOnly,
);
