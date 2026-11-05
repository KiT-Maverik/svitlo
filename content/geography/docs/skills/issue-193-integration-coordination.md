# Geography skills integration — Issue #193

This document coordinates the approved Geography Skills Taxonomy implementation and 29-language localization. The code baseline already exists under `content/geography/data/skills/` on `main`; do not regenerate or overwrite its UUIDs or approved hierarchy without an actual discrepancy and editorial authorization.

## Canonical scope

- 11 SkillDomains, 41 SkillGroups and 159 Skills (211 total).
- Agent 1: `spatialOrientation`, `mapsAndGeospatialRepresentations`, `geographicObjects` — 68 entities.
- Agent 2: `landformsAndSurfaceProcesses`, `geology` — 50 entities.
- Agent 3: `waterSystems`, `atmosphereWeatherAndClimate` — 39 entities.
- Agent 4: `naturalRegionsAndBiogeography`, `humanGeography`, `environmentAndSociety`, `geographicInquiry` — 54 entities.

All agents branch from `feat/geography-skills-integration` and submit separate Draft PRs targeting this branch. Translators preserve UUIDs, slugs, semantics and English methodological descriptions. Every owned entity needs localized `name` and, when present (required for Skills), `description.frontend` across the 29 registry languages. Do not insert fallback translations or weaken TypeScript contracts.

## Merge gates

- Audit each of the 211 typed entities and complete real dictionaries.
- Confirm structure with `node scripts/check-skills-taxonomy-structure.mjs content/geography/data/skills`.
- Build contracts and Engine dependencies, then run `npm run typecheck --workspace @svitlo/geography`, proving authored `data/**/*.ts` is included; use strict scoped checks for unfinished parallel branches.
- Run the relevant tests and `npm run build --workspace @svitlo/geography`.
- Review every agent's file ownership and actual translation quality, especially Crimean Tatar `qm` and Belarusian Taraškievica.
- Keep all PRs Draft until approved. Do not merge without the coordinator's explicit authorization. Only the integration PR targets `main` and carries `Closes #193`.
