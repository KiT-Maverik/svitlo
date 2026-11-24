# Lesson YAML workflow retirement — PR #797

**Decision (2026-11-23):** The project owner explicitly authorized removing
the obsolete Lesson YAML materialization path **now**, without waiting for the
typed workflow to deploy to `develop`. This changes the original staged
cutover plan; there is no YAML command fallback in this branch.

## Deleted Lesson-only entrypoints

- `.github/workflows/lesson-materialization.yml`: removed YAML
  `resolve/analyze/publish` jobs, `/lesson materialize` and `/lesson finalize`
  dispatch options. Retained only `typed-resolve/typed-analyze/typed-publish`.
- `scripts/ci/lessonMaterialization/lesson-gate.mjs`,
  `lesson-materialization.mjs` and their YAML-only regression tests.
- `shared/engine/scripts/finalizeLesson/`: YAML preflight, handoff/finalize
  CLI, regression tests and README.
- `shared/engine/scripts/lessonBuilder/`: YAML-to-TypeScript Lesson drafts,
  recursive renderer, assessment draft adapters, tests and documentation.
- Obsolete Lesson YAML command entries from root and Engine npm scripts.

The original typed gate retained editorial state checks temporarily; #812
removes those checks from the current Lesson execution path. The shared
`courseMaterialization/course-gate.mjs` authorization primitives remain in use.

## Active typed contract

The canonical Stage 2 `draft.ts` is parsed without executing untrusted PR
code, checked semantically against trusted Engine declarations, then
atomically consumed while generating modular `index.ts` and its children.
The exact original bytes remain in the pinned Git commit/blob, not a second
editorial file. The authorized command, immutable source, stable UUIDs,
original assessment references, locale scope, no-clobber and production
blockers remain required. Editorial checklist and Course provenance are
not inputs to Lesson materialization.

The implementation remains a PR until merged. Existing default-branch YAML
workflows may remain live **on that branch** until the change merges, but they
are not preserved in this candidate branch. No historical Lesson YAML content
files are bulk-deleted, rewritten or silently converted.

## Remaining parent integration responsibility

Parent #775 owns cross-domain YAML schema/factory removal, shared architecture
documentation and any other Course/Questions/Flashcards YAML use. That cleanup
must be informed by actual consumers rather than removing shared utilities
used by independent workflows. Historic source/review provenance is retained
in Git and original PRs. A separate real deployed-workflow smoke test is still
required before declaring the typed command operationally verified, but **not**
before retiring this obsolete Lesson path.

### Verification (run on current HEAD)

```sh
node --test scripts/ci/lessonMaterialization/lesson-typed-materialization.spec.mjs
node --test scripts/ci/lessonMaterialization/lesson-typed-publish.spec.mjs
node --test scripts/ci/lessonMaterialization/lesson-typed-source.spec.mjs
npm run package:build --workspace @svitlo/engine
npm run code:check:types --workspace @svitlo/engine
```

Record actual results in PR #797. An unexecuted test is not a pass.
