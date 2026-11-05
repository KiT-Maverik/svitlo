# Hundred Exchange Lab — Scene Specification

Status: Draft
Owner: Educational Screenwriter
Parent Lesson / Section: [Regrouping Through a Zero Place](../content.md), Sections 1–2
Methodologist objective(s): Explain and demonstrate two adjacent base-ten exchanges across an empty tens place while preserving 302. [Methodologist Brief](../methodologist-brief.md) (Draft).

## LEARNER PURPOSE AND CONCEPT

This learner-controlled experiment makes the zero tens column **meaningful**, not a mysterious gap: three hundreds and two ones can become two hundreds, ten tens and two ones; then two hundreds, nine tens and twelve ones. Every state still represents 302. The child sees why an exchange must decrease the source place while increasing its adjacent destination by ten.

## ACCURATE CONTENT AND MODEL LIMITATIONS

Fixed amount **302**. Initial 3H+0T+2O=302. First exchange: 2H+10T+2O=302. Second exchange: 2H+9T+12O=302. Invariant 100H+10T+O=302 before subtraction. Each hundred bundle represents exactly ten ten-bundles; each ten represents ten ones. An exchanged source bundle is not retained as a countable extra item. Invalid states 3H+10T+2O=402 or 2H+10T+12O=312 are flagged as mistaken double counting, never presented as equivalents. No subtraction of 175 yet; no out-of-scope negative quantities, more than two consecutive exchanges, or zero chain across thousands.

## EXPERIENCE BEATS AND LEARNER ACTIONS

1. **Section 1 entry:** Display numeral 302 and text “3 hundreds, 0 tens, 2 ones”. Ask “If we need five ones, where can we get more ones? We have no tens to open.” Allow inspection of hundreds/tens/ones labels and the relation 1H=10T, with full answer reveal.
2. A “Show one hundred as ten tens” action opens one isolated hundred bundle demonstratively, updating model from (3,0,2) to (2,10,2). Total computation 2×100+10×10+2=302 remains on screen.
3. **Section 2 independent entry:** Present the same initial (3,0,2), then learner triggers “Exchange one hundred” to get (2,10,2); next enables “Exchange one ten” to reach (2,9,12). Both transitions are user-paced, reversible and labeled.
4. “Count all” shows three equivalent equations: 300+0+2=302, 200+100+2=302, 200+90+12=302. Ask “What stayed the same?” Answer: “The total 302.”
5. If a learner tries exchanging a ten while T=0, respond “There are no tens yet. First exchange a hundred into ten tens.” If they propose (2,10,12), show 312, say “We kept the ten that should have turned into ten ones.”
6. “Undo last exchange” returns to immediately previous state; “Reset” returns to initial 302. “Show steps” reveals both exact transitions without requiring success.

## INTERACTIVE OBJECTS, STATES AND RULES

- One prop-free Scene entry per Section, with separate state; do not invent a public mode prop or runtime Scene field.
- Visible objects: labeled Hundred/Ten/One count ledger, large blocks/bundles with explicit value markings and accessible equivalent text, one numerical total, and native Exchange/Undo/Reset/Read controls.
- State is a three-integer tuple H,T,O; initial (3,0,2); permitted forward states (2,10,2) then (2,9,12). Controls may highlight a source bundle but do not allow unsupported direct hundreds→ones leap. A total readout computes H×100+T×10+O and must always equal 302 for valid states.
- All wrong proposals must be announced as **not equal to 302**, without falsely mutating actual amount. No Quiz, reward, confidence score, mastery event or Notes API.

## VISUAL / AUDIO / MEDIA DIRECTION

Use lightweight HTML/SVG base-ten block symbols and exact count labels; each split is learner-triggered and shown in a short animation only when motion is permitted. After each exchange retain a static clear place-value state. Avoid showing hundreds as 100 tiny dots if that impairs comprehension or low-end performance: a labeled 100-block with ten accessible tens constituents is equivalent. Meaning must not depend on color, animation or sound. No image asset, video or 3D dependency.

## LOCALIZATION, DIRECTION AND ACCESSIBILITY

Translate all source prompts, numeral names, “hundred”, “ten”, “one”, error explanations, reset/reveal and aria statuses authentically in all supported languages. Mathematical 100H+10T+O and the place-value order must preserve numeric meaning in RTL; use labeled values, not screen position alone. Fully interactive nonvisual ledger: “Start: three hundreds, zero tens, two ones, total 302”; “After first exchange: two hundreds, ten tens, two ones, total 302”; “After second: two hundreds, nine tens, twelve ones, total 302.” Keyboard, switch/touch, focus, zoom, mobile, reduced motion, large labels and independent offline state transitions required. No drag-only or timed control.

## ACCEPTANCE SCENARIOS

1. Initial H3,T0,O2 is 302 with one accessible text state.
2. First valid exchange H2,T10,O2 computes 302, and H3,T10,O2 is identified as 402, not a valid equal representation.
3. Second valid exchange H2,T9,O12 computes 302; H2,T10,O12 is identified as 312 and double counting.
4. Attempt exchange from zero tens before obtaining tens is blocked with an explanation and working reveal.
5. Undo reverses one step, Reset restores (3,0,2); independent Section placements do not leak state.
6. Keyboard, screen reader, LTR/RTL, reduced motion, mobile and offline after download provide the same number ledger and equivalent controls.

## IMPLEMENTATION DEPENDENCIES AND OPEN QUESTIONS

Generic scene Resource rendering is available; this Scene is **proposed** and depends on prior Methodologist/editorial approval and its own Scene spec review. Coding Agent designs prop-free Scene entries, localization and tests; no scored assessment or false offline-sync API. Editor must retain the age/readiness gate.
