# Translation Production — one Issue, owner-scheduled review

**Status:** standard GitHub production coordination protocol for typed, localized Svitlo entities. Not a new automatic agent-spawning service or a translation/Markdown generation engine.

## Stable scope

The [Translation Production Issue Form](../../../.github/ISSUE_TEMPLATE/translation-production.yml) covers **one explicitly frozen set of entities and target languages**, whether Skills, Lessons (including nested sections/questions), Assessment Methods, Courses, or UI Kit messages. A source Course Chapter, Module or Skill subtree can be a selection shortcut, but is **resolved to exact UUIDs, paths, and field ownership** before work begins. A later Course/taxonomy edit must not silently alter the Issue.

Use [Manage Translation Production](../../skills/translation-workflow/manage-translation-production.skill.md) for inventory, estimated workload, exact locale membership, nonoverlapping agent batches, persistent Issue handoffs and PR links. Review [Technical Translator Persona](../../personas/technical-translator.persona.md), [Technical Translation](../../skills/translation-workflow/technical-translation.skill.md) and [Review Translation](../../skills/translation-workflow/review-translation.skill.md) for linguistic standards.

## Source and ownership invariants

- Source of truth is approved **typed authored data** and verified English/source editorial meaning in the owning workspace; generated Markdown under `.agent-ci-artifacts/` is an **immutable read-only reference view**, not a replacement or write-back source.
- The `(canonical entity / translatable field group, target language)` matrix has **complete disjoint ownership** across translation batches. Do not silently omit locales or split one editable file concurrently among agents. Prefer assigning complete entity files/subtrees with _all_ their required target languages per translator when locales are co-located; distribute locales independently only if actual locale-file boundaries permit safe parallel edits.
- Agent count and assignments come from current entity counts, strings/complexity, locale roster and source layout. Four workers often fit large batches but are not a fixed quota. Smaller work may use one or two.
- Preserve approved UUIDs, source language, content meaning, methodologically English-only descriptions and correct localization contracts; translation coverage is not proven by TypeScript passing alone.

## PR topology and owner-directed review

```text
main
 └─ Draft translation integration PR → main
      ├─ Translator Agent 1 Draft PR → integration — optional review on this PR, then merge
      ├─ Translator Agent 2 Draft PR → integration — optional review on this PR, then merge
      └─ Translator Agent N Draft PR → integration
           └─ alternatively: later independent reviewer Draft PR → integration
```

There is **no mandatory global "all translations merged before review" barrier**. The owner selects when to start each independent review, which PR/SHA it inspects, whether corrections are authorized and whether the reviewed translator PR can be merged. Translation and review stay within the single Issue; an independent reviewer must differ from the translator of the assigned scope.

## Translation and review procedure

1. Coordinator establishes the fixed entity/language inventory and single Draft integration PR. Translators produce scoped Draft subtask PRs targeting integration; verify actual changed authored files with the strongest meaningful scoped checks. Do not weaken contracts or falsely describe broader CI failures as green.
2. **Pre-integration review on an existing translator PR:** On explicit owner request, the independent reviewer pins the translator PR head and generates *only the assigned family/textbook/locale* Markdown there (e.g., `/agent-artifacts generate skills content/astronomy it`). Confirm `.agent-ci-artifacts/manifest.json` sourceCommit matches, requested documents exist, `missing === 0`, `reviewReady === true`, and no relevant failures. The reviewer does **not** have to integrate other books first.
3. **Post-integration review (optional):** When the owner specifically chooses this topology, pin the intended integrated source SHA and create a separate Draft reviewer PR targeting integration; generate/verify on that working PR branch.
4. Independently read the **entire assigned Code-derived Markdown** against approved source/editorial meaning, not only changed lines. Record evidence for semantic, scientific, linguistic, register and accessibility findings. Review is read-only until fixes are authorized; then edit only the permitted canonical typed locale fields on the working branch, regenerate and recheck affected documents.
5. **Scoped artifact hard stop:** If the required entity-specific Markdown generator or assigned document/manifest is missing, incomplete or stale, stop that review and explain the exact blocker in chat and Issue. Do not use fabricated output or manual distributed source scanning as a substitute.
6. **Authorized translator PR merge:** After complete independent review, fixes and relevant verification, clean `.agent-ci-artifacts/` from that translator PR, inspect current source SHA, diff, head/base and required GitHub checks, and merge **the same translator PR** into integration if authorized. Track the actual merged SHA. Unrelated CI blockers are separately recorded; never bypass required protections.
7. When all required batches are independently reviewed and integrated, run final integrated validation. The parent integration PR stays Draft until the owner separately authorizes its merge to `main`.

## GitHub Issue tracking / resumption

The Issue retains exact input/inventory source SHA, target locales, distribution rationale, one line per **translation and review batch**, current statuses/owners/PRs, approved subtask merges, frozen post-translation integration SHA, generated-review artifact provenance, failures and next available assignments. Agent must re-read the latest Issue, PRs and source files before continuing in any new chat. Source, Git merges, CI and authorized review approvals outrank stale checkbox states.

An Issue is complete only after **all translations integrated, all independent reviews completed and validated, all temporary artifacts cleaned**, all actual required checks passed, and the final integration PR was merged with explicit owner permission. Do not close the Issue on the first agent PR. Keep blocked reviewer batches visible rather than quietly skipping unsupported entity types.

## Future extensions

This format can coordinate translation of future locale-bearing Svitlo entities. Each entity type must have an explicitly verified localized Markdown reader/generator before its review phase is executable; extending the Issue Form does not automatically implement new generator support. A future automation service can operate the same Issue tracker and plan; **this PR only defines the reproducible agent procedure and Issue form**, not asynchronous agent execution.
