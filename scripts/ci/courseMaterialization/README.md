# Trusted direct Course Stage 5

Stage 1–3 progressively author **one Course object** at `content/<book>/data/courses/<bucket>/<uuid>/draft.ts`. During Stage 4, after independent substantive review and correction, keep its `satisfies CourseWorkflowMaterializerInput` contract and make it the argument of **one** `materializeCourse(input)` invocation imported from `@svitlo/engine/build`. Pin that exact reviewed source blob and HEAD before authorizing Stage 5.

```ts
import { materializeCourse } from '@svitlo/engine/build';
materializeCourse(reviewedCourse satisfies CourseWorkflowMaterializerInput);
```

Reused existing Lessons are real imported Lesson Configurators supplied as `production.source` and their real `production.sourceExportName`. If `production.existing` is a built sparse `build.overrides()` result, supply the corresponding **original plain, JSON-safe** `production.sourcePatch`. The materializer must verify that the real Lesson Build API reproduces the reviewed built result. Never reconstruct the raw patch from Props, override an independently owned Lesson, fabricate import aliases or import an unmaterialized Lesson. Candidate and trusted default-branch Lesson trees and source revisions must match.

The exact top-level `/course materialize` comment or default-branch `workflow_dispatch(pr_number)` is authorized only for the current same-repo Draft Course PR, write-capable actor, unique changed root draft and accepted exact-HEAD Stage 4 review evidence. `resolve` pins HEAD/blob/reviews. `analyze` compiles the **ordinary** trusted Engine package and executes only the reviewed direct call in the credential-free, read-only, network-disabled shared worker. It validates Course Zod/Configurator contracts, output inventory, immutable reused Lesson dependencies and bounded output paths/hashes. No untrusted code runs in the publisher; no AST decoder, special trusted-Lesson esbuild bundle, second semantic validator or privileged replay exists in the active execution path.

The analyzer seals a complete `publishable:false` manifest. `publish` reauthorizes the actor, exact Stage 4 evidence, HEAD, source and immutable dependencies, verifies every output byte, prohibits existing targets/symlinks/path escapes, and atomically deletes `draft.ts` and creates `index.ts`/Course-owned files using one non-force Git Data API commit. The original bytes remain in Git history. A separate metadata-only task confirms the committed tree and reconciles Course Lesson/Episode inventory tables.

Stage 5 may allocate new Lesson seeds and Episode handoffs but **does not** author them, start PRs, implement banks/Scenes, translate, publish Props or grant QA acceptance. Explicit `TODO (BLOCKER)` markers and pending inventories remain.

**Validation:** `npm run package:build --workspace @svitlo/engine`, `npm run code:check:types --workspace @svitlo/engine`, `node --test scripts/ci/courseMaterialization/typed-course-direct.spec.mjs`, and the existing concrete Course materializer/metadata tests. A test pass does not prove actual deployment; verify a real authorized default-branch workflow run, reviewed input SHA, output commit and updated inventory.
