# Read the Value: Euro Coins and Banknotes — Content

Status: **Provisional Draft — pending Methodologist approval**
Target Lesson: learningApps/playground/Data/Lessons/1/recognizeEuroCoinsAndNotes/
Audience: Primary Grade 2
Methodologist source: [Draft Methodologist Brief](./methodologist-brief.md) (not approved)
Target Skills: As directly linked in the Draft Brief, unchanged canonical Skill objects
Program dependence: None
Runtime status: Not implemented

## INSTRUCTIONAL CONCEPT

Recognize actual denominations in an explicitly named euro currency case study, and distinguish face value from physical size or national-side design. The learner can predict, operate the mathematical representation, see an actual explanation and transfer the idea to a changed setting. The experience is not a lecture followed by a token quiz.

**Core mathematical truth and boundaries:** Euro coins: 1,2,5,10,20,50 cents, and one/two euros. Europa-series banknotes include five and ten euros. Standard circulating five-euro coin does not exist. Fifty-cent coin diameter 24.25 mm exceeds one-euro coin diameter 23.25 mm, but one euro equals 100 cents and exceeds 50 cents in value. Grade 2 real euro case study; core items one- and two-euro coins plus five- and ten-euro notes; 50-cent contrast supported by explicit conversion reference. No changing currency automatically with UI locale, no purchase or exchange rates, no unlicensed banknote art.

## LEARNER JOURNEY

1. Encounter a small concrete instance with Euro Cash Viewer. The child changes the model rather than passively watches; mistakes receive named evidence.
2. Compare the first model with a deliberately contrasting condition. Ask what stayed the same and what changed.
3. Brief unscored retrieval with a worked counterexample: Which is worth more: a wider 50-cent coin or a smaller one-euro coin?
4. Independently try Cash Value Detective, changing the item identities, configuration or currency amounts so the child must apply the general principle.
5. State a reason, or reveal and revisit the full model without score, timer, Program narrative or persistence.

## SECTION PLAN

### Section 1 — Euro Cash Viewer

- **Purpose:** Establish and test the model in a controlled contrast.
- **Current Section shape:** General LessonSection_Config with a single ordered vertical nonempty Resource array, not Quiz_Config.
- **Ordered blocks:** (1) text (renderable): “Find the €2 coin and the €5 banknote.” (2) scene (generic type renderable; this bespoke component proposed): [Euro Cash Viewer](./scenes/euroCashViewer.scene-spec.md) (3) markdown (renderable): “€2 is a coin and €5 a note.”
- **Experience beats and explanatory feedback:**
  - **Beat 1:** “Find the €2 coin and the €5 banknote.” Inspect four schematics with readable face value and kind. **Explanation:** €2 is a coin and €5 a note. **Exact worked case:** €1/€2 coins; €5/€10 banknotes. **Error-specific response:** If a €5 coin selected, show ECB euro coins top out at €2 (as well as smaller cent coins).
  - **Beat 2:** “Does different artwork change a €2 coin value?” Show two labelled national-side descriptions on the same €2 schematic. **Explanation:** Both are worth €2. **Exact worked case:** €2 remains €2 irrespective of national-side artwork. **Error-specific response:** If values guessed different, show the unchanged face label €2.
- **Learner control and state:** Choose item; inspect denomination/kind; switch schematic country-side description; Reveal; Reset. The child may predict first, manipulate the evidence, reveal a worked explanation and retry without correctness locks or scores.
- **Accessible alternative:** Fully ordered text state and controls give the exact same numerical evidence with keyboard, switch, screen reader or touch, including meaningful RTL.
- **Transition:** The next stage requires an explanation using the mathematical invariant, not a repetition of visual gestures.

### Section 2 — Think before revealing the reason

- **Purpose:** Short independent retrieval and misconception contrast.
- **Ordered Resource blocks (renderable):**
  1. text: “Which is worth more: a wider 50-cent coin or a smaller one-euro coin?”
  2. markdown: “One euro is 100 cents, greater than 50 cents despite diameter. Five euros is a valid banknote denomination, but not a standard circulating euro coin denomination.”
  3. text: “Can a five-euro banknote be real while an ordinary five-euro coin is not?”
- **Pedagogical action:** The learner reflects before reading the explanation, then checks it against the first Scene. An actual hidden-answer widget is **not** inferred from plain text/Markdown support; this is a planned reflective pause, not a scored Question.
- **Feedback:** Address the common trap directly: Reading 50 as greater than 1 without converting units; guessing worth from coin size; treating a five-euro banknote as proof a five-euro coin must exist; assuming national-side artwork changes worth.
- **Transition:** Apply the same principle to the new Scene, without relying on the original display.

### Section 3 — Cash Value Detective

- **Purpose:** Transfer the principle to a changed situation independently.
- **Current Section shape:** General LessonSection_Config with a single ordered vertical nonempty Resource array, not Quiz_Config.
- **Ordered blocks:** (1) text (renderable): “The 50-cent coin is wider. Which coin is worth more?” (2) scene (generic type renderable; this bespoke component proposed): [Cash Value Detective](./scenes/cashValueDetective.scene-spec.md) (3) markdown (renderable): “€1 is worth more though 50c coin is physically wider.”
- **Experience beats and explanatory feedback:**
  - **Beat 1:** “The 50-cent coin is wider. Which coin is worth more?” Compare 50c to €1 using the reference 100 cents per euro. **Explanation:** €1 is worth more though 50c coin is physically wider. **Exact worked case:** 50c width 24.25mm>€1 width 23.25mm; monetary 50c<100c. **Error-specific response:** If 50 picked due to numeral or size, normalize to 50 versus 100 cents.
  - **Beat 2:** “Which is genuine ordinary euro cash: €5 note or a drawing of €5 coin?” Classify valid banknote and explicitly fictional ordinary €5 coin. **Explanation:** Real €5 note; no standard ordinary €5 euro coin. **Exact worked case:** €5 banknote exists; standard €5 coin does not. **Error-specific response:** If coin accepted, display verified euro coin list ending at €2.
- **Learner control and state:** Predict higher value; show cents conversion; inspect coin diameter and value; mark fictional; Reveal; Reset. The child may predict first, manipulate the evidence, reveal a worked explanation and retry without correctness locks or scores.
- **Accessible alternative:** Fully ordered text state and controls give the exact same numerical evidence with keyboard, switch, screen reader or touch, including meaningful RTL.
- **Transition:** The next stage requires an explanation using the mathematical invariant, not a repetition of visual gestures.

## CUSTOM SCENE SPECIFICATIONS

- [Euro Cash Viewer](./scenes/euroCashViewer.scene-spec.md) — conceptual model and first contrast.
- [Cash Value Detective](./scenes/cashValueDetective.scene-spec.md) — independent transfer and different actions.

Both specific Scenes are **proposed**, self-contained, prop-free and not implemented. Generic text, markdown and scene Resource rendering exists; this does not establish the new components. No new runtime field or mode prop is proposed.

## LESSON NOTES — UNLOCKED RECALL CUES (PLANNED)

1. “Denomination means the stated value of a coin or banknote.” — after Section 1 model and explanation (planned, not wired).
2. “The printed value, not size, tells how much money is worth.” — after Section 3 transfer and explanation (planned, not wired).

These are concise factual recall candidates. Note entities, event contracts, revision sheets and persistence have not been verified implemented.

## PRACTICE, RETRIEVAL AND ASSESSMENT HANDOFF

The first Scene uses guided formative decisions and worked contrast; Section 2 retrieves the principle verbally; Section 3 changes the setting to elicit transfer. No response implies Skill mastery. Assessment Architect owns any future scored Question, Quiz, evidence validity and retry policy.

## GLOBAL ACCESSIBILITY AND LOCALIZATION

English text here is editorial source, not production locale assets. Complete truthful translation of instructional language, count words, denomination labels, error messages, aria names and Notes is required for every Engine-supported locale with no silent fallback. RTL must preserve number order, identities, explicit START or EUR units and pair semantics. Equivalent keyboard/switch/touch/nonvisual controls, focus, contrast, reduced motion, zoom and mobile experience are WCAG 2.2 AA targets. All lesson assets, selected-language explanations and computation must be usable offline after download; actual PWA completeness is not claimed.
The euro is a named case-study currency; localization does not automatically convert its denominations into another currency. Any currency-specific replacement needs verified denominational sources and editorial approval.

## PRODUCTION / PLATFORM DEPENDENCIES

- Existing general Lesson Section contract: ordered vertical nonempty Resource list.
- Current generic text, markdown and scene renderer: observed. New bespoke Scenes: **proposed only**.
- Full-locale translations, RTL/keyboard accessibility, genuine offline download and Note persistence: required/planned, not demonstrated.
- No React code, runtime Lesson data, Questions, Quizzes, scoring or Note event wiring exists in this batch.

## EDITORIAL SOURCES AND OPEN QUESTIONS

- [Draft Methodologist Brief](./methodologist-brief.md) and its exact Skill data links.
- [Section entity](../../../../../../studio/docs/entities/section.md) and [Lesson Content entity](../../../../../../studio/docs/entities/lesson-content.md).
- [Official euro source 1](https://www.ecb.europa.eu/euro/coins/html/index.en.html)
- [Official euro source 2](https://www.ecb.europa.eu/euro/banknotes/html/index.en.html)
- [Official euro source 3](https://economy-finance.ec.europa.eu/euro/euro-coins-and-notes/euro-coins/common-sides-euro-coins_en)
- Open decisions: explicit Methodologist grade/targets/depth approval; separate Content/Scene review; full locale and offline/accessibility production checks.

## HANDOFF

**Provisional Draft.** Content is prepared under batch authorization before Methodologist approval, without claiming formal editorial readiness or implementation permission.
