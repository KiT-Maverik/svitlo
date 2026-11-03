# Multiplying by Zero and One — Content

Status: Draft — provisional Screenwriter draft pending Methodologist Brief approval
Target Lesson: learningApps/playground/Data/Lessons/1/multiplicationByZeroAndOne/
Audience: Children aged 6–8 who can interpret small multiplication expressions and distinguish zero objects, one group and one in each group
Methodologist source: [Methodologist Brief](./methodologist-brief.md) (Draft; approval pending)
Learning outcomes: Explain 4×0=0 with four groups that each contain zero items, and 0×4=0 with zero groups of four. Explain 4×1=4 with four groups of one, and 1×4=4 with one group of four. Apply a×0=0 and a×1=a to further whole-number examples without needing a picture every time. Distinguish 4+0=4 from 4×0=0, identifying the operation as well as the special factor.
Target Skill: `by0And1.data.ts` linked directly in the Brief; canonical Code unchanged
Program dependence: None

## INSTRUCTIONAL CONCEPT

Develop two distinct multiplication laws with evidence from small groups and numerical reasoning: multiplying a whole number by zero gives zero, while multiplying it by one leaves the same number. Neither property means that adding or subtracting zero works in the same way. Zero is absorbing for multiplication: a × 0 = 0 (also 0 × a = 0); one is the multiplicative identity: a × 1 = a (and 1 × a = a). Use 4×0=0, 0×4=0, 4×1=4, 1×4=4 and transfer 7×0=0, 7×1=7. Concrete equal-group models demonstrate cases but are not claimed to prove the law for every number domain; the source Skill's formal generality remains unchanged. Keep age-appropriate whole numbers 0–20.

The child must manipulate or inspect the numerical evidence before receiving a rule, and then apply it with less support. Keep model, labels, equations and feedback adjacent. No mandatory scored Quiz, reward sequence or fictional Program narrative.

## LEARNER JOURNEY

1. **Four Empty Groups:** Show four labeled empty trays; child inspects each and counts zero total; display 4×0=0 without adding a phantom object.
2. **Zero Groups Is Still Zero:** Switch from four empty groups to no groups, show 0×4=0. Keep the difference between 'four empty boxes' and 'no boxes' in the accessible ledger.
3. **One Changes Nothing:** Display four individually labeled one-counter trays (4×1) and then one four-counter tray (1×4); give learner-controlled switch and exact ledger.
4. **Test a New Number:** Offer numerical trial choices for 7×0, 7×1 and contrasting 7+0; child can reveal seven single counters, seven empty groups or one seven-counter group.

## SECTION PLAN

### Section 1 — Four Empty Groups

- **Outcome:** Explain 4×0=0 with four groups that each contain zero items, and 0×4=0 with zero groups of four.
- **Structure:** `LessonSection_Config`; a single ordered vertical Resource list.
- **Ordered blocks:**
  1. **text (renderer available):** “There are four boxes. Each has ZERO counters. How many counters altogether?”
  2. **scene (generic type/renderer available; bespoke component proposed):** [Zero and One Multiplication Lab](./scenes/zeroOneMultiplicationLab.scene-spec.md), Section 1 entry. Show four labeled empty trays; child inspects each and counts zero total; display 4×0=0 without adding a phantom object.
  3. **markdown (renderer available):** “Four groups of zero contain no counters. Four times zero is zero: 4 × 0 = 0.”
- **Learner's action and explanatory feedback:** For 'four counters', explain that four counts the boxes, not the counters in the boxes. The same group-size fact holds for each empty group. Hints, replay, and full explanation can be accessed without choosing an answer; wrong predictions do not incur a score.
- **Visible model:** Countable elements plus the same exact quantities in an ordered text/table ledger, with any diagram updates synchronized to mathematical statements.
- **Transition:** Offer the next prediction after the learner can inspect the current result; do not require a successful guess.
- **Inclusive/localized operation:** Native keyboard/touch controls, visible focus, screen reader counts and contextual role labels, semantic RTL operand order and reduced-motion immediate states.
- **Proposed Note:** “Any number times zero equals zero.” after this meaning has been explained (planned only).
- **Implementation dependency:** One independent prop-free Scene entry for this Section; no invented React mode prop, persisted score or Question object.

### Section 2 — Zero Groups Is Still Zero

- **Outcome:** Explain 4×1=4 with four groups of one, and 1×4=4 with one group of four.
- **Structure:** `LessonSection_Config`; a single ordered vertical Resource list.
- **Ordered blocks:**
  1. **text (renderer available):** “What if we have ZERO groups of four counters? How many counters are in those groups?”
  2. **scene (generic type/renderer available; bespoke component proposed):** [Zero and One Multiplication Lab](./scenes/zeroOneMultiplicationLab.scene-spec.md), Section 2 entry. Switch from four empty groups to no groups, show 0×4=0. Keep the difference between 'four empty boxes' and 'no boxes' in the accessible ledger.
  3. **markdown (renderer available):** “Zero groups of four contain zero counters. The pictures differ, but both products are zero.”
- **Learner's action and explanatory feedback:** If child claims four, report that no group exists to hold the four objects. Avoid dividing by zero claims here. Hints, replay, and full explanation can be accessed without choosing an answer; wrong predictions do not incur a score.
- **Visible model:** Countable elements plus the same exact quantities in an ordered text/table ledger, with any diagram updates synchronized to mathematical statements.
- **Transition:** Offer the next prediction after the learner can inspect the current result; do not require a successful guess.
- **Inclusive/localized operation:** Native keyboard/touch controls, visible focus, screen reader counts and contextual role labels, semantic RTL operand order and reduced-motion immediate states.
- **Proposed Note:** “Any number times zero equals zero.” after this meaning has been explained (planned only).
- **Implementation dependency:** One independent prop-free Scene entry for this Section; no invented React mode prop, persisted score or Question object.

### Section 3 — One Changes Nothing

- **Outcome:** Apply a×0=0 and a×1=a to further whole-number examples without needing a picture every time.
- **Structure:** `LessonSection_Config`; a single ordered vertical Resource list.
- **Ordered blocks:**
  1. **text (renderer available):** “Compare FOUR groups of ONE with ONE group of FOUR. How many counters in each?”
  2. **scene (generic type/renderer available; bespoke component proposed):** [Zero and One Multiplication Lab](./scenes/zeroOneMultiplicationLab.scene-spec.md), Section 3 entry. Display four individually labeled one-counter trays (4×1) and then one four-counter tray (1×4); give learner-controlled switch and exact ledger.
  3. **markdown (renderer available):** “4 × 1 = 4 and 1 × 4 = 4. One group of four is four; four groups of one also make four.”
- **Learner's action and explanatory feedback:** For five, distinguish multiplication 4×1=4 from addition 4+1=5. Keep the original four counters counted exactly once. Hints, replay, and full explanation can be accessed without choosing an answer; wrong predictions do not incur a score.
- **Visible model:** Countable elements plus the same exact quantities in an ordered text/table ledger, with any diagram updates synchronized to mathematical statements.
- **Transition:** Offer the next prediction after the learner can inspect the current result; do not require a successful guess.
- **Inclusive/localized operation:** Native keyboard/touch controls, visible focus, screen reader counts and contextual role labels, semantic RTL operand order and reduced-motion immediate states.
- **Proposed Note:** “Any number times one stays that number.” after this meaning has been explained (planned only).
- **Implementation dependency:** One independent prop-free Scene entry for this Section; no invented React mode prop, persisted score or Question object.

### Section 4 — Test a New Number

- **Outcome:** Distinguish 4+0=4 from 4×0=0, identifying the operation as well as the special factor.
- **Structure:** `LessonSection_Config`; a single ordered vertical Resource list.
- **Ordered blocks:**
  1. **text (renderer available):** “Without drawing first: what are 7 × 0 and 7 × 1? And what is 7 + 0?”
  2. **scene (generic type/renderer available; bespoke component proposed):** [Zero and One Multiplication Lab](./scenes/zeroOneMultiplicationLab.scene-spec.md), Section 4 entry. Offer numerical trial choices for 7×0, 7×1 and contrasting 7+0; child can reveal seven single counters, seven empty groups or one seven-counter group.
  3. **markdown (renderer available):** “7 × 0 = 0; 7 × 1 = 7; 7 + 0 = 7. The operation matters. Multiplying by zero is not the same as adding zero.”
- **Learner's action and explanatory feedback:** If learner says seven for 7×0, show empty groups; if zero for 7+0, explain that adding no objects leaves the seven already present. Hints, replay, and full explanation can be accessed without choosing an answer; wrong predictions do not incur a score.
- **Visible model:** Countable elements plus the same exact quantities in an ordered text/table ledger, with any diagram updates synchronized to mathematical statements.
- **Transition:** Invite a brief voluntary explanation of why the statement is true, and end without a score.
- **Inclusive/localized operation:** Native keyboard/touch controls, visible focus, screen reader counts and contextual role labels, semantic RTL operand order and reduced-motion immediate states.
- **Proposed Note:** “Any number times one stays that number.” after this meaning has been explained (planned only).
- **Implementation dependency:** One independent prop-free Scene entry for this Section; no invented React mode prop, persisted score or Question object.

## CUSTOM SCENE SPECIFICATIONS

- [Zero and One Multiplication Lab](./scenes/zeroOneMultiplicationLab.scene-spec.md) — four standalone prop-free placement entries; specific Scene not yet implemented.

## LESSON NOTES — UNLOCKED RECALL CUES (PLANNED)

1. “Any number times zero equals zero.” — proposed after first complete relevant worked observation and explanation.
2. “Any number times one stays that number.” — proposed after first complete relevant worked observation and explanation.

Notes are editorial intentions only: no Note API, unlock event, persistence, review sheet, scheduler or mastery record is implemented. Future revision pages should contain only actually unlocked cues.

## PRACTICE, RETRIEVAL AND ASSESSMENT HANDOFF

Contrasting empty and nonempty groups → see four groups with zero in each → compare four groups of one against one group of four → reason about new whole numbers and contrast multiplication with addition. The final example permits independent prediction, optional hints and transparent corrective feedback. These trial states are formative; Assessment Architect independently validates any scored Question, criterion for Skill evidence, answer alternatives and retries. A correct example is not proof of general property mastery. The existing select-one Question adapter is not the proposed Scene.

## GLOBAL ACCESSIBILITY AND LOCALIZATION

Every learner prompt, error, status, numerical quantity description, accessible name and Note requires a genuine translation for every supported locale, no silent English fallback. Provide equivalent operable text/table views for all group/array models. Math operator/factor/row meaning remains intact under RTL and when zoomed, with native keyboard/switch/touch controls, ample targets, visible focus and screen-reader announcements. Reduced motion shows identical numerical transitions. All deterministic interactions and chosen locale data must work offline on weak devices once downloaded, without audio/image/video/remote checking/dragging requirements.

## PRODUCTION / PLATFORM DEPENDENCIES

Generic `LessonSection_Config`, text, markdown and `scene` Resource rendering exist. Zero and One Multiplication Lab is proposed, requires its own approved Scene specification, prop-free localized implementations and tests. Other image/audio/video/code Resource kinds are typed-only in the generic renderer and YouTube is not a supported resource config; not required. Notes, automatic review and complete download machinery are not assumed implemented. No graded Question, Quiz or TypeScript runtime Lesson created.

## EDITORIAL SOURCES AND OPEN QUESTIONS

- [Methodologist Brief](./methodologist-brief.md), currently Draft and explicitly not approved.
- [Playground taxonomy](../../../../docs/generated/skills/taxonomy.en.md).
- [Create Lesson Content workflow](../../../../../../studio/skills/lesson-workflow/create-lesson-content.skill.md).
- Editorial: The canonical Skill combines ×0 and ×1 as approved. Keep the two laws distinct in the teaching and do not split the taxonomy without explicit editorial approval. Verify that a zero-sized group is unambiguously represented nonvisually.
- Technical: implement consistent semantic model for supported locales, RTL and offline.

## HANDOFF

Provisional Draft Content and separate Draft Scene specification. **Review order:** editor approves Methodologist Brief, then Content and Scene before Design Scene or Coding Agent implementation. Assessment Architect alone creates graded evidence. Do not modify Skill IDs, other Lessons or Program narratives.
