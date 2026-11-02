# Five in Every Pack: Count by Fives — Content

Status: **Provisional Draft — pending Methodologist approval**
Target Lesson: `learningApps/playground/Data/Lessons/1/countByFivesWithGroups/`
Audience: Grade 2; Grade 2 after grouped counting by twos and a concrete tens-and-ones representation. Reading two-digit numbers 25 and 30 is supported by the exact number-of-groups and objects; no assumed multiplication fluency.
Methodologist source: [Methodologist Brief](./methodologist-brief.md) (**Draft; not approved**)
Target Skills: exactly the canonical source-file links in the Brief (not redefined or copied here)
Program dependence: None
Runtime Lesson / Scene implementation: Not implemented

## INSTRUCTIONAL CONCEPT

Count groups that each contain exactly five objects by repeated addition of five, while distinguishing complete groups, group count and item total. Reject a claim of +5 if a group has only four.

**What must become clear:** Each completed pack contains five **distinct** objects. After k complete packs the number of items is 5k, while there are only k packs. Starting from zero, successive completed packs yield 5,10,15,20,25,30 for one through six packs. Three packs have fifteen items; four packs twenty; six packs thirty. A pack of four is not a complete five-item pack: two complete packs plus one four-item group total 5+5+4=14, not 15, and cannot be called three full packs of five. Numerical increments of five correspond to adding a **whole** five-item group each time. This is a specific counting strategy, not an inference task about an arbitrary number pattern.

**Pedagogical premise:** A learner is not merely recognizing a displayed fact. The first interactive Scene gives control over a concrete model and exposes a critical contrast. A compact explanatory/reflection Section invites retrieval and makes errors understandable. The second Scene independently changes the numbers or representation, so successful reasoning requires applying the mathematical rule rather than reproducing the original picture. Every key feedback branch explains _why_ an answer differs from the model.

## LEARNER JOURNEY

1. **Notice and predict:** “Add one, two and three strips. How many dots do you have after each?” The learner selects a possible result and then operates the first model without mandatory score, narration or timer.
2. **Manipulate and inspect:** 1 strip=5, 2=10, 3=15 dots. 5,10,15,20,25,30: repeated +5 for complete strips. Both a simple visual model and an accessible item/number ledger show the same mathematics.
3. **Explain and retrieve:** There are four strips with five dots on each. How many strips and how many dots? Invite a spoken, private or accessible text-based explanation before reading the worked answer.
4. **Transfer independently:** Five boxes have five crayons each. How many crayons? What if a sixth box arrives? A different representation offers a new reasoned problem, with misconception-targeted feedback and an optional full reveal.
5. **Summarize for future recall:** a short proposed Note captures the enduring idea without attempting to assess mastery or create a persistent unlocked event.

## SECTION PLAN

### Section 1 — Five-Strip Builder

- **Learning purpose:** Make the fixed five-unit increment tangible through complete repeatable strips and two labelled totals.
- **Actual Section shape:** `LessonSection_Config` with one ordered nonempty vertical Resource list. This is not a `Quiz_Config` or a novel specialized discriminator.
- **Ordered content blocks, top to bottom:**
  1. **`text` — existing generic renderer:** “Add one, two and three strips. How many dots do you have after each?”
  2. **`scene` — generic type exists, **specific Scene proposed**:** [Five-Strip Builder](./scenes/fiveStripBuilder.scene-spec.md). Empty table with button Add Complete Strip. Each strip contains exactly five distinguishable dots as a bounded group. Capacity six strips but initial guided steps stop at four. Two ledgers: number of strips and total dots.
  3. **`markdown` — existing generic renderer:** “Three strips contain fifteen dots, not three dots. 1 strip=5, 2=10, 3=15 dots.”
- **Learner action and responsive feedback:**

**Beat 1 — “Add one, two and three strips. How many dots do you have after each?”** Add three complete five-dot strips and inspect the ledger 5,10,15.

**Learner-visible result:** Three strips contain fifteen dots, not three dots.

**Worked numerical evidence:** 1 strip=5, 2=10, 3=15 dots.

**Feedback for a plausible misconception:** For three, show that a strip is a group and display five separate members in each of three groups.

Learner may replay this beat, inspect an ordered explanation, and reset without score or correctness lock.

**Beat 2 — “Add a fourth strip. What is the new total? Can you continue to six?”** Add strip four to reach 20, then optionally strips five and six to reach 25 and 30, each with a full five-dot group.

**Learner-visible result:** Four full strips have twenty dots, five have twenty-five and six have thirty.

**Worked numerical evidence:** 5,10,15,20,25,30: repeated +5 for complete strips.

**Feedback for a plausible misconception:** For 21 after the fourth strip, show exactly five additional dots after the previous fifteen: 15+5=20. For 24 on strip five, show 20+5=25.

Learner may replay this beat, inspect an ordered explanation, and reset without score or correctness lock.

- **Controls and accessibility:** Add complete strip; Remove last strip; Inspect each strip's five items; Predict total; Reveal repeated +5 ledger; Reset. Each group is a named strip with five listed dot IDs, independent of color or pattern. Two clearly distinct readouts ('strips' and 'dots'); keyboard button adds exactly five and announces the full numeric update.
- **Cause-and-effect explanation:** Complete strip IDs with five uniquely identified dot IDs each, count of complete strips k, total=5×k, ledger of increments, prediction, reveal/reset. No partial strips in this first workbench. No passive animation is required to retrieve the answer; every result is accompanied by object, tick, sign or group evidence.
- **Boundary reasoning:** Adding a full strip always means exactly five new member IDs. No model may create a seventh strip in the bounded activity; explain the displayed range rather than wrapping counter to zero.
- **Navigation and transition:** After inspecting the principle in this Scene, ask for a prediction about the next, changed-context representation. A child can request a worked model and advance without a mastery gate.
- **Implementation feasibility:** new custom Scene is **proposed**, self-contained and prop-free. Existing generic `scene` Resource rendering does not establish this component. No runtime data, Question, Quiz or Note event is supplied here.

### Section 2 — Four Packs Are Not Four Objects

- **Purpose and expected learner thinking:** Distinguish the mathematical invariant from a familiar but misleading shortcut; retrieve a rule without a score.
- **Current implementation shape:** `LessonSection_Config`, a single vertical content column (no Quiz).
- **Ordered content blocks:**
  1. **`text` — existing renderer:** “There are four strips with five dots on each. How many strips and how many dots?”
  2. **`markdown` — existing renderer:** “Four strips, but twenty dots altogether. Count the five dots added by each strip: 5,10,15,20. The group count (four) is different from the total count (twenty).”
  3. **`markdown` — existing renderer:** “If the last strip has just four dots, you must count those four. The total then is 5+5+5+4=19, not 20.”
- **Meaningful feedback:** The example explicitly contrasts the likely mistaken response with a countable or numeric explanation. Child may reason before reading; current `text`/`markdown` renderers are **not** claimed to provide a delayed-answer or true-response validation widget.
- **Accessibility and pacing:** Brief accessible written language, no sensory dependency. The explanatory text remains available to every learner and is never hidden behind a timed action.
- **Transition:** Section 3 changes numbers or objects and asks for independent reasoning. The first Scene's state is not carried into the second.

### Section 3 — Five-Pack Transfer

- **Learning purpose:** Apply equal-five grouping in a new crayon-box setting, then identify the false shortcut when a group has four instead of five.
- **Actual Section shape:** `LessonSection_Config` with one ordered nonempty vertical Resource list. This is not a `Quiz_Config` or a novel specialized discriminator.
- **Ordered content blocks, top to bottom:**
  1. **`text` — existing generic renderer:** “Five boxes have five crayons each. How many crayons? What if a sixth box arrives?”
  2. **`scene` — generic type exists, **specific Scene proposed**:** [Five-Pack Transfer](./scenes/fivePackTransfer.scene-spec.md). Five sealed crayon boxes with a visible label '5 crayons in each', and a sixth box that can be added. Separate preset has two complete groups of 5 stickers and one intentionally incomplete group of four stickers, all labels and identities visible.
  3. **`markdown` — existing generic renderer:** “Five boxes contain twenty-five crayons; six boxes contain thirty. 5 groups of 5=25; 6 groups of 5=30.”
- **Learner action and responsive feedback:**

**Beat 1 — “Five boxes have five crayons each. How many crayons? What if a sixth box arrives?”** Inspect five complete packs and read 5,10,15,20,25; add the sixth complete five-crayon pack to see 30.

**Learner-visible result:** Five boxes contain twenty-five crayons; six boxes contain thirty.

**Worked numerical evidence:** 5 groups of 5=25; 6 groups of 5=30.

**Feedback for a plausible misconception:** If five or six chosen as the total, distinguish box count from crayon count. For 26 after new pack, show the five additional crayons: 25+5=30.

Learner may replay this beat, inspect an ordered explanation, and reset without score or correctness lock.

**Beat 2 — “Two boxes have five stickers each, but the third has only four. Is that 15 stickers?”** Count complete first and second groups as 5+5=10 and inspect the third group's four members; total 14, not 15.

**Learner-visible result:** Ten plus four equals fourteen. The short group cannot advance a full +5 step.

**Worked numerical evidence:** 5+5+4=14, whereas 5+5+5=15.

**Feedback for a plausible misconception:** If 15 selected, display the third group's missing fifth place, but do not count an empty place as a sticker. Explain the incomplete group's actual four items.

Learner may replay this beat, inspect an ordered explanation, and reset without score or correctness lock.

- **Controls and accessibility:** Add sixth full box; Show box contents; Predict item total; Switch to incomplete-pack preset; Reveal summed item ledger; Reset. A fully accessible box contents list gives exact item identities; the learner can compare 5 and 4 counts without seeing graphics. Independent controls per preset; RTL does not change numeric sums.
- **Cause-and-effect explanation:** Independent preset (six-pack crayon counting or partial-pack contrast); each box has immutable actual member count (5 or 4). Total derived from all individual values; number of complete five packs reported separately from overall groups. No passive animation is required to retrieve the answer; every result is accompanied by object, tick, sign or group evidence.
- **Boundary reasoning:** Empty display slots are not objects. A drawn pack label is never an authority to count five when the actual group has only four. Do not invent virtual/fractional member to complete a short group.
- **Navigation and transition:** After inspecting the principle in this Scene, ask for a prediction about the next, changed-context representation. A child can request a worked model and advance without a mastery gate.
- **Implementation feasibility:** new custom Scene is **proposed**, self-contained and prop-free. Existing generic `scene` Resource rendering does not establish this component. No runtime data, Question, Quiz or Note event is supplied here.

## CUSTOM SCENE SPECIFICATIONS

- [Five-Strip Builder](./scenes/fiveStripBuilder.scene-spec.md) — independently initialised concrete explanation and contrast.
- [Five-Pack Transfer](./scenes/fivePackTransfer.scene-spec.md) — independently initialised transfer with new numbers/representation.

Both Scenes are **proposed**, distinct and prop-free. Each is represented by one typed `scene` Resource in an otherwise single-column Section; no new Section type, imaginary mode prop, generated image, fake API, scoring or React component is authored.

## LESSON NOTES — UNLOCKED RECALL CUES (PLANNED)

1. **after counting complete groups:** “Each new full pack of five adds five objects to the total.” — proposed after the model is examined and its explanation is available, without requiring a correct score. **Planned, not wired.**
2. **after explaining the incomplete pack:** “A short pack does not count as five: count its actual objects.” — proposed after the model is examined and its explanation is available, without requiring a correct score. **Planned, not wired.**

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
| Five-Strip Builder and Five-Pack Transfer                     | **Proposed** Scene specifications only            | Editor approval, separate Scene design, implementation and own tests |
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
