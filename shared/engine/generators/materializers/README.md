# Concrete source materializers — normalization inventory

This is an **implementation inventory** for [PR #835](https://github.com/KiT-Maverik/svitlo/pull/835), not evidence of editorial approval, published Props, or a completed cross-repository migration. Canonical trust rules are in [typed production materialization](../../../../studio/docs/architecture/typed-production-materialization.md), and the scoped [Engine generator instructions](../AGENTS.md) take precedence.

## Layout and ownership

Keep authored Config collections (`items/order`, maps, immutable IDs) intact. Only the **physical source directory** may lose redundant wrappers. Do not rewrite existing textbook sources without a separately approved migration. A concrete renderer owns its output; parents delegate without rebuilding child Configs. Every emitted destination remains subject to the trusted sealed manifest and create-only Git transaction.

For Question children, retain the semantic role and scoring group: `questions/<kind>/<slug>/question/<block>/index.ts`, `.../hint/<block>/index.ts`, `.../explanation/<block>/index.ts` and `.../answers/{correct,incorrect,distractors}/<block>/index.ts`. There are no intermediate `content/` or `items/` directories. Question entry modules remain `questions/<kind>/<slug>.ts`; group indexes and the Question Bank root stay where they are.

For Flashcards, retain `flashcards/<slug>.ts` and `flashcards/<slug>/content/{front,back,hint}/index.ts`; each Side's concrete child is now directly under `.../<role>/<block>/index.ts`, without `items/`. Role boundaries are meaningful and must not be flattened into an ambiguous card-wide namespace. All source imports must resolve from their actual owning file.

## Concrete renderer matrix — integration #837

The table distinguishes implemented behavior from role-preserving N/A decisions and
independent work; a green Draft guard is not a substitute for Ready CI.

| Family / kinds | Integrated implementation / decision | Scope boundary and validation |
| --- | --- | --- |
| Nine Question kinds | Direct child paths under semantic question/answer roles, stable IDs and ordered collections | Source and trust-boundary tests; no second generic serializer |
| Question Bank | Inherits nine kinds, Lesson-owned pinned `constants.ts` Languages type across all nested sources, optional Quiz rationale | Independent Bank publication/Stage 5 evidence; unfinished Question media stays blocked |
| FlashcardSide / Flashcard / Flashcard Bank | Direct Side children beneath front/back/hint roles; pinned Lesson-owned `constants.ts` Languages type | Keep card relationships and unique review specifications; non-implemented media is never approved |
| Course / Module / Chapter | Direct semantic child-slug ownership already exists; no redundant `items` folders | **N/A to further path flattening**. #826 owns concurrent Course/Module/Chapter Assessment changes and must reconcile separately, not overwritten by this integration |
| Episode | Shared ordinary Section renderers, own typed `constants.ts` and reviewed locale restoration plan, narrative Section-note handoff, textbook-scoped six-file Scene draft plan with atomic no-clobber checks | Course-owned Episode slot, fixed parent restoration and human Stage 9/10 QA retained |
| QuestSection / QuestStage / QuestTask | Stages/tasks remain real role directories without per-child `specification.md`; reviewed notes remain in safe removable source comments until integrated with owner; Stage media directly under `video/`, `audio/`, `image/`, `subtitles/`; Task Scene stays in `scene/` | **N/A** to flattening meaningful stages/tasks/Scene roles; Quest remains Build-only, not a publishable Lesson runtime Section |
| Skill / SkillGroup / SkillDomain | Direct group/skill path, no redundant `groups` or `skills`, UUID and path confinement checks | Source-only reviewed Skill methodology retained; Lesson imports are derived from its own vetted `#skillsData/*` reference |
| EducationStandard | Standalone leaf; entire immutable original-language `description.frontend` dictionary retained | **N/A** to source-only language pruning: required original locale dictionary is the approved contract; preserve unique sidecars |
| AssessmentMethod | Standalone typed leaf, source-localized descriptions, pending planned languages signaled by materializer | **N/A** to nested flattening; assessment method taxonomy remains Engine-owned |
| Text, Markdown, Code, Carousel, Checkpoint, Sections | Direct nested source paths; optional semantic role boundaries preserved | Section educational notes must be integrated by owning Lesson/Episode, never discarded |
| Scene / Image / Video / YouTube / Audio / Subtitles | Shared emitters and the same six-file Scene draft template for Lesson, Episode, and newly reviewed Bank Scenes; Bank Scene evidence and no-clobber publishing independently pinned | Incomplete content remains blocked; no fabricated asset, registered Scene or license approval |

The source materializers seal their emitted TypeScript bytes unchanged, with **no
pre-seal formatter or handoff AST parser**. The existing `PR Auto-format` action
is responsible for applying repository Prettier on Ready PRs to `develop`.
Course-generated JSON handoffs protect the immutable literal with a narrow
`// prettier-ignore` directive; ordinary static re-exports accept either
Prettier quote style. They remain subject to their original strict,
non-executing publisher checks. Real output is still nonpublishable until each
entity-specific check, independent editorial review and authorized workflow pass.

## Skill taxonomy source placement

Skill modules generated within their parent Group/Domain are sibling `<slug>.ts` modules next to that owner's `index.ts`. Groups remain nested semantic owners `<group>/index.ts`, without a `groups` wrapper. A Skill's separate reviewed production documentation remains at `<slug>/methodology.md` or another preserved sidecar path; flattening never deletes unique reviewed intent. The direct Skill materializer also supports a legacy standalone `index.ts` output when no owning parent supplies the sibling filename. Parent dispatchers derive immutable identity from each full logical Skill placement, reject `index` as an ambiguous sibling Skill filename, and require importable canonical entrypoints plus contained child outputs.

## Integration evidence and outstanding boundaries

- **Source-of-truth languages:** Lesson owns the sole `constants.ts` source and reviewed planned locale restoration. Both Banks import its active `languages` and `Languages` type from `#lessonsData/*` without additional language files or duplicate translation TODOs; independent Bank translation and publisher gates still apply. Episode has its own typed `constants.ts` under its Course-owned content path.
- **Reviewed Skill links:** the Lesson Stage 6 bridge only preserves imported Configurator `.id` references from its exact pinned authoring source, rooted in the owning textbook `#skillsData/*` alias. Unknown UUID strings produce blocked scaffolds rather than guessed imports.
- **Unique specifications:** retain per-node reviewed source notes at their semantic owner. Section notes consolidate into Lesson methodology or Episode narrative; temporary Flashcards/Scene specifications are inert, removable source comments.
- **Formatting:** root Prettier keeps `quoteProps: as-needed`; the pinned `@ianvs/prettier-plugin-sort-imports` applies import grouping to TypeScript (`.ts`/`.tsx`) only, preserving the existing `.mjs`/`.js` tooling format. Do not add post-materialization rewriting or mass-format unrelated authored content. Run its focused idempotence test and the existing PR Auto-format lifecycle when ready.
- **CI evidence:** pending latest-head Ready CI and focused Course/Episode/Lesson/Bank publisher checks must be explicitly verified before the parent PR can be considered merge-ready.
- **Concurrent Course Assessment:** #826 owns Course/Module/Chapter architecture changes. This parent does not silently merge its unfinished work; verify compatibility with its eventual integration.

Generated TypeScript remains **nonpublishable** by default. No source generator can bypass the isolated worker, SHA pinning, sealed manifest, create-only collision protection or authorized Git publisher.
