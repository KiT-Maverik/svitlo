# Route Explorer — Scene Specification

Status: **Provisional Draft pending Methodologist approval**
Owner: Educational Screenwriter
Parent Lesson / Sections: [Follow and Explain a Route](../content.md), Sections 1–4
Methodologist objectives: [Draft Brief](../methodologist-brief.md) — give and follow **ordered route directions** relative to an explicit starting heading. Do not invent another Skill.

## LEARNER PURPOSE AND CONCEPT

A route is an ordered sequence of state changes. The learner sees, predicts and manipulates the explorer's _heading_ separately from its _position_, watches an instruction tape applied in order, then gives new instructions for a target. Changing initial heading or order can change the destination even when command words do not change.

Core learner voice: "**A turn changes where I face. Forward changes where I am. The next instruction uses my new direction.**"

## ACCURATE CONTENT AND MODEL LIMITATIONS

- The map is a bounded, obstacle-free 5×5 discrete square grid. Model coordinates (column, row): 0–4 in each axis; (0,0) at map top-left. The numerical coordinates are editorial/test labels **not demanded** in the child's UI.
- Headings: **north** = row −1 (toward map top), **east** = column +1 (toward map right), **south** = row +1, **west** = column −1. Headings describe fixed **map direction**, not interface text direction or device compass.
- Commands: **Forward one** moves one square along current heading, heading unchanged. **Turn right** rotates 90° clockwise in place; **Turn left** rotates 90° counterclockwise in place. Neither turn changes square.
- Coordinates and heading update **sequentially**, not in a batch of unordered choices. A path crossing a map edge is invalid; do not wrap, jump, or pretend the explorer moved.
- No diagonal/45° turns, obstacles, shortest-path requirement, virtual heading inferred from UI language, real-world compass, timing, grades or unlocked states.

## EXPERIENCE BEATS AND LEARNER ACTIONS

### Placement A — Turn Without Walking (Section 1)

1. Display explorer at (2,2) heading **north**; outer square grid stable. Label arrow "Facing map top".
2. Text: "**Turn right. Does the explorer change squares?**" Two accessible choices: "Same square, another direction" / "Moves one square". Before reveal, keep choices undoable.
3. "Show turn" rotates arrow **north → east**; position remains (2,2). State statement: "Same square (middle), now facing map right."
4. Wrong "moves" response gets: "Its square did not change. A turn changes the arrow." Correct gets: "Yes. It turned but did not walk."
5. Offer a contrasting **Forward one** from reset: start north (2,2) → (2,1) still north; show difference between actions. Reset restores original placement.

### Placement B — Execute a Command Tape (Section 2)

1. Fixed start (2,2) facing north; tape with three commands: **Forward, Right, Forward**. Before each command, allow prediction of the new heading or square.
2. Step 1: forward → **(2,1), north**. Step 2: right → **(2,1), east**. Step 3: forward → **(3,1), east**.
3. Show readable log after each step. On request, compare arrow _before/after_ one command.
4. For destination (2,0): "That would mean forward twice with no turn. The turn made the last step go right." For (3,2): "The first forward already took us up a square."
5. "Undo" restores both coordinates and heading from the previous logged state; "Replay" and reset produce identical transitions.

### Placement C — Change One Variable (Section 3)

1. Same tape **Forward, Right, Forward**, same starting (2,2), but **east** start heading. Prediction: "Will we finish where we did before?"
2. Progression: (2,2) east → **(3,2) east** → **(3,2) south** → **(3,3) south**. Display prior (3,1) north-start finish only as an optional textual comparison.
3. Restore original north heading and instead reorder tape **Right, Forward, Forward**. Progression: (2,2) north → **(2,2) east** → **(3,2) east** → **(4,2) east**.
4. Explanation: "We changed the start arrow once, then changed command order. Both changes led elsewhere in these examples." Not a claim that any route reorder _always_ changes its finish.
5. Both comparison paths remain reviewable by textual ordered state lists, even if lines visually overlap.

### Placement D — Author and Debug a Route (Section 4)

1. New preset start (1,3), heading north, target square (2,2). Command editor has insert, remove, move up/down, and reset buttons; optional reorder drag never required.
2. Maximum six commands, using the exact three allowed actions. One valid tape is **Forward, Right, Forward**, ending (2,2) east.
3. Execute stepwise or review full trace with each state. Do **not** compare the tape to one hard-coded answer: other sequences reaching (2,2) are valid when **only destination** is requested.
4. If an attempt goes to a different square, show **first divergent command** only relative to a displayed sample route _when comparison is requested_, without claiming other valid routes are wrong; otherwise describe the resulting position and ask which action to revise.
5. Edge example: at (4,2) facing east, "Forward" would leave grid. Action is not applied; explain: "No square lies beyond the right edge. Turn or change your route." Do not silently clamp while marking a command successful.
6. Optional new prompt "End at target facing map right" may introduce heading as an explicit extra condition; do not evaluate heading when the only target criterion is square location.

## INTERACTIVE OBJECTS, STATES AND RULES

- **Objects:** 25 discrete squares, explorer icon with direction arrow, starting square marker, optional destination, visible command tape, step counter, replay/undo/reset controls, optional route footprints, **structured textual state log**.
- **State per placement:** initial coordinates/heading; tape; executed command index; ordered history of (position,heading) pairs; learner prediction and feedback disclosure; local layout mode.
- **No external props:** each placement is a standalone, prop-free Scene root/entry with fixed editorial preset. If implementation shares internal code, public roots remain prop-free and derive text from real Lesson locale context. Do not invent a `mode` or `commands` runtime prop.
- **Invariant:** a turn preserves (x,y); forward preserves heading; all positions stay inside grid; undo exactly inverses recorded state, including facing.
- **Nonvisual control:** action sequence editor is an accessible ordered list. "Move command earlier/later" changes order intentionally, not browser focus order. Log can be read in sequence independently of animation.
- **Feedback:** reason about first incorrect assumption, not accuracy scores. No timeouts, randomization, event contracts or persisted progress.

## VISUAL / AUDIO / MEDIA DIRECTION

Use stable SVG/grid, distinguish heading arrow from move trail. A turn animation may show one quarter-rotation but must not look like the avatar jumped. A step should move exactly one cell (or switch instantly). Show visible labels for source and destination, with optional before/after ghosting; avoid excessive motion for young learners. No remote maps, sound dependency or decorative plot.

## LOCALIZATION, DIRECTION AND ACCESSIBILITY

- Translate every command, prediction, button, heading/destination explanation, status and screen-reader label for all supported locales; missing translations block release.
- **RTL is not a mirror of the map coordinate system:** "right turn" is clockwise relative to avatar heading in _every_ locale. If the entire diagram is mirrored for presentation, mathematical mapping and recorded results must be consistently remapped and tested; safer default is to preserve the fixed instructional map and mirror only UI layout/direction.
- All actions available by buttons/keyboard/switch; no forced drag/voice/precision. Visible focus, large touch targets, line/shape cues independent of color, no timing.
- For nonvisual learners, the log says e.g. "At middle square (row 3, column 3), facing map top; after forward, row 2, column 3, same facing." Rows/columns in descriptions are 1-indexed (not the internal 0-index coordinates); keep that distinction explicit in tests and localized copy.
- Respect reduced motion, reading order, live-region announcement throttling, mobile zoom and large fonts. All outcomes and explanations work fully offline after selected locale and Scene assets are downloaded.

## ACCEPTANCE SCENARIOS

1. From (2,2) north, **Right** gives **(2,2) east** (no movement); **Forward** from the original reset gives **(2,1) north**.
2. From (2,2) north, Forward→Right→Forward ends **(3,1) east** with exact intermediate states in this specification.
3. From (2,2) east, the _same tape_ ends **(3,3) south**.
4. From (2,2) north, Right→Forward→Forward ends **(4,2) east**.
5. From (1,3) north, Forward→Right→Forward reaches target **(2,2)**. Any different valid command tape reaching the target also receives explanatory success for _destination only_.
6. At (4,2) east, invalid Forward leaves state unchanged and tells the learner **why**.
7. Undo/replay/reset are deterministic; distinct placement state never leaks into another Section.
8. Keyboard/RTL/nonvisual/reduced-motion/mobile/offline modes present the same route math, no color or spatial pointer dependency.

## IMPLEMENTATION DEPENDENCIES AND OPEN QUESTIONS

The `scene` block type and generic Section renderer exist; **Route Explorer does not**. Engineer must implement the specified deterministic model, independent prop-free placement roots, genuine Scene locale translations and tests. Confirm actual Lesson Scene context and renderer registration separately. Formal approval of this spec is pending Methodologist approval; no runtime Lesson, Question/Quiz scoring, route telemetry, Note event or persistence is authorized.
