# A Number's Place on the Line — Methodologist Brief

Date: 2026-10-31
Lesson slug: numberLineToTwenty
Methodologist status: Draft
Code: [Not implemented](#)
Program dependence: None

## Educational purpose

Treat a number line as a sequence of equally spaced numerical positions, not as a row of arbitrary pictures. Use those positions to find adjacent and intermediate whole numbers and explain the count of unit intervals.

## Target audience

**Primary audience: Grade 1.** Learners who read numerals 0–20, can step forward and backward by one, and notice that evenly spaced tick marks form an ordered measuring representation. Grade 1 learners need a slow, move-one-step version with explicit labels rather than proportional-distance calculations in notation.

The Grade determines this particular Lesson's pedagogical depth; canonical Skills remain grade-neutral.

## Prerequisites

- One-to-one counting and cardinality for collections to twenty (`oneToOne`, `basicCardinality`).
- Forward and backward sequence of whole numbers within twenty (`forward20`, `backward20`) and reading their numerals (`readWrite20`).
- Distinguish a counted interval from the number of interior tick marks; this distinction is developed by the Lesson, not assumed.

## Target Skills

- [numberLine20.data.ts](../../../../data/skills/numeration/numberLine/skills/numberLine20.data.ts)
- [beforeAfterBetween.data.ts](../../../../data/skills/numeration/numberLine/skills/beforeAfterBetween.data.ts)

## Expected learning outcomes

- Locate a labelled integer up to 20 on a correctly spaced number line and explain that consecutive ticks differ by one.
- Move exactly two unit intervals from 10 to 12 and three from 5 to 8, distinguishing intervals from internal ticks.
- Name the immediately previous and next numbers for interior values such as 10, and distinguish a segment endpoint from a claim about all whole numbers.
- Identify all whole numbers strictly between two displayed endpoints, including 8,9,10 between 7 and 11.
- Transfer to a fresh section of the 0–20 line and justify a missing intermediate number.

These are intended learning outcomes and observable formative explanations, not guaranteed mastered competencies or validation thresholds.

## Essential subject matter

The number line has positions 0,1,…,20 in numerical order with one **equal-length unit interval** between adjacent integers. In conventional number-line coordinates, larger values lie to the right and smaller values to the left; the arrow labelled increasing and ordered tick list always determine meaning, regardless of interface RTL direction. From tick 10, two unit moves reach 12 (via 11); from 5, three unit moves reach 8 (5→6, 6→7, 7→8). Immediately before 10 is 9, immediately after 10 is 11. Strictly between 7 and 11 lie 8,9,10 (not the endpoints). Inside the shown 0–20 segment, no predecessor of 0 and no successor of 20 are displayed; this is a display boundary, not a claim numbers do not continue.

**Reference models that must remain correct:** 10 + 1 + 1 = 12; two equal gaps. 5→6→7→8: 3 intervals, 2 intermediate numbers. 9, 10, 11: immediate neighbors differ by one. 7 | 8,9,10 | 11 and 12 | 13,14,15 | 16. Every model needs an equivalent explicit spoken/written number description, not decorative illustration alone.

## Conceptual progression and dependencies

Concrete count words already known → explore equal tick spacing and step-by-one movements → contrast steps with intermediate tick count → independently name before/after → identify all strictly between → transfer to a different section of the same mathematical coordinate system.

The interdependent target Skills are taught together only where they share an intelligible representation. They retain their own independently assessable taxonomy identities. Do not infer cross-domain Skill mastery from completing one interaction.

## Misconceptions, examples and boundaries

**Likely confusions:** Counting 5→8 as two steps because two interior ticks are visible; treating unevenly spaced labels as a number line with an equal unit scale; including endpoints as strictly between; imagining that 20 has no next number in all mathematics; reversing numeric order because the UI is RTL.

**Pedagogical depth and exclusions:** Grade 1: integers 0–20, horizontal equally spaced fixed unit increments, before/after and the finite set of numbers strictly between endpoints. Do not teach signed numbers, rational interpolation, arbitrary scales, inequality symbols as the lesson target, graphical mirroring as mathematical reversal or formal coordinate arithmetic.

**Boundary and incomplete-case decisions:** A requested step beyond 0 or 20 says 'outside the displayed 0–20 segment' rather than declaring an impossible mathematical operation; never wrap the marker to the opposite end. For 0, say 'no number immediately before 0 in this displayed segment'; for 20, say 'no number immediately after 20 in this displayed segment.' Outside 0–20 is not studied or declared nonexistent.

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

- Editor/Methodologist: explicitly approve Grade 1, target Skill selection, prerequisites, depth and the core contrasts before promoting this Brief.
- Editor: review the two proposed Scene models and ensure their nonvisual, RTL and locale versions teach mathematically identical relationships.
- Coding/QA roles: confirm all supported locale dictionaries, low-device/offline delivery and accessible input alternatives when authorized. No Scene is implemented at this stage.

## Methodologist handoff

**Draft, not editor-approved.** The corresponding `content.md` and Scene specifications are **Provisional Drafts under the explicit batch instruction**. This exception does not mark the normal Methodologist or Screenwriter approval gates as passed. No React Scene, runtime Lesson, Question, Quiz, score, mastery, persistent Note or fake platform event is authorized.
