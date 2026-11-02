# Finding an Unknown Factor — Content

Status: Draft — provisional Screenwriter draft pending Methodologist Brief approval
Target Lesson: learningApps/playground/Data/Lessons/1/unknownFactor/
Audience: Optional enrichment for children aged 6–8 who already know equal groups, multiplication and exact division
Methodologist source: [Methodologist Brief](./methodologist-brief.md) (Draft; not approved)
Learning outcomes: find a missing factor from exact product and known nonzero factor; interpret either factor role in a given model; verify in original multiplication; transfer.
Target Skills: Exact unknownFactor.data.ts directly linked in Methodologist Brief.
Program dependence: None

## INSTRUCTIONAL CONCEPT

We know the **whole product** and one **factor** but not the other. If three equal groups make twelve, every group must have four: **12 ÷ 3 = 4**. The original statement is **3 × □ = 12**; inserting four and calculating **3 × 4 = 12** verifies the candidate. If a box comes _first_, in **□ × 4 = 12**, the example convention instead asks “how many groups of four?” The missing three has a distinct modeled role. Division discovers the answer; multiplication checks it.

This is a readiness-dependent enrichment lesson, not introductory multiplication for everyone. Only exact, small, nonzero-known-factor cases; no zero-factor ambiguity, mixed-ability prerequisite skipping, fractions, long division or rote timed table practice.

## LEARNER JOURNEY

1. Review three equal groups of four making twelve.
2. Hide the group size; reveal four items in each group from twelve shared in three groups.
3. Move the box to the group-count factor and use twelve items in sets of four; verify each original multiplication.
4. Transfer to 4 × □ = 20 with optional equal-group model, then check 4 × 5 = 20.

## SECTION PLAN

### Section 1 — Three Groups, Twelve Altogether

- Purpose / outcome: Revisit the exact group product before hiding a factor.
- Shape: LessonSection_Config with one top-to-bottom Resource list.
- Ordered blocks:
  1. **text — available:** “These three groups contain four counters each. How many are there altogether?”
  2. **scene — generic resource exists, proposed new content:** [Missing Factor Groups](./scenes/missingFactorGroups.scene-spec.md), complete-model entry showing 3 groups × 4 = 12, with exact labeled group counts and optional counting.
  3. **markdown — available:** “**3 groups of 4 make 12**. In our example we write **3 × 4 = 12**. Three and four are factors; twelve is the product.”
- Core explanation and action: Child inspects each of the three groups and totals; if 3+4=7 is offered, feedback “That adds two labels, not all the counters across three groups.”
- Navigation: Hide the group-size number, leaving the product and group count known.
- Accessibility: Ordered group list, named factors/product, RTL expression with semantic grouping convention, native controls.
- Planned Note: None; this is prerequisite recall, not a new outcome.
- Dependencies: Scene proposed, generic renderer available.

### Section 2 — How Many in Each Group?

- Purpose: Reconstruct unknown group-size factor.
- Shape: LessonSection_Config.
- Ordered blocks:
  1. **text — available:** “**3 × □ = 12.** We know there are three equal groups and twelve counters in all. How many are in **each** group?”
  2. **scene — proposed:** [Missing Factor Groups](./scenes/missingFactorGroups.scene-spec.md), group-size entry; three equal group containers, twelve counters distributed equally by user-controlled “Share all” or individual steps; reveal 4 in each.
  3. **markdown — available:** “If twelve are shared equally among three groups, there are **12 ÷ 3 = 4** in each. The missing factor is **4**.”
- Core explanation: Division works here because the model has equal groups with a nonzero group count and an exact division.
- Action and feedback: Prediction 3/4/5 optional. For 3, “Three groups of three make nine, not twelve.” For 5, “Three groups of five make fifteen.” For 4, “Three groups of four make twelve.”
- Navigation: Compare with a box that counts groups rather than group size.
- Accessibility: Text “group 1 four; group 2 four; group 3 four; total twelve”; keyboard/touch “Distribute / Count / Explain.”
- Planned Note: “Unknown factor = product ÷ known nonzero factor,” after exact group evidence (planned, not wired).
- Dependencies: Prop-free entry with separate state, no scored quiz.

### Section 3 — What If the Box Is First?

- Purpose: Interpret the missing first factor and check the result in original expression.
- Shape: LessonSection_Config.
- Ordered blocks:
  1. **markdown — available:** “Now the equation is **□ × 4 = 12**. We know each group contains four. How many groups must there be?”
  2. **scene — proposed:** [Missing Factor Groups](./scenes/missingFactorGroups.scene-spec.md), group-count entry, learner assembles groups of four until twelve counters have been used: three groups.
  3. **text — available:** “**12 ÷ 4 = 3** groups. Replace the box: **3 × 4 = 12**. Both sides show twelve.”
- Core explanation: The unknown factor's numerical result depends on the known factor and product, but the **model role** of a particular position follows the explicitly chosen group-count-first convention.
- Feedback: A claim □=4 becomes 4×4=16 rather than twelve. Avoid misleading “four and three switched” depiction without a stated reinterpretation.
- Navigation: Invite an independent multiplication case with a new total.
- Accessibility: Operand roles and full substituted result in text, not color-only group highlights; RTL-safe.
- Planned Note: “Check the factor by multiplying in the original equality,” after verified substitution.
- Dependencies: Scene-based formative choice only.

### Section 4 — Find the Missing Group Size Yourself

- Purpose: Transfer to 4 × □ = 20 with less scaffolding.
- Shape: LessonSection_Config.
- Ordered blocks:
  1. **text — available:** “**4 × □ = 20.** Four equal groups make twenty counters. How many must be in each group?”
  2. **scene — proposed:** [Missing Factor Groups](./scenes/missingFactorGroups.scene-spec.md), transfer entry with candidate 4/5/6, optional twenty counters, divide 20÷4 then substitute in 4×□=20.
  3. **markdown — available:** “**20 ÷ 4 = 5**, and **4 × 5 = 20**. The box is **5**. The product is unchanged.”
- Feedback: 4 gives 4×4=16, 6 gives 4×6=24, 5 gives 20. Child may reveal model or full explanation without choosing. Optional reflection “Which operation found it? Which checked it?” via selected/typed/oral response.
- Navigation: End with no Quiz or success score.
- Accessibility: Countable and nonvisual group model, all choices native accessible controls, full RTL math and offline math.
- Notes: Recall two prior concise Notes.
- Dependencies: Separate Scene entry; no Assessment Architect work implied.

## CUSTOM SCENE SPECIFICATIONS

- [Missing Factor Groups](./scenes/missingFactorGroups.scene-spec.md) — independently initialized complete, group-size, group-count and transfer experiences.

## LESSON NOTES — UNLOCKED RECALL CUES (PLANNED)

1. “Missing factor = product ÷ known nonzero factor.” After equal sharing and 12÷3=4 are explained.
2. “Check the missing factor in the original multiplication.” After 3×4=12 is substituted and confirmed.

No Note data type, unlock event, persistence, personalized revision sheet or automatic spaced scheduling is implemented by this plan. A Note is not a validated mastery result.

## PRACTICE, RETRIEVAL AND ASSESSMENT HANDOFF

Children inspect equal-group evidence, choose missing factors and learn from explicit multiplied totals. This is formative, not a scored Question/Quiz. The Assessment Architect must validate prerequisites and scored examples separately; a correct 3×4 does not independently demonstrate the general Skill. Runtime's select-one Quiz adapter is separate from bespoke Scenes; no scoring/threshold policy authored.

## GLOBAL ACCESSIBILITY AND LOCALIZATION

Authentic translations for all prompts, buttons, numerical role descriptions, feedback, accessible names and Notes into every supported locale; no English fallback. Meaningful RTL factor/operand direction and group-count × size convention; ordered equivalent nonvisual group lists plus keyboard/touch/switch actions. Visible focus, 200% zoom, mobile, reduced-motion states, no drag or voice-recognition requirement and local deterministic offline operation after complete download. Keep the full pedagogical model on weak devices.

## PRODUCTION / PLATFORM DEPENDENCIES

Available: typed LessonSection_Config and general text/markdown/scene renderer. Proposed: Missing Factor Groups, four state-isolated prop-free Scene entries, verified locale wiring and own tests. Media code/image/audio/video generic types are not supported in current generic renderer; YouTube has no config. Notes/review scheduling and package download are product dependencies, not claimed done. No graded Question created.

## EDITORIAL SOURCES AND OPEN QUESTIONS

- [Methodologist Brief](./methodologist-brief.md) (Draft, not approved).
- [Generated Skill taxonomy](../../../../docs/generated/skills/taxonomy.en.md).
- [Create Lesson Content](../../../../../../studio/skills/lesson-workflow/create-lesson-content.skill.md).
- Editor must confirm readiness gate, small exact-division factors and explicitly stated model interpretation before implementation; no grade-level mandate claimed.

## HANDOFF

Provisional Draft Screenwriter Content plus separate Draft Scene spec, awaiting Methodologist approval and then independent Content/Scene review. Coding Agent, Scene Designer and Assessment Architect work only on separate authorization.
