# Translation production — Git-first Draft PR coordination

**Current for new campaigns:** [Manage Translation Production](../../skills/translation-workflow/manage-translation-production.skill.md) defines **one Draft integration PR as the only current coordination/status record**. The old fixed-scope Translation Production Issue procedure has been preserved as [historical recovery guidance](../../skills/translation-workflow/legacy-production-issues.md) for already-open campaigns; their evidence and permission boundaries are unchanged until individually migrated with owner authorization. Ordinary Issues, user reports, investigations and PR slash-command Actions remain supported.

## Frozen entity × locale scope

- One integration PR targets `main` and freezes the complete entity UUID/field path × target locale set, underlying original/source-language SHA, actual file ownership, exclusions and editorial requirements.
- Use verified data boundaries and languages; symbolic Course/Chapter/Lesson or Skill subtrees must resolve to exact, stable UUIDs before assigning agents. A later Course/taxonomy revision does not silently enlarge this matrix.
- Plan disjoint file ownership. A batch/agent count is determined by verified work, not a universal quota. All source remains Git-authored canonical typed files; no workflow `status`, `approved` or `stage` state enters the educational YAML/Config/Props.
- Track for each batch the translator PR, source SHA, independent reviewer, pinned review SHA, authorizations, locale coverage, distinct translation vs review state, owner and next blocker. The **integration PR body** carries current status, with source commits and actual checks as evidence.

## Branch topology and review independence

```text
main
 └─ Draft translation integration PR → main (PR body owns campaign matrix)
      ├─ Translator 1 Draft PR → integration (may be independently reviewed here)
      ├─ Translator 2 Draft PR → integration
      └─ Optional independent reviewer Draft PR → integration (only when owner chooses)
```

The owner selects **when** and **which immutable source PR/SHA** the independent reviewer inspects. There is no universal need to merge all translator PRs first. Reviewer must differ from original translator; read-only by default, with narrowly owner-authorized source edits or merges. Corrected source invalidates dependent review evidence until refreshed.

## Review artifact and release gates

Use the actual supported scoped Code→Markdown generator on the working PR branch, verify full assigned entities/locales in `manifest.json`, matching `sourceCommit`, zero relevant failures and `reviewReady` before reading. Missing/unready scoped documents block only that particular independent review. The disposable `.agent-ci-artifacts/` is **not** canonical authored content, and must be cleaned before merging its working PR. Check actual translation meaning, scientific terminology, register, RTL/accessibility, verified source alignment and false fallbacks. Build/test success and completed Markdown are **not linguistic approval**.

A reviewed translator PR can merge to integration only with verified owner permission, exact source SHA, clean artifacts and current GitHub checks. The final integration PR requires separate owner Ready/merge authorization and full checks. Typed entity-owned `review.ts` entries index true completed review evidence, not a second campaign-status workflow.

## Resumption, legacy evidence and safeguards

A new agent can resume from **the same integration PR alone**: frozen matrix, assignments, author/reviewer identity, PR ancestry, source/review SHAs, accepted results, failed checks and next authorized action. Reconcile from actual Git before changing checkmarks. For a campaign already recorded in a historic Production Issue, read the complete Issue/comments, preserve its active plan/permission boundaries and the [legacy instructions](../../skills/translation-workflow/legacy-production-issues.md); do not silently migrate, close or delete it. This new PR-only protocol applies automatically only to **new** work.

Retain Issue use for independent bugs/tasks and keep GitHub `issue_comment` workflows for commands on PR conversations. A future automation service is not assumed implemented.
