# Division Expression Decoder — Scene Specification

Status: Draft
Owner: Educational Screenwriter
Parent Lesson: [Read What a Division Expression Says Content](../content.md), Sections 1–4
Methodologist source: [Methodologist Brief](../methodologist-brief.md), currently Draft, not approved

## LEARNER PURPOSE AND CONCEPT

Help learners read dividend, divisor and quotient as mathematical roles rather than memorizing an unexplained word order. Keep the arithmetic expression stable while examining both equal-sharing and equal-grouping stories. In 12 ÷ 3 = 4, twelve is always the total and three always the nonzero second operand, but its story unit differs: it names THREE groups in an equal-sharing story or THREE objects per group in an equal-grouping story. The answer four likewise changes units between four PER group and four GROUPS.

This is a structured mathematical **investigation** with independently operable data views and explicit operand roles, not a pure quiz or image-only drag task.

## ACCURATE CONTENT AND MODEL LIMITATIONS

Dividend = total, divisor = nonzero second operand, quotient = result. In 12÷3=4, 12 is the starting total in both contexts. In fair sharing, the known divisor '3' is number of groups, the quotient '4' is size of each share. In equal grouping, the divisor '3' is items in each group, the quotient '4' is number of groups. Both model 12 items exactly. In 20÷5=4, sharing means five groups of four, grouping means four groups of five. Every story must name whether the known number means groups or size; never make a blank picture carry the meaning on its own. Zero divisor is invalid; 0 is excluded as the second operand, but the Skill itself is not changed. No remainders, negative numbers, fractions or long division.

**Critical invariants:** An expression's ordered operands and numerical truth never change when only the contextual interpretation changes. For 12÷3=4, sharing is 3 groups of 4; grouping is 4 groups of 3. For 20÷5=4, sharing is 5 groups of 4; grouping is 4 groups of 5. Divisor must be nonzero. All counters are counted exactly once.

**Known misconceptions:** Children may call the dividend the answer because it is the largest number, copy divisor 3 as the quotient, or equate '3 groups' and 'three in each' when changing stories. They may silently swap 12÷3=4 with 12÷4=3 as if the expression itself did not change. They may read division backward in RTL or claim 12÷0 is permitted. Counter-state labels must explicitly bind to the actual symbol positions. Do not present false quotient identities as correct; when a candidate is wrong, label the computation as a trial and show the actual value.

## EXPERIENCE BEATS AND LEARNER ACTIONS

1. **Section 1: Give the Numbers Their Names.** Learner prompt: “Read 12 ÷ 3 = 4. Which number is the total? Which comes after the division sign? Which is the result?”. A large stable equation has three separately focusable semantic tokens: total/dividend 12, nonzero divisor 3, quotient 4. Learner chooses a token and sees the corresponding label and short explanation. Accessible text offers the same annotated expression and an optional 12-counter model. Show exact equation **12 ÷ 3 = 4** and explain: We read twelve divided by three equals four. Twelve is the dividend or total; three is the divisor; four is the quotient. The mathematical order does not change when we name them. For an error: If four is chosen as the dividend, name it as result and show the total of twelve; if three is chosen as quotient, explain that the second operand is the divisor. “Show why” and “Reset” are available without a prediction.

2. **Section 2: Three Groups, Four in Each.** Learner prompt: “Twelve objects are shared into 3 equal groups. What does the 4 mean in 12 ÷ 3 = 4?”. Same equation remains fixed. Show three separate labeled groups of four and role strips Total 12, Number of groups 3, In each 4. Learner maps each strip to exact equation position and can inspect the group totals without moving individual counters. Show exact equation **12 ÷ 3 = 4; 3 groups × 4 each = 12** and explain: When we share among three groups, the three names how many groups receive counters. Four is how many are in each group. Twelve is the total before sharing. For an error: If the child calls '4 groups' the answer here, count precisely three recipient trays and four in each; keep expression unchanged. “Show why” and “Reset” are available without a prediction.

3. **Section 3: Three in Each, Four Groups.** Learner prompt: “Now make groups OF 3 from the same 12. What does the quotient 4 count in this story?”. Keep 12÷3=4 visible, switch explicit story label to grouping. Reveal four distinct groups of three and map Total 12, Group size 3, Number of groups 4 to the same operand slots; offer an operable side-by-side story role comparison. Show exact equation **12 ÷ 3 = 4; 4 groups × 3 each = 12** and explain: Now three names the size of each group, while four counts the groups we can form. The same equation fits, but the units carried by the answer are different. For an error: If 'three groups' is chosen, point to the four completed groups and the explicit group size of three; distinguish it from the earlier sharing story. “Show why” and “Reset” are available without a prediction.

4. **Section 4: One Equality, Two New Stories.** Learner prompt: “20 ÷ 5 = 4. Choose a sharing story and a grouping story that both match this exact equality.”. Independent transfer with stable equation 20÷5=4. Child inspects candidate stories '20 shared among 5 groups, 4 each', '20 in groups of 5, 4 groups', and an incorrect story '20 shared into 4 groups, 5 each' (which is 20÷4=5). Native role-matching options and full model reveal available. Show exact equation **20 ÷ 5 = 4** and explain: Sharing: five groups receive four each. Grouping: four groups of five can be made. Both use twenty, but 20 ÷ 4 = 5 is a different expression even if its model also has twenty counters. For an error: If the child accepts 'divide twenty among four' as the same expression, highlight that four would be the divisor and five the quotient; the original has divisor five. “Show why” and “Reset” are available without a prediction.

## INTERACTIVE OBJECTS, STATES AND RULES

- Four **independent, prop-free** Scene entries; Section entry selection is internal/editorial, not a new React public `mode` prop or Resource_Config discriminator.
- **Objects / presentation:** Stable large equation with semantic token focus/selection, two strongly labeled story panels, exact numeric group-role ledger, and lightweight countable groups. Every accessible role labels its _value and unit_, not just its visual location. All controls are native focusable role/number selectors, example/reveal/check controls and independent undo/reset.
- **State:** Per entry: immutable ordered numeric tokens (dividend, operator, divisor, equals, quotient), story interpretation, explicitly tagged group count/size/total, selected role or story, optional revealed count model, explanation/reset. No shared state between placements.
- **Required invariants:** An expression's ordered operands and numerical truth never change when only the contextual interpretation changes. For 12÷3=4, sharing is 3 groups of 4; grouping is 4 groups of 3. For 20÷5=4, sharing is 5 groups of 4; grouping is 4 groups of 5. Divisor must be nonzero. All counters are counted exactly once. Any candidate result must be compared to the ORIGINAL expression, without changing its known operands to manufacture a true statement.
- A wrong prediction is an explanatory unscored trial. A learner can reveal the full answer and every step without passing an interaction or speaking. No mastery, ScoreState, Question result, note event or reward.

## VISUAL / AUDIO / MEDIA DIRECTION

Stable large equation with semantic token focus/selection, two strongly labeled story panels, exact numeric group-role ledger, and lightweight countable groups. Every accessible role labels its _value and unit_, not just its visual location. Lightweight HTML/SVG for group counts and a readable expression with stable labels; any transformation is user-triggered and can show immediate static states in reduced motion. No remote video/imagery, audio, animation-only meaning, WebGL or extra image asset necessary.

## LOCALIZATION, DIRECTION AND ACCESSIBILITY

Translate all child-facing terms such as dividend/divisor/quotient and the group-count/size units authentically across supported locales, without English fallback. The equation's operand order is semantically stable in RTL, not geometrically reversed. Each action and its updated mathematical result is accessible by an interactive ordered text ledger and screen-reader status, with native keyboard/touch/switch actions, visible focus, 200% zoom, responsive mobile, non-color-only feedback, large hit areas and reduced-motion parity. Fully local after selected-locale download, with no mandatory drag, speech, audio or remote check.

## ACCEPTANCE SCENARIOS

1. The token 12 is dividend, token 3 is nonzero divisor, token 4 is quotient in 12÷3=4.
2. Sharing story presents exactly three groups of four and labels quotient as four per group.
3. Grouping story presents exactly four groups of three and labels quotient as four groups, without editing 12÷3=4.
4. 20÷5=4 fits both accurately labeled models and rejects 20÷4=5 as the same expression.
5. All incorrect candidates receive exact mismatch explanations with no score; every Section offers Reset, Hint and full solution independently.
6. Switching context changes only its explicit interpretive model, not the original expression or known numerical values; no counters duplicated.
7. Keyboard, screen reader, RTL, zoomed mobile, reduced-motion and downloaded offline operation preserve all numerical facts and logical distinctions.

## IMPLEMENTATION DEPENDENCIES AND OPEN QUESTIONS

Generic `scene` Resource rendering exists, but **Division Expression Decoder is only proposed**; it needs editor approval of the Draft Brief, then Content/Scene approval, Scene Designer implementation and own tests. Coding Agent verifies real locale strings, isolated prop-free entries and offline behavior. Assessment Architect independently creates scored Questions. Editorial issue: This Grade 3 Lesson teaches reading and assigning units to expression roles, not yet another fully procedural group-building lesson. Grade 2 learners with sufficient prerequisites may inspect it but the designated primary audience is Grade 3.
