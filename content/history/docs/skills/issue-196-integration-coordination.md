# History Skills — Integration coordination for Issue #196

This is a planning and verification record for the approved History Skills Taxonomy implementation and 29-language localization. The canonical editorial specification remains [taxonomy.md](./taxonomy.md), and the canonical typed data remains [data/skills](../../data/skills/). This coordination file does **not** alter taxonomy content or approve any translation.

## Verified starting point

- Issue: https://github.com/KiT-Maverik/svitlo-web/issues/196
- Initial `main` commit examined: `c7a808fb40271008838fddb4839bbed7d7a647a5`
- Approved `taxonomy.md` reports **11 SkillDomains, 50 SkillGroups and 216 Skills = 277 entities**, all marked implemented in the generated Markdown snapshot.
- The same **277 entity-owned `*.data.ts` files already exist** on `main` in `content/history/data/skills/`. Agent 1 must preserve those files and avoid rerunning the generator over existing Code.
- `content/history/tsconfig.json` already includes `data/**/*.ts`; no typecheck exclusion workaround or contract loosening is permitted.
- All required locale keys are defined by `DEFAULT_SUPPORTED_LANGUAGES` in `shared/contracts/src/types/languages.ts`. English-first files are a deliberate staging state and are **not considered localized**.
- No history-specific workflow was found at `.github/workflows/history.yml` in the inspected base; final CI/actual validation results must be reported, not assumed.

## Ownership — distinct subtrees

| Agent     | Domain roots                                                                     | Expected entities |
| --------- | -------------------------------------------------------------------------------- | ----------------: |
| 1         | `historicalInquiry`; `humanPrehistory`; `ancientWesternAsia`                     |                69 |
| 2         | `ancientAfrica`; `southAndSoutheastAsia`                                         |                57 |
| 3         | `eastAndCentralAsia`; `ancientMediterranean`; `ancientEuropeBeyondMediterranean` |                79 |
| 4         | `ancientAmericas`; `ancientOceania`; `crossRegionalHistoricalProcesses`          |                72 |
| **Total** | **11 domain roots**                                                              |           **277** |

## Shared acceptance and promotion

1. Each agent branches from `feat/history-skills-integration` and changes only its assigned domain localization dictionaries (`name` and `description.frontend`).
2. Preserve canonical UUIDs, slugs, English approved text, English-only methodological descriptions, imports/exports, and parent-child references.
3. Require exact inventory of all required languages, including Crimean Tatar `qm` (Latin orthography, not substituted Turkish) and Belarusian Taraškievica `be`.
4. Run `node scripts/check-skills-taxonomy-structure.mjs content/history/data/skills`, build Contracts and Engine prerequisites, then `npm run typecheck --workspace @svitlo/history` and applicable build/tests. TypeScript must actually include `data/**/*.ts`.
5. Integrate the four agent Draft PRs only after review. Keep this integration PR Draft until all 277 entities are fully localized, structural and strict typing checks pass, and the coordinator authorizes promotion into `main`.

**Issue lifecycle:** The integration PR must contain `Closes #196` and closes the parent Issue **only when merged to main**. Agent PRs must not close the parent.
