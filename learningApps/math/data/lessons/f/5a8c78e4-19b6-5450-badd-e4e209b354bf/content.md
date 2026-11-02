# Which One Is Third? Position Depends on the Start — Content

Status: **Provisional Draft — pending Methodologist approval**
Target Lesson: learningApps/playground/Data/Lessons/1/ordinalPositionWithDirection/
Audience: Primary Grade 1
Methodologist source: [Draft Methodologist Brief](./methodologist-brief.md) (not approved)
Target Skills: As directly linked in the Draft Brief, unchanged canonical Skill objects
Program dependence: None
Runtime status: Not implemented

## INSTRUCTIONAL CONCEPT

Recognize the ordinal position of an object in an explicitly directed sequence; distinguish its rank from the number of objects and show that changing origin or order changes rank but not total. The learner can predict, operate the mathematical representation, see an actual explanation and transfer the idea to a changed setting. The experience is not a lecture followed by a token quiz.

**Core mathematical truth and boundaries:** For A,B,C,D,E,F counted from A, C is third; counted from F, C is fourth. The total remains six in both cases. Swapping Star and Rain in Sun,Moon,Star,Cloud,Rain makes Star fifth while total stays five. Ordinal position is relative to an order and its starting direction. Grade 1: five or six identifiable items and explicit START marker; no number-line lengths, sorting magnitude, ordinal spelling drills, speed tests or grades.

## LEARNER JOURNEY

1. Encounter a small concrete instance with Start Marker Line. The child changes the model rather than passively watches; mistakes receive named evidence.
2. Compare the first model with a deliberately contrasting condition. Ask what stayed the same and what changed.
3. Brief unscored retrieval with a worked counterexample: Can C be third and fourth without moving the bags?
4. Independently try Line-Up Swap, changing the item identities, configuration or currency amounts so the child must apply the general principle.
5. State a reason, or reveal and revisit the full model without score, timer, Program narrative or persistence.

## SECTION PLAN

### Section 1 — Start Marker Line

- **Purpose:** Establish and test the model in a controlled contrast.
- **Current Section shape:** General LessonSection_Config with a single ordered vertical nonempty Resource array, not Quiz_Config.
- **Ordered blocks:** (1) text (renderable): “Which bag is third from START at A?” (2) scene (generic type renderable; this bespoke component proposed): [Start Marker Line](./scenes/startMarkerLine.scene-spec.md) (3) markdown (renderable): “C is third; six bags total.”
- **Experience beats and explanatory feedback:**
  - **Beat 1:** “Which bag is third from START at A?” Learner traces A first, B second, C third. **Explanation:** C is third; six bags total. **Exact worked case:** C third from A; six in total. **Error-specific response:** Choosing D triggers A=first, B=second, C=third, D=fourth.
  - **Beat 2:** “Now START at F. Where is C?” Learner predicts then counts F,E,D,C. **Explanation:** C is fourth; still six bags. **Exact worked case:** C fourth from F; six in total. **Error-specific response:** For third, show F first, E second, D third, C fourth.
- **Learner control and state:** Select START end; select bag; Step from START; Reveal trace; Reset. The child may predict first, manipulate the evidence, reveal a worked explanation and retry without correctness locks or scores.
- **Accessible alternative:** Fully ordered text state and controls give the exact same numerical evidence with keyboard, switch, screen reader or touch, including meaningful RTL.
- **Transition:** The next stage requires an explanation using the mathematical invariant, not a repetition of visual gestures.

### Section 2 — Think before revealing the reason

- **Purpose:** Short independent retrieval and misconception contrast.
- **Ordered Resource blocks (renderable):**
  1. text: “Can C be third and fourth without moving the bags?”
  2. markdown: “Yes to the first: C is third from A but fourth from F. No to the second: exchanging objects preserves the count.”
  3. text: “Does swapping two objects create another object?”
- **Pedagogical action:** The learner reflects before reading the explanation, then checks it against the first Scene. An actual hidden-answer widget is **not** inferred from plain text/Markdown support; this is a planned reflective pause, not a scored Question.
- **Feedback:** Address the common trap directly: Confusing third with a collection of three; assuming leftmost means first regardless of START; believing an item stays third when its place changes; believing a swap adds an item.
- **Transition:** Apply the same principle to the new Scene, without relying on the original display.

### Section 3 — Line-Up Swap

- **Purpose:** Transfer the principle to a changed situation independently.
- **Current Section shape:** General LessonSection_Config with a single ordered vertical nonempty Resource array, not Quiz_Config.
- **Ordered blocks:** (1) text (renderable): “Swap Star and Rain. Where is Star now?” (2) scene (generic type renderable; this bespoke component proposed): [Line-Up Swap](./scenes/lineUpSwap.scene-spec.md) (3) markdown (renderable): “Star is fifth; five items remain.”
- **Experience beats and explanatory feedback:**
  - **Beat 1:** “Swap Star and Rain. Where is Star now?” Sun,Moon,Star,Cloud,Rain changes to Sun,Moon,Rain,Cloud,Star. **Explanation:** Star is fifth; five items remain. **Exact worked case:** Star third becomes fifth, total five. **Error-specific response:** If number changed, map every object before and after; all five remain.
  - **Beat 2:** “Which cushion is fourth from the library entrance?” In new P,Q,R,S,T line, learner counts from entrance and selects S. **Explanation:** S is fourth; total five. **Exact worked case:** S fourth from entrance; five cushions. **Error-specific response:** If R selected, trace P first, Q second, R third, S fourth.
- **Learner control and state:** Select two objects; Swap; Step from entrance; Reveal; Reset. The child may predict first, manipulate the evidence, reveal a worked explanation and retry without correctness locks or scores.
- **Accessible alternative:** Fully ordered text state and controls give the exact same numerical evidence with keyboard, switch, screen reader or touch, including meaningful RTL.
- **Transition:** The next stage requires an explanation using the mathematical invariant, not a repetition of visual gestures.

## CUSTOM SCENE SPECIFICATIONS

- [Start Marker Line](./scenes/startMarkerLine.scene-spec.md) — conceptual model and first contrast.
- [Line-Up Swap](./scenes/lineUpSwap.scene-spec.md) — independent transfer and different actions.

Both specific Scenes are **proposed**, self-contained, prop-free and not implemented. Generic text, markdown and scene Resource rendering exists; this does not establish the new components. No new runtime field or mode prop is proposed.

## LESSON NOTES — UNLOCKED RECALL CUES (PLANNED)

1. “Ordinal tells which place from a start; cardinal tells how many.” — after Section 1 model and explanation (planned, not wired).
2. “Moving an item can change its position without changing the total.” — after Section 3 transfer and explanation (planned, not wired).

These are concise factual recall candidates. Note entities, event contracts, revision sheets and persistence have not been verified implemented.

## PRACTICE, RETRIEVAL AND ASSESSMENT HANDOFF

The first Scene uses guided formative decisions and worked contrast; Section 2 retrieves the principle verbally; Section 3 changes the setting to elicit transfer. No response implies Skill mastery. Assessment Architect owns any future scored Question, Quiz, evidence validity and retry policy.

## GLOBAL ACCESSIBILITY AND LOCALIZATION

English text here is editorial source, not production locale assets. Complete truthful translation of instructional language, count words, denomination labels, error messages, aria names and Notes is required for every Engine-supported locale with no silent fallback. RTL must preserve number order, identities, explicit START or EUR units and pair semantics. Equivalent keyboard/switch/touch/nonvisual controls, focus, contrast, reduced motion, zoom and mobile experience are WCAG 2.2 AA targets. All lesson assets, selected-language explanations and computation must be usable offline after download; actual PWA completeness is not claimed.

## PRODUCTION / PLATFORM DEPENDENCIES

- Existing general Lesson Section contract: ordered vertical nonempty Resource list.
- Current generic text, markdown and scene renderer: observed. New bespoke Scenes: **proposed only**.
- Full-locale translations, RTL/keyboard accessibility, genuine offline download and Note persistence: required/planned, not demonstrated.
- No React code, runtime Lesson data, Questions, Quizzes, scoring or Note event wiring exists in this batch.

## EDITORIAL SOURCES AND OPEN QUESTIONS

- [Draft Methodologist Brief](./methodologist-brief.md) and its exact Skill data links.
- [Section entity](../../../../../../studio/docs/entities/section.md) and [Lesson Content entity](../../../../../../studio/docs/entities/lesson-content.md).

- Open decisions: explicit Methodologist grade/targets/depth approval; separate Content/Scene review; full locale and offline/accessibility production checks.

## HANDOFF

**Provisional Draft.** Content is prepared under batch authorization before Methodologist approval, without claiming formal editorial readiness or implementation permission.
