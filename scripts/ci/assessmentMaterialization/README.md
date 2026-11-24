# Trusted direct Assessment materialization

An Assessment is a separately authored **Course-owned** activity directly placed under a Course, Module or Chapter. Course Stage 2 reserves its ordered `type: 'assessment'` slot; there is **no** owner-level Assessment-required boolean. Stage 5 allocates a stable UUID and writes a previewable, nonpublishable draft-only `defineAssessmentStub({ id, slug })` Configurator with a nonpublishable `Not implemented` preview plus a typed `AssessmentWorkflowSeed` at the same nested `content/<slug>/draft.ts` placement. Course Stage 5 does not create an approved Quiz or start Assessment Production.

## Independent editorial source and authorization

The Assessment's existing `draft.ts` progresses from Course seed to `AssessmentWorkflowStage1` to `AssessmentWorkflowStage2`; Stage 3 requires a separate-context independent review, and Stage 4 materialization needs explicit authorization. The reviewed final source must invoke `materializeAssessment(reviewedAssessment)` exactly once using `@svitlo/engine/build`. Reuse reviewed upstream Lesson Question Bank IDs; Assessment never duplicates or authors its own bank. Read [Create Assessment Flow](../../../studio/skills/assessment-workflow/create-assessment-flow.skill.md) and the [Assessment entity](../../../studio/docs/entities/assessment.md) before authoring or review.

The workflow `.github/workflows/assessment-materialization.yml` runs only after it is deployed on default `develop`. Its exact top-level PR comment command is `/assessment materialize`; a manual dispatch requires both the Assessment PR number and owning Course PR number. Neither is a routine test trigger. The gate needs one same-repository **Draft Assessment PR** targeting the exact Course branch with **only its existing pinned `draft.ts` changed**, matching the immutable reviewed Course seed, exact ordered parent stub and allowed actor. Review evidence remains an editorial responsibility, never parsed from PR prose by the trusted gate.

## Execution and transaction boundaries

The read-only analyzer compiles the ordinary trusted Engine package and runs the pinned final TypeScript invocation in the shared credential-free isolated worker. Engine validates `assessmentWorkflowStage2_Schema` (exactly one non-disabled `config.quiz`, optional Content Section `before`/`after`, and explicit real Question UUID selections), materializes nested Section/ContentBlock `index.ts` files and `languages.ts`, and returns a bounded `publishable: false` file plan. The trusted transaction independently verifies the Course handoff and unchanged immediate parent and its complete order, resolved upstream/additional Lesson paths and materialized Question Banks, each selected UUID against an exported canonical Question definition rather than incidental source text, output path allowlist and hashes. It writes exactly the approved nested Assessment files and the byte-exact parent placeholder replacement while deleting the consumed draft in **one non-force Git commit**. It never executes candidate TypeScript with write credentials or rewrites independently owned Lesson banks.

A generated Assessment source remains blocked from publication until physical media, completed target locales, verified global Question resolution, child review and human QA are genuinely complete. The separate Course Stage 10 human QA verifies the integrated experience. No job success authorizes a merge or any independent downstream stage.

## Validation

On a prepared repository checkout:

```sh
npm run package:build --workspace @svitlo/engine
npm run code:check:types --workspace @svitlo/engine
node --test scripts/ci/assessmentMaterialization/*.spec.mjs
node --test shared/engine/generators/materializers/course/materializeStage5.spec.mjs
```

The Assessment Ready PR workflow also executes `node --test scripts/ci/assessmentMaterialization/*.spec.mjs` against the built Engine. Draft FastGate skips deep typechecking; green Draft checks are not test evidence. Confirm actual Ready checks on the latest SHA, and after deployment require a separately authorized real Assessment PR, a successful pinned run and the resulting atomic source commit before claiming operational materialization.
