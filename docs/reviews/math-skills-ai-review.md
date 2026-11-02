# Mathematics Skills — AI Translation Review (Integration)

## Scope

Umbrella integration branch for the linguistic/terminological review of canonical Mathematics Skills taxonomy in `learningApps/math/data/skills/`. Review every current SkillDomain, SkillGroup and Skill in each of the **28 non-English** supported language keys, using English methodological meaning as the baseline. The live language registry is `shared/contracts/src/types/languages.ts`; re-check it at execution time and document changes.

The review must follow:
- `studio/skills/translation-workflow/review-translation.skill.md` (read-only methodology, generated Markdown audit).
- `studio/personas/technical-translator.persona.md` (linguistic policy).
- `studio/skills/translation-workflow/technical-translation.skill.md` (only when applying authorized localized string fixes; TypeScript acceptance).
- Root and applicable package `AGENTS.md` / textbook instructions.

## Branch and PR topology

- **Integration head:** `review/math-skills-ai-review`
- **Integration PR target:** `main` — keep **Draft** until all agents are integrated, audit/CI requirements are met, and human review authorizes the final merge.
- Every agent creates its branch **from the integration branch**, then its **Draft agent PR targets this integration branch**, not `main`. Do not directly merge into `main`.

| Agent | Branch | Agent PR title | Exclusive assigned locale keys |
| --- | --- | --- | --- |
| 1 | `review/math-skills-language-review-agent-1` | `[Math] Language Review — Agent 1` | `qm`, `uk`, `pl`, `de`, `es`, `hi` |
| 2 | `review/math-skills-language-review-agent-2` | `[Math] Language Review — Agent 2` | `zh`, `ja`, `ko`, `vi`, `pt`, `ta` |
| 3 | `review/math-skills-language-review-agent-3` | `[Math] Language Review — Agent 3` | `ar`, `ur`, `fr`, `bn`, `id`, `mr` |
| 4 | `review/math-skills-language-review-agent-4` | `[Math] Language Review — Agent 4` | `he`, `te`, `be`, `ka`, `kk` |
| 5 | `review/math-skills-language-review-agent-5` | `[Math] Language Review — Agent 5` | `tr`, `ms`, `lt`, `lv`, `et` |

The agent's first message is **only the shared preparation prompt**; it must **wait for a subsequent agent-specific assignment of languages** before any repo operations.

## Audit and correction rules

1. Inventory actual entities from the current canonical source: count every Domain/Group/Skill, including any Skills directly owned by Domains. Record per-locale coverage (localized `name` and present `description.frontend`).
2. Generate on-demand reference Markdown with the reusable `Agent CI Artifacts` workflow or supported local generator, then audit `.agent-ci-artifacts/taxonomies/math/<language>.md`. Verify the manifest and source SHA, and do not fabricate missing views.
3. Examine **every assigned entity** in each assigned locale against the English methodological meaning and hierarchy; check mathematics terminology (arithmetic, fractions, place value, geometry, measurement, probability, reasoning), accuracy, ambiguity, register, script, punctuation, contamination, consistency and learner-facing tone.
4. Review Translation itself is read-only. Where authorized to fix translations for the assigned languages, switch to Technical Translation and edit **only** `name.<assigned-key>` and `description.frontend.<assigned-key>` in canonical Math `*.data.ts` files. Never modify English, English methodological meaning, UUIDs, slugs, hierarchy, builders, contracts or other agents' languages.
5. Save separate, reviewable commits/checkpoints per locale; maintain a precise issue log with path, field, existing/proposed wording, rationale, confidence and severity. Do not claim native-speaker certification or completed coverage without reading every view.
6. Temporary `.agent-ci-artifacts/` materials **must be removed before the agent PR is mergeable** via `/agent-artifacts cleanup`, with success and absence of files verified. Never merge generated review documents into the integration branch.
7. Ensure every canonical translation change is subject to the correct `@svitlo/math` TypeScript gate, including authored `data/` and dependencies. Applicable command: `npm run typecheck --workspace @svitlo/math`; inspect `tsconfig` inclusion, perform relevant tests/CI. Do not report an unexecuted gate as passed.
8. The integration owner verifies the full per-locale agent diffs, merges only into the integration branch (resolving overlapping source-file conflicts at the individual locale field level), validates all 28 languages, checks artifact absence and CI, then submits this single integration PR for human review.

## Tracking (not yet started)

- [ ] Agent 1 — `qm, uk, pl, de, es, hi`
- [ ] Agent 2 — `zh, ja, ko, vi, pt, ta`
- [ ] Agent 3 — `ar, ur, fr, bn, id, mr`
- [ ] Agent 4 — `he, te, be, ka, kk`
- [ ] Agent 5 — `tr, ms, lt, lv, et`
- [ ] All agents' verified source-only PRs merged into the integration branch
- [ ] Generated `.agent-ci-artifacts/` absent from combined changes
- [ ] Full math typecheck and applicable tests/CI verified
- [ ] 28-locale coverage, unresolved linguistic questions and final diff reviewed
- [ ] Human approval to merge the integration PR into `main`

This coordination file is the initial integration-branch diff. It is not a linguistic sign-off or translation-quality certification.
