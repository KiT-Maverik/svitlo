# Finding an Unknown Dividend in Exact Division — Content

Status: Draft
Target Lesson: learningApps/playground/Data/Lessons/1/findingUnknownDividend/ (Playground)
Audience: Readiness-gated enrichment for children aged 6–8, grades 1–2, who already understand equal groups, exact division and matching multiplication; NOT required core instruction for all children of that age
Approved Methodologist source: [Methodologist Brief](./methodologist-brief.md) — treated as approved for this workflow test by explicit editor instruction despite the file still displaying Draft; preserve its prerequisite/readiness gate
Learning outcomes: identify the missing dividend; rebuild the total from divisor and quotient via equal groups and multiplication; explain □ ÷ 3 = 4 in a specific grouping model; substitute the total back into the original exact division
Target Skills: As selected and linked in the Methodologist Brief; no substitute Skill list or new UUIDs
Program dependence: None

## INSTRUCTIONAL CONCEPT

An exact division describes a _whole_, a _number of groups_ and _a quantity in each group_. In the initial model, “share equally among three groups” means the divisor 3 is the **group count** and quotient 4 is the **number in each group**. If the whole is hidden, rebuild it: three groups with four counters each contain 4 + 4 + 4 = 12 counters, or 3 × 4 = 12. Check the actual division: 12 ÷ 3 = 4.

Keep the inverse relation concrete before introducing names: dividend = divisor × quotient for exact division with nonzero divisor. This relation has another valid grouping interpretation: □ ÷ 3 = 4 can mean making groups _of three_, which gives four groups. Never claim the 3 always counts groups in all models; the verbal story selects that interpretation. The underlying arithmetic gives the same total.

Only nonnegative whole numbers, small factors (2–5), remainder-free examples and totals up to 20. No division by zero, long division, fractions, remainder cases or formal algebra transformations. This Lesson is not a substitute for prior understanding of division and multiplication. A readiness notice belongs to the Lesson metadata/entry experience; the Screenwriter cannot falsely certify that every 6–8-year-old is prepared.

## LEARNER JOURNEY

1. **Recall known division:** Twelve counters shared among three groups give four in each; the child can inspect the model and justify it.
2. **Hide the whole:** Keep three groups with four in each but hide the number naming the total. The child reconstructs the whole by counting groups, repeated addition or multiplication.
3. **Reverse and verify:** Put the candidate into □ ÷ 3 = 4 and check that sharing really gives four in each group. Contrast a wrong guess and a different grouping story.
4. **Transfer with less help:** Work from □ ÷ 4 = 3, reconstruct 12 using four groups of three and explain the original equality, not just a matching product.

Navigation, visual reveals and number choices are self-paced, unscored instruction, not a quiz or mastery claim.

## SECTION PLAN

### Section 1 — Three Equal Groups

- Purpose / learning outcome: Reconnect division to an already familiar exact equal-sharing model and verify prerequisite understanding.
- Current implementation shape: LessonSection_Config; ordered general-section resources, not a Quiz.
- Ordered content blocks (single vertical column):
  1. **text — available:** “Twelve counters are shared equally among three groups. How many will each group get?”
  2. **scene — available type/renderer, new implementation proposed:** [Equal Groups Builder](./scenes/equalGroupsBuilder.scene-spec.md), known-whole entry: start with 12 counters and three labeled group containers; show four counters per group, one counted at a time on demand.
  3. **markdown — available:** “We made 3 equal groups. Each group has 4. That means **12 ÷ 3 = 4**. Twelve is the whole; three is the number of groups; four is how many are in each group.”
- Core explanation and learner-facing text: Equal sharing gives the same number in every group, without leftovers. In this model each group must have four, and there must be exactly twelve across all groups.
- Illustration / model / experiment: Three separate containers each with four counters; totals and grouping labels remain visible and countable. An explicit accessible text list describes group 1: 4, group 2: 4, group 3: 4, total: 12.
- Learner action, observations and explanatory feedback: “Share the counters,” “Show one group,” “Count all,” and “Show explanation.” If learner interprets three as the count in each group, contrast the two possible readings and restate _this story_ (“among three groups”) rather than calling the mathematical operation itself wrong.
- Navigation and transition: Show the known relationship before hiding the whole next.
- Accessibility, locale and RTL: No drag required; keyboard buttons can construct and inspect the groups. Labels name each group independently of color and layout. Read mathematical operands in correct order under RTL.
- Proposed unlocked Note(s): No Note yet; check prerequisite understanding informally without a score.
- Implementation dependencies and review notes: New Scene needed; children missing this mental model should be directed to foundational teaching, not forced through an “advanced” Lesson with a token hint.

### Section 2 — What Was the Total?

- Purpose / learning outcome: Find the hidden dividend by restoring the total from known group count and group size.
- Current implementation shape: LessonSection_Config.
- Ordered content blocks:
  1. **text — available:** “Now the total is hidden. There are still 3 groups, with 4 counters in each. How many counters were there altogether?”
  2. **scene — renderer available, proposed new content:** [Equal Groups Builder](./scenes/equalGroupsBuilder.scene-spec.md), hidden-whole entry: three groups of four, optional count-one-at-a-time; reveal **4 + 4 + 4 = 12**, then **3 × 4 = 12**.
  3. **markdown — available:** “We counted four three times: **4 + 4 + 4 = 12**. Multiplication says the same thing: **3 × 4 = 12**. The missing total is 12.”
- Core explanation and learner-facing text: Multiplication reconstructs the missing whole: divisor × quotient = dividend for exact division. In this story, **3 groups × 4 per group** is the selected interpretation.
- Illustration / model / experiment: Each group remains countable and highlighted without increasing any group’s size. The total is hidden as a numeral at first, not hidden as objects. Repeated addition stacks the known equal quantities.
- Learner action, observations and explanatory feedback: Choices 7 / 12 / 14 or “Count with me.” For 7: “Three groups of four contain more than seven counters. Count 4 + 4 + 4.” For 14: “Four, eight, twelve: fourteen is two too many.” For 12: “Three equal groups of four make twelve.” Choosing “add 3 + 4 = 7” is addressed as counting only two _labels_, not every group’s members.
- Navigation and transition: Once the total is visible, ask how to check that the original division remains true.
- Accessibility, locale and RTL: Each group has a readable ordinal and quantity. Repeated addition available as localized verbal/text explanation. No sound-only counting or timing.
- Proposed unlocked Note(s): Note 1 “Missing whole = number of groups × each group’s size,” revealed after the 3 × 4 = 12 model is explained (planned, not wired).
- Implementation dependencies and review notes: Same proposed Scene family in an isolated entry state; no public mode prop is presumed.

### Section 3 — Put Twelve Back

- Purpose / learning outcome: Substitute the candidate in the original division and decide whether it satisfies the exact-division relationship.
- Current implementation shape: LessonSection_Config.
- Ordered content blocks:
  1. **markdown — available:** “Our original equality was **□ ÷ 3 = 4**. We think the box is 12. Let’s put 12 in the box and check.”
  2. **scene — supported block type, proposed Scene:** [Division Equality Checker](./scenes/divisionEqualityChecker.scene-spec.md), guided substitution entry; show 12 ÷ 3 = 4 as a countable three-groups-of-four verification, with a wrong candidate contrast.
  3. **text — available:** “**12 ÷ 3 = 4**, so twelve fits the missing place. If we tried another number, it would not share into three groups of four without something changing.”
- Core explanation and learner-facing text: We do not check only the product 3 × 4 = 12. We test the **original division statement** by substituting twelve into □ ÷ 3 = 4.
- Illustration / model / experiment: A complete equality, an explicit replaced box, a clearly named three-group sharing model, and a comparison of actual group sizes to the claimed four.
- Learner action, observations and explanatory feedback: Offer candidate 9 / 12 / 15. 9 ÷ 3 = 3, not 4; 12 ÷ 3 = 4; 15 ÷ 3 = 5, not 4. Provide exactly these meanings, without score or false “close enough” feedback.
- Navigation and transition: After checking, compare the alternative story “groups of three” without changing arithmetic: 12 objects grouped in threes form four groups; both readings are exact and should be verbally distinguished.
- Accessibility, locale and RTL: The actual candidate and full substituted equality must be read in the correct mathematical order with a navigable group list. No visual-only equality judgment.
- Proposed unlocked Note(s): Note 2 “Check a missing dividend in the original division,” revealed after a full substitution has been explained (planned, not wired).
- Implementation dependencies and review notes: New proposed checker Scene, not Quiz_Config or an Assessment Architect-owned Question.

### Section 4 — Find a New Whole

- Purpose / learning outcome: Transfer to a fresh exact division with reduced scaffolding.
- Current implementation shape: LessonSection_Config.
- Ordered content blocks:
  1. **text — available:** “**□ ÷ 4 = 3.** Imagine sharing equally among 4 groups. Each group gets 3. What was the whole?”
  2. **scene — supported block, proposed new content:** [Division Equality Checker](./scenes/divisionEqualityChecker.scene-spec.md), independent entry: initially show the equality alone; on request display four groups of three; allow a candidate and show its substituted original division.
  3. **markdown — available:** “Four groups of three make **3 + 3 + 3 + 3 = 12**, or **4 × 3 = 12**. Check **12 ÷ 4 = 3**. The missing dividend is 12.”
- Core explanation and learner-facing text: The unknown is the **whole**, not the divisor (four) or quotient (three). Multiplication is a way to find it; exact division verifies it.
- Illustration / model / experiment: Four labeled groups of three; a countable and text-readable total. A wrong “4 + 3 = 7” choice can be inspected against the four equal groups to expose the missing two groups.
- Learner action, observations and explanatory feedback: Candidate choices 8 / 12 / 16 or “Show groups.” 8 ÷ 4 = 2 (not 3), 12 ÷ 4 = 3, 16 ÷ 4 = 4 (not 3). The child may inspect the model and reveal the explanation without submitting a choice. Invite “What did the box stand for?” in speech, written/selected text, or independent thought.
- Navigation and transition: Conclude with a recall prompt rather than a grade or fictitious mastery check.
- Accessibility, locale and RTL: Text explanation and group counts match the visual; all controls operable via keyboard/touch and assistive technologies, with localized labels. Reduced motion shows equivalent end states.
- Proposed unlocked Note(s): Revisit Notes 1 and 2; no additional Note required.
- Implementation dependencies and review notes: Formative example only. Any scored assessment, attribution or readiness diagnostic belongs to Assessment Architect.

## CUSTOM SCENE SPECIFICATIONS

- [Equal Groups Builder](./scenes/equalGroupsBuilder.scene-spec.md) — Sections 1–2, countable equal-sharing and reconstructing a hidden whole.
- [Division Equality Checker](./scenes/divisionEqualityChecker.scene-spec.md) — Sections 3–4, substitution and comparison to the original exact division.

Each is a separate Draft specification for a **proposed** prop-free Scene, not already implemented.

## LESSON NOTES — UNLOCKED RECALL CUES (PLANNED)

1. **“Missing whole = number of groups × size of each group.”** Trigger: the child encounters and can inspect the full 3 × 4 = 12 explanation in Section 2.
2. **“Check the whole in the original division.”** Trigger: the original 12 ÷ 3 = 4 substitution is presented and explained in Section 3.

Both are editorially proposed, not wired. Actual Notes IDs, per-learner unlock state, local persistence, offline revision sheets and spaced retrieval remain separate engineering work. An unlocked Note does not demonstrate mastery.

## PRACTICE, RETRIEVAL AND ASSESSMENT HANDOFF

The scenes invite prediction, concrete counting, repeated addition, inverse multiplication and verification in the original equality. The optional independent □ ÷ 4 = 3 example is a _formative teaching prompt_, not a validated scored Question. Assessment Architect decides whether and how to assess the target Skill, its prerequisites, the effects of hints, permissible problem variants, scoring and any readiness check; current Playground Lesson adapter supports select-one-answer only despite broader QuestionType contracts. A program may revisit inverse operations later; there is no implied spaced scheduler or guaranteed grade-level suitability.

## GLOBAL ACCESSIBILITY AND LOCALIZATION

Source teaching copy is English, requiring genuine localization to every supported language before release—including “dividend”, “divisor”, “quotient”, “total”, “groups”, “each” and exact vs remainder-free division. Do not silently fall back to English. Read all numbers, operators and group roles precisely in LTR and RTL; geometric arrangement may adapt but mathematical operand identity must not be mirrored away. Every group is equivalently represented in an ordered textual model and usable without vision, color, sound, dragging, speech recognition or timed controls. Short texts, large focusable choices, captioned optional audio, reduced-motion equivalence and mobile/low-resource access preserve all mathematical reasoning. Once the selected package/locales are downloaded, all model logic, feedback and resources must work offline without remote calculation; real PWA/download implementation is a separate gate.

## PRODUCTION / PLATFORM DEPENDENCIES

| Feature                                                              | Readiness and owner                                                                                              |
| -------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------- |
| LessonSection_Config with ordered text, markdown and scene resources | Verified in contract and current generic renderer; Coding Agent wires reviewed resources                         |
| Equal Groups Builder; Division Equality Checker                      | **Proposed** interactive Scenes; Scene Designer builds from separately approved specs and tests                  |
| Distinct prop-free Scene placements, locale context, persistence     | Integration review by Coding Agent; do not invent mode props or existing state APIs                              |
| Quiz_Config and additional Question kinds                            | Contracts exist, current Lesson widget adapter supports select-one-answer; Assessment Architect owns scored work |
| Image, video, audio and code generic blocks                          | Typed-only in current generic renderer; not needed here                                                          |
| YouTube                                                              | Label only, no supported Resource_Config; not used                                                               |
| Notes, spaced repetition, complete offline delivery                  | Product intentions, not claimed implemented; engineering dependency                                              |

## EDITORIAL SOURCES AND OPEN QUESTIONS

- [Methodologist Brief](./methodologist-brief.md), including the age/readiness gate and small exact-division boundaries.
- [Generated Playground Skill taxonomy](../../../../docs/generated/skills/taxonomy.en.md), a read-only Code view of the approved Skill semantics.
- [Create Lesson Content](../../../../../../studio/skills/lesson-workflow/create-lesson-content.skill.md), authoring workflow and Scene handoff.
- [Common Core Math Standards](https://corestandards.org/mathematics-standards/) Grade 3 multiplication/division as comparative context, **not** certification of grade 1–2 curriculum alignment; [IES/WWC Elementary Mathematics Intervention](https://ies.ed.gov/ncee/wwc/PracticeGuide/26) as already listed by Methodologist.
- **Editor choice preserved:** Must remain optional enrichment for children with demonstrated prerequisites or be deferred to older learners; treating the Brief as approved for _this test_ does not make advanced division universally age-appropriate. Approve the audience gate before publication.
- Current Methodologist Brief still says Draft on disk despite conversational authorization for this experiment. Do not alter the Methodologist-owned file in this Screenwriter stage.
- Editorial review of exact language, two interpretations of division and small-factors scope; technical review of isolation, accessibility and offline readiness.

## HANDOFF

Draft Content plus two separate Draft Scene specifications, only in the existing findingUnknownDividend directory. They await editorial review; subsequent Scene Design, assessment design and coding are NOT authorized by this output. Do not modify the Brief, taxonomy, other Lessons or runtime code.
