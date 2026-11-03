# Does Every Object Have a Partner? — Content

Status: **Provisional Draft — pending Methodologist approval**
Target Lesson: learningApps/playground/Data/Lessons/1/evenOrOddByPairing/
Audience: Primary Grade 2
Methodologist source: [Draft Methodologist Brief](./methodologist-brief.md) (not approved)
Target Skills: As directly linked in the Draft Brief, unchanged canonical Skill objects
Program dependence: None
Runtime status: Not implemented

## INSTRUCTIONAL CONCEPT

Classify even and odd counts by dividing objects into disjoint pairs, explaining when an item is left without a partner and why arrangement cannot change parity. The learner can predict, operate the mathematical representation, see an actual explanation and transfer the idea to a changed setting. The experience is not a lecture followed by a token quiz.

**Core mathematical truth and boundaries:** Eight objects form four disjoint pairs and no leftover: even. Nine form four pairs and one unmatched object: odd. Twelve form six pairs whether regular or scattered: even. Thirteen form six pairs and one unmatched object: odd. Zero is even mathematically, but introduced only as optional extension. Grade 2 concrete collections of 1–15 items; no negative integers, formal divisibility test, memorized final-digit shortcut or scoring.

## LEARNER JOURNEY

1. Encounter a small concrete instance with Partner Pair Lab. The child changes the model rather than passively watches; mistakes receive named evidence.
2. Compare the first model with a deliberately contrasting condition. Ask what stayed the same and what changed.
3. Brief unscored retrieval with a worked counterexample: Four complete pairs plus one leftover: even or odd?
4. Independently try Pair Surprise, changing the item identities, configuration or currency amounts so the child must apply the general principle.
5. State a reason, or reveal and revisit the full model without score, timer, Program narrative or persistence.

## SECTION PLAN

### Section 1 — Partner Pair Lab

- **Purpose:** Establish and test the model in a controlled contrast.
- **Current Section shape:** General LessonSection_Config with a single ordered vertical nonempty Resource array, not Quiz_Config.
- **Ordered blocks:** (1) text (renderable): “Can all eight cards find a partner?” (2) scene (generic type renderable; this bespoke component proposed): [Partner Pair Lab](./scenes/partnerPairLab.scene-spec.md) (3) markdown (renderable): “Eight is even, zero leftover.”
- **Experience beats and explanatory feedback:**
  - **Beat 1:** “Can all eight cards find a partner?” Make four disjoint pairs, for example 1–2,3–4,5–6,7–8. **Explanation:** Eight is even, zero leftover. **Exact worked case:** 8=4 pairs +0 leftover. **Error-specific response:** If odd because four groups are visible, compare number of objects left alone: zero.
  - **Beat 2:** “One ninth card arrives. Is it still even?” Add a ninth card and inspect the four existing pairs and one unmatched card. **Explanation:** Nine is odd, one leftover. **Exact worked case:** 9=4 pairs +1 leftover. **Error-specific response:** If even selected, point to unpaired ninth card and its missing partner.
- **Learner control and state:** Select two available cards / Pair next two sequentially; Undo; Add ninth; Reveal; Reset. The child may predict first, manipulate the evidence, reveal a worked explanation and retry without correctness locks or scores.
- **Accessible alternative:** Fully ordered text state and controls give the exact same numerical evidence with keyboard, switch, screen reader or touch, including meaningful RTL.
- **Transition:** The next stage requires an explanation using the mathematical invariant, not a repetition of visual gestures.

### Section 2 — Think before revealing the reason

- **Purpose:** Short independent retrieval and misconception contrast.
- **Ordered Resource blocks (renderable):**
  1. text: “Four complete pairs plus one leftover: even or odd?”
  2. markdown: “Four pairs and one leftover make nine, an odd count. Scattering twelve does not add/remove objects: six complete pairs remain possible.”
  3. text: “Can scattering twelve objects make an even count odd?”
- **Pedagogical action:** The learner reflects before reading the explanation, then checks it against the first Scene. An actual hidden-answer widget is **not** inferred from plain text/Markdown support; this is a planned reflective pause, not a scored Question.
- **Feedback:** Address the common trap directly: Confusing four pairs with four objects; letting the same object belong to two pairs; thinking that an untidy layout must be odd; concluding odd while two unpaired objects could still form another pair.
- **Transition:** Apply the same principle to the new Scene, without relying on the original display.

### Section 3 — Pair Surprise

- **Purpose:** Transfer the principle to a changed situation independently.
- **Current Section shape:** General LessonSection_Config with a single ordered vertical nonempty Resource array, not Quiz_Config.
- **Ordered blocks:** (1) text (renderable): “Does scattering twelve dots turn them odd?” (2) scene (generic type renderable; this bespoke component proposed): [Pair Surprise](./scenes/pairSurprise.scene-spec.md) (3) markdown (renderable): “Twelve remains even.”
- **Experience beats and explanatory feedback:**
  - **Beat 1:** “Does scattering twelve dots turn them odd?” Scatter same twelve distinct dots, then make six pairs. **Explanation:** Twelve remains even. **Exact worked case:** 12=6 pairs +0 both ways. **Error-specific response:** If odd due to crooked layout, match each dot before and after and show six complete pairs.
  - **Beat 2:** “Prove whether thirteen shells are even or odd.” Independent thirteen-shell case; form six disjoint pairs and count remaining one. **Explanation:** Thirteen is odd. **Exact worked case:** 13=6 pairs +1 leftover. **Error-specific response:** If two shells unmatched, show they can still form one pair before deciding.
- **Learner control and state:** Scatter/restore; Pair distinct objects; Undo; Show ledger; Reset. The child may predict first, manipulate the evidence, reveal a worked explanation and retry without correctness locks or scores.
- **Accessible alternative:** Fully ordered text state and controls give the exact same numerical evidence with keyboard, switch, screen reader or touch, including meaningful RTL.
- **Transition:** The next stage requires an explanation using the mathematical invariant, not a repetition of visual gestures.

## CUSTOM SCENE SPECIFICATIONS

- [Partner Pair Lab](./scenes/partnerPairLab.scene-spec.md) — conceptual model and first contrast.
- [Pair Surprise](./scenes/pairSurprise.scene-spec.md) — independent transfer and different actions.

Both specific Scenes are **proposed**, self-contained, prop-free and not implemented. Generic text, markdown and scene Resource rendering exists; this does not establish the new components. No new runtime field or mode prop is proposed.

## LESSON NOTES — UNLOCKED RECALL CUES (PLANNED)

1. “Even: all objects form pairs. Odd: one stays unpaired.” — after Section 1 model and explanation (planned, not wired).
2. “Rearranging the same items does not change even or odd.” — after Section 3 transfer and explanation (planned, not wired).

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
