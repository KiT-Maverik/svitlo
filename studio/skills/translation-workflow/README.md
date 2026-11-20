# Translation Workflow

**Translation PR coordination:** For new work, one Draft integration PR owns the frozen entity × locale scope, independent translator/reviewer assignments, review SHAs and progress; do **not** create a new Translation Production Issue. Preserve old active Issues and evidence under [legacy recovery](./legacy-production-issues.md) until specifically owner-authorized migration. The owner chooses review source/when; an all-translators-merged baseline is not required.

**Persona:** [Technical Translator](../../personas/technical-translator.persona.md), for linguistic judgment across supported languages.

- **[Manage Translation Production](./manage-translation-production.skill.md):** plan the nonoverlapping translation batches, Draft integration PR and independent review at the owner-authorized stage and source PR. Missing scoped reference Markdown is a review stop, not a reason to delay unrelated batches.
- **[Review Translation](./review-translation.skill.md):** inspect complete Code-derived Markdown for only the requested entity family, textbook and locale, generated on the working PR; verify manifest/source revision and validate exact run/SHA/scope with no report commits.
- **[Technical Translation](./technical-translation.skill.md):** implementation of actual localized text changes in canonical `*.data.ts` / `*.locale.ts` files; mandatory TypeScript and source validation.
- **Standalone static-document translation:** not yet a published skill; propose it separately if needed. The active Technical Translation workflow covers typed localized source, not unapproved general document translation.

Reusable agent report workflow: [Agent CI Artifacts](../../../.github/workflows/agent-ci-artifacts.yml). An authorized `/agent-artifacts generate` command creates a one-day, SHA-pinned ZIP attached to the actual Actions run. Agents must list, download and inspect that run's artifact and `manifest.json`. New reports never commit to the working PR and have no cleanup command. The historical `Agent CI Artifacts / clean` check remains temporarily for already-tracked files. See [run-scoped report protocol](../../docs/architecture/agent-ci-artifacts.md).

**Review outcomes live in the entity-owned `review.ts` when its typed contract exists; no permanent per-locale Markdown review reports.** For Lessons, `ai.locales` stores one verified integration PR for completed AI-language review, `human.locales` stores individual human language-review PRs, and review-specific linguistic decisions are short `//` comments directly above the relevant PR-valued entry. If `review.ts` is not yet available or assembled Props cannot be hashed, preserve the source-specific evidence in the current PR (and any historical Issue when one actually exists) for later reconciliation; do not fabricate an approval. The review agent remains read-only by default; the authorized coordinator records verified values.

**Never edit generated Markdown to change translations.** The one-day Actions ZIP is a disposable preview of canonical Code. There is no repository reference directory, no report cleanup commit and no automatic cleanup at Ready; only canonical source and review evidence belong in Git.

## Lesson translation review references

Canonical implemented Lessons are discovered under `content/<textbook>/data/lessons/<last-uuid-hex-digit>/<lesson-uuid>/*.data.ts`. The same on-demand command includes `lessons/<textbook>/<bucket>/<lesson-uuid>/<language>.md` in the ZIP. Each document includes Lesson Sections, the complete Question Bank, Flashcard Bank and descriptive metadata for non-text media, without embedding media. Reviewers should select the assigned Lesson and language, verify `manifest.json` for missing documents/failures, compare the source meaning, and make changes only to canonical authored code. Do not edit temporary Markdown.

**Implemented Lesson reference:** [generate-lessons-markdown.mjs](../../../shared/engine/scripts/generateLessonsMarkdown/generate-lessons-markdown.mjs) is dispatched through [Generate Translation Review Artifacts](../../../scripts/generateTranslationReviewArtifacts/README.md). Use the actual scoped command, verify the exact source SHA in `manifest.json`, and do not rely on the removed root `scripts/generate-lessons-markdown.mjs` path or the historical Agent 4 prerequisite.

## Owner-directed independent review

The owner decides whether to review an **unmerged translator Draft PR** directly or use a later independent reviewer Draft PR based on an integrated SHA. For pre-integration review, the independent reviewer uses the **same translator PR** for generated scoped references and authorized fixes, then merges that reviewed translator PR to integration if the owner explicitly authorizes it and real gates allow. No other translation PRs need to merge first. Review the full assigned Markdown, not only the diff. Unsupported or incomplete entity-specific documents remain a scoped hard stop; never merge generated reference files into integration or merge the parent integration PR to `main` without separate owner approval.

**Source clarification:** The old example Lesson path `data/lessons/<group>/<slug>/` is historical. New code uses UUID-addressed `data/lessons/<bucket>/<uuid>/`; always derive paths from current repo and inspect the manifest rather than following stale examples.
