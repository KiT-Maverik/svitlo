# OutcomeBag — Interactive Scene Specification

**Status:** Provisional Draft — pending Methodologist approval and separate Scene review
**Lesson:** [Certain or Impossible? Content](../content.md)
**Methodologist scope:** [Draft Brief](../methodologist-brief.md)
**Canonical target Skill:** [certainImpossible.data.ts](../../../../../data/skills/probability/events/skills/certainImpossible.data.ts)
**Implementation:** Proposed, not implemented

## Educational purpose and why a Scene is justified

Classify specified events as certain, impossible or possible-but-not-certain using all possible outcomes of a one-token draw.

Inspect all bag contents; choose one specified event; submit certain/impossible/possible-but-not-certain; reveal matched vs unmatched tokens; switch between two preset bags; reset. No random draw is needed to prove the claims; no pseudo-random streak guarantees.

This is a manipulable conceptual model; it is not a game reward, scored Question, random test or static illustrative decoration. The Scene must function independently, with no props and no external Lesson narrative. If used in more than one Section, reset it as an independent local instance rather than pass a mode prop.

## Content and visual model

Use a closed conceptual bag with a completely disclosed inventory before predictions: two blue tokens and one red token. 'Green' is never among the disclosed outcomes. Repeated draws are not required and must not be used to imply guarantees. Present unambiguous numerically faithful labels; preserve a textual statement of the same model. Never silently substitute different values after a learner responds.

## Required observable states and correct explanations

| State                   | Required representation                                                                       | Mathematical truth                                         |
| ----------------------- | --------------------------------------------------------------------------------------------- | ---------------------------------------------------------- |
| Bag A inventory         | Exactly three tokens: B1 blue, B2 blue, R1 red. All contents visible before event prediction. | Possible colors are blue and red only.                     |
| Bag A green event       | Zero tokens satisfy green.                                                                    | Impossible.                                                |
| Bag A blue-or-red event | Three of three tokens satisfy the disjunction.                                                | Certain.                                                   |
| Bag A red event         | One of three tokens satisfies red; two do not.                                                | Possible but not certain; no numeric probability teaching. |
| Bag B inventory         | Exactly three blue tokens, no other colors.                                                   | Blue certain; red impossible; blue or red certain.         |

## Interaction protocol (pedagogical, not an API)

1. Render a complete accessible starting state with clearly named controls and an explanation of the current comparison.
2. Invite a prediction; allow opting directly into exploration without imposing a correctness gate.
3. Apply a learner's selected change and immediately expose the resulting state, including its numerical or categorical ground truth.
4. Offer the corresponding mathematical explanation on request or after a selection. If the learner makes a wrong choice, retain the cause of the mismatch and allow retry or a new case.
5. Provide reset to the known initial state. Keep all state local to this Scene; no cross-Scene props, global progress events, automatic mastery inference, Notes unlock, or invented persistence.
6. On independent transfer, reduce prompts but retain an optional hint and full reveal.

## Specific explanatory feedback and edge cases

- **What could come out?:** If green is included: “Look through all three tokens; there is no green one.”
- **When is something impossible?:** For 'possible': “Nothing green is in the bag, so no draw can produce green.”
- **What must happen?:** For 'red is certain': “Two blue tokens could also be selected. Red is possible, but not guaranteed.”
- **Change the conditions:** If 'blue or red' is called impossible: “Blue is one of the two colors named, so every draw satisfies 'blue or red'.”

**Do not teach outside this boundary:** Finite one-draw sample spaces with visible, fully specified bag contents; event categories based on all/some/no available outcomes. No percentages, numeric probabilities, independence, streak predictions or fairness assumptions.

## Nonvisual and keyboard-equivalent learning path

Present an ordered textual inventory and, for each event, an accessible list of outcomes satisfying or not satisfying it. Do not require seeing colors: every token has an explicit color word.

Provide semantic button and selectable option names, visible focus, a logical tab order and clear state/response announcements without noisy live-region repetition. Preserve every essential learner decision in keyboard and screen-reader modes; do not require precise pointer dragging, motion perception, color differentiation, audio or a timer.

## Localization, RTL, mobile, offline and performance

All user-facing strings and accessible descriptions require authentic translations for every supported locale; do not invent an English fallback or assert completion. Mirror layout according to semantic reading order, **not** the meaning of numerals, clock-face relationships, shape geometry or sample-space membership. A constrained mobile viewport must retain the same meaningful choices. Use reduced-motion static states; a low-resource implementation can rely on labelled SVG/HTML rather than heavyweight rendering. The Scene and every explanatory state must work without network calls after offline content installation (planned platform capability).

## Build and review handoff

This spec has no React source, shared API, props, assets, Questions, scoring, test code or registered renderer. Future Scene implementation must provide self-contained tests for each state, feedback path, reset, meaningful RTL, keyboard/touch/screen-reader equivalence, low-end performance and offline behavior. A generic `scene` Resource type exists, but this named Scene is **not** implemented. Editorial acceptance remains pending.
