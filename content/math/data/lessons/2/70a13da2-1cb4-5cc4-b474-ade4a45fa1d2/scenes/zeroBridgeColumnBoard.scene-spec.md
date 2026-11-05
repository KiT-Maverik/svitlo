# Zero Bridge Column Board — Scene Specification

Status: Draft
Owner: Educational Screenwriter
Parent Lesson / Section: [Regrouping Through a Zero Place](../content.md), Sections 3–4
Methodologist objective(s): Complete two exchanges through a zero tens place, subtract aligned hundreds/tens/ones, and verify the original arithmetic with inverse addition. [Methodologist Brief](../methodologist-brief.md) (Draft).

## LEARNER PURPOSE AND CONCEPT

This interactive place-value board links physical bundles, named hundreds/tens/ones and a written subtraction. It makes the intermediate **zero tens** visible: to take away five ones in 302−175, the child must first exchange a hundred into tens, then a ten into ones. Once these changes are recorded correctly, subtraction works place by place and can be verified by addition.

## ACCURATE CONTENT AND MODEL LIMITATIONS

- **Guided:** 302−175. Source H3,T0,O2. Step 1 H2,T10,O2; step 2 H2,T9,O12 (worth 302). Remove 1 hundred, 7 tens, 5 ones to leave H1,T2,O7 = 127. Verification **127+175=302**.
- **Transfer:** 403−186. Source H4,T0,O3. Step 1 H3,T10,O3; step 2 H3,T9,O13 (worth 403). Remove 1 hundred, 8 tens, 6 ones to leave H2,T1,O7 = 217. Verification **217+186=403**.
- All units are conserved through exchanges, then the removed amount plus remaining equals the original minuend. A hundred exchanged into ten tens is no longer available as a hundred; the next tens-to-ones exchange decreases tens from 10 to 9.
- These three-digit examples require exactly two linked exchanges and remain within whole-number nonnegative subtraction. Do not add multi-zero thousands chains, negative numbers or decimals.
- The subtrahend is a quantity to **take from** the minuend, not a second collection added to it. Written place values must be correctly aligned regardless of RTL layout.

## EXPERIENCE BEATS AND LEARNER ACTIONS

**Guided placement / Section 3**

1. Display the _original_ expression 302−175 in labeled columns “Hundreds / Tens / Ones”. Beside/underneath it show source 3H,0T,2O for 302 and a clearly distinct “take away” reference 1H,7T,5O.
2. Ask “We need to remove five ones, but only two are loose. Where can the extra ones come from?” Show no tens at first. Native “Exchange one hundred” converts 3H0T2O→2H10T2O.
3. “Exchange one ten” converts 2H10T2O→2H9T12O, updating the written column annotations and exact numeric ledger. Allow an explanation reveal for each step and optional replay.
4. “Subtract ones” shows 12−5=7; “Subtract tens” shows 9−7=2; “Subtract hundreds” shows 2−1=1. Reveal the assembled 127 only after the steps or a user-selected “Show solution.”
5. “Check addition” displays 127+175=302 in complete terms; may show group recomposition but text must be sufficient. If an invalid trial retained all ten tens, explain that one ten was _converted_ to ten ones; “2H10T12O=312” cannot be the original 302.
6. Offer “Inspect a mistake”: a wrongly retained hundreds count or right-to-left digit subtraction yields an explicit value mismatch, with correction to actual exchange, not a red icon alone.

**Independent transfer / Section 4**

1. Start fresh with **403−186**, written and labeled by place. Prompt “The tens place has zero. What could you exchange first?” Initial help hidden, but available.
2. Learner may perform both exchanges or request “Show first step,” getting 4H0T3O→3H10T3O→3H9T13O. Keep values readable after each step.
3. Learner selects or types the ones/tens/hundreds remainders, with accessible alternatives and explanatory feedback. 13−6=7, 9−8=1, 3−1=2; assemble 217.
4. “Check my difference” displays 217+186=403. For a wrong 227, explain “Nine tens minus eight tens is ONE ten, not two.” For 207, explain that one ten remains and its place value cannot be omitted.
5. “Show full solution” is always available without a successful guess, preserving learning access. “Reset” restarts from the original 403−186 and does not affect Section 3.
6. Reflection “What stayed the same as you exchanged? When did the amount decrease?” Reveal: “302/403 did not change during exchanges. It decreased only when we subtracted the amount named after minus.”

## INTERACTIVE OBJECTS, STATES AND RULES

- Objects: equation with stable original minuend/subtrahend, semantically labeled hundreds/tens/ones grid, grouped hundred/ten/one quantities, per-step “exchange,” “subtract,” “reveal,” “undo,” “reset,” and “check” controls, accessible state ledger and explanation messages.
- Two **independent prop-free Scene placements**; “guided/transfer” are authoring descriptions, not invented public React props or a new Resource_Config field. Coding Agent may share internal calculations but not learner state across Sections.
- Source state tuple H,T,O, current exchange stage (0/1/2), remaining count after subtraction stage (ones/tens/hundreds), optional response trial, explanation visibility. Step dependencies enforce 100→10 tens before 10→10 ones when T=0.
- **Invariant during exchange:** 100H+10T+O = original 302 or 403. **During subtraction:** removed value + remaining value = original, with subtrahend removed exactly once. Never mark a wrong state as equivalent.
- The original mathematical expression must remain available when verifying the difference. A provisional wrong trial is explicitly “does not match”, never an accepted equality.
- The learner may inspect every stage with text/table alone, without dragging or tapping tiny individual counters. These are formative interactions: no QuestionState, scoring, Skill mastery or Notes event.

## VISUAL / AUDIO / MEDIA DIRECTION

Use simple responsive HTML/SVG labeled place-value columns and visually related base-ten bundles. When exchanging a hundred, use one clear split into ten tens; when exchanging a ten, split exactly that ten into ten ones and remove it from tens. Large legible numerals and a persistent “worth 302/403” annotation preserve conservation. Optional short animations are learner-stepped, not a continuous movie; reduced motion shows the identical before/after state immediately. No required generated images, audio, network video or 3D.

## LOCALIZATION, DIRECTION AND ACCESSIBILITY

- Localize place value, operation roles, step labels, hints, wrong-state explanations, aria names and checking messages for the **complete** language roster; no silent English fallback.
- Semantic RTL: hundreds, tens and ones must be distinguished by their actual values rather than screen-side, with mathematical operand order intact. If visual columns adapt spatially, the accessible ledger still reads “three hundreds, zero tens, two ones”.
- A screen-reader/keyboard user can inspect the full ordered sequence “302 → 2 hundreds,10 tens,2 ones → 2 hundreds,9 tens,12 ones → take away 175 → 127”; each change is announced once and remains navigable. Text/table alternative is fully operable, not a static caption to an inaccessible Scene.
- Native focusable large targets, 200% zoom, mobile vertical layout, reduced motion, switch control, no precise dragging, timer, color-only difference or compulsory voice. Complete deterministic calculations and localized text must run offline after the content package is downloaded on low-end devices.

## ACCEPTANCE SCENARIOS

1. For 302, exchanges produce exactly (2,10,2) and (2,9,12) with value 302; attempt to exchange from empty tens first is blocked and explained.
2. Guided subtraction yields ones=7, tens=2, hundreds=1, result 127, and check 127+175=302.
3. For 403, exchanges produce (3,10,3) then (3,9,13), preserving 403; subsequent subtraction 186 gives 217.
4. Verification 217+186=403 is explicitly tied to the original expression; proposed wrong answers 227 and 207 get arithmetic feedback, not grades.
5. Intermediate incorrectly retained tens or hundreds is rejected with actual value calculation, not silently accepted.
6. Reset/undo, show steps, help and reveal are accessible without a correct trial; Section states remain independent.
7. LTR/RTL, keyboard, screen reader, reduced motion, mobile/zoom and offline after download expose exactly the same mathematical actions, counts and explanations.

## IMPLEMENTATION DEPENDENCIES AND OPEN QUESTIONS

The generic Lesson Scene renderer exists; **Zero Bridge Column Board is proposed**, requiring separate editorial and Scene spec approvals and Coding Agent implementation with its own tests. Three-digit exchange through zero is readiness-gated enrichment, not an assumed competency of all first/second graders. Coding Agent must verify local scene state, selected locale content and equivalent nonvisual operation; Assessment Architect owns any scored Question design. No fictional API or runtime field is part of this document.
