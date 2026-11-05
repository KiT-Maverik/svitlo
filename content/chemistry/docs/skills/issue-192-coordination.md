# Chemistry Skills — Issue #192 integration coordination

This scoped coordination record tracks Chemistry Skills implementation and localization for [Issue #192](https://github.com/KiT-Maverik/svitlo-web/issues/192). It is not an editorial approval and does not replace the authoritative `docs/skills/taxonomy.md`.

## Existing English-first baseline

At integration bootstrap, `main` already contains `content/chemistry/data/skills/index.ts` and English-first typed entities; the Chemistry taxonomy lists 13 Domains, 43 Groups and 215 Skills (271 entities). Preserve their UUIDs, slugs, methodological English, exports and canonical parent/child links. The package `tsconfig.json` already includes `data/**/*.ts`. Do not rerun a generator over existing implemented Code.

## Agent ownership

- Agent 1: `chemicalInquiry`, `substancesAndProperties`, `particlesAndStates` — 60 entities.
- Agent 2: `atomsAndPeriodicity`, `bondingAndStructure`, `mixturesAndSolutions` — 70 entities.
- Agent 3: `chemicalLanguageAndQuantities`, `chemicalReactions`, `acidBaseChemistry`, `energyRatesAndEquilibrium` — 72 entities.
- Agent 4: `inorganicChemistry`, `organicChemistry`, `chemistryInTheWorld` — 69 entities.

## Release gates

Collect four agent Draft PRs targeting this integration branch, without overlapping files. Verify genuine `name` and `description.frontend` translations in all 29 supported locales per required entity; preserve `description.methodological` as authoritative English only. Run `node scripts/check-skills-taxonomy-structure.mjs content/chemistry/data/skills`, build Contracts and Engine, run strict `npm run typecheck --workspace @svitlo/chemistry` (including authored data), and relevant tests. Native-language/editorial review is a separate required gate for promotion. No automated merge: coordinator and user approval required.
