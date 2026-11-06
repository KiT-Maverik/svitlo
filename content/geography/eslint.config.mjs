import parser from '@typescript-eslint/parser';
import plugin from '@typescript-eslint/eslint-plugin';

// Authored Skills are validated by TypeScript; lint the maintained runtime and tooling.
export default [
  { ignores: ['dist/**', 'node_modules/**'] },
  {
    files: ['textbook.ts', 'data/homeCopy.ts'],
    languageOptions: { parser, parserOptions: { sourceType: 'module', ecmaVersion: 'latest' } },
    plugins: { '@typescript-eslint': plugin },
    rules: { '@typescript-eslint/no-unused-vars': 'error', 'no-constant-condition': 'error' },
  },
  {
    files: ['scripts/**/*.mjs'],
    languageOptions: { ecmaVersion: 'latest', sourceType: 'module' },
    rules: { 'no-unused-vars': 'error', 'no-constant-condition': 'error' },
  },
];
