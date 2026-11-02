# One Ten, Many Ones: Building Two-Digit Numbers — Methodologist Brief

Date: 2026-10-31
Lesson slug: buildNumbersWithTensAndOnes
Methodologist status: Draft
Code: [Not implemented](#)
Program dependence: None

## Educational purpose

Understand ten ones as one ten and use equal-value exchanges to build and interpret two-digit numbers by their tens and remaining ones. The same quantity can be shown with objects, bundles, and a numeral.

## Target audience

**Primary audience: Grade 2.** Grade 2 learners ready to group quantities and reason about two-digit representations. Children may recognize numbers to 20 but need explicit support for reading new two-digit numerals through 49, so names and written labels are introduced alongside physical bundles. The chosen grade and difficulty belong to this Lesson, never to its canonical Skill definition.

## Prerequisites

- Accurate one-to-one counting and cardinality at least to 20 (`oneToOne`, `basicCardinality`).
- Recognize single digits and read quantities/numerals up to 20 (`digits09`, `readWrite20`).
- Find the next number when adding one and understand that regrouping may change a representation without changing quantity; the latter is **developed** here, not assumed.

## Target Skills

- [makeTen.data.ts](../../../../data/skills/numeration/placeValue/skills/makeTen.data.ts)
- [tensOnes.data.ts](../../../../data/skills/numeration/placeValue/skills/tensOnes.data.ts)

## Expected learning outcomes

- Explain and demonstrate that exchanging ten loose ones for one ten-bundle preserves the total number of objects, and reverse the exchange.
- Build a two-digit quantity from tens and ones (e.g., 2 tens and 6 ones is 26) with a clear connection to the written numeral.
- Distinguish numbers whose digits are reversed by pointing to the different group counts (23 versus 32).
- Repack a nonstandard representation such as one ten and seventeen loose ones into two tens and seven ones without adding or losing objects.
- Independently model a new value within the supported range and explain its tens and remaining ones.

These outcomes describe teachable reasoning and meaningful unscored observation; the Lesson itself is not evidence of mastery.

## Essential subject matter

In decimal notation a ten is equivalent to exactly ten ones. For a two-digit number n=10t+u with t from 1 to 9 and remaining ones u from 0 to 9, `t` is the tens count and `u` the ones count in its usual representation. Ten ones may be bundled into one ten, or one ten unbundled into ten ones, preserving total. 2 tens + 6 ones = 26, while 3 tens + 2 ones = 32. 27 can be modeled as 2 tens and 7 ones, or temporarily as 1 ten and 17 loose ones; the latter is a nonstandard unpacked representation rather than the ordinary two-digit tens/ones form. This lesson begins with totals 10–20 and extends via bundles to 21–49 with all intermediate language scaffolded. No multi-digit carrying algorithm or full hundreds system is assumed.

## Conceptual progression and dependencies

Known ten objects → physically exchange a complete group for one labelled ten → compose a second bundle and compare what changed → translate bundles to two-digit notation → reverse the operation without changing total → explain a new two-digit example independently.

## Misconceptions, examples and boundaries

**Anticipated misconceptions:** A ten-bundle has one object's value rather than ten; swapping a bundle 'loses' nine units; 2 tens and 3 ones is 32; reversing 23 to 32 leaves value unchanged; 'one ten and seventeen ones' should display a two-digit tens/ones label as 1,17.

**Instructional depth and hard boundaries:** Build and read 10–49 with bundling visuals, optional extension to 99 only after editor approval. Zero loose units may occur (20), but treatment of zero as a general positional placeholder is reserved for `zeroPlaceholder`. No written regrouping algorithm or calculation fluency, no `readWrite100` mastery assumed. No scoring.

**Concrete reference models:**

- Ten objects before, ten objects after; regrouping changes organization only.
- Both layouts show seventeen objects; only standard packing has 1 ten and 7 remaining ones.
- Two tens plus six ones equals 26.
- 23 and 32 are different quantities; 32 has more.
- 27 is 2 tens and 7 ones in canonical tens/ones form.
- Four tens and three ones is 43.

## Localization, accessibility and offline intent

Learner-facing text in these files is **English editorial prototype copy**, not an implemented or complete localized lesson. Every prompt, numeral word, feedback response, control label and nonvisual state requires accurate translations for the current full Engine locale roster, with no fallback and locale-correct number formatting. The screen reading order and comparison or place-value roles remain mathematically meaningful in both LTR and RTL; do not merely flip digits or reverse sequences. Provide nonvisual semantic object/number ledgers, touch and keyboard/switch operation, visible focus, a reduced-motion path, zoom/mobile support and non-color feedback in accordance with WCAG 2.2 AA. After the selected package is downloaded, equivalent reasoning and content should run offline on weak devices. These are **production requirements, not claims of implementation**.

## Sources and factual verification

- Canonical Skill `*.data.ts` files linked in Target Skills (copied byte-for-byte from Mathematics `main` in Batch 1; UUIDs/definitions unchanged).
- [Lesson Editorial Artifacts](../../../../../../studio/docs/architecture/lesson-editorial-document.md): division between Methodologist, Content, Scene and implementation.
- [Learning Experience Philosophy](../../../../../../studio/docs/architecture/learning-experience-philosophy.md): manipulative explanation, independent retrieval and transfer.
- [Accessibility and localization](../../../../../../studio/docs/architecture/internationalization-and-accessibility.md) and [offline-first intent](../../../../../../studio/docs/architecture/offline-first-and-device-compatibility.md) establish implementation constraints.

**Skill-specific verification:** Canonical `makeTen.data.ts` and `tensOnes.data.ts` specify grouping/un-grouping invariant and equivalent two-digit representations respectively. They belong together in one conceptually coherent lesson. Their static UUIDs remain untouched.

## Curriculum / Program compatibility

No named Curriculum; autonomous Program-neutral Lesson. No national standards alignment or existing implementation is claimed.

## Open editorial decisions

- Editor/Methodologist must approve the selected grade, target Skills, prerequisites, examples and numerical depth before this Brief becomes authoritative.
- Editor to confirm lesson sequence relative to other draft Lessons; do not treat existing Lessons as approved mastery evidence.
- Production specialists must separately approve full supported-locale translations, Scene accessibility and offline feasibility. Nonvisual/equivalent access may not be silently dropped for performance.

## Methodologist handoff

**Draft — awaiting explicit editor approval.** Content and Scene specifications prepared alongside this Brief are **provisional Drafts under batch authorization**. They cannot pass the normal Screenwriter approval gate or authorize React code, runtime Lesson data, Questions/Quizzes, scores, Note persistence or Scene implementation.
