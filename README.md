# Світло — Svitlo Monorepo

Svitlo is a modular interactive-learning project. Each textbook is a **standalone Next.js application** with its own curriculum, tests and `docs/`; packages share code only through explicit published-style exports. The architecture is designed so that a textbook can later be extracted into a separate repository/deployment **without global app-to-app rewrites**.

## Workspace map

| Workspace                     | Folder                             | Purpose                                                                            |
| ----------------------------- | ---------------------------------- | ---------------------------------------------------------------------------------- |
| `@svitlo/platform`            | `frontend/platform`                | Next.js web platform and external textbook catalog                                 |
| `@svitlo/math`                | `content/math`                | Mathematics textbook; owns taxonomy and curriculum                                 |
| `@svitlo/biology`             | `content/biology`             | Biology textbook scaffold                                                          |
| `@svitlo/geography`           | `content/geography`           | Geography textbook scaffold                                                        |
| `@svitlo/informatics`         | `content/informatics`         | Informatics textbook scaffold                                                      |
| `@svitlo/physics`             | `content/physics`             | Physics textbook scaffold                                                          |
| `@svitlo/language-literature` | `content/language-literature` | Language and Literature textbook scaffold                                          |
| `@svitlo/ukrainian`           | `content/languages/ukrainian` | Ukrainian language textbook scaffold (under Languages)                             |
| `@svitlo/chemistry`           | `content/chemistry`           | Chemistry textbook scaffold                                                        |
| `@svitlo/astronomy`           | `content/astronomy`           | Astronomy textbook scaffold                                                        |
| `@svitlo/history`             | `content/history`             | History textbook scaffold                                                          |
| `@svitlo/philosophy`          | `content/philosophy`          | Philosophy textbook scaffold                                                       |
| `@svitlo/psychology`          | `content/psychology`          | Psychology textbook scaffold                                                       |
| `@svitlo/economics`           | `content/economics`           | Economics textbook scaffold                                                        |
| `@svitlo/art`                 | `content/art`                 | Art textbook scaffold                                                              |
| `@svitlo/health-safety`       | `content/health-safety`       | Health and Safety textbook scaffold                                                |
| `@svitlo/engineering`         | `content/engineering`         | Engineering textbook scaffold                                                      |
| `@svitlo/playground`          | `content/playground`          | Subject-neutral widget/lesson demonstration application                            |
| `@svitlo/contracts`           | `shared/contracts`                 | Shared types, stable IDs, localization descriptors and persisted-state contracts   |
| `@svitlo/engine`              | `shared/engine`                    | Framework-independent builders, validation, generation and Assessment Methods      |
| `@svitlo/indexdb`             | `shared/indexdb`                   | Browser IndexedDB persistence, schemas and native integration tests                |
| `@svitlo/ui-kit`              | `shared/ui-kit`                    | Shared React/MUI widgets, navigation, themes/preferences composition and Storybook |
| `@svitlo/server`              | `backend/server`                   | **Placeholder only**; no operational backend yet                                   |

Node and npm workspaces are the current package/CI tools; `package-lock.json` is authoritative. `pnpm-workspace.yaml` and `turbo.json` are not used for this project's current GitHub Actions builds.

## Quick start

```bash
npm ci
npm run packages:check
npm run typecheck
npm test
npm run lint
npm run build
npm run packages:artifacts:check
```

Run a textbook: `npm run dev:<subject-slug>` (all 16 subjects). Run Platform: `npm run dev:platform`; Playground: `npm run dev`. Each Next.js app is independent; simultaneous development servers require different ports.

Browser testing after `npx playwright install chromium` and a build:

- `npm run test:e2e:db` — native IndexedDB controller Chromium suite
- `npm run test:e2e:platform` — Platform desktop/mobile smoke
- `npm run test:e2e --workspace @svitlo/math` and `npm run test:e2e --workspace @svitlo/playground` — learning app suites

The Platform only links to a published Math textbook when its **real** `NEXT_PUBLIC_MATH_APP_URL` has been configured. The backend, account system, cross-device sync and offline/PWA feature set are future work, not implied by the scaffold.

## Documentation

- [Canonical architecture and package boundaries](studio/docs/architecture/monorepo-and-textbook.md)
- [Final migration audit and known duplicate-source debt](studio/docs/architecture/migration-stage-8-audit.md)
- [Architecture/documentation index](studio/docs/architecture/README.md)
- [Historical migration notes](studio/Monorepo%20Migration.md)
- [Math textbook](content/math/README.md), [Playground](content/playground/README.md), [Platform](frontend/platform/README.md)

**Known remaining debt:** the Stage 8 audit records 67 byte-identical source files across Math and Playground. The new architecture guard prevents **additional** exact-path duplication while existing copied lesson/page implementations await a separately scoped extraction. Successful monorepo CI alone does not prove independent npm package publishing or clean-room repository extraction.
