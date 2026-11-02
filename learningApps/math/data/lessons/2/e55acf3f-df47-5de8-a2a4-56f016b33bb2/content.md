# A Number's Place on the Line — Content

Status: **Provisional Draft — pending Methodologist approval**
Target Lesson: `learningApps/playground/Data/Lessons/1/numberLineToTwenty/`
Audience: Grade 1; Learners who read numerals 0–20, can step forward and backward by one, and notice that evenly spaced tick marks form an ordered measuring representation. Grade 1 learners need a slow, move-one-step version with explicit labels rather than proportional-distance calculations in notation.
Methodologist source: [Methodologist Brief](./methodologist-brief.md) (**Draft; not approved**)
Target Skills: exactly the canonical source-file links in the Brief (not redefined or copied here)
Program dependence: None
Runtime Lesson / Scene implementation: Not implemented

## INSTRUCTIONAL CONCEPT

Treat a number line as a sequence of equally spaced numerical positions, not as a row of arbitrary pictures. Use those positions to find adjacent and intermediate whole numbers and explain the count of unit intervals.

**What must become clear:** The number line has positions 0,1,…,20 in numerical order with one **equal-length unit interval** between adjacent integers. In conventional number-line coordinates, larger values lie to the right and smaller values to the left; the arrow labelled increasing and ordered tick list always determine meaning, regardless of interface RTL direction. From tick 10, two unit moves reach 12 (via 11); from 5, three unit moves reach 8 (5→6, 6→7, 7→8). Immediately before 10 is 9, immediately after 10 is 11. Strictly between 7 and 11 lie 8,9,10 (not the endpoints). Inside the shown 0–20 segment, no predecessor of 0 and no successor of 20 are displayed; this is a display boundary, not a claim numbers do not continue.

**Pedagogical premise:** A learner is not merely recognizing a displayed fact. The first interactive Scene gives control over a concrete model and exposes a critical contrast. A compact explanatory/reflection Section invites retrieval and makes errors understandable. The second Scene independently changes the numbers or representation, so successful reasoning requires applying the mathematical rule rather than reproducing the original picture. Every key feedback branch explains _why_ an answer differs from the model.

## LEARNER JOURNEY

1. **Notice and predict:** “Start at 10. Make exactly two one-unit moves toward larger numbers. Where do you arrive?” The learner selects a possible result and then operates the first model without mandatory score, narration or timer.
2. **Manipulate and inspect:** 10 + 1 + 1 = 12; two equal gaps. 5→6→7→8: 3 intervals, 2 intermediate numbers. Both a simple visual model and an accessible item/number ledger show the same mathematics.
3. **Explain and retrieve:** From 5 to 8, how many one-unit moves do you make? Why isn't the answer two? Invite a spoken, private or accessible text-based explanation before reading the worked answer.
4. **Transfer independently:** Find the number just before 10 and just after 10. A different representation offers a new reasoned problem, with misconception-targeted feedback and an optional full reveal.
5. **Summarize for future recall:** a short proposed Note captures the enduring idea without attempting to assess mastery or create a persistent unlocked event.

## SECTION PLAN

### Section 1 — Equal-Tick Trail

- **Learning purpose:** Experience numeric position and equal one-unit intervals rather than a decorative run of labels.
- **Actual Section shape:** `LessonSection_Config` with one ordered nonempty vertical Resource list. This is not a `Quiz_Config` or a novel specialized discriminator.
- **Ordered content blocks, top to bottom:**
  1. **`text` — existing generic renderer:** “Start at 10. Make exactly two one-unit moves toward larger numbers. Where do you arrive?”
  2. **`scene` — generic type exists, **specific Scene proposed**:** [Equal-Tick Trail](./scenes/equalTickTrail.scene-spec.md). A mathematically fixed horizontal line with integer ticks 0–20. Consecutive tick centres have the same geometric spacing. A labelled increasing-direction arrow points toward increasing values; current marker at 10. On mobile, the visible window may scroll over this unchanged 21-tick model, with keyboard-accessible numeric list for the entire range.
  3. **`markdown` — existing generic renderer:** “The marker arrives at 12 after two distinct equal unit intervals. 10 + 1 + 1 = 12; two equal gaps.”
- **Learner action and responsive feedback:**

**Beat 1 — “Start at 10. Make exactly two one-unit moves toward larger numbers. Where do you arrive?”** Activate Step +1 twice, with marker moving 10→11→12 and revealing both equal-length gaps.

**Learner-visible result:** The marker arrives at 12 after two distinct equal unit intervals.

**Worked numerical evidence:** 10 + 1 + 1 = 12; two equal gaps.

**Feedback for a plausible misconception:** For 11, display the two traversed intervals 10→11 (first), 11→12 (second). For 13, show that the extra third interval was not requested.

Learner may replay this beat, inspect an ordered explanation, and reset without score or correctness lock.

**Beat 2 — “Between 5 and 8, how many one-unit moves are needed?”** Switch fixed preset to marker 5, target 8; move 5→6→7→8, recording each interval and separately listing interior ticks.

**Learner-visible result:** Three moves; two interior numbers (6 and 7) but three gaps.

**Worked numerical evidence:** 5→6→7→8: 3 intervals, 2 intermediate numbers.

**Feedback for a plausible misconception:** If two selected, explain that 6 and 7 are intermediate labels, while the gaps are 5–6, 6–7, 7–8.

Learner may replay this beat, inspect an ordered explanation, and reset without score or correctness lock.

- **Controls and accessibility:** Choose target tick, Step +1, Step −1, Show counted intervals, Reset, Reveal. An ordered numeric input/list alternative permits selection without dragging or fine tapping. Keep the increasing arrow and exact tick order mathematically fixed under RTL; announce marker, target and numbered interval list. Allow scroll/zoom without compressing 21 ticks to illegibility; native buttons and entire ordered list work without visual geometry.
- **Cause-and-effect explanation:** Integers 0 through 20, fixed unit spacing, current tick, target tick, step ledger, revealed interval count and explanation. Each Step +1 advances exactly one tick and one equal-length interval. Step −1 traverses one interval in the opposite direction. Window scrolling must never change the scale. No passive animation is required to retrieve the answer; every result is accompanied by object, tick, sign or group evidence.
- **Boundary reasoning:** A requested step beyond 0 or 20 says 'outside the displayed 0–20 segment' rather than declaring an impossible mathematical operation; never wrap the marker to the opposite end.
- **Navigation and transition:** After inspecting the principle in this Scene, ask for a prediction about the next, changed-context representation. A child can request a worked model and advance without a mastery gate.
- **Implementation feasibility:** new custom Scene is **proposed**, self-contained and prop-free. Existing generic `scene` Resource rendering does not establish this component. No runtime data, Question, Quiz or Note event is supplied here.

### Section 2 — How Many Hops?

- **Purpose and expected learner thinking:** Distinguish the mathematical invariant from a familiar but misleading shortcut; retrieve a rule without a score.
- **Current implementation shape:** `LessonSection_Config`, a single vertical content column (no Quiz).
- **Ordered content blocks:**
  1. **`text` — existing renderer:** “From 5 to 8, how many one-unit moves do you make? Why isn't the answer two?”
  2. **`markdown` — existing renderer:** “Three: 5→6, then 6→7, then 7→8. There are two numbers strictly inside the endpoints (6 and 7), but three gaps to travel.”
  3. **`markdown` — existing renderer:** “Counting ticks and counting the intervals between ticks are different questions. A line's numbers still increase in their declared direction if the page uses RTL.”
- **Meaningful feedback:** The example explicitly contrasts the likely mistaken response with a countable or numeric explanation. Child may reason before reading; current `text`/`markdown` renderers are **not** claimed to provide a delayed-answer or true-response validation widget.
- **Accessibility and pacing:** Brief accessible written language, no sensory dependency. The explanatory text remains available to every learner and is never hidden behind a timed action.
- **Transition:** Section 3 changes numbers or objects and asks for independent reasoning. The first Scene's state is not carried into the second.

### Section 3 — Between the Ticks

- **Learning purpose:** Use an explicit line segment to determine predecessor, successor and all intermediate integers instead of guessing from visual proximity.
- **Actual Section shape:** `LessonSection_Config` with one ordered nonempty vertical Resource list. This is not a `Quiz_Config` or a novel specialized discriminator.
- **Ordered content blocks, top to bottom:**
  1. **`text` — existing generic renderer:** “Find the number just before 10 and just after 10.”
  2. **`scene` — generic type exists, **specific Scene proposed**:** [Between the Ticks](./scenes/betweenTheTicks.scene-spec.md). Same invariant 0–20 scale, independently initialized marker at 10 and accessible numeric selection. Two fixed endpoint probes: 7 & 11, then 12 & 16. Strict between means excluding highlighted endpoint labels.
  3. **`markdown` — existing generic renderer:** “9 is immediately before 10; 11 is immediately after it. 9, 10, 11: immediate neighbors differ by one.”
- **Learner action and responsive feedback:**

**Beat 1 — “Find the number just before 10 and just after 10.”** Select 9 and 11 on the line, explaining each is exactly one adjacent unit interval from 10.

**Learner-visible result:** 9 is immediately before 10; 11 is immediately after it.

**Worked numerical evidence:** 9, 10, 11: immediate neighbors differ by one.

**Feedback for a plausible misconception:** If 8 chosen for before, show 8→9→10 is two intervals, so 9 is the immediate neighbor.

Learner may replay this beat, inspect an ordered explanation, and reset without score or correctness lock.

**Beat 2 — “Which whole numbers lie strictly between 7 and 11? Then try between 12 and 16.”** Mark 8,9,10 for 7–11, then independently transfer to 13,14,15 for 12–16. Read results as an ordered list.

**Learner-visible result:** 8,9,10 lie strictly between 7 and 11; 13,14,15 lie strictly between 12 and 16.

**Worked numerical evidence:** 7 | 8,9,10 | 11 and 12 | 13,14,15 | 16.

**Feedback for a plausible misconception:** If 7 or 11 selected, show endpoints are the limits, not inside. If 9 alone, point out unmarked valid 8 and 10.

Learner may replay this beat, inspect an ordered explanation, and reset without score or correctness lock.

- **Controls and accessibility:** Choose previous/next/between task, select integer labels in an ordered list, Explain with highlighted unit gaps, Reset. No precision click or drag required. Full ordered integer list and query description convey all spatial meaning. Nonvisual selection of the set of between values; the mathematical order is not reversed by RTL or a moving viewport.
- **Cause-and-effect explanation:** Selected query mode (previous/next/strict-between), known target(s), selected answers, ordered line labels and explicit endpoint inclusion setting (always false for strictly between). Source values remain fixed. No passive animation is required to retrieve the answer; every result is accompanied by object, tick, sign or group evidence.
- **Boundary reasoning:** For 0, say 'no number immediately before 0 in this displayed segment'; for 20, say 'no number immediately after 20 in this displayed segment.' Outside 0–20 is not studied or declared nonexistent.
- **Navigation and transition:** After inspecting the principle in this Scene, ask for a prediction about the next, changed-context representation. A child can request a worked model and advance without a mastery gate.
- **Implementation feasibility:** new custom Scene is **proposed**, self-contained and prop-free. Existing generic `scene` Resource rendering does not establish this component. No runtime data, Question, Quiz or Note event is supplied here.

## CUSTOM SCENE SPECIFICATIONS

- [Equal-Tick Trail](./scenes/equalTickTrail.scene-spec.md) — independently initialised concrete explanation and contrast.
- [Between the Ticks](./scenes/betweenTheTicks.scene-spec.md) — independently initialised transfer with new numbers/representation.

Both Scenes are **proposed**, distinct and prop-free. Each is represented by one typed `scene` Resource in an otherwise single-column Section; no new Section type, imaginary mode prop, generated image, fake API, scoring or React component is authored.

## LESSON NOTES — UNLOCKED RECALL CUES (PLANNED)

1. **after the first equal-interval traverse:** “On a number line, each neighboring whole-number tick is one equal unit apart.” — proposed after the model is examined and its explanation is available, without requiring a correct score. **Planned, not wired.**
2. **after the between-numbers transfer:** “Between two numbers means the whole numbers greater than the first and less than the second.” — proposed after the model is examined and its explanation is available, without requiring a correct score. **Planned, not wired.**

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
| Equal-Tick Trail and Between the Ticks                        | **Proposed** Scene specifications only            | Editor approval, separate Scene design, implementation and own tests |
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
