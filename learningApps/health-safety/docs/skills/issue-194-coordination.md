# Issue #194 — Health & Safety Skills localization coordination

Integration branch: `feat/health-safety-skills-integration` → `main` (Draft PR).

The English-first typed taxonomy exists under `learningApps/health-safety/data/skills/` on `main`; no regeneration needed. This is coordination, not an editorial change.

Approved scope: 13 Domains, 42 Groups, 169 Skills; 224 entities total, 29 supported language keys.

- Agent 1: `healthLiteracyAndCare`, `hygieneAndInfectionPrevention`, `nutritionAndFoodSafety`, `movementSleepAndEverydayRoutines` — 63 entities.
- Agent 2: `mentalWellBeingAndSupport`, `personalBoundariesAndViolencePrevention`, `sexualAndReproductiveHealth`, `substanceUseAndDependencePrevention` — 52 entities.
- Agent 3: `everydayAndOccupationalSafety`, `transportWaterAndOutdoorSafety`, `emergenciesAndCivilProtection` — 63 entities.
- Agent 4: `firstAidAndImmediateResponse`, `digitalAndConsumerSafety` — 46 entities.

Each agent modifies only owned localized fields and opens one Draft PR to this integration branch. Strict TypeScript including authored `data/**/*.ts`, taxonomy structure checking, locale coverage, and independent editorial review remain acceptance gates. Do not merge agent or integration PRs without explicit user authorization.
