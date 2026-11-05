# Grouping Workbench — Scene Specification

**Status:** Provisional Draft awaiting explicit Methodologist/editor approval.
**Owner:** Educational Screenwriter.
**Parent:** [Lesson Content](../content.md), Sections 1–4; [Draft Brief](../methodologist-brief.md).
**Implementation:** New proposed **prop-free** Scene entries; not React implementations.

## Pedagogical purpose, mathematical contract and scope

Parentheses define a subexpression whose result is used by the outer expression. Changing a grouped subexpression **can** change the value but need not. The Workbench shows the exact original mathematical syntax throughout, highlighting the current subexpression but not moving or deleting parentheses invisibly. Operations are performed according to the specified grouping and conventional precedence. Nested groupings and mixed division are deferred beyond the core Grade 3 experience, not removed from the full Skill definition.

## Entry A — two subtraction groupings (Section 1)

Display two complete expressions **(10 − 4) − 2** and **10 − (4 − 2)** side by side _within the self-contained Scene_; their outer Section remains vertically ordered. Prompt “Same numbers and signs: same result?” The learner selects the first grouped portion to inspect, then the outer stage. First: evaluate **10 − 4 = 6**, then **6 − 2 = 4**. Second: **4 − 2 = 2**, then **10 − 2 = 8**. Show both full calculations in a structured text ledger. For “same”: “One expression ends at four and the other at eight; the parenthesized group differs.” For “different”: “The brackets change which subtraction happens first.” Preserve minus operand order even if the viewport/layout is RTL.

## Entry B — multiplication plus addition (Section 2)

Start with **2 × (3 + 4)**, represented as two equal groups of **seven** counters. Child predicts which operation comes first, reveals inside **3 + 4 = 7**, then outside **2 × 7 = 14**. Now compare the explicitly **unparenthesized** expression **2 × 3 + 4**. Under agreed precedence, it means **(2 × 3) + 4**, so **6 + 4 = 10**. The learner chooses among 10, 14, and an explanation. For 14 as unparenthesized result, reply “That would group three plus four first, but this version has no parentheses; multiplication comes before addition.” For 10: “Two times three makes six; then four more gives ten.” Numerically label each group; never visually imply that adding four occurs twice.

## Entry C — different grouping, same total (Section 3)

Display **(2 + 3) + 4** versus **2 + (3 + 4)** with explicit controllable reveal steps. Left: **2+3=5**, **5+4=9**. Right: **3+4=7**, **2+7=9**. Ask whether parentheses _always_ force a different answer. Feedback for “always”: “Both groups were evaluated as written, but both totals are nine.” Feedback for “not always”: “Yes, parentheses still determine a step, even if two arrangements yield the same final value.” A display of nine counted objects can optionally reinforce this but is not the sole evidence.

## Entry D — independent transfer (Section 4)

New expression **3 × (2 + 5)** with empty stage ledgers. Learner chooses the parenthesized group **2+5**, enters **7**, then uses 3×7=**21**. Distractor **11** comes from incorrectly treating expression as **3×2+5**; explain explicitly that 3×2+5 would be a _different written expression_. Show “first the group; next the outside multiplication.” Hints “Find what's inside ( )” then “How many groups of seven?” are optional, and “Reveal complete reasoning” is always available without a guess or score.

## Data, interactive controls, and numeric invariants

Each entry owns fixed complete expression AST/parsed structure _as an implementation concern_; the editorial spec requires operands/operation/grouping to remain immutable unless a separate comparison expression is explicitly shown. It owns learner's prediction, current focused subexpression, revealed step results, hints and explanation visibility. The nested displayed segment must correspond exactly to the original parentheses; evaluate numeric values consistently. Do not infer “always different” based on the mere presence of parentheses. Never allow a learner choice to silently change the expression while marking it correct. Public Scene has **no props**, no shared state between Sections, no Question/Quiz score, API call or Note persistence.

## Visual/audio, inclusive access and localization

The full expression is presented as text with an accessible verbal structure (e.g. “open parenthesis ten minus four close parenthesis, then minus two”), plus a stage ledger (“inside group”, “outside operation”). Highlighting may use shape/outline and labels, never only color. Every “Check inner group,” “Next step,” “Show comparison,” “Hint,” “Reset” control works by keyboard, touch and switches; optional animated grouping has a completely equivalent reduced-motion/static version. Screen readers announce original expression, selected group, computed interim value, next operation and final result. RTL must preserve mathematical formula syntax and operand order with appropriate bidi isolation; do not reverse the minus sign's direction or multiplication group count. Translate full mathematical readings, labels and error feedback genuinely for all supported locales, with accurate localized phrasing and no English fallback. Use visible focus, accessible target sizes, zoom/mobile reflow and offline-equivalent selected locale assets once downloaded; the current PWA implementation is not guaranteed.

## Future acceptance scenarios

1. (10−4)−2=4; 10−(4−2)=8; equal numbers/signs but different grouping and values.
2. 2×(3+4)=14; 2×3+4=10, not 14, under standard multiplication-before-addition convention.
3. (2+3)+4=9 and 2+(3+4)=9; parentheses can preserve the result.
4. 3×(2+5)=21; 11 is the result of the different expression 3×2+5.
5. Hints, independent resets, accessible text ledgers and exact calculation checks have no score or dependency on previous Section state.
6. Keyboard, screen reader, RTL, zoom, reduced motion and offline-downloaded variants preserve the grouping and results.

## Implementation and editorial gate

Only generic Scene resources are known to render; this particular Workbench and its multilingual dictionaries are **proposed**. Coding Agent must verify the current Scene localization context and implement tested, accessible, self-contained no-props components after approvals. No runtime Lesson, Question, Quiz, scoring, backend, progress or Note event is implemented.
