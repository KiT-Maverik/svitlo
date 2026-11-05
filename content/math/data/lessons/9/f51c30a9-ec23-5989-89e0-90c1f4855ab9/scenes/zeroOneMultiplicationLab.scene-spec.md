# Zero and One Multiplication Lab — Scene Specification

Status: Draft
Owner: Educational Screenwriter
Parent Lesson / Section: [Multiplying by Zero and One Content](../content.md), Sections 1–4
Methodologist objectives: Explain 4×0=0 with four groups that each contain zero items, and 0×4=0 with zero groups of four. Explain 4×1=4 with four groups of one, and 1×4=4 with one group of four. Apply a×0=0 and a×1=a to further whole-number examples without needing a picture every time. Distinguish 4+0=4 from 4×0=0, identifying the operation as well as the special factor. [Methodologist Brief](../methodologist-brief.md), not approved.

## LEARNER PURPOSE AND CONCEPT

Develop two distinct multiplication laws with evidence from small groups and numerical reasoning: multiplying a whole number by zero gives zero, while multiplying it by one leaves the same number. Neither property means that adding or subtracting zero works in the same way. The browser interaction invites evidence-based predictions and explicitly compares results, not a decorative animation or a hidden scoring event.

## ACCURATE CONTENT AND MODEL LIMITATIONS

Zero is absorbing for multiplication: a × 0 = 0 (also 0 × a = 0); one is the multiplicative identity: a × 1 = a (and 1 × a = a). Use 4×0=0, 0×4=0, 4×1=4, 1×4=4 and transfer 7×0=0, 7×1=7. Concrete equal-group models demonstrate cases but are not claimed to prove the law for every number domain; the source Skill's formal generality remains unchanged. Keep age-appropriate whole numbers 0–20. Claiming four groups of zero have four objects; confusing zero groups with one empty group; thinking any operation with zero produces zero, so 4+0=0; thinking ×1 adds one to the original; treating zero as an invalid multiplication factor because division by zero is forbidden. Do not conflate multiplication by zero with division by zero. **Invariant:** For each n, n×0=0 and n×1=n, 0×n=0 and 1×n=n; countable objects and textual group counts match the expression exactly. Addition comparison n+0=n remains separate. Empty group vs no group remain distinct representations.

## EXPERIENCE BEATS AND LEARNER ACTIONS

1. **Placement 1 — Four Empty Groups:** Prompt “There are four boxes. Each has ZERO counters. How many counters altogether?”. Show four labeled empty trays; child inspects each and counts zero total; display 4×0=0 without adding a phantom object. Explain “Four groups of zero contain no counters. Four times zero is zero: 4 × 0 = 0.”. **If mistaken:** For 'four counters', explain that four counts the boxes, not the counters in the boxes. The same group-size fact holds for each empty group. Learner may show every step without guessing.

2. **Placement 2 — Zero Groups Is Still Zero:** Prompt “What if we have ZERO groups of four counters? How many counters are in those groups?”. Switch from four empty groups to no groups, show 0×4=0. Keep the difference between 'four empty boxes' and 'no boxes' in the accessible ledger. Explain “Zero groups of four contain zero counters. The pictures differ, but both products are zero.”. **If mistaken:** If child claims four, report that no group exists to hold the four objects. Avoid dividing by zero claims here. Learner may show every step without guessing.

3. **Placement 3 — One Changes Nothing:** Prompt “Compare FOUR groups of ONE with ONE group of FOUR. How many counters in each?”. Display four individually labeled one-counter trays (4×1) and then one four-counter tray (1×4); give learner-controlled switch and exact ledger. Explain “4 × 1 = 4 and 1 × 4 = 4. One group of four is four; four groups of one also make four.”. **If mistaken:** For five, distinguish multiplication 4×1=4 from addition 4+1=5. Keep the original four counters counted exactly once. Learner may show every step without guessing.

4. **Placement 4 — Test a New Number:** Prompt “Without drawing first: what are 7 × 0 and 7 × 1? And what is 7 + 0?”. Offer numerical trial choices for 7×0, 7×1 and contrasting 7+0; child can reveal seven single counters, seven empty groups or one seven-counter group. Explain “7 × 0 = 0; 7 × 1 = 7; 7 + 0 = 7. The operation matters. Multiplying by zero is not the same as adding zero.”. **If mistaken:** If learner says seven for 7×0, show empty groups; if zero for 7+0, explain that adding no objects leaves the seven already present. Learner may show every step without guessing.

## INTERACTIVE OBJECTS, STATES AND RULES

- Four independently initialized self-contained prop-free Scene entries; Section-specific "mode" is an editorial label, not a public React prop or invented Resource field.
- Objects: labeled row/group counters, exact numerals and expressions, progressive reveal, multiple optional selection controls, accessible ordered state ledger, Reset/Undo/Explain controls.
- **State:** Whole-number example n=4 or 7, factor zero/one, group-count-first meaning, empty/one-counter/group-of-n placements, selected numerical trial, revealed explanation and current example.
- **Invariant:** For each n, n×0=0 and n×1=n, 0×n=0 and 1×n=n; countable objects and textual group counts match the expression exactly. Addition comparison n+0=n remains separate. Empty group vs no group remain distinct representations. Validate each user action against the model; wrong trial expressions must be marked as not matching, not shown as true identities.
- No state stores mastery, score, threshold, question grading or personal analytics. Hints and explanatory reveal are never locked by correctness.

## VISUAL / AUDIO / MEDIA DIRECTION

Compact countable dots/group containers with legible text and numeric labels. User-paced rotate/switch/reveal transitions may guide attention; under reduced motion all states and quantities appear immediately with equivalent reasoning. No required photos, generated artwork, audio, WebGL, streamed video, narrator or rewards.

## LOCALIZATION, DIRECTION AND ACCESSIBILITY

All prompts, operation names, counts, status, errors and aria labels require actual translations for all supported locales; English is source only. In RTL, factor/order and group/row meanings retain correct semantics and increasing/rotating directions are explicitly described. A screen-reader user has fully operable numbered state lists and native controls giving identical choices/transformations, not just image descriptions. Visible focus, switch/keyboard/touch operation, large targets, responsive/zoomed mobile display and reduced-motion parity are required. After download all calculations, alternatives and localized feedback must run offline, without audio, color-only signals or drag/speech requirements.

## ACCEPTANCE SCENARIOS

1. Four Empty Groups: Show four labeled empty trays; child inspects each and counts zero total; display 4×0=0 without adding a phantom object. Correct evidence: Four groups of zero contain no counters. Four times zero is zero: 4 × 0 = 0.
2. Zero Groups Is Still Zero: Switch from four empty groups to no groups, show 0×4=0. Keep the difference between 'four empty boxes' and 'no boxes' in the accessible ledger. Correct evidence: Zero groups of four contain zero counters. The pictures differ, but both products are zero.
3. One Changes Nothing: Display four individually labeled one-counter trays (4×1) and then one four-counter tray (1×4); give learner-controlled switch and exact ledger. Correct evidence: 4 × 1 = 4 and 1 × 4 = 4. One group of four is four; four groups of one also make four.
4. Test a New Number: Offer numerical trial choices for 7×0, 7×1 and contrasting 7+0; child can reveal seven single counters, seven empty groups or one seven-counter group. Correct evidence: 7 × 0 = 0; 7 × 1 = 7; 7 + 0 = 7. The operation matters. Multiplying by zero is not the same as adding zero.
5. Wrong predictions trigger the specific numerical explanatory feedback for that model, with retry/reveal and no score.
6. Reset and independent Section instances do not leak state.
7. Nonvisual, keyboard, RTL, zoom, reduced-motion, low-end-device and downloaded offline states preserve the same mathematical conclusions.

## IMPLEMENTATION DEPENDENCIES AND OPEN QUESTIONS

The generic scene resource renderer exists; **Zero and One Multiplication Lab itself is proposed** and requires upstream Methodologist/editor approval, a separate approved Scene spec, prop-free implementation and own tests. Coding Agent confirms real locale and offline wiring. Assessment Architect alone can authorize scored Questions. Editorial issue: The canonical Skill combines ×0 and ×1 as approved. Keep the two laws distinct in the teaching and do not split the taxonomy without explicit editorial approval. Verify that a zero-sized group is unambiguously represented nonvisually.
