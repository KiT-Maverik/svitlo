# Canonical Question/Quiz review references

The read-only adapter `generate-question-review-artifacts.mjs` statically
resolves Question and Quiz TypeScript (without evaluating authored code).

The only supported bank directory layout is:

```text
questions/
  index.ts                   # imports every type and exports the complete questions map
  <questionType>/
    index.ts                 # re-exports every Question of this type
    <questionSlug>.ts        # actual define* Question Configurator
    <questionSlug>/          # optional nested ContentBlock modules (not a Question entrypoint)
```

The type names are the canonical Engine questionTypes slugs. The adapter
validates both indexes against the physical files. It discovers all Question
types and renders type-specific grading data, matching pairs, and source/target
locale content including Quiz screens. Unsupported data fails rather than
getting skipped. Old flat and `questions/<type>/<slug>/index.ts` Question
entrypoints are intentionally unsupported.

Run through the scoped dispatcher:

```sh
node scripts/generateTranslationReviewArtifacts/generate-translation-review-artifacts.mjs --kind questions --package content/astronomy --lesson <lesson-uuid> --locale qm
```

The output is a temporary `.agent-ci-artifacts/questions/<book>/<bucket>/<uuid>/<locale>.md`
reference accompanied by a manifest. Its `sourceCommit` is the reviewed
source HEAD. Missing target text receives `%%MISSING%%` and
`reviewReady: false`. Generator success does not grant linguistic approval.
Use `/agent-artifacts cleanup` to remove these temporary files before merge.

A bank that still uses an older authoring layout must first be migrated through
the owning Questions workflow. Do not add compatibility parsing to this review
adapter.
