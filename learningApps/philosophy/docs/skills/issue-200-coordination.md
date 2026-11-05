# Issue #200 — Philosophy Skills localization coordination

Integration branch: `feat/philosophy-skills-integration` → `main` (Draft PR).

The English-first canonical typed taxonomy already exists under `learningApps/philosophy/data/skills/` in `main`; this record is coordination only, not approval or a regenerated baseline.

Approved target: 12 Domains, 48 Groups, 222 Skills; 282 entities, all 29 supported language keys.

- Agent 1: `philosophicalInquiry`, `logicAndArgumentation` — 58 entities.
- Agent 2: `epistemologyAndCriticalEvaluation`, `philosophyOfScience`, `metaphysics` — 74 entities.
- Agent 3: `philosophyOfReligion`, `mindSelfAndHumanExistence`, `ethicsAndMoralReasoning` — 72 entities.
- Agent 4: `socialAndPoliticalPhilosophy`, `philosophyOfLanguage`, `aestheticsAndPhilosophyOfArt`, `historyAndTraditionsOfPhilosophy` — 78 entities.

Each agent PR targets this branch, remains Draft until translation/typecheck gates pass, and may change only owned localized fields. Do not merge to `main` before reviewed full coverage and explicitly authorized integration.
