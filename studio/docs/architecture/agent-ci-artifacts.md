# Agent CI Artifacts — PR-Scoped Reference Workspace

**Status:** On-demand CI utility for AI agents. No production runtime dependency.

## Boundary

`.agent-ci-artifacts/` is a **temporary Git-tracked reference workspace**, not source content, not an application asset, and not an archival documentation directory. It is intended to live **only on an open feature/agent PR branch**. Do not add it to `.gitignore`. The generated files remain visible to an AI agent using a GitHub connector because they are committed to the PR branch. They must never reach `main` or an integration branch such as `new-lesson`.

Current folder contract:

```text
.agent-ci-artifacts/
  manifest.json
  assessment-methods/
    <language-key>.md
  taxonomies/
    <textbook-name>/
      <language-key>.md
  lessons/
    <textbook-name>/
      <last-uuid-hex-digit>/
        <lesson-uuid>/
          <language-key>.md
```

The `manifest.json` records the canonical **last non-artifact source commit**, language roster, supported book paths, successfully generated documents and failures. `generated` entries include `kind: taxonomy`, `kind: lesson`, `kind: lessons-by-skill` or `kind: assessment-method`; `summary` counts the successful documents and discovered lessons. Repeated generation without source changes produces the same manifest (no changing timestamp). Taxonomy Markdown references actual Code Skills entities, localizes headings and frontend descriptions, and retains canonical English methodological descriptions. Lesson Markdown is one localized, read-only document per Lesson UUID and language: ordered Sections and ContentBlocks (including Quiz Section parameters), the complete Question Bank and Flashcard Bank, media descriptions/alt/captions/fallbacks, and source links pinned to the checked-out commit. Binary media and interactive Scene behavior are not embedded; Quiz selections reference the Question Bank without duplicating its content. Generated files are **not** writeback sources.

## Assessment Methods reference

During the existing Agent CI Artifacts generation run, `scripts/generate-translation-review-artifacts.mjs` also invokes `scripts/generate-assessment-methods-reference.mjs` for **every language in `DEFAULT_SUPPORTED_LANGUAGES`**. This creates one temporary `.agent-ci-artifacts/assessment-methods/<language>.md` for each supported language and records each in the same `manifest.json` (`kind: assessment-method`, with `summary.assessmentMethodDocuments`). Missing IDs, English descriptions or UI Kit translations produce explicit manifest failures and fail the generation job. The standard path validation, publish/cleanup and merge guard remain unchanged; **do not create a separate workflow or publish these files as runtime data**.

Each reference lists the 16 canonical `AssessmentMethodKey` values and UUIDs from Contracts, **short frontend labels in the selected language from UI Kit**, and **detailed pedagogical descriptions from the English Engine methodology, kept in English in every document**. The generated links resolve back to their respective canonical files. Assessment Methods describe the cognitive operation and evidence an assessment requires; Question types describe the learner's response mechanism or widget. This distinction is essential when planning Quiz Sections: multiple methods may be pedagogically justified across one Lesson's distinct Skills and learning outcomes, and a single Question type can assess different methods. The Methodologist plans evidence requirements and the need for quizzes; the Learning Assessment Architect designs valid Questions and scoring. Machine-readable configurations must use the canonical key, never the localized label.

To inspect a specific language without writing files:

```sh
node scripts/generate-assessment-methods-reference.mjs --locale uk --stdout
```

To generate one selected language into the temporary workspace:

```sh
node scripts/generate-assessment-methods-reference.mjs --locale uk --output .agent-ci-artifacts/assessment-methods
```

If this PR-scoped document is not available, agents must inspect Contracts, the English Engine methodology and UI Kit locale sources directly. Never infer that missing reference files mean the method does not exist, and never invent new keys or labels.

## Lifecycle

1. **Request (opt-in):** A review-only PR may need a temporary `.agent-ci-artifacts/review-request.md` seed commit to establish a diff against its base branch; create it on a new **draft PR** so it is never mistaken for a production edit. Repository owner posts `/agent-artifacts generate` on the relevant PR, or starts **Agent CI Artifacts** manually by selecting the PR number and `generate`. Do **not** generate on every push, PR creation, or build.
2. **Resolve source:** CI validates that the PR is open, in the same repository, and its head branch is not the default branch. All work is pinned to the PR's exact head SHA so concurrent source updates cannot be overwritten.
3. **Generate (read-only):** A low-privilege worker checks out the source SHA and runs `node scripts/generate-translation-review-artifacts.mjs`. This wrapper discovers **all** textbooks with `content/*/data/skills`, canonical Lessons under `content/*/data/lessons/<uuid-last-hex-digit>/<uuid>/*.data.ts`, and **all** registered language keys from `shared/contracts/src/types/languages.ts`. It invokes the established `generate-skills-taxonomy.mjs --stdout` for Skills and the separate Lesson generator using `node scripts/generate-lessons-markdown.mjs --package content/<book> --lesson <uuid> --locale <code> --stdout`. The wrapper has no per-locale/per-book modes and writes only under `.agent-ci-artifacts/`. Missing or failed Lesson generation is recorded in the manifest; successful outputs from other languages remain available.
4. **Publish:** A separate, write-authorized job downloads the produced one-day transport artifact, removes any previous tracked agent reference library, and commits only `.agent-ci-artifacts/` to the same PR head branch. A stale commit push fails rather than overwriting newer work. The agent reads selected documents directly from that branch.
5. **Review or follow-up:** The agent processes only documents needed by its actual task. The corpus exists for reference; canonical edits, if authorized, happen in Code using the relevant editing skill. A new generation can refresh the reference library after code changes.
6. **Cleanup:** After the agent finishes, owner posts `/agent-artifacts cleanup` on that PR, or manually chooses `cleanup` in Actions. For a draft PR targeting `main` or `new-lesson`, transition to **Ready for review** also triggers cleanup once the corresponding workflow exists on the PR base branch. Cleanup removes all tracked `.agent-ci-artifacts/` content in a new PR commit.
7. **Merge safety:** A dedicated, path-unfiltered **Agent CI Artifacts / clean** check runs on every PR into `main` or `new-lesson` (once the updated workflow is active on that base branch) and fails while this folder exists; FastGate also rejects it when FastGate runs. **Make the dedicated check required in the `main` and protected integration-branch rulesets**. The presence of artifacts intentionally blocks merging until cleanup.

## Security and resource controls

The generation worker has read-only repository permissions. Only the trusted publish/cleanup jobs have `contents: write`, do not execute source-branch scripts and write only to the resolved same-repo PR branch. Owner-only commands are recognized; unrecognized comments and comments on issues are ignored. This limits risks from untrusted PR contents.

The generation worker installs the repository's locked dependencies and builds Contracts and Engine before loading current typed Lesson creators. No deployable application or full textbook build is required. GitHub Actions isolated runners and the transport archive are disposable (archive retention: **one day**). Git-tracked PR artifacts **do not expire automatically**: cleanup is a deliberate Git commit. Do not equate runner cleanup with PR content cleanup. A merge check is an additional defense and is enforceable only if configured as a required check.

Large all-language taxonomies can create substantial, noisy PR commits. Trigger them sparingly and only when the agent actually needs an external CI workspace; do not use artifacts as permanent documentation. Skills and Lessons share the same temporary workspace and cleanup lifecycle; future material types require a separately reviewed generator/publisher change. No ephemeral workflow YAML creation/deletion.

## Lesson generator contract and integration-PR notes

The Lesson CI adapter is `scripts/generate-lesson-review-artifacts.mjs`; its tests are in `scripts/generate-lesson-review-artifacts.spec.mjs`. It discovers numbered Lesson buckets and real `<slug>.data.ts` files, calls the standalone Lesson → Markdown CLI for each registered language and records failures individually. That CLI is present and loads actual typed authoring data. A missing generator, unsupported Lesson, absent locale or failed conversion is recorded per document in `manifest.failures`; successful Skills and other Lesson references remain available. A failed or incomplete requested document blocks its independent linguistic review.

Use `/agent-artifacts generate` on a same-repository agent PR targeting `new-lesson` to commit reference Markdown to that **agent PR branch only**. After reviewing, use `/agent-artifacts cleanup` before making the PR ready for merge. The integration PR `#162` itself must not collect or merge temporary artifacts. The same guard applies when `#162` is later merged into `main`.

**Workflow activation detail:** `issue_comment` and `workflow_dispatch` resolve the workflow file from the default branch, currently `main`. Changes to the workflow committed only on `new-lesson` do not alter default-branch comment handling yet; the currently installed default-branch workflow can still check out the specified PR's head SHA and use its scripts, but new workflow validation and integration-branch auto-cleanup are only guaranteed after the relevant workflow changes reach the branch GitHub uses for that event. Verify Actions execution rather than assuming a command fired.

**CI isolation:** Generation runs with read-only permissions, publishes through a separate write-authorized job, and the publishing job verifies that every Markdown file matches an entry in `manifest.json`. No source-branch script is executed by the publishing job. Source branches that advance during generation are not force-pushed.

## Translation Production: required entity-specific review generator

When work is tracked through a [Translation Production Issue](../skills/translation-workflow/manage-translation-production.skill.md), **all translation subtask PRs must first merge into the integration branch**. Independent reviewer subtask branches then start from that verified integrated translation SHA. Each reviewer generates the Markdown reference library on **their own Draft PR branch** and validates `manifest.json` source provenance and complete assigned entity/locale output. These generated files must never land in the integration branch or `main`; cleanup is mandatory before merging reviewer fixes.

The existence of `generate-translation-review-artifacts.mjs` is **not** evidence it supports every new locale-bearing entity. Current generator families cover Skills, Lessons and Assessment Methods (verify their actual supported hierarchy and CLI on the relevant revision). A Course, UI Kit or other entity needs a supported generator before its review can begin. **If the required generator or localized Markdown is unavailable, the reviewer must stop, explicitly report in chat the missing generator/locale/entity and required fix, and block that review in the Issue.** Do **not** replace the required view with manual inspection of distributed typed source files under this production-review protocol. The optional direct-Contracts fallback described above for Methodologists consulting Assessment Method definitions **does not waive** this linguistic-review prerequisite.
