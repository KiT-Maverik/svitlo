# Expression Reader — Scene Specification

Status: Draft
Owner: Educational Screenwriter
Parent Lesson / Section: [Multiplication as Equal Groups](../content.md), Sections 2 and 4
Methodologist objective(s): Express equal groups as repeated addition and multiplication; read factors and product correctly while connecting the symbolic statement with its concrete group model. [Methodologist Brief](../methodologist-brief.md).

## LEARNER PURPOSE AND CONCEPT

Children see that the **same total** can be counted as repeated equal addends or as a multiplication expression. They inspect how “three groups of four” maps to 4+4+4=12 and, using the lesson’s stated convention, 3×4=12. They must distinguish group count, group size, factors and product in a model without mistaking 3+4=7 for the total.

## ACCURATE CONTENT AND MODEL LIMITATIONS

- **Chosen convention:** “number of groups × number in each group”. Other legitimate readings exist in other contexts; never state it is the only worldwide mathematical convention.
- Section 2: 3 groups with 4 in each; 4+4+4=12; 3×4=12. Factors 3 and 4, product 12.
- Section 4: 2 groups with 5 in each; 5+5=10; 2×5=10. Factors 2 and 5, product 10.
- Optional new model: 3 groups of 2; 2+2+2=6 and 3×2=6.
- Input group sizes and counts positive ≤5 with whole ≤25. No unequal groups may be presented as repeated _identical_ addends without changing the modeled grouping; no unproved commutativity teaching, division tasks, negative factors or timed tables.
- Distinguish the _numeric factor_ from the _meaning attached to it in one concrete model_. The result of a multiplication expression is its product, not one of its factors.

## EXPERIENCE BEATS AND LEARNER ACTIONS

**Section 2 / guided expression mapping**

1. Display 3 labeled groups containing 4 visible counters each and say “Three groups, four in each.”
2. A learner-selected “Show the addition” highlights groups one at a time and reveals **4 + 4 + 4 = 12**, with a written/accessible connection from each group to one addend 4.
3. “Show the short way” reveals **3 × 4 = 12**. Explain “The first factor, 3, counts our groups. The second factor, 4, counts each group. Twelve is the product, the total.”
4. Let the child select a displayed numeral and a question “Which number tells how many groups?” For 3: “Three groups.” For 4: “Four in each group.” For 12: “That is the total, the product.” The interface should describe roles rather than simply grade a click.
5. “Read it back” presents the whole explanation in ordered text; optional audio equivalent is not required for understanding. A child can request hints or the complete model without first selecting.
6. Explicit contrast if child selects 3+4 as equivalent: “Three plus four is seven. But our groups have twelve counters. To count all groups, we need 4+4+4.”

**Section 4 / independent transfer**

1. Display a fresh scene with two groups of five counters. “Can you name a matching addition and multiplication sentence?” Initial answers are not displayed.
2. Offer candidate additions **5+5=10**, **2+5=7** and **5+5+5=15** with text/radio-like selection; correct/model explanation for each is visible on request. The group count remains exactly two throughout.
3. Show matching multiplication choices **2×5=10**, **2×5=7** and **3×5=15**; distinguish an incorrect numeric result from an expression representing the wrong count of groups.
4. Highlight “2” as number of groups, “5” as size of a group and “10” as product. The learner can select or name each concept; show full explanation before completion if desired.
5. Optional “Try 3 groups of 2” changes the scene to an explicitly announced different example, with 2+2+2=6 and 3×2=6.
6. Finish with “What is the same about both sentences?” Suggested answer: “They count all the counters in the same equal groups.” No score or mastery announcement.

## INTERACTIVE OBJECTS, STATES AND RULES

- Objects: exactly countable group containers, incremental repeated-addend strip, multiplication expression, semantic named factor/product controls, choices, explanation/step/replay/reset controls, accessible ordered groups list.
- Two independent prop-free Scene entries for the two Sections. The guided or transfer placement is an editorial specification, **not** a public React mode prop. Scene data must be isolated per entry.
- State: current example (G,S), which groups/addends have been highlighted, whether corresponding expressions are revealed, provisional selected expression, whether helpful feedback is expanded.
- Invariant: W=G×S=sum(S repeated G times); the number of +S addends equals G and is visibly linked to G groups. Correct model grouping never mutates due to a candidate response; wrong expressions are labeled as incorrect trial representations.
- No hidden assessment scoring; a learner can freely reveal the worked example, reset, change optional example and retry.
- For groups or total out of range (above 25) do not produce results; only authorized deterministic examples are used.

## VISUAL / AUDIO / MEDIA DIRECTION

Use three aligned but individually distinct representations **inside the one Scene block**: countable groups, ordered addition strip and multiplication statement. Spotlight one-to-one correspondence, but the mathematics must remain usable without highlights. Modest motion can reveal the addends one by one; reduced motion shows the same mapping instantly. Numerals may not be baked into image assets. No sound, WebGL, streamed assets, Program imagery or automatic reward animation.

## LOCALIZATION, DIRECTION AND ACCESSIBILITY

- Translate “factors”, “product”, “groups of”, “in each”, action verbs, status messages and alt text genuinely into all supported locales. The lesson’s group-first convention must be explained rather than inferred from English word order.
- Keep LTR/RTL mathematical operand order and factor identities semantically stable. Screen reader should announce “three groups of four equals twelve; four plus four plus four equals twelve; three times four equals twelve”, with separate descriptions for group-count and per-group factors.
- Each correspondence can be inspected using native keyboard/touch/switch controls, no drag-only mapping or speech-recognition requirement. Text/table representation is equivalent: “group 1 four; group 2 four; group 3 four; total twelve; first factor three groups; second factor four per group; product twelve”.
- Visible focus, large touch areas, zoomed/narrow layout, reduced motion and screen reader feedback preserve every step and incorrect-choice explanation. No pressure timers or color-only semantics.
- Everything works offline after download using local deterministic data; math, localized labels and accessibility views must not depend on remote services.

## ACCEPTANCE SCENARIOS

1. 3 groups × 4: exactly 4+4+4=12 and 3×4=12; factor roles and product 12 labeled correctly.
2. 3+4=7 is distinguished from counting all 12 counters; never presented as equivalent to 3×4.
3. Guided selection of each symbol gives “group count”, “group size” or “product” with accurate language.
4. 2 groups of 5 yields exactly 5+5=10 and 2×5=10; false 2+5=7 or 5+5+5=15 are explained by group count.
5. Optional 3 groups of 2 yields 2+2+2=6 and 3×2=6.
6. A child may see all calculations without answering or earning a success state; reset does not affect the other Section.
7. Keyboard, screen reader, RTL, reduced motion, mobile/zoom and offline executions have identical counts, equation values and factor/product explanations.

## IMPLEMENTATION DEPENDENCIES AND OPEN QUESTIONS

Scene Resource and generic renderer are current capabilities; this interactive Scene, its two independently configured prop-free placements, full localization and tests are **proposed**. Coding Agent resolves concrete UI/runtime wiring after editor and Scene-spec approval; Assessment Architect owns any scored or Skill-attributed Question. Keep the selected factor convention explicit and revise only after editor approval.
