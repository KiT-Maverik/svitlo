# Translation Workflow

**Translation Production Issue coordination:** For a new authorized translation campaign (Skills, Lessons, Courses, Assessment Methods, UI Kit or another locale-bearing type), first locate or create **one** [Translation Production Issue](./manage-translation-production.skill.md) covering the exact entity × target-language scope. Use the same Issue for integrated parallel translator PRs **and** independent post-integration review. Never require one Issue per locale, agent or Lesson; a standalone small edit/review outside a campaign need not create an Issue automatically.

**Persona:** [Technical Translator](../../personas/technical-translator.persona.md), for linguistic judgment across supported languages.

- **[Manage Translation Production](./manage-translation-production.skill.md):** create and maintain the canonical [Translation Production Issue Form](../../../.github/ISSUE_TEMPLATE/translation-production.yml); choose entity/locale batches dynamically, open one Draft integration PR, coordinate translation agent PRs, and launch separate review batches **only after all translations have merged into integration**. Reviewer Markdown generation is a strict prerequisite: if missing, report in chat and **STOP**.
- **[Review Translation](./review-translation.skill.md):** read-only linguistic QA using **Code-derived Markdown**. One on-demand CI command generates the **complete collection** of Code Skills taxonomies and canonical Lesson Markdown in **every supported language** into the PR-only `.agent-ci-artifacts/` folder. The reviewer independently chooses which documents to read for the assigned locale and subject. No coding expertise is required to review the generated text.
- **[Technical Translation](./technical-translation.skill.md):** implementation of actual localized text changes in canonical `*.data.ts` / `*.locale.ts` files; mandatory TypeScript and source validation.
- **[Common Translation](./common-translation.skill.md):** placeholder for future standalone document translation.

Reusable agent CI workflow: [Agent CI Artifacts](../../../.github/workflows/translation-review.yml). In a PR conversation, a **repository-owner-authored** `/agent-artifacts generate` triggers generation for that PR's head branch; when the agent is finished, `/agent-artifacts cleanup` removes its tracked artifacts. The workflow must exist in **main** before slash commands become active. A [dedicated merge guard](../../../.github/workflows/agent-ci-artifacts-guard.yml) blocks temporary files from entering `main` or `new-lesson` after the relevant workflow is active on the target branch. See [Agent CI Artifacts architecture](../../docs/architecture/agent-ci-artifacts.md).

**Never edit generated Markdown to change translations.** It is a disposable view of canonical code. Do not add `.agent-ci-artifacts/` to `.gitignore`: the reviewer must access its temporary documents in the PR branch, and cleanup must remove them before merge.

## Lesson translation review references

Canonical implemented Lessons are discovered under `content/<textbook>/data/lessons/<last-uuid-hex-digit>/<lesson-uuid>/*.data.ts`. The same on-demand command builds `.agent-ci-artifacts/lessons/<textbook>/<bucket>/<lesson-uuid>/<language>.md`. Each document includes Lesson Sections, the complete Question Bank, Flashcard Bank and descriptive metadata for non-text media, without embedding media. Reviewers should select the assigned Lesson and language, verify `manifest.json` for missing documents/failures, compare the source meaning, and make changes only to canonical authored code. Do not edit temporary Markdown.

Lesson artifacts depend on the separate `scripts/generate-lessons-markdown.mjs` CLI being delivered by the Lesson → Markdown task (Agent 4). If it is not present, `manifest.json` explicitly records the missing dependency; generated Skills references are still usable. See the [Agent CI Artifacts architecture](../../docs/architecture/agent-ci-artifacts.md) for the CLI contract and behavior with integration PRs.

## Integration-first independent review

The normal production campaign uses the [two-phase integration protocol](../../docs/architecture/translation-production-workflow.md). Translation agent PRs target one integration PR branch; review agents must branch from the **fully integrated translation commit**, never an unmerged translator PR. Each reviewer generates and checks entity-specific localized Markdown on their own PR branch via Agent CI Artifacts. A generic artifact workflow is **not** proof the specific entity generator exists. If missing, unsupported, failing or stale, stop and explicitly tell the user in chat; don't work around it by reading distributed source objects. Keep temporary artifacts off the integration branch, clean them from each reviewer PR before merging, and don't auto-merge integration to main.

**Source clarification:** The old example Lesson path `data/lessons/<group>/<slug>/` is historical. New code uses UUID-addressed `data/lessons/<bucket>/<uuid>/`; always derive paths from current repo and inspect the manifest rather than following stale examples.
