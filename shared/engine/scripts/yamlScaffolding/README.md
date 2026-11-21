# Shared recursive YAML → TypeScript materializer

The reusable Draft Config materializer lives in [`recursiveMaterializer.mjs`](./recursiveMaterializer.mjs).
It does **not** define a new authoring format, approve educational content, publish
Engine Props, or replace the existing Course/Lesson/Questions/Flashcards wrapper
scripts. Wrapper migration is owned separately by integration PR #769 (D/E).

## Input and return contract

```js
import { materialize, writeMaterialized } from './recursiveMaterializer.mjs';

const output = materialize(
  { config: reviewedRootConfig, production: { documentLanguage: 'uk' } },
  {
    // Required if the root production metadata has no documentLanguage.
    documentLanguage: 'uk',
    // Optional: wrapper-supplied validated mapping for known standalone Lessons.
    resolveLessonReference: reference => null,
    // Optional: mark assessment Sections as still pending review.
    isPending: (config, production) => production?.pending === true,
  },
);
// output: {
//   rootExport: string, rootType: string,
//   files: Array<{path: string, content: string, kind: string}>,
//   diagnostics: Array<{path: string, code: string, message: string, severity: 'warning'}>,
// }
// All files use paths relative to the wrapper-provided entity root.
// The manifest is stable, and its root index.ts is always last.
writeMaterialized(output.files, destinationDirectory, 'generate');
writeMaterialized(output.files, destinationDirectory, 'check');
```

The source is the exact recursively enveloped `{config, production?}` authoring
tree. `config.type` identifies one Engine factory from
`yamlFactoryByType`; `production` is separate, authoring-only information.
Standalone Lessons use `type: lesson`; Course placements use the distinct
`type: lessonReference`, with `lessonId` and an optional placement `slug`.
References are **never** converted into independently fabricated Lessons.
The wrapper can supply a verified import mapping. Otherwise the generated module
uses Agent B's `definePendingLesson({id,slug})` with an explicit blocking TODO.
Incomplete Quiz/Flashcards Sections use the corresponding pending factories;
they must never be published as completed assessments.

Only the actual Engine YAML child paths in the code's `boundaries` map are
traversed. An arbitrary ordinary value with a `type` property is not a
nested Configurator. Supported nesting covers Course/Module/Chapter/Episode,
Lesson/Section, Quest Stage/Task, Carousel slides, Checkpoint Item/Answer,
Question ContentBlocks and Flashcard sides. Every nested Configurator has a
separate `index.ts`; non-Configurator records remain plain data. Parent
modules import children and preserve each ordered `{ items, order }` collection.

## Safety, source identity and blockers

- No UUIDs, translations, Lesson imports, media assets, Quest responses or
  reviews are invented. UUID/slug, child type and ordering violations are
  path-qualified errors, not warnings.
- Planned languages are retained as a `TODO (BLOCKER)`; generated active
  `languages.ts` uses the reviewed source language only.
- Authored Markdown and Code are emitted as sibling files (`markdown.md`,
  `<locale>.md`, `code.<extension>`) and consumed through Engine's
  `readMarkdown`/`readCodeSource` helpers. No multiline TS string literals.
- Media fields with missing physical sources receive reserved Nil UUID filename
  placeholders and visible `TODO (BLOCKER)` markers; these are not assets.
  Standalone Scene React scaffolding/registration belongs to Agent F's
  `sceneScaffolding`; this module emits only the Engine Scene Configurator.
- `writeMaterialized` preflights every destination and refuses symlinks,
  stale/edited files and partial conflicting output without writing.
  An existing root `index.ts` or root `*.data.ts` makes generate a no-op.
  `check` never writes and reports missing/stale files. It does not change any
  existing authored `specification.md` or other source.

These draft artifacts are **not publication approval**. Production lint
(Agent G) must reject pending-helper imports and Scene stubs. The universal
renderer uses no compat adapter for the retired Course Flow DSL.

## Dependencies and validation

This agent owns only `yamlScaffolding/**`. The Engine-derived schema API and
`lessonReference` shape arrive from Agent A (#770), Build Pending factories
from Agent B (#771), and working Scene stubs from Agent F (#773). The caller
owns validation of the reviewed source against those Zod schemas. The generic
materializer's test matrix uses fixture-only declarations for TypeScript
compilation while these other agent branches remain independent; a real
`@svitlo/engine/build` typecheck and end-to-end Draft Preview must be run
**after integration** into #769. No wrapper migration or production check is
claimed by this module.

Run targeted tests in a repository checkout with dependencies installed:

```sh
node --test shared/engine/scripts/yamlScaffolding/recursiveMaterializer.spec.mjs
node --test shared/engine/scripts/yamlScaffolding/yamlScaffolding.spec.mjs
npm test --workspace @svitlo/engine
```
