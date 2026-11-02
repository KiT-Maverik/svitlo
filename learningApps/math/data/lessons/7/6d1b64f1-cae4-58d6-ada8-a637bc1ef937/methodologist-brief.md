# Numbers Across the Tens: Read and Count to 100 — Methodologist Brief

Date: 2026-10-31
Lesson slug: readAndCountToOneHundred
Methodologist status: Draft
Code: [Not implemented](#)
Program dependence: None

## Educational purpose

Read and compose whole-number numerals through 100 using tens and ones, then advance or retreat exactly one unit across ten boundaries without restarting the count.

## Target audience

**Primary audience: Grade 2.** Grade 2 early readers with concrete tens-and-ones experience. Use short prompts, stable visual counters and exact spoken/text equivalents; support 100 as an endpoint through ten groups of ten. This Grade is a pedagogical choice of the Lesson, never a ceiling on the independent canonical Skill.

## Prerequisites

Reliable count forward and backward within 20 (`forward20`, `backward20`); ten equals ten ones (`makeTen`); two-digit quantity as tens and ones (`tensOnes`); recognition of single digits. No assumed fluency with three-digit numbers.

## Target Skills

- [readWrite100.data.ts](../../../../data/skills/numeration/notation/skills/readWrite100.data.ts)
- [forward100.data.ts](../../../../data/skills/counting/sequence/skills/forward100.data.ts)

## Expected learning outcomes

- Match 42/24 with the correct distinct ten-bundle and unit arrangements.
- Recognize 70 as seven tens with no loose units, rather than 7.
- Count 28→29→30→31 and backward 31→30→29→28 with each step ±1.
- Count 98→99→100 and 100→99, using ten bundles at 100.
- Independently move forward 58→59→60 without beginning from one.

The outcomes are intentions for formative explanation, not validated Skill-mastery evidence.

## Essential subject matter

A written two-digit numeral represents complete tens and remaining ones: 42 has four tens and two ones, whereas 24 has two tens and four ones; 70 has seven tens and zero ones and is not 7. Each neighboring number differs by exactly one: 28→29→30→31, 31→30→29→28, 98→99→100 and 100→99. At 100, ten complete tens become one hundred; this is a _three-digit endpoint_, not an example of a two-digit numeral. The selected 0–100 exercise range has boundaries but the wider number sequence does not end at 100.

## Conceptual progression and dependencies

Review known tens/ones → contrast numerals with swapped positions → model zero loose ones → advance by single objects across 29/30 → reach the 100 endpoint and reverse → transfer from a new start.

The pedagogically related Skills remain independently assessable objects with their own original UUIDs. No aggregate Skill definition or invented override is created.

## Misconceptions, examples and boundaries

**Common misconceptions:** Mixing 42 and 24, treating zero ones as permission to omit 0 from 70, saying 29→210 or 99→910, jumping from 30 backward to 20, or asserting no numbers exist beyond this displayed range.

**Target depth and exclusions:** Only numbers 0–100 and one-by-one forward/backward changes, with concrete tens and ones. No tens-addition algorithms, arbitrary hundreds operations, negative numbers, score or rapid number-recitation test.

**Exact examples:**

- 4×10+2=42; 2×10+4=24.
- 7 tens +0 ones=70, not 7.
- 28,29,30,31 and 31,30,29,28, each adjacent difference is one.
- 98+1=99, 99+1=100, 100−1=99; 58→59→60.

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
