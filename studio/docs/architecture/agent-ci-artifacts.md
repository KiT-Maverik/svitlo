# Agent CI Artifacts — PR-Scoped Reference Workspace

**Status:** On-demand CI utility for AI agents. No production runtime dependency.

## Boundary

`.agent-ci-artifacts/` is a **temporary Git-tracked reference workspace**, not source content, not an application asset, and not an archival documentation directory. It is intended to live **only on an open feature/agent PR branch**. Do not add it to `.gitignore`. The generated files remain visible to an AI agent using a GitHub connector because they are committed to the PR branch. They must never reach `main` or an integration branch such as `new-lesson`.

Current folder contract:

```text
.agent-ci-artifacts/
  manifest.json
  taxonomies/
    <textbook-name>/
      <language-key>.md
  lessons/
    <textbook-name>/
      <group>/
        <lesson-slug>/
          <language-key>.md
```

The `manifest.json` records the canonical **last non-artifact source commit**, language roster, supported book paths, successfully generated documents and failures. `generated` entries include `kind: taxonomy` or `kind: lesson`; `summary` counts the successful documents and discovered lessons. Repeated generation without source changes produces the same manifest (no changing timestamp). Taxonomy Markdown references actual Code Skills entities, localizes headings and frontend descriptions, and retains canonical English methodological descriptions. Lesson Markdown represents canonical authored lessons and their localized educational content, including source links. Generated files are **not** writeback sources.

## Lifecycle

1. **Request (opt-in):** A review-only PR may need a temporary `.agent-ci-artifacts/review-request.md` seed commit to establish a diff against its base branch; create it on a new **draft PR** so it is never mistaken for a production edit. Repository owner posts `/agent-artifacts generate` on the relevant PR, or starts **Agent CI Artifacts** manually by selecting the PR number and `generate`. Do **not** generate on every push, PR creation, or build.
2. **Resolve source:** CI validates that the PR is open, in the same repository, and its head branch is not the default branch. All work is pinned to the PR's exact head SHA so concurrent source updates cannot be overwritten.
3. **Generate (read-only):** A low-privilege worker checks out the source SHA and runs `node scripts/generate-translation-review-artifacts.mjs`. This wrapper discovers **all** textbooks with `learningApps/*/data/skills`, canonical Lessons under `learningApps/*/data/lessons/<group>/<slug>/<slug>.data.ts`, and **all** registered language keys from `shared/contracts/src/types/languages.ts`. It invokes the established `generate-skills-taxonomy.mjs --stdout` for Skills and the separate Lesson generator using `node scripts/generate-lessons-markdown.mjs --package learningApps/<book> --lesson <group>/<slug> --locale <code> --stdout`. The wrapper has no per-locale/per-book modes and writes only under `.agent-ci-artifacts/`. Missing or failed Lesson generation is recorded in the manifest; successful outputs from other languages remain available.
4. **Publish:** A separate, write-authorized job downloads the produced one-day transport artifact, removes any previous tracked agent reference library, and commits only `.agent-ci-artifacts/` to the same PR head branch. A stale commit push fails rather than overwriting newer work. The agent reads selected documents directly from that branch.
5. **Review or follow-up:** The agent processes only documents needed by its actual task. The corpus exists for reference; canonical edits, if authorized, happen in Code using the relevant editing skill. A new generation can refresh the reference library after code changes.
6. **Cleanup:** After the agent finishes, owner posts `/agent-artifacts cleanup` on that PR, or manually chooses `cleanup` in Actions. For a draft PR targeting `main` or `new-lesson`, transition to **Ready for review** also triggers cleanup once the corresponding workflow exists on the PR base branch. Cleanup removes all tracked `.agent-ci-artifacts/` content in a new PR commit.
7. **Merge safety:** A dedicated, path-unfiltered **Agent CI Artifacts / clean** check runs on every PR into `main` or `new-lesson` (once the updated workflow is active on that base branch) and fails while this folder exists; FastGate also rejects it when FastGate runs. **Make the dedicated check required in the `main` and protected integration-branch rulesets**. The presence of artifacts intentionally blocks merging until cleanup.

## Security and resource controls

The generation worker has read-only repository permissions. Only the trusted publish/cleanup jobs have `contents: write`, do not execute source-branch scripts and write only to the resolved same-repo PR branch. Owner-only commands are recognized; unrecognized comments and comments on issues are ignored. This limits risks from untrusted PR contents.

The generator installs only the parser needed to read TypeScript; no full textbook build is necessary. GitHub Actions isolated runners and the transport archive are disposable (archive retention: **one day**). Git-tracked PR artifacts **do not expire automatically**: cleanup is a deliberate Git commit. Do not equate runner cleanup with PR content cleanup. A merge check is an additional defense and is enforceable only if configured as a required check.

Large all-language taxonomies can create substantial, noisy PR commits. Trigger them sparingly and only when the agent actually needs an external CI workspace; do not use artifacts as permanent documentation. Skills and Lessons share the same temporary workspace and cleanup lifecycle; future material types require a separately reviewed generator/publisher change. No ephemeral workflow YAML creation/deletion.

## Lesson generator contract and integration-PR notes

The Lesson CI adapter is `scripts/generate-lesson-review-artifacts.mjs`; its tests are in `scripts/generate-lesson-review-artifacts.spec.mjs`. It discovers numbered Lesson buckets and real `<slug>.data.ts` files, calls the standalone Lesson → Markdown CLI for each registered language and records failures individually. That CLI is a separate dependency: **until the Lesson → Markdown generator is integrated, the manifest records a missing-generator failure and the CI cannot produce Lesson Markdown**. Skills artifacts continue to be generated.

Use `/agent-artifacts generate` on a same-repository agent PR targeting `new-lesson` to commit reference Markdown to that **agent PR branch only**. After reviewing, use `/agent-artifacts cleanup` before making the PR ready for merge. The integration PR `#162` itself must not collect or merge temporary artifacts. The same guard applies when `#162` is later merged into `main`.

**Workflow activation detail:** `issue_comment` and `workflow_dispatch` resolve the workflow file from the default branch, currently `main`. Changes to the workflow committed only on `new-lesson` do not alter default-branch comment handling yet; the currently installed default-branch workflow can still check out the specified PR's head SHA and use its scripts, but new workflow validation and integration-branch auto-cleanup are only guaranteed after the relevant workflow changes reach the branch GitHub uses for that event. Verify Actions execution rather than assuming a command fired.

**CI isolation:** Generation runs with read-only permissions, publishes through a separate write-authorized job, and the publishing job verifies that every Markdown file matches an entry in `manifest.json`. No source-branch script is executed by the publishing job. Source branches that advance during generation are not force-pushed.
