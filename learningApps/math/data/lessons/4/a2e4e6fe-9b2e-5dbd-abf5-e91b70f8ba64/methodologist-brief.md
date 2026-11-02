# Two at a Time: Counting Pairs — Methodologist Brief

Date: 2026-10-31
Lesson slug: countByTwosWithPairs
Methodologist status: Draft
Code: [Not implemented](#)
Program dependence: None

## Educational purpose

Skip-count by two as repeated addition of equal pairs of objects, explaining why the number of pairs and the number of individual objects differ. Understand that the start value matters for the resulting number sequence.

## Target audience

**Primary audience: Grade 2.** Grade 2 learners who can make separate pairs, identify odd and even using leftovers, and count through twenty. Support is concrete and slow enough that multiplication symbols or arithmetic fact fluency are unnecessary.

The Grade determines this particular Lesson's pedagogical depth; canonical Skills remain grade-neutral.

## Prerequisites

- One-to-one counting, cardinality and distinction between pair and single object (`oneToOne`, `basicCardinality`).
- Pair making from the prior `evenOdd` Lesson (no independent mastery inferred).
- Forward number sequence to twenty and the idea that a step adds a fixed quantity, with an explicit two-object model.

## Target Skills

- [countBy2.data.ts](../../../../data/skills/counting/steps/skills/countBy2.data.ts)

## Expected learning outcomes

- Form and count up to five distinct two-object groups and obtain totals 2,4,6,8,10.
- Explain that three pairs have six objects, while five pairs have ten, and that pair count differs from item count.
- Predict and verify the total for six and seven new pairs without beginning to count every object from one.
- With one loose item already present, continue a +2 sequence 1,3,5,7,9 and explain why it is still counting by twos.

These are intended learning outcomes and observable formative explanations, not guaranteed mastered competencies or validation thresholds.

## Essential subject matter

A pair contains exactly two items, so each additional separate pair increases the total number of items by two, while the count of pairs increases by one. Starting with zero objects and adding pairs gives totals 0,2,4,6,8,10: one pair has 2 objects, three pairs 6, five pairs 10. Six pairs contain 12 individual items; seven pairs contain 14. Counting by twos means repeated +2 and can also start at 1: one loose object plus successive pairs gives 1,3,5,7,9. Thus 'count by twos' does not mean every starting number is even; the start is a separate fact. Group count and item count are distinct.

**Reference models that must remain correct:** 3 pairs, 6 mittens; 2→4→6. 4 pairs=8; 5 pairs=10. 6×2=12; (6+1) pairs=14 socks, represented through repeated +2. 1→3→5→7→9: step +2 with initial 1. Every model needs an equivalent explicit spoken/written number description, not decorative illustration alone.

## Conceptual progression and dependencies

Recognize a two-item pair → add one complete pair per learner action, count how the total changes → contrast group and object totals → transfer to six/seven pairs in a changed context → show a one-item start and equal +2 jumps to distinguish step size from initial parity.

The interdependent target Skills are taught together only where they share an intelligible representation. They retain their own independently assessable taxonomy identities. Do not infer cross-domain Skill mastery from completing one interaction.

## Misconceptions, examples and boundaries

**Likely confusions:** Saying five pairs means five objects; adding one when another pair arrives; counting pair members as if they were two different groups; assuming a +2 sequence can never contain odd numbers; choosing 6 for six pairs rather than 12.

**Pedagogical depth and exclusions:** Grade 2: up to seven concrete pairs (14 objects) and one-loose-plus-four-pairs transfer (9 objects). No general multiplication theorem, memorized times tables, abstract parity proof, fraction pairs or large counts. This differs from algebra's `numberPatterns`: the target is pair quantity and constant group addition, not inferring arbitrary unknown rules.

**Boundary and incomplete-case decisions:** A pair cannot be partially added or contain three objects; Add Pair is the only quantity-increasing action. A child may inspect individual members whenever wanted; source pair/member IDs must remain unique. A +2 step never discards the one starting bead; sock challenge cannot silently count pair units as individual units; switching presets resets only the transfer Scene.

## Localization, accessibility and offline intent

Every learner-facing prompt, number word, accessible description, feedback branch, state announcement and Note requires a complete genuine translation for the current Engine-supported roster, with no silent English fallback. RTL changes reading presentation but not mathematical operand order, number-line increasing direction, counting origin or grouping identity. WCAG 2.2 AA: native keyboard/switch/touch operation, visible focus, nonvisual ordered model ledger, non-color explanations, reduced motion, legible 200% zoom/mobile experience. All selected-language models, scripts, assets and feedback must be locally available after the lesson package is downloaded. These are production requirements, not claims that localization/PWA behavior currently exists.

English texts below are canonical editorial examples for later localization, not real locale data or implemented runtime. Audio is never required for understanding. An accessible alternative must preserve the **same** learning objective, rather than replace the essential interaction with a weaker 'lite' illustration.

## Sources and factual verification

- Canonical Skill `*.data.ts` files linked directly above, originally copied byte-for-byte from Mathematics `main` without changing UUIDs, definitions or translations.
- [Lesson Editorial Architecture](../../../../../../studio/docs/architecture/lesson-editorial-document.md) — Methodologist/Screenwriter ownership and approval.
- [Learning Philosophy](../../../../../../studio/docs/architecture/learning-experience-philosophy.md) — explanation, manipulation, contrast and transfer.
- [Localization and Inclusive Access](../../../../../../studio/docs/architecture/internationalization-and-accessibility.md) and [Offline-First Product Requirements](../../../../../../studio/docs/architecture/offline-first-and-device-compatibility.md).

All arithmetic and numerical model cases above were checked by explicit step, group or relation reasoning; no national curriculum coverage is inferred.

## Curriculum / Program compatibility

No specific curriculum specified or claimed. This Lesson is a standalone, Program-neutral educational unit.

## Open editorial decisions

- Editor/Methodologist: explicitly approve Grade 2, target Skill selection, prerequisites, depth and the core contrasts before promoting this Brief.
- Editor: review the two proposed Scene models and ensure their nonvisual, RTL and locale versions teach mathematically identical relationships.
- Coding/QA roles: confirm all supported locale dictionaries, low-device/offline delivery and accessible input alternatives when authorized. No Scene is implemented at this stage.

## Methodologist handoff

**Draft, not editor-approved.** The corresponding `content.md` and Scene specifications are **Provisional Drafts under the explicit batch instruction**. This exception does not mark the normal Methodologist or Screenwriter approval gates as passed. No React Scene, runtime Lesson, Question, Quiz, score, mastery, persistent Note or fake platform event is authorized.
