# Share Equally: How Many in Each Group? — Content

Status: Draft — provisional Screenwriter content pending Methodologist Brief approval
Target Lesson: learningApps/playground/Data/Lessons/1/divisionEqualSharing/
Audience: **Grade 2**, after: Count groups of objects up to 20 and count how many are in each. Distribute objects one-to-one across two or three labeled recipients. Recognize equal groups as groups with the same amount and explain a leftover object.
Methodologist source: [Methodologist Brief](./methodologist-brief.md) (Draft, not approved)
Target Skill: The direct canonical equalSharing.data.ts link in the Methodologist Brief
Program dependence: None

## INSTRUCTIONAL CONCEPT

Introduce partitive division through an exact, fair share: when the total and the number of groups are known, the learner must discover the size of EACH group. The distinction between the number of recipients and the number of objects in each share is the concept, not a division sign memorized ahead of the experience.

With an exact whole-number share, 12 objects and 3 groups give 4 each, written 12 ÷ 3 = 4. The shares must all match: 4+4+4=12. A second exact case 10 ÷ 2 = 5 uses two groups of five. When trying to share 13 counters among 3 groups, four go in each and one remains: there is NO equal share of all thirteen into three whole-number groups; do not falsely write 13 ÷ 3 = 4 as an exact identity. The remainder is observed as one leftover object without a full formal remainder algorithm. A divisor of zero is not used.

Learners must identify the _unit_ counted in the answer, not merely choose a numeral. Native controls permit fair grouping and inspection without dragging or reading a long word problem. The representation is not a scored quiz.

## LEARNER JOURNEY

1. **Give Everyone an Equal Share:** Start 12 uniquely identified counters in a source area and 3 empty labeled groups. Child activates 'Give one to each group' (three moves per complete round) or accessible single-step distribute; three complete rounds plus one produce four each.
2. **What Do the Numbers Mean?:** Keep the completed twelve-counter sharing scene. Learner activates labeled positions in the expression; highlight total 12, group count 3 and per-group size 4 with full screen-reader names, then reveal 4+4+4=12.
3. **What if One Counter Is Left?:** Fresh independent 13-counter scene, three groups; allow four fair rounds assigning twelve, then leave exactly one visibly in the source area. Narrate 'four each; one left over' and explicitly refuse to label 13÷3=4 an exact equality.
4. **Share Ten With Two Groups:** New exact transfer with ten objects and two groups; child predicts 4/5/6, distributes or reveals the groups, then validates 5+5=10.

## SECTION PLAN

### Section 1 — Give Everyone an Equal Share

- **Outcome / conceptual goal:** Share 12 counters fairly among 3 clearly labeled groups and show 4 in each.
- **Section shape:** One `LessonSection_Config` with text, scene, markdown resources ordered vertically.
- **Text Resource (supported):** “Twelve counters must be shared among three groups. Can you give each group the same number?”
- **Interactive Scene Resource (supported generic type; new Scene proposed):** [Fair Sharing Workshop](./scenes/fairSharingWorkshop.scene-spec.md), independent entry 1. Start 12 uniquely identified counters in a source area and 3 empty labeled groups. Child activates 'Give one to each group' (three moves per complete round) or accessible single-step distribute; three complete rounds plus one produce four each.
- **Markdown Resource (supported):** “Twelve shared equally among three groups leaves four counters in every group. We used every counter once and nobody has extra.” The accurate mathematical record is **12 ÷ 3 = 4**. If division is not exact, explicitly avoid presenting an integer equality as exact.
- **Learner action, observation, feedback:** Start 12 uniquely identified counters in a source area and 3 empty labeled groups. Child activates 'Give one to each group' (three moves per complete round) or accessible single-step distribute; three complete rounds plus one produce four each. For likely confusion: If a child predicts three in each, count 3+3+3=9 with three still unassigned; distribute the remaining three, one to each. Each state remains inspectable; “Read counts”, “Show how” and “Reset” are always accessible and none is a graded submission.
- **Model/graphic direction:** Three large labeled share trays (or two for transfer), a source counter pile with stable IDs and a tally of each group; allow 'one to each' and direct accessible step controls, not drag-only distribution. A numerical ledger lists initial count, specified number/size of groups, allocated items, leftover and final amount, with explicit units.
- **Transition/navigation:** Preview the next role/question while retaining access to this model and the ability to replay.
- **Accessibility / locale / RTL:** Authentic translations, semantic role labels, equivalent keyboard/switch/touch/count-table operations, readable focus and mobile/zoom view, screen-reader status, reduced motion and downloaded offline logic.
- **Proposed unlocked Note(s):** “Fair sharing means every group receives the same number.” after the full explanation is visible (planned only).
- **Dependencies:** Proposed, not implemented Scene; no new Resource type, public mode prop, scoring, Quiz or Note API.

### Section 2 — What Do the Numbers Mean?

- **Outcome / conceptual goal:** Explain that 12 is the dividend/total, 3 is the known group count (divisor in this sharing story), and 4 is each group’s size.
- **Section shape:** One `LessonSection_Config` with text, scene, markdown resources ordered vertically.
- **Text Resource (supported):** “In 12 ÷ 3 = 4, which number counts all counters, which counts groups, and which counts each share?”
- **Interactive Scene Resource (supported generic type; new Scene proposed):** [Fair Sharing Workshop](./scenes/fairSharingWorkshop.scene-spec.md), independent entry 2. Keep the completed twelve-counter sharing scene. Learner activates labeled positions in the expression; highlight total 12, group count 3 and per-group size 4 with full screen-reader names, then reveal 4+4+4=12.
- **Markdown Resource (supported):** “Twelve is the total. Three says how many groups are receiving a share. Four tells us how many counters each receives.” The accurate mathematical record is **12 ÷ 3 = 4; 4 + 4 + 4 = 12**. If division is not exact, explicitly avoid presenting an integer equality as exact.
- **Learner action, observation, feedback:** Keep the completed twelve-counter sharing scene. Learner activates labeled positions in the expression; highlight total 12, group count 3 and per-group size 4 with full screen-reader names, then reveal 4+4+4=12. For likely confusion: For 'three in each', inspect all three trays and count four in one; do not allow positions to be swapped silently. Each state remains inspectable; “Read counts”, “Show how” and “Reset” are always accessible and none is a graded submission.
- **Model/graphic direction:** Three large labeled share trays (or two for transfer), a source counter pile with stable IDs and a tally of each group; allow 'one to each' and direct accessible step controls, not drag-only distribution. A numerical ledger lists initial count, specified number/size of groups, allocated items, leftover and final amount, with explicit units.
- **Transition/navigation:** Preview the next role/question while retaining access to this model and the ability to replay.
- **Accessibility / locale / RTL:** Authentic translations, semantic role labels, equivalent keyboard/switch/touch/count-table operations, readable focus and mobile/zoom view, screen-reader status, reduced motion and downloaded offline logic.
- **Proposed unlocked Note(s):** “The number of groups is known; division finds how many are in each group.” after the full explanation is visible (planned only).
- **Dependencies:** Proposed, not implemented Scene; no new Resource type, public mode prop, scoring, Quiz or Note API.

### Section 3 — What if One Counter Is Left?

- **Outcome / conceptual goal:** Recognize that 13 counters cannot be distributed equally among 3 groups with whole counters without one left over.
- **Section shape:** One `LessonSection_Config` with text, scene, markdown resources ordered vertically.
- **Text Resource (supported):** “What changes when you share thirteen counters among three groups? Can every counter fit into an equal whole-number share?”
- **Interactive Scene Resource (supported generic type; new Scene proposed):** [Fair Sharing Workshop](./scenes/fairSharingWorkshop.scene-spec.md), independent entry 3. Fresh independent 13-counter scene, three groups; allow four fair rounds assigning twelve, then leave exactly one visibly in the source area. Narrate 'four each; one left over' and explicitly refuse to label 13÷3=4 an exact equality.
- **Markdown Resource (supported):** “Three groups can each have four, but one counter remains. Sharing all thirteen into three equal groups of whole counters is not exact.” The accurate mathematical record is **13 = 3 × 4 + 1**. If division is not exact, explicitly avoid presenting an integer equality as exact.
- **Learner action, observation, feedback:** Fresh independent 13-counter scene, three groups; allow four fair rounds assigning twelve, then leave exactly one visibly in the source area. Narrate 'four each; one left over' and explicitly refuse to label 13÷3=4 an exact equality. For likely confusion: If a learner adds leftover to one tray, counts become 5,4,4 and shares are unequal; show counts and correct by restoring that one to the source area. Each state remains inspectable; “Read counts”, “Show how” and “Reset” are always accessible and none is a graded submission.
- **Model/graphic direction:** Three large labeled share trays (or two for transfer), a source counter pile with stable IDs and a tally of each group; allow 'one to each' and direct accessible step controls, not drag-only distribution. A numerical ledger lists initial count, specified number/size of groups, allocated items, leftover and final amount, with explicit units.
- **Transition/navigation:** Preview the next role/question while retaining access to this model and the ability to replay.
- **Accessibility / locale / RTL:** Authentic translations, semantic role labels, equivalent keyboard/switch/touch/count-table operations, readable focus and mobile/zoom view, screen-reader status, reduced motion and downloaded offline logic.
- **Proposed unlocked Note(s):** None in this Section.
- **Dependencies:** Proposed, not implemented Scene; no new Resource type, public mode prop, scoring, Quiz or Note API.

### Section 4 — Share Ten With Two Groups

- **Outcome / conceptual goal:** Share 10 into 2 groups, predicting 5 in each and checking through a total count.
- **Section shape:** One `LessonSection_Config` with text, scene, markdown resources ordered vertically.
- **Text Resource (supported):** “Ten counters and two groups: how many does each get?”
- **Interactive Scene Resource (supported generic type; new Scene proposed):** [Fair Sharing Workshop](./scenes/fairSharingWorkshop.scene-spec.md), independent entry 4. New exact transfer with ten objects and two groups; child predicts 4/5/6, distributes or reveals the groups, then validates 5+5=10.
- **Markdown Resource (supported):** “Two equal shares of five use all ten counters. The group count is two, and the group size is five.” The accurate mathematical record is **10 ÷ 2 = 5**. If division is not exact, explicitly avoid presenting an integer equality as exact.
- **Learner action, observation, feedback:** New exact transfer with ten objects and two groups; child predicts 4/5/6, distributes or reveals the groups, then validates 5+5=10. For likely confusion: Four each only uses eight with two left; six each would require twelve, more than we started with. Each state remains inspectable; “Read counts”, “Show how” and “Reset” are always accessible and none is a graded submission.
- **Model/graphic direction:** Three large labeled share trays (or two for transfer), a source counter pile with stable IDs and a tally of each group; allow 'one to each' and direct accessible step controls, not drag-only distribution. A numerical ledger lists initial count, specified number/size of groups, allocated items, leftover and final amount, with explicit units.
- **Transition/navigation:** Offer a voluntary explanation of what the answer counts and finish without a score.
- **Accessibility / locale / RTL:** Authentic translations, semantic role labels, equivalent keyboard/switch/touch/count-table operations, readable focus and mobile/zoom view, screen-reader status, reduced motion and downloaded offline logic.
- **Proposed unlocked Note(s):** “The number of groups is known; division finds how many are in each group.” after the full explanation is visible (planned only).
- **Dependencies:** Proposed, not implemented Scene; no new Resource type, public mode prop, scoring, Quiz or Note API.

## CUSTOM SCENE SPECIFICATIONS

- [Fair Sharing Workshop](./scenes/fairSharingWorkshop.scene-spec.md) — four independent prop-free Section entries; generic Scene Resource rendering exists, but this new component does not.

## LESSON NOTES — UNLOCKED RECALL CUES (PLANNED)

1. “Fair sharing means every group receives the same number.” — editorial proposal after its corresponding explanation, not a scored success event.
2. “The number of groups is known; division finds how many are in each group.” — editorial proposal after its corresponding explanation, not a scored success event.

Notes are **planned, not wired**: no implemented Note type, unlock API, per-child persistence, revision sheet or spaced review is assumed.

## PRACTICE, RETRIEVAL AND ASSESSMENT HANDOFF

The final Section uses fresh numbers and optionally reduced scaffolding. Practice predictions and observed leftover quantities are purely formative. The Assessment Architect independently validates any graded items, including whether to assess a non-exact whole-number case, permitted number ranges, error messages, thresholds and evidence of mastery. The current select-one Quiz adapter does not implement these bespoke group-model Scenes.

## GLOBAL ACCESSIBILITY AND LOCALIZATION

Every learner prompt, count, unit label, number of groups, size in each, leftover status and feedback must have genuine translations into every supported locale; no fallback. All counter layouts provide fully **operable** state lists and native keyboard/switch/touch controls, not just descriptive labels, with WCAG 2.2 AA, child-size targets, screen-reader status, high contrast, focus, zoom/mobile and semantic RTL numerical order. Reduced motion retains exact before/after count states. Downloaded locale and scene math/feedback must work offline on weak devices without drag, network, audio or video.

## PRODUCTION / PLATFORM DEPENDENCIES

General `LessonSection_Config` and text, markdown, scene renderer are present. Fair Sharing Workshop is proposed, requires approved Scene spec, prop-free entries, genuine locale strings, accessibility/unit tests and offline verification. Images/audio/video/code Resource kinds are typed-only in generic renderer; no YouTube. Notes, spaced retrieval and PWA package delivery are separate product features, not claimed implemented. No actual runtime Lesson or assessed Question authored here.

## EDITORIAL SOURCES AND OPEN QUESTIONS

- [Methodologist Brief](./methodologist-brief.md), Draft, needs approval.
- [Canonical Skill](../../../../data/skills/arithmetic/divide/skills/equalSharing.data.ts), unchanged.
- [Create Lesson Content workflow](../../../../../../studio/skills/lesson-workflow/create-lesson-content.skill.md).
- Formally introducing quotient/remainder terminology is optional for Grade 2; retain the accuracy of the non-exact case. Do not overlap the existing unknownDividend Lesson's purpose of recovering a hidden starting total.
- Coordinator-owned English taxonomy is deliberately unchanged until integration.

## HANDOFF

Provisional Draft Content plus separately reviewable Draft Scene specification. Editor approves Methodologist Brief first, then Content/Scene; only then may Design Scene and Coding Agent implement, with Assessment Architect separately approving scored work. No unrelated Lessons or canon Skills modified.
