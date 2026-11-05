# ClockExplorer — Interactive Scene Specification

**Status:** Provisional Draft — pending Methodologist approval and separate Scene review
**Lesson:** [Reading Whole Hours Content](../content.md)
**Methodologist scope:** [Draft Brief](../methodologist-brief.md)
**Canonical target Skill:** [readHour.data.ts](../../../../../data/skills/time/clock/skills/readHour.data.ts)
**Implementation:** Proposed, not implemented

## Educational purpose and why a Scene is justified

Read exact hours on analog clocks using the hands correctly and match those readings to digital time.

Use twelve labelled hour choices or a controlled previous/next hour control (1–12 cycling only for preset selection), identify each hand, cover/reveal a digital :00 reading and reset to 3:00. No freehand dragging or invented time API.

This is a manipulable conceptual model; it is not a game reward, scored Question, random test or static illustrative decoration. The Scene must function independently, with no props and no external Lesson narrative. If used in more than one Section, reset it as an independent local instance rather than pass a mode prop.

## Content and visual model

Display analog and digital clocks together, use a manually controlled clock with labeled hands, and use nonvisual hand-position descriptions rather than color or rotation alone. Present unambiguous numerically faithful labels; preserve a textual statement of the same model. Never silently substitute different values after a learner responds.

## Required observable states and correct explanations

| State    | Required representation                                                                       | Mathematical truth                           |
| -------- | --------------------------------------------------------------------------------------------- | -------------------------------------------- |
| Initial  | Static 3:00 clock, short hour hand at 3, long minute hand at 12; labels displayed separately. | Both roles identifiable regardless of color. |
| Hour 4   | 4:00 with short hand at 4 and long hand at 12; digital form hidden until reveal.              | Hour changes, minute condition stays fixed.  |
| Hour 5   | 5:00 same pattern; no claim hour hand teleports in reality.                                   | Exact-hour snapshots only.                   |
| Transfer | 8:00 clock with distractors 8:00, 12:08, 8:30.                                                | Short vs long hand reasoning.                |

## Interaction protocol (pedagogical, not an API)

1. Render a complete accessible starting state with clearly named controls and an explanation of the current comparison.
2. Invite a prediction; allow opting directly into exploration without imposing a correctness gate.
3. Apply a learner's selected change and immediately expose the resulting state, including its numerical or categorical ground truth.
4. Offer the corresponding mathematical explanation on request or after a selection. If the learner makes a wrong choice, retain the cause of the mismatch and allow retry or a new case.
5. Provide reset to the known initial state. Keep all state local to this Scene; no cross-Scene props, global progress events, automatic mastery inference, Notes unlock, or invented persistence.
6. On independent transfer, reduce prompts but retain an optional hint and full reveal.

## Specific explanatory feedback and edge cases

- **Two hands, different jobs:** If minute hand is selected for hour: “That is the longer hand. At whole hours it points to 12, while the shorter hand tells us which hour.”
- **Build three o'clock:** If 12:03 is selected: “The long hand points to 12 to show zero minutes, not the hour 12. The short hand is at 3.”
- **Change the hour, keep the pattern:** If a learner claims both hands should point to 4: “Only the short hour hand points to 4; the minute hand stays at 12 at an exact hour.”
- **Can you read a different clock?:** For 8:30: “At half past eight, the minute hand would point at 6, not 12.”

**Do not teach outside this boundary:** Read exact 1:00–12:00 analog times and matching digital :00 times. Note that the hour hand moves continuously in real clocks but do not teach intermediate readings. Exclude 24-hour notation, morning/evening inference, elapsed intervals, minute counting and time zones.

## Nonvisual and keyboard-equivalent learning path

Use accessible description 'Short hour hand points to 8; long minute hand points to 12; what whole-hour time is shown?' and present the same answer options. Hand length is expressed semantically.

Provide semantic button and selectable option names, visible focus, a logical tab order and clear state/response announcements without noisy live-region repetition. Preserve every essential learner decision in keyboard and screen-reader modes; do not require precise pointer dragging, motion perception, color differentiation, audio or a timer.

## Localization, RTL, mobile, offline and performance

All user-facing strings and accessible descriptions require authentic translations for every supported locale; do not invent an English fallback or assert completion. Mirror layout according to semantic reading order, **not** the meaning of numerals, clock-face relationships, shape geometry or sample-space membership. A constrained mobile viewport must retain the same meaningful choices. Use reduced-motion static states; a low-resource implementation can rely on labelled SVG/HTML rather than heavyweight rendering. The Scene and every explanatory state must work without network calls after offline content installation (planned platform capability).

## Build and review handoff

This spec has no React source, shared API, props, assets, Questions, scoring, test code or registered renderer. Future Scene implementation must provide self-contained tests for each state, feedback path, reset, meaningful RTL, keyboard/touch/screen-reader equivalence, low-end performance and offline behavior. A generic `scene` Resource type exists, but this named Scene is **not** implemented. Editorial acceptance remains pending.
