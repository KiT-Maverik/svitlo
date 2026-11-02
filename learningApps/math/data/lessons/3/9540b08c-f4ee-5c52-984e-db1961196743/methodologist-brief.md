# Which Collection Has More? — Methodologist Brief

Date: 2026-10-31
Lesson slug: compareCollectionsByCounting
Methodologist status: Draft
Code: [Not implemented](#)
Program dependence: None

## Educational purpose

Make judgments of more, fewer and equally many from set cardinality rather than object appearance. Matching two sets one-to-one supplies concrete evidence; counted totals offer an independent cross-check.

## Target audience

**Primary audience: Grade 1.** Grade 1 learners who can count to at least ten. Uses small familiar objects and short spoken/written descriptions. The same mathematical judgments must be accessible when pictures are not visible. The chosen grade and difficulty belong to this Lesson, never to its canonical Skill definition.

## Prerequisites

- One-to-one item correspondence and cardinality within ten (`oneToOne`, `basicCardinality`).
- Written single digits 0–9 for the optional numeral cross-check (`digits09`).
- A few basic natural-language comparisons such as 'more' and 'same' can be introduced within the lesson; symbols are not assumed.

## Target Skills

- [compareSets.data.ts](../../../../data/skills/counting/cardinality/skills/compareSets.data.ts)
- [moreLessEqual.data.ts](../../../../data/skills/numeration/comparison/skills/moreLessEqual.data.ts)

## Expected learning outcomes

- Match one object from each of two sets to identify unmatched items and determine which set has more without relying on object size or spacing.
- Recognize equality when all items in both sets can be matched with no leftovers, despite differing appearances.
- Count each set and use their totals to explain more/fewer/equally many, reversing the relation when switching which set is named first.
- Transfer a justified comparison to an unfamiliar collection, including a deceptive size or spacing contrast.

These outcomes describe teachable reasoning and meaningful unscored observation; the Lesson itself is not evidence of mastery.

## Essential subject matter

For finite collections A and B, pairing each item of A with one distinct item of B establishes cardinality comparison. If A has unmatched items after B is fully paired, A has more and B fewer; if neither has unmatched items, their numbers are equal. Physical area, item size, color, orientation and spacing do not change cardinality. Counts 5 and 3 imply five has two more than three, but the 'difference' is only a concrete count of leftovers here, not formal subtraction or a numerical sign. Comparing an empty set is possible; not essential to this learning unit.

## Conceptual progression and dependencies

Connect known individual counting with paired matching → identify unmatched or zero leftovers → falsify a tempting visual-size heuristic → compare counted numerals and independently justify in a new context. The two targets share a meaningful teaching relationship: `compareSets` names the correspondence method, while `moreLessEqual` names the quantitative relation; neither definition changes.

## Misconceptions, examples and boundaries

**Anticipated misconceptions:** Three large blocks 'must be more' than five small beads; a longer row is necessarily more; one item may be paired to several others; 'equal' requires identical shape or order; changing reference group does not reverse 'more/fewer'.

**Instructional depth and hard boundaries:** Sets of 0–12 discrete objects, visually and textually identifiable; no formal `<`, `>` or `=` symbol teaching (reserved `comparisonSymbols` Skill), no subtraction algorithm and no scored mastery.

**Concrete reference models:**

- 4 vs 3: A has one more item, B one fewer.
- 5 vs 5 are equally many even if one row is longer.
- 5 counters are more numerous than 3 books.
- 8 pencils exceed 6 erasers by two objects, regardless of row length.

## Localization, accessibility and offline intent

Learner-facing text in these files is **English editorial prototype copy**, not an implemented or complete localized lesson. Every prompt, numeral word, feedback response, control label and nonvisual state requires accurate translations for the current full Engine locale roster, with no fallback and locale-correct number formatting. The screen reading order and comparison or place-value roles remain mathematically meaningful in both LTR and RTL; do not merely flip digits or reverse sequences. Provide nonvisual semantic object/number ledgers, touch and keyboard/switch operation, visible focus, a reduced-motion path, zoom/mobile support and non-color feedback in accordance with WCAG 2.2 AA. After the selected package is downloaded, equivalent reasoning and content should run offline on weak devices. These are **production requirements, not claims of implementation**.

## Sources and factual verification

- Canonical Skill `*.data.ts` files linked in Target Skills (copied byte-for-byte from Mathematics `main` in Batch 1; UUIDs/definitions unchanged).
- [Lesson Editorial Artifacts](../../../../../../studio/docs/architecture/lesson-editorial-document.md): division between Methodologist, Content, Scene and implementation.
- [Learning Experience Philosophy](../../../../../../studio/docs/architecture/learning-experience-philosophy.md): manipulative explanation, independent retrieval and transfer.
- [Accessibility and localization](../../../../../../studio/docs/architecture/internationalization-and-accessibility.md) and [offline-first intent](../../../../../../studio/docs/architecture/offline-first-and-device-compatibility.md) establish implementation constraints.

**Skill-specific verification:** Canonical `compareSets.data.ts` and `moreLessEqual.data.ts` in distinct assigned SkillDomains; no standalone new combined Skill created. Each comparison claim must be supported by the actual count or mapping.

## Curriculum / Program compatibility

No named Curriculum; autonomous Program-neutral Lesson. No national standards alignment or existing implementation is claimed.

## Open editorial decisions

- Editor/Methodologist must approve the selected grade, target Skills, prerequisites, examples and numerical depth before this Brief becomes authoritative.
- Editor to confirm lesson sequence relative to other draft Lessons; do not treat existing Lessons as approved mastery evidence.
- Production specialists must separately approve full supported-locale translations, Scene accessibility and offline feasibility. Nonvisual/equivalent access may not be silently dropped for performance.

## Methodologist handoff

**Draft — awaiting explicit editor approval.** Content and Scene specifications prepared alongside this Brief are **provisional Drafts under batch authorization**. They cannot pass the normal Screenwriter approval gate or authorize React code, runtime Lesson data, Questions/Quizzes, scores, Note persistence or Scene implementation.
