# How Much Change Comes Back? — Methodologist Brief

Date: 2026-10-31
Lesson slug: calculateChangeInEuros
Methodologist status: Draft
Code: [Not implemented](#)
Program dependence: None

## Educational purpose

Compute change as the nonnegative difference between sufficient payment and price; verify by adding price and change to get the paid amount, distinguishing both exact payment and insufficient payment from positive change.

## Target audience

**Primary audience: Grade 2.** Grade 2 learners with concrete whole-euro amount composition and subtraction/missing-part reasoning. All checkout objects are schematic; no financial transaction or spending data is recorded. This Grade is a pedagogical choice of the Lesson, never a ceiling on the independent canonical Skill.

## Prerequisites

Recognize euro coins and notes (`recognizeDenominations`) and sum/compare amounts (`composeAmount`, `compareAmounts`). Know subtraction or missing-addend reasoning within 20 from mathematics. Euro remains the named instructional currency in every language.

## Target Skills

- [calculateChange.data.ts](../../../../data/skills/money/transactions/skills/calculateChange.data.ts)

## Expected learning outcomes

- Find €4 change on €10 paid for €6 and check the €6+€4=€10 equality.
- Find €3 change on €10 paid for €7 and compose it from €2+€1.
- For €11 cost with €15 paid as two real notes, compute/verify €4 change.
- Reject a cashier's €3 return on €8 paid with €10 and correct it to €2.
- Recognize €5 payment for €8 is insufficient by €3, and €10 for €10 has €0 change.

The outcomes are intentions for formative explanation, not validated Skill-mastery evidence.

## Essential subject matter

For payment M at least price P in the same currency, change C=M−P and price+change=payment. Example: €10 paid for €6 yields €4, using two real €2 coins; €10 paid for €7 yields €3, using €2+€1. €15 paid as €10+€5 for a €11 purchase yields €4, since 11+4=15. Proposed €3 change on an €8 item paid with €10 is wrong because 8+3=11>10; €2 is correct. If €5 is paid for a price of €8, payment is insufficient by €3 and there is no nonnegative returned change. Exact €10 paid for €10 price returns €0. Never present negative euros as cash returned or invent ordinary euro coins of denomination €3 or €4.

## Conceptual progression and dependencies

Recall euro denomination value → find the missing amount between price and sufficient payment → build change with genuine coins → check price+return=paid → transfer to composite payment → detect over-return and insufficient/exact cases.

The pedagogically related Skills remain independently assessable objects with their own original UUIDs. No aggregate Skill definition or invented override is created.

## Misconceptions, examples and boundaries

**Common misconceptions:** Subtracting payment from cost and treating a negative as returned change; treating the price itself as change; counting the number of cash pieces rather than value; believing exact payment gives money back; accepting a cashier's return without checking the price+return equality.

**Target depth and exclusions:** Whole-euro prices/payments through €15, authentic €1,€2 coins and €5,€10 notes, simple paid≥price core examples and insufficient/exact boundary. No cents, budgeting, unit prices, taxes, discounts or speed calculations.

**Exact examples:**

- €10−€6=€4; €6+€4=€10.
- €10−€7=€3; €7+€2+€1=€10.
- €10+€5=€15; €15−€11=€4; €11+€4=€15.
- €8+€2=€10; €8−€5=€3 shortfall; €10−€10=€0 change.

## Localization, accessibility and offline intent

All learner-facing prompts, controls, errors, numerals/number words, object identities, accessible state messages and Notes require **genuine translations for every current Engine-supported locale**, with no fallback. Mathematical order, operand identities, currency units and grouping must be preserved in semantic RTL, not flipped mechanically. WCAG 2.2 AA: touch/keyboard/switch controls, visible focus, nonvisual ordered evidence ledger, color-independent status, reduced motion, high zoom and mobile support. Equivalent selected-language instructional data and interaction must remain usable once downloaded offline; these are **requirements, not delivered production features**.

English is editorial source copy, not a completed locale implementation. For the money lesson the euro is an **explicit case-study currency** in all locales, and another real currency would require separate verified denominations, texts and editorial approval.

## Sources and factual verification

- Canonical Skill source files in the Target Skills section, preserved byte-for-byte in the earlier migration from Mathematics `main`.
- [Lesson Editorial Architecture](../../../../../../studio/docs/architecture/lesson-editorial-document.md), [Learning Philosophy](../../../../../../studio/docs/architecture/learning-experience-philosophy.md).
- [Internationalization/Accessibility](../../../../../../studio/docs/architecture/internationalization-and-accessibility.md) and [Offline Architecture](../../../../../../studio/docs/architecture/offline-first-and-device-compatibility.md).
- [ECB euro coins](https://www.ecb.europa.eu/euro/coins/html/index.en.html) and [ECB banknotes](https://www.ecb.europa.eu/euro/banknotes/current/html/index.en.html): actual euro denomination references for the preceding money case study.

No named national Curriculum or attainment standards are claimed.

## Curriculum / Program compatibility

Standalone, Program-neutral. Lesson sequence derives from prerequisite relationships, not a national course binding.

## Open editorial decisions

- Editor to approve Grade 2, canonical targets, numerical boundaries, prerequisite claims and proposed contrasting examples.
- Editor to review every Content and proposed Scene separately after the Methodologist Brief; localization and offline/accessibility implementations need QA.
- Money cases use fictional classroom prices but real EUR denominations; confirm currency choice for target readers before implementation.

## Methodologist handoff

**Draft, not approved.** The accompanying Content and Scene specs are **Provisional Drafts under the explicit batch instruction**, not evidence that the normal Methodologist approval gate has passed. No React, runtime Lesson, Questions, Quiz, scores, mastery evidence, Note storage or undocumented API is authorized.
