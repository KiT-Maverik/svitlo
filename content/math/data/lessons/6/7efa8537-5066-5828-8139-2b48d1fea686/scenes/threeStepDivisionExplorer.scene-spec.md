# Three Step Division Explorer — Scene Specification

Status: Draft
Owner: Educational Screenwriter
Parent Lesson: [Three at a Time: Division Facts by Three](../content.md), Sections 1–4
Methodologist objective(s): Build four groups of three from twelve counters to justify 12 ÷ 3 = 4. Use three equal sharing groups to show 15 ÷ 3 = 5 and identify five as items per group. Find 18 ÷ 3 = 6 using a 3-step number sequence or a matching multiplication fact, checking 3 × 6 = 18. Transfer independently to 21 ÷ 3 = 7 and use inverse multiplication to reject a wrong quotient. [Methodologist Brief](../methodologist-brief.md) (Draft).

## LEARNER PURPOSE AND CONCEPT

Develop exact division-by-three facts by linking multiples of three, equal groups, stepping in threes and inverse multiplication, not memorizing a table without evidence. Explain quotient units based on the chosen grouping or sharing interpretation. The learner can inspect the complete group/number model and challenge candidate answers, rather than simply reading a rule.

## ACCURATE CONTENT AND MODEL LIMITATIONS

Whole-number exact division by three corresponds to multiples of three: 3×4=12 so 12÷3=4; 3×5=15 so 15÷3=5; 3×6=18 so 18÷3=6; 3×7=21 so 21÷3=7. In the grouping model 12÷3=4 means FOUR groups of THREE; in the sharing model 15÷3=5 means THREE groups of FIVE. Inverse check always uses the original dividend and divisor. 20 ÷ 3 is non-exact in whole numbers (six groups of three plus two left), so must not be labeled 20÷3=6 as an exact equality. All positive whole factors, totals ≤30, no fraction or formal remainder algorithm needed.

**Misconceptions:** Reading 12÷3=4 as three groups of four in a grouping story, confusing consecutive multiples 15 and 18, answering five for 18÷3 without checking 3×5=15, or claiming division by three changes the number of objects. Do not turn non-exact 20÷3 into an exact equality.

**Invariant:** For an accepted exact division, 3×quotient=original dividend; all counter IDs assigned once with zero leftover. For step counts the number of +3 steps equals the quotient, not the destination number itself.

## EXPERIENCE BEATS AND LEARNER ACTIONS

1. **Build Twelve in Threes:** Prompt “Twelve counters, with THREE in each group: how many complete groups can you build?”. Starting with twelve distinct counter IDs, 'Make one group of three' consumes three at a time, revealing groups 1,2,3,4 and pool 12→9→6→3→0. Show **12 ÷ 3 = 4; 3 × 4 = 12**. Explanation: There are four groups of three. Four is the number of complete groups. For a wrong attempt: If three groups suggested, count 3×3=9, with three counters left to form the fourth.

2. **Share Fifteen Among Three:** Prompt “Fifteen counters shared among THREE groups: how many in EACH group?”. In a separate fair-sharing entry, give each of three labeled trays one counter per round, until all fifteen are assigned. Five appear in each; compare with grouping meaning from previous Section. Show **15 ÷ 3 = 5; 3 × 5 = 15**. Explanation: Now the divisor three counts the groups, and five counts counters in each. The story changes what the quotient counts. For a wrong attempt: If child answers three, explain three trays with three each contain nine, not fifteen.

3. **Step by Three to Eighteen:** Prompt “How many threes make eighteen? Which multiplication can check it?”. Show number sequence 0,3,6,9,12,15,18 with a focusable step counter. The child counts six three-steps and evaluates the original division using 3×6=18. Show **18 ÷ 3 = 6; 3 × 6 = 18**. Explanation: Six steps of three reach eighteen. The quotient is six; multiplication rebuilds the original eighteen. For a wrong attempt: If five selected, show five threes are fifteen, not eighteen; another group of three is needed.

4. **A New Total: Twenty-One:** Prompt “Twenty-one divided by three: how many equal groups of three? How do you check?”. Learner predicts six/seven/eight, optionally builds seven 3-counter groups or checks each multiplication: 3×6=18, 3×7=21, 3×8=24; reveal exact full model. Show **21 ÷ 3 = 7; 3 × 7 = 21**. Explanation: Seven threes make twenty-one. Multiplication confirms the quotient and leaves no remainder. For a wrong attempt: If six chosen, only eighteen counters are grouped; if eight, twenty-four would be required, exceeding the original total.

## INTERACTIVE OBJECTS, STATES AND RULES

- Four independent, self-contained **prop-free Scene placements**, one per Section. No public `mode` prop or invented Resource_Config field.
- **State:** Separate initial totals 12/15/18/21, fixed positive divisor three, group/step counters, unique object IDs, role labels (grouping/sharing), candidate, full multiplication check, explanation/reset.
- **Objects and controls:** Original expression with semantic role labels, countable HTML/SVG group/step models, candidate selectors, numerical check, explanatory text ledger, Show why/Reset/Undo controls.
- **Invariant:** For an accepted exact division, 3×quotient=original dividend; all counter IDs assigned once with zero leftover. For step counts the number of +3 steps equals the quotient, not the destination number itself. Never mark a wrong equality as correct or produce a quotient for an undefined case.
- Learner may reveal the complete explanation without guessing. No score, retry limit, mastery record, Note API or persisted Question result.

## VISUAL / AUDIO / MEDIA DIRECTION

Low-cost countable groups and large stable numerals; each learner-controlled step produces the correct numerical update. Reduced motion shows same before/after state instantly. No required audio, video, external art, WebGL or dragging.

## LOCALIZATION, DIRECTION AND ACCESSIBILITY

Translate all instructions, group/step counts, operands, result/undefined notices and feedback completely for every locale without fallback. Semantic RTL math preserves original dividend/divisor positions. Native keyboard/switch/touch actions and an interactive ordered numerical text ledger let screen-reader users execute the same operations; screen-reader status announces exact numerical results. WCAG 2.2 AA, visible focus, large controls, 200% zoom, mobile, reduced motion and full local offline calculations after download.

## ACCEPTANCE SCENARIOS

1. Build Twelve in Threes: 12 ÷ 3 = 4; 3 × 4 = 12. There are four groups of three. Four is the number of complete groups.
2. Share Fifteen Among Three: 15 ÷ 3 = 5; 3 × 5 = 15. Now the divisor three counts the groups, and five counts counters in each. The story changes what the quotient counts.
3. Step by Three to Eighteen: 18 ÷ 3 = 6; 3 × 6 = 18. Six steps of three reach eighteen. The quotient is six; multiplication rebuilds the original eighteen.
4. A New Total: Twenty-One: 21 ÷ 3 = 7; 3 × 7 = 21. Seven threes make twenty-one. Multiplication confirms the quotient and leaves no remainder.
5. Wrong predictions give specific arithmetic feedback; full reveal and retry work without scores.
6. Independent placements and reset never change the original mathematical problem or duplicate counters.
7. Keyboard, screen reader, RTL, reduced motion, zoom/mobile and offline after download preserve the same values and meanings.

## IMPLEMENTATION DEPENDENCIES AND OPEN QUESTIONS

Generic Scene Resource rendering exists; Three Step Division Explorer is proposed, not implemented. Require approval of Methodologist Brief and separate Content/Scene reviews before Design Scene/Coding Agent creates prop-free components and tests. Assessment Architect separately owns scored Questions. Editorial review: Use meaningful regrouping and inverse checks rather than four similar flashcards. Each context must say whether three represents group size or number of groups; preserve Grade 3 audience.
