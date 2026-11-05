# Equal Group Counter — Scene Specification

Status: Draft
Owner: Educational Screenwriter
Parent Lesson / Section: [Finding a Total with Equal Groups Content](../content.md), Sections 1–4
Methodologist objectives: Identify whether groups are equal in size and state group count and group size separately. Find a total by counting G groups of S objects, explaining G × S = total under the declared groups-first convention. Explain why an unequal arrangement cannot directly use one count × one common group size without regrouping. Vary group count while holding group size fixed, and vice versa, and predict how the total changes. [Methodologist Brief](../methodologist-brief.md) (Draft, not approved).

## LEARNER PURPOSE AND CONCEPT

Use the two independently varying quantities—number of equal groups and objects per group—to determine and justify a product. This focuses the equal-groups structural relationship rather than repeating the existing lesson's focus on translating equal additions into multiplication notation. The Scene is an explorable mathematical **representation**, not a fixed animation or a scored response picker. Every change in a count is visible and explained numerically.

## ACCURATE CONTENT AND MODEL LIMITATIONS

For G equally sized groups each with S objects, the total is G × S. Examples: 3 groups of 4 = 12; 4 groups of 3 = 12; 2 groups of 5 = 10. An unequal picture with group sizes [4,3,4] has total 11 but cannot accurately be described as three groups of four. Group roles are chosen by the narrated model, not fixed globally by the position of factors. All instructional totals ≤25. Adding G+S instead of G×S (3+4=7 instead of twelve); confusing number of groups with counters in each; counting only one group; interpreting [4,3,4] as [4,4,4] without changing the model. Keep nonnegative whole numbers and no division, formal arrays or times-table speed drills. All proposed examples remain within declared small whole-number boundaries. Correct total is the sum of all displayed group counts; for the equal-group example all group sizes equal S and total = G×S. Switching example resets dependent state. Never label unequal [4,3,4] as three equal groups of four.

## EXPERIENCE BEATS AND LEARNER ACTIONS

1. **Section 1 / Three Groups of Four:** Display three clearly labeled trays of four; the learner inspects each tray and requests a count of all twelve. Prompt: “Here are 3 groups. Each has 4 counters. What is the total?” Mathematical explanation: “Three groups of four make twelve counters. In this model, 3 × 4 = 12.” **Feedback:** If the learner answers 7, explain that 3 + 4 adds the two labels, not the counters in every group. If 12, show the complete 4 + 4 + 4 count. Recheck and full reveal stay available.

2. **Section 2 / Change One Thing:** Let the learner vary group count from 2 to 4 at fixed size 4; show totals 8,12,16, preserving countable counters. Prompt: “Keep 4 in each group. What if we have 2 groups instead of 3? Now try 4 groups.” Mathematical explanation: “When group size stays four, changing the number of groups changes the total: two groups make eight, three make twelve and four make sixteen.” **Feedback:** A prediction of 14 for four groups is met with four counts of four: 4, 8, 12, 16. Distinguish increasing group count from increasing group size. Recheck and full reveal stay available.

3. **Section 3 / Do They All Match?:** Inspect three trays [4,3,4], compare group counts with the genuine [4,4,4] arrangement, and reveal totals 11 versus 12. Prompt: “Look at groups with 4, 3 and 4 counters. Is this three equal groups of four?” Mathematical explanation: “The middle group has three. The groups are not all the same size. Their total is eleven, but the statement 3 × 4 = 12 does not describe this picture.” **Feedback:** An incorrect 'equal' response gets the precise difference in the middle tray; do not claim eleven cannot be modeled mathematically. Recheck and full reveal stay available.

4. **Section 4 / Build Your Own Total:** Learner sets G=2 and S=5, builds two trays or uses text controls, predicts 10, and may change to 3 groups of 5 to observe 15. Prompt: “Make 2 equal groups of 5. How many counters will you need?” Mathematical explanation: “Two groups of five make ten: 2 × 5 = 10. Three groups of five make fifteen.” **Feedback:** Choosing seven receives 'Two plus five is seven, but each of the two groups contains five.' Full worked model available without a guess. Recheck and full reveal stay available.

## INTERACTIVE OBJECTS, STATES AND RULES

- Objects: labeled countable counters, row/group containers, original data model, numerical role labels, ordered text ledger, prediction and reveal buttons, explanation panel, independently scoped Reset/Undo.
- Four **independent prop-free Scene placements**, one per Section. “Placement” is editorial; no new React mode prop or Resource field is authorized.
- **State:** Current group count G=2…4, size S=3…5, ordered count array, inspected groups, prediction and reveal flags; unequal contrast [4,3,4] is a separately labeled fixed example.
- **Invariant:** Correct total is the sum of all displayed group counts; for the equal-group example all group sizes equal S and total = G×S. Switching example resets dependent state. Never label unequal [4,3,4] as three equal groups of four.
- All choices are **formative**, not persistent scores, Skill mastery or Question objects. Switching placements restores that placement's exact initial quantities; a child can show all reasoning without guessing.

## VISUAL / AUDIO / MEDIA DIRECTION

Simple lightweight HTML/SVG counters and grid/containers, stable number labels, countable groups and subtle user-paced highlights. Avoid decorative animations, cramped tiny digits or external media. In reduced-motion mode present identical state transitions instantly. A low-spec/offline version must preserve interaction and explanation, not become a static answer.

## LOCALIZATION, DIRECTION AND ACCESSIBILITY

Translate all prompts, feedback, row/group/total roles, controls, aria labels, Note cues and summaries genuinely into every supported locale with **no English fallback**. Preserve precise mathematical orientation and group/row meanings under RTL; never rely on the visual left side for a role. Provide a **fully operable ordered nonvisual state list**, with announced new counts after each step, native keyboard/touch/switch controls, focus, 200% zoom, adequate targets and no drag/sound/vision/timer requirement. Entire deterministic calculation, accessible model and selected-language messages must run offline after full download.

## ACCEPTANCE SCENARIOS

1. **Three Groups of Four:** Display three clearly labeled trays of four; the learner inspects each tray and requests a count of all twelve. Check: Three groups of four make twelve counters. In this model, 3 × 4 = 12.
2. **Change One Thing:** Let the learner vary group count from 2 to 4 at fixed size 4; show totals 8,12,16, preserving countable counters. Check: When group size stays four, changing the number of groups changes the total: two groups make eight, three make twelve and four make sixteen.
3. **Do They All Match?:** Inspect three trays [4,3,4], compare group counts with the genuine [4,4,4] arrangement, and reveal totals 11 versus 12. Check: The middle group has three. The groups are not all the same size. Their total is eleven, but the statement 3 × 4 = 12 does not describe this picture.
4. **Build Your Own Total:** Learner sets G=2 and S=5, builds two trays or uses text controls, predicts 10, and may change to 3 groups of 5 to observe 15. Check: Two groups of five make ten: 2 × 5 = 10. Three groups of five make fifteen.
5. Wrong/partial prediction gets the exact explanatory comparison, not a score, and allows retry or full reveal.
6. Each Section starts independently; Reset never leaks an earlier Section's state.
7. Keyboard, screen reader, semantic RTL, reduced motion, zoom/mobile and downloaded offline produce the **same numeric quantities and conclusions**.

## IMPLEMENTATION DEPENDENCIES AND OPEN QUESTIONS

Generic Lesson Scene Resource/rendering exists, but **Equal Group Counter is proposed, not implemented**. Requires editor approval of the new Brief, then separate Content/Scene review, Design Scene implementation and own tests. Coding Agent validates prop-free entries and locale/offline integration. Assessment Architect alone may approve scored questions. Editorial scope question: This overlaps the preexisting multiplicationEqualGroups Lesson only in prerequisite context; that Lesson targets expression reading and repeated addition. Editor should confirm a separate equalGroups-focused manipulable Lesson is useful rather than merge its materials.
