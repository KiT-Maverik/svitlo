# Світло — Svitlo Monorepo

Svitlo is a modular interactive-learning project. The repository contains textbook packages, application hosts, shared libraries, and editorial documentation. The current package layout and commands are defined by the workspace manifests; [Studio architecture](studio/docs/architecture/README.md) records the product direction and implementation notes.

## Repository map

| Directory                         | Contents                                                                       |
| --------------------------------- | ------------------------------------------------------------------------------ |
| `apps/web`                        | Next.js host for an explicitly build-selected content package                  |
| `apps/platform`                   | Next.js platform and external textbook catalog                                 |
| `apps/mobile`, `apps/desktop`     | Mobile and desktop host workspaces                                             |
| `content/playground`              | React DOM textbook package with authored data, Scenes, and generated resources |
| `content/math`, other `content/*` | Subject-specific textbook packages and scaffolds                               |
| `shared/engine`                   | Content builders, validation, generation, and assessment-method data           |
| `shared/indexdb`                  | Browser persistence                                                            |
| `shared/ui-kit`                   | Shared React UI and assets                                                     |
| `shared/adapters/nextjs`          | Next.js integration for textbook hosts                                         |
| `backend/server`                  | Backend placeholder                                                            |
| `studio`                          | Architecture, entity, and workflow documentation                               |

The root [package.json](package.json) defines npm workspaces and scripts. `package-lock.json` is the npm lockfile.

## Getting started

```bash
npm ci
npm run repo:check:packages
SVITLO_TEXTBOOK=math npm run code:check:types
npm test
```

Start the Web host with an explicitly installed content package, for example `SVITLO_TEXTBOOK=math npm run app:start:dev --workspace @svitlo/web`, or the Platform with `npm run app:start:dev --workspace @svitlo/platform`. Other checks and build commands are listed in the root `package.json`.

## Typed educational production

Course, Episode, Lesson, Question Bank and Flashcard Bank production each use one progressively typed UUID-addressed `draft.ts` editorial source. Authorized materialization consumes the exact reviewed draft and creates the canonical modular `index.ts` in one Git commit. Course and Episode Stage 5, Lesson Stage 6.1 and independent Bank Stage 5 emit authored TypeScript, not release approval. Verify the deployed trusted workflow and exact pinned-source Actions run before claiming operational materialization. None of the five trusted materialization commands parses editorial workflow state or review verdicts as technical eligibility; reviews remain editorial responsibilities. Lesson Stage 6.1 also does not require Course provenance. See [typed production architecture](studio/docs/architecture/typed-production-materialization.md), [Course workflow](studio/skills/course-workflow/create-course-flow.skill.md), [Episode workflow](studio/skills/episode-workflow/create-episode-flow.skill.md), [Lesson workflow](studio/skills/lesson-workflow/create-lesson-flow.skill.md) and [Engine source runbook](shared/engine/scripts/README.md). Historical YAML is provenance, not a parallel authoring input.

## Documentation

- [CI, branch policy and quiet agent checks](studio/rules/ci-workflow.md)

- [Architecture and package boundaries](studio/docs/architecture/monorepo-and-textbook.md)
- [Architecture index](studio/docs/architecture/README.md)
- [Playground](content/playground/README.md)
- [Math](content/math/README.md)
- [Platform](apps/platform/README.md)
- [Engine](shared/engine/README.md)

The Web host never chooses a textbook implicitly. For Web build, typecheck, development, or root typechecks, set `SVITLO_TEXTBOOK` to an installed package exposing the Svitlo compiled public contract. Web-owned contract fixtures are test-only: they are explicitly selected by the Web CI and browser suites, not used as a production fallback. See [`apps/web/scripts/prepareTextbook/README.md`](apps/web/scripts/prepareTextbook/README.md).
