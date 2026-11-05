# CategoryCounter — Interactive Scene Specification

**Status:** Provisional Draft — pending Methodologist approval and separate Scene review
**Lesson:** [Count What Belongs Together Content](../content.md)
**Methodologist scope:** [Draft Brief](../methodologist-brief.md)
**Canonical target Skill:** [collectCounts.data.ts](../../../../../data/skills/data/collection/skills/collectCounts.data.ts)
**Implementation:** Proposed, not implemented

## Educational purpose and why a Scene is justified

Assign observations to unambiguous categories, count the frequency of each category, and check that the category counts add to the total.

Choose an identified token by button, then choose one labelled category; undo the last assignment or move that token to the correct category without duplication; show category sums; optionally reveal worked reconciliation; reset per dataset.

This is a manipulable conceptual model; it is not a game reward, scored Question, random test or static illustrative decoration. The Scene must function independently, with no props and no external Lesson narrative. If used in more than one Section, reset it as an independent local instance rather than pass a mode prop.

## Content and visual model

Treat a fixed collection of eight shapes as observations. Sorting by shape is deliberate, with no ambiguous hybrid shapes. A running tally makes missing or double-counted objects immediately visible. Present unambiguous numerically faithful labels; preserve a textual statement of the same model. Never silently substitute different values after a learner responds.

## Required observable states and correct explanations

| State             | Required representation                                                        | Mathematical truth                                |
| ----------------- | ------------------------------------------------------------------------------ | ------------------------------------------------- |
| Original unsorted | Eight named tokens: C1–C4 circles, T1–T3 triangles, S1 square; all unassigned. | Total = 8; category totals start 0.               |
| Partly sorted     | Any subset assigned; counters equal actual distinct assigned tokens.           | No token can belong to two groups simultaneously. |
| Fully sorted      | C = 4, T = 3, S = 1; assigned count 8, unassigned 0.                           | 4+3+1=8 reconciles with original total.           |
| New collection    | Stars 5, circles 2, squares 2; initial counts zero.                            | Independent transfer total is 9.                  |

## Interaction protocol (pedagogical, not an API)

1. Render a complete accessible starting state with clearly named controls and an explanation of the current comparison.
2. Invite a prediction; allow opting directly into exploration without imposing a correctness gate.
3. Apply a learner's selected change and immediately expose the resulting state, including its numerical or categorical ground truth.
4. Offer the corresponding mathematical explanation on request or after a selection. If the learner makes a wrong choice, retain the cause of the mismatch and allow retry or a new case.
5. Provide reset to the known initial state. Keep all state local to this Scene; no cross-Scene props, global progress events, automatic mastery inference, Notes unlock, or invented persistence.
6. On independent transfer, reduce prompts but retain an optional hint and full reveal.

## Specific explanatory feedback and edge cases

- **What are we counting?:** If an object is assigned to the wrong category, state its shape and prompt a reclassification; do not remove or duplicate it.
- **Count each shape once:** If one remains: “Seven have been counted and one is still waiting. Count the remaining one before checking the total.”
- **Does everything add up?:** For 'no' when 4+3+1=8: “Add the groups in order: 4 + 3 = 7, and 7 + 1 = 8.”
- **New objects, same method:** If total differs, display assigned and unassigned counts; offer undo and retry instead of announcing a score.

**Do not teach outside this boundary:** Categorical frequencies for 6–12 visible discrete observations and 2–3 nonoverlapping exhaustive categories. No charting, percentages, averages or inferred relationships.

## Nonvisual and keyboard-equivalent learning path

An accessible item list labels every token by shape and assigned category. Keyboard controls assign each uniquely identified item to exactly one group; announce updated numeric counts, not only graphical movement.

Provide semantic button and selectable option names, visible focus, a logical tab order and clear state/response announcements without noisy live-region repetition. Preserve every essential learner decision in keyboard and screen-reader modes; do not require precise pointer dragging, motion perception, color differentiation, audio or a timer.

## Localization, RTL, mobile, offline and performance

All user-facing strings and accessible descriptions require authentic translations for every supported locale; do not invent an English fallback or assert completion. Mirror layout according to semantic reading order, **not** the meaning of numerals, clock-face relationships, shape geometry or sample-space membership. A constrained mobile viewport must retain the same meaningful choices. Use reduced-motion static states; a low-resource implementation can rely on labelled SVG/HTML rather than heavyweight rendering. The Scene and every explanatory state must work without network calls after offline content installation (planned platform capability).

## Build and review handoff

This spec has no React source, shared API, props, assets, Questions, scoring, test code or registered renderer. Future Scene implementation must provide self-contained tests for each state, feedback path, reset, meaningful RTL, keyboard/touch/screen-reader equivalence, low-end performance and offline behavior. A generic `scene` Resource type exists, but this named Scene is **not** implemented. Editorial acceptance remains pending.
