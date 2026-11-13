/** Shared rule for all deployable app packages: authoring must never enter an app. */
export const engineRuntimeBoundary = {
  files: ['**/*.{js,jsx,ts,tsx,mjs,mts,cjs,cts}'],
  rules: {
    'no-restricted-imports': [
      'error',
      {
        paths: [
          { name: '@svitlo/engine', message: 'Select @svitlo/engine/runtime; the root entrypoint is not public.' },
          { name: '@svitlo/engine/build', message: 'Build-time Engine APIs must not be imported by app code. Use @svitlo/engine/runtime.' },
        ],
        patterns: [
          { group: ['@svitlo/engine/build/**'], message: 'Build-time Engine APIs are forbidden in app code.' },
        ],
      },
    ],
  },
};
