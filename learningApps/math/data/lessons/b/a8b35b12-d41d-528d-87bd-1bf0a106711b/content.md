# When Ones Make a New Ten — Content

Status: Draft — provisional Screenwriter content pending Methodologist Brief approval
Target Lesson: learningApps/playground/Data/Lessons/1/additionCrossingTen/
Audience: **Grade 2**, with prerequisites: Count at least 20 objects and identify one group of ten as equivalent to ten ones. Add one-digit quantities such as 8+5 and explain 13 as one ten and three ones. Understand that grouping objects differently does not create or remove any counters.
Methodologist source: [Methodologist Brief](./methodologist-brief.md) (Draft, not approved)
Target Skill: `crossTenAddition.data.ts`, canonical and directly linked in Brief
Program dependence: None

## INSTRUCTIONAL CONCEPT

When two collections of ones together contain ten or more, exchange exactly ten ones for one ten while conserving the value. This lesson makes a base-ten exchange visible. It is distinct from the existing make-ten mental strategy: here the child records and justifies the _new ten_ after the ones sum, not only decomposes an addend to reach ten.

For 8+5, count thirteen one-counters, trade ten for one ten-bundle, retain three individual ones: 13 ones → 1 ten + 3 ones, both equal 13. For 9+4, 13 ones → 1T 3O. For 7+6, 13 ones → 1T 3O. Optional boundary 6+4=10 becomes 1T 0O. In decimal place value exactly TEN ones can be replaced with ONE ten; this is not a new amount, and both originals must be counted only once. All totals ≤20; no written carry marks yet.

The child learns by making a prediction, controlling the mathematical model and explaining the observed invariant. It is not a generic article followed by a quiz. All choices are instructional, not score-bearing.

## LEARNER JOURNEY

1. **Thirteen Loose Ones:** Start with eight and five uniquely identifiable one-counters in separately labeled trays, then let the learner place them in a joint counting area. Count 8+5=13; keep both contributions observable in the ledger.
2. **Exchange Ten, Keep Three:** Allow 'Group next one' or 'Exchange ten at once' to take exactly ten of the thirteen from the loose counter area, show one 10-valued ten-bundle, and leave exactly three loose counters. Undo restores thirteen ones.
3. **Another Pair That Crosses Ten:** Independent 9+4 trial begins with thirteen ones, offers prediction of 1T3O and a learner-controlled exchange from 13 ones to 1 ten and 3 ones; compare original contributors.
4. **Look for the Ten in Seven Plus Six:** Transfer: 7+6=13 with exchange to 1T3O, then optional boundary 6+4=10 to 1T0O; learner predicts the remainder and checks both original sums.

## SECTION PLAN

### Section 1 — Thirteen Loose Ones

- **Purpose/outcome:** Observe 8+5=13, count the thirteen ones and recognize that they contain a group of ten.
- **Typed structure:** One ordered `LessonSection_Config` with text, scene, markdown resources in a single vertical column.
- **Learner-facing text resource (supported):** “There are 8 ones in one tray and 5 in another. How many ones altogether?”
- **Interactive scene resource (supported type; new Scene proposed):** [Ten Exchange Workshop](./scenes/tenExchangeWorkshop.scene-spec.md), independently initialized placement 1. Start with eight and five uniquely identifiable one-counters in separately labeled trays, then let the learner place them in a joint counting area. Count 8+5=13; keep both contributions observable in the ledger.
- **Learner-facing markdown resource (supported):** “Eight ones plus five ones make thirteen ones. The total is thirteen, even before we group any counters.” Exact expression: **8 + 5 = 13**.
- **Learner action, observations and feedback:** Start with eight and five uniquely identifiable one-counters in separately labeled trays, then let the learner place them in a joint counting area. Count 8+5=13; keep both contributions observable in the ledger. If an incorrect response is selected, explain: A prediction of twelve overlooks a counter; fourteen counts one twice. Show a complete list of eight from the first group and five from the second. Provide “Show how”, “Read the groups” and “Reset” whether or not the child submits a prediction.
- **Illustration/model direction:** Two source trays, a large exchange ring accepting precisely ten counters and a single ten-bundle marked 10, with an accessible running ledger; never show ten _more_ counters appearing. Preserve exact numerical objects/quantities and display an equivalent readable, navigable count ledger, not a decorative picture.
- **Transition/navigation:** Offer a question for the next Section only after the current relationship is visible, with non-scored optional replay.
- **Accessibility, locale and RTL:** Native touch, keyboard and screen-reader operations; exact group roles and equations read in correct math order across RTL; full real translations and reduced-motion equivalence, including offline use.
- **Proposed unlocked Note(s):** None in this Section.
- **Dependencies/status:** Scene is new and unimplemented. No API for Notes, scoring, question grading, Scene props or lesson assembly is invented.

### Section 2 — Exchange Ten, Keep Three

- **Purpose/outcome:** Exchange ten of those ones for one labeled ten and three ones without changing total thirteen.
- **Typed structure:** One ordered `LessonSection_Config` with text, scene, markdown resources in a single vertical column.
- **Learner-facing text resource (supported):** “Thirteen loose ones are hard to read quickly. Can you replace exactly ten ones with a ten-bundle?”
- **Interactive scene resource (supported type; new Scene proposed):** [Ten Exchange Workshop](./scenes/tenExchangeWorkshop.scene-spec.md), independently initialized placement 2. Allow 'Group next one' or 'Exchange ten at once' to take exactly ten of the thirteen from the loose counter area, show one 10-valued ten-bundle, and leave exactly three loose counters. Undo restores thirteen ones.
- **Learner-facing markdown resource (supported):** “Ten of the thirteen ones became one ten; the other three stayed. The new shape still shows thirteen, not twenty-three.” Exact expression: **13 ones = 1 ten + 3 ones**.
- **Learner action, observations and feedback:** Allow 'Group next one' or 'Exchange ten at once' to take exactly ten of the thirteen from the loose counter area, show one 10-valued ten-bundle, and leave exactly three loose counters. Undo restores thirteen ones. If an incorrect response is selected, explain: If a learner claims 23, contrast 10+3=13 with the incorrect 10+13=23: the ten is replacing counters, not arriving on top of them. Provide “Show how”, “Read the groups” and “Reset” whether or not the child submits a prediction.
- **Illustration/model direction:** Two source trays, a large exchange ring accepting precisely ten counters and a single ten-bundle marked 10, with an accessible running ledger; never show ten _more_ counters appearing. Preserve exact numerical objects/quantities and display an equivalent readable, navigable count ledger, not a decorative picture.
- **Transition/navigation:** Offer a question for the next Section only after the current relationship is visible, with non-scored optional replay.
- **Accessibility, locale and RTL:** Native touch, keyboard and screen-reader operations; exact group roles and equations read in correct math order across RTL; full real translations and reduced-motion equivalence, including offline use.
- **Proposed unlocked Note(s):** “Ten ones can become one ten without changing how many.” after the complete model and explanation have been shown (planned, not wired).
- **Dependencies/status:** Scene is new and unimplemented. No API for Notes, scoring, question grading, Scene props or lesson assembly is invented.

### Section 3 — Another Pair That Crosses Ten

- **Purpose/outcome:** Explain both 9+4=13 and 7+6=13 with a correctly conserved ten-and-ones model.
- **Typed structure:** One ordered `LessonSection_Config` with text, scene, markdown resources in a single vertical column.
- **Learner-facing text resource (supported):** “Nine ones plus four ones. Does a new ten appear? How many ones stay loose?”
- **Interactive scene resource (supported type; new Scene proposed):** [Ten Exchange Workshop](./scenes/tenExchangeWorkshop.scene-spec.md), independently initialized placement 3. Independent 9+4 trial begins with thirteen ones, offers prediction of 1T3O and a learner-controlled exchange from 13 ones to 1 ten and 3 ones; compare original contributors.
- **Learner-facing markdown resource (supported):** “Nine and four make thirteen; exchanging ten produces one ten and three ones. The sum is still thirteen.” Exact expression: **9 + 4 = 13 = 1 ten + 3 ones**.
- **Learner action, observations and feedback:** Independent 9+4 trial begins with thirteen ones, offers prediction of 1T3O and a learner-controlled exchange from 13 ones to 1 ten and 3 ones; compare original contributors. If an incorrect response is selected, explain: One ten and four ones would mean fourteen, not thirteen; show four original new ones were included in all thirteen before exchange. Provide “Show how”, “Read the groups” and “Reset” whether or not the child submits a prediction.
- **Illustration/model direction:** Two source trays, a large exchange ring accepting precisely ten counters and a single ten-bundle marked 10, with an accessible running ledger; never show ten _more_ counters appearing. Preserve exact numerical objects/quantities and display an equivalent readable, navigable count ledger, not a decorative picture.
- **Transition/navigation:** Offer a question for the next Section only after the current relationship is visible, with non-scored optional replay.
- **Accessibility, locale and RTL:** Native touch, keyboard and screen-reader operations; exact group roles and equations read in correct math order across RTL; full real translations and reduced-motion equivalence, including offline use.
- **Proposed unlocked Note(s):** “The remaining ones stay after you make a group of ten.” after the complete model and explanation have been shown (planned, not wired).
- **Dependencies/status:** Scene is new and unimplemented. No API for Notes, scoring, question grading, Scene props or lesson assembly is invented.

### Section 4 — Look for the Ten in Seven Plus Six

- **Purpose/outcome:** Distinguish composing a ten from adding extra objects or incorrectly leaving the original ten loose after exchanging.
- **Typed structure:** One ordered `LessonSection_Config` with text, scene, markdown resources in a single vertical column.
- **Learner-facing text resource (supported):** “Seven ones plus six ones. How many tens and ones after exchanging? What about six plus four?”
- **Interactive scene resource (supported type; new Scene proposed):** [Ten Exchange Workshop](./scenes/tenExchangeWorkshop.scene-spec.md), independently initialized placement 4. Transfer: 7+6=13 with exchange to 1T3O, then optional boundary 6+4=10 to 1T0O; learner predicts the remainder and checks both original sums.
- **Learner-facing markdown resource (supported):** “Seven plus six makes thirteen, so one ten and three ones. Six plus four makes exactly ten, so one ten and no loose ones.” Exact expression: **7 + 6 = 13; 6 + 4 = 10**.
- **Learner action, observations and feedback:** Transfer: 7+6=13 with exchange to 1T3O, then optional boundary 6+4=10 to 1T0O; learner predicts the remainder and checks both original sums. If an incorrect response is selected, explain: If the learner reports one ten and six ones for 7+6, show that the six were part of the total thirteen and ten were exchanged. For 6+4, there are zero ones left over. Provide “Show how”, “Read the groups” and “Reset” whether or not the child submits a prediction.
- **Illustration/model direction:** Two source trays, a large exchange ring accepting precisely ten counters and a single ten-bundle marked 10, with an accessible running ledger; never show ten _more_ counters appearing. Preserve exact numerical objects/quantities and display an equivalent readable, navigable count ledger, not a decorative picture.
- **Transition/navigation:** End with an optional self-explanation and reflection; do not claim mastery or a scored result.
- **Accessibility, locale and RTL:** Native touch, keyboard and screen-reader operations; exact group roles and equations read in correct math order across RTL; full real translations and reduced-motion equivalence, including offline use.
- **Proposed unlocked Note(s):** “Ten ones can become one ten without changing how many.” after the complete model and explanation have been shown (planned, not wired).
- **Dependencies/status:** Scene is new and unimplemented. No API for Notes, scoring, question grading, Scene props or lesson assembly is invented.

## CUSTOM SCENE SPECIFICATIONS

- [Ten Exchange Workshop](./scenes/tenExchangeWorkshop.scene-spec.md) — four self-contained prop-free Scene entries, one per Section; existing generic Scene resource permits future embedding, but this particular component does not yet exist.

## LESSON NOTES — UNLOCKED RECALL CUES (PLANNED)

1. “Ten ones can become one ten without changing how many.” — proposed after the first corresponding fully explained demonstration, not as proof of a correct guess.
2. “The remaining ones stay after you make a group of ten.” — proposed after the first corresponding fully explained demonstration, not as proof of a correct guess.

Notes are _planned and not wired_. Do not invent existing Note IDs, unlock events, learner persistence, revision sheet or spaced scheduler; a Note reveal is not proof of mastery.

## PRACTICE, RETRIEVAL AND ASSESSMENT HANDOFF

The independent Section 4 example gives a new configuration and explanatory numerical feedback. Assessment Architect later decides validated scored Question types, Skill attribution, retry thresholds and evidence of mastery; the current Lesson Question adapter supports select-one but is **not** an implementation of these bespoke Scenes. No Quiz_Config or scored Question records are authored.

## GLOBAL ACCESSIBILITY AND LOCALIZATION

Every child-facing phrase, control, count, description, error and Note requires genuine translation to all supported locales; never silently fall back to English. All physical groups, exchanges, pairs and alternative representations must be operable through a fully equivalent ordered text/keyboard interface and screen-reader announcement, including semantic direction for RTL while retaining exact math operand identities. WCAG 2.2 AA, clear focus, child-sized controls, high contrast, 200% zoom, mobile/low-end devices and reduced motion apply equally. After the selected locale/content is downloaded, the entire model, arithmetic and feedback must work offline without video/audio/drag/network dependencies.

## PRODUCTION / PLATFORM DEPENDENCIES

Current generic LessonSection_Config renderer supports text, markdown and scene resources. Proposed: Ten Exchange Workshop, four separate prop-free placements with real locale context and own accessibility/unit tests, pending approval. Typed-only image/audio/video/code resources and YouTube are not needed. Notes/review/offline package systems are separate product dependencies, not claimed implemented. No runtime Lesson, Question, Quiz or scoring code built in this delivery.

## EDITORIAL SOURCES AND OPEN QUESTIONS

- [Methodologist Brief](./methodologist-brief.md), Draft, not yet approved.
- [Canonical Skill file](../../../../data/skills/arithmetic/addition/skills/crossTenAddition.data.ts), directly copied from Mathematics.
- [Create Lesson Content workflow](../../../../../../studio/skills/lesson-workflow/create-lesson-content.skill.md).
- Check that the audience has mastered composing tens; distinguish crossing-ten exchange here from the previously drafted makeTenStrategy, which explicitly decomposes a second addend.
- Shared taxonomy overview is coordinator-owned and intentionally not regenerated by this agent.

## HANDOFF

Provisional Draft Content and Draft Scene spec for review. Editor approves Methodologist Brief first, then Content/Scene separately. Later Scene Designer, Coding Agent and Assessment Architect work only with separate authorization. No other Lesson edits or runtime changes.
