# Multiplication as Equal Groups and Repeated Addition — Content

Status: Draft
Target Lesson: learningApps/playground/Data/Lessons/1/multiplicationEqualGroups/ (Playground)
Audience: Children aged 6–8, grades 1–2, able to count small equal groups and add small sums; introductory multiplication, not times-table fluency
Approved Methodologist source: [Methodologist Brief](./methodologist-brief.md) — explicitly treated as approved for workflow testing by the editor, while original file status remains Draft
Learning outcomes: identify equal addends versus unequal addends; describe count of groups and size of each; convert 4 + 4 + 4 = 12 to 3 × 4 = 12 under a stated factor convention; read factors and product and relate each to the model
Target Skills: The two already approved Skill source files linked in the Methodologist Brief, with unchanged UUIDs and descriptions
Program dependence: None

## INSTRUCTIONAL CONCEPT

Children can count three _groups of four_ before they know the symbol ×. The group count and the number inside each group explain **4 + 4 + 4 = 12**. We then introduce multiplication **3 × 4 = 12** as a shorter way to name that repeated addition, with the convention **number of groups × items in each group** for this lesson. “Three plus four” is not the same operation. Both 3 and 4 are **factors** (the numbers multiplied); the result 12 is the **product**. The roles “groups” and “in each group” belong to the _model_ and may correspond differently in another convention; do not claim mathematical factor position universally fixes real-world meaning.

The decisive contrast is between **equal addends** (4 + 4 + 4) and **unequal addends** (4 + 3 + 4). The second cannot be read as repeated addition of one identical addend **without rearranging the quantities**. This is not a claim that its sum cannot be computed or that it cannot be modeled by some other mathematics. Use factors 1–5 and totals up to 25, with countable objects and no division, advanced properties, arrays-as-formal proof, negative numbers or timed recall drills.

## LEARNER JOURNEY

1. **Look and count:** Three equal groups of four objects. The learner counts the total and describes the two different roles of 3 and 4.
2. **See the shorter notation:** Watch the same model become 4 + 4 + 4 = 12, then 3 × 4 = 12. Read both factors and product with a concrete model.
3. **Find when it does not fit:** Inspect 4 + 3 + 4; compare sizes and explain why a repeated-equal-addend product cannot directly describe those three pictured groups.
4. **Build and explain independently:** Model 2 groups of 5, write/read 2 × 5 = 10 and check that 5 + 5 = 10. Retain countable support and corrective feedback.

Short text → manipulable model → explanatory feedback is the primary rhythm. No Program narrative, reward, required Quiz, mastery event or fictitious learning analytics.

## SECTION PLAN

### Section 1 — Count the Equal Groups

- Purpose / learning outcome: Distinguish number of groups from size of each group and identify an equal-group situation.
- Current implementation shape: LessonSection_Config; ordered general Section resources, not an independent Quiz.
- Ordered content blocks (single top-to-bottom column):
  1. **text — available:** “Here are three groups. Each group has four counters. How many counters are there altogether? Can you count them without losing your place?”
  2. **scene — supported block type, new Scene proposed:** [Equal Group Composer](./scenes/equalGroupComposer.scene-spec.md), observation entry: three separately labeled, visible countable groups of 4; optional stepwise count 4, 8, 12; learner highlights a group then the whole.
  3. **markdown — available:** “There are **3 groups**, with **4 in each group**. Count all the counters: **4 + 4 + 4 = 12**. The numbers four repeat because every group is the same size.”
- Core explanation and learner-facing text: Each group contains the same number, not “three counters” everywhere. The group count and group size answer different questions.
- Illustration / model / experiment: Three consistent containers of four objects (not three rows where one has a different size). Each group has an explicit ordinal label and count, with an equivalent text list.
- Learner action, observations and explanatory feedback: The child chooses “Count one group”, “Count all” or predicts 7 / 12 / 14. For 7: “Three plus four is seven, but that counts only the _labels_. We need all counters in each group.” For 14: “Four, eight, twelve—there are twelve counters.” For 12: “Yes. Four from each of three groups is twelve.”
- Navigation and transition: Keep the three groups unchanged when introducing symbols; the picture is the anchor.
- Accessibility, locale and RTL: All group membership/quantities have native text descriptions; controls keyboard/touch operable and non-color-dependent. Translate “in each” unambiguously, preserve numerical order under RTL.
- Proposed unlocked Note(s): Note 1 “Equal groups have the same number in each group” after the first full group comparison; planned, not wired.
- Implementation dependencies and review notes: Scene needs implementation; generic text, markdown and scene rendering exists.

### Section 2 — A Short Way to Say the Same Thing

- Purpose / learning outcome: Connect repeated addition of equal addends to a multiplication expression and identify factors and product.
- Current implementation shape: LessonSection_Config.
- Ordered content blocks:
  1. **markdown — available:** “We added **4 + 4 + 4** because we have three groups of four. A shorter way to name the same total is **3 × 4 = 12**. For this lesson, we read that as **3 groups of 4 make 12**.”
  2. **scene — generic resource support; new Scene proposed:** [Expression Reader](./scenes/expressionReader.scene-spec.md), guided mapping entry: highlight each group as one +4 term, then one group-count factor 3 and one group-size factor 4; read the product 12 without hiding the objects.
  3. **text — available:** “The two numbers we multiply are **factors**. The result is the **product**. In **3 × 4 = 12**, the factors are **3** and **4**; the product is **12**.”
- Core explanation and learner-facing text: Multiplication in this model counts equal groups. A factor's place is tied to the declared reading convention for this lesson; the product tells the total number of objects.
- Illustration / model / experiment: Three groups each containing four counters are kept adjacent to symbolic 4+4+4=12, then 3×4=12. An explicitly named text explanation identifies “3 — groups; 4 — in each group; 12 — altogether”.
- Learner action, observations and explanatory feedback: Tap/choose the part of the expression labeled “number of groups”, “number in each” or “total”. If the child says 12 is a factor, respond: “Twelve is the number we get altogether. It is the product.” If the child reads 3 × 4 as 3+4, contrast seven with the pictured twelve counters; do not insult the guess.
- Navigation and transition: Invite “Do all addition sentences describe equal groups?” before the next Section.
- Accessibility, locale and RTL: Full accessible mapping as text and controls, no pointer-only factor highlighting; preserve signed/operator reading order. Optional narration always paired with on-screen content.
- Proposed unlocked Note(s): Note 2 “Factors are multiplied. The product is the result” after the model and both notations are compared; planned, not wired.
- Implementation dependencies and review notes: Proposed Scene; avoid new Resource types for factor highlighting or invented Question grading.

### Section 3 — Do All Groups Match?

- Purpose / learning outcome: Recognize that the equal-addends representation requires **every** group to have the same size.
- Current implementation shape: LessonSection_Config.
- Ordered content blocks:
  1. **text — available:** “Compare **4 + 4 + 4** and **4 + 3 + 4**. Can each row be counted as three groups of the same size?”
  2. **scene — supported generic scene block, proposed:** [Equal Group Composer](./scenes/equalGroupComposer.scene-spec.md), compare entry: side-by-side **within the Scene only** clear group models of 4,4,4 and 4,3,4, with an inspect-each-group action and no changing addends behind the child's back.
  3. **markdown — available:** “In **4 + 4 + 4**, every group has four. In **4 + 3 + 4**, one group has three. We can still add those numbers to get 11, but that picture does **not** directly show three equal groups of four.”
- Core explanation and learner-facing text: One mismatch breaks the claim “the groups are all equal-sized”. This is a structural condition for the chosen repeated-addition model, not “some sums are forbidden”.
- Illustration / model / experiment: Independent group outlines and exact member counts, with one uneven group highlighted only after the child has a chance to inspect. A linked textual comparison lists 4,4,4 vs 4,3,4.
- Learner action, observations and explanatory feedback: Learner checks group 1, group 2 and group 3 in each model, then chooses “all the same size” or “not all the same size”. If they decide 4,3,4 is equal: “The middle group has three. The others have four. They do not all match.” If they claim 4,4,4 is unequal: “All three groups have four.” “Show every group” always available.
- Navigation and transition: Make the counterexample clear, then return to a new valid equal-group arrangement.
- Accessibility, locale and RTL: Explicit group-by-group accessible list and difference status; contrast cannot depend on color, visual arrangement, animation or a timer.
- Proposed unlocked Note(s): Note 3 “Repeated addition for equal groups repeats the same addend” after the contrast is explained; planned, not wired.
- Implementation dependencies and review notes: New model variant, no assessed Question or new Skill.

### Section 4 — Build, Read and Explain

- Purpose / learning outcome: Transfer to an unseen equal-group model and name the factors, product and repeated-addition expression with less guidance.
- Current implementation shape: LessonSection_Config.
- Ordered content blocks:
  1. **text — available:** “Build **two groups of five**. What addition sentence names all the counters? How would you say that using multiplication?”
  2. **scene — supported block, proposed:** [Expression Reader](./scenes/expressionReader.scene-spec.md), independent entry: two groups of five; child can inspect objects, choose **5 + 5 = 10** and **2 × 5 = 10** or request step-by-step help; highlight factors and product on demand.
  3. **markdown — available:** “Two groups of five contain **5 + 5 = 10** counters. Using our group-count-first convention, **2 × 5 = 10**. Here **2** and **5** are factors; **10** is the product. These are two ways to describe the same total.”
- Core explanation and learner-facing text: The relationship between concrete groups, repeated addition and multiplication is the enduring idea; focus is not recalling arbitrary multiplication tables.
- Illustration / model / experiment: Two groups each with five counters, and corresponding expressions. Optional second example with three groups of two: 2 + 2 + 2 = 6 and 3 × 2 = 6, if the learner requests another.
- Learner action, observations and explanatory feedback: Distinguish “2 + 5 = 7” from counting two groups of five: “That adds the group count and size, not five from each group.” Distinguish “5 + 5 = 10” from “5 + 5 + 5 = 15”: “There are two groups, not three.” For 2 × 5 = 10: “Two groups of five make ten.” Provide complete explanations even without selecting an answer.
- Navigation and transition: Ask “Which part says how many groups, and which part says how many are in each?” End with voluntary verbal, selected or typed explanation. No score.
- Accessibility, locale and RTL: Object group count available as text and arithmetic. All choices and explanations native accessible controls; no compulsory speech recognition, typing or dragging.
- Proposed unlocked Note(s): Revisit Notes 2–3; no new Note necessary.
- Implementation dependencies and review notes: Practice is formative, not a graded Quiz; any assessment handoff remains separate.

## CUSTOM SCENE SPECIFICATIONS

- [Equal Group Composer](./scenes/equalGroupComposer.scene-spec.md) — Sections 1 and 3; countable equal/unequal groups.
- [Expression Reader](./scenes/expressionReader.scene-spec.md) — Sections 2 and 4; connect groups to repeated addition, factors and product.

Both are Screenwriter-owned Draft specs for new prop-free Scene implementations, not existing widgets.

## LESSON NOTES — UNLOCKED RECALL CUES (PLANNED)

1. **“Equal groups have the same number in each group.”** Proposed after Section 1 reveals/compares all group counts.
2. **“Factors are multiplied. The product is the result.”** Proposed after Section 2 shows the corresponding model and expression.
3. **“Repeated addition for equal groups repeats the same addend.”** Proposed after Section 3 contrasts 4+4+4 and 4+3+4.

These Notes are future authoring intent, NOT implemented unlock events, persistence, a compiled revision sheet or spaced repetition. When later implemented, only a learner's unlocked cues belong in that learner's revision view. Revealing a Note is not Skill mastery.

## PRACTICE, RETRIEVAL AND ASSESSMENT HANDOFF

The child counts equal groups, compares notation, rejects an unequal-group model, and reconstructs a new multiplication sentence. The practice prompts and feedback are pedagogical examples, not ready-to-ship validated Question_Config instances. Assessment Architect independently decides Question types, correct/distractor validity, skill-specific evidence for **reading expressions** versus **repeated addition**, retries, scoring and mastery. A single correct 2×5 fact does not establish both atomic Skills. The current Lesson Question adapter supports only select-one-answer despite broader declared Question types; a later spaced review scheduler is not assumed.

## GLOBAL ACCESSIBILITY AND LOCALIZATION

All learner-facing English strings are translation source only; real localized equivalents are required across the supported language roster with no English fallback. Translators must preserve “groups of”, “in each”, “factor”, “product” and the specific **group-count × group-size** convention while allowing natural word order. Multiplication equations retain mathematical operand identities under RTL, not naive mirrored numerals. Every model must offer the ordered accessible group-count list and the corresponding symbolic sums; a child can complete each same reasoning action via native keyboard/touch/select controls, screen reader and reduced-motion view, without colors, dragging, narration or speech recognition. Keep numerals large, text short, responsive layout stable, no forced speed or repetitive clicks. All content, scene code, math feedback and localized resources must be available offline after download on weak devices; no external video/images are required.

## PRODUCTION / PLATFORM DEPENDENCIES

| Feature                                                             | Readiness / responsible role                                                                          |
| ------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------- |
| LessonSection_Config and ordered text, markdown and scene rendering | Available in inspected current code; Coding Agent composes after approval                             |
| Equal Group Composer and Expression Reader                          | Proposed custom Scenes; Scene Designer implements after separate spec approvals and with tests        |
| Scene placements with independent initial state/locales             | Integration check required by Coding Agent; no fictional public mode props                            |
| KnowledgeCheckpoint                                                 | Existing unscored widget via Scene wrapper, not needed here                                           |
| Quiz_Config and Questions                                           | Type contracts exist; Lesson adapter supports select-one; Assessment Architect owns graded assessment |
| Image, video, audio, code                                           | Typed but not generic-rendered; unused                                                                |
| YouTube                                                             | Type label only, not supported by Resource_Config; unused                                             |
| Notes, spaced review, full offline download                         | Planned capabilities, not invented as implemented                                                     |

## EDITORIAL SOURCES AND OPEN QUESTIONS

- [Methodologist Brief](./methodologist-brief.md), both target Skills and their precise semantics and proposed factor-order convention.
- [Generated Playground Skill taxonomy](../../../../docs/generated/skills/taxonomy.en.md), direct Code-derived references (the Brief links to actual files).
- [Create Lesson Content](../../../../../../studio/skills/lesson-workflow/create-lesson-content.skill.md).
- [Common Core Mathematics Standards](https://corestandards.org/mathematics-standards/) and [IES/WWC Elementary Mathematics Intervention](https://ies.ed.gov/ncee/wwc/PracticeGuide/26) are comparison references from the Brief, not a certification of grade alignment or effectiveness.
- **Editor:** approve the explicitly stated “number of groups × group size” reading convention and confirm that both existing Skills belong in one independent Lesson. This convention is one clear teaching choice, not a universal linguistic rule.
- **Status:** on-disk Brief still says Draft although editor authorized proceeding for testing. Synchronize through a separate Methodologist/editor action before publication, not a Screenwriter rewrite.
- **Technical:** approve isolated scene entrypoints and genuine locale/offline accessibility before implementation.

## HANDOFF

One Draft Lesson Content and two separately reviewable Draft Scene specifications. No code, Question data, new Skill, Program narrative or edits outside this Lesson. After editorial approval, hand bespoke Scene specs to Design Scene, runtime to Coding Agent, graded assessment to Assessment Architect.
