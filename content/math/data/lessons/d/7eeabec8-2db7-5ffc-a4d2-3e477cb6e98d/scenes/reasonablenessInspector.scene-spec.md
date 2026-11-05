# Reasonableness Inspector — Scene Specification

Status: Provisional Draft — pending Methodologist approval
Owner: Educational Screenwriter
Parent: [Lesson Content](../content.md), Sections 1–4
Methodologist source: [Draft Brief](../methodologist-brief.md)

## Learning purpose and precision

Develop the habit of checking that an answer fits the approximate magnitude and physical context before relying on it. A plausibility judgment is **not** a mathematical proof of exact correctness. Display estimates with ≈ or words “about”; never present rounded benchmarks as exact totals.

## Experience beats

1. Start with 98 books and 105 books; claim “2,000 books altogether.” Ask “Does the size make sense?” Offer “roughly 200” and “roughly 2,000” reference models. Learner can compare two groups each near 100 without calculating precisely.
2. On selection, reveal “98 is near 100. 105 is near 100. Together they are near 200.” If 2,000 selected: “That would be about ten times as many books. We only had two groups of about a hundred.”
3. Show candidates 199, 203 and 2,000. Both 199 and 203 are plausible magnitudes; only 203 equals 98+105 exactly. State this distinction explicitly. If learner marks 199 exact: “The estimate alone cannot decide between 199 and 203. Exact addition gives 203.”
4. Context variation: 14 children at a table, 3 leave; proposed result -11 children. Ask if negative children can remain in this ordinary count. Reveal 14−3=11 and “A count of children present cannot be negative here.” Never extend this claim to financial debt or other valid negative-quantity contexts.
5. Independent transfer: 49 notebooks plus 52 notebooks, claim 1,010. Learner chooses their own benchmark near 50+50≈100 and explains rejection. Exact total 101 is optionally revealed after the estimate; wrong feedback identifies the two roughly-fifty groups.
6. Every example has “Reveal benchmark”, “Why?”, and “Reset” controls available without score or timers. Sections open in independent starting states.

## Numeric and state invariants

Reference claims, contextual units, exact totals and approximate benchmarks are stored separately. For 98+105 exact=203, estimate≈200. For 14−3 exact=11, proposed -11 is contextually invalid. For 49+52 exact=101, estimate≈100, proposed 1,010 implausible. A plausibility verdict must not automatically mark a nearby proposed answer exactly correct. State consists only of local chosen estimate, examined quantities, selected claim and explanation reveal. It does not persist a learner result.

## Visual and nonvisual equivalents

Use proportional grouped hundreds/tens as explanatory visuals, with text labels carrying all numeric claims. An estimated benchmark is announced as approximate; “exact” labels always accompany actual arithmetic. Give numerical and conceptual feedback, not merely red/green signals. Ensure complete screen reader announcement of scenario, estimate, claim and the reason; all controls have keyboard/touch alternatives, visible focus and no timing requirement. Reduced motion and low-power devices receive the same numbers and conclusions. Semantic RTL preserves reading order and relation signs. Translate every story, unit and feedback genuinely into all supported languages and ship complete offline resources.

## Acceptance cases

- 98+105=203 exact, near 200; 2,000 is implausible.
- 199 has plausible magnitude but is not the exact sum.
- 14−3=11 children; -11 is not a valid remaining count in this setting.
- 49+52=101 exact and near 100; 1,010 implausible.
- Hints never falsely certify exact correctness; learners can reveal reasoning without responding.
- Screen reader, mobile zoom, RTL, keyboard, reduced motion and offline all present matching mathematical outcomes.

## Production dependencies

Proposed prop-free Scene with explicit per-entry scenario state, not a shipped renderer. Actual Scene context and typed Resource integration require Coding Agent verification; no Question, score, mastery API or Note event is assumed.
