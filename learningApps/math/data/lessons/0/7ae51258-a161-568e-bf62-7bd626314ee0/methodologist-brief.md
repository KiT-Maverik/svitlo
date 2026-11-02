# Follow and Explain a Route — Methodologist Brief

Date: 2026-10-31
Lesson slug: followingRouteDirections
Methodologist status: Draft
Code: [Not implemented](#)
Program dependence: None

## Educational purpose

Build on relative-position language by reasoning about **ordered moves and turns** with a stated starting orientation. Unlike simply naming an object's position, a route requires the learner to maintain a changing heading as actions are executed.

## Target audience

**Primary audience: Grade 2 (approximately 7–8).** Primary Grade 2 (approximately 7–8 years). Learners can distinguish left/right relative to a facing person and can sequence three or four actions with counters. Directions must be available in short written and read-aloud alternatives. Provide no-drag and nonvisual route descriptions.

**Instructional depth:** One-square forward moves and quarter-turns on an obstacle-free small map (e.g. 5×5). No compass bearing, coordinates input, diagonal movement, rotations by 45°, algorithm notation, pathfinding optimization or timed puzzles. This is not the separate grid-map creation Skill.

## Prerequisites

[positionWords.data.ts](../../../../data/skills/geometry/orientation/skills/positionWords.data.ts): describe locations relative to an observer and distinguish left/right as viewpoint-relative. Count a few equal steps, recognize an initial facing arrow and remember short ordered instructions. Learners who confuse left/right need a front-facing avatar and reversible turn demonstration.

## Target Skills

- [spatialOrientationPath.data.ts](../../../../data/skills/geometry/orientation/skills/spatialOrientationPath.data.ts)

## Expected learning outcomes

- Predict the destination reached by a short route from a clearly identified starting square **and initial heading**.
- Distinguish a left/right **turn** (change in heading, no movement) from a **forward step** (change in position), using the updated heading.
- Give an ordered sequence of actions to guide another observer along a simple route and explain why changing initial heading or command order can change the result.
- Diagnose a wrong route by identifying the first instruction at which the explorer's position or heading diverged.

## Essential subject matter

A route is an **ordered procedure** acting on a state (position, heading). Represent an explorer as a square of a discrete path plus a visible arrow. **Turn right/left** rotates the heading by 90° while keeping the explorer in its square; **forward one** changes the position by one adjacent square in the current heading. A starting heading is essential. On a grid, east→right turn→south and north→right turn→east, so the same list of instructions can give different destinations from the same starting square. No compass-rose knowledge is required; headings can be named 'toward the top/right/bottom/left of the map' in explicit map coordinates. Prefer short paths without obstacles.

## Conceptual progression and dependencies

Revisit a named viewpoint from the previous relative-position Lesson. First expose a single right turn without movement. Then combine 'forward, right, forward' from a fixed start. Predict the effect of the **same commands with a changed initial heading**. Finally contrast sequences with commands reordered and ask the learner to detect where paths separate. Fade the arrow scaffolding only after the learner can verbalize orientation.

## Misconceptions, examples and boundaries

Thinking that turning right moves one square to the right; interpreting 'right' as always the right edge of the screen; treating actions as an unordered bag; forgetting a turn changed subsequent forward direction; mirroring route commands when the interface language changes. A four-command counterexample must be checked with exact coordinates before publication.

**Explicit exclusions:** One-square forward moves and quarter-turns on an obstacle-free small map (e.g. 5×5). No compass bearing, coordinates input, diagonal movement, rotations by 45°, algorithm notation, pathfinding optimization or timed puzzles. This is not the separate grid-map creation Skill.

## Localization, accessibility and offline intent

All explanations, controls, Scene cues, alternative descriptions, feedback and eventual Note text require genuine translations in the supported locales with no missing-language fallback. For spatial direction, apply genuine semantic RTL adaptation rather than indiscriminate mirroring of geometry or mathematical order. For measurement, keep scale meaning and cm labels intact regardless of UI direction. Make learner actions possible by keyboard/switch/touch, with semantic equivalents to any visual manipulation, audible content fully captioned, reduced-motion alternatives, visible focus, readable targets and WCAG 2.2 AA review. The complete Lesson and its feedback must work offline after a verified download; this is an intended capability, not an existing implementation claim.

## Sources and factual verification

- [spatialOrientationPath.data.ts](../../../../data/skills/geometry/orientation/skills/spatialOrientationPath.data.ts) — immutable canonical Mathematics Skill data copied from `learningApps/math/data/skills/` with its UUID, translations and methodological description preserved.
- [Studio Methodologist persona](../../../../../../studio/personas/methodist.persona.md) and [Lesson editorial architecture](../../../../../../studio/docs/architecture/lesson-editorial-document.md) — editorial scope and workflow.
- [Playground taxonomy view](../../../../docs/generated/skills/taxonomy.en.md) — currently stale for these newly migrated domain Skills; coordinator regeneration is required before it can confirm their inclusion.

The examples are checked against the precise canonical Skill description, not treated as evidence of compliance with any particular jurisdiction's curriculum.

## Curriculum / Program compatibility

No Program or national Curriculum assigned. This standalone Lesson may later be referenced by multiple curricula, but the chosen Grade 2 depth is a Lesson decision only and **does not alter the grade-independent Skill definition**.

## Open editorial decisions

- Editor to confirm the level of route abstraction (map squares and quarter-turns) is appropriate for Grade 2; do not treat the route builder as a new Skill or a graded task.
- **Approval gate:** this Brief has not received explicit Methodologist approval. Accompanying `content.md` and Scene spec are **provisional Drafts under the batch-specific user authorization**, not formally approved Lesson Content.

## Methodologist handoff

Review the intended audience, prerequisite chain, bounded mathematical examples and misconceptions before changing this Brief from Draft to Approved. The Educational Screenwriter's proposed Sections and Scene are separate editorial artifacts and may be revised if the Brief changes. No runtime Lesson component, Question, Quiz, scoring, Note persistence or content publication is authorized.
