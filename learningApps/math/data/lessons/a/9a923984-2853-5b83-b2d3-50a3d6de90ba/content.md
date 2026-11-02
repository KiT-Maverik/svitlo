# Finding and Continuing Number Patterns — Content

Status: Draft
Target Lesson: learningApps/playground/Data/Lessons/1/numberPatterns/ (Playground)
Audience: Children aged 6–8, grades 1–2; mixed numeracy, reading and language fluency; keyboard and nonvisual participation required
Approved Methodologist source: [Methodologist Brief](./methodologist-brief.md) — explicitly treated as editor-approved for this workflow test in the conversation; its existing status field still says Draft and requires separate editorial synchronization
Learning outcomes: recognize a consistent additive increase/decrease; test every adjacent gap; extend the verified rule; recognize unequal changes without claiming that a finite list has one mathematically unique explanation
Target Skills: The two canonical Skills linked in the Methodologist Brief (no competing copied IDs or definitions)
Program dependence: None

## INSTRUCTIONAL CONCEPT

A number row can change by the same amount at every step. The child needs to SEE the changes, REPRODUCE them and CHECK all the gaps before continuing, rather than remembering a familiar counting chant. This Lesson uses concrete number-line hops, a learner-controlled step builder and an inspector for testing a rule. Every prediction receives an explanation, not a score.

Use whole numbers 0–30, mainly positive short rows. Increasing changes of 1–4 and decreasing changes of 1–3 fit the intended audience. When a row is continued, say explicitly that it is continued UNDER THE PROPOSED CONSTANT-STEP RULE: finite examples cannot determine a unique future by logic alone.

The first two Sections build the mental model; the third exposes a plausible wrong rule; the fourth transfers the checking habit to unseen numbers. Content must teach with manipulable models, not a wall of Markdown followed by an automatic quiz.

## LEARNER JOURNEY

1. Notice and predict: 4, 7, 10, 13, …; make equal jumps visible.
2. Explore: change the jump, advance one term, observe rising or falling numbers.
3. Test: check every gap before trusting the statement “add three each time.”
4. Transfer: inspect 7, 10, 13, 16, … independently and explain the next term.

Pace is learner-controlled; hints and retries carry no penalty. No Program mascots, missions, or reward mechanics.

## SECTION PLAN

### Section 1 — What Comes Next?

- Purpose / learning outcome: Notice a repeated numerical change and make a prediction.
- Current implementation shape: LessonSection_Config; Section blocks in one vertical column.
- Ordered content blocks:
  1. **text — available.** Child-facing text: “Look at the numbers: 4, 7, 10, 13, … . What might come next? How do you know?” Optional audio reading must have identical on-screen text.
  2. **scene — existing type and renderer, proposed new content.** [Step Explorer](./scenes/stepExplorer.scene-spec.md), prediction phase: four terms, an unknown fifth term, user-controlled reveal of three +3 hops, then 13 + 3 = 16. Guessing is optional.
  3. **markdown — available.** After reveal: “The jump from 4 to 7 is 3. From 7 to 10 is 3. From 10 to 13 is 3, too. If we keep that jump, 13 + 3 makes 16.”
- Core explanation and learner-facing text: The STEP is the change from one number to the next. Here each step adds three.
- Illustration / model / experiment: A number line with numerically proportional jumps and an ordered text list of the pairs and differences; optional three-counter additions as an equal representation.
- Learner action, observations and explanatory feedback: A learner may select 12, 15, 16 or 17. For 16: “Yes. You added 3 again.” For 15: “That adds 2 to 13, but each earlier jump added 3.” For 17: “That adds 4, not 3.” For 12: “That goes down; the earlier steps went up by 3.” All paths allow a reveal and retry without penalty.
- Navigation and transition: Let the learner reveal each gap before optionally moving on; no hard success gate.
- Accessibility, locale and RTL: Every mathematical hop has a textual equivalent and meaningful number order; visual arrows must not be mechanically mirrored in RTL. Touch, keyboard and screen-reader alternatives work without dragging or audio.
- Proposed unlocked Note(s): After the equal gaps are shown, Note 1 “A step is the change to the next number” (planned, not wired).
- Implementation dependencies and review notes: The new Scene must be built; the text/Markdown renderers already exist.

### Section 2 — Keep the Jump the Same

- Purpose / learning outcome: Change and apply a constant step, including a decreasing sequence.
- Current implementation shape: LessonSection_Config.
- Ordered content blocks:
  1. **markdown — available.** “Try a bigger jump. Starting at 2, adding 4 each time gives 2, 6, 10, 14. Starting at 12 and taking away 2 each time gives 12, 10, 8, 6. A pattern does not have to go up.”
  2. **scene — supported resource, proposed new content.** [Step Explorer](./scenes/stepExplorer.scene-spec.md), exploration phase: choose increase or decrease, choose an allowed step, advance or undo a hop, show exact changes. The increasing starting preset is 2, +4; decreasing preset is 12, −2.
  3. **text — available.** Reflective prompt: “What stayed the same: the numbers, or the size of the jump?” Explanation: “The numbers changed. The size of each jump stayed the same.”
- Core explanation and learner-facing text: Add the fixed step to the previous TERM, not the term itself. Subtracting the same amount each time also makes a regular pattern.
- Illustration / model / experiment: The learner controls steps and sees consistent jump lengths. Decreasing terms always remain nonnegative.
- Learner action, observations and explanatory feedback: The child selects step +4, advances through 2, 6, 10, 14, then switches to preset 12, 10, 8, 6. Label every pair “four more” or “two fewer”. If the next hop would leave 0–30, explain the number-line limit instead of silently wrapping.
- Navigation and transition: Invite the learner to name a step before examining somebody else's proposed rule.
- Accessibility, locale and RTL: Fully operable numbered controls, text log of all hops, equivalent immediate states when reduced motion is enabled.
- Proposed unlocked Note(s): After increasing and decreasing examples, Note 2 “The same step can add or take away” (planned, not wired).
- Implementation dependencies and review notes: Reuse of Scene design in different sections requires independent prop-free instances; scene registration and state isolation are Coding Agent concerns.

### Section 3 — Check EVERY Jump

- Purpose / learning outcome: Test the proposed step against all adjacent pairs, including a misleading first gap.
- Current implementation shape: LessonSection_Config.
- Ordered content blocks:
  1. **text — available.** “Someone says the numbers 2, 5, 9 add 3 every time. Is that true? Let's check both jumps.”
  2. **scene — supported resource, proposed new content.** [Rule Inspector](./scenes/ruleInspector.scene-spec.md), guided mode: inspect 2→5 (+3) and 5→9 (+4), then decide whether +3 fits ALL the observed jumps. Compare with 3, 6, 9, 12 (+3 throughout) and 3, 6, 10, 15 (+3, +4, +5).
  3. **markdown — available.** “The first jump added 3. The next jump added 4. So ‘add 3 every time’ does not fit this whole row. Check all the gaps, not only the first one.”
- Core explanation and learner-facing text: A proposed constant step fits the shown row only if each adjacent pair changes by that same amount. This does NOT mean a row with uneven changes can have no pattern of any kind.
- Illustration / model / experiment: One pair at a time receives a numeric difference and “matches/does not match” message. Compare a valid rule with a counterexample.
- Learner action, observations and explanatory feedback: “Fits every jump” vs “Doesn't fit every jump” are unscored formative choices. For an erroneous “Fits” answer: “Look at 5 to 9: it adds 4, not 3.” For the valid +3 row: “Every gap adds 3, so that rule fits all the numbers shown.”
- Navigation and transition: After seeing a non-example, move to a fresh row without first revealing its answer.
- Accessibility, locale and RTL: Explicit pair/difference list with accessible checked statuses; never rely on red/green alone, visual direction, timed taps or reading proficiency.
- Proposed unlocked Note(s): After the counterexample is explained, Note 3 “Check every jump before trusting a rule” (planned, not wired).
- Implementation dependencies and review notes: New custom Scene; no scored Question_Config, Quiz_Config or mastery inference.

### Section 4 — Your Turn to Explain

- Purpose / learning outcome: Transfer to an unfamiliar row and articulate the reason rather than guess.
- Current implementation shape: LessonSection_Config; no mandatory Quiz section.
- Ordered content blocks:
  1. **markdown — available.** “Try a new row: 7, 10, 13, 16, … . What changes each time? If the same rule continues, what number comes next? Explain why.” Optional hint: “Look at every neighboring pair.”
  2. **scene — supported resource, proposed new content.** [Rule Inspector](./scenes/ruleInspector.scene-spec.md), independent mode: inspect each gap, select next term 18, 19 or 20, review feedback and explanation, reset if desired.
  3. **markdown — available.** After the independent attempt: “7 to 10 adds 3; 10 to 13 adds 3; 13 to 16 adds 3. So keeping that same step gives 19 next. We checked the whole row.”
- Core explanation and learner-facing text: The current row supports a constant +3 step; continuation is conditional on retaining it.
- Illustration / model / experiment: Scaffolding is reduced but all differences and accessible models remain available on request. Optional descending transfer 9, 7, 5, 3 uses −2.
- Learner action, observations and explanatory feedback: 19 → “16 + 3 is 19, like the earlier jumps.” 18 → “That jumps 2, not 3.” 20 → “That jumps 4, not 3.” A child can choose a verbal, selected or typed reasoning route; speech recognition is not assumed. “Show explanation” is available without answering.
- Navigation and transition: Short reflection “How would you tell someone else to check a rule?” Then end, without a fabricated score.
- Accessibility, locale and RTL: Explanation may be selected, read, said aloud to an adult or typed voluntarily; no mandatory speech or motor-sensitive drag. Same values and responses in nonvisual and reduced-motion modes.
- Proposed unlocked Note(s): No new Note. Revisit Notes 1 and 3 as prompts for recall (planned, not wired).
- Implementation dependencies and review notes: The mathematical choices are instructional illustrations for a Scene, not validated assessment questions.

## CUSTOM SCENE SPECIFICATIONS

- [Step Explorer](./scenes/stepExplorer.scene-spec.md) — proposed new prop-free, localized, learner-controlled Scene for Sections 1–2.
- [Rule Inspector](./scenes/ruleInspector.scene-spec.md) — proposed new prop-free, localized, rule-testing Scene for Sections 3–4.

Both Scenes need separate editorial approval and implementation via Design Scene. Generic scene block rendering already exists; these Scene components do not.

## LESSON NOTES — UNLOCKED RECALL CUES (PLANNED)

- **Note 1:** “A step is the change to the next number.” Proposed unlock after Section 1 reveals and explains the three equal +3 jumps.
- **Note 2:** “The same step can add or take away.” Proposed unlock after the increasing AND decreasing example is understood in Section 2.
- **Note 3:** “Check every jump before trusting a rule.” Proposed unlock after Section 3's mismatching second gap is explained.

**Status: planned; not wired.** No Note entity, unlock API/event, persistent state, local revision-sheet generator or spaced-review scheduler is claimed implemented. Future review material would include only a learner's actually unlocked cues, not the whole Lesson. A revealed Note does not prove mastery.

## PRACTICE, RETRIEVAL AND ASSESSMENT HANDOFF

- Sections 1–2: supported prediction, worked example, manipulation and self-explanation.
- Section 3: deliberate contrast of an equal-step pattern and an uneven-step counterexample; check all gaps before judging.
- Section 4: independent transfer with optional hints and immediate explanatory feedback.
- Assessment Architect, not Screenwriter, decides any later validated Quiz questions, Skill-specific evidence, scoring, pass criteria, retries and misconception analytics. Current question adapter accepts select-one-answer; other Question types may be typed but are not thereby integrated.
- Future spaced retrieval is a product dependency, not an implemented feature; revisit new rows in a later Lesson or review flow only when separately specified.

## GLOBAL ACCESSIBILITY AND LOCALIZATION

All learner-facing source text here is English for subsequent genuine translations into **every supported locale**; no silent English fallback, language omission or placeholder copies. Translate prompts, controls, explanations, aria labels and Notes; keep short directions and numeric meanings stable. LTR/RTL need semantic rather than mechanical mirroring: increasing and decreasing number-line directions must be explicit. All jumps have linear text/table equivalents, screen-reader descriptions, keyboard controls, clear focus and child-sized targets. No drag-only, color-only, audio-only or motion-only information. Reduced motion produces the identical mathematical states instantly. Once downloaded, all instructional text, Scenes, feedback and selected-language resources must run fully offline; lightweight HTML/SVG suffices for weak devices. Video, audio, image, code and YouTube resources are **not required**. The generic renderer currently handles text, markdown and scene only; audio/image/video/code are typed-only there, and YouTube is not in Resource_Config.

## PRODUCTION / PLATFORM DEPENDENCIES

| Feature                                                             | Readiness                                   | Owner / required action                                                            |
| ------------------------------------------------------------------- | ------------------------------------------- | ---------------------------------------------------------------------------------- |
| LessonSection_Config, ordered single-column text/markdown resources | Available in current contract/renderer      | Coding Agent assembles reviewed localized content                                  |
| scene Resource block and React rendering                            | Available integration mechanism             | Coding Agent verifies registration and locale handling                             |
| Step Explorer and Rule Inspector                                    | Proposed new components                     | Scene Designer implements separate approved Scene specs with tests                 |
| Independent section-specific instances / starting modes             | Requires integration review                 | Coding Agent chooses prop-free entries and isolated state; no invented React props |
| KnowledgeCheckpoint                                                 | Existing unscored widget via Scene wrapper  | Not necessary for this Lesson; do not infer assessment from checking               |
| Graded Quiz/Question, assessment attribution                        | Contract-only/partially integrated          | Assessment Architect specifies independently, if approved                          |
| Notes, persisted unlocks, spaced review, full offline download flow | Planned / not wired                         | Separate later implementation; do not fabricate APIs                               |
| Image/audio/video/code blocks                                       | Typed-only in the generic Section renderer  | Not needed                                                                         |
| youtube                                                             | Label-only, not a supported Resource_Config | Not used                                                                           |

The Methodologist Brief still carries status Draft on disk. The editor's explicit authorization to **treat all existing Briefs as approved for this test** permits the Screenwriter's work now; do not rewrite that Methodologist-owned file here. Resolve metadata before publication.

## EDITORIAL SOURCES AND OPEN QUESTIONS

- [Methodologist Brief](./methodologist-brief.md): binding audience, two Skill links, learning goals, examples, scope, and errors to address.
- [Generated English taxonomy](../../../../docs/generated/skills/taxonomy.en.md): canonical skill descriptions drawn from existing Playground TypeScript entities.
- [Create Lesson Content](../../../../../../studio/skills/lesson-workflow/create-lesson-content.skill.md): workflow and typed editorial structure.
- [Common Core Mathematics Standards](https://corestandards.org/mathematics-standards/) and [IES/WWC Organizing Instruction and Study](https://ies.ed.gov/ncee/wwc/PracticeGuide/1): sources already referenced in the Methodologist Brief; no claim of curriculum certification.
- Editorial review: confirm pairing of the two approved Skills in one Lesson; review clarity of the English prompts, age range and Scene scope.
- Engineering review: confirm prop-free Scene entries with independent initial states and fully localized offline resources; no invented mode prop.
- Publication blocker: harmonize verbal Methodologist approval with its still-Draft file metadata through a separately authorized editorial update.

## HANDOFF

One Screenwriter-owned Draft content.md and two separate Draft Scene specifications, linked below this Lesson's existing folder. Stop after these editorial artifacts. Next independent approvals: editor reviews Content and each Scene spec; Scene Designer implements approved Scenes with tests; Coding Agent assembles runtime; Assessment Architect owns any scored evidence. Do not modify other Lessons, Skill taxonomy, Methodologist Brief, application code or PR base branch.
