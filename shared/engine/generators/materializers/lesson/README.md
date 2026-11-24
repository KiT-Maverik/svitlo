# Typed Lesson, Section and Quest source materializers

**Implemented:** concrete Lesson and Section/Quest source renderers under this directory, with the parent-owned trusted Lesson Stage 6.1 source transition. These are **Build-time source renderers**, not runtime Props serializers, YAML-to-TS builders or permission to publish an unfinished Lesson.

## Ownership and stage boundaries

- **Course Stage 5 → Lesson Stage 1:** a new Lesson receives only a persisted UUID-addressed `draft.ts satisfies LessonWorkflowStage1`, containing reviewed methodology, language plan and four independent assessment requirements. Course Stage 5 does not call the complete Lesson renderer, author Sections, mint Question/Flashcard IDs or open a Lesson PR.
- **Lesson Stages 1–2:** the same Lesson `draft.ts` evolves to `LessonWorkflowStage2` with typed plain `{config, production?}` nodes and `items/order` collections. Stage 3 independently reviews and Stages 4–5 audit/correct that exact source; `LessonWorkflowMaterializerInput` is an alias of Stage 2, not another schema.
- **Authorized Lesson Stage 6.1:** `materializeStage6.ts` composes the concrete Lesson, Section, Quest and nested Block renderers. It emits final `define*` modules, `languages.ts`, methodology and specification sidecars, and diagnostics. The same concrete Section renderer serves a Lesson and a Course-owned Episode, preserving the same relative `sections/<slug>/index.ts` layout. Only the owning parent chooses child placement/order. The materializer has no dependency on editorial reviews, PR prose, or Course provenance.
- **Source transaction:** `sourceCommit.mjs` and trusted [Lesson materialization](../../../../../scripts/ci/lessonMaterialization/README.md) retain exact pinned input bytes in the pinned Git parent commit and blob while atomically consuming `draft.ts` and creating `index.ts` and approved files in one non-force Git commit. Validate authorization, source blob/HEAD and path/symlink/no-clobber preflight before publication of a plan; never execute untrusted PR TypeScript in a privileged job.
- **Later work:** Stage 6.2 resolves typed resources, 6.3 implements/registers/tests every Scene, 7/8 independently author full banks, and 9/10 translate/review all required locales. Source creation never grants these completions or publication.

## Concrete source kinds

The Lesson family owns ten separate implementations and adjacent tests: `lesson`, `contentSection`, `practiceSection`, `codingTaskSection`, `learningFlowSection`, `flashcardsSection`, `quizSection`, `questSection`, `questStage`, `questTask`. Each kind handles its real `define*` Config boundary; nested ContentBlocks are delegated to the distinct concrete Block materializers. Quest is a **Build-only** authoring Section without Lesson/Episode runtime registration. Do not make it publishable by disguising it as another Section.

An authored required Quiz/Flashcards Section must be **enabled and present** before complete Lesson emission. Missing/disabled required Sections fail closed; an existing but unfinished enabled Section may emit a visibly blocked non-publishable draft. `params.quizRequiredForCompletion` independently requires a real enabled Quiz. The full bank, Quiz selection and Flashcards selection are separate editorial decisions. A Course handoff must never manufacture a fake complete Lesson, Section, Card or Question to satisfy these requirements.

## Typed source and imported assessment references

Use stable UUIDs, camelCase slugs and real ordered collections; preserve only real source-language copy while listing planned untranslated locales as blockers. Constrain generated file paths and delegate nested import ownership. Question/Flashcard selections can reference statically verified imported Configurator `.id` expressions. `preserveAssessmentReferences.ts` specifically retains those verified imported expressions in generated Quiz/Flashcards Sections rather than silently replacing them with magic string literals. Unsupported arbitrary expressions, mismatched rendered IDs and unverified imports fail closed. This is **not** a generic AST serializer; the unchanged Stage 2 object remains recoverable byte-for-byte from the pinned Git commit.

Source output with `TODO (BLOCKER)`, `TODO(asset)`, reserved IDs, missing Scenes or incomplete translations must remain blocked until independent acceptance. See [Lesson source layout](../../../../../studio/docs/architecture/lesson-generated-source-layout.md), [Lesson Flow](../../../../../studio/skills/lesson-workflow/create-lesson-flow.skill.md) and [typed architecture](../../../../../studio/docs/architecture/typed-production-materialization.md).

## Reproducible validation

From a clean dependency-installed checkout of the target HEAD:

```sh
node --test scripts/ci/lessonMaterialization/lesson-typed-materialization.spec.mjs
node --test scripts/ci/lessonMaterialization/lesson-typed-publish.spec.mjs
node --test scripts/ci/lessonMaterialization/lesson-typed-source.spec.mjs
npm run package:build --workspace @svitlo/engine
npm run code:check:types --workspace @svitlo/engine
npm test --workspace @svitlo/engine
```

Only an actual completed run against the current SHA establishes a passing check. A successful isolated renderer test does not prove the trusted default-branch GitHub command is deployed; the synthetic PR authorization/source-integrity smoke test is still a separate integration responsibility.
