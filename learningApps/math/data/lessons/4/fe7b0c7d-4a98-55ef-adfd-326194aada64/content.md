# Subtraction Across Ten and with Place-Value Columns — Content

Status: Draft
Target Lesson: learningApps/playground/Data/Lessons/1/subtractionAcrossTenAndColumns/ (Playground)
Audience: Children aged 6–8, grades 1–2, ready to interpret tens and ones, subtract within ten and read two-digit numbers. Column notation is a later step here, not presumed prior knowledge.
Approved Methodologist source: [Methodologist Brief](./methodologist-brief.md) — editor authorized treating the existing Briefs as approved for workflow testing despite the source file still saying Draft; resolve that metadata separately before publication.
Learning outcomes: explain 13 − 7 by exchange or decomposition; explain why 32 − 17 requires exchanging a ten for ten ones in the standard column procedure; represent 32 both as 3 tens + 2 ones and as 2 tens + 12 ones; subtract corresponding place values, preserve quantity and check by inverse addition.
Target Skills: Exactly the two canonical Skills linked by filename in the Methodologist Brief: crossing ten and column subtraction. No copied competing Skill definitions or new Skill IDs.
Program dependence: None

## INSTRUCTIONAL CONCEPT

**Exchange changes a number's representation, not its value.** A bundle of ten can become ten loose ones. The number 13, represented as 1 ten and 3 ones, can also be represented as 13 ones. Neither representation adds or loses anything. This permits 13 − 7 even though three loose ones alone are fewer than seven. It also explains the written column operation for 32 − 17: from 3 tens and 2 ones, exchange one ten to obtain 2 tens and 12 ones, then take away 1 ten and 7 ones, leaving 1 ten and 5 ones, or 15.

Children experience a physical/countable exchange, predict its consequences, perform subtraction, and only then see marks in columns. An alternate subtraction strategy (13 − 3 − 4 = 6) shows that “crossing ten” need not mean one compulsory written algorithm. The lesson teaches a conserved quantity rather than a phrase like “borrow one” that might imply gaining or taking an extra number.

**Boundaries:** Whole-number two-digit arithmetic with nonnegative results, at most one exchange from tens to ones per example, no decimals, negative differences, repeated borrowing across many positions, or long multicolumn algorithms. The column stage is offered when the child understands the concrete exchange. A learner who cannot explain why 1 ten = 10 ones should revisit the model before proceeding; no artificial grade-level proficiency is inferred.

## LEARNER JOURNEY

1. **Hold the amount still:** See 13 as one group of ten plus three individual counters, and exchange the ten for ten individual counters. The before-and-after total is 13.
2. **Take away seven:** Starting from thirteen, use exchange, or remove three to reach ten and four more to reach six. Explain why both methods remove seven.
3. **Put the exchange into columns:** Start 32 − 17 with tens and ones aligned. Notice only two individual ones are present and seven ones must be subtracted. Exchange one ten and update both tens/ones counts.
4. **Finish and check:** Subtract 12 − 7 ones and 2 − 1 tens, read the result 15, then check **15 + 17 = 32**. Explain why incorrectly keeping three tens after the exchange would violate the original quantity.

There is no required scored Quiz, invented mastery event, mascot or Program narrative. Short instructions, learner-controlled reveals, meaningful actions and precise explanatory feedback carry the experience.

## SECTION PLAN

### Section 1 — Open a Ten, Keep the Same Number

- Purpose / learning outcome: Understand that one ten is exchangeable for ten ones without changing the total.
- Current implementation shape: LessonSection_Config, with an ordered, nonempty, single-column array of resources.
- Ordered content blocks:
  1. **text — available in renderer:** “Look at thirteen: one bundle of ten and three single ones. If we open the bundle, how many counters will we have altogether?”
  2. **scene — Resource block supported, new Scene proposed:** [Ten Exchange Lab](./scenes/tenExchangeLab.scene-spec.md), exchange-only placement with a stable total 13, visible bundle and singles, learner-controlled “Exchange one ten” and “Undo exchange.”
  3. **markdown — available in renderer:** “Before, **1 ten + 3 ones = 13**. After, **0 tens + 13 ones = 13**. We have the same thirteen counters. We only changed how they were grouped.”
- Core explanation and learner-facing text: One ten and ten ones are different representations of the same quantity; “opening” a ten does not create ten additional objects.
- Illustration / model / experiment: A labeled bundle with precisely ten identifiable positions and three separate ones. During exchange the ten bundle ceases to exist **as a bundle** and those very same ten become loose ones; the total remains thirteen.
- Learner action, observations and explanatory feedback: Predict whether the total changes; select “Exchange,” inspect the equivalent textual counts, “Count every counter,” and “Undo.” If the learner says 23: “We did not add another ten. The original ten became ten ones. There are still thirteen.”
- Navigation and transition: Keep a visual/textual comparison of both representations and ask “Would loose ones help us take away seven?”
- Accessibility, locale and RTL requirements: Structured text says “before: one ten, three ones, total thirteen; after: zero tens, thirteen ones, total thirteen.” Keyboard and touch controls, high-contrast outlines plus names, reduced-motion immediate state; no visual-only conservation insight or drag requirement. Number and place-value reading order must remain meaningful in RTL.
- Proposed unlocked Note(s): Note 1 “One ten = ten ones,” after the exchange and its unchanged total have been explained (planned, not wired).
- Implementation dependencies and review notes: New Scene required; text, markdown and generic scene rendering are verified capabilities.

### Section 2 — Thirteen Minus Seven

- Purpose / learning outcome: Subtract across a ten by exchange or by partitioning the seven being removed.
- Current implementation shape: LessonSection_Config.
- Ordered content blocks:
  1. **text — available:** “We have **13** and need to take away **7**. There are only three loose ones. What can we do?”
  2. **scene — generic Scene rendering available; new interactive component proposed:** [Ten Exchange Lab](./scenes/tenExchangeLab.scene-spec.md), subtract placement. The child chooses “Open the ten and take away seven” or “Get to ten first,” and may inspect both.
  3. **markdown — available:** “One way: open the bundle so you have thirteen ones, then remove seven: **13 − 7 = 6**. Another way: take away three to reach ten, then four more: **13 − 3 − 4 = 6**. Three and four together are seven, so both methods take away the same number.”
- Core explanation and learner-facing text: Exchange is useful when the ones visible at first are fewer than the ones to subtract. Decomposing seven into three and four offers an equivalent route, not a different answer.
- Illustration / model / experiment: The same fixed thirteen counters are shown throughout. On the exchange route, thirteen loose ones minus seven leaves six; on the “reach ten” route, thirteen minus three leaves ten, and ten minus four leaves six. At every state, counters removed + counters remaining = thirteen.
- Learner action, observations and explanatory feedback: Each subtraction is explicitly learner-paced; “Count remaining” says six in either route. If a learner stops at ten after removing three, explain “We removed three, but we needed to remove seven. Four more must go.” If a learner thinks opening the ten creates more counters, compare the original and current total.
- Navigation and transition: End with a side-by-side mathematical conclusion **inside the Scene**: both routes leave six. Invite “What should we do when there are not enough loose ones?” before written columns.
- Accessibility, locale and RTL requirements: Both routes have distinct ordered numerical logs, with subtraction operators in correct order and complete textual counters. Equivalent nonvisual execution, no dragging, timer or compulsory narration; reduced motion presents the same intermediate states immediately.
- Proposed unlocked Note(s): Note 2 “Exchange changes the form, not the amount,” after comparing the two methods and the unchanged starting thirteen (planned, not wired).
- Implementation dependencies and review notes: This is a formative teaching Scene, not a scored question. A child may inspect either route without being forced to perform both.

### Section 3 — Why the Ones Column Needs an Exchange

- Purpose / learning outcome: Link the concrete ten/ones exchange to two-digit place-value columns, preserving both digits’ correct meaning.
- Current implementation shape: LessonSection_Config.
- Ordered content blocks:
  1. **markdown — available:** “Try **32 − 17**. Thirty-two is **3 tens and 2 ones**. Seventeen is **1 ten and 7 ones**. The ones column asks us to take seven ones from two ones. We cannot do that with the loose ones as they are. Can we exchange one ten?”
  2. **scene — supported block type; proposed new Scene:** [Place-Value Column Board](./scenes/placeValueColumnBoard.scene-spec.md), guided exchange placement with labeled “Tens” and “Ones” columns, 32 modeled as 3 ten-bundles and 2 singles, and 17 as a subtracting reference (1 ten, 7 ones), not mistakenly added objects. Exchange one of 32’s tens to display **2 tens and 12 ones**.
  3. **text — available:** “We did **not** turn 32 into 42. We changed **3 tens and 2 ones** into **2 tens and 12 ones**. Both are worth thirty-two.”
- Core explanation and learner-facing text: Place-value marks represent tens/ones, not two independent digits. A digit’s place determines its value. The exchange decreases the tens count by one and increases the ones count by ten.
- Illustration / model / experiment: A two-column place-value board and a linked bundle/counter view. The written 3 tens / 2 ones is updated to 2 tens / 12 ones. Show equivalent arithmetic: 30 + 2 = 20 + 12 = 32.
- Learner action, observations and explanatory feedback: Predict the new tens/ones counts; exchange; inspect each column. If child proposes **3 tens and 12 ones**, show **30 + 12 = 42**, not 32: “We forgot to use up one ten when making ten new ones.” If child subtracts 7−2, say “We must take the ones of seventeen away from the ones of thirty-two. Exchange before subtracting.”
- Navigation and transition: Do not move to subtracting both columns until the learner has access to the conserved 32 explanation; then offer the full worked subtraction in the same board.
- Accessibility, locale and RTL requirements: Place-value labels are semantic, not left/right instructions; accessible grid text names the minuend and subtrahend (“thirty-two: three tens, two ones; seventeen: one ten, seven ones”). Math columns and operator order are not naively mirrored in RTL.
- Proposed unlocked Note(s): Note 3 “Exchanging one ten adds ten ones and removes one ten,” after conservation is shown (planned, not wired).
- Implementation dependencies and review notes: Scene is proposed. The Coding Agent must ensure visually stacked column marks are faithfully described in linear screen-reader text.

### Section 4 — Subtract and Check

- Purpose / learning outcome: Perform a single-exchange two-digit written subtraction correctly and verify by inverse addition.
- Current implementation shape: LessonSection_Config; the formative Scene is not a Quiz_Config.
- Ordered content blocks:
  1. **text — available:** “We have **2 tens and 12 ones** for thirty-two. Now take away **1 ten and 7 ones**. What is left? Check with addition.”
  2. **scene — existing Scene resource support, new content proposed:** [Place-Value Column Board](./scenes/placeValueColumnBoard.scene-spec.md), completion placement. Start from 32 − 17 without the answer; guide exchange on demand, subtract **12 − 7 = 5 ones**, then **2 − 1 = 1 ten**, showing **15**. Offer check **15 + 17 = 32**.
  3. **markdown — available:** “After exchanging, **32 = 2 tens + 12 ones**. Take away seven ones: **12 − 7 = 5**. Take away one ten: **2 − 1 = 1 ten**. The difference is **1 ten + 5 ones = 15**. Check: **15 + 17 = 32**. The sum takes us back to the starting number.”
- Core explanation and learner-facing text: Column alignment prevents subtracting unlike place values; each exchange must alter both adjacent place counts. Subtraction 32−17=15 is correct because reversing with addition restores 32.
- Illustration / model / experiment: A stepwise, labeled tens-and-ones board and countable representation. A visible check places fifteen and seventeen back together to give thirty-two, or provides a numerically equivalent textual check if rebuilding objects would overcomplicate.
- Learner action, observations and explanatory feedback: Predict ones result then tens result; hints allow checking individual columns. If learner subtracts **7−2 = 5** without exchanging, explain why it is not the approved computation: the minuend has two ones and the subtrahend seven; correct exchange gives twelve ones. If learner keeps three tens after exchanging, explicitly show wrong **3 tens + 12 ones = 42**. If learner finds 15, explain “Five ones and one ten make fifteen; fifteen plus seventeen is thirty-two.” Correct and incorrect paths remain redoable and non-scored.
- Navigation and transition: Final voluntary prompt “What changed when you exchanged one ten? What stayed the same?” Let the child answer by selection, typing or speech to an adult; speech recognition not assumed. No grade gate.
- Accessibility, locale and RTL requirements: Each phase announces tens and ones in words and numerals with explicit operand identity. Clear keyboard/touch stepping, readable focus, large type and equivalent nonvisual calculations; no answer visible only through animation or color.
- Proposed unlocked Note(s): Note 4 “Line up ones with ones and tens with tens,” after the checked column example is explained (planned, not wired).
- Implementation dependencies and review notes: Formative subtraction feedback is illustrative teaching, not a validated scored Question; a later Assessment Architect determines any assessment.

## CUSTOM SCENE SPECIFICATIONS

- [Ten Exchange Lab](./scenes/tenExchangeLab.scene-spec.md) — new prop-free Scene for Sections 1–2, exchange and two crossing-ten subtraction routes.
- [Place-Value Column Board](./scenes/placeValueColumnBoard.scene-spec.md) — new prop-free Scene for Sections 3–4, conservation-aware written subtraction and inverse-addition check.

Both are separate **Draft** Scene specifications awaiting editor approval and Design Scene implementation. Generic Scene block rendering already exists in Playground; the specific components do not.

## LESSON NOTES — UNLOCKED RECALL CUES (PLANNED)

1. **“One ten = ten ones.”** Proposed unlock after the Section 1 exchange equivalence has been presented.
2. **“Exchange changes the form, not the amount.”** Proposed unlock after Section 2 demonstrates conservation and both ways to get six.
3. **“One ten exchanged → one fewer ten, ten more ones.”** Proposed unlock after Section 3 correctly transforms 3 tens + 2 ones into 2 tens + 12 ones.
4. **“Ones with ones; tens with tens.”** Proposed unlock after Section 4 presents the full 32−17=15 and inverse addition check.

Notes are editorially **planned and not wired**. No available Note type, unlock API, learner-specific persistence, revision-sheet renderer or spaced repetition scheduling is assumed. If later implemented, an individual learner’s revision view contains only genuinely unlocked cues in this order. Revealing any Note is not mastery evidence.

## PRACTICE, RETRIEVAL AND ASSESSMENT HANDOFF

- Section 1: concept demonstration and explanation of conserved quantity; optional before/after prediction.
- Section 2: two valid 13−7 routes, with learner-controlled intermediate reveals and respectful error repair.
- Section 3: deliberate misconception contrast (3 tens + 12 ones falsely increases 32), linking the model to column notation.
- Section 4: reduced support for 32−17 and explicit verification 15+17=32; optional transfer **41 − 16 = 25**, since 4 tens + 1 one becomes 3 tens + 11 ones, remove 1 ten + 6 ones, leaving 2 tens + 5 ones. Any new scored task requires independent assessment review.
- **Assessment Architect** determines valid Question instances, Skill attribution (crossing-ten vs column method), distractors, scores, thresholds, retries and mastery evidence. No Quiz_Config or Question bank is authored here. Current Playground Lesson widget adapter supports select-one-answer only despite broader declared Question kinds.
- Future spaced review of exchanging ten should be separately implemented; the script does not claim a live scheduler.

## GLOBAL ACCESSIBILITY AND LOCALIZATION

All English teaching copy is **editorial source** for genuine translation into every supported language. Translate “ten”, “ones”, “exchange”, “take away”, “difference”, “minuend” and “subtrahend” with understandable child-facing alternatives, retaining exact mathematical meaning; never silently fall back to English. Mathematical tens/ones columns must remain semantically labeled in LTR and RTL rather than mechanically mirrored; visually spatial claims have accessible ordered text equivalents. Every exchanged bundle, removal, column update and check is accessible as a structured text/state ledger and operable through keyboard, touch and assistive controls, without drag-only manipulation, color coding, audio-only instructions or timed responses. Reduced motion preserves each before/after representation; zoom and mobile layouts retain legible columns and explicit place-value labels. All calculations and feedback must be locally available when the selected language/content/scene is downloaded. Lightweight HTML/SVG suffices; WebGL, streaming video and remote answer checking are unnecessary. An inaccessible “lite” version that silently removes the exchange is not acceptable.

## PRODUCTION / PLATFORM DEPENDENCIES

| Feature                                                        | Readiness / owner                                                                                                  |
| -------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------ |
| LessonSection_Config and ordered text, markdown, scene blocks  | Verified in current contract/generic renderer; Coding Agent assembles approved content                             |
| Ten Exchange Lab and Place-Value Column Board                  | **Proposed custom Scenes**, not implemented; Scene Designer builds each after independent approval, with own tests |
| Independent initial state per Section and locale wiring        | Coding Agent verifies prop-free Scene entries and full localization; no invented mode prop                         |
| KnowledgeCheckpoint                                            | Existing unscored UI Kit widget through Scene wrapper; not required here                                           |
| Quiz_Config / Question data                                    | Type contracts exist; adapter presently supports select-one; Assessment Architect owns assessment                  |
| Image/audio/video/code                                         | Typed-only in generic renderer; not required                                                                       |
| YouTube                                                        | Resource label only, not in current Resource_Config; not used                                                      |
| Planned Notes, spaced review, offline content package download | No implemented API claimed; requires separate engineering review                                                   |

## EDITORIAL SOURCES AND OPEN QUESTIONS

- [Methodologist Brief](./methodologist-brief.md), both canonical Skills, exchange conservation model, scope and prerequisite gate.
- [Generated Playground taxonomy](../../../../docs/generated/skills/taxonomy.en.md), English Code-derived Skill descriptions; actual source links are in the Brief.
- [Create Lesson Content workflow](../../../../../../studio/skills/lesson-workflow/create-lesson-content.skill.md), Section/Resource/Scene authoring and review gates.
- [Common Core Mathematics Standards](https://corestandards.org/mathematics-standards/) and [IES/WWC Elementary Mathematics Intervention](https://ies.ed.gov/ncee/wwc/PracticeGuide/26): comparison references identified by the Brief, not a certification of this lesson’s curriculum placement.
- **Editor:** Confirm the two-Skill combined scope is suitable for the specific 6–8-year-old audience, or divide it later through a separate Methodologist decision. Column method must not be forced on children lacking secure tens/ones understanding.
- **Editor:** Review the two-digit single-exchange limit as a Lesson-depth choice, not a reduction of age-neutral Skill definitions.
- **Metadata:** Original Methodologist Brief still reads Draft despite explicit approval for this test; resolve separately before publication without changing it in the Screenwriter stage.
- **Engineering:** Approve prop-free scene placement, mathematically accurate column presentation, localized screen-reader structure and offline equivalence before coding.

## HANDOFF

One Draft four-Section Lesson Content and two Draft Scene specifications, scoped only to this existing Lesson. Editor must approve the Content and each Scene spec separately. Design Scene implements approved scenes, Coding Agent wires typed/localized resources, Assessment Architect separately validates any scored evidence. Do not modify Briefs, Skills, other Lessons, shared runtime, Question banks or the PR base branch.
