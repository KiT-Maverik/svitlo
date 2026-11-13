/** Shared restriction for application and rendering packages.
 * Build-time Engine modules must never be imported into a deployed app.
 * Keep this config dependency-free so every workspace can reuse it.
 */
export const engineRuntimeOnly = {
  files: ['**/*.{js,jsx,cjs,mjs,ts,tsx,mts,cts}'],
  rules: {
    'no-restricted-imports': [
      'error',
      {
        paths: [
          {
            name: '@svitlo/engine/build',
            message: 'Build-only Engine APIs cannot be imported in applications. Use @svitlo/engine/runtime.',
          },
        ],
        patterns: [
          {
            group: ['@svitlo/engine/build/**'],
            message: 'Do not deep-import build-only Engine code in applications.',
          },
        ],
      },
    ],
  },
};
