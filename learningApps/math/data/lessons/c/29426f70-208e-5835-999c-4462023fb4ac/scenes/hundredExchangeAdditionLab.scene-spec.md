# Hundred Exchange Addition Lab — Scene Specification

Status: Draft
Owner: Educational Screenwriter
Parent Lesson / Section: [Regrouping Ones and Tens Into Hundreds Content](../content.md), Sections 1–4
Methodologist objectives: Represent 178 and 265 as hundreds, tens and ones without misplacing a digit. Combine 8+5=13 ones into 1 ten and 3 ones, correctly recording where the ten goes. Combine 7+6+1=14 tens into 1 hundred and 4 tens and obtain 178+265=443. Solve a second example 268+157=425 with consecutive carries and verify both examples through decomposition. [Methodologist Brief](../methodologist-brief.md) (Draft, not yet approved).

## LEARNER PURPOSE AND CONCEPT

Develop place-value addition with multiple successive exchanges by grouping ten ones into a ten and ten tens into a hundred. Children control the physical and symbolic steps for 178+265 and verify the conserved sum 443. This Lesson extends the earlier two-digit column method; it does not redefine the canonical Skill's much broader numerical scope.

A meaningful Scene shows the provenance of each carried unit, a consistent physical model, and a live count/value ledger. There is no correctness score, reward or forced performance gate.

## ACCURATE CONTENT AND MODEL LIMITATIONS

178 = 1H7T8O; 265=2H6T5O. Sum in unexchanged units = 3H13T13O = 300+130+13=443. Exchange 13 ones →1T3O, so 3H14T3O; exchange 14 tens →1H4T, obtaining 4H4T3O =443. Column order: ones 8+5=13, carry one ten; tens 7+6+1=14, carry one hundred; hundreds 1+2+1=4. Transfer: 268+157: 8+7=15 ones →5O +1T; 6+5+1=12 tens →2T +1H; 2+1+1=4 hundreds, result 425. These are **two linked carrying steps**; no arbitrary larger values, decimals, negative numbers or full general proof required. Sum remains below 1000.

A child can count the carried ten twice, leave the same ten among remaining singles, forget the extra ten in the tens step, or add a hundred without removing ten tens. The initial hundred count is not four until the tens exchange is complete. Do not present raw three hundreds, thirteen tens and thirteen ones as four hundred forty-three without showing how place-value units reconcile. The earlier additionInColumns example contains one exchange; here both levels exchange sequentially.

**Conservation invariant:** Throughout regrouping 100×H+10×T+O always equals original operand sum. For 178+265: raw 3H13T13O=443, after ones 3H14T3O=443, after tens 4H4T3O=443. For 268+157: raw 3H11T15O=425, after ones 3H12T5O=425, after tens 4H2T5O=425. A carry transfers value without adding amount.

## EXPERIENCE BEATS AND LEARNER ACTIONS

1. **Section 1: Read Three Places:** Prompt “What do 178 and 265 mean in hundreds, tens and ones?”. Display a 3-column H/T/O board plus two labeled collections 1H7T8O and 2H6T5O. Learner inspects each place and combines the contributions into raw 3H13T13O without yet calling it the final numeral. The written statement is **178 + 265 = 300 + 130 + 13**. Learner-facing explanation: We have three original hundreds, thirteen tens and thirteen ones. To write an ordinary three-digit sum we need to exchange any complete tens of a place. If mistaken: If 178 is described as 1H8T7O, show 187 and correct each place by its value. An independent "Show explanation" control is always available.

2. **Section 2: Thirteen Ones Become a Ten:** Prompt “Eight ones and five ones make thirteen ones. What do you carry?”. Learner combines unique 8O and 5O, exchanges ten for a ten-bundle, places 3 ones in result and a carried ten above tens, updating the total ledger to 3H14T3O. The written statement is **8 + 5 = 13; 13 ones = 1 ten + 3 ones**. Learner-facing explanation: Thirteen ones contain a ten and three singles. Ten ones were used to make that ten, so there are only three loose ones left. If mistaken: If a learner writes thirteen as the ones digit and also carries one, explain the double count; if they claim four loose ones, recount the original thirteen. An independent "Show explanation" control is always available.

3. **Section 3: Fourteen Tens Become a Hundred:** Prompt “Now add 7 tens, 6 tens and the 1 new ten. What happens to fourteen tens?”. Show 7T+6T+1T=14T, with one ten-bundle from the previous exchange. Learner exchanges ten of fourteen T into 1H, leaving four tens and final total 4H4T3O. The written statement is **7 + 6 + 1 = 14 tens = 1 hundred + 4 tens; 178 + 265 = 443**. Learner-facing explanation: Fourteen tens include a hundred and four tens. Three original hundreds plus this new hundred make four hundreds. Four hundreds, four tens, three ones give four hundred forty-three. If mistaken: For 343, identify the missing new hundred. For 453, show that five tens would count one ten twice; trace actual ten-bundles. An independent "Show explanation" control is always available.

4. **Section 4: Two New Carries:** Prompt “Try 268 + 157. Can the ones and the tens both make a new higher-place unit?”. Fresh H/T/O board. Learner works ones 8+7=15 → carry1T/remain5O; tens 6+5+1=12 → carry1H/remain2T; hundreds 2+1+1=4; check 425 against originals. The written statement is **268 + 157 = 425**. Learner-facing explanation: The ones make one new ten and five ones. The tens then make one new hundred and two tens. Four hundreds, two tens and five ones make 425. If mistaken: For 415, show the omitted carried ten in tens; for 325, show the missed carried hundred. Verify 200+60+8+100+50+7=425. An independent "Show explanation" control is always available.

## INTERACTIVE OBJECTS, STATES AND RULES

- Four distinct independent **prop-free Scene placements**, one per Lesson Section. Reusable internal arithmetic is allowed but public React `mode` props or fabricated Resource_Config fields are not.
- **Objects:** Three labeled Hundreds/Tens/Ones columns linked to physical base-ten blocks with low-poly complexity, explicit carried-ten and carried-hundred provenance, and a persistent value-check ledger after EVERY exchange; avoid rendering hundreds as hundreds of separate tiny dots on weak devices. Include base-ten object IDs, current place counts, full original addends, carry origin markers, optional prediction, reset/undo, readable calculations and feedback.
- **State:** Per Scene placement: labeled operands, original hundreds/tens/ones arrays, stable block identities, carried ten and carried hundred provenance, raw and normalized place-value states, selected step/trial, explanation and reset.
- **Invariant:** Throughout regrouping 100×H+10×T+O always equals original operand sum. For 178+265: raw 3H13T13O=443, after ones 3H14T3O=443, after tens 4H4T3O=443. For 268+157: raw 3H11T15O=425, after ones 3H12T5O=425, after tens 4H2T5O=425. A carry transfers value without adding amount. On any valid action, compute exact integer place value. Wrong trials are clearly named as not matching the original sum, never shown as accepted arithmetic identities.
- Children may reveal the full model without guessing; no persistent answer record, score, Note API, success event or classification as a graded Question.

## VISUAL / AUDIO / MEDIA DIRECTION

Three labeled Hundreds/Tens/Ones columns linked to physical base-ten blocks with low-poly complexity, explicit carried-ten and carried-hundred provenance, and a persistent value-check ledger after EVERY exchange; avoid rendering hundreds as hundreds of separate tiny dots on weak devices. Use low-overhead SVG/HTML place-value blocks with named H/T/O headings and large digit labels. Animate only the learner-triggered exchange, or skip animation with equivalent numerical state under reduced motion. Avoid hundreds of tiny countable dots, compulsory audio, streamed media, external drawings or WebGL.

## LOCALIZATION, DIRECTION AND ACCESSIBILITY

Every prompt, error, step, role, place name, label, status, aria text and Note genuinely localized for all supported locales; no English fallback. In RTL, preserve exact operand identities and place values rather than mechanically flipping number order. A fully interactive ordered text ledger mirrors _each exchange and arithmetic step_ via native keyboard/touch/switch buttons and screen reader status, providing full access without vision or dragging. Large child-friendly controls, visible focus, high contrast, zoom/mobile and reduced-motion parity. Entire deterministic operation and locale data must work offline after download on low-end devices.

## ACCEPTANCE SCENARIOS

1. 178 and 265 map to 1H7T8O and 2H6T5O; raw 3H13T13O values 443.
2. Ones exchange converts 13O to 1T3O, giving 3H14T3O still 443.
3. Tens exchange converts 14T to 1H4T, giving 4H4T3O =443.
4. 268+157 yields 425 via 15 ones and 12 tens, and adding original decompositions confirms 425.
5. Incorrect predictions trigger exact correction, retry and reveal without score or mastery inference.
6. Section placements initialize/reset independently and neither double-count nor silently remove any counter.
7. Screen reader/keyboard/switch, semantic RTL, mobile/200% zoom, reduced motion and downloaded offline modes show identical numerical and conceptual results.

## IMPLEMENTATION DEPENDENCIES AND OPEN QUESTIONS

Generic Scene Resource rendering exists; this specific Hundred Exchange Addition Lab is **proposed** and awaits editorial approval of the Draft Brief, then separate Content/Scene approval, Design Scene coding and own tests. Coding Agent validates state isolation, actual locale coverage and offline delivery. Assessment Architect owns scored Question work. Editorial review: Grade 3 only for learners with reliable three-digit place value and one-carry written addition. The Skill remains unbounded by grade, and these examples do not exhaust its broad definition.
