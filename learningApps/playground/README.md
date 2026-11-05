# Playground

`@svitlo/playground` is a standalone Next.js sandbox for experimenting with
`@svitlo/engine` and `@svitlo/ui-kit`. It deliberately contains **no curriculum**.

- `/questions`: shared question widgets
- `/questions/api`: question events, slots and controller usage
- `/lesson/d3048d21-8690-5255-b62c-984c69ac272c`: interactive How Light Moves demonstration with scenes and quiz,
  authored in `data/lessons/c/d3048d21-8690-5255-b62c-984c69ac272c`

Authored subject content, static skill taxonomies and learning-method documentation
belong to the corresponding textbook (currently `learningApps/math`).

Development and checks from repository root:

```bash
npm ci
npm run dev
npm run typecheck
npm run test:components
npm run test:e2e
```

The Playground only imports other packages through their public npm exports.

Generic builder and localization tests are owned by `@svitlo/engine`; Playground contains demonstration data and application-specific tests only.

IndexedDB controllers, schemas and transaction utilities are owned by `@svitlo/indexdb`. The native IndexedDB Playwright suite and isolated Next.js test fixture live in `shared/indexdb/testing`. Local `src/testing/setup.ts` is only the Vitest component-test setup.

Stage 6: navigation and preferences implementations, translations, and behavior tests are centralized in `@svitlo/ui-kit`. The app's minimal `createLessonLearningLayout` binding only injects Next.js hooks, lesson-progress context and locale provider; no shared layout code or localization is copied into the app.
