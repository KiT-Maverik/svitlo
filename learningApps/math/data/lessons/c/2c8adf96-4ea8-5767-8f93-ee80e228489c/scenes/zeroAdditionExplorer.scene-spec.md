# Zero Addition Explorer — Scene Specification

Status: Draft
Owner: Educational Screenwriter
Parent Lesson: [Adding Nothing Changes Nothing Content](../content.md), Sections 1–4
Methodologist objectives: Explain that 6+0=6 using six objects and an empty contribution. Explain that 0+6=6 gives the same total despite different zero position. Distinguish an empty addend from an empty total and from an actual new contribution. Predict the sum for a fresh number (9+0 and 0+9) and verify without compulsory counting. [Methodologist Brief](../methodologist-brief.md) (Draft, not approved)

## LEARNER PURPOSE AND CONCEPT

Show that zero contributes no objects to an addition, so the starting amount remains. Treat a+0=a and 0+a=a as the same value with different positions for the zero addend; contrast adding zero with starting from zero, not with subtraction.

Each learner action must preserve or change quantities exactly as the narrated context requires. The Scene's instructional feedback is not a correct/incorrect mastery engine.

## ACCURATE CONTENT AND MODEL LIMITATIONS

Nonnegative whole numbers 0–20; initial examples 6+0=6, 0+6=6, contrast 6+2=8 and boundary 0+0=0, transfer 9+0=9 and 0+9=9. No generalized discussion of different number systems.

**Misconceptions and forbidden depictions:** The child may think a displayed zero means all objects disappear, or that zero at the front makes the sum zero. Adding zero must not be shown as a 'zero-sized' ghost counter or as removing objects. Never use an arbitrary visual position or color as the only evidence of object roles. Any reported equality must match actual object counts in its own story.

## EXPERIENCE BEATS AND LEARNER ACTIONS

1. **Section 1 / A Tray of Six and an Empty Tray:** Prompt “One tray has six counters. The other is empty. How many in both trays together?” Initial and learner actions: Show six countable counters in one labeled tray and an empty tray labeled 0. Learner counts both, may reveal '6 from first, 0 from second' and sees six total. The numerical conclusion is **6 + 0 = 6**. Feedback and explanation: We combined six counters with no counters. None were added to the six, so there are still six. For a misconception: If zero chosen as sum, show the original six still present; if seven chosen, show no extra object in the empty tray. Hints and full reveal are available at every step.

2. **Section 2 / The Empty Tray Comes First:** Prompt “If the empty tray is written first, does the answer change?” Initial and learner actions: Learner changes from 6+0 to 0+6, with exactly six objects still present. Accessible 'first tray zero; second six; total six' counters. The numerical conclusion is **0 + 6 = 6**. Feedback and explanation: The first addend is zero, but the second has six. Together they still make six. The place of zero doesn't make the counters disappear. For a misconception: Choosing zero gets a concrete group-by-group readout; don't presume the whole commutativity theorem is already learned. Hints and full reveal are available at every step.

3. **Section 3 / No Contribution or Two More?:** Prompt “What happens when we add zero to six? What if we add two instead?” Initial and learner actions: Two independent trials begin with six: 6+0=6 and 6+2=8. Learner picks the added amount and sees exact resulting count without modifying the other trial. The numerical conclusion is **6 + 0 = 6; 6 + 2 = 8**. Feedback and explanation: Zero adds no objects. Two adds two objects. The difference is the amount contributed, not a magical rule changing all totals to zero. For a misconception: If the learner predicts eight for the zero case, display no arrivals; if six for +2, show the two distinct added counters. Hints and full reveal are available at every step.

4. **Section 4 / Try Nine and the Boundary:** Prompt “What is nine plus zero? What about zero plus nine? What about zero plus zero?” Initial and learner actions: Offer three independent cases, predict/reveal totals nine, nine and zero, with explicit text ledger and optional counter pictures. The numerical conclusion is **9 + 0 = 9; 0 + 9 = 9; 0 + 0 = 0**. Feedback and explanation: A number plus zero stays the number, whichever side zero is on. Zero plus zero is zero because neither addend contributes any objects. For a misconception: Mistaking 0+9 for zero triggers a 'second addend nine' readout; 0+0=9 is rejected by both empty collections. Hints and full reveal are available at every step.

## INTERACTIVE OBJECTS, STATES AND RULES

- Four Section-specific self-contained **prop-free** entries. State does not leak across Section instances. Exact component paths/registration chosen by Coding Agent; editorial placement is not a new public `mode` prop.
- **Objects:** countable counters, semantically named initial and added/combined groups, numeric equations, keyboard-operable action buttons, prediction candidates if useful, readable steps and reset/explanation controls.
- **State:** independent placement example, initial count, contribution count, position of zero, displayed group labels, candidate and visible explanation; no score.
- **Invariants:** each described initial group, incoming/other contribution and current whole must be numerically consistent with the declared example. An object belongs to exactly one counted source contribution, and an optional wrong choice cannot silently mutate the true model.
- Reset restores the initial data for that entry, reveal is available without answering; no QuizState, score, mastery event, token reward or persisted assessment.
- Every action provides a deterministic text readout of before/after, not a visual-only change.

## VISUAL / AUDIO / MEDIA DIRECTION

Use simple high-contrast HTML/SVG counters and labeled bowls/trays, with clear group boundaries and large numbers. Move only the explicitly newly arriving objects in a growth story; do not invent arrivals in a union story. Optional step-by-step transitions are user-controlled. Reduced-motion provides identical before/after count ledger and contextual explanations immediately. No external audio/video/image or WebGL required.

## LOCALIZATION, DIRECTION AND ACCESSIBILITY

Translate every phrase, group role, action label, status and feedback to all supported locales; no English fallback. An accessible ordered numeric ledger and keyboard/touch/switch controls must let a screen-reader user carry out each operation and inspect totals, without relying on vision, precise dragging, sound or speed. Math expressions keep semantically correct operands and operators in RTL; don't mirror object quantities into incorrect roles. Visible focus, 200% zoom, child-size targets, reduced motion, mobile/weak-device and offline operation after downloaded content package are acceptance requirements.

## ACCEPTANCE SCENARIOS

1. 6+0=6 retains six objects and visibly/textually represents zero added.
2. 0+6=6 remains six with explicit role identification.
3. The 6+0 and 6+2 trials have different totals (6 and 8) without shared state leakage.
4. 9+0, 0+9, 0+0 yield 9, 9 and 0.
5. Prediction mistakes produce exact numerical explanatory feedback and permit retry or complete reveal without score.
6. Section placements reset independently and preserve model counts and equation roles.
7. Keyboard, screen reader, semantic RTL, zoom/mobile, reduced motion and downloaded offline logic provide identical conclusions.

## IMPLEMENTATION DEPENDENCIES AND OPEN QUESTIONS

Existing generic `scene` Resource and Lesson rendering are available; **Zero Addition Explorer itself is not implemented**. It requires editor approval of the Methodologist Brief, independent Scene spec approval, prop-free React implementation, accessible tests and genuine locale context integration. Assessment Architect alone authorizes any scored item. Editorial review item: Keep empty trays perceptible in screen-reader mode: an empty collection needs a real textual description, not invisible graphic content.
