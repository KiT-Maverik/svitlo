# Zero Division Boundary Lab — Scene Specification

Status: Draft
Owner: Educational Screenwriter
Parent Lesson: [Zero as Dividend Is Not Zero as Divisor](../content.md), Sections 1–4
Methodologist objective(s): Model 0 ÷ 4 = 0 as four empty sharing groups and verify 4 × 0 = 0. Explain why 6 ÷ 0 is undefined: no quotient q could satisfy 0 × q = 6. Explain why 0 ÷ 0 is also undefined: 0 × q = 0 holds for many q and gives no single answer. Classify a fresh set of expressions as defined (0 ÷ 3 = 0, 9 ÷ 3 = 3) or undefined (9 ÷ 0, 0 ÷ 0), citing the divisor position. [Methodologist Brief](../methodologist-brief.md) (Draft).

## LEARNER PURPOSE AND CONCEPT

Distinguish the defined operation zero divided by a NONZERO divisor, which gives zero, from every attempt to divide BY zero, which cannot produce a unique quotient. Use the inverse multiplication check rather than a rote prohibition, with accessible empty-group and numerical explanations. The learner can inspect the complete group/number model and challenge candidate answers, rather than simply reading a rule.

## ACCURATE CONTENT AND MODEL LIMITATIONS

For any positive integer d, 0 ÷ d = 0: d equal groups of zero counters use zero total. In particular 0 ÷ 4 = 0 because 4 × 0 = 0; 0 ÷ 3 = 0. For any a, a ÷ 0 is undefined. If a=6, 0 × q = 6 is impossible because 0 × q = 0. If a=0, 0 × q = 0 holds for multiple q, so division does not produce ONE unique answer. 9 ÷ 3 = 3 checks 3 × 3 = 9. The dividend is the first operand, divisor the second: 0 ÷ 4 and 4 ÷ 0 cannot be swapped. These restrictions are mathematical, not only because there are no physical group trays. Work with small whole numbers; no limits on canonical Skill.

**Misconceptions:** Mistake 0 ÷ 4 = 4 by copying divisor; mistake 4 ÷ 0 = 0 by assuming any zero produces zero; claim 0 ÷ 0 = 1 from the self-division rule; assert zero 'groups' is itself an arithmetic answer. For 0 ÷ 0, distinguish MANY compatible products from one determined quotient. Do not display a fake quotient for an undefined expression.

**Invariant:** When divisor>0, dividend=divisor×quotient; 0/d=0. For divisor=0, NO q is exposed as uniquely correct, including 0/0. No empty visual should be misread as a result.

## EXPERIENCE BEATS AND LEARNER ACTIONS

1. **Share Nothing into Four Groups:** Prompt “There are zero counters and FOUR groups. How many does each receive?”. Show four labeled empty groups, zero original counters, accessible ledger; allow learner to inspect every empty group and check 4×0=0. Show **0 ÷ 4 = 0; 4 × 0 = 0**. Explanation: Each of four groups gets zero; together they account for zero counters. For a wrong attempt: If four is chosen, four groups of four would require sixteen counters, which we do not have.

2. **Try Dividing Six by Zero:** Prompt “Can we divide SIX counters into ZERO groups and get one exact quotient?”. Show the original 6÷0, allow inspection of nonzero six total and zero group-count boundary, and test the equation 0×q=6 with candidate q 0/1/6, all yielding 0, never six. Show **6 ÷ 0 is undefined**. Explanation: Any alleged quotient would need zero multiplied by that quotient to equal six. Zero times any candidate is zero, so none works. For a wrong attempt: If child picks six or zero, substitute it in 0×q; both give zero, not six.

3. **What About Zero Divided by Zero?:** Prompt “Is 0 ÷ 0 equal to one, zero, or another number?”. Keep 0÷0 visibly _undefined_, offer candidate q=0,1,2 and compute 0×q=0 for all; point out a division result must be uniquely determined. Show **0 ÷ 0 is undefined**. Explanation: All three candidates work as a product, so none is selected as the one division answer. Zero as divisor is not allowed even when dividend is zero. For a wrong attempt: If learner assumes self-division makes one, note a÷a=1 only applies when a is nonzero.

4. **Read the Divisor Carefully:** Prompt “Which are defined: 0 ÷ 3, 9 ÷ 3, 9 ÷ 0, 0 ÷ 0?”. Offer four independent expression cards with native labels for first/second operand and explanatory classification. Check 3×0=0 and 3×3=9; for either /0 explicitly show 'undefined'. Show **0 ÷ 3 = 0; 9 ÷ 3 = 3; 9 ÷ 0 and 0 ÷ 0 undefined**. Explanation: Look at the divisor, the number AFTER ÷. If it is zero, division is undefined. A zero FIRST number is fine if divisor is nonzero. For a wrong attempt: If child marks 0÷3 undefined, point out divisor is three, not zero. If 9÷0 is marked zero, demonstrate 0×q can never give nine.

## INTERACTIVE OBJECTS, STATES AND RULES

- Four independent, self-contained **prop-free Scene placements**, one per Section. No public `mode` prop or invented Resource_Config field.
- **State:** Four independent Section cases, immutable dividend/divisor, zero-group model or multiplication-check candidate, explanation and classification; undefined has no numeric quotient or division output.
- **Objects and controls:** Original expression with semantic role labels, countable HTML/SVG group/step models, candidate selectors, numerical check, explanatory text ledger, Show why/Reset/Undo controls.
- **Invariant:** When divisor>0, dividend=divisor×quotient; 0/d=0. For divisor=0, NO q is exposed as uniquely correct, including 0/0. No empty visual should be misread as a result. Never mark a wrong equality as correct or produce a quotient for an undefined case.
- Learner may reveal the complete explanation without guessing. No score, retry limit, mastery record, Note API or persisted Question result.

## VISUAL / AUDIO / MEDIA DIRECTION

Low-cost countable groups and large stable numerals; each learner-controlled step produces the correct numerical update. Reduced motion shows same before/after state instantly. No required audio, video, external art, WebGL or dragging.

## LOCALIZATION, DIRECTION AND ACCESSIBILITY

Translate all instructions, group/step counts, operands, result/undefined notices and feedback completely for every locale without fallback. Semantic RTL math preserves original dividend/divisor positions. Native keyboard/switch/touch actions and an interactive ordered numerical text ledger let screen-reader users execute the same operations; screen-reader status announces exact numerical results. WCAG 2.2 AA, visible focus, large controls, 200% zoom, mobile, reduced motion and full local offline calculations after download.

## ACCEPTANCE SCENARIOS

1. Share Nothing into Four Groups: 0 ÷ 4 = 0; 4 × 0 = 0. Each of four groups gets zero; together they account for zero counters.
2. Try Dividing Six by Zero: 6 ÷ 0 is undefined. Any alleged quotient would need zero multiplied by that quotient to equal six. Zero times any candidate is zero, so none works.
3. What About Zero Divided by Zero?: 0 ÷ 0 is undefined. All three candidates work as a product, so none is selected as the one division answer. Zero as divisor is not allowed even when dividend is zero.
4. Read the Divisor Carefully: 0 ÷ 3 = 0; 9 ÷ 3 = 3; 9 ÷ 0 and 0 ÷ 0 undefined. Look at the divisor, the number AFTER ÷. If it is zero, division is undefined. A zero FIRST number is fine if divisor is nonzero.
5. Wrong predictions give specific arithmetic feedback; full reveal and retry work without scores.
6. Independent placements and reset never change the original mathematical problem or duplicate counters.
7. Keyboard, screen reader, RTL, reduced motion, zoom/mobile and offline after download preserve the same values and meanings.

## IMPLEMENTATION DEPENDENCIES AND OPEN QUESTIONS

Generic Scene Resource rendering exists; Zero Division Boundary Lab is proposed, not implemented. Require approval of Methodologist Brief and separate Content/Scene reviews before Design Scene/Coding Agent creates prop-free components and tests. Assessment Architect separately owns scored Questions. Editorial review: Grade 3 explanation of 0÷0 should be intuitive, explicit and optional to explore; ensure it does not accidentally suggest a quotient of zero.
