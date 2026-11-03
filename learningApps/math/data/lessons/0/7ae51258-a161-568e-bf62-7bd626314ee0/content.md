# Follow and Explain a Route — Lesson Content

Status: **Provisional Draft — pending Methodologist approval; not an approved lesson.**
Target Lesson: `learningApps/playground/Data/Lessons/1/followingRouteDirections/`
Audience: **Grade 2** (approximately 7–8), early/mixed readers, including learners using keyboards, switch input or nonvisual text
Methodologist source: [Draft Methodologist Brief](./methodologist-brief.md)
Target Skills: `spatialOrientationPath.data.ts` as linked in the Brief (prerequisite `positionWords.data.ts`); do not replace or broaden the canonical definition.
Program dependence: None
Implementation state: editorial script only; neither this Lesson nor its custom Scene is implemented.

## INSTRUCTIONAL CONCEPT

**"Turning changes which way you face. Moving forward changes where you are."** A small explorer follows a short series of instructions. Its route depends on the **starting square**, the **direction of its arrow** and the **order** of instructions. Learners first predict a single move, then control and replay a route, then write a route for somebody else. The visual map is a model, not a game with scores.

The map is **5 columns × 5 rows**. For editorial verification, (column, row) runs from (0, 0) at map top-left to (4, 4) at bottom-right; these coordinates are internal to the specification, not required vocabulary for children. "Forward one" enters the adjacent square in the current heading; "turn right/left" rotates the arrow **in place by 90°**. No diagonal or backward moves. The learner can always inspect an ordered action log rather than memorize a long command sequence.

## LEARNER JOURNEY

1. **Notice:** Can the arrow turn without the explorer leaving its square? Predict and reveal.
2. **Build and trace:** Execute "forward, turn right, forward" from a known start, one instruction at a time.
3. **Disrupt a hidden assumption:** Replay the same instructions with a different initial heading, then try the same instruction multiset in a different order.
4. **Transfer:** Guide the explorer on a fresh map without copying an already displayed route, and explain a first wrong step.

No required speed, rewards, random variation, completion-as-mastery claims, scored Question or Quiz.

## SECTION PLAN

### Section 1 — A Turn Is Not a Step

- **Purpose:** Distinguish a change of heading from a change of position.
- **Section contract:** `LessonSection_Config`, one ordered vertical Resource sequence.
- **Ordered blocks:**
  1. **text — currently rendered:** "Here is an explorer. The arrow on its head points up. If it turns right, does it move into another square, or only face another way? Choose, then check."
  2. **scene — Resource type and renderer exist; proposed new Scene:** [Route Explorer](./scenes/routeExplorer.scene-spec.md), stage A, preset start (2, 2) facing toward map top. Two prediction alternatives: "Same square, new direction" / "Moves one square". Clear "Show turn" reveals arrow pointing toward map right while explorer stays (2, 2).
  3. **markdown — currently rendered:** "A **turn** changes the direction we face. A **forward step** changes our square. Turning right from 'facing top' makes us face 'toward the map's right edge'. We have not moved yet."
- **Expected observation:** Before and after turn, position is (2, 2); heading changes north→east. There is **no displacement**.
- **Explanatory feedback:** If the learner predicts movement: "Look at the outline of the square. The explorer is still on it; only its arrow turned." If they expect no movement: "Yes. A turn changes the arrow, not the square." Invite inspection rather than marking a wrong answer as failure.
- **Access and pacing:** Large labeled turn and step controls; textual ledger "Square unchanged / facing right"; a no-animation result for reduced motion.
- **Proposed Note:** After the turn reveal, "Turning changes direction, not position" (planned, no Note API).

### Section 2 — Follow One Instruction at a Time

- **Purpose:** Track ordered commands and update orientation before moving.
- **Section contract:** `LessonSection_Config`, one vertical Resource sequence.
- **Ordered blocks:**
  1. **text — currently rendered:** "Start in the middle, facing the top of the map. We have three instructions. Where will you be after each one? You can look back at an earlier step."
  2. **scene — proposed:** [Route Explorer](./scenes/routeExplorer.scene-spec.md), stage B, starting at (2, 2), heading north. Command tape: **Forward one → Turn right → Forward one**. Reveal one at a time; action log must show:
     - Start (2, 2), facing north.
     - Forward → (2, 1), still north.
     - Turn right → (2, 1), now east.
     - Forward → **(3, 1), facing east**.
  3. **markdown — currently rendered:** "We walked one square up, turned on the spot, then walked one square to the map's right. The **second forward** used our new direction. The order helped decide where we arrived."
- **Learner action and observation:** Predict the end square before pressing "Run next command", inspect the arrow at each step, and choose "Replay" to verify. A stepped **Undo** returns exactly one command's previous state (including its heading); replay from reset should be deterministic.
- **Explanatory feedback:** If learner predicts (2, 0): "That would be moving forward twice without changing direction. Our second instruction turned us right." If learner guesses (3, 2): "That would forget the first upward step. Follow the log from the start." A correct explanation names both location **and** heading; a numeric coordinate answer is not required from children.
- **Access:** Text log is primary, not a decorative transcript; every command and resulting state has a readable label. Fixed map directions never change with browser text direction.

### Section 3 — Same Commands, Different Ending?

- **Purpose:** Expose dependency on the initial heading and instruction order.
- **Section contract:** `LessonSection_Config`, one vertical Resource sequence.
- **Ordered blocks:**
  1. **text — currently rendered:** "What if we use the same three instructions, but start by facing the **right edge** of the map? Do we get to the same square? Decide before you run the route."
  2. **scene — proposed:** [Route Explorer](./scenes/routeExplorer.scene-spec.md), stage C. Same start (2, 2), heading **east**. Commands still Forward → Right → Forward. Exact progression: (3, 2), east → (3, 2), south → **(3, 3), south**. Show previous path faintly but keep the second path and spoken/text descriptions independently distinguishable. Next show **Right → Forward → Forward** from the original north-facing (2, 2), ending **(4, 2), east**.
  3. **markdown — currently rendered:** "Starting direction matters: one route finished toward the top-right, the other toward the bottom-right. Order matters too: turning _before_ both forward steps sent us across the row. We used the same kinds of moves, but not in the same order."
- **Misconception challenge:** Ask if the route instruction tape is a bag of three tiles that can be shuffled. Feedback: "Try them in a different order and look at the destination. A route is a sequence."
- **Boundary:** Swapping command order **may** change the endpoint, not must change it for every possible command set. Do not state a universal theorem based on these examples.
- **Proposed Note:** After counterexample, "A route needs a starting direction and instructions in order" (planned).

### Section 4 — Tell Someone How to Get There

- **Purpose:** Independent transfer: supply and verify a short route, diagnose a wrong turn.
- **Section contract:** `LessonSection_Config`, one vertical Resource sequence.
- **Ordered blocks:**
  1. **text — currently rendered:** "A new explorer starts in the left part of the map, facing up. The target is one square up and one square to its right. Can you give a short set of commands? Say what each command does."
  2. **scene — proposed:** [Route Explorer](./scenes/routeExplorer.scene-spec.md), stage D. Start (1, 3), facing north; target (2, 2). Author short instruction tape, maximum six steps, with accessible insert/replace/remove/reorder button controls. Suggested efficient solution **Forward → Turn right → Forward**. Reveal result (2, 2), facing east. A different valid route may be accepted if it reaches the same **square** when the prompt only specifies destination, not final heading; preserve exact command simulation rather than matching one memorized string.
  3. **markdown — currently rendered:** "Check the **start**, the **arrow** and **each command**. If the explorer arrives elsewhere, look at the first instruction where the route changed. You can fix that step and try again."
- **Feedback:** If a route includes a blocked edge move, explain which square is out of bounds, do not silently wrap. If an alternative arrives at the goal with a different final heading, "You reached the target. You are facing another way; that is fine because we only asked for the square." Offer a distinct optional challenge to finish facing east, clearly labeled as optional.
- **Independent practice handoff:** The child can verbally teach a short route to a person using two visible reference landmarks. No scoring or mastery decision.

## CUSTOM SCENE SPECIFICATIONS

- [Route Explorer](./scenes/routeExplorer.scene-spec.md) — one proposed prop-free custom Scene with **separate self-contained placement presets**; no reusable React props or invented runtime mode API.

## LESSON NOTES — UNLOCKED RECALL CUES (PLANNED)

1. "Turning changes direction, not position." Proposed after Section 1's exact arrow-change reveal.
2. "A route needs a starting direction and an order." Proposed after the contrasting paths in Section 3.

These are short Git-authored **future** recall cues, not lesson summaries. Note type, IDs, unlock events, persistence and user revision sheets are **not implemented or assumed**.

## PRACTICE, RETRIEVAL AND ASSESSMENT HANDOFF

In Section 4, invite an unscored attempt from a fresh start. A future Assessment Architect may design independent assessments varying start direction, command order and end position without reusing the taught solutions verbatim. A correct single route is **not** evidence of durable mastery; scheduled recall is separate future capability.

## GLOBAL ACCESSIBILITY AND LOCALIZATION

Every learner-facing instruction, dynamic command-state summary and feedback requires genuine translations in all configured locales. **Left/right in the map's geometric model remains defined relative to the explorer's heading**, not to the reader's UI direction. In RTL UI, labels/buttons may reorder semantically but a right turn **must not** become a left turn. Keyboard controls for adding/reordering commands and step-by-step exploration are mandatory equivalents to any drag. Expose current square and heading textually; offer reduced-motion instant updates, visible focus, no color-only paths, large targets and screen-reader-friendly change announcements. All required functionality and translations must work offline after download; no remote maps.

## PRODUCTION / PLATFORM DEPENDENCIES

- Available renderer types verified: `text`, `markdown`, `scene` (generic Section renderer); no live Route Explorer exists yet.
- Proposed: deterministic route model, per-placement self-contained Scene instance, genuine localized text and nonvisual control/log.
- Platform/Scene Designer must verify actual locale provider integration, event lifecycle, tests, mobile behavior and offline packaging. No imaginary state API or Note persistence.
- No runtime Lesson data, Question, Quiz, correctness engine or scoring is authored.

## EDITORIAL SOURCES AND OPEN QUESTIONS

- [Draft Methodologist Brief](./methodologist-brief.md), linked canonical Skill data and the Studio Lesson/Scene contracts.
- Editor: confirm whether route orientation shown as arrows without compass vocabulary is sufficient and whether the optional final-heading challenge should stay optional.
- The Brief is **Draft**; Section text and Scene are **provisional**, not approved.

## HANDOFF

Methodologist confirms depth and approved outcomes before these draft Section beats are formalized. Screenwriter/editor checks that every route and contrast is mathematically exact. Scene Designer implements only from an **approved** Scene spec. Assessment Architect separately authors any scored work.
