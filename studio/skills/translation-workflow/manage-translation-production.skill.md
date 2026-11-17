# Manage Translation Production — Draft PR coordination

**Current protocol for new work:** one `Draft` Translation integration PR is the **sole current coordination record** for one frozen entity × locale campaign. Read [the architecture](../../docs/architecture/translation-production-workflow.md), [Technical Translation](./technical-translation.skill.md), [Review Translation](./review-translation.skill.md), the Technical Translator Persona, GitHub label rules and current repository source. **Do not create a Translation Production Issue for new work.** Issues remain appropriate for bugs, investigations and independent technical requests; unrelated GitHub PR slash commands must remain operational.

**Existing Issue campaigns:** if an owner resumes an Issue opened under the old workflow, read its live body/comments, linked PRs, source SHAs, assignments and [historical recovery procedure](./legacy-production-issues.md). Keep its documented owner permissions and evidence intact. **Do not automatically migrate, close, erase or re-scope an active Issue** because this guide changed. A future owner-authorized move to PR-only must first copy and cross-check the full fixed inventory, owner/agent/reviewer assignments, exact stage outcomes, source/review SHAs, branch ancestry, unresolved blockers and next actions; leave historical links accessible.

## One campaign and exact frozen inventory

1. Check existing integration/agent PRs and historic Issues for overlapping scope; reuse the real existing branch/PR when continuing work rather than duplicating a campaign.
2. Define the owning packages, source entity family, exact source-language revision and target locale set. Resolve every symbolic selection (Course subtree, Skill subtree, Lesson list) to the complete concrete, ordered **entity UUID × locale × editable field/path matrix**. Record inclusions, exclusions, counts, immutable IDs and source SHA in the integration PR; later source expansion requires an owner-approved amendment.
3. Calculate workload from actual field/string complexity and file boundaries, not a hardcoded number of agents. Partition the matrix into nonoverlapping translator batches with explicit source paths and editor ownership. Avoid parallel writes to the same file when locales are co-located.
4. Create **one Draft integration PR → `main`** (`pr: integration`, real scope labels, `work: translation` and `work: review` when applicable). Each authorized translator/reviewer subtask is a **Draft PR → that integration branch**, labeled `pr: agent-subtask`. No arbitrary number of Issue/PRs per language, no status fields in Runtime Config/YAML/Props.
5. The integration PR body is the only manually maintained status matrix, including entity × locale coverage, reviewer identity (independent of the translator), source PR and immutable SHA, approvals, blocked scope, exact next action and authorizations. Update the matrix from Git evidence rather than optimistic checkmarks; the coordinator reconciles concurrent edits and does not let subtasks overwrite the parent PR body.

## Translation → independent review

- Translators change only assigned canonical `*.data.ts`/`*.locale.ts` localized fields, never identifiers, nonlocalizable English methodology, generated Markdown, untranslated targets or unrelated sources. Record files, entities/locales, exact SHA and scoped validation in their PR. No automatic merge.
- The owner **explicitly selects** when independent review begins, reviewer, source PR/SHA and precise entity × locale scope. There is **no global all-translators-merged prerequisite**. Independent reviewers do not review their own translations.
- **Pre-integration review:** review the existing unmerged translator PR at its pinned SHA; with explicit permission the independent reviewer may correct only the assigned localized fields **on that same PR**. **Post-integration option:** use a separate reviewer Draft PR based on the owner-selected integrated SHA.
- Generate the specific **Code-derived, PR-scoped reference Markdown and manifest** via the supported `/agent-artifacts generate <scope>` workflow, checking `manifest.sourceCommit`, complete assigned UUIDs/locales, missing/failures and `reviewReady`. If the real generator or a required document is unavailable, block **that review scope**, not all unrelated work. Read all assigned content, not only the diff. No generated Markdown edits.
- Document actual scientific/linguistic/terminology/a11y findings and source SHA in the working PR. A `reviewReady` manifest or passing typecheck **is not linguistic approval**. Re-run review on materially changed source. Review starts read-only; only owner-authorized fixes are allowed.
- After approved independent review, clean **all** `.agent-ci-artifacts/` from the working translator/reviewer PR, verify diff and exact SHA, scoped tests/CI and current GitHub mergeability. Merge the reviewed subtask to integration **only with owner permission**; record merged SHA in the parent PR. Other translation batches may remain in progress.

## PR-body resumption contract

The integration PR must be sufficient to restart from a new chat/agent without the prior conversation. Record at least:

- `<!-- svitlo-translation-production:v2 -->`, campaign purpose, owner, package(s), entity family, source and current integration SHAs.
- Frozen entity UUID/path × locale/field inventory with exact counts, excluded fields, languages and owner-approved changes.
- Nonoverlapping batch table: batch key, owned UUIDs/paths/locales, translator + branch/PR, reviewer + review mode, exact author/review SHAs, translation/review states, actual verified evidence and blockers.
- Owner authorizations for review start, edit rights, child merges and separate **parent-to-main** Ready/merge decision. Pending actions always identify the next executable authorized step.
- Links to canonical typed `review.ts` where supported; it indexes genuine completed PR-based evidence, not a second stage ledger. A missing or unhashed Props review cannot be replaced by invented approvals.

For `Continue Translation PR #N`, re-read the PR body and comments, linked live agent PRs, real Git branches, current source files, tracked artifact manifest and CI. Compare evidence and inventory at current SHAs. Resume only the first assigned authorized unfinished scope. Status values distinguish `planned`, `in-progress`, `ready-for-review`, `reviewed`, `merged`, `blocked`, `complete`; translations merged without review remain **unreviewed**.

## Final acceptance and release

All required entity-locale pairs must have canonical authored translations, independent qualified review evidence, correct owner/branch provenance, complete artifacts cleaned, TypeScript/build/test/localization/resource gates actually passed and no overlapping unreviewed edits. For Lesson `review.ts`, the verified integration AI review PR may be stored in `ai.locales`; independent human review references remain per-language in `human.locales`, with owner-controlled acceptance. Do not fabricate an unsupported review schema.

The parent integration PR **remains Draft** until explicit owner Ready/release authorization. Its merge to `main` is separate from any child review/merge permission. Existing old Issues are not automatically closed or reclassified; preserve all historical evidence and owner decisions. Do not remove GitHub Issues generally or `issue_comment` events serving authorized PR commands.
