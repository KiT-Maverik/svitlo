import parser from '@typescript-eslint/parser';
import plugin from '@typescript-eslint/eslint-plugin';

// Authored Skills are validated by TypeScript; lint maintained runtime Scenes and tooling.
export default [
  { ignores: ['dist/**', 'node_modules/**'] },
  {
    files: ['textbook.ts', 'scenes/**/*.ts', 'scenes/**/*.tsx'],
    languageOptions: { parser, parserOptions: { sourceType: 'module', ecmaVersion: 'latest', ecmaFeatures: { jsx: true } } },
    plugins: { '@typescript-eslint': plugin },
    rules: { '@typescript-eslint/no-unused-vars': 'error', 'no-constant-condition': 'error' },
  },
  {
    files: ['scripts/**/*.mjs'],
    languageOptions: { ecmaVersion: 'latest', sourceType: 'module' },
    rules: { 'no-unused-vars': 'error', 'no-constant-condition': 'error' },
  },
];
