# Make Groups of a Given Size — Content

Status: Draft — provisional Screenwriter content pending Methodologist Brief approval
Target Lesson: learningApps/playground/Data/Lessons/1/divisionEqualGrouping/
Audience: **Grade 2**, after: Count and make small equal groups, such as repeated collections of three. Understand that a fixed total can be partitioned without adding or losing objects. Recognize the distinction between 'groups of size three' and 'three groups' from the equal-sharing model.
Methodologist source: [Methodologist Brief](./methodologist-brief.md) (Draft, not approved)
Target Skill: The direct canonical equalGrouping.data.ts link in the Methodologist Brief
Program dependence: None

## INSTRUCTIONAL CONCEPT

Introduce quotitive division as discovering the NUMBER of equal-sized groups that fit a total when the SIZE of each group is already given. Show the contrast with the prior fair-sharing story: 12 ÷ 3 = 4 now means 'how many groups of three can be made?' rather than 'how many in each of three groups?'. The arithmetic is the same but the units of the input and answer change.

Quotitive division knows total 12 and group size 3, and determines four groups, written 12÷3=4 because 3+3+3+3=12. This story differs from 12 shared AMONG 3 groups, where 12÷3=4 reports four in each. Both are valid interpretations with different units for divisor and quotient. If total 14 and fixed size 4, create 3 complete groups (12 counters) with 2 left over; no statement 14÷4=3 as an exact whole-number equality. Transfer 20 objects at 5 each gives 4 complete groups.

Learners must identify the _unit_ counted in the answer, not merely choose a numeral. Native controls permit fair grouping and inspection without dragging or reading a long word problem. The representation is not a scored quiz.

## LEARNER JOURNEY

1. **Build Groups of Three:** Start 12 independent counter IDs and a 'Make next group of 3' native control. Child creates four labeled groups of exactly three while pool counts 12→9→6→3→0, each group using exactly one set of three.
2. **Same Symbols, Different Question:** Present two explicitly labeled models with the exact same 12÷3=4 equality: partitive sharing makes 3 groups of 4; grouping makes 4 groups of 3. Learner chooses which number describes groups versus counters in each, without silently changing either story.
3. **When Some Do Not Fit:** New 14-counter pool with target group size four; 'Pack a complete group' produces three groups of 4, leaves 2 in source. A fourth group cannot be formed. Show explicitly '3 complete groups and 2 left'.
4. **Build Groups of Five:** Transfer with pool 20, group size 5, learner predicts 3/4/5, groups via accessible action and checks four groups use all twenty.

## SECTION PLAN

### Section 1 — Build Groups of Three

- **Outcome / conceptual goal:** Build four groups of size three from twelve objects and identify four as the number of complete groups.
- **Section shape:** One `LessonSection_Config` with text, scene, markdown resources ordered vertically.
- **Text Resource (supported):** “We have twelve counters. Make groups with exactly three counters each. How many groups can we make?”
- **Interactive Scene Resource (supported generic type; new Scene proposed):** [Group Size Packing Lab](./scenes/groupSizePackingLab.scene-spec.md), independent entry 1. Start 12 independent counter IDs and a 'Make next group of 3' native control. Child creates four labeled groups of exactly three while pool counts 12→9→6→3→0, each group using exactly one set of three.
- **Markdown Resource (supported):** “Twelve contains four complete groups of three. Here three means how many counters belong in EACH group; four means how many groups we made.” The accurate mathematical record is **12 ÷ 3 = 4**. If division is not exact, explicitly avoid presenting an integer equality as exact.
- **Learner action, observation, feedback:** Start 12 independent counter IDs and a 'Make next group of 3' native control. Child creates four labeled groups of exactly three while pool counts 12→9→6→3→0, each group using exactly one set of three. For likely confusion: If a learner predicts three groups, show three groups of three use only nine and three counters still wait for a fourth group. Each state remains inspectable; “Read counts”, “Show how” and “Reset” are always accessible and none is a graded submission.
- **Model/graphic direction:** An unassigned countable source pool plus an ordered row of full groups, each with a visible and accessible target group size. Incomplete leftovers are explicitly separate, not an unlabeled half-built group. A numerical ledger lists initial count, specified number/size of groups, allocated items, leftover and final amount, with explicit units.
- **Transition/navigation:** Preview the next role/question while retaining access to this model and the ability to replay.
- **Accessibility / locale / RTL:** Authentic translations, semantic role labels, equivalent keyboard/switch/touch/count-table operations, readable focus and mobile/zoom view, screen-reader status, reduced motion and downloaded offline logic.
- **Proposed unlocked Note(s):** “When the size of each group is known, division finds how many groups fit.” after the full explanation is visible (planned only).
- **Dependencies:** Proposed, not implemented Scene; no new Resource type, public mode prop, scoring, Quiz or Note API.

### Section 2 — Same Symbols, Different Question

- **Outcome / conceptual goal:** Read 12 ÷ 3 = 4 with 'three in each group' as the known divisor and 'four groups' as the quotient in this story.
- **Section shape:** One `LessonSection_Config` with text, scene, markdown resources ordered vertically.
- **Text Resource (supported):** “Compare 'share 12 among 3 groups' and 'make groups of 3 from 12'. Does the answer four mean the same thing?”
- **Interactive Scene Resource (supported generic type; new Scene proposed):** [Group Size Packing Lab](./scenes/groupSizePackingLab.scene-spec.md), independent entry 2. Present two explicitly labeled models with the exact same 12÷3=4 equality: partitive sharing makes 3 groups of 4; grouping makes 4 groups of 3. Learner chooses which number describes groups versus counters in each, without silently changing either story.
- **Markdown Resource (supported):** “In fair sharing, we know THREE groups and find FOUR in each. In grouping, we know THREE in each and find FOUR groups. The number sentence is identical; the story says what the answer counts.” The accurate mathematical record is **12 ÷ 3 = 4**. If division is not exact, explicitly avoid presenting an integer equality as exact.
- **Learner action, observation, feedback:** Present two explicitly labeled models with the exact same 12÷3=4 equality: partitive sharing makes 3 groups of 4; grouping makes 4 groups of 3. Learner chooses which number describes groups versus counters in each, without silently changing either story. For likely confusion: If a child claims four groups in the sharing model, name the three fixed recipient trays and count four inside each; preserve the unit labels. Each state remains inspectable; “Read counts”, “Show how” and “Reset” are always accessible and none is a graded submission.
- **Model/graphic direction:** An unassigned countable source pool plus an ordered row of full groups, each with a visible and accessible target group size. Incomplete leftovers are explicitly separate, not an unlabeled half-built group. A numerical ledger lists initial count, specified number/size of groups, allocated items, leftover and final amount, with explicit units.
- **Transition/navigation:** Preview the next role/question while retaining access to this model and the ability to replay.
- **Accessibility / locale / RTL:** Authentic translations, semantic role labels, equivalent keyboard/switch/touch/count-table operations, readable focus and mobile/zoom view, screen-reader status, reduced motion and downloaded offline logic.
- **Proposed unlocked Note(s):** “When the size of each group is known, division finds how many groups fit.” after the full explanation is visible (planned only).
- **Dependencies:** Proposed, not implemented Scene; no new Resource type, public mode prop, scoring, Quiz or Note API.

### Section 3 — When Some Do Not Fit

- **Outcome / conceptual goal:** Explain that grouping 14 by fours yields three complete groups with two left, not a fourth incomplete group counted as complete.
- **Section shape:** One `LessonSection_Config` with text, scene, markdown resources ordered vertically.
- **Text Resource (supported):** “Fourteen counters in groups of four. How many COMPLETE groups can you make, and what remains?”
- **Interactive Scene Resource (supported generic type; new Scene proposed):** [Group Size Packing Lab](./scenes/groupSizePackingLab.scene-spec.md), independent entry 3. New 14-counter pool with target group size four; 'Pack a complete group' produces three groups of 4, leaves 2 in source. A fourth group cannot be formed. Show explicitly '3 complete groups and 2 left'.
- **Markdown Resource (supported):** “Three complete groups take twelve counters; two are left over. Two counters are not a complete group of four. Division here is not exact in whole numbers.” The accurate mathematical record is **14 = 3 × 4 + 2**. If division is not exact, explicitly avoid presenting an integer equality as exact.
- **Learner action, observation, feedback:** New 14-counter pool with target group size four; 'Pack a complete group' produces three groups of 4, leaves 2 in source. A fourth group cannot be formed. Show explicitly '3 complete groups and 2 left'. For likely confusion: If child counts four groups, show final unfinished pair has only two, so it cannot count as a full group of four. Each state remains inspectable; “Read counts”, “Show how” and “Reset” are always accessible and none is a graded submission.
- **Model/graphic direction:** An unassigned countable source pool plus an ordered row of full groups, each with a visible and accessible target group size. Incomplete leftovers are explicitly separate, not an unlabeled half-built group. A numerical ledger lists initial count, specified number/size of groups, allocated items, leftover and final amount, with explicit units.
- **Transition/navigation:** Preview the next role/question while retaining access to this model and the ability to replay.
- **Accessibility / locale / RTL:** Authentic translations, semantic role labels, equivalent keyboard/switch/touch/count-table operations, readable focus and mobile/zoom view, screen-reader status, reduced motion and downloaded offline logic.
- **Proposed unlocked Note(s):** “Count only complete groups; any extra objects remain ungrouped.” after the full explanation is visible (planned only).
- **Dependencies:** Proposed, not implemented Scene; no new Resource type, public mode prop, scoring, Quiz or Note API.

### Section 4 — Build Groups of Five

- **Outcome / conceptual goal:** Build groups of size five from twenty counters, count four complete groups, and check 4×5=20.
- **Section shape:** One `LessonSection_Config` with text, scene, markdown resources ordered vertically.
- **Text Resource (supported):** “Twenty counters: how many groups of five can we build?”
- **Interactive Scene Resource (supported generic type; new Scene proposed):** [Group Size Packing Lab](./scenes/groupSizePackingLab.scene-spec.md), independent entry 4. Transfer with pool 20, group size 5, learner predicts 3/4/5, groups via accessible action and checks four groups use all twenty.
- **Markdown Resource (supported):** “Four groups of five use twenty counters. Four tells how many complete groups, and five is their required size.” The accurate mathematical record is **20 ÷ 5 = 4; 4 × 5 = 20**. If division is not exact, explicitly avoid presenting an integer equality as exact.
- **Learner action, observation, feedback:** Transfer with pool 20, group size 5, learner predicts 3/4/5, groups via accessible action and checks four groups use all twenty. For likely confusion: Three groups use fifteen and leave five; five groups would need twenty-five, more than provided. Each state remains inspectable; “Read counts”, “Show how” and “Reset” are always accessible and none is a graded submission.
- **Model/graphic direction:** An unassigned countable source pool plus an ordered row of full groups, each with a visible and accessible target group size. Incomplete leftovers are explicitly separate, not an unlabeled half-built group. A numerical ledger lists initial count, specified number/size of groups, allocated items, leftover and final amount, with explicit units.
- **Transition/navigation:** Offer a voluntary explanation of what the answer counts and finish without a score.
- **Accessibility / locale / RTL:** Authentic translations, semantic role labels, equivalent keyboard/switch/touch/count-table operations, readable focus and mobile/zoom view, screen-reader status, reduced motion and downloaded offline logic.
- **Proposed unlocked Note(s):** “When the size of each group is known, division finds how many groups fit.” after the full explanation is visible (planned only).
- **Dependencies:** Proposed, not implemented Scene; no new Resource type, public mode prop, scoring, Quiz or Note API.

## CUSTOM SCENE SPECIFICATIONS

- [Group Size Packing Lab](./scenes/groupSizePackingLab.scene-spec.md) — four independent prop-free Section entries; generic Scene Resource rendering exists, but this new component does not.

## LESSON NOTES — UNLOCKED RECALL CUES (PLANNED)

1. “When the size of each group is known, division finds how many groups fit.” — editorial proposal after its corresponding explanation, not a scored success event.
2. “Count only complete groups; any extra objects remain ungrouped.” — editorial proposal after its corresponding explanation, not a scored success event.

Notes are **planned, not wired**: no implemented Note type, unlock API, per-child persistence, revision sheet or spaced review is assumed.

## PRACTICE, RETRIEVAL AND ASSESSMENT HANDOFF

The final Section uses fresh numbers and optionally reduced scaffolding. Practice predictions and observed leftover quantities are purely formative. The Assessment Architect independently validates any graded items, including whether to assess a non-exact whole-number case, permitted number ranges, error messages, thresholds and evidence of mastery. The current select-one Quiz adapter does not implement these bespoke group-model Scenes.

## GLOBAL ACCESSIBILITY AND LOCALIZATION

Every learner prompt, count, unit label, number of groups, size in each, leftover status and feedback must have genuine translations into every supported locale; no fallback. All counter layouts provide fully **operable** state lists and native keyboard/switch/touch controls, not just descriptive labels, with WCAG 2.2 AA, child-size targets, screen-reader status, high contrast, focus, zoom/mobile and semantic RTL numerical order. Reduced motion retains exact before/after count states. Downloaded locale and scene math/feedback must work offline on weak devices without drag, network, audio or video.

## PRODUCTION / PLATFORM DEPENDENCIES

General `LessonSection_Config` and text, markdown, scene renderer are present. Group Size Packing Lab is proposed, requires approved Scene spec, prop-free entries, genuine locale strings, accessibility/unit tests and offline verification. Images/audio/video/code Resource kinds are typed-only in generic renderer; no YouTube. Notes, spaced retrieval and PWA package delivery are separate product features, not claimed implemented. No actual runtime Lesson or assessed Question authored here.

## EDITORIAL SOURCES AND OPEN QUESTIONS

- [Methodologist Brief](./methodologist-brief.md), Draft, needs approval.
- [Canonical Skill](../../../../data/skills/arithmetic/divide/skills/equalGrouping.data.ts), unchanged.
- [Create Lesson Content workflow](../../../../../../studio/skills/lesson-workflow/create-lesson-content.skill.md).
- Do not duplicate the earlier fair-sharing exercise: the group size here is specified first and the unknown is the NUMBER of groups. For Grade 2, use leftover observations without requiring formal division-with-remainder notation.
- Coordinator-owned English taxonomy is deliberately unchanged until integration.

## HANDOFF

Provisional Draft Content plus separately reviewable Draft Scene specification. Editor approves Methodologist Brief first, then Content/Scene; only then may Design Scene and Coding Agent implement, with Assessment Architect separately approving scored work. No unrelated Lessons or canon Skills modified.
