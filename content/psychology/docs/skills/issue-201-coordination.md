# Psychology skills taxonomy — Issue #201 coordination

This temporary coordination record tracks the four scoped localization workstreams for [Issue #201](https://github.com/KiT-Maverik/svitlo-web/issues/201). It is not an editorial approval, source of Skill definitions, or a replacement for the canonical taxonomy.

## Existing baseline

At bootstrap, the `main` branch already contained `content/psychology/data/skills/index.ts` and English-first `*.data.ts` entities for the 14 approved Domains. These must be checked against the canonical `docs/skills/taxonomy.md` before promotion; **do not rerun the Markdown → Code generator to overwrite existing Code**. The staging Markdown summary may lag behind the actual committed Code state. The Psychology `tsconfig.json` already includes `data/**/*.ts`.

## Branch and ownership boundaries

- Integration: `feat/psychology-skills-integration` → `main`; collect reviewed agent PRs here, never merge without explicit approval.
- Agent 1: `feat/psychology-skills-agent-1` — `psychologicalScienceAndInquiry`, `biologicalFoundationsOfBehavior`, `sensationAndPerception` (88 entities).
- Agent 2: `feat/psychology-skills-agent-2` — `attentionAndConsciousness`, `learningAndBehaviorChange`, `memoryAndMetacognition`, `thinkingAndDecisionMaking` (101 entities).
- Agent 3: `feat/psychology-skills-agent-3` — `emotionAndPsychologicalRegulation`, `motivationGoalsAndHabits`, `socialPsychology` (73 entities).
- Agent 4: `feat/psychology-skills-agent-4` — `developmentAcrossTheLifespan`, `personalityAndIndividualVariation`, `mentalHealthAndClinicalScience`, `appliedPsychology` (92 entities).

## Release gates

Each agent is responsible for genuine name and frontend-description localization in every supported language, only in its assigned Domain subtree. Keep UUIDs, slugs, hierarchy, imports, English source and methodological descriptions unchanged. Run the taxonomy structure checker, full strict TypeScript check including authored `data/**/*.ts`, and applicable tests; document any unavailable or failed checks as blockers. Independent linguistic and scientific review is required before promotion. The integration PR alone closes Issue #201 once merged into `main`; agent PRs must not close the parent Issue.

## Integrated translation handoff — 2026-11-04

All four scoped PRs have been merged into the integration branch: Agent 1 #283 (88 entities), Agent 2 #282 (101), Agent 3 #284 (73), and Agent 4 #285 (92). The resulting taxonomy localizes all 354 canonical entities across all 29 registered languages. The approved English, methodological descriptions, UUIDs, slugs and graph structure were preserved.

Required technical validation is provided by the dedicated Psychology Skills validation workflow and the repository FastGate. Both passed for integration head `efd831a5bb6199f747e1c12a3c0b0707b04a6586` (runs [41901878324](https://github.com/KiT-Maverik/svitlo-web/actions/runs/41901878324) and [41901878250](https://github.com/KiT-Maverik/svitlo-web/actions/runs/41901878250)); rerun the checks for any subsequent commit. This coordination note does not substitute for the authoritative Markdown taxonomy or the independent later linguistic review. The integration PR #281 is the only PR that closes Issue #201 on successful merge to `main`.
