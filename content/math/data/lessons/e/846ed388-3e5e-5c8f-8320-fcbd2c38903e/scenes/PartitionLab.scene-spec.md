# PartitionLab — Interactive Scene Specification

**Status:** Provisional Draft — pending Methodologist approval and separate Scene review
**Lesson:** [Equal Parts of One Whole Content](../content.md)
**Methodologist scope:** [Draft Brief](../methodologist-brief.md)
**Canonical target Skill:** [wholeAndEqualParts.data.ts](../../../../../data/skills/fractions/representation/skills/wholeAndEqualParts.data.ts)
**Implementation:** Proposed, not implemented

## Educational purpose and why a Scene is justified

Recognize a chosen whole and decide whether it has been partitioned into parts of equal area, including when the equal pieces look different.

Choose a cut by a labelled button; predict equal/unequal; reveal the unit-square or matching explanation; move between preset wholes; reset. All parts stay attached to their own displayed original outlines.

This is a manipulable conceptual model; it is not a game reward, scored Question, random test or static illustrative decoration. The Scene must function independently, with no props and no external Lesson narrative. If used in more than one Section, reset it as an independent local instance rather than pass a mode prop.

## Content and visual model

Draw a midpoint vertical cut and an off-center vertical cut on exactly the same rectangle, then place a diagonal cut as a counterexample to the 'same outline' misconception. Present unambiguous numerically faithful labels; preserve a textual statement of the same model. Never silently substitute different values after a learner responds.

## Required observable states and correct explanations

| State            | Required representation                                                                     | Mathematical truth                                           |
| ---------------- | ------------------------------------------------------------------------------------------- | ------------------------------------------------------------ |
| Initial          | One 8×4 rectangle, 32 congruent unit squares, no cut; 'Show whole' highlights outer border. | Identifies one reference whole rather than a detached piece. |
| Middle split     | Vertical cut into 4×4 + 4×4: areas 16 and 16.                                               | Both parts are equal; two halves.                            |
| Off-centre split | Vertical cut into 2×4 + 6×4: areas 8 and 24.                                                | Two parts exist but are unequal.                             |
| Diagonal split   | Corner-to-corner diagonal of an 8×4 rectangle: two right triangles each area 16.            | Triangles differ in orientation, yet have equal area.        |
| Changed whole    | 4×4 split into two 8-unit halves versus 8×4 split into two 16-unit halves.                  | Equal parts of different wholes need not match.              |

## Interaction protocol (pedagogical, not an API)

1. Render a complete accessible starting state with clearly named controls and an explanation of the current comparison.
2. Invite a prediction; allow opting directly into exploration without imposing a correctness gate.
3. Apply a learner's selected change and immediately expose the resulting state, including its numerical or categorical ground truth.
4. Offer the corresponding mathematical explanation on request or after a selection. If the learner makes a wrong choice, retain the cause of the mismatch and allow retry or a new case.
5. Provide reset to the known initial state. Keep all state local to this Scene; no cross-Scene props, global progress events, automatic mastery inference, Notes unlock, or invented persistence.
6. On independent transfer, reduce prompts but retain an optional hint and full reveal.

## Specific explanatory feedback and edge cases

- **Which shape is the whole?:** If only a piece is selected as the whole: “That is one piece. Follow the original outer border to find the whole sheet.”
- **A cut does not guarantee equal parts:** For incorrect 'equal' on 2+6: “Count or match the covered squares: this side covers 8 small squares and the other 24. They are not equal.”
- **Equal parts can have different outlines:** If 'not equal' is selected: “The outlines are triangles, but turning one shows the pieces match in area; each is half of the same sheet.”
- **What if the whole changes?:** If 'same size' is chosen: “Check which original sheet is larger; equal division does not make the two wholes the same.”

**Do not teach outside this boundary:** Use one rectangular paper sheet, its equal-area halves and quarters, and a contrasting off-center cut. Equal means equal area of the same whole, not necessarily identical shape or outline. Defer fraction symbols, numerator/denominator language, arithmetic with fractions and area formulas.

## Nonvisual and keyboard-equivalent learning path

Offer nonvisual labelled area statements, e.g. 'Left area 8 of 32; right area 24 of 32', then ask the same comparison without requiring shape recognition.

Provide semantic button and selectable option names, visible focus, a logical tab order and clear state/response announcements without noisy live-region repetition. Preserve every essential learner decision in keyboard and screen-reader modes; do not require precise pointer dragging, motion perception, color differentiation, audio or a timer.

## Localization, RTL, mobile, offline and performance

All user-facing strings and accessible descriptions require authentic translations for every supported locale; do not invent an English fallback or assert completion. Mirror layout according to semantic reading order, **not** the meaning of numerals, clock-face relationships, shape geometry or sample-space membership. A constrained mobile viewport must retain the same meaningful choices. Use reduced-motion static states; a low-resource implementation can rely on labelled SVG/HTML rather than heavyweight rendering. The Scene and every explanatory state must work without network calls after offline content installation (planned platform capability).

## Build and review handoff

This spec has no React source, shared API, props, assets, Questions, scoring, test code or registered renderer. Future Scene implementation must provide self-contained tests for each state, feedback path, reset, meaningful RTL, keyboard/touch/screen-reader equivalence, low-end performance and offline behavior. A generic `scene` Resource type exists, but this named Scene is **not** implemented. Editorial acceptance remains pending.
