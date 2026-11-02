# Biology Skills — AI Linguistic Translation Review (Integration)

## Purpose and authoritative source
Coordinate five independent language-review agents for the Biology Skills taxonomy under `learningApps/biology/data/skills/`, checking all registered non-English language keys against the canonical English methodological meaning and skill hierarchy.

At setup, source contains **11 SkillDomains, 26 SkillGroups, 147 Skills = 184 entity files**, and the live language registry lists **28 non-English language keys**. That is 184 × 28 = 5,152 entity-language reviews; re-inventory current source and supported locales before editing. Actual Code is the source of truth. **Warning:** Biology `README.md` and the header of `docs/skills/taxonomy.md` still claim Code is not implemented, but canonical `*.data.ts` files are present. Use Code rather than this outdated editorial-status statement. The editorial taxonomy may aid context only.

Consult in order:
- `AGENTS.md` and any applicable Biology instructions;
- `studio/personas/technical-translator.persona.md` (read in full);
- `studio/skills/translation-workflow/review-translation.skill.md`;
- `studio/skills/translation-workflow/technical-translation.skill.md` when making authorized fixes;
- `shared/contracts/src/types/languages.ts` for the **current** roster;
- `learningApps/biology/docs/skills/taxonomy.md` and the relevant methodological English descriptions only as editorial/semantic context.

## Integration topology
- **Head:** `review/biology-skills-ai-review` (created from `main`)
- **Base:** `main`
- **Integration PR:** Draft until verification and human approval.
- Every agent gets a separate branch **from the integration branch** and creates a **Draft PR targeting `review/biology-skills-ai-review`**, never `main`.
- **Initial shared prompt is a wait-only preparation message.** Do not start work/branches/PRs/checkout/artifacts until the subsequent explicit Agent number and language assignment arrives.

| Agent | Exclusive language keys (in order) | Branch | Draft PR title |
| --- | --- | --- | --- |
| 1 | `qm`, `uk`, `pl`, `de`, `es`, `hi` | `review/biology-skills-language-review-agent-1` | `[Biology] Language Review — Agent 1` |
| 2 | `zh`, `ja`, `ko`, `vi`, `pt`, `ta` | `review/biology-skills-language-review-agent-2` | `[Biology] Language Review — Agent 2` |
| 3 | `ar`, `ur`, `fr`, `bn`, `id`, `mr` | `review/biology-skills-language-review-agent-3` | `[Biology] Language Review — Agent 3` |
| 4 | `he`, `te`, `be`, `ka`, `kk` | `review/biology-skills-language-review-agent-4` | `[Biology] Language Review — Agent 4` |
| 5 | `tr`, `ms`, `lt`, `lv`, `et` | `review/biology-skills-language-review-agent-5` | `[Biology] Language Review — Agent 5` |

## Scope and review criteria
1. Count every Domain/Group/Skill from Code, including Domain-owned direct Skills and grouped Skills. Confirm required fields `name.<language>` and `description.frontend.<language>`; do not silently fall back to English. A missing generated frontend description is an issue, not proof the review is complete.
2. After opening an agent Draft PR, generate on-demand Markdown via owner-authorized PR comment `/agent-artifacts generate` (preferred) or `node scripts/generate-translation-review-artifacts.mjs` in a real checkout. For a new branch with no changes, add the smallest temporary `.agent-ci-artifacts/review-request.md` seed so GitHub permits the PR. The workflow builds all textbooks/locales, but the agent selects only `.agent-ci-artifacts/taxonomies/biology/<assigned language>.md` and English reference as needed. Check `manifest.json` for source commit and generation failures.
3. **Actually read all 184 entities in each assigned language** and compare localized title and frontend description with English methodological text, hierarchy, and subject meaning. Inspect all 11 domains and 26 groups, including direct Skills. Keep a per-locale glossary and actionable issue log with paths, current/proposed text, field, rationale, severity/confidence and any consulted authorities. Automation can prioritize, but cannot replace a full linguistic read-through.
4. Biological semantic distinctions to preserve: living vs dead vs never alive; remains vs actual organisms; animal vs plant vs fungi; bacteria vs archaea vs viruses; DNA, genes, genetic modification vs selective breeding; population-level evolution vs individual development; producer/consumer/decomposer food webs, biodiversity and invasive species; anatomy, organ systems, processes and physiology; biotechnology's purpose/risk without unsupported value judgments. Avoid misrepresenting geographic or Health & Safety domain boundaries. Scientific register must be accurate without unnecessary jargon.
5. `qm`: genuine Crimean Tatar, Latin `crh-Latn-UA`, approved 2025 orthography; **Crimean Tatar → international scientific terminology → Turkish terminology** in that order; Turkish prose is not accepted. `be`: Taraškievica only; `kk`: Kazakh Cyrillic; `zh`: Simplified Chinese; `pt`: Brazilian Portuguese. `ar`, `ur`, `he`: correct RTL script, punctuation and terminology. Preserve names, equations, scientific symbols, units, taxa and nomenclature where required.
6. Read-only `Review Translation` identifies problems. User authorizes applying translation corrections: switch to `Technical Translation`. Edit **only** `name.<assigned-language>` and `description.frontend.<assigned-language>` inside `learningApps/biology/data/skills/**/*.data.ts`; preserve `en`, `description.methodological`, IDs, slugs, hierarchy, scientific meaning, imports, file paths, builders and all other agents' locales. Never change Code just to make a compiler check green. Commit in ordered, clearly labeled per-locale checkpoints.
7. After reviewing/fixing each language, record reviewed count vs expected count, files/fields changed, unresolved semantic issues, confidence, citation evidence and actual tests. Proceed to next assigned language without waiting for user `next/go`.
8. Run the actual Biology TypeScript gate `npm run typecheck --workspace @svitlo/biology` after `npm ci` as appropriate and verify `learningApps/biology/tsconfig.json` includes `data/**/*.ts` (current config does). Verify other relevant CI/tests when available. Do not report an unrun gate as passed. If no local execution environment, flag verification as pending and leave Draft.
9. Once review is done, request `/agent-artifacts cleanup`, verify workflow success and that no `.agent-ci-artifacts/` files remain in the **agent PR diff**. This must be finished before integration. Never merge artifacts into integration or `main`.
10. Agent posts final per-language coverage, changed fields, unresolved questions, source commit/manifest provenance, actual CI/test outcomes, and Draft PR URL. Leave unverified/broken work as Draft; never self-merge.

## Integration owner checklist
- [ ] Agent 1 reviewed `qm, uk, pl, de, es, hi` and provided source-only PR.
- [ ] Agent 2 reviewed `zh, ja, ko, vi, pt, ta` and provided source-only PR.
- [ ] Agent 3 reviewed `ar, ur, fr, bn, id, mr` and provided source-only PR.
- [ ] Agent 4 reviewed `he, te, be, ka, kk` and provided source-only PR.
- [ ] Agent 5 reviewed `tr, ms, lt, lv, et` and provided source-only PR.
- [ ] All 28 locales × 184 current Biology entities reviewed, missing values explained, actual full coverage confirmed.
- [ ] Each agent's `.agent-ci-artifacts/` cleaned before merge.
- [ ] All merge conflicts resolved by preserving each agent's exact designated locale fields, not dropping same-file edits.
- [ ] Combined diff contains only authorized localized Biology fields and this coordination document.
- [ ] Real Biology typecheck and relevant checks performed; no known semantic blockers concealed.
- [ ] Human approves integration PR from `review/biology-skills-ai-review` to `main`.

**Status:** Coordination setup; agent work has not started. This plan is not a completed linguistic review or scientific-certification statement.
