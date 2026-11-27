# Engine Config → Data → Props migration

> **Integration working contract.** This document coordinates the migration; it is not evidence that the proposed APIs are already implemented. Reconcile it with the Engine's actual schemas, adjacent `AGENTS.md`, and architecture docs before treating it as an implemented contract.

## Baseline and objective

- Baseline: `develop` after mechanical publication Props → Data rename, merged in PR #899 (commit `74758a8651eb16c056e382c5e0b3e632e6c778db`).
- Distinguish **Config** (authoring-time declarations and nested configurators), **Data** (validated, JSON-compatible, addressable domain model and sparse locale/override publication), and **Props** (UI-specific presentation models).
- Do **not** undo PR #899, reintroduce `build.props()`, or rename actual React/renderer Props.
- Keep immutable identity (`id`, `type`, `slug`), literal child-slug inference, explicit language scope, atomic array replacement, override isolation and build-only/runtime-only package boundaries.

## Target for ordered, slug-addressable containers

An ordered container such as a Course, Module, Chapter, Lesson or Section has stable metadata, an ordered list of child placement keys, and direct child keys; no redundant `content.items` or `section.items` namespace for that same collection:

```ts
const course = {
  id: 'course-uuid',
  type: 'course',
  slug: 'lightAndShapes',
  params: { /* course parameters */ },
  locale: { /* localized fields */ },
  children: ['openingMission', 'lightBasics', 'shapes'],
  openingMission: { id: 'episode-uuid', type: 'episode', /* ... */ },
  lightBasics: { id: 'lesson-uuid', type: 'lesson', overrides: {} },
  shapes: {
    id: 'module-uuid', type: 'module', slug: 'shapes',
    params: {}, locale: {},
    children: ['circleRecognition'],
    circleRecognition: { id: 'lesson-uuid-2', type: 'lesson' },
  },
};
```

This snippet illustrates **shape only**; it is not a valid fixture and must not be copied as one.

**Invariants to prove, in both TypeScript and at runtime where necessary:**

1. `children` is the single authoritative ordered list of **placement slugs** for a variable-size ordered child collection. Every listed key exists exactly once and every active direct child is listed exactly once. Zero children and disabled/additional children obey each owner's semantics.
2. The entity's own metadata/reserved fields (`id`, `type`, `slug`, `params`, `locale`, `children`, and actual owner-specific structural fields) cannot be shadowed by child keys. Generic `Exclude<string, ...>` does **not** remove forbidden literal keys from a string index signature; use sound literal-key constraints and strict runtime validation.
3. A placement key and the underlying reusable Lesson's own `slug` are different concepts. Preserve reusable Lesson UUID references, sparse per-placement overrides, and origin identity; do not expand every Lesson into full Course JSON.
4. Named semantic roles, such as Flashcard `front/back/hint`, Question `question/hint/explanation`, Quiz references or Quest stage/task roles, are **not automatically flattened**. The owning Configurator must explicitly justify which boundaries are ordered collections versus semantically named fields.
5. Original Config, built Data and presentation Props have distinct responsibilities. Build emits domain Data, not UI arrays by default. A dedicated presentation adapter can materialize ordered arrays from Data for a specific renderer.
6. A stable URL placement path should support direct lookup by child slug, without scanning unrelated Course siblings. Slug→Course UUID resolution, route ambiguity and redirects/renames need explicit contracts. Validate the tree once at the correct boundary, rather than silently downgrading integrity checks on each navigation.

## Publication and localization

- Preserve `build.data({ languages, mode? })` and `build.overrides(patch, { languages, mode? })`, stateless nested Build Context and the existing `{ base, locale }` publication envelope until an explicitly approved contract change.
- Preserve requested-language scoping, localized nested dictionaries, invariant strings, sparse override patches, precedence and disabled-child behavior.
- Update **both** source materializers (reviewed inert `draft.ts` → generated `index.ts` Configurator files) and publication generators (Configurator Data → published JSON); these are different trust boundaries.
- Trusted static Draft Reader, sealed manifests, source SHA pinning, no-clobber Git transactions, TODO (BLOCKER) policy and immutable IDs remain required. Do not change filesystem paths or authored content as an incidental side effect.

## Workstreams and dependency gates

**A — #906, Data contract + Course/Module/Chapter**: specify and prove literal-key safety, `children`, runtime Data schemas, type inference, sparse *built Data* overrides, reusable completed Lesson placements, Course references and a representative vertical slice. Own `shared/engine/configurators/_shared__configurators/**`, `.../courses/**` and required Engine type contracts. **A is only the Data foundation and must not be mistaken for the final authored Config API.**

**A2 — #914, authored Course Config API (mandatory predecessor)**: an independent follow-on A-owned implementation task **after #906 merges into integration and before B/C/D start**. A2 owns the final Course/Module/Chapter authored `*_Config_Schema`, `defineCourse/Module/Chapter` signatures and `build.overrides` authoring API: `children` is the order at root and direct keys are child Configurators; the redundant `content.items/order` authored wrapper is eliminated. Preserve literal key typing, disabled/additional placement semantics, immutable identity and Lesson reuse. A2 must run focused TypeScript and runtime tests, document downstream impacts and be reviewed/merged before releasing B/C/D. A2 **does not** own D's generators or E's publication/runtime code.

**B — Lesson/Episode/Sections/ContentBlocks**: migrate ordered instructional containers and applicable composites with owner-specific invariants; preserve Checkpoint/Carousel/Quest roles and localization. Depends on both approved A and A2 contracts; do not modify A-owned shared helpers independently.

**C — Assessment/Questions/Flashcards**: migrate eligible collections, preserving scoring semantics, semantic role names, bank references, evaluation contracts and Flashcard sides. Depends on approved A and A2 contracts and coordinates with B for ContentBlock interfaces.

**D — Source materializers and staged editorial source**: update concrete TypeScript source renderers, Stage Zod/contracts and trusted generators to produce valid new Config; do not weaken static reader or transaction constraints. Depends on A+A2+B+C's source contracts.

**E — Publication, runtime, assemblers**: publish canonical Data JSON and localized sparse patches; update Course/Lesson/Assessment lookup, direct placement resolution, reference composition, tree/TOC assembly. Preserve draft/production and offline behavior. Depends on A+A2+B+C; coordinate with D for generated fixtures.

**F — Web/adapters/UI integration and regression evidence**: introduce presentation-specific Props adapters, migrate Next.js routes and Course navigation, preserve UI Kit and app host portability, add end-to-end multilingual and draft/production regression coverage. Depends on E.

Parallel work is allowed only on non-overlapping owned files after the relevant dependency contract is integrated into this branch. Agents must not independently invent different field shapes or suppress failing tests.

## Integration acceptance

- Exact changed-path ownership; no unrelated authoring rewrites, generated churn or mass rename replay.
- #906 Data foundation and #914 authored Course/Module/Chapter Config API independently verified and merged before B/C/D begin their implementation.
- Build/typecheck + focused positive and negative tests for each family; runtime validation rejects unsafe/reserved keys and invalid `children` references.
- End-to-end proof: inert editorial `draft.ts` → trusted materializer → executable Configurator → `build.data()` → localized published JSON → addressable runtime Data → presentation Props → rendered Lesson.
- Reusable Lesson with placement-specific override; nested Course/Module/Chapter; valid draft siblings; disabled/added items; 2+ locales; Question/Flashcard/Assessment references; offline-capable host; TypeScript inference tests.
- Review by an independent Development Reviewer. Do not mark Ready or merge the parent until complete verification and owner authorization. No automatic Production Quality run without explicit owner request.

## Deferred decisions requiring explicit resolution

- Sound schema representation for root-level dynamic child properties, including known nested reserved-role keys.
- Which non-Course composites meaningfully participate in `children` versus retain semantic role maps.
- Exact distinction of full published leaf Data versus compact Course placement references, and sparse locale diff shape (E #912 owns runtime publication; A/A2 must not silently invent a compactness policy).
- Slug→Course UUID index and behavior when the author changes a slug.
- Coordination with existing open Draft Course/Lesson PRs and any migration/re-materialization needed for their authored sources.

Any material decision must be documented and reconciled here **before** dependent agents implement it.
