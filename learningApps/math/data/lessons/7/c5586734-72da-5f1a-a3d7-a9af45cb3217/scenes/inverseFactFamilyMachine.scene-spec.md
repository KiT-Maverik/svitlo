# Inverse Fact Family Machine — Scene Specification

Status: Draft
Owner: Educational Screenwriter
Parent Lesson: [Check Division with Multiplication Content](../content.md), Sections 1–4
Methodologist source: [Methodologist Brief](../methodologist-brief.md), currently Draft, not approved

## LEARNER PURPOSE AND CONCEPT

Teach that exact division and multiplication undo one another, so a product and one known nonzero factor determine the remaining factor. A quotient can be FOUND or CHECKED by multiplication, and the verification must reconstruct the ORIGINAL dividend. Children build 3 groups of 4 = 12, see 12 ÷ 3 = 4 and 12 ÷ 4 = 3, then use a new 20 ÷ 5 = 4 case.

This is a structured mathematical **investigation** with independently operable data views and explicit operand roles, not a pure quiz or image-only drag task.

## ACCURATE CONTENT AND MODEL LIMITATIONS

For exact whole-number division A÷d=q with d>0, d×q=A. With 3 groups of 4 there are 12 counters, so 3×4=12, 12÷3=4, and 12÷4=3 in the appropriate grouping interpretation; both division expressions are exact because 12=3×4. For 20÷5=4, 5×4=20 confirms the proposed quotient. A wrong proposed 20÷5=5 would imply 5×5=25, which does NOT reconstruct twenty. For 12÷3=5, check 3×5=15 and reject. This is not a claim that every possible division yields a whole-number quotient; work only with exact divisions and nonzero divisors. Avoid division by zero, multiplication of negative/fractional factors and automatic interchange of symbolic roles in a story.

**Critical invariants:** Check value = divisor×candidate quotient. A trial is correct only when this product equals the original dividend and positive divisor is nonzero. 12÷3=4 checks 3×4=12; 12÷4=3 checks 4×3=12; 20÷5=4 checks 5×4=20. Every physical model uses exactly the original number of counters without duplication.

**Known misconceptions:** Confusing the check 3×4=12 with a claim that the quotient itself is twelve; mixing 12÷3=4 and 12÷4=3 without relabeling number of groups versus size; accepting wrong results because the multiplication looks familiar; adding divisor+quotient instead of multiplying; assuming d×q=A verifies a non-exact quotient without remainder. Keep the original dividend prominently visible during every check. Do not present false quotient identities as correct; when a candidate is wrong, label the computation as a trial and show the actual value.

## EXPERIENCE BEATS AND LEARNER ACTIONS

1. **Section 1: From Three Times Four to Twelve.** Learner prompt: “Three equal groups have four counters in each. What multiplication equation names all twelve?”. Show 3 labeled groups × 4 each (12 unique counter IDs) and a native 'Build product' action. Display 3×4=12 and label group count 3, group size 4, product 12. Show exact equation **3 × 4 = 12** and explain: Three groups of four make twelve. We will use this known whole to explore what happens when the group count or group size is asked for. For an error: If eleven is chosen, enumerate all three groups of four; if seven, explain three plus four is not how many objects are in all groups. “Show why” and “Reset” are available without a prediction.

2. **Section 2: Undo Multiplication by Sharing.** Learner prompt: “If twelve are shared among three groups, how many are in each? Which multiplication checks it?”. Re-use the 12-counter group model, not duplicate counters. Present total 12 and three groups, reveal four each; show exact 12÷3=4 then 'Check' 3×4=12, with all numerical roles named. Show exact equation **12 ÷ 3 = 4; 3 × 4 = 12** and explain: Twelve divided by three gives four in each group. Three groups times four each make the original twelve, so our quotient fits. For an error: If a learner proposes five, evaluate 3×5=15 and show it cannot match the original total twelve; the candidate remains a clearly labeled trial, not a true equality. “Show why” and “Reset” are available without a prediction.

3. **Section 3: Another Division From the Same Product.** Learner prompt: “What if each group must contain four? How many groups of four can we make from twelve?”. Change the story label to 'four in each', revealing three groups; annotate 12÷4=3, and check divisor 4 × quotient 3 = 12. Show both division facts next to 3×4=12 with their story labels. Show exact equation **12 ÷ 4 = 3; 4 × 3 = 12** and explain: Twelve contains three complete groups of four. Multiplying four by three returns twelve. The divisor and quotient have different positions now, so we read them carefully. For an error: If the learner says four groups of four, calculate sixteen needed and explain why that exceeds the twelve counters; reject mistaken 12÷4=4. “Show why” and “Reset” are available without a prediction.

4. **Section 4: Check a New Quotient.** Learner prompt: “Is 20 ÷ 5 = 4 correct? What if someone suggests 20 ÷ 5 = 5?”. Independent transfer board with 20 counters, target 5 groups. Child checks candidates 4 or 5 by computing 5×candidate (20 vs 25) with optional visual groups, then selects which matches ORIGINAL dividend twenty. Show exact equation **20 ÷ 5 = 4 because 5 × 4 = 20** and explain: The proposed quotient is four. Five groups of four use twenty counters, so 20 divided by five equals four. Five groups of five would need twenty-five; it is not the same original total. For an error: If the wrong five is chosen, display 5×5=25 and compare with the original dividend 20, rather than changing the original problem. “Show why” and “Reset” are available without a prediction.

## INTERACTIVE OBJECTS, STATES AND RULES

- Four **independent, prop-free** Scene entries; Section entry selection is internal/editorial, not a new React public `mode` prop or Resource_Config discriminator.
- **Objects / presentation:** Fact-family board with permanent original dividend, grouped counters, clearly named dividend/divisor/quotient roles, 'multiply to check' panel and side-by-side exact mathematical identities with a full ordered text alternative. All controls are native focusable role/number selectors, example/reveal/check controls and independent undo/reset.
- **State:** Immutable original dividend 12/20, named divisor 3/4/5, candidate quotient 3/4/5, selected example/story, group count and size, product-of-check calculation, comparison verdict, explanation/reset; independent entrypoints.
- **Required invariants:** Check value = divisor×candidate quotient. A trial is correct only when this product equals the original dividend and positive divisor is nonzero. 12÷3=4 checks 3×4=12; 12÷4=3 checks 4×3=12; 20÷5=4 checks 5×4=20. Every physical model uses exactly the original number of counters without duplication. Any candidate result must be compared to the ORIGINAL expression, without changing its known operands to manufacture a true statement.
- A wrong prediction is an explanatory unscored trial. A learner can reveal the full answer and every step without passing an interaction or speaking. No mastery, ScoreState, Question result, note event or reward.

## VISUAL / AUDIO / MEDIA DIRECTION

Fact-family board with permanent original dividend, grouped counters, clearly named dividend/divisor/quotient roles, 'multiply to check' panel and side-by-side exact mathematical identities with a full ordered text alternative. Lightweight HTML/SVG for group counts and a readable expression with stable labels; any transformation is user-triggered and can show immediate static states in reduced motion. No remote video/imagery, audio, animation-only meaning, WebGL or extra image asset necessary.

## LOCALIZATION, DIRECTION AND ACCESSIBILITY

Translate all child-facing terms such as dividend/divisor/quotient and the group-count/size units authentically across supported locales, without English fallback. The equation's operand order is semantically stable in RTL, not geometrically reversed. Each action and its updated mathematical result is accessible by an interactive ordered text ledger and screen-reader status, with native keyboard/touch/switch actions, visible focus, 200% zoom, responsive mobile, non-color-only feedback, large hit areas and reduced-motion parity. Fully local after selected-locale download, with no mandatory drag, speech, audio or remote check.

## ACCEPTANCE SCENARIOS

1. 3×4=12 model has precisely twelve counters.
2. 12÷3=4 checked with 3×4=12; candidate five fails because 3×5=15.
3. 12÷4=3 checked with 4×3=12 and correctly labeled grouping story.
4. 20÷5=4 passes 5×4=20, while quotient five fails 5×5=25.
5. All incorrect candidates receive exact mismatch explanations with no score; every Section offers Reset, Hint and full solution independently.
6. Switching context changes only its explicit interpretive model, not the original expression or known numerical values; no counters duplicated.
7. Keyboard, screen reader, RTL, zoomed mobile, reduced-motion and downloaded offline operation preserve all numerical facts and logical distinctions.

## IMPLEMENTATION DEPENDENCIES AND OPEN QUESTIONS

Generic `scene` Resource rendering exists, but **Inverse Fact Family Machine is only proposed**; it needs editor approval of the Draft Brief, then Content/Scene approval, Scene Designer implementation and own tests. Coding Agent verifies real locale strings, isolated prop-free entries and offline behavior. Assessment Architect independently creates scored Questions. Editorial issue: Ensure the inverse-check procedure always compares the reconstructed product against the _original dividend_, not against the proposed quotient. One fact family is an example, not a claim to assess full division fluency.
