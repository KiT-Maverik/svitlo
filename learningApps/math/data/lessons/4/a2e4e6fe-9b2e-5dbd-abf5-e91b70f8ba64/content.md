# Two at a Time: Counting Pairs — Content

Status: **Provisional Draft — pending Methodologist approval**
Target Lesson: `learningApps/playground/Data/Lessons/1/countByTwosWithPairs/`
Audience: Grade 2; Grade 2 learners who can make separate pairs, identify odd and even using leftovers, and count through twenty. Support is concrete and slow enough that multiplication symbols or arithmetic fact fluency are unnecessary.
Methodologist source: [Methodologist Brief](./methodologist-brief.md) (**Draft; not approved**)
Target Skills: exactly the canonical source-file links in the Brief (not redefined or copied here)
Program dependence: None
Runtime Lesson / Scene implementation: Not implemented

## INSTRUCTIONAL CONCEPT

Skip-count by two as repeated addition of equal pairs of objects, explaining why the number of pairs and the number of individual objects differ. Understand that the start value matters for the resulting number sequence.

**What must become clear:** A pair contains exactly two items, so each additional separate pair increases the total number of items by two, while the count of pairs increases by one. Starting with zero objects and adding pairs gives totals 0,2,4,6,8,10: one pair has 2 objects, three pairs 6, five pairs 10. Six pairs contain 12 individual items; seven pairs contain 14. Counting by twos means repeated +2 and can also start at 1: one loose object plus successive pairs gives 1,3,5,7,9. Thus 'count by twos' does not mean every starting number is even; the start is a separate fact. Group count and item count are distinct.

**Pedagogical premise:** A learner is not merely recognizing a displayed fact. The first interactive Scene gives control over a concrete model and exposes a critical contrast. A compact explanatory/reflection Section invites retrieval and makes errors understandable. The second Scene independently changes the numbers or representation, so successful reasoning requires applying the mathematical rule rather than reproducing the original picture. Every key feedback branch explains _why_ an answer differs from the model.

## LEARNER JOURNEY

1. **Notice and predict:** “Add one pair at a time. What totals do you see after one, two, three pairs?” The learner selects a possible result and then operates the first model without mandatory score, narration or timer.
2. **Manipulate and inspect:** 3 pairs, 6 mittens; 2→4→6. 4 pairs=8; 5 pairs=10. Both a simple visual model and an accessible item/number ledger show the same mathematics.
3. **Explain and retrieve:** A table has four pairs of mittens. Does that mean four mittens or eight mittens? Invite a spoken, private or accessible text-based explanation before reading the worked answer.
4. **Transfer independently:** Six pairs of socks are on a shelf. Without counting every sock, how many socks? Add one more pair. A different representation offers a new reasoned problem, with misconception-targeted feedback and an optional full reveal.
5. **Summarize for future recall:** a short proposed Note captures the enduring idea without attempting to assess mastery or create a persistent unlocked event.

## SECTION PLAN

### Section 1 — Pair-Step Workbench

- **Learning purpose:** Make +2 observable as the consequence of adding one distinct pair and retain separate counters for pairs and individual objects.
- **Actual Section shape:** `LessonSection_Config` with one ordered nonempty vertical Resource list. This is not a `Quiz_Config` or a novel specialized discriminator.
- **Ordered content blocks, top to bottom:**
  1. **`text` — existing generic renderer:** “Add one pair at a time. What totals do you see after one, two, three pairs?”
  2. **`scene` — generic type exists, **specific Scene proposed**:** [Pair-Step Workbench](./scenes/pairStepWorkbench.scene-spec.md). Empty workbench with pair shelf; a new-pair action produces two separately named mittens joined as pair 1, pair 2, etc., up to five pairs. Two ledgers show number of pairs and total individual mittens.
  3. **`markdown` — existing generic renderer:** “After three groups of two, there are six individual mittens. 3 pairs, 6 mittens; 2→4→6.”
- **Learner action and responsive feedback:**

**Beat 1 — “Add one pair at a time. What totals do you see after one, two, three pairs?”** Add pairs 1,2,3; observe totals 2,4,6. Compare groups count 3 with item count 6.

**Learner-visible result:** After three groups of two, there are six individual mittens.

**Worked numerical evidence:** 3 pairs, 6 mittens; 2→4→6.

**Feedback for a plausible misconception:** If three objects is predicted, point to two individual members in each of three distinct groups: 2+2+2.

Learner may replay this beat, inspect an ordered explanation, and reset without score or correctness lock.

**Beat 2 — “Keep adding until you have five pairs. How many mittens now?”** Add pair 4 then pair 5, advancing total 8 then 10 without recounting from the first mitten.

**Learner-visible result:** Five pairs have ten mittens; each addition increased total by two.

**Worked numerical evidence:** 4 pairs=8; 5 pairs=10.

**Feedback for a plausible misconception:** If nine is predicted, count the last pair's two members added to the earlier eight: 8+2=10.

Learner may replay this beat, inspect an ordered explanation, and reset without score or correctness lock.

- **Controls and accessibility:** Add one full pair; Remove last pair; Predict next object total; Reveal per-pair ledger; Reset. The two ledgers are separately labelled 'number of pairs' and 'number of mittens'. Announce 'pair 4 added, two mittens, total eight' without color-only markers; keyboard and switch add a whole pair without dragging.
- **Cause-and-effect explanation:** List of complete disjoint pair IDs, exactly two child object IDs per pair, totalItems = 2×pairCount, current prediction, step log and reset. Adding a pair increments pairCount by 1 and itemCount by 2; no loose mittens in this first Scene. No passive animation is required to retrieve the answer; every result is accompanied by object, tick, sign or group evidence.
- **Boundary reasoning:** A pair cannot be partially added or contain three objects; Add Pair is the only quantity-increasing action. A child may inspect individual members whenever wanted; source pair/member IDs must remain unique.
- **Navigation and transition:** After inspecting the principle in this Scene, ask for a prediction about the next, changed-context representation. A child can request a worked model and advance without a mastery gate.
- **Implementation feasibility:** new custom Scene is **proposed**, self-contained and prop-free. Existing generic `scene` Resource rendering does not establish this component. No runtime data, Question, Quiz or Note event is supplied here.

### Section 2 — Pairs Are Not Single Objects

- **Purpose and expected learner thinking:** Distinguish the mathematical invariant from a familiar but misleading shortcut; retrieve a rule without a score.
- **Current implementation shape:** `LessonSection_Config`, a single vertical content column (no Quiz).
- **Ordered content blocks:**
  1. **`text` — existing renderer:** “A table has four pairs of mittens. Does that mean four mittens or eight mittens?”
  2. **`markdown` — existing renderer:** “Eight mittens. There are four **groups** and each group contains **two**. Count by two: 2, 4, 6, 8. The number of pairs (four) and the number of mittens (eight) answer different questions.”
  3. **`markdown` — existing renderer:** “A sequence that begins at one may still add two each time: one loose mitten, then 3, 5 and 7 after whole pairs are added.”
- **Meaningful feedback:** The example explicitly contrasts the likely mistaken response with a countable or numeric explanation. Child may reason before reading; current `text`/`markdown` renderers are **not** claimed to provide a delayed-answer or true-response validation widget.
- **Accessibility and pacing:** Brief accessible written language, no sensory dependency. The explanatory text remains available to every learner and is never hidden behind a timed action.
- **Transition:** Section 3 changes numbers or objects and asks for independent reasoning. The first Scene's state is not carried into the second.

### Section 3 — Two-Step Transfer

- **Learning purpose:** Transfer +2 grouping to a novel setting with more groups, then contrast a starting amount of one with adding groups of two.
- **Actual Section shape:** `LessonSection_Config` with one ordered nonempty vertical Resource list. This is not a `Quiz_Config` or a novel specialized discriminator.
- **Ordered content blocks, top to bottom:**
  1. **`text` — existing generic renderer:** “Six pairs of socks are on a shelf. Without counting every sock, how many socks? Add one more pair.”
  2. **`scene` — generic type exists, **specific Scene proposed**:** [Two-Step Transfer](./scenes/twoStepTransfer.scene-spec.md). Challenge 1: six separately numbered two-object pairs of socks, one more pair can be added (seven pairs). Challenge 2: one loose bead and separate two-bead strips; up to four whole strips can be added.
  3. **`markdown` — existing generic renderer:** “Six pairs contain twelve socks; seven pairs contain fourteen. 6×2=12; (6+1) pairs=14 socks, represented through repeated +2.”
- **Learner action and responsive feedback:**

**Beat 1 — “Six pairs of socks are on a shelf. Without counting every sock, how many socks? Add one more pair.”** Inspect six pair labels, apply 2,4,6,8,10,12, then add pair seven to show 14 socks.

**Learner-visible result:** Six pairs contain twelve socks; seven pairs contain fourteen.

**Worked numerical evidence:** 6×2=12; (6+1) pairs=14 socks, represented through repeated +2.

**Feedback for a plausible misconception:** If six or seven socks chosen, distinguish pairs from individual socks and enumerate 2 for each complete pair.

Learner may replay this beat, inspect an ordered explanation, and reset without score or correctness lock.

**Beat 2 — “Start with one loose bead. Add pairs of beads. What totals do you visit?”** Keep the single initial bead fixed and add four two-bead strips one at a time. Read 1,3,5,7,9.

**Learner-visible result:** The total always rises by two even though all displayed totals are odd.

**Worked numerical evidence:** 1→3→5→7→9: step +2 with initial 1.

**Feedback for a plausible misconception:** If even totals predicted because the jump is two, distinguish the one loose starting bead from each later pair; 1+2=3.

Learner may replay this beat, inspect an ordered explanation, and reset without score or correctness lock.

- **Controls and accessibility:** Choose scenario; Add one group of two; Inspect total count and group count; Predict; Reveal; Reset. Ordered ledger names preset start, group count, item count and every +2 increase. Equivalent keyboard actions and meaningful numeric labels work in both LTR/RTL without requiring visual grouping.
- **Cause-and-effect explanation:** Selected preset (sock pairs or one loose bead plus strips); immutable start amount 0 for sock preset or 1 for bead preset, count of whole two-item groups and total=start+2×groups. Independent prediction, explanation and local reset. No passive animation is required to retrieve the answer; every result is accompanied by object, tick, sign or group evidence.
- **Boundary reasoning:** A +2 step never discards the one starting bead; sock challenge cannot silently count pair units as individual units; switching presets resets only the transfer Scene.
- **Navigation and transition:** After inspecting the principle in this Scene, ask for a prediction about the next, changed-context representation. A child can request a worked model and advance without a mastery gate.
- **Implementation feasibility:** new custom Scene is **proposed**, self-contained and prop-free. Existing generic `scene` Resource rendering does not establish this component. No runtime data, Question, Quiz or Note event is supplied here.

## CUSTOM SCENE SPECIFICATIONS

- [Pair-Step Workbench](./scenes/pairStepWorkbench.scene-spec.md) — independently initialised concrete explanation and contrast.
- [Two-Step Transfer](./scenes/twoStepTransfer.scene-spec.md) — independently initialised transfer with new numbers/representation.

Both Scenes are **proposed**, distinct and prop-free. Each is represented by one typed `scene` Resource in an otherwise single-column Section; no new Section type, imaginary mode prop, generated image, fake API, scoring or React component is authored.

## LESSON NOTES — UNLOCKED RECALL CUES (PLANNED)

1. **after showing five pairs and their objects:** “Each new pair adds two objects. Five pairs contain ten objects.” — proposed after the model is examined and its explanation is available, without requiring a correct score. **Planned, not wired.**
2. **after the one-loose-object transfer:** “Counting by twos always adds two; the first amount can still be odd.” — proposed after the model is examined and its explanation is available, without requiring a correct score. **Planned, not wired.**

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
| Pair-Step Workbench and Two-Step Transfer                     | **Proposed** Scene specifications only            | Editor approval, separate Scene design, implementation and own tests |
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
