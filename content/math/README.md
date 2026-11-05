# Svitlo Mathematics Textbook

Standalone Next.js application: `@svitlo/math`.

The application owns mathematics curriculum, authored skills taxonomy with entity-owned stable UUIDs, tests and documentation. Demonstration lessons such as How Light Moves belong to Playground.

Package-specific educational documentation lives in `docs/`; authored Mathematics Skill Data resides in `data/skills/` outside `src/`. Its root `index.ts` exports Domains, while Domains import Group Data directly and Groups import Skills through their `skills/index.ts`.

From the monorepo root:

```bash
npm ci
npm run build:math
npm run dev:math
npm run test:math
npm run typecheck:math
```

The app depends on the public npm exports of `@svitlo/engine` and `@svitlo/ui-kit`, not on the Playground or on source paths in other workspaces. Registry publishing and isolated tarball consumption are verified in later migration stages.

Historical Math taxonomy test scripts still refer to `src/data/skillsTaxonomy/__tests__/` and require a separate migration to the current layout. Do not interpret this legacy test path as the canonical source directory. Shared Assessment Method descriptors and generic builder tests belong to `@svitlo/engine`.

IndexedDB storage, persisted-state controllers and Zod schemas are shared through `@svitlo/indexdb`. The canonical native IndexedDB browser E2E harness, commands and Playwright suite are owned by `shared/indexdb/testing`; app-local `src/testing/setup.ts` remains solely for component tests.

Stage 6: navigation and preferences implementations, translations, and behavior tests are centralized in `@svitlo/ui-kit`. The app's minimal `createLessonLearningLayout` binding only injects Next.js hooks, lesson-progress context and locale provider; no shared layout code or localization is copied into the app.
