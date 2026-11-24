# Concrete source materializers — normalization inventory

This is an **implementation inventory** for [PR #835](https://github.com/KiT-Maverik/svitlo/pull/835), not evidence of editorial approval, published Props, or a completed cross-repository migration. Canonical trust rules are in [typed production materialization](../../../../studio/docs/architecture/typed-production-materialization.md), and the scoped [Engine generator instructions](../AGENTS.md) take precedence.

## Layout and ownership

Keep authored Config collections (`items/order`, maps, immutable IDs) intact. Only the **physical source directory** may lose redundant wrappers. Do not rewrite existing textbook sources without a separately approved migration. A concrete renderer owns its output; parents delegate without rebuilding child Configs. Every emitted destination remains subject to the trusted sealed manifest and create-only Git transaction.

For Question children, retain the semantic role and scoring group: `questions/<kind>/<slug>/question/<block>/index.ts`, `.../hint/<block>/index.ts`, `.../explanation/<block>/index.ts` and `.../answers/{correct,incorrect,distractors}/<block>/index.ts`. There are no intermediate `content/` or `items/` directories. Question entry modules remain `questions/<kind>/<slug>.ts`; group indexes and the Question Bank root stay where they are.

For Flashcards, retain `flashcards/<slug>.ts` and `flashcards/<slug>/content/{front,back,hint}/index.ts`; each Side's concrete child is now directly under `.../<role>/<block>/index.ts`, without `items/`. Role boundaries are meaningful and must not be flattened into an ambiguous card-wide namespace. All source imports must resolve from their actual owning file.

## Concrete renderer matrix

| Family / kinds | Layout in #835 | Remaining work or inherited change |
| --- | --- | --- |
| Question: selectOneAnswer, selectMultipleAnswers, matchBlocks | **Changed**: child path, imports, path confinement, leaf tests | Consume shared formatter from #830; validate completed bank source with Engine build |
| Question: answerWithText, answerWithNumber, orderSequence | **Changed**: same path and no-escape rules | Consume #830; validate all role and answer paths |
| Question: buildAnswerWithBlocks, fillBlanksWithBlocks, fillBlanksWithText | **Changed**: same path and no-escape rules | Consume #830; preserve answer/slot semantics |
| Question Bank | **Inherited** nine leaf changes; root integration assertion updated | Preserve kind group indexes, deterministic inventory, bank transaction and source-only locale |
| FlashcardSide | **Changed**: `/<role>/<block>` instead of `/<role>/items/<block>`; path confinement and tests | Consume #830; preserve exact Side `items/order` |
| Flashcard / Flashcard Bank | **Inherited** Side placement; card and root imports unchanged | Preserve verified relationships, per-card specifications until safely consolidated, and independent bank review |
| Course / Module / Chapter | Existing semantic child-slug directories; **not changed yet** | Coordinate with active #826 (same source renderers); consume #830; retain new/existing Lesson and Assessment ownership |
| Episode | Existing Course-owned slot and shared Section delegation | Inherit #830 and Section layout from #832; preserve Episode trusted transaction |
| QuestSection / QuestStage / QuestTask | Distinct stages, tasks and media/Scene role boundaries are applicable; **not changed yet** | #832 owns overlapping nested paths; #833 Scene; #834 media. Preserve Build-only Quest restriction |
| Skill / SkillGroup / SkillDomain | **Changed**: direct `<domain>/<group>/<skill>.ts` and `<domain>/<group>/index.ts`, no redundant `skills/` or `groups/`; preserve separate reviewed sidecars under the Skill owner; path confinement, ID derivation and tests | Source formatting from #830 applies; do not migrate existing authored taxonomy files |
| EducationStandard / AssessmentMethod | Standalone leaf `index.ts`; child path flattening **not applicable** | Audit language tuple, formatter and unique sidecars after #830; retain validated short locale fields |
| Text, Markdown, Code, Carousel, Checkpoint, nested Sections | **Not owned by #835** | Inherit shared changes from #830/#832 and applicable other scoped PRs |
| Scene, Image, Video, YouTube, Audio, Subtitles | **Not owned by #835** | Inherit #833/#834; no competing scaffolder or asset policy |

## Skill taxonomy source placement

Skill modules generated within their parent Group/Domain are sibling `<slug>.ts` modules next to that owner's `index.ts`. Groups remain nested semantic owners `<group>/index.ts`, without a `groups` wrapper. A Skill's separate reviewed production documentation remains at `<slug>/methodology.md` or another preserved sidecar path; flattening never deletes unique reviewed intent. The direct Skill materializer also supports a legacy standalone `index.ts` output when no owning parent supplies the sibling filename. Parent dispatchers derive immutable identity from each full logical Skill placement, reject `index` as an ambiguous sibling Skill filename, and require importable canonical entrypoints plus contained child outputs.

## Pending integration and evidence

- **Formatter:** #830 owns the one deterministic formatting implementation (MJS and TS), import grouping, identifier-safe keys, Prettier output and pre-seal formatting. Do not duplicate it in this branch.
- **Language constants and imports:** #831 owns the Lesson root constants, package alias maps and Skill reference pattern. Assess bank/Course-local language modules **after** that integration; no duplicate `constants.ts` at the Lesson owner.
- **Sidecars:** durable reviewed methodology must be preserved at its semantic owner; do not delete a per-node `specification.md` if it is the only record of unique intent. Consolidation needs corresponding owner contract and regression tests. Temporary resource instructions and blockers remain until resolved.
- **Validation still required:** focused and negative leaf tests, full Question/Flashcard Bank source flows, deterministic bytes, import/type resolution, Engine build/typecheck, affected trusted publisher tests and textbook build checks. Draft FastGate alone is not evidence of these checks.
- **Dependency boundary:** #826 edits Course/Module/Chapter and its materialization paths. Resolve that diff and integrated #830–#834 changes before rewriting the overlapping files or marking this PR Ready.

Generated TypeScript remains **nonpublishable** by default. No source generator can bypass the isolated worker, SHA pinning, sealed manifest, create-only collision protection or authorized Git publisher.
