# Psychology skills taxonomy — Issue #201 coordination

This temporary coordination record tracks the four scoped localization workstreams for [Issue #201](https://github.com/KiT-Maverik/svitlo-web/issues/201). It is not an editorial approval, source of Skill definitions, or a replacement for the canonical taxonomy.

## Existing baseline

At bootstrap, the `main` branch already contained `learningApps/psychology/data/skills/index.ts` and English-first `*.data.ts` entities for the 14 approved Domains. These must be checked against the canonical `docs/skills/taxonomy.md` before promotion; **do not rerun the Markdown → Code generator to overwrite existing Code**. The staging Markdown summary may lag behind the actual committed Code state. The Psychology `tsconfig.json` already includes `data/**/*.ts`.

## Branch and ownership boundaries

- Integration: `feat/psychology-skills-integration` → `main`; collect reviewed agent PRs here, never merge without explicit approval.
- Agent 1: `feat/psychology-skills-agent-1` — `psychologicalScienceAndInquiry`, `biologicalFoundationsOfBehavior`, `sensationAndPerception` (88 entities).
- Agent 2: `feat/psychology-skills-agent-2` — `attentionAndConsciousness`, `learningAndBehaviorChange`, `memoryAndMetacognition`, `thinkingAndDecisionMaking` (101 entities).
- Agent 3: `feat/psychology-skills-agent-3` — `emotionAndPsychologicalRegulation`, `motivationGoalsAndHabits`, `socialPsychology` (73 entities).
- Agent 4: `feat/psychology-skills-agent-4` — `developmentAcrossTheLifespan`, `personalityAndIndividualVariation`, `mentalHealthAndClinicalScience`, `appliedPsychology` (92 entities).

## Release gates

Each agent is responsible for genuine name and frontend-description localization in every supported language, only in its assigned Domain subtree. Keep UUIDs, slugs, hierarchy, imports, English source and methodological descriptions unchanged. Run the taxonomy structure checker, full strict TypeScript check including authored `data/**/*.ts`, and applicable tests; document any unavailable or failed checks as blockers. Independent linguistic and scientific review is required before promotion. The integration PR alone closes Issue #201 once merged into `main`; agent PRs must not close the parent Issue.
