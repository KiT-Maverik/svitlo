# Issue #194 — Health & Safety Skills translation coordination

Integration PR: [#319](https://github.com/KiT-Maverik/svitlo-web/pull/319), `feat/health-safety-skills-integration` → `main`.

## Scope and source migration

The approved English-first Code taxonomy is already in `content/health-safety/data/skills/`. The Issue was authored while the textbook lived under `learningApps/health-safety/`; `main` subsequently migrated textbook packages to `content/`. The old baseline and relocated new baseline have **identical Git tree SHA** `c2732d7ba1cd2164cad6d7fa83f4236ab0aa7d25`. The 224 localized entities were carried into the new canonical path as the complete translated tree `c4d9d49dfcb2270efffc93932be8a64a71266489`, without regenerating or rewriting the approved Skills.

## Integrated agent workstreams

- [Agent 1 PR #320](https://github.com/KiT-Maverik/svitlo-web/pull/320): `healthLiteracyAndCare`, `hygieneAndInfectionPrevention`, `nutritionAndFoodSafety`, `movementSleepAndEverydayRoutines` — 63 entities.
- [Agent 2 PR #322](https://github.com/KiT-Maverik/svitlo-web/pull/322): `mentalWellBeingAndSupport`, `personalBoundariesAndViolencePrevention`, `sexualAndReproductiveHealth`, `substanceUseAndDependencePrevention` — 52 entities.
- [Agent 3 PR #321](https://github.com/KiT-Maverik/svitlo-web/pull/321): `everydayAndOccupationalSafety`, `transportWaterAndOutdoorSafety`, `emergenciesAndCivilProtection` — 63 entities.
- [Agent 4 PR #323](https://github.com/KiT-Maverik/svitlo-web/pull/323): `firstAidAndImmediateResponse`, `digitalAndConsumerSafety` — 46 entities.

All four agent PRs were independently audited and merged into this integration branch after explicit user authorization. Total: **13 Domains, 42 SkillGroups, 169 Skills = 224 canonical entities**, with full `name` and `description.frontend` for all **29** registered languages; English-only `description.methodological`, all UUIDs/slugs and parent-child relationships were preserved. Exactly **12,544** non-English locale additions.

## Integration acceptance

The Health & Safety-specific workflow must validate the migrated `content/health-safety/data/skills/` taxonomy, build real Contracts/Engine, run `npm run typecheck --workspace @svitlo/health-safety` with `data/**/*.ts` included, and compile the full application. Integration CI was pending when this document was prepared; do not claim these final gates passed without a completed run. Human medical, safeguarding and native-language review is a separate follow-up requirement, not inferred from successful TypeScript.
