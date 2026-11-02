# Say It With a Sign: Less, Greater, Equal — Methodologist Brief

Date: 2026-10-31
Lesson slug: compareNumbersWithSymbols
Methodologist status: Draft
Code: [Not implemented](#)
Program dependence: None

## Educational purpose

Use <, > and = as precise relational signs between two numerical quantities, retaining their meaning when the operands change order and when the interface changes language or direction.

## Target audience

**Primary audience: Grade 2.** Grade 2 children who can compare collections and read numbers up to 20. They can explain which is more/less/equal before encountering operator glyphs; the notation extends an understood relationship, not a memorized mouth-shaped picture.

The Grade determines this particular Lesson's pedagogical depth; canonical Skills remain grade-neutral.

## Prerequisites

- Compare finite collections and spoken numerals using `compareSets` and `moreLessEqual`.
- Recognize and order 0–20 numerals using `readWrite20` and `order20`.
- Understand equality of quantities, including different-looking sets that have the same count.

## Target Skills

- [comparisonSymbols.data.ts](../../../../data/skills/numeration/comparison/skills/comparisonSymbols.data.ts)

## Expected learning outcomes

- Read 8 < 12, 12 > 8 and 7 = 7 aloud and explain each using countable values.
- Choose <, > or = for small new numerical pairs, including equal collections in different layouts.
- Explain why swapping distinct operands requires reversing an inequality but not equality.
- Reject a false comparison such as 12 < 8 and correct it with evidence.
- Transfer the relation to 16 and 9 without relying on the previous numbers.

These are intended learning outcomes and observable formative explanations, not guaranteed mastered competencies or validation thresholds.

## Essential subject matter

The statement a < b means a is less than b, a > b means a is greater than b, and a = b means they have equal values. For 8 and 12, 8 < 12 is true, while 12 > 8 expresses the **same** quantitative relationship after swapping operand order. Leaving < in place after swapping makes 12 < 8 false. Equality stays equality after swapping the same values: 7 = 7 in either order. The glyphs are mathematical operators with fixed operand order; they are not words to mirror for Arabic/Hebrew layout. The mathematical pair is isolated directionally so the left operand and right operand remain the intended numbers.

**Reference models that must remain correct:** 8 < 12; 12 is four more than 8, so they are not equal. 7 = 7, whether spread or close together. 8 < 12 and 12 > 8 express the same fact. 7=7; 16>9; 9<16. Every model needs an equivalent explicit spoken/written number description, not decorative illustration alone.

## Conceptual progression and dependencies

Concrete more/fewer/same from two sets → connect spoken language to relational signs → test three sign choices with worked evidence → swap operands and watch truth value → maintain equality under a swap → transfer to novel numbers and semantic RTL.

The interdependent target Skills are taught together only where they share an intelligible representation. They retain their own independently assessable taxonomy identities. Do not infer cross-domain Skill mastery from completing one interaction.

## Misconceptions, examples and boundaries

**Likely confusions:** Choosing > for 8 and 12 because the pictogram 'opens to the right'; keeping the same sign when 8 and 12 are swapped; confusing the equality sign with 'answer comes next'; changing sign direction automatically under RTL; mistaking 7=7 for more just because the second group looks wider.

**Pedagogical depth and exclusions:** Grade 2, pairs of nonnegative integers 0–20, comparisons justified by quantity models or an equal-scale line; no chain inequalities, negative values, decimals, algebraic equation solving or crocodile-mouth mnemonic as the sole explanation.

**Boundary and incomplete-case decisions:** Do not imply the sign choice is a score; a child can inspect exact quantities before or after a prediction. Equal-value counts require the same sign even when one visual row is longer. The sign must not be mirrored as a mere visual RTL effect; only the explicit user-operable Swap action changes operand order. Swapping identical values does not require changing =.

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
