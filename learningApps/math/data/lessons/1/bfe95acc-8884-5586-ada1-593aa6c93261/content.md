# Say It With a Sign: Less, Greater, Equal — Content

Status: **Provisional Draft — pending Methodologist approval**
Target Lesson: `learningApps/playground/Data/Lessons/1/compareNumbersWithSymbols/`
Audience: Grade 2; Grade 2 children who can compare collections and read numbers up to 20. They can explain which is more/less/equal before encountering operator glyphs; the notation extends an understood relationship, not a memorized mouth-shaped picture.
Methodologist source: [Methodologist Brief](./methodologist-brief.md) (**Draft; not approved**)
Target Skills: exactly the canonical source-file links in the Brief (not redefined or copied here)
Program dependence: None
Runtime Lesson / Scene implementation: Not implemented

## INSTRUCTIONAL CONCEPT

Use <, > and = as precise relational signs between two numerical quantities, retaining their meaning when the operands change order and when the interface changes language or direction.

**What must become clear:** The statement a < b means a is less than b, a > b means a is greater than b, and a = b means they have equal values. For 8 and 12, 8 < 12 is true, while 12 > 8 expresses the **same** quantitative relationship after swapping operand order. Leaving < in place after swapping makes 12 < 8 false. Equality stays equality after swapping the same values: 7 = 7 in either order. The glyphs are mathematical operators with fixed operand order; they are not words to mirror for Arabic/Hebrew layout. The mathematical pair is isolated directionally so the left operand and right operand remain the intended numbers.

**Pedagogical premise:** A learner is not merely recognizing a displayed fact. The first interactive Scene gives control over a concrete model and exposes a critical contrast. A compact explanatory/reflection Section invites retrieval and makes errors understandable. The second Scene independently changes the numbers or representation, so successful reasoning requires applying the mathematical rule rather than reproducing the original picture. Every key feedback branch explains _why_ an answer differs from the model.

## LEARNER JOURNEY

1. **Notice and predict:** “Eight dots on the first side and twelve on the second. Which sign makes the sentence true?” The learner selects a possible result and then operates the first model without mandatory score, narration or timer.
2. **Manipulate and inspect:** 8 < 12; 12 is four more than 8, so they are not equal. 7 = 7, whether spread or close together. Both a simple visual model and an accessible item/number ledger show the same mathematics.
3. **Explain and retrieve:** If 8 < 12 is true, may we swap the numbers and still write 12 < 8? Invite a spoken, private or accessible text-based explanation before reading the worked answer.
4. **Transfer independently:** 8 < 12 is true. Swap the numbers. Does < still tell the truth? A different representation offers a new reasoned problem, with misconception-targeted feedback and an optional full reveal.
5. **Summarize for future recall:** a short proposed Note captures the enduring idea without attempting to assess mastery or create a persistent unlocked event.

## SECTION PLAN

### Section 1 — Relation Card Lab

- **Learning purpose:** Link each of the three glyphs to an actual pair of quantities with the choice of sign explained by visible cardinal evidence.
- **Actual Section shape:** `LessonSection_Config` with one ordered nonempty vertical Resource list. This is not a `Quiz_Config` or a novel specialized discriminator.
- **Ordered content blocks, top to bottom:**
  1. **`text` — existing generic renderer:** “Eight dots on the first side and twelve on the second. Which sign makes the sentence true?”
  2. **`scene` — generic type exists, **specific Scene proposed**:** [Relation Card Lab](./scenes/relationCardLab.scene-spec.md). Two separate baskets of identical counters, left basket 8 and right basket 12; sign slot with <, > and =; a second independent preset with 7 and 7 displayed at different spacing. All operators appear in a dedicated mathematically left-to-right expression region even inside RTL text.
  3. **`markdown` — existing generic renderer:** “8 < 12, read eight is less than twelve. 8 < 12; 12 is four more than 8, so they are not equal.”
- **Learner action and responsive feedback:**

**Beat 1 — “Eight dots on the first side and twelve on the second. Which sign makes the sentence true?”** Count or inspect both groups, select < between numeral 8 and numeral 12, and show a strict lower/higher quantity comparison.

**Learner-visible result:** 8 < 12, read eight is less than twelve.

**Worked numerical evidence:** 8 < 12; 12 is four more than 8, so they are not equal.

**Feedback for a plausible misconception:** For >, show 8 is not more than 12. For =, line up eight one-to-one pairs and reveal four unmatched dots on the twelve side.

Learner may replay this beat, inspect an ordered explanation, and reset without score or correctness lock.

**Beat 2 — “Seven dots are spread widely and seven are close together. What sign belongs between 7 and 7?”** Inspect paired count ledger for both seven-dot groups and choose = despite different spacing.

**Learner-visible result:** 7 = 7; layout does not change the total.

**Worked numerical evidence:** 7 = 7, whether spread or close together.

**Feedback for a plausible misconception:** For < or >, pair all seven dots one-to-one with none unmatched, then show the two written 7s.

Learner may replay this beat, inspect an ordered explanation, and reset without score or correctness lock.

- **Controls and accessibility:** Choose <, > or =; inspect left/right counted values; choose 8&12 or 7&7 preset; explain/reveal; reset. Expose expression as 'eight less than twelve' and an isolated accessible math string '8 < 12'; fully focusable sign picker and count ledger. RTL reading direction localizes prose, not operand or operator order.
- **Cause-and-effect explanation:** Two canonical integer values, selected sign, numeric evidence ledger, current preset, reveal state. Displayed left and right operand identities are fixed by the math expression, not by CSS page order. No counter removal on choosing a sign. No passive animation is required to retrieve the answer; every result is accompanied by object, tick, sign or group evidence.
- **Boundary reasoning:** Do not imply the sign choice is a score; a child can inspect exact quantities before or after a prediction. Equal-value counts require the same sign even when one visual row is longer.
- **Navigation and transition:** After inspecting the principle in this Scene, ask for a prediction about the next, changed-context representation. A child can request a worked model and advance without a mastery gate.
- **Implementation feasibility:** new custom Scene is **proposed**, self-contained and prop-free. Existing generic `scene` Resource rendering does not establish this component. No runtime data, Question, Quiz or Note event is supplied here.

### Section 2 — Would the Sign Still Tell the Truth?

- **Purpose and expected learner thinking:** Distinguish the mathematical invariant from a familiar but misleading shortcut; retrieve a rule without a score.
- **Current implementation shape:** `LessonSection_Config`, a single vertical content column (no Quiz).
- **Ordered content blocks:**
  1. **`text` — existing renderer:** “If 8 < 12 is true, may we swap the numbers and still write 12 < 8?”
  2. **`markdown` — existing renderer:** “No. Twelve is greater than eight. After swapping their places, the true statement is 12 > 8. The sign must follow the quantities, not the position you remember.”
  3. **`markdown` — existing renderer:** “When the numbers are equal, such as 7 = 7, switching them leaves equality true. In an RTL sentence, preserve mathematical operand order instead of flipping the signs automatically.”
- **Meaningful feedback:** The example explicitly contrasts the likely mistaken response with a countable or numeric explanation. Child may reason before reading; current `text`/`markdown` renderers are **not** claimed to provide a delayed-answer or true-response validation widget.
- **Accessibility and pacing:** Brief accessible written language, no sensory dependency. The explanatory text remains available to every learner and is never hidden behind a timed action.
- **Transition:** Section 3 changes numbers or objects and asks for independent reasoning. The first Scene's state is not carried into the second.

### Section 3 — Swap the Comparison

- **Learning purpose:** Demonstrate operator reversal as the consequence of swapping two different numerical operands, not visual flipping of a symbol.
- **Actual Section shape:** `LessonSection_Config` with one ordered nonempty vertical Resource list. This is not a `Quiz_Config` or a novel specialized discriminator.
- **Ordered content blocks, top to bottom:**
  1. **`text` — existing generic renderer:** “8 < 12 is true. Swap the numbers. Does < still tell the truth?”
  2. **`scene` — generic type exists, **specific Scene proposed**:** [Swap the Comparison](./scenes/swapTheComparison.scene-spec.md). Editable truth card 8 < 12 with an accessible Swap operands action; a preset 7 = 7; an independent new-card challenge 16 and 9. Text says exactly which operand appears first/second.
  3. **`markdown` — existing generic renderer:** “12 > 8 is true. 12 < 8 is false. 8 < 12 and 12 > 8 express the same fact.”
- **Learner action and responsive feedback:**

**Beat 1 — “8 < 12 is true. Swap the numbers. Does < still tell the truth?”** Swap positions to [12,8] but intentionally leave < visible as an invalid proposal; learner selects > to repair it.

**Learner-visible result:** 12 > 8 is true. 12 < 8 is false.

**Worked numerical evidence:** 8 < 12 and 12 > 8 express the same fact.

**Feedback for a plausible misconception:** If < kept, show twelve objects cannot be fewer than eight; explain that the operator changes because the operands changed places.

Learner may replay this beat, inspect an ordered explanation, and reset without score or correctness lock.

**Beat 2 — “What happens when equal numbers swap? Then compare a new 16 and 9.”** Swap 7=7 without changing truth; then independently choose > for [16,9] and < when those values swap to [9,16].

**Learner-visible result:** 7 = 7 stays true under swap; 16 > 9 and 9 < 16 are the true new relations.

**Worked numerical evidence:** 7=7; 16>9; 9<16.

**Feedback for a plausible misconception:** If = changes for 7, both sides still have seven. If 16<9 chosen, point to 16 being the larger count and explain which sign means greater.

Learner may replay this beat, inspect an ordered explanation, and reset without score or correctness lock.

- **Controls and accessibility:** Swap operands; choose one of three sign buttons; explain with a count/number-line model; choose new challenge; reset. Explicit ordered text naming first and second operand and localized reading of each relation. Use bidirectional isolates/semantic math direction so 8<12 cannot render as a different statement in RTL.
- **Cause-and-effect explanation:** Ordered pair [a,b], selected operator, truth explanation, scenario preset and undo. Swap exchanges a and b while preserving their numeric values; a proposal is considered true only if relation mathematically holds. No passive animation is required to retrieve the answer; every result is accompanied by object, tick, sign or group evidence.
- **Boundary reasoning:** The sign must not be mirrored as a mere visual RTL effect; only the explicit user-operable Swap action changes operand order. Swapping identical values does not require changing =.
- **Navigation and transition:** After inspecting the principle in this Scene, ask for a prediction about the next, changed-context representation. A child can request a worked model and advance without a mastery gate.
- **Implementation feasibility:** new custom Scene is **proposed**, self-contained and prop-free. Existing generic `scene` Resource rendering does not establish this component. No runtime data, Question, Quiz or Note event is supplied here.

## CUSTOM SCENE SPECIFICATIONS

- [Relation Card Lab](./scenes/relationCardLab.scene-spec.md) — independently initialised concrete explanation and contrast.
- [Swap the Comparison](./scenes/swapTheComparison.scene-spec.md) — independently initialised transfer with new numbers/representation.

Both Scenes are **proposed**, distinct and prop-free. Each is represented by one typed `scene` Resource in an otherwise single-column Section; no new Section type, imaginary mode prop, generated image, fake API, scoring or React component is authored.

## LESSON NOTES — UNLOCKED RECALL CUES (PLANNED)

1. **after three operator examples:** “< means less than, > means greater than, = means equal in value.” — proposed after the model is examined and its explanation is available, without requiring a correct score. **Planned, not wired.**
2. **after swapping distinct operands:** “When different numbers change sides, reverse < and > to keep the comparison true.” — proposed after the model is examined and its explanation is available, without requiring a correct score. **Planned, not wired.**

These are concise independently useful retrieval anchors, not Lesson summaries. A real Note entity, stable identity, unlock contract, learner state, revision sheet, synchronization and spaced scheduling remain separately unimplemented or unverified.

## PRACTICE, RETRIEVAL AND ASSESSMENT HANDOFF

Sections 1 and 3 provide learner-operated practice, concrete counterexamples, and explicit formative reasoning. Section 2 offers reflection and retrieval. The final Section's changed representation can show whether the learner used the rule, but one correct selection is **not** evidence of independent Skill mastery. Graded Question/Quiz design, correctness validity, scoring, retry policy and Skill attribution belong to a separate Learning Assessment Architect stage.

## GLOBAL ACCESSIBILITY AND LOCALIZATION

Every learner-facing prompt, number word, accessible description, feedback branch, state announcement and Note requires a complete genuine translation for the current Engine-supported roster, with no silent English fallback. RTL changes reading presentation but not mathematical operand order, number-line increasing direction, counting origin or grouping identity. WCAG 2.2 AA: native keyboard/switch/touch operation, visible focus, nonvisual ordered model ledger, non-color explanations, reduced motion, legible 200% zoom/mobile experience. All selected-language models, scripts, assets and feedback must be locally available after the lesson package is downloaded. These are production requirements, not claims that localization/PWA behavior currently exists.

These documents include **English editorial source text only**. Full real translations for all supported locales, including Scene dictionaries, alt descriptions and optional Notes, must precede implementation. Do not silently invent fallback translations or new language codes.

## PRODUCTION / PLATFORM DEPENDENCIES

| Capability                                                    | Status                                            | Owner / next work                                                    |
| ------------------------------------------------------------- | ------------------------------------------------- | -------------------------------------------------------------------- |
| General `LessonSection_Config` with ordered `Resource_Config` | Existing TypeScript contract                      | Coding Agent builds Lesson later                                     |
| Generic `text`, `markdown`, `scene` renderer                  | Observed in Playground `LessonSectionContent.tsx` | New Scene is _not_ provided by generic support                       |
| Relation Card Lab and Swap the Comparison                     | **Proposed** Scene specifications only            | Editor approval, separate Scene design, implementation and own tests |
| Genuine locale translations and RTL/nonvisual equivalence     | Product requirements, not produced here           | Localization and accessibility QA                                    |
| Complete downloaded-offline experience                        | Product target; not verified implemented          | PWA/dependency integration and airplane-mode E2E                     |
| Lesson Notes and unlock/storage                               | Planned, unverified runtime                       | Separate architecture and implementation                             |
| Scored Questions, Quizzes, mastery and progress claims        | Not authored                                      | Separate Assessment Architect                                        |

## EDITORIAL SOURCES AND OPEN QUESTIONS

- [Draft Methodologist Brief](./methodologist-brief.md) and its actual canonical Skill file links.
- [Lesson Content entity](../../../../../../studio/docs/entities/lesson-content.md), [Section entity](../../../../../../studio/docs/entities/section.md), [Learning Experience Philosophy](../../../../../../studio/docs/architecture/learning-experience-philosophy.md).
- Open: explicit Methodologist grade and target Skill approval, separate Content and Scene review, genuine complete translations, RTL/nonvisual interaction details, and full offline packaging before coding.

## HANDOFF

**Provisional Screenwriter Draft — Methodologist approval has not occurred.** Implementers may inspect these source-grounded plans but must not treat them as approved React/runtime Lesson data, Question/Quiz items, scores, mastery data, Note events or working offline/locale support.
