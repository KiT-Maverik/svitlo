# Whole Removal Workbench — Scene Specification

Status: Draft
Owner: Educational Screenwriter
Parent Lesson / Section: [Subtracting a Number from Itself](../content.md), Sections 1–4
Methodologist objective(s): Understand a−a=0, contrast with a−0=a and partial removal, and verify with addition. [Methodologist Brief](../methodologist-brief.md) (Draft).

## LEARNER PURPOSE AND CONCEPT

An equal subtrahend is the **entire** starting group: zero is what remains. The Scene retains a record of removed counters to prevent a vanishing animation from making quantities mysterious. A three-case comparison makes the role of the second operand precise.

## ACCURATE CONTENT AND MODEL LIMITATIONS

Required values: 6−6=0; 6−0=6; 6−2=4; 12−12=0; 0−0=0; optional 9−9=0 and 4−4=0. For nonnegative starting amount a≤20 and removal r with 0≤r≤a, remaining = a−r; removed + remaining = a. For the target Skill r=a. No negative subtraction or arbitrary arithmetic operator reversal. 0−0 is valid and empty both before and after.

## EXPERIENCE BEATS AND LEARNER ACTIONS

1. **Full removal:** Show six counters, prompt “Take all six away.” “Remove all” moves exactly six into a labeled removed area; read “started 6, removed 6, left 0.” Predictions 6/0/2 are optional, explained.
2. **Contrast:** Reset separately before each trial 6−0, 6−2 and 6−6; child selects the amount removed and observes exact remain counts 6,4,0 respectively. Ask “Which action leaves none?”
3. **Transfer:** Twelve counters, remove all twelve with one control instead of twelve compulsory clicks; show zero left. An optional empty case 0−0=0 has a clear accessible empty-group description.
4. **Generalize:** Choose 9−9 or 4−4, predict zero, reveal all-removed evidence and check through 0+a=a. Compare with a−0=a when requested.
5. All stages support “Show model,” “Read counts,” “Try another,” “Undo,” “Reset,” and “Explain” without forced choice or score.

## INTERACTIVE OBJECTS, STATES AND RULES

Distinct prop-free Section entries; no public mode prop. State per entry includes start amount, removal amount, current/removed counters, optional prediction and explanation status. Invariant removed+remaining=start always; never count a removed counter as remaining. Changing case resets counts, reveals and feedback. Do not present 6−6 as 6 or 6−0 as 0. A response is never a graded result.

## VISUAL / AUDIO / MEDIA DIRECTION

Countable counters in source and “removed” areas, with clear textual before/after. Motion optional; reduced motion immediately shows both labeled collections. No animation disappearing without numeric feedback. No external imagery/video/audio/3D assets required.

## LOCALIZATION, DIRECTION AND ACCESSIBILITY

Translate all labels and arithmetic explanations genuinely for every supported locale. “Remove all,” “remove none,” “remaining zero” must be distinct. Accessible text ledger of start/removed/remaining plus every native keyboard/touch control makes the model fully operable without vision or dragging. Semantic LTR/RTL mathematical ordering, large targets, visible focus, screen-reader status, zoom, reduced motion and offline after full download all deliver the same reasoning.

## ACCEPTANCE SCENARIOS

1. 6−6 leaves 0, all six in removed group, no hidden extra.
2. Three contrast cases have before 6 each and after 6/4/0, never conflated as sequential removal.
3. 12−12 yields zero and 0−0 remains zero; no forced click repetition.
4. 9−9=0 is verified by 0+9=9; 9−0=9 remains correctly different.
5. Wrong predictions trigger accurate count-based feedback, reset and explanation, no scoring.
6. Screen reader, keyboard, RTL, reduced motion, zoomed mobile and offline display all exact values.

## IMPLEMENTATION DEPENDENCIES AND OPEN QUESTIONS

Typed Scene and renderer already exist; this implementation is proposed and awaits approvals and its own tests. Coding Agent provides prop-free Scene entries and full supported-language localization; Assessment Architect separately authorizes graded questions. No fabricated Note/score APIs.
