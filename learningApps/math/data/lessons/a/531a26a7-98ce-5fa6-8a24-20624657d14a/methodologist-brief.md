# Five in Every Pack: Count by Fives — Methodologist Brief

Date: 2026-10-31
Lesson slug: countByFivesWithGroups
Methodologist status: Draft
Code: [Not implemented](#)
Program dependence: None

## Educational purpose

Count groups that each contain exactly five objects by repeated addition of five, while distinguishing complete groups, group count and item total. Reject a claim of +5 if a group has only four.

## Target audience

**Primary audience: Grade 2.** Grade 2 after grouped counting by twos and a concrete tens-and-ones representation. Reading two-digit numbers 25 and 30 is supported by the exact number-of-groups and objects; no assumed multiplication fluency.

The Grade determines this particular Lesson's pedagogical depth; canonical Skills remain grade-neutral.

## Prerequisites

- Count five objects accurately and recognize five as a fixed group size (`oneToOne`, `basicCardinality`).
- Recognize repeated addition of equal groups (`countBy2` or concrete equivalent) and number names through thirty with tens/ones support (`tensOnes`).
- Recognize that one group can contain multiple objects and its group count is not its member count.

## Target Skills

- [countBy5.data.ts](../../../../data/skills/counting/steps/skills/countBy5.data.ts)

## Expected learning outcomes

- Construct complete five-object packs and explain why each new pack adds exactly five objects.
- Count three and four packs as 15 and 20 individual objects, distinguishing pack number from item count.
- Continue whole-pack totals 5,10,15,20,25,30 through six packs using an explicit repeated +5 ledger.
- Identify that two full five-item packs plus an incomplete four-item pack contain 14 rather than 15 objects.
- Independently find the total in six new crayon packs without recounting each single crayon.

These are intended learning outcomes and observable formative explanations, not guaranteed mastered competencies or validation thresholds.

## Essential subject matter

Each completed pack contains five **distinct** objects. After k complete packs the number of items is 5k, while there are only k packs. Starting from zero, successive completed packs yield 5,10,15,20,25,30 for one through six packs. Three packs have fifteen items; four packs twenty; six packs thirty. A pack of four is not a complete five-item pack: two complete packs plus one four-item group total 5+5+4=14, not 15, and cannot be called three full packs of five. Numerical increments of five correspond to adding a **whole** five-item group each time. This is a specific counting strategy, not an inference task about an arbitrary number pattern.

**Reference models that must remain correct:** 1 strip=5, 2=10, 3=15 dots. 5,10,15,20,25,30: repeated +5 for complete strips. 5 groups of 5=25; 6 groups of 5=30. 5+5+4=14, whereas 5+5+5=15. Every model needs an equivalent explicit spoken/written number description, not decorative illustration alone.

## Conceptual progression and dependencies

Establish one complete group of five → add more complete groups and record 5,10,15,20 → distinguish count of packs from total items → transfer to six unfamiliar crayon packs 25 and 30 → reveal why a short pack of four breaks the equal-five increment.

The interdependent target Skills are taught together only where they share an intelligible representation. They retain their own independently assessable taxonomy identities. Do not infer cross-domain Skill mastery from completing one interaction.

## Misconceptions, examples and boundaries

**Likely confusions:** Five groups means five individual objects; adding one instead of five after a new pack; claiming a partly filled pack always adds five; seeing 5+5+4=15; treating five-unit steps as merely a chant with no grouped quantity.

**Pedagogical depth and exclusions:** Grade 2: one through six complete groups of five (up to 30 items), and one explicitly incomplete group of four to expose the invariant. No multiplication-table drills, fractional groups, large multi-digit jumps or price calculations. We name groups and members separately, and if learner can't read 25/30 yet show tens-and-ones models rather than assuming competence.

**Boundary and incomplete-case decisions:** Adding a full strip always means exactly five new member IDs. No model may create a seventh strip in the bounded activity; explain the displayed range rather than wrapping counter to zero. Empty display slots are not objects. A drawn pack label is never an authority to count five when the actual group has only four. Do not invent virtual/fractional member to complete a short group.

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
