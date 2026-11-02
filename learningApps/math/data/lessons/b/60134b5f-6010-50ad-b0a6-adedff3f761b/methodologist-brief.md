# Compare Tens First: Ordering Numbers to 100 — Methodologist Brief

Date: 2026-10-31
Lesson slug: compareAndOrderTwoDigitNumbers
Methodologist status: Draft
Code: [Not implemented](#)
Program dependence: None

## Educational purpose

Compare and arrange two-digit numbers by the more significant tens place first and the ones only when tens are equal. Justify order using quantities rather than numeral appearance.

## Target audience

**Primary audience: Grade 2.** Grade 2 learners who read and model two-digit numbers, know signs <, >, =, and can already sort small values within 20. The new challenge is a place-value priority rule, not an alphabetic sort. This Grade is a pedagogical choice of the Lesson, never a ceiling on the independent canonical Skill.

## Prerequisites

Read/compose numbers through 100 (`readWrite100`), make tens and ones (`tensOnes`), use <,>,= (`comparisonSymbols`), and order simple numbers through 20 (`order20`).

## Target Skills

- [order100.data.ts](../../../../data/skills/numeration/comparison/skills/order100.data.ts)

## Expected learning outcomes

- Justify 47<52 and 29<31 by comparing tens before ones.
- Compare 63<68 by examining ones only after matching tens.
- Identify 72=72 despite different group spacing.
- Sort four cards 42,29,71,24 into 24,29,42,71 and explain at least one adjacent relation.
- Independently order 90,86,80,69 from greatest to smallest without deleting any card.

The outcomes are intentions for formative explanation, not validated Skill-mastery evidence.

## Essential subject matter

Compare tens first in two-digit decimal numbers: 47<52 because four tens<five tens even though seven ones>two ones; 29<31 because two tens<three. When tens match, compare remaining ones: 63<68 since both have six tens but three ones<eight. Identical values are equal: 72=72 even if counters are rearranged. Sort 42,29,71,24 ascending as 24,29,42,71. Sort 90,86,80,69 descending as 90,86,80,69. The tens-place rule, not the last digit's graphic size, determines magnitude.

## Conceptual progression and dependencies

Concrete tens bundles → misleading ones-digits counterexample → equal-tens ones tie-breaker → equality model → ascending sort by true magnitudes → new descending challenge.

The pedagogically related Skills remain independently assessable objects with their own original UUIDs. No aggregate Skill definition or invented override is created.

## Misconceptions, examples and boundaries

**Common misconceptions:** 47>52 because 7>2, 29>31 because 9>1, 63 and 68 assumed equal because both show six tens, confusing 80 and 86 due to zeros, dropping one item during ordering, mirroring <,> under RTL.

**Target depth and exclusions:** Grade 2 values 10–99, small two- to four-card sets, repeated equal values allowed if introduced, actual tens-and-ones evidence. No hundreds-place generalization, decimals, negatives, rounding or speed sorting drills.

**Exact examples:**

- 47=40+7<50+2=52; 29<31.
- 63<68; 72=72.
- 24<29<42<71.
- 90>86>80>69.

## Localization, accessibility and offline intent

All learner-facing prompts, controls, errors, numerals/number words, object identities, accessible state messages and Notes require **genuine translations for every current Engine-supported locale**, with no fallback. Mathematical order, operand identities, currency units and grouping must be preserved in semantic RTL, not flipped mechanically. WCAG 2.2 AA: touch/keyboard/switch controls, visible focus, nonvisual ordered evidence ledger, color-independent status, reduced motion, high zoom and mobile support. Equivalent selected-language instructional data and interaction must remain usable once downloaded offline; these are **requirements, not delivered production features**.

English is editorial source copy, not a completed locale implementation. For the money lesson the euro is an **explicit case-study currency** in all locales, and another real currency would require separate verified denominations, texts and editorial approval.

## Sources and factual verification

- Canonical Skill source files in the Target Skills section, preserved byte-for-byte in the earlier migration from Mathematics `main`.
- [Lesson Editorial Architecture](../../../../../../studio/docs/architecture/lesson-editorial-document.md), [Learning Philosophy](../../../../../../studio/docs/architecture/learning-experience-philosophy.md).
- [Internationalization/Accessibility](../../../../../../studio/docs/architecture/internationalization-and-accessibility.md) and [Offline Architecture](../../../../../../studio/docs/architecture/offline-first-and-device-compatibility.md).

No named national Curriculum or attainment standards are claimed.

## Curriculum / Program compatibility

Standalone, Program-neutral. Lesson sequence derives from prerequisite relationships, not a national course binding.

## Open editorial decisions

- Editor to approve Grade 2, canonical targets, numerical boundaries, prerequisite claims and proposed contrasting examples.
- Editor to review every Content and proposed Scene separately after the Methodologist Brief; localization and offline/accessibility implementations need QA.
- Money cases use fictional classroom prices but real EUR denominations; confirm currency choice for target readers before implementation.

## Methodologist handoff

**Draft, not approved.** The accompanying Content and Scene specs are **Provisional Drafts under the explicit batch instruction**, not evidence that the normal Methodologist approval gate has passed. No React, runtime Lesson, Questions, Quiz, scores, mastery evidence, Note storage or undocumented API is authorized.
