# Economics skills taxonomy — Issue #195 integration coordination

## Shared baseline inspection

- Issue: https://github.com/KiT-Maverik/svitlo-web/issues/195
- Approved editorial source: [taxonomy.md](./taxonomy.md)
- The existing `main` tree already contains `learningApps/economics/data/skills/index.ts` and all **17 canonical Domain directories**; `macroeconomics.data.ts` shows an English-first typed implementation. This initial integration bootstrap does **not** rerun the generator, rewrite taxonomy Markdown or introduce new Skills.
- Economics `tsconfig.json` already includes `data/**/*.ts`; test with real strict Contracts/Engine compiler definitions. Baseline translations are **not** complete until all 29 locale keys are present and semantically reviewed.

## Four-agent nonoverlapping ownership

| Agent | Owned Domain subtrees | Planned entities |
| --- | --- | ---: |
| 1 | `economicThinking`; `consumerBehavior`; `marketsAndCompetition`; `productionAndEntrepreneurship` | 84 |
| 2 | `laborAndEmployment`; `marketingAndTrade`; `personalFinance`; `moneyAndFinancialSystem` | 93 |
| 3 | `macroeconomics`; `governmentAndEconomicPolicy`; `internationalEconomics`; `developmentWellbeingAndInstitutions` | 84 |
| 4 | `environmentalAndResourceEconomics`; `economicDataAndResearch`; `economicHistoryAndIdeas`; `digitalEconomy`; `appliedEconomics` | 84 |
| **Total** | 17 Domain roots | **345** |

Agents must branch from `feat/economics-skills-integration` and change only owned `data/skills/<domain>/**` name and frontend locale dictionaries. Preserve English source, methodological descriptions, IDs, slugs, imports/exports and hierarchy. Crimean Tatar `qm` uses its approved Latin orthography; Belarusian `be` uses Taraškievica. No synthetic/fallback translations.

## Acceptance and issue lifecycle

- Before integration, verify all 345 entity files and 29 languages, structural validator `node scripts/check-skills-taxonomy-structure.mjs learningApps/economics/data/skills`, Contracts and Engine builds, and actual `npm run typecheck --workspace @svitlo/economics` including `data/**/*.ts`. Use a strict scoped compiler gate for each agent branch if unfinished other branches block full TypeScript. Run relevant builds/tests and independent linguistic review.
- Keep the parent PR Draft and four agent PRs separate until review and explicit permission to merge. Only the parent PR to `main` carries `Closes #195`. The parent Issue remains open until that PR merges.
