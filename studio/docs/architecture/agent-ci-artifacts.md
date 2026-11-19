# Agent CI Artifacts — PR-Scoped Reference Workspace

**Status:** On-demand CI utility for AI agents. No production runtime dependency.

## Boundary

`.agent-ci-artifacts/` is a **temporary Git-tracked reference workspace**, not source content, not an application asset, and not an archival documentation directory. It is intended to live **only on an open feature/agent PR branch**. Do not add it to `.gitignore`. The generated files remain visible to an AI agent using a GitHub connector because they are committed to the PR branch. They must never reach `main` or an integration branch such as `new-lesson`.

Scope and performance: each on-demand `generate` request specifies **one reference family** and, for Skills or Lessons, **one textbook**. Locale is optional: when omitted Skills generate that textbook's registered locales and Lessons generate their own declared `params.languages`. Unrelated packages, reference families, Playground smoke tests and full generator unit suites are never run by the artifact workflow. The requested scope is recorded in `manifest.scope`; previous PR-scoped artifacts are replaced rather than silently accumulated. Engine is built only for typed Lesson generation. The former bare `/agent-artifacts generate` command is intentionally unsupported; see `scripts/generateTranslationReviewArtifacts/README.md` for scoped commands.

Current folder contract:

```text
.agent-ci-artifacts/
  manifest.json
  assessment-methods/
    <language-key>.md
  education-standards/
    <language-key>.md
  ui-kit/
    <component-name>/
      <language-key>.md
  geography-home-copy/
    <language-key>.md
  taxonomies/
    <textbook-name>/
      <language-key>.md
  questions/
    <textbook-name>/
      <last-uuid-hex-digit>/
        <lesson-uuid>/
          <language-key>.md
  lessons/
    <textbook-name>/
      <last-uuid-hex-digit>/
        <lesson-uuid>/
          <language-key>.md
```

The `manifest.json` records the canonical **last non-artifact source commit**, exact requested scope, languages actually attempted, requested book path, successfully generated documents and failures. `generated` entries are limited to the explicitly requested family (`kind: taxonomy`, `kind: lesson`, `kind: assessment-method`, `kind: ui-kit-locale` or `kind: geography-home-copy`); `summary` counts the successful documents and discovered lessons. Repeated generation without source changes produces the same manifest (no changing timestamp). Taxonomy Markdown references actual Code Skills entities, localizes headings and frontend descriptions, and retains canonical English methodological descriptions. Lesson Markdown is one localized, read-only document per Lesson UUID and language: ordered Sections and ContentBlocks (including Quiz Section parameters), the complete Question Bank and Flashcard Bank, media descriptions/alt/captions/fallbacks, and source links pinned to the checked-out commit. Binary media and interactive Scene behavior are not embedded; Quiz selections reference the Question Bank without duplicating its content. Generated files are **not** writeback sources.

### Question-bank references\n\nThe `questions` request generates read-only `.agent-ci-artifacts/questions/<book>/<bucket>/<lesson-uuid>/<language>.md` from canonical `questions/index.ts` and the six (or other declared) typed Question modules. Each Question's UUID, assessment method, source link, ordered prompt, optional hint, explanation, correct option, distractors and incorrect answers appear as **English versus selected language**. The generator statically reads TypeScript declarations and rejects missing/unsupported Question types, dynamic authoring expressions, mismatched registry entries and unsafe paths. `manifest.generated[].kind = question`, with `questions`, `strings`, `missing`, `reviewReady`; the trusted publisher validates lesson/bucket/path and sourceCommit like other families. `missing=0` proves nonempty coverage, not translation accuracy.\n\n## Progressive locale previews

The on-demand reference pipeline reads the language roster from the checked-out Engine source, **not** a hardcoded GitHub Actions language list. In PR-scoped Markdown, missing localized text is written as the literal technical marker `%%MISSING%%`. This is permitted **only for generated draft references**: never write this marker to typed authored content, production JSON, or user-visible UI. Strict taxonomy publication/typechecks still reject missing localizations.

Each generated manifest entry with supported coverage has `missing` (nonnegative field count) and `reviewReady` (true only when `missing === 0`). `summary.missingTranslations` and `summary.incompleteDocuments` aggregate these counts. Other entity generators may record failures per document; generating valid language references is not blocked by unrelated missing locale content. The absence of a document, a relevant `manifest.failures` entry, a nonzero `missing` count, or an incorrect `sourceCommit` **blocks review of that requested document**, even when the CI generation job succeeded.

The Code-derived references include Skills taxonomies, Lessons, Assessment Methods, 10 UI Kit component dictionaries, `content/geography/data/homeCopy.ts`, and the global EducationStandard authoring catalog when present on the source branch; each UI Kit and Geography field includes canonical English side by side with the selected locale. Dedicated generators live in their owning packages. A translator can inspect incomplete documents to find missing fields, but an owner-authorized independent reviewer may approve a **complete selected entity/locale** generated from a verified **unmerged translator PR head**. Other incomplete artifacts remain unapproved; no all-translators-merged barrier is implied.

## Assessment Methods reference

When the user explicitly requests `assessment-methods`, `scripts/generateTranslationReviewArtifacts/generate-translation-review-artifacts.mjs` invokes `shared/ui-kit/scripts/generateAssessmentMethodsReference/generate-assessment-methods-reference.mjs` for **the selected language**, or the registered languages when none is selected. This creates one temporary `.agent-ci-artifacts/assessment-methods/<language>.md` for each supported language and records each in the same `manifest.json` (`kind: assessment-method`, with `summary.assessmentMethodDocuments`). Missing IDs or English methodological descriptions produce explicit manifest failures. Missing target-language titles appear as `%%MISSING%%` in draft references and are recorded as incomplete, without blocking other languages. The standard path validation, publish/cleanup and merge guard remain unchanged; **do not create a separate workflow or publish these files as runtime data**.

Each reference lists the 16 canonical Assessment Method identifiers from Engine and UI Kit, **short frontend labels in the selected language from UI Kit**, and **detailed pedagogical descriptions from the English Engine methodology, kept in English in every document**. The generated links resolve back to their respective canonical files. Assessment Methods describe the cognitive operation and evidence an assessment requires; Question types describe the learner's response mechanism or widget. This distinction is essential when planning Quiz Sections: multiple methods may be pedagogically justified across one Lesson's distinct Skills and learning outcomes, and a single Question type can assess different methods. The Methodologist plans evidence requirements and the need for quizzes; the Learning Assessment Architect designs valid Questions and scoring. Machine-readable configurations must use the canonical key, never the localized label.

To inspect a specific language without writing files:

```sh
node shared/ui-kit/scripts/generateAssessmentMethodsReference/generate-assessment-methods-reference.mjs --locale uk --stdout
```

To generate one selected language into the temporary workspace:

```sh
node shared/ui-kit/scripts/generateAssessmentMethodsReference/generate-assessment-methods-reference.mjs --locale uk --output .agent-ci-artifacts/assessment-methods
```

If this PR-scoped document is not available, agents must inspect Engine's Assessment Method schemas, the English Engine methodology and UI Kit locale sources directly. Never infer that missing reference files mean the method does not exist, and never invent new keys or labels.

## Lifecycle

1. **Request (opt-in):** A review-only PR may need a temporary `.agent-ci-artifacts/review-request.md` seed commit to establish a diff against its base branch; create it on a new **draft PR** so it is never mistaken for a production edit. An owner-authorized user with `write`, `maintain`, or `admin` repository access posts a **scoped** command such as `/agent-artifacts generate skills content/astronomy it` on the relevant PR, or starts **Agent CI Artifacts** manually with the PR number and explicit reference scope. Do **not** generate on every push, PR creation, or build.
2. **Resolve source:** CI validates that the PR is open, in the same repository, and its head branch is not the default branch. All work is pinned to the PR's exact head SHA so concurrent source updates cannot be overwritten.
3. **Generate (read-only):** A low-privilege worker checks out the source SHA and runs `node scripts/generateTranslationReviewArtifacts/generate-translation-review-artifacts.mjs`. This wrapper discovers **all** textbooks with `content/*/data/skills`, canonical Lessons under `content/*/data/lessons/<uuid-last-hex-digit>/<uuid>/*.data.ts`, and **all** registered language keys from `shared/engine/schemas/languages.schemas.ts`. It invokes the established `generate-skills-taxonomy.mjs --stdout` for Skills and the separate Lesson generator using `node shared/engine/scripts/generateLessonsMarkdown/generate-lessons-markdown.mjs --package content/<book> --lesson <uuid> --locale <code> --stdout`. The wrapper has no per-locale/per-book modes and writes only under `.agent-ci-artifacts/`. Missing or failed Lesson generation is recorded in the manifest; successful outputs from other languages remain available.
4. **Publish:** A separate, write-authorized job downloads the produced one-day transport artifact, removes any previous tracked agent reference library, and commits only `.agent-ci-artifacts/` to the same PR head branch. A stale commit push fails rather than overwriting newer work. The agent reads selected documents directly from that branch.
5. **Review or follow-up:** The agent processes only documents needed by its actual task. The corpus exists for reference; canonical edits, if authorized, happen in Code using the relevant editing skill. A new generation can refresh the reference library after code changes.
6. **Cleanup:** After the agent finishes, an authorized user posts `/agent-artifacts cleanup` on that PR, or manually chooses `cleanup` in Actions. For a draft PR targeting `main` or `new-lesson`, transition to **Ready for review** also triggers cleanup once the corresponding workflow exists on the PR base branch. Cleanup removes all tracked `.agent-ci-artifacts/` content in a new PR commit.
7. **Merge safety:** A dedicated, path-unfiltered **Agent CI Artifacts / clean** check runs on every PR into `main` or `new-lesson` (once the updated workflow is active on that base branch) and fails while this folder exists; FastGate also rejects it when FastGate runs. **Make the dedicated check required in the `main` and protected integration-branch rulesets**. The presence of artifacts intentionally blocks merging until cleanup.

## Security and resource controls

The generation worker has read-only repository permissions. Only the trusted publish/cleanup jobs have `contents: write`, do not execute source-branch scripts and write only to the resolved same-repo PR branch. PR comment commands are authorized by the commenter's current repository `write`, `maintain`, or `admin` permission, verified using GitHub's collaborator-permission API; failed lookups and insufficient permissions stop before generation. Unrecognized comments and comments on issues are ignored. This limits risks from untrusted PR contents.

The generation worker installs the repository's locked dependencies and builds Engine only when generating typed Lesson configurators. No deployable application or full textbook build is required. GitHub Actions isolated runners and the transport archive are disposable (archive retention: **one day**). Git-tracked PR artifacts **do not expire automatically**: cleanup is a deliberate Git commit. Do not equate runner cleanup with PR content cleanup. A merge check is an additional defense and is enforceable only if configured as a required check.

All-language requests can create substantial PR commits. Make the desired textbook/language explicit and trigger them sparingly and only when the agent actually needs an external CI workspace; do not use artifacts as permanent documentation. Skills and Lessons share the same temporary workspace and cleanup lifecycle; future material types require a separately reviewed generator/publisher change. No ephemeral workflow YAML creation/deletion.

## Lesson generator contract and integration-PR notes

The Lesson CI adapter is `shared/engine/scripts/generateLessonReviewArtifacts/generate-lesson-review-artifacts.mjs`; its tests are in `shared/engine/scripts/generateLessonReviewArtifacts/generate-lesson-review-artifacts.spec.mjs`. For the selected textbook, it discovers numbered Lesson buckets and real `<slug>.data.ts` entries. If no locale is specified, it asks each Lesson for its declared supported languages; it then generates only those documents and records failures individually. That CLI is present and loads actual typed authoring data. A missing generator, unsupported Lesson, absent locale or failed conversion is recorded per document in `manifest.failures`; successful Skills and other Lesson references remain available. A failed or incomplete requested document blocks its independent linguistic review.

Use `/agent-artifacts generate lessons content/<book> [locale]` on a same-repository agent PR targeting `new-lesson` to commit reference Markdown to that **agent PR branch only**. After reviewing, use `/agent-artifacts cleanup` before making the PR ready for merge. The integration PR `#162` itself must not collect or merge temporary artifacts. The same guard applies when `#162` is later merged into `main`.

**Workflow activation detail:** `issue_comment` and `workflow_dispatch` resolve the workflow file from the default branch, currently `main`. Changes to the workflow committed only on `new-lesson` do not alter default-branch comment handling yet; the currently installed default-branch workflow can still check out the specified PR's head SHA and use its scripts, but new workflow validation and integration-branch auto-cleanup are only guaranteed after the relevant workflow changes reach the branch GitHub uses for that event. Verify Actions execution rather than assuming a command fired.

**CI isolation:** Generation runs with read-only permissions, publishes through a separate write-authorized job, and the publishing job verifies that every Markdown file matches an entry in `manifest.json`. No source-branch script is executed by the publishing job. Source branches that advance during generation are not force-pushed.

## Translation Production: required entity-specific review generator

When work is tracked through a [Translation Production Issue](../skills/translation-workflow/manage-translation-production.skill.md), the owner explicitly selects either **pre-integration review on the existing translator Draft PR** or **post-integration review on a dedicated reviewer Draft PR** from a pinned integration SHA. Generate the **assigned entity/locale** on that working PR branch; check manifest sourceCommit, missing fields, reviewReady and requested output completeness. Remove all `.agent-ci-artifacts/` from the working PR **before merging**. There is no requirement for other translator PRs to have merged. Generated artifacts must never enter integration or `main`.

The existence of `generate-translation-review-artifacts.mjs` is **not** evidence it supports every new locale-bearing entity. Current generator families cover Skills, Lessons, Assessment Methods, UI Kit component dictionaries and Geography home copy (verify their actual hierarchy and CLI on the relevant revision). Courses and any additional entity type still require a separately verified generator before their review can begin. **If the required generator or localized Markdown is unavailable, the reviewer must stop, explicitly report in chat the missing generator/locale/entity and required fix, and block that review in the Issue.** Do **not** replace the required view with manual inspection of distributed typed source files under this production-review protocol. The optional direct-Contracts fallback described above for Methodologists consulting Assessment Method definitions **does not waive** this linguistic-review prerequisite.

## EducationStandard review reference

The scoped `education-standards` family requires an available, compiled `@svitlo/education-standards/build` package on the checked-out PR branch. `/agent-artifacts generate education-standards uk` writes only `.agent-ci-artifacts/education-standards/uk.md`; omitting `uk` selects all canonical Engine language codes. Each generated file includes every indexed standard's stable UUID, official name and language, countries, edition, primary URL, original Code link, English-only methodology, and one localized frontend description. The manifest adds `kind: education-standard`, `standards`, `locale`, `missing` and `reviewReady`, with `summary.educationStandardDocuments` and unchanged schema version 3.

The adapter statically reads canonical TypeScript authoring declarations to expose partial draft locales as `%%MISSING%%` **only in the disposable review Markdown**. Only when the entire authored language matrix is complete does the workflow build Engine and the catalog, compare the indexed source to the exported build-only catalog and invoke the strict Build API; incomplete drafts cannot be compiled and are intentionally previewed without runtime or publication. The review-ready flag is per requested locale and does not certify full-catalog typing. A source/index mismatch or invalid metadata fails the requested document. Neither 0 missing strings nor generated source references constitute legal or linguistic review. The independent reviewer must verify the manifest's current `sourceCommit`, source links and fixed entity scope before starting review.
