import tseslint from 'typescript-eslint';
import { engineRuntimeOnly } from '../../eslint/engine-runtime-only.mjs';

// Mobile previously used typecheck-only linting. Add only the shared import
// boundary policy, without introducing unrelated recommended-rule regressions.
export default tseslint.config(
  { ignores: ['android/**', 'ios/**', 'dist/**', 'public/**', 'node_modules/**'] },
  {
    files: ['**/*.{js,jsx,cjs,mjs,ts,tsx,mts,cts}'],
    languageOptions: {
      parser: tseslint.parser,
      parserOptions: { ecmaFeatures: { jsx: true } },
    },
  },
  engineRuntimeOnly,
);
