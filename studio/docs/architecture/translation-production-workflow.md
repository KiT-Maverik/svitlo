# Translation Production — one Issue, two integration phases

**Status:** standard GitHub production coordination protocol for typed, localized Svitlo entities. Not a new automatic agent-spawning service or a translation/Markdown generation engine.

## Stable scope

The [Translation Production Issue Form](../../../.github/ISSUE_TEMPLATE/translation-production.yml) covers **one explicitly frozen set of entities and target languages**, whether Skills, Lessons (including nested sections/questions), Assessment Methods, Courses, or UI Kit messages. A source Course Chapter, Module or Skill subtree can be a selection shortcut, but is **resolved to exact UUIDs, paths, and field ownership** before work begins. A later Course/taxonomy edit must not silently alter the Issue.

Use [Manage Translation Production](../../skills/translation-workflow/manage-translation-production.skill.md) for inventory, estimated workload, exact locale membership, nonoverlapping agent batches, persistent Issue handoffs and PR links. Review [Technical Translator Persona](../../personas/technical-translator.persona.md), [Technical Translation](../../skills/translation-workflow/technical-translation.skill.md) and [Review Translation](../../skills/translation-workflow/review-translation.skill.md) for linguistic standards.

## Source and ownership invariants

- Source of truth is approved **typed authored data** and verified English/source editorial meaning in the owning workspace; generated Markdown under `.agent-ci-artifacts/` is an **immutable read-only reference view**, not a replacement or write-back source.
- The `(canonical entity / translatable field group, target language)` matrix has **complete disjoint ownership** across translation batches. Do not silently omit locales or split one editable file concurrently among agents. Prefer assigning complete entity files/subtrees with _all_ their required target languages per translator when locales are co-located; distribute locales independently only if actual locale-file boundaries permit safe parallel edits.
- Agent count and assignments come from current entity counts, strings/complexity, locale roster and source layout. Four workers often fit large batches but are not a fixed quota. Smaller work may use one or two.
- Preserve approved UUIDs, source language, content meaning, methodologically English-only descriptions and correct localization contracts; translation coverage is not proven by TypeScript passing alone.

## PR topology

```text
main
 └─ Draft TRANSLATION INTEGRATION PR → main
      ├─ Translation Agent 1 — Draft subtask PR → integration
      ├─ Translation Agent 2 — Draft subtask PR → integration
      ├─ Translation Agent N — Draft subtask PR → integration
      │
      ├── HARD BARRIER: all translation PRs merged;
      │   exact entity × language coverage and integrated SHA verified
      │
      ├─ Independent Review Agent 1 — Draft subtask PR → integration
      ├─ Independent Review Agent 2 — Draft subtask PR → integration
      └─ Independent Review Agent M — Draft subtask PR → integration
```

Agent PRs always start at the current appropriate integration SHA and target **integration**, never `main`. PRs have clear owning scope, canonical labels (`pr: integration` on the parent, `pr: agent-subtask` on agent PRs), and `Refs #<issue-number>`. Only the parent integration PR may close the Issue on final authorized merge. No separate Issue per locale or agent; all phases remain visible in the same tracker.

## Translation phase

Coordinator verifies authored source/requirements, establishes integration baseline once, opens Draft integration PR and assigns balanced, nonconflicting batch ownership. Translator agents independently edit only their assigned typed fields, verify included TypeScript sources and relevant localized content, and submit Draft agent PRs. Coordinator confirms permitted/approved merges, checks the **actual merged integration state**, records the new integration SHA and waits until every assigned pair is covered before proceeding.

Do not confuse an agent's successful branch with integration completion. An open/unmerged translation subtask blocks the **entire review launch**.

## Independent review phase, with hard artifact prerequisite

Review agents are **independent** of original translators for their scope where feasible. Reviews start only from an integrated revision containing **all translated agent PRs**, with complete coverage and a validated source SHA.

For **each entity type in scope**, review coordinator and review agents MUST verify that an installed, working **Code → localized Markdown generator** supports those exact entities, locales and current file layout. The current Agent CI Artifacts infrastructure includes:

- Skills: `shared/engine/scripts/generateSkillsTaxonomy/generate-skills-taxonomy.mjs`, reviewed from `.agent-ci-artifacts/taxonomies/<textbook>/<language>.md`.
- Lessons: `shared/engine/scripts/generateLessonsMarkdown/generate-lessons-markdown.mjs`, reviewed from `.agent-ci-artifacts/lessons/<textbook>/<bucket>/<lesson-slug>/<language>.md` or the actual path present in the current manifest. Verify support for the nested Lesson content being reviewed.
- Assessment Methods: `shared/ui-kit/scripts/generateAssessmentMethodsReference/generate-assessment-methods-reference.mjs`, reviewed from `.agent-ci-artifacts/assessment-methods/<language>.md`.

These are **known generator families, not guarantees** for every target subtype, locale or revision. Courses, UI Kit dictionaries and other entities require verified matching generators before review. The existing CI wrapper may generate all locales rather than accepting selective locale arguments; reviewers simply select assigned documents.

Each reviewer creates its **own Draft subtask PR from the frozen integration head**, generates the reference library in that PR branch on demand and verifies `manifest.json`/source commit and all required output paths. The on-demand workflow resides in `.github/workflows/translation-review.yml`; `/agent-artifacts generate` requires repository-owner authorization or manual GitHub Actions invocation. Local CLI generation is valid only if actually run and its output verified. No artifact is written to the **integration branch**; PR-only generated files must be cleaned via `/agent-artifacts cleanup` before merging a review correction PR. This also prevents the temporary library leaking to `main`.

**NON-NEGOTIABLE STOP:** if the required entity→Markdown generator is missing, unsupported, yields incomplete localized documents, or produces a failing/stale manifest, the reviewer **stops the review** and explicitly tells the user **in chat** the exact missing generator/locale/target and required corrective action. Mark that review batch/phase `blocked` in the Issue. Do **not** replace required generated localized Markdown with manual code scanning, fabricated output, fallback translation or unverified source text. A coordinator should detect this before assigning reviewer batches, but each reviewer must check independently. The generator may be repaired in a separate tooling PR and the blocked review resumed afterward.

A reviewer reviews **the whole assigned entity-language scope** from the generated human-readable documents, not just changed Git diff, compares with approved source meaning, and records specific corrections, terminology decisions, linguistic quality and evidence. Authorized corrections use [Technical Translation](../../skills/translation-workflow/technical-translation.skill.md) on canonical types, not on generated Markdown. Refresh stale output after source changes and re-review affected scope. If no corrections are needed, issue-linked evidence can suffice; don't create fake edits merely to have a PR.

## GitHub Issue tracking / resumption

The Issue retains exact input/inventory source SHA, target locales, distribution rationale, one line per **translation and review batch**, current statuses/owners/PRs, approved subtask merges, frozen post-translation integration SHA, generated-review artifact provenance, failures and next available assignments. Agent must re-read the latest Issue, PRs and source files before continuing in any new chat. Source, Git merges, CI and authorized review approvals outrank stale checkbox states.

An Issue is complete only after **all translations integrated, all independent reviews completed and validated, all temporary artifacts cleaned**, all actual required checks passed, and the final integration PR was merged with explicit owner permission. Do not close the Issue on the first agent PR. Keep blocked reviewer batches visible rather than quietly skipping unsupported entity types.

## Future extensions

This format can coordinate translation of future locale-bearing Svitlo entities. Each entity type must have an explicitly verified localized Markdown reader/generator before its review phase is executable; extending the Issue Form does not automatically implement new generator support. A future automation service can operate the same Issue tracker and plan; **this PR only defines the reproducible agent procedure and Issue form**, not asynchronous agent execution.
