# Checkpoint Answer Configurator and Lesson source layout

**Status:** approved scope for a follow-up implementation PR, not implemented by this planning commit. Source design fixture: [PR #557](https://github.com/KiT-Maverik/svitlo/pull/557); generator baseline: merged [PR #559](https://github.com/KiT-Maverik/svitlo/pull/559).

## Verified current behavior

- `shared/engine/configurators/contentBlocks/defineCheckpoint/defineCheckpointItem/defineCheckpointItem.ts` owns **question validation**, Answer collection validation, ordered published Answer Props, locale merging, addition/disabling/reordering and child overrides. `answer` is currently a plain `{ items, order }` object, **not** a Configurator.
- The `question` field must be a single `defineText` Configurator and cannot be disabled. `answer` permits supported ContentBlocks, rejects nested Checkpoint and requires at least one enabled child.
- `shared/engine/scripts/lessonBuilder/lessonModules.mjs` uses the role folder `question/` **plus an unnecessary child slug folder** and the role folder `answer/` plus child slug folders. Its tests assert `question/<textSlug>/index.ts` and `answer/<answerSlug>/index.ts`; no dedicated `answer/index.ts` module is emitted.
- The manually edited PR #557 instead demonstrates `question/index.ts`, `answer/index.ts` and `answer/<contentBlockSlug>/index.ts`. Parts of this Draft are deliberately syntactically incomplete; it is design evidence, not a compilable test oracle.

## Approved target

```text
sections/<sectionSlug>/<checkpointSlug>/
  index.ts                                  # defineCheckpoint
  <checkpointItemSlug>/
    index.ts                                # defineCheckpointItem
    question/
      index.ts                              # exactly one defineText, no <textSlug>/ level
    answer/
      index.ts                              # dedicated defineCheckpointAnswer
      <contentBlockSlug>/
        index.ts                            # individual ContentBlock
        specification.md / code.ts / text.md / locale/... / assets ...
        <nestedSlug>/...                    # recursive owner-local resources
```

The `question` role is a flat folder because the child is **always a single Text**. The `answer` role is an independently addressable composite because it has its **own properties, validation, ordering and Build logic**, and its ContentBlocks can contain further resources. Never group child blocks under `<contentType>/`. Keep stable YAML IDs and authored slugs unchanged; no semantic name guessing.

## Implementation scope in a later chat

1. Introduce **`defineCheckpointAnswer`** as a distinct Engine Build-only Configurator with an explicitly typed Config/Props/overrides API, public Build exports and schema / factory registration. Proposed authored shape: dedicated identity (ID, slug, type) plus an ordered slug-keyed child collection; finalize exact field naming against the current Engine conventions before implementing. Do not fabricate missing Answer IDs during YAML migration.
2. Move Answer-owned responsibility from `defineCheckpointItem` into `defineCheckpointAnswer`: allowed child types, non-empty ordered collection, identity checks, `validate()`, `build.props({ languages })`, `build.overrides(patch, { languages })`, additions/disabling/reordering and locale propagation. `defineCheckpointItem` should own item identity, mandatory Text question and composition/delegation. Preserve existing learner-visible published Answer ordering/semantics unless an explicitly validated contract migration is necessary.
3. Update YAML Config projection and registry for the new nested Answer Configurator. Audit all affected authoring samples, build consumers and UI Kit Checkpoint renderer. Do not silently accept the old bare collection as a second public API or invent IDs.
4. Update the Lesson YAML-to-TypeScript Draft scaffolder to emit a **flat** `question/index.ts`, a `defineCheckpointAnswer` in `answer/index.ts`, and `answer/<slug>/index.ts` for every nested ContentBlock. Use correct relative imports, value/type generics, typed `{items,order}`, property shorthand and recursion. Existing Text's authored slug remains in its Config even though the module path is role-based.
5. Update media and Scene source-relative resolution so deeply nested Answer blocks' `import.meta.url` resolves inside each child directory; preserve create-only / SKIP behavior and existing external URL rules. Update Studio source layout and Engine README/JSDoc.
6. Migrate only explicitly owned fixtures/consumers; do not rewrite the manually edited #557 Draft or mask its intentional TODO diagnostics. If a contract migration needs permanent IDs, obtain them from authored source / deliberate editorial operation, not from runtime.

## Acceptance tests and review gates

- Engine unit and type tests prove new Answer configurator validation, child ordering, locales, disabling/addition/reordering, non-Checkpoint-only nested answers, no empty active answers and preservation of the mandatory Text question.
- Generator fixture asserts **exact** emitted paths including `question/index.ts` and `answer/index.ts`; children with nested media/Scene/source files and repeated slugs in different owner roles never collide; no `question/<slug>/index.ts` or block-type folders.
- Generated TypeScript parses with unresolved draft dependencies; imports resolve when authored dependencies are complete. **Do not require intentionally incomplete drafts to typecheck** or replace unresolved content with fake placeholders.
- Explicit coverage of unchanged UUIDs, `SKIP` no-overwrite, deterministic repeated `check`, safe paths and complete downstream Props only when production inputs are available.
- Verify affected Engine / UI Kit tests and relevant textbook builds; independent review before Ready/merge.

## Non-goals and dependencies

This PR starts as **planning-only Draft** and expects implementation in another chat. It must not merge while carrying only this plan as though the feature were shipped. Carousel Image/Scene polymorphism is separate. Stage 7 end-to-end acceptance integrates this change after implementation, not before. Review metadata belongs to PR #570 and is not modified here.
