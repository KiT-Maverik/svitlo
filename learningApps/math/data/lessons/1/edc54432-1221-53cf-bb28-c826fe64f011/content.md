# Finding a Total with Equal Groups — Content

Status: Draft — provisional Screenwriter draft pending Methodologist Brief approval
Target Lesson: learningApps/playground/Data/Lessons/1/equalGroupsModel/ (Playground)
Audience: Children 6–8 who can count collections to 25 and tell whether groups contain the same number
Methodologist source: [Methodologist Brief](./methodologist-brief.md) (Draft; not editor-approved)
Target Skill: The existing `equalGroups.data.ts` linked by the Brief, unchanged
Program dependence: None

## INSTRUCTIONAL CONCEPT

Use the two independently varying quantities—number of equal groups and objects per group—to determine and justify a product. This focuses the equal-groups structural relationship rather than repeating the existing lesson's focus on translating equal additions into multiplication notation. For G equally sized groups each with S objects, the total is G × S. Examples: 3 groups of 4 = 12; 4 groups of 3 = 12; 2 groups of 5 = 10. An unequal picture with group sizes [4,3,4] has total 11 but cannot accurately be described as three groups of four. Group roles are chosen by the narrated model, not fixed globally by the position of factors. All instructional totals ≤25.

The learner should see and control the **cause** of each total rather than infer correctness from a colored tick. Countable models, progressively lighter hints, careful contrasts and child-friendly numerical explanations do the teaching. No score, timer, Program story or mandatory Quiz.

## LEARNER JOURNEY

1. **Three Groups of Four:** Display three clearly labeled trays of four; the learner inspects each tray and requests a count of all twelve.
2. **Change One Thing:** Let the learner vary group count from 2 to 4 at fixed size 4; show totals 8,12,16, preserving countable counters.
3. **Do They All Match?:** Inspect three trays [4,3,4], compare group counts with the genuine [4,4,4] arrangement, and reveal totals 11 versus 12.
4. **Build Your Own Total:** Learner sets G=2 and S=5, builds two trays or uses text controls, predicts 10, and may change to 3 groups of 5 to observe 15.

## SECTION PLAN

### Section 1 — Three Groups of Four

- **Purpose and learner outcome:** Identify whether groups are equal in size and state group count and group size separately.
- **Section contract:** `LessonSection_Config`, one ordered top-to-bottom resource list.
- **Ordered content blocks:**
  1. **text (supported):** “Here are 3 groups. Each has 4 counters. What is the total?”
  2. **scene (generic type supported, NEW implementation proposed):** [Equal Group Counter](./scenes/equalGroupCounter.scene-spec.md), placement 1. Display three clearly labeled trays of four; the learner inspects each tray and requests a count of all twelve.
  3. **markdown (supported):** “Three groups of four make twelve counters. In this model, 3 × 4 = 12.”
- **Learner action, meaningful observations and formative feedback:** If the learner answers 7, explain that 3 + 4 adds the two labels, not the counters in every group. If 12, show the complete 4 + 4 + 4 count. A learner may ask for the full worked solution without submitting a prediction; no score or irreversible failure.
- **What remains visible:** Exact quantities, the symbolic equality (when shown), and a navigable text record of the model, including the steps that justify the total.
- **Transition:** Invite a prediction that motivates the next Section while retaining the mathematical model.
- **Accessibility / locale / RTL:** Native focusable controls and count-by-count text equivalents; mathematical factor/row/group roles remain correct in RTL, with optional reduced-motion immediate state.
- **Proposed unlocked Note:** “Equal groups have the same amount in every group.” after the model and its explanation are available (planned, not wired).
- **Dependencies:** Custom Scene placement is proposed; no new Question type, score event or public React mode prop is authorized.

### Section 2 — Change One Thing

- **Purpose and learner outcome:** Find a total by counting G groups of S objects, explaining G × S = total under the declared groups-first convention.
- **Section contract:** `LessonSection_Config`, one ordered top-to-bottom resource list.
- **Ordered content blocks:**
  1. **text (supported):** “Keep 4 in each group. What if we have 2 groups instead of 3? Now try 4 groups.”
  2. **scene (generic type supported, NEW implementation proposed):** [Equal Group Counter](./scenes/equalGroupCounter.scene-spec.md), placement 2. Let the learner vary group count from 2 to 4 at fixed size 4; show totals 8,12,16, preserving countable counters.
  3. **markdown (supported):** “When group size stays four, changing the number of groups changes the total: two groups make eight, three make twelve and four make sixteen.”
- **Learner action, meaningful observations and formative feedback:** A prediction of 14 for four groups is met with four counts of four: 4, 8, 12, 16. Distinguish increasing group count from increasing group size. A learner may ask for the full worked solution without submitting a prediction; no score or irreversible failure.
- **What remains visible:** Exact quantities, the symbolic equality (when shown), and a navigable text record of the model, including the steps that justify the total.
- **Transition:** Invite a prediction that motivates the next Section while retaining the mathematical model.
- **Accessibility / locale / RTL:** Native focusable controls and count-by-count text equivalents; mathematical factor/row/group roles remain correct in RTL, with optional reduced-motion immediate state.
- **Proposed unlocked Note:** “Total = number of equal groups × number in each group.” after the model and its explanation are available (planned, not wired).
- **Dependencies:** Custom Scene placement is proposed; no new Question type, score event or public React mode prop is authorized.

### Section 3 — Do They All Match?

- **Purpose and learner outcome:** Explain why an unequal arrangement cannot directly use one count × one common group size without regrouping.
- **Section contract:** `LessonSection_Config`, one ordered top-to-bottom resource list.
- **Ordered content blocks:**
  1. **text (supported):** “Look at groups with 4, 3 and 4 counters. Is this three equal groups of four?”
  2. **scene (generic type supported, NEW implementation proposed):** [Equal Group Counter](./scenes/equalGroupCounter.scene-spec.md), placement 3. Inspect three trays [4,3,4], compare group counts with the genuine [4,4,4] arrangement, and reveal totals 11 versus 12.
  3. **markdown (supported):** “The middle group has three. The groups are not all the same size. Their total is eleven, but the statement 3 × 4 = 12 does not describe this picture.”
- **Learner action, meaningful observations and formative feedback:** An incorrect 'equal' response gets the precise difference in the middle tray; do not claim eleven cannot be modeled mathematically. A learner may ask for the full worked solution without submitting a prediction; no score or irreversible failure.
- **What remains visible:** Exact quantities, the symbolic equality (when shown), and a navigable text record of the model, including the steps that justify the total.
- **Transition:** Invite a prediction that motivates the next Section while retaining the mathematical model.
- **Accessibility / locale / RTL:** Native focusable controls and count-by-count text equivalents; mathematical factor/row/group roles remain correct in RTL, with optional reduced-motion immediate state.
- **Proposed unlocked Note:** None; revisit the previous rule for contrast.
- **Dependencies:** Custom Scene placement is proposed; no new Question type, score event or public React mode prop is authorized.

### Section 4 — Build Your Own Total

- **Purpose and learner outcome:** Vary group count while holding group size fixed, and vice versa, and predict how the total changes.
- **Section contract:** `LessonSection_Config`, one ordered top-to-bottom resource list.
- **Ordered content blocks:**
  1. **text (supported):** “Make 2 equal groups of 5. How many counters will you need?”
  2. **scene (generic type supported, NEW implementation proposed):** [Equal Group Counter](./scenes/equalGroupCounter.scene-spec.md), placement 4. Learner sets G=2 and S=5, builds two trays or uses text controls, predicts 10, and may change to 3 groups of 5 to observe 15.
  3. **markdown (supported):** “Two groups of five make ten: 2 × 5 = 10. Three groups of five make fifteen.”
- **Learner action, meaningful observations and formative feedback:** Choosing seven receives 'Two plus five is seven, but each of the two groups contains five.' Full worked model available without a guess. A learner may ask for the full worked solution without submitting a prediction; no score or irreversible failure.
- **What remains visible:** Exact quantities, the symbolic equality (when shown), and a navigable text record of the model, including the steps that justify the total.
- **Transition:** Short optional reflection naming the mathematical relationship; end without a graded success screen.
- **Accessibility / locale / RTL:** Native focusable controls and count-by-count text equivalents; mathematical factor/row/group roles remain correct in RTL, with optional reduced-motion immediate state.
- **Proposed unlocked Note:** “Total = number of equal groups × number in each group.” after the model and its explanation are available (planned, not wired).
- **Dependencies:** Custom Scene placement is proposed; no new Question type, score event or public React mode prop is authorized.

## CUSTOM SCENE SPECIFICATIONS

- [Equal Group Counter](./scenes/equalGroupCounter.scene-spec.md) — four self-contained, independent prop-free placement entries; the generic `scene` Resource renderer exists but this Scene does not.

## LESSON NOTES — UNLOCKED RECALL CUES (PLANNED)

1. “Equal groups have the same amount in every group.” — proposed when the corresponding observed model is explained, not when a prediction happens to be correct.
2. “Total = number of equal groups × number in each group.” — proposed when the corresponding observed model is explained, not when a prediction happens to be correct.

No Note entity, unlock event, revision sheet, persistence, mastery marker or spaced scheduler is claimed implemented. Any future revision sheet may show only a learner's unlocked Notes.

## PRACTICE, RETRIEVAL AND ASSESSMENT HANDOFF

Prediction, building, comparison and an independent final example are **formative**; Recognize equal group sizes → count whole group totals → manipulate one structural variable at a time → reject an unequal-group model → build a new model and explain the product. Assessment Architect independently validates any scored Question, correct alternatives, Skill attribution, pass criteria and retries. A correct single total never demonstrates broad mastery. The generic Lesson Question adapter's select-one support does not make these custom scenes graded Questions.

## GLOBAL ACCESSIBILITY AND LOCALIZATION

English here is a source for genuine complete-language translation (prompts, feedback, accessible labels, Notes, models). Never silently fall back to English. The relevant group/row model and exact quantities must remain operable through equivalent ordered text/table state, native keyboard/switch/touch controls, visible focus, large targets, 200% zoom, mobile layouts and screen readers. RTL adapts prose/layout semantically while preserving equation operand identities and named group/row counts. Reduced motion removes transitions, not mathematical states. Complete selected-language instructions, scene logic and feedback must work offline on weak devices after download, without media, audio-only meaning, dragging or cloud services.

## PRODUCTION / PLATFORM DEPENDENCIES

Available in current generic Lesson renderer: `LessonSection_Config`, text, markdown and `scene` Resource type. Proposed: Equal Group Counter Scene with four prop-free entries and own unit/accessibility tests. Coding Agent verifies locale context, state isolation, and actual offline delivery; do not invent a React `mode` prop. Generic image/audio/video/code are typed-only in current generic renderer; YouTube not a configured Resource. Notes, review scheduler and full download flow are separate product dependencies. No Lesson runtime config or Quiz is created here.

## EDITORIAL SOURCES AND OPEN QUESTIONS

- [Methodologist Brief](./methodologist-brief.md), pending editor approval.
- [Generated taxonomy](../../../../docs/generated/skills/taxonomy.en.md); direct canonical Skill filename/ID is in the Brief.
- [Create Lesson Content](../../../../../../studio/skills/lesson-workflow/create-lesson-content.skill.md).
- **Editorial:** This overlaps the preexisting multiplicationEqualGroups Lesson only in prerequisite context; that Lesson targets expression reading and repeated addition. Editor should confirm a separate equalGroups-focused manipulable Lesson is useful rather than merge its materials.
- **Implementation:** Verify pedagogical equivalent access and full supported-language coverage; no claim of published readiness.

## HANDOFF

One provisional Draft Content and one separate Draft Scene specification. **Gate:** approve the Methodologist Brief first, then Content and Scene independently before Design Scene and Coding Agent implementation. Assessment Architect alone owns evaluated items. Do not modify other Lessons, Skills or Program narratives.
