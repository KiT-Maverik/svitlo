# Grouping Brackets Playground — Scene Specification

Status: Draft
Owner: Educational Screenwriter
Parent Lesson / Section: [Three Addends, Different Groups Content](../content.md), Sections 1–4
Methodologist objectives: Count three collections of 2,3,4 objects as a constant whole of nine. Calculate (2+3)+4=9 and 2+(3+4)=9 using the same nine counters, explaining intermediate five and seven. Distinguish **regrouping** without changing any addend from changing a value or swapping order. Choose a convenient grouping for 6+4+3, making ten first and confirming that both legal groupings give thirteen. [Methodologist Brief](../methodologist-brief.md) (Draft, not approved).

## LEARNER PURPOSE AND CONCEPT

Let learners discover that the sum of three addends does not depend on which pair is combined first. Keep the addends and their roles intact, compare (2+3)+4 with 2+(3+4), and use the freedom of grouping to choose an efficient calculation. Unlike swapping addends, changing parentheses does not exchange operand order.

Learners are active in the mathematical transformation and see every count, intermediate step and verification. The Scene is not an unscored imitation of a Quiz; it provides concrete controlled exploration and exact feedback.

## ACCURATE CONTENT AND MODEL LIMITATIONS

For any three whole-number addends a,b,c, (a+b)+c = a+(b+c). Concrete case (2+3)+4=5+4=9 vs 2+(3+4)=2+7=9. Different grouping, same three original sets: 2,3,4. Transfer (6+4)+3=10+3=13 vs 6+(4+3)=6+7=13. Parentheses indicate which addition is done first, not new objects. Preserve original left-to-right addend order for this teaching example. This property extends to more addends, but the lesson's scope is exactly three addends and totals ≤20.

Believing a different intermediate total means the final sum changes, moving a counter from one original addend into another while still reporting unchanged groups, or treating parentheses as extra added quantities. Associativity regroups adjacent addends; commutativity swaps their positions. In 2+3+4, inner totals 5 and 7 differ but both final results equal nine.

**Invariant:** Total of original disjoint sets is unchanged by choosing parentheses; for [2,3,4] total nine under both groupings, for [6,4,3] total thirteen. No addend value or order changes when toggling grouping; only the highlighted pair and intermediate subtotal change.

## EXPERIENCE BEATS AND LEARNER ACTIONS

1. **Section 1, Three Collections Make Nine:** Prompt “Three separate groups have 2, 3 and 4 counters. How many counters in all?”. Display 2,3,4 counters as three persistently labeled disjoint collections with unique IDs; allow learner to count all nine without grouping first. Learner can reveal or predict before seeing the full equality. Display: **2 + 3 + 4 = 9**. Explanation: Two, three and four make nine counters. We will keep those same nine while changing which pair is counted first. Corrective feedback: If learner says five, show they have only counted the first two groups; if seven, show that only the last two have been counted.

2. **Section 2, First Two Together:** Prompt “What if we add the first two groups before the third?”. Learner selects a bracket around first pair (2+3), sees a subtotal of five, then includes the third group of four to obtain nine; labels stay attached to original groups. Learner can reveal or predict before seeing the full equality. Display: **(2 + 3) + 4 = 5 + 4 = 9**. Explanation: The first two groups make five. Then five plus four makes nine. Nothing was created or lost when we counted them as a subtotal. Corrective feedback: If a child reports five as final, point out the third group of four remains to be counted.

3. **Section 3, Last Two Together:** Prompt “Now add the last two groups first. Is the result still nine?”. On learner command, reset only subtotal emphasis and bracket 3+4, show seven, then combine with first group two for nine. Display both bracketings side by side _inside the Scene_. Learner can reveal or predict before seeing the full equality. Display: **2 + (3 + 4) = 2 + 7 = 9**. Explanation: Three and four make seven, then two plus seven makes nine. The subtotal changed from five to seven; the final sum stayed nine. Corrective feedback: If the learner thinks seven is the new final answer, show that the initial two counters are still part of the whole.

4. **Section 4, Group Six, Four and Three:** Prompt “For 6 + 4 + 3, which pair could make ten first?”. A transfer set 6,4,3 keeps thirteen unique counters; learner chooses (6+4)+3 or 6+(4+3) and inspects first subtotal ten vs seven. Both finish at thirteen. Learner can reveal or predict before seeing the full equality. Display: **(6 + 4) + 3 = 13; 6 + (4 + 3) = 13**. Explanation: Six and four make a useful ten. Adding three makes thirteen. Or four and three make seven, then six plus seven makes thirteen. Grouping helps us choose a convenient calculation. Corrective feedback: A learner who believes 6+(4+3)=16 receives a precise 4+3=7 and 6+7=13 recount; no group has changed in size.

## INTERACTIVE OBJECTS, STATES AND RULES

- Four _independent prop-free Scene entries_, one per Section. Section mode is editorial, not a public React prop or Resource_Config discriminator. Implementer may share internal math utilities but must not share per-learner UI state across placements.
- Objects and semantics: Three labeled counter trays remain in a fixed spatial sequence while a large accessible bracket and subtotal ribbon move between the first and last adjacent pairs. Do not exchange tray order when changing parentheses. Use labeled objects, native controls for each action, ordered numerical text ledger, prediction buttons, explanation and Reset/Undo.
- State: Fixed original addend arrays [2,3,4] or [6,4,3], stable counter identities, chosen grouping first-two/last-two, subtotal, reveal and expression comparison; placements independently reset.
- Rules: Total of original disjoint sets is unchanged by choosing parentheses; for [2,3,4] total nine under both groupings, for [6,4,3] total thirteen. No addend value or order changes when toggling grouping; only the highlighted pair and intermediate subtotal change. The UI must not silently change actual mathematical objects when a child selects a wrong option; incorrect statements are explicitly identified as _trials_, not true equalities.
- All instruction available on reveal without forced guesses. No grader, Note API, score event or achievement state.

## VISUAL / AUDIO / MEDIA DIRECTION

Three labeled counter trays remain in a fixed spatial sequence while a large accessible bracket and subtotal ribbon move between the first and last adjacent pairs. Do not exchange tray order when changing parentheses. Render using lightweight HTML/SVG with explicit quantities and large labels, rather than remote/generated image assets. Motion is initiated by learner and may be stepped through or skipped; reduced motion shows identical before/after numerical states instantly. No WebGL, mandatory narration, video, music, external resources or reward graphics.

## LOCALIZATION, DIRECTION AND ACCESSIBILITY

All prompts, errors, accessible labels, counts, status and control names genuinely translated across complete supported locale roster (English source is not fallback). Semantic LTR/RTL rules preserve order of mathematical operands and the meanings of exchanges, pairings and groups. A keyboard/switch/touch user can execute each step with large focusable controls and inspect the ordered textual state ledger; screen reader announces changes once. 200% zoom, reduced motion, child-size targets, responsive mobile, non-color-only signals and equivalent offline local computation after full download are required. No timed, drag-only or speech-recognition path.

## ACCEPTANCE SCENARIOS

1. Three groups 2,3,4 contain exactly nine counters.
2. First grouping (2+3)+4 produces intermediate five and final nine.
3. Second grouping 2+(3+4) produces intermediate seven and final nine.
4. For 6+4+3, legal groupings yield ten+three or six+seven, both thirteen.
5. Incorrect predictions yield the documented numerical explanation without a score; retry and full reveal remain possible.
6. Reset and independent Section entries do not leak state; no counters duplicated or secretly removed.
7. Keyboard, screen-reader, semantic RTL, reduced-motion, zoom/mobile and downloaded offline state yield the same arithmetic and explanation.

## IMPLEMENTATION DEPENDENCIES AND OPEN QUESTIONS

Generic Section Scene renderer exists; **Grouping Brackets Playground is proposed**, not implemented. Requires editorial approval of the new Methodologist Brief, separate approval of Content and this Scene spec, then Scene Designer implementation and own tests. Coding Agent verifies prop-free registration, genuine locale context and complete offline availability. Assessment Architect owns any scored Question separately. Editorial review: Explicitly separate associativity (parentheses) from previously taught addition commutativity (operand order); make-ten as an efficient example must support, not replace, the three-addend rule.
