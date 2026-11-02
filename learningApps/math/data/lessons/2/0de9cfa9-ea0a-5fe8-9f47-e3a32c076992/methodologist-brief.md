# Three Addends, Different Groups — Methodologist Brief

Date: 2026-10-31
Lesson slug: additionAssociative
Methodologist status: Draft
Primary audience: **Grade 2** within grades 1–3
Code: Not implemented
Program dependence: None

## Educational purpose

Let learners discover that the sum of three addends does not depend on which pair is combined first. Keep the addends and their roles intact, compare (2+3)+4 with 2+(3+4), and use the freedom of grouping to choose an efficient calculation. Unlike swapping addends, changing parentheses does not exchange operand order.

## Target audience

Grade 2. The prerequisite knowledge, not an age stereotype, determines placement. The canonical Skill itself remains grade-independent.

## Prerequisites

- Count and add at least three small collections, each up to 9 objects.
- Understand a total formed by adding two quantities and read '+' and '='.
- Distinguish rearranging groups from adding or removing objects; familiarity with commutative addition helps but is not required.

## Target Skills

- [associativeAddition.data.ts](../../../../data/skills/arithmetic/addition/skills/associativeAddition.data.ts)

## Expected learning outcomes

- Count three collections of 2,3,4 objects as a constant whole of nine.
- Calculate (2+3)+4=9 and 2+(3+4)=9 using the same nine counters, explaining intermediate five and seven.
- Distinguish **regrouping** without changing any addend from changing a value or swapping order.
- Choose a convenient grouping for 6+4+3, making ten first and confirming that both legal groupings give thirteen.

## Essential subject matter

For any three whole-number addends a,b,c, (a+b)+c = a+(b+c). Concrete case (2+3)+4=5+4=9 vs 2+(3+4)=2+7=9. Different grouping, same three original sets: 2,3,4. Transfer (6+4)+3=10+3=13 vs 6+(4+3)=6+7=13. Parentheses indicate which addition is done first, not new objects. Preserve original left-to-right addend order for this teaching example. This property extends to more addends, but the lesson's scope is exactly three addends and totals ≤20.

## Conceptual progression and dependencies

1. Three Collections Make Nine: Display 2,3,4 counters as three persistently labeled disjoint collections with unique IDs; allow learner to count all nine without grouping first.
2. First Two Together: Learner selects a bracket around first pair (2+3), sees a subtotal of five, then includes the third group of four to obtain nine; labels stay attached to original groups.
3. Last Two Together: On learner command, reset only subtotal emphasis and bracket 3+4, show seven, then combine with first group two for nine. Display both bracketings side by side _inside the Scene_.
4. Group Six, Four and Three: A transfer set 6,4,3 keeps thirteen unique counters; learner chooses (6+4)+3 or 6+(4+3) and inspects first subtotal ten vs seven. Both finish at thirteen.

## Misconceptions, examples and boundaries

Believing a different intermediate total means the final sum changes, moving a counter from one original addend into another while still reporting unchanged groups, or treating parentheses as extra added quantities. Associativity regroups adjacent addends; commutativity swaps their positions. In 2+3+4, inner totals 5 and 7 differ but both final results equal nine.

## Localization, accessibility and offline intent

All child-facing strings require genuine translations across the supported language roster; no silent fallbacks. The mathematical model must provide countable text/keyboard/screen reader equivalents, semantic RTL math, accessible labels for each group and exchange, reduced motion, touch targets, zoom and offline feedback after content download. Source copy is English editorial material, not a release locale implementation.

## Sources and factual verification

- [Canonical Skill Code](../../../../data/skills/arithmetic/addition/skills/associativeAddition.data.ts), unchanged Mathematics entity, UUID and translations.
- [English Playground Skill taxonomy](../../../../docs/generated/skills/taxonomy.en.md), coordinator-owned generated view that must be regenerated after integration.
- [Common Core mathematics standards](https://corestandards.org/mathematics-standards/) as a comparative reference only; not a national curriculum approval.

## Curriculum / Program compatibility

Not specified. Grade 2 is the primary intended audience for this Lesson, not a numerical depth ceiling for the Skill.

## Open editorial decisions

- Explicitly separate associativity (parentheses) from previously taught addition commutativity (operand order); make-ten as an efficient example must support, not replace, the three-addend rule.
- Confirm learner accessibility, semantic localization, exact state invariants and audience readiness before implementation.

## Methodologist handoff

**Draft, not approved.** Provisional Screenwriter documents may accompany this Brief for review, but do not imply editor approval, scored assessment, implementation or live Lesson registration.
