# Svitlo Informatics Textbook

Standalone minimal Next.js App Router application workspace: `@svitlo/informatics`.

This package owns its application source under `src/` and will own its editorial content under `docs/`. The initial scaffold contains no lessons, implemented Skills, UI integrations, or locale dictionaries. **The Informatics Skills Taxonomy is being reviewed separately in draft PR #48** and is intentionally not introduced by this scaffold PR.

From the monorepo root (after `npm ci`):

```bash
npm run dev:informatics
npm run build:informatics
npm run typecheck:informatics
npm run lint --workspace @svitlo/informatics
```

Add shared Engine/UI Kit dependencies only when this package imports their public exports. Never import another textbook or Playground's source tree.
