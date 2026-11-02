# Rule Inspector — Scene Specification

Status: Draft
Owner: Educational Screenwriter
Parent Lesson / Section: [numberPatterns Lesson Content](../content.md), Sections 3 “Check EVERY Jump” and 4 “Your Turn to Explain”
Methodologist objective(s): Examine ALL adjacent gaps, check a proposed constant-step rule, identify unequal steps and extend a row consistently with a verified additive rule. [Methodologist Brief](../methodologist-brief.md)

## LEARNER PURPOSE AND CONCEPT

This Scene deliberately contrasts one seemingly successful jump with a later **mismatch**, teaching the child to check every visible gap instead of guessing from the first two numbers. A second, less-scaffolded mode transfers the same method to a fresh row.

Source learner-facing wording: “A rule should fit every jump we can see. Check each jump before you trust it.”

## ACCURATE CONTENT AND MODEL LIMITATIONS

- A proposed rule of the form “add/subtract the same amount each time” fits **all shown transitions** only when each observed consecutive difference equals the proposed signed step.
- **Opening nonexample:** 2, 5, 9 with candidate +3: 2→5 is +3 (matches), 5→9 is +4 (does not match).
- **True contrast:** 3, 6, 9, 12 with candidate +3: all gaps +3 (matches).
- **Second contrast:** 3, 6, 10, 15 with candidate +3: gaps +3, +4, +5 (does not match); do not say these numbers cannot obey _any_ rule.
- **Optional decrease:** 12, 10, 8, 6 with candidate −2: all gaps −2 (matches).
- **Independent transfer:** 7, 10, 13, 16, ?; gaps +3, +3, +3, proposed continuation 19 if the constant +3 rule is maintained; choices 18 / 19 / 20.
- Limit terms to the age-appropriate 0–30 range. These examples are not evidence that a finite list mathematically determines a uniquely necessary next number. Say “if we keep this step,” not “19 is the only next number possible.”

## EXPERIENCE BEATS AND LEARNER ACTIONS

**Placement A / Section 3 — Check the claim**

1. Show large ordered numerals **2, 5, 9** and a card **“Add 3 each time.”** Ask **“Does it fit the whole row? Check both jumps.”**
2. Reveal the first gap by explicit action: **“2 to 5: 3 more. This matches.”** Highlight the pair; let the child predict whether the next gap will also match.
3. Reveal second gap: **“5 to 9: 4 more. This does NOT match +3.”** Keep the first result visible so the contradiction is unmistakable.
4. Offer choices **“Fits every jump”** / **“Does not fit every jump”** at any point. If a child selects “Fits” early, reply **“Let's check the other jump too.”** If still “Fits” after both, explain **“5 to 9 adds 4, so +3 does not fit this whole row.”** The other choice receives **“Yes, the first jump matched but the second did not.”** No penalty and no performance record.
5. Offer an accessible “Compare another row” action. Display **3, 6, 9, 12** with candidate +3, then **3, 6, 10, 15** with candidate +3. Let the child reveal all gaps on each, then decide. For a true match: **“All three jumps add 3.”** For a mismatch: **“3 to 6 adds 3; 6 to 10 adds 4; 10 to 15 adds 5.”**
6. Optional “Try a decreasing row” uses **12, 10, 8, 6** with −2 and explicit “two fewer” changes.
7. Reflection: **“Was checking the first jump enough?”** After thought, reveal **“No. We need to check every jump we can see.”**

**Placement B / Section 4 — Independent use**

1. Show **7, 10, 13, 16, ?**; no candidate step is revealed. Ask **“Check the changes. Which number would come next if we keep the same jump?”**
2. The learner may inspect the gaps in order: **7→10: +3**, **10→13: +3**, **13→16: +3**; hints do not automatically disclose the final value. Optional hint: **“Compare each pair of neighbors, not only the first two numbers.”**
3. Allow selection from **18 / 19 / 20**. 18: **“16 to 18 adds 2; the earlier gaps were 3.”** 20: **“16 to 20 adds 4; the earlier gaps were 3.”** 19: **“16 to 19 adds 3, just like each earlier gap.”**
4. Provide **“Show the explanation”** without requiring a response. Display **“Each jump we checked added 3. If we keep adding 3, then 16 + 3 = 19.”**
5. Invite a why-explanation in multiple equivalent modes. A child can say it aloud to a trusted adult, type a short sentence if they wish, or select **“Every jump adds 3”** rather than “The first gap was 3, so I didn't check the rest” or “These numbers are close together”. This is formative teaching, NOT a scored Question object.
6. A “Reset” action restores the fresh sequence. Optional alternate example **9, 7, 5, 3** with −2 offers retrieval without extending the graded task.

## INTERACTIVE OBJECTS, STATES AND RULES

- **Objects:** ordered, readable number chips; per-pair inspector with “from/to/step” columns; an optional proposed-rule card; clear “Check next” / “Show all gaps” / “Try another row” / “Hint” / “Reset” buttons; explanation and choice regions.
- **Two placements:** Separate self-contained prop-free Scene entries with independent starting scenarios and states. “Guided vs independent” are editorial entry requirements, not invented React props or new Resource_Config attributes. A Coding Agent may share internal logic while preserving the Scene contract.
- **State:** current displayed row, proposed rule if shown, list of revealed neighboring pairs, optional tentative fit verdict or next-number choice, whether explanations have been revealed.
- **Calculation invariant:** for every displayed neighboring pair a,b, the step is exactly b−a. A candidate rule d is consistent iff **every** adjacent difference in that shown row equals d. Showing only one successful gap must never produce an “all gaps verified” claim.
- **Early choices:** An early guess is permitted, but the feedback requests inspection of remaining gaps instead of falsely marking the rule established; a learner may also skip guessing and inspect all gaps.
- **Reset and switch:** Restore all initial hidden differences and choice states; reset is scoped to the current placement and never alters the other Section.
- **Accuracy boundary:** The verdict is always **“fits this entire displayed row under the proposed constant-step interpretation”** or “does not fit this proposed constant step,” never “there can be no mathematical pattern.”
- **No scoring:** These Scene states do not create an Assessment Method, Question correctness persistence, quiz result or mastery evidence.

## VISUAL / AUDIO / MEDIA DIRECTION

Put the number row at the top and the ordered “neighboring pair / actual change / does candidate match?” inspector beneath. Highlight each newly checked pair briefly; leave the actual differences visible after revealing them. Use text and symbolic +3 / +4 / −2 labels with any status icons, not just red/green signals. Keep the interface spare, with no Program plot, timers, reward animations or external media. A reduced-motion state instantaneously shows the same numeric facts.

## LOCALIZATION, DIRECTION AND ACCESSIBILITY

- Translate “step”, “rule”, “fit”, “check every jump”, numeric changes, feedback and aria labels genuinely for every required language; no English fallback or omitted locales.
- In RTL, preserve the mathematical order of a→b and the actual b−a relation; label the order of terms and the increasing number-line direction instead of automatically reversing SVG geometry. Controls follow logical reading order.
- **Full nonvisual equivalent:** each pair is announced by term position and numeric values (“term one 2, term two 5, difference plus 3”), with text-based checked/unchecked and match/mismatch status. A screen-reader user can inspect every pair and choose an explanation without viewing the highlights.
- Keyboard-only, touch and switch-style users must be able to operate every control with visible focus and adequate targets. No drag-only, mouseover-only, color-only, audio-only or timed questions. Number/label expansions fit zoomed and small-screen layouts.
- Reduced motion eliminates only timing, never mathematical information. Every label, example and feedback message must work after a completed local download, without an API call. Readable HTML/text is an equivalent low-device path, not an inferior “lite” mode.
- Helpful feedback does not diagnose learner ability, assign grades or require spoken input.

## ACCEPTANCE SCENARIOS

1. For 2, 5, 9 with +3: first revealed gap matches; second gap is +4 and mismatches; overall “Does not fit every jump.”
2. Early selection of “Fits” still prompts examination of the second gap; no score or irreversible failure.
3. For 3, 6, 9, 12 with +3: all gaps +3 and overall fits.
4. For 3, 6, 10, 15 with +3: differences +3/+4/+5 and overall does not fit; do NOT label row “patternless.”
5. For 12, 10, 8, 6 with −2: all differences −2, valid decreasing constant step.
6. For 7, 10, 13, 16, ?: +3 for all observed gaps; 19 follows the chosen constant step. 18 and 20 receive exact +2/+4 explanations.
7. Learner can request hint or explanation without guessing; the complete reasoning remains available.
8. Reset/Section isolation works; the independent example does not inherit the earlier rule claim or responses.
9. LTR, RTL, keyboard, screen reader, reduced motion, zoomed mobile and offline modes expose identical numbers, difference calculations and explanatory outcomes.

## IMPLEMENTATION DEPENDENCIES AND OPEN QUESTIONS

- **Available:** generic Scene Resource type and current renderer, plus a Scene-localization context to be verified by Coding Agent for each selected locale.
- **Proposed:** this new Rule Inspector Scene, two isolated Scene entries, localized source strings and integration; editor approval, Design Scene implementation, accessibility tests and offline checks still required.
- **Curricular constraint:** The proposed arithmetic rule can fail without proving the row has no other mathematical description; this distinction is mandatory.
- **Assessment handoff:** None of the choices are validated or scored Questions. Only a separate Assessment Architect review could authorize that.
