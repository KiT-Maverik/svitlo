# Swapping Factors Without Changing the Total — Content

Status: Draft — provisional Screenwriter draft pending Methodologist Brief approval
Target Lesson: learningApps/playground/Data/Lessons/1/multiplicationCommutative/
Audience: Children aged 6–8 who can count rectangular arrays and read small multiplication statements; readiness support with exact dot counts
Methodologist source: [Methodologist Brief](./methodologist-brief.md) (Draft; approval pending)
Learning outcomes: Observe that one physical 3-by-4 array can be reoriented to 4-by-3 without adding or removing dots. Explain in words and numerals why 3×4 and 4×3 both equal 12. Predict that changing factor order in 2×5 yields the same product as 5×2 and verify by counting. Distinguish swapping factors from changing either factor's value; avoid claiming subtraction is commutative.
Target Skill: `commutative.data.ts` linked directly in the Brief; canonical Code unchanged
Program dependence: None

## INSTRUCTIONAL CONCEPT

Demonstrate that exchanging multiplication factors preserves the product, first by reorienting the SAME rectangular array of dots, then by independently checking a different pair of factors. The number of groups and the size of each group may change roles; the total does not. Commutativity: a×b=b×a in the relevant whole-number domain. The same twelve-dot rectangle can be viewed as 3 rows of 4 or 4 rows of 3; a quarter turn changes orientation, not cardinality. 2×5=10 and 5×2=10 likewise count the same ten dots arranged as 2 rows of 5 or 5 rows of 2. Rotating or reorganizing must preserve each dot exactly once, not silently copy objects. The factor roles in a 'groups × size' narrative must be relabeled when the orientation changes.

The child must manipulate or inspect the numerical evidence before receiving a rule, and then apply it with less support. Keep model, labels, equations and feedback adjacent. No mandatory scored Quiz, reward sequence or fictional Program narrative.

## LEARNER JOURNEY

1. **Keep All Twelve Dots:** Display exactly twelve dots in three ordered rows of four, with an accessible row ledger; count 4+4+4=12.
2. **Turn the Array:** A learner-triggered quarter-turn reorients the SAME twelve-dot 3×4 rectangle into four rows of three; numeric row/column ledger updates to 4×3.
3. **A Rule Worth Testing:** Show both readings of the one array, comparing factor labels and unchanged total. Permit stepwise dot pairing or review.
4. **Try Two and Five:** Create two rows of five, let child reorient into five rows of two, and inspect two complete equations with total ten.

## SECTION PLAN

### Section 1 — Keep All Twelve Dots

- **Outcome:** Observe that one physical 3-by-4 array can be reoriented to 4-by-3 without adding or removing dots.
- **Structure:** `LessonSection_Config`; a single ordered vertical Resource list.
- **Ordered blocks:**
  1. **text (renderer available):** “Three rows with four dots each make how many?”
  2. **scene (generic type/renderer available; bespoke component proposed):** [Array Rotation Inspector](./scenes/arrayRotationInspector.scene-spec.md), Section 1 entry. Display exactly twelve dots in three ordered rows of four, with an accessible row ledger; count 4+4+4=12.
  3. **markdown (renderer available):** “Three rows of four have twelve dots. This is 3 × 4 = 12.”
- **Learner's action and explanatory feedback:** For a predicted seven, show three complete +4 rows; do not hide the full count. Hints, replay, and full explanation can be accessed without choosing an answer; wrong predictions do not incur a score.
- **Visible model:** Countable elements plus the same exact quantities in an ordered text/table ledger, with any diagram updates synchronized to mathematical statements.
- **Transition:** Offer the next prediction after the learner can inspect the current result; do not require a successful guess.
- **Inclusive/localized operation:** Native keyboard/touch controls, visible focus, screen reader counts and contextual role labels, semantic RTL operand order and reduced-motion immediate states.
- **Proposed Note:** Revisit an earlier Note; no additional cue.
- **Implementation dependency:** One independent prop-free Scene entry for this Section; no invented React mode prop, persisted score or Question object.

### Section 2 — Turn the Array

- **Outcome:** Explain in words and numerals why 3×4 and 4×3 both equal 12.
- **Structure:** `LessonSection_Config`; a single ordered vertical Resource list.
- **Ordered blocks:**
  1. **text (renderer available):** “Turn the same rectangle. How many rows and dots per row can you see now?”
  2. **scene (generic type/renderer available; bespoke component proposed):** [Array Rotation Inspector](./scenes/arrayRotationInspector.scene-spec.md), Section 2 entry. A learner-triggered quarter-turn reorients the SAME twelve-dot 3×4 rectangle into four rows of three; numeric row/column ledger updates to 4×3.
  3. **markdown (renderer available):** “Four rows of three still contain twelve dots. We changed orientation, not the collection. So 4 × 3 = 12.”
- **Learner's action and explanatory feedback:** If a learner predicts sixteen, report that all twelve dots were retained; none appeared or disappeared. In reduced motion, instantly swap displayed orientation and ledger. Hints, replay, and full explanation can be accessed without choosing an answer; wrong predictions do not incur a score.
- **Visible model:** Countable elements plus the same exact quantities in an ordered text/table ledger, with any diagram updates synchronized to mathematical statements.
- **Transition:** Offer the next prediction after the learner can inspect the current result; do not require a successful guess.
- **Inclusive/localized operation:** Native keyboard/touch controls, visible focus, screen reader counts and contextual role labels, semantic RTL operand order and reduced-motion immediate states.
- **Proposed Note:** “When we swap the factors, the product stays the same.” after this meaning has been explained (planned only).
- **Implementation dependency:** One independent prop-free Scene entry for this Section; no invented React mode prop, persisted score or Question object.

### Section 3 — A Rule Worth Testing

- **Outcome:** Predict that changing factor order in 2×5 yields the same product as 5×2 and verify by counting.
- **Structure:** `LessonSection_Config`; a single ordered vertical Resource list.
- **Ordered blocks:**
  1. **text (renderer available):** “Do 3 × 4 and 4 × 3 have the same product? What changed?”
  2. **scene (generic type/renderer available; bespoke component proposed):** [Array Rotation Inspector](./scenes/arrayRotationInspector.scene-spec.md), Section 3 entry. Show both readings of the one array, comparing factor labels and unchanged total. Permit stepwise dot pairing or review.
  3. **markdown (renderer available):** “The order of the two factors changed. The product stayed twelve. Multiplication lets us swap factors.”
- **Learner's action and explanatory feedback:** For 'the rows stayed three', point out that new orientation has four rows; only the count of dots stayed the same. Hints, replay, and full explanation can be accessed without choosing an answer; wrong predictions do not incur a score.
- **Visible model:** Countable elements plus the same exact quantities in an ordered text/table ledger, with any diagram updates synchronized to mathematical statements.
- **Transition:** Offer the next prediction after the learner can inspect the current result; do not require a successful guess.
- **Inclusive/localized operation:** Native keyboard/touch controls, visible focus, screen reader counts and contextual role labels, semantic RTL operand order and reduced-motion immediate states.
- **Proposed Note:** “Turning an array changes rows and columns, not how many dots there are.” after this meaning has been explained (planned only).
- **Implementation dependency:** One independent prop-free Scene entry for this Section; no invented React mode prop, persisted score or Question object.

### Section 4 — Try Two and Five

- **Outcome:** Distinguish swapping factors from changing either factor's value; avoid claiming subtraction is commutative.
- **Structure:** `LessonSection_Config`; a single ordered vertical Resource list.
- **Ordered blocks:**
  1. **text (renderer available):** “Is 2 × 5 equal to 5 × 2? Check using ten dots.”
  2. **scene (generic type/renderer available; bespoke component proposed):** [Array Rotation Inspector](./scenes/arrayRotationInspector.scene-spec.md), Section 4 entry. Create two rows of five, let child reorient into five rows of two, and inspect two complete equations with total ten.
  3. **markdown (renderer available):** “2 × 5 = 10 and 5 × 2 = 10. Both ways use all ten dots exactly once.”
- **Learner's action and explanatory feedback:** For twenty, count the ten original dots and distinguish relabeling from making an extra set. Answer accessible without prediction. Hints, replay, and full explanation can be accessed without choosing an answer; wrong predictions do not incur a score.
- **Visible model:** Countable elements plus the same exact quantities in an ordered text/table ledger, with any diagram updates synchronized to mathematical statements.
- **Transition:** Invite a brief voluntary explanation of why the statement is true, and end without a score.
- **Inclusive/localized operation:** Native keyboard/touch controls, visible focus, screen reader counts and contextual role labels, semantic RTL operand order and reduced-motion immediate states.
- **Proposed Note:** “When we swap the factors, the product stays the same.” after this meaning has been explained (planned only).
- **Implementation dependency:** One independent prop-free Scene entry for this Section; no invented React mode prop, persisted score or Question object.

## CUSTOM SCENE SPECIFICATIONS

- [Array Rotation Inspector](./scenes/arrayRotationInspector.scene-spec.md) — four standalone prop-free placement entries; specific Scene not yet implemented.

## LESSON NOTES — UNLOCKED RECALL CUES (PLANNED)

1. “When we swap the factors, the product stays the same.” — proposed after first complete relevant worked observation and explanation.
2. “Turning an array changes rows and columns, not how many dots there are.” — proposed after first complete relevant worked observation and explanation.

Notes are editorial intentions only: no Note API, unlock event, persistence, review sheet, scheduler or mastery record is implemented. Future revision pages should contain only actually unlocked cues.

## PRACTICE, RETRIEVAL AND ASSESSMENT HANDOFF

Recall a countable 3-by-4 array → rotate the same twelve objects and name new rows/columns → predict the relation a×b=b×a → transfer to 2×5 and its reversal. The final example permits independent prediction, optional hints and transparent corrective feedback. These trial states are formative; Assessment Architect independently validates any scored Question, criterion for Skill evidence, answer alternatives and retries. A correct example is not proof of general property mastery. The existing select-one Question adapter is not the proposed Scene.

## GLOBAL ACCESSIBILITY AND LOCALIZATION

Every learner prompt, error, status, numerical quantity description, accessible name and Note requires a genuine translation for every supported locale, no silent English fallback. Provide equivalent operable text/table views for all group/array models. Math operator/factor/row meaning remains intact under RTL and when zoomed, with native keyboard/switch/touch controls, ample targets, visible focus and screen-reader announcements. Reduced motion shows identical numerical transitions. All deterministic interactions and chosen locale data must work offline on weak devices once downloaded, without audio/image/video/remote checking/dragging requirements.

## PRODUCTION / PLATFORM DEPENDENCIES

Generic `LessonSection_Config`, text, markdown and `scene` Resource rendering exist. Array Rotation Inspector is proposed, requires its own approved Scene specification, prop-free localized implementations and tests. Other image/audio/video/code Resource kinds are typed-only in the generic renderer and YouTube is not a supported resource config; not required. Notes, automatic review and complete download machinery are not assumed implemented. No graded Question, Quiz or TypeScript runtime Lesson created.

## EDITORIAL SOURCES AND OPEN QUESTIONS

- [Methodologist Brief](./methodologist-brief.md), currently Draft and explicitly not approved.
- [Playground taxonomy](../../../../docs/generated/skills/taxonomy.en.md).
- [Create Lesson Content workflow](../../../../../../studio/skills/lesson-workflow/create-lesson-content.skill.md).
- Editorial: Keep this Skill distinct from arrayModel: the array lesson teaches representation and row/column counting, whereas this Lesson targets the invariant when factor order changes. Whether to show one optional subtraction counterexample is an editorial choice; do not teach negative results.
- Technical: implement consistent semantic model for supported locales, RTL and offline.

## HANDOFF

Provisional Draft Content and separate Draft Scene specification. **Review order:** editor approves Methodologist Brief, then Content and Scene before Design Scene or Coding Agent implementation. Assessment Architect alone creates graded evidence. Do not modify Skill IDs, other Lessons or Program narratives.
