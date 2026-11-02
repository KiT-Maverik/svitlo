# Three Addends, Different Groups — Content

Status: Draft — provisional Screenwriter content pending Methodologist Brief approval
Target Lesson: learningApps/playground/Data/Lessons/1/additionAssociative/
Audience: **Grade 2**, with prerequisites: Count and add at least three small collections, each up to 9 objects. Understand a total formed by adding two quantities and read '+' and '='. Distinguish rearranging groups from adding or removing objects; familiarity with commutative addition helps but is not required.
Methodologist source: [Methodologist Brief](./methodologist-brief.md) (Draft, not approved)
Target Skill: `associativeAddition.data.ts`, canonical and directly linked in Brief
Program dependence: None

## INSTRUCTIONAL CONCEPT

Let learners discover that the sum of three addends does not depend on which pair is combined first. Keep the addends and their roles intact, compare (2+3)+4 with 2+(3+4), and use the freedom of grouping to choose an efficient calculation. Unlike swapping addends, changing parentheses does not exchange operand order.

For any three whole-number addends a,b,c, (a+b)+c = a+(b+c). Concrete case (2+3)+4=5+4=9 vs 2+(3+4)=2+7=9. Different grouping, same three original sets: 2,3,4. Transfer (6+4)+3=10+3=13 vs 6+(4+3)=6+7=13. Parentheses indicate which addition is done first, not new objects. Preserve original left-to-right addend order for this teaching example. This property extends to more addends, but the lesson's scope is exactly three addends and totals ≤20.

The child learns by making a prediction, controlling the mathematical model and explaining the observed invariant. It is not a generic article followed by a quiz. All choices are instructional, not score-bearing.

## LEARNER JOURNEY

1. **Three Collections Make Nine:** Display 2,3,4 counters as three persistently labeled disjoint collections with unique IDs; allow learner to count all nine without grouping first.
2. **First Two Together:** Learner selects a bracket around first pair (2+3), sees a subtotal of five, then includes the third group of four to obtain nine; labels stay attached to original groups.
3. **Last Two Together:** On learner command, reset only subtotal emphasis and bracket 3+4, show seven, then combine with first group two for nine. Display both bracketings side by side _inside the Scene_.
4. **Group Six, Four and Three:** A transfer set 6,4,3 keeps thirteen unique counters; learner chooses (6+4)+3 or 6+(4+3) and inspects first subtotal ten vs seven. Both finish at thirteen.

## SECTION PLAN

### Section 1 — Three Collections Make Nine

- **Purpose/outcome:** Count three collections of 2,3,4 objects as a constant whole of nine.
- **Typed structure:** One ordered `LessonSection_Config` with text, scene, markdown resources in a single vertical column.
- **Learner-facing text resource (supported):** “Three separate groups have 2, 3 and 4 counters. How many counters in all?”
- **Interactive scene resource (supported type; new Scene proposed):** [Grouping Brackets Playground](./scenes/groupingBracketsPlayground.scene-spec.md), independently initialized placement 1. Display 2,3,4 counters as three persistently labeled disjoint collections with unique IDs; allow learner to count all nine without grouping first.
- **Learner-facing markdown resource (supported):** “Two, three and four make nine counters. We will keep those same nine while changing which pair is counted first.” Exact expression: **2 + 3 + 4 = 9**.
- **Learner action, observations and feedback:** Display 2,3,4 counters as three persistently labeled disjoint collections with unique IDs; allow learner to count all nine without grouping first. If an incorrect response is selected, explain: If learner says five, show they have only counted the first two groups; if seven, show that only the last two have been counted. Provide “Show how”, “Read the groups” and “Reset” whether or not the child submits a prediction.
- **Illustration/model direction:** Three labeled counter trays remain in a fixed spatial sequence while a large accessible bracket and subtotal ribbon move between the first and last adjacent pairs. Do not exchange tray order when changing parentheses. Preserve exact numerical objects/quantities and display an equivalent readable, navigable count ledger, not a decorative picture.
- **Transition/navigation:** Offer a question for the next Section only after the current relationship is visible, with non-scored optional replay.
- **Accessibility, locale and RTL:** Native touch, keyboard and screen-reader operations; exact group roles and equations read in correct math order across RTL; full real translations and reduced-motion equivalence, including offline use.
- **Proposed unlocked Note(s):** None in this Section.
- **Dependencies/status:** Scene is new and unimplemented. No API for Notes, scoring, question grading, Scene props or lesson assembly is invented.

### Section 2 — First Two Together

- **Purpose/outcome:** Calculate (2+3)+4=9 and 2+(3+4)=9 using the same nine counters, explaining intermediate five and seven.
- **Typed structure:** One ordered `LessonSection_Config` with text, scene, markdown resources in a single vertical column.
- **Learner-facing text resource (supported):** “What if we add the first two groups before the third?”
- **Interactive scene resource (supported type; new Scene proposed):** [Grouping Brackets Playground](./scenes/groupingBracketsPlayground.scene-spec.md), independently initialized placement 2. Learner selects a bracket around first pair (2+3), sees a subtotal of five, then includes the third group of four to obtain nine; labels stay attached to original groups.
- **Learner-facing markdown resource (supported):** “The first two groups make five. Then five plus four makes nine. Nothing was created or lost when we counted them as a subtotal.” Exact expression: **(2 + 3) + 4 = 5 + 4 = 9**.
- **Learner action, observations and feedback:** Learner selects a bracket around first pair (2+3), sees a subtotal of five, then includes the third group of four to obtain nine; labels stay attached to original groups. If an incorrect response is selected, explain: If a child reports five as final, point out the third group of four remains to be counted. Provide “Show how”, “Read the groups” and “Reset” whether or not the child submits a prediction.
- **Illustration/model direction:** Three labeled counter trays remain in a fixed spatial sequence while a large accessible bracket and subtotal ribbon move between the first and last adjacent pairs. Do not exchange tray order when changing parentheses. Preserve exact numerical objects/quantities and display an equivalent readable, navigable count ledger, not a decorative picture.
- **Transition/navigation:** Offer a question for the next Section only after the current relationship is visible, with non-scored optional replay.
- **Accessibility, locale and RTL:** Native touch, keyboard and screen-reader operations; exact group roles and equations read in correct math order across RTL; full real translations and reduced-motion equivalence, including offline use.
- **Proposed unlocked Note(s):** “With three addends, we can add the first two or last two first.” after the complete model and explanation have been shown (planned, not wired).
- **Dependencies/status:** Scene is new and unimplemented. No API for Notes, scoring, question grading, Scene props or lesson assembly is invented.

### Section 3 — Last Two Together

- **Purpose/outcome:** Distinguish **regrouping** without changing any addend from changing a value or swapping order.
- **Typed structure:** One ordered `LessonSection_Config` with text, scene, markdown resources in a single vertical column.
- **Learner-facing text resource (supported):** “Now add the last two groups first. Is the result still nine?”
- **Interactive scene resource (supported type; new Scene proposed):** [Grouping Brackets Playground](./scenes/groupingBracketsPlayground.scene-spec.md), independently initialized placement 3. On learner command, reset only subtotal emphasis and bracket 3+4, show seven, then combine with first group two for nine. Display both bracketings side by side _inside the Scene_.
- **Learner-facing markdown resource (supported):** “Three and four make seven, then two plus seven makes nine. The subtotal changed from five to seven; the final sum stayed nine.” Exact expression: **2 + (3 + 4) = 2 + 7 = 9**.
- **Learner action, observations and feedback:** On learner command, reset only subtotal emphasis and bracket 3+4, show seven, then combine with first group two for nine. Display both bracketings side by side _inside the Scene_. If an incorrect response is selected, explain: If the learner thinks seven is the new final answer, show that the initial two counters are still part of the whole. Provide “Show how”, “Read the groups” and “Reset” whether or not the child submits a prediction.
- **Illustration/model direction:** Three labeled counter trays remain in a fixed spatial sequence while a large accessible bracket and subtotal ribbon move between the first and last adjacent pairs. Do not exchange tray order when changing parentheses. Preserve exact numerical objects/quantities and display an equivalent readable, navigable count ledger, not a decorative picture.
- **Transition/navigation:** Offer a question for the next Section only after the current relationship is visible, with non-scored optional replay.
- **Accessibility, locale and RTL:** Native touch, keyboard and screen-reader operations; exact group roles and equations read in correct math order across RTL; full real translations and reduced-motion equivalence, including offline use.
- **Proposed unlocked Note(s):** “Only the grouping changes; every original addend and the final total stay the same.” after the complete model and explanation have been shown (planned, not wired).
- **Dependencies/status:** Scene is new and unimplemented. No API for Notes, scoring, question grading, Scene props or lesson assembly is invented.

### Section 4 — Group Six, Four and Three

- **Purpose/outcome:** Choose a convenient grouping for 6+4+3, making ten first and confirming that both legal groupings give thirteen.
- **Typed structure:** One ordered `LessonSection_Config` with text, scene, markdown resources in a single vertical column.
- **Learner-facing text resource (supported):** “For 6 + 4 + 3, which pair could make ten first?”
- **Interactive scene resource (supported type; new Scene proposed):** [Grouping Brackets Playground](./scenes/groupingBracketsPlayground.scene-spec.md), independently initialized placement 4. A transfer set 6,4,3 keeps thirteen unique counters; learner chooses (6+4)+3 or 6+(4+3) and inspects first subtotal ten vs seven. Both finish at thirteen.
- **Learner-facing markdown resource (supported):** “Six and four make a useful ten. Adding three makes thirteen. Or four and three make seven, then six plus seven makes thirteen. Grouping helps us choose a convenient calculation.” Exact expression: **(6 + 4) + 3 = 13; 6 + (4 + 3) = 13**.
- **Learner action, observations and feedback:** A transfer set 6,4,3 keeps thirteen unique counters; learner chooses (6+4)+3 or 6+(4+3) and inspects first subtotal ten vs seven. Both finish at thirteen. If an incorrect response is selected, explain: A learner who believes 6+(4+3)=16 receives a precise 4+3=7 and 6+7=13 recount; no group has changed in size. Provide “Show how”, “Read the groups” and “Reset” whether or not the child submits a prediction.
- **Illustration/model direction:** Three labeled counter trays remain in a fixed spatial sequence while a large accessible bracket and subtotal ribbon move between the first and last adjacent pairs. Do not exchange tray order when changing parentheses. Preserve exact numerical objects/quantities and display an equivalent readable, navigable count ledger, not a decorative picture.
- **Transition/navigation:** End with an optional self-explanation and reflection; do not claim mastery or a scored result.
- **Accessibility, locale and RTL:** Native touch, keyboard and screen-reader operations; exact group roles and equations read in correct math order across RTL; full real translations and reduced-motion equivalence, including offline use.
- **Proposed unlocked Note(s):** “With three addends, we can add the first two or last two first.” after the complete model and explanation have been shown (planned, not wired).
- **Dependencies/status:** Scene is new and unimplemented. No API for Notes, scoring, question grading, Scene props or lesson assembly is invented.

## CUSTOM SCENE SPECIFICATIONS

- [Grouping Brackets Playground](./scenes/groupingBracketsPlayground.scene-spec.md) — four self-contained prop-free Scene entries, one per Section; existing generic Scene resource permits future embedding, but this particular component does not yet exist.

## LESSON NOTES — UNLOCKED RECALL CUES (PLANNED)

1. “With three addends, we can add the first two or last two first.” — proposed after the first corresponding fully explained demonstration, not as proof of a correct guess.
2. “Only the grouping changes; every original addend and the final total stay the same.” — proposed after the first corresponding fully explained demonstration, not as proof of a correct guess.

Notes are _planned and not wired_. Do not invent existing Note IDs, unlock events, learner persistence, revision sheet or spaced scheduler; a Note reveal is not proof of mastery.

## PRACTICE, RETRIEVAL AND ASSESSMENT HANDOFF

The independent Section 4 example gives a new configuration and explanatory numerical feedback. Assessment Architect later decides validated scored Question types, Skill attribution, retry thresholds and evidence of mastery; the current Lesson Question adapter supports select-one but is **not** an implementation of these bespoke Scenes. No Quiz_Config or scored Question records are authored.

## GLOBAL ACCESSIBILITY AND LOCALIZATION

Every child-facing phrase, control, count, description, error and Note requires genuine translation to all supported locales; never silently fall back to English. All physical groups, exchanges, pairs and alternative representations must be operable through a fully equivalent ordered text/keyboard interface and screen-reader announcement, including semantic direction for RTL while retaining exact math operand identities. WCAG 2.2 AA, clear focus, child-sized controls, high contrast, 200% zoom, mobile/low-end devices and reduced motion apply equally. After the selected locale/content is downloaded, the entire model, arithmetic and feedback must work offline without video/audio/drag/network dependencies.

## PRODUCTION / PLATFORM DEPENDENCIES

Current generic LessonSection_Config renderer supports text, markdown and scene resources. Proposed: Grouping Brackets Playground, four separate prop-free placements with real locale context and own accessibility/unit tests, pending approval. Typed-only image/audio/video/code resources and YouTube are not needed. Notes/review/offline package systems are separate product dependencies, not claimed implemented. No runtime Lesson, Question, Quiz or scoring code built in this delivery.

## EDITORIAL SOURCES AND OPEN QUESTIONS

- [Methodologist Brief](./methodologist-brief.md), Draft, not yet approved.
- [Canonical Skill file](../../../../data/skills/arithmetic/addition/skills/associativeAddition.data.ts), directly copied from Mathematics.
- [Create Lesson Content workflow](../../../../../../studio/skills/lesson-workflow/create-lesson-content.skill.md).
- Explicitly separate associativity (parentheses) from previously taught addition commutativity (operand order); make-ten as an efficient example must support, not replace, the three-addend rule.
- Shared taxonomy overview is coordinator-owned and intentionally not regenerated by this agent.

## HANDOFF

Provisional Draft Content and Draft Scene spec for review. Editor approves Methodologist Brief first, then Content/Scene separately. Later Scene Designer, Coding Agent and Assessment Architect work only with separate authorization. No other Lesson edits or runtime changes.
