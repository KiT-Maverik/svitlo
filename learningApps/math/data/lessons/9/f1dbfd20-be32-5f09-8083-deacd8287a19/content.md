# Different Cash, Same Total? Euro Amounts — Content

Status: **Provisional Draft — pending Methodologist approval**
Target Lesson: learningApps/playground/Data/Lessons/1/composeAndCompareEuroAmounts/
Audience: Primary Grade 2
Methodologist source: [Draft Methodologist Brief](./methodologist-brief.md) (not approved)
Target Skills: As directly linked in the Draft Brief, unchanged canonical Skill objects
Program dependence: None
Runtime status: Not implemented

## INSTRUCTIONAL CONCEPT

Use the same conserved monetary value to compose different valid combinations and to compare purses by summed denominations, not count or size of cash pieces. The learner can predict, operate the mathematical representation, see an actual explanation and transfer the idea to a changed setting. The experience is not a lecture followed by a token quiz.

**Core mathematical truth and boundaries:** €6=€5+€1 (two pieces)=€2+€2+€2 (three pieces)=€2+€2+€1+€1 (four pieces). €3 amount can be €2+€1 but no standard €3 coin exists. Purse A €10 note vs B €5 note+three €2 coins =€11; purse A €5+€2=€7 vs B three €2 coins =€6; two €2 coins =€4 versus a €5 banknote =€5. Grade 2, 0–15 whole euros; legitimate €1 and €2 coins, €5 and €10 notes; no cents, rates, transactions, purchase totals, budgets, change, scoring, or automatically substituted locale-specific currency.

## LEARNER JOURNEY

1. Encounter a small concrete instance with Equal-Value Cash Desk. The child changes the model rather than passively watches; mistakes receive named evidence.
2. Compare the first model with a deliberately contrasting condition. Ask what stayed the same and what changed.
3. Brief unscored retrieval with a worked counterexample: Could two cash pieces and three cash pieces both make six euros?
4. Independently try Compare Euro Purses, changing the item identities, configuration or currency amounts so the child must apply the general principle.
5. State a reason, or reveal and revisit the full model without score, timer, Program narrative or persistence.

## SECTION PLAN

### Section 1 — Equal-Value Cash Desk

- **Purpose:** Establish and test the model in a controlled contrast.
- **Current Section shape:** General LessonSection_Config with a single ordered vertical nonempty Resource array, not Quiz_Config.
- **Ordered blocks:** (1) text (renderable): “Can one banknote and one coin make €6?” (2) scene (generic type renderable; this bespoke component proposed): [Equal-Value Cash Desk](./scenes/equalValueCashDesk.scene-spec.md) (3) markdown (renderable): “€5+€1=€6 with two pieces.”
- **Experience beats and explanatory feedback:**
  - **Beat 1:** “Can one banknote and one coin make €6?” Add €5 note then €1 coin, observe €5 then €6. **Explanation:** €5+€1=€6 with two pieces. **Exact worked case:** €5+€1=€6. **Error-specific response:** If €5 selected alone, show one euro missing. If €5+€2, sum is seven.
  - **Beat 2:** “Make the same six euros with coins only.” Remove first pair, add three individual €2 coins, compare prior total. **Explanation:** Three coins still sum €6, equal in value to two-piece combination. **Exact worked case:** €2+€2+€2=€6. **Error-specific response:** If three euros guessed from coin count, show 2+2+2.
  - **Beat 3:** “Is a €3 euro coin needed to make amount €3?” Identify fictional €3 ordinary coin; instead combine real €2 and €1. **Explanation:** €3 is a valid total, not an ordinary euro coin denomination. **Exact worked case:** €2+€1=€3; no standard €3 coin. **Error-specific response:** If fictional coin accepted, show the actual euro coin set.
- **Learner control and state:** Add a denomination; remove one specific piece; show sum ledger; compare combinations; Reveal; Reset. The child may predict first, manipulate the evidence, reveal a worked explanation and retry without correctness locks or scores.
- **Accessible alternative:** Fully ordered text state and controls give the exact same numerical evidence with keyboard, switch, screen reader or touch, including meaningful RTL.
- **Transition:** The next stage requires an explanation using the mathematical invariant, not a repetition of visual gestures.

### Section 2 — Think before revealing the reason

- **Purpose:** Short independent retrieval and misconception contrast.
- **Ordered Resource blocks (renderable):**
  1. text: “Could two cash pieces and three cash pieces both make six euros?”
  2. markdown: “Yes: €5+€1 and three €2 coins both make six euros. The second purse has €5+€2+€2+€2=€11, greater than a €10 note.”
  3. text: “Which is worth more: one ten-euro note or five euros plus three two-euro coins?”
- **Pedagogical action:** The learner reflects before reading the explanation, then checks it against the first Scene. An actual hidden-answer widget is **not** inferred from plain text/Markdown support; this is a planned reflective pause, not a scored Question.
- **Feedback:** Address the common trap directly: Counting coins as euros regardless of value; five-euro note as five notes; assuming more pieces means higher value; using a fictional €3 euro coin; assuming different combinations must have different totals.
- **Transition:** Apply the same principle to the new Scene, without relying on the original display.

### Section 3 — Compare Euro Purses

- **Purpose:** Transfer the principle to a changed situation independently.
- **Current Section shape:** General LessonSection_Config with a single ordered vertical nonempty Resource array, not Quiz_Config.
- **Ordered blocks:** (1) text (renderable): “Which is worth more: A €10 note or B €5 note plus three €2 coins?” (2) scene (generic type renderable; this bespoke component proposed): [Compare Euro Purses](./scenes/compareEuroPurses.scene-spec.md) (3) markdown (renderable): “B is higher: €11>€10.”
- **Experience beats and explanatory feedback:**
  - **Beat 1:** “Which is worth more: A €10 note or B €5 note plus three €2 coins?” Compute A=10, B=5+2+2+2=11 from individual value labels. **Explanation:** B is higher: €11>€10. **Exact worked case:** A €10, B €11 → B greater. **Error-specific response:** If A due to big note, show B's four values summed to eleven.
  - **Beat 2:** “A has €5+€2; B has three €2 coins. Which wins?” Count monetary values rather than the number of pieces. **Explanation:** A is €7 versus B €6. **Exact worked case:** A €7, B €6 → A greater. **Error-specific response:** If B chosen due to three coins, demonstrate 2+2+2=6.
  - **Beat 3:** “New case: A has two €2 coins, B one €5 note.” Independent transfer: compute 2+2=4 and compare with 5. **Explanation:** B has more worth: €5 versus €4. **Exact worked case:** A €4, B €5 → B greater. **Error-specific response:** If A due to two coins, compare four euros with five.
- **Learner control and state:** Choose case; predict A/B/equal; reveal A ledger; reveal B ledger; Explain; Reset. The child may predict first, manipulate the evidence, reveal a worked explanation and retry without correctness locks or scores.
- **Accessible alternative:** Fully ordered text state and controls give the exact same numerical evidence with keyboard, switch, screen reader or touch, including meaningful RTL.
- **Transition:** The next stage requires an explanation using the mathematical invariant, not a repetition of visual gestures.

## CUSTOM SCENE SPECIFICATIONS

- [Equal-Value Cash Desk](./scenes/equalValueCashDesk.scene-spec.md) — conceptual model and first contrast.
- [Compare Euro Purses](./scenes/compareEuroPurses.scene-spec.md) — independent transfer and different actions.

Both specific Scenes are **proposed**, self-contained, prop-free and not implemented. Generic text, markdown and scene Resource rendering exists; this does not establish the new components. No new runtime field or mode prop is proposed.

## LESSON NOTES — UNLOCKED RECALL CUES (PLANNED)

1. “Different coins and notes can make the same total amount.” — after Section 1 model and explanation (planned, not wired).
2. “Compare the values of cash pieces, not only how many pieces there are.” — after Section 3 transfer and explanation (planned, not wired).

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
- Open decisions: explicit Methodologist grade/targets/depth approval; separate Content/Scene review; full locale and offline/accessibility production checks.

## HANDOFF

**Provisional Draft.** Content is prepared under batch authorization before Methodologist approval, without claiming formal editorial readiness or implementation permission.
