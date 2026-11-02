# Putting Numbers in Order to Twenty — Methodologist Brief

Date: 2026-10-31
Lesson slug: orderNumbersWithinTwenty
Methodologist status: Draft
Code: [Not implemented](#)
Program dependence: None

## Educational purpose

Use numerical magnitude to arrange numbers from 0 to 20 in increasing or decreasing order, including repeated equal values. An ordered arrangement is a relationship among numbers, not a decorative spatial pattern.

## Target audience

**Primary audience: Grade 1.** Grade 1 after basic forward/backward counting within 20, reading numerals 0–20 and comparing quantities. Reading prompts are short; manipulable cards have accessible keyboard alternatives. The chosen grade and difficulty belong to this Lesson, never to its canonical Skill definition.

## Prerequisites

- Read and match numbers 0–20 (`readWrite20`).
- Count forward and backward within 20 (`forward20`, `backward20`) including the ten boundary.
- Understand 'more, fewer, equal' from a cardinality comparison (`moreLessEqual`) and can apply to number symbols in a supported model.

## Target Skills

- [order20.data.ts](../../../../data/skills/numeration/comparison/skills/order20.data.ts)

## Expected learning outcomes

- Arrange distinct numbers 0–20 in nondecreasing order and explain adjacent comparisons, not just memorize an example.
- Arrange a new set in nonincreasing order and explain why the first number is the greatest.
- Keep duplicate values in a valid ordered sequence, recognizing that equal neighbors do not break order.
- Check an apparently ordered sequence and correct a pair of adjacent numbers that violates the stated direction.

These outcomes describe teachable reasoning and meaningful unscored observation; the Lesson itself is not evidence of mastery.

## Essential subject matter

For ascending (nondecreasing) order, each adjacent value must be at least the one before it; equality is permitted. For descending (nonincreasing) order, each adjacent value must be no greater than the one before it. Examples: [4,6,9] ascending; [3,8,8,10] ascending; [20,19,12,0] descending. For ordered cards [5,7,6], placing 6 before 7 corrects the ascent. Within 0–20, 0 is the least and 20 the greatest; the lesson does not teach inequalities `<`/`>` or numeric place-value algorithms.

## Conceptual progression and dependencies

Compare two numbers already grounded in concrete quantities → apply the relation transitively to three cards → discover equality does not violate order → reverse the direction → independently repair a new sequence.

## Misconceptions, examples and boundaries

**Anticipated misconceptions:** Reading the screen's rightmost card as the greatest regardless of labels; treating equality as a sorting error; sorting numerals like words (placing 12 before 3 because '1' precedes '3'); interpreting 'descending' as only moving left on screen; omitting a repeated value.

**Instructional depth and hard boundaries:** Whole numbers 0–20; no special `comparisonSymbols` Skill teaching, no measured number-line distances or generalized place-value rules; sorted rows are logical sequences, not physical left/right requirements in RTL.

**Concrete reference models:**

- 4, 6, 9 in nondecreasing order.
- 3, 8, 8, 10; 8 followed by 8 is acceptable.
- 20, 19, 12, 0.
- 2, 5, 11, 17; 11 then 5 is a descending step, not ascending.

## Localization, accessibility and offline intent

Learner-facing text in these files is **English editorial prototype copy**, not an implemented or complete localized lesson. Every prompt, numeral word, feedback response, control label and nonvisual state requires accurate translations for the current full Engine locale roster, with no fallback and locale-correct number formatting. The screen reading order and comparison or place-value roles remain mathematically meaningful in both LTR and RTL; do not merely flip digits or reverse sequences. Provide nonvisual semantic object/number ledgers, touch and keyboard/switch operation, visible focus, a reduced-motion path, zoom/mobile support and non-color feedback in accordance with WCAG 2.2 AA. After the selected package is downloaded, equivalent reasoning and content should run offline on weak devices. These are **production requirements, not claims of implementation**.

## Sources and factual verification

- Canonical Skill `*.data.ts` files linked in Target Skills (copied byte-for-byte from Mathematics `main` in Batch 1; UUIDs/definitions unchanged).
- [Lesson Editorial Artifacts](../../../../../../studio/docs/architecture/lesson-editorial-document.md): division between Methodologist, Content, Scene and implementation.
- [Learning Experience Philosophy](../../../../../../studio/docs/architecture/learning-experience-philosophy.md): manipulative explanation, independent retrieval and transfer.
- [Accessibility and localization](../../../../../../studio/docs/architecture/internationalization-and-accessibility.md) and [offline-first intent](../../../../../../studio/docs/architecture/offline-first-and-device-compatibility.md) establish implementation constraints.

**Skill-specific verification:** The approved canonical `order20.data.ts` explicitly includes repeated equal values in non-strict numerical order; lesson is intentionally scoped to 0–20 and does not rename or split the Skill.

## Curriculum / Program compatibility

No named Curriculum; autonomous Program-neutral Lesson. No national standards alignment or existing implementation is claimed.

## Open editorial decisions

- Editor/Methodologist must approve the selected grade, target Skills, prerequisites, examples and numerical depth before this Brief becomes authoritative.
- Editor to confirm lesson sequence relative to other draft Lessons; do not treat existing Lessons as approved mastery evidence.
- Production specialists must separately approve full supported-locale translations, Scene accessibility and offline feasibility. Nonvisual/equivalent access may not be silently dropped for performance.

## Methodologist handoff

**Draft — awaiting explicit editor approval.** Content and Scene specifications prepared alongside this Brief are **provisional Drafts under batch authorization**. They cannot pass the normal Screenwriter approval gate or authorize React code, runtime Lesson data, Questions/Quizzes, scores, Note persistence or Scene implementation.
