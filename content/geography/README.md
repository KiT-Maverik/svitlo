# Svitlo Geography Textbook

Standalone Next.js application: `@svitlo/geography`.

This initializes the application shell, not a completed textbook. The editorial catalog is being reviewed separately in draft PR #66 (`docs/skills/taxonomy.md`). This package does not yet contain curriculum, runtime skills, lessons, questions or offline download functionality.

From the repository root:

```bash
npm ci
npm run dev:geography
npm run build:geography
npm run typecheck:geography
npm run lint --workspace @svitlo/geography
npm run test:e2e:geography
```

The home page redirects to `/en-US`; localized shells are served under `/<locale>` for all current standard locales from `@svitlo/contracts/localization`, with explicit language and direction metadata. A dedicated language selector and actual teaching content belong to later approved stages.

The app uses only declared public workspace APIs and owns its own routes, content and documentation, to remain independently extractable.
