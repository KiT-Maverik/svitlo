# Step Explorer — Scene Specification

Status: Draft
Owner: Educational Screenwriter
Parent Lesson / Section: [numberPatterns Lesson Content](../content.md), Sections 1 “What Comes Next?” and 2 “Keep the Jump the Same”
Methodologist objective(s): Recognize a constant additive step, describe it, extend the row and recognize that decreasing rows can also have constant steps; no new Skills. [Methodologist Brief](../methodologist-brief.md)

## LEARNER PURPOSE AND CONCEPT

A visible, controllable **jump of the same size** is more comprehensible to an early reader than a symbol-only rule. The child can predict, watch a jump and repeat it, then change the size or sign and see what remains invariant.

Source learner voice: “Each time we jump, the number changes. If the jump stays the same size, we can keep the row going.”

## ACCURATE CONTENT AND MODEL LIMITATIONS

- Terms form a finite displayed whole-number row with a fixed signed integer step: start, start + step, start + 2×step, etc. All visible terms are between 0 and 30.
- **Section 1 preset:** 4, 7, 10, 13, ?, step +3; reveal differences +3, +3, +3 and next term 16.
- **Section 2 increase preset:** start 2, +4; after three jumps the row is 2, 6, 10, 14.
- **Section 2 decrease preset:** start 12, −2; after three jumps the row is 12, 10, 8, 6. Explain that lower numbers can still have an unchanging step.
- In exploratory mode choose increment magnitudes 1–4, decrement magnitudes 1–3. Step 0 is not part of this beginner experience, not mathematically invalid. A next hop that would leave 0–30 is not allowed. No wrapping, negative values, fractional terms, nth-term formulas or free-form “find any possible rule”.
- Number-line distance must reflect actual numeric distance consistently. A counters view, if added, exactly matches numeric additions/removals. The finite row is continued **under the chosen additive rule**, never claimed to determine a unique next number in all mathematics.

## EXPERIENCE BEATS AND LEARNER ACTIONS

**Section 1, prediction placement**

1. Display large terms “4 7 10 13 ?” and “What might come next if we make the same jump?” Offer choices **12 / 15 / 16 / 17** and an accessible “Show the jumps” action. Prediction is optional.
2. Reveal the first hop with a labeled difference “4 to 7: 3 more”; repeated actions reveal “7 to 10: 3 more” and “10 to 13: 3 more”. Do not autoplay through the reasoning without a chance to stop/inspect.
3. Ask “What jump could we make now?” Then reveal the matching hop 13 to 16, with “13 + 3 = 16.”
4. For 16: “Yes. We added 3 again.” For 15: “That is 2 more, but the earlier jumps were 3.” For 17: “That is 4 more, not 3.” For 12: “That goes backward. This row went up by 3.” An incorrect choice offers “Try again” and “Show me”; no grading, timer or congratulation screen.
5. The child can review each already visible pair and can ask “Read the row” for an equivalent ordered textual description.

**Section 2, exploration placement**

1. Begin with a new independent state at 2, +4, with step controls visible. Learner uses “Next jump” three times to get 2, 6, 10, 14. Show each +4 visibly and in text.
2. Offer “Increase” or “Decrease”, then 1/2/3/4 increments (or 1/2/3 decrements). On changing settings, announce that a new row starts and reset the current row to the chosen preset; never retain old differences.
3. A clear preset “Try taking away 2” displays start 12 and step −2. Three advances make 12, 10, 8, 6; the same numeric gap is shown in each transition.
4. Optional “Back one jump”, “Reset” and “Show every change” support self-paced exploration. State transitions are exact and deterministic.
5. End prompt: “What stayed the same—the numbers or the jump?” Answer/reveal: “The jump stayed the same. The numbers changed.”

## INTERACTIVE OBJECTS, STATES AND RULES

- **Objects:** ordered number chips (with semantic first/second labels), number line with labeled units, a jump annotation with +n/−n, accessible pairwise text log, large native buttons for step controls and reveal/reset, optional simple counters.
- **Presentation distinction:** The two placements are independent prop-free Scene entries. Their different starting states are requirements of the narrative, **not** permission to invent a React mode prop or URL query. Coding Agent may share implementation internally while providing separate self-contained Scene instances and locale mappings.
- **Prediction state:** selected choice (or none), reveal count 0…3, final continuation visibility, hints. A selected wrong choice does not disable exploration.
- **Exploration state:** chosen signed step, starting number, displayed term array, count of completed jumps; changing signed step restarts clearly.
- **Invariant:** for every index i, term[i] = start + i×step. Consecutive differences exactly equal step. Never display a result outside 0–30 or an unlabeled visually unequal hop.
- **Boundary:** If an increase would exceed 30 or a decrease would go below 0, “Next jump” is unavailable with visible text: “That jump would leave our 0–30 number line. Choose a different step or reset.”
- **Reset:** restore the default configuration of that placement, with choices and reveals cleared. Back removes the last revealed term, not the initial term. The placements never share state.

## VISUAL / AUDIO / MEDIA DIRECTION

Use modest SVG/HTML: large numerals, stable number-line scale and discrete labeled hops that remain visible after reveal. Equal numerical changes have equal measured hop lengths. Visual highlights must coexist with exact “3 more / 2 fewer” text; do not encode meaning by hue or movement alone. A slow optional hop animation is useful only to direct attention to the changing interval; under reduced motion, show the same before/after math instantly. No image, video or network service is required.

## LOCALIZATION, DIRECTION AND ACCESSIBILITY

- Localize every prompt, control, transition, button accessible name, difference narration and feedback into the complete supported language set, without copied English fallbacks.
- Keep numerical term order and signed differences logically correct in both LTR and RTL. Label which direction increases; never simply mirror an SVG and make a positive hop appear numerically decreasing. Mathematical symbols retain their value/order.
- A nonvisual equivalent must expose a structured list of “term 1: 4”, “from 4 to 7: 3 more”, and so on; pairwise list is interactive through labeled controls, not just descriptive text.
- All actions work with keyboard, switch-style activation and touch, with visible focus and adequate targets. No drag-only or voice-only requirement. Short texts must not be reduced to tiny digits on mobile.
- Reduced motion means direct state changes; no auditory dependency. A learner with dyscalculia can keep earlier hops and counters visible. All translations, state changes, feedback and visual data must be self-contained and available fully offline after download.
- Prevent excessive repetitive screen-reader announcements: announce the new state and changed value once; the full log remains navigable.

## ACCEPTANCE SCENARIOS

1. The initial sequence reads 4, 7, 10, 13, ?; choosing 16 yields +3 evidence and 13 + 3 = 16.
2. Choosing 15 yields a comparison of its +2 jump with the earlier +3 jumps, then allows retry and reveal.
3. Without choosing a prediction, “Show the jumps” reveals all three changes and the final 16.
4. Explore +4 from 2: three advances yield exactly 2, 6, 10, 14.
5. Explore −2 from 12: three advances yield exactly 12, 10, 8, 6, without negative outputs.
6. Increasing at the upper boundary or decreasing at the lower boundary never creates an out-of-range value; explanatory message is perceivable.
7. Reset and per-placement state isolation work; revisiting Section 1 does not inherit Section 2 settings.
8. Keyboard, screen reader, RTL, reduced motion, narrow mobile and post-download offline operation show the same terms, transitions, meanings and explanations.

## IMPLEMENTATION DEPENDENCIES AND OPEN QUESTIONS

- Generic scene Resource contract and renderer exist in Playground, but **this Scene is proposed and not implemented**; requires editor approval then Design Scene skill, self-contained prop-free component(s), localization and tests.
- Coding Agent must verify locale context, independent Section placement and state initialization. No fabricated app API or runtime field is part of this spec.
- Optional counters are editorially adjustable provided the numeric step/accessible equivalence is not lost.
- Predictions and feedback are _instructional_ and do not create a Quiz, score, a mastered Skill or persistent user analytics.
