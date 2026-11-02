# Ten Tens Become a Hundred — Methodologist Brief

Date: 2026-10-31
Lesson slug: tenTensMakeAWholeHundred
Methodologist status: Draft
Code: [Not implemented](#)
Program dependence: None

## Educational purpose

Discover ten tens are exactly one hundred ones and count by repeated additions of a complete ten, including crossing a hundred while keeping remaining ones unchanged.

## Target audience

**Primary audience: Grade 2.** Grade 2 with grouped number models through 100; slight extension to 105/110 is supported by explicit one-hundred-plus-remainder groups rather than requiring unscaffolded reading of three digits. This Grade is a pedagogical choice of the Lesson, never a ceiling on the independent canonical Skill.

## Prerequisites

Know one ten contains ten ones (`makeTen`), tens/ones grouping (`tensOnes`), and count/read through 100 from the previous Lesson (`readWrite100`, `forward100`). Understand group count is different from member count.

## Target Skills

- [makeHundred.data.ts](../../../../data/skills/numeration/placeValue/skills/makeHundred.data.ts)
- [countBy10.data.ts](../../../../data/skills/counting/steps/skills/countBy10.data.ts)

## Expected learning outcomes

- Build ten different bundles of ten objects, showing exactly one hundred individual items.
- Exchange those ten bundles into one hundred and reverse the exchange, preserving identities and total.
- Count 75,85,95,105 by +10, keeping five loose ones unchanged.
- Count 90,100,110 by +10 and identify the regrouping at 100.
- Explain group number versus the quantity of individual objects.

The outcomes are intentions for formative explanation, not validated Skill-mastery evidence.

## Essential subject matter

One group of ten has 10 objects. Ten separate ten-groups contain 100 distinct objects, and repacking them into one hundred-block preserves all 100: ten tens = one hundred = one hundred ones. Each count-by-ten move adds exactly one complete ten and keeps any remaining ones fixed. From 75: 75→85→95→105 has five ones throughout; at 105 the ten full tens regroup into one hundred. From 90: 90→100→110 has nine, then ten tens, then one hundred and one ten. +10 is never the addition of just one loose unit.

## Conceptual progression and dependencies

Ten ones become one ten → collect ten different tens → exchange for hundred and undo → add tens to a number with five loose ones → cross hundred via regrouping → independent zero-loose-one challenge.

The pedagogically related Skills remain independently assessable objects with their own original UUIDs. No aggregate Skill definition or invented override is created.

## Misconceptions, examples and boundaries

**Common misconceptions:** Ten ten-bundles are only ten beads; a hundred-block is only one bead; 95+10=96; 95+10=915; ones digit changes during +10; exchanging a hundred-block loses members.

**Target depth and exclusions:** Ten-tens and one-hundred equivalence plus brief step cases to 105/110. No general three-digit reading curriculum, multiplication algorithm, counting by 100, or calculation beyond demonstrated full ten-bundles.

**Exact examples:**

- 10+10+10+10+10+10+10+10+10+10=100.
- 10 tens = 1 hundred = 100 ones, with zero added or removed.
- 75+10=85, 85+10=95, 95+10=105; ones remainder stays 5.
- 90+10=100; 100+10=110.

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
