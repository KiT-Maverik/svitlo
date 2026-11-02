# Swap the Addends, Keep the Sum — Content

Status: Draft — provisional Screenwriter draft pending Methodologist Brief approval
Target Lesson: learningApps/playground/Data/Lessons/1/additionCommutative/
Audience: Primary **Grade 2**. Prerequisites: Count and add two groups to at least 12; identify addends and sum; recognize that two separate groups can be counted in either order. AdditionMeaning is useful but a Program prerequisite is not hard-coded.
Methodologist source: [Methodologist Brief](./methodologist-brief.md) (Draft; not approved)
Target Skill: `commutativeAddition.data.ts` from the linked canonical Skill in the Brief
Program dependence: None

## INSTRUCTIONAL CONCEPT

Help the learner discover and justify that swapping addends changes their order, not the total: a+b=b+a. Use two clearly bounded disjoint collections that are counted once, first in one order then the other. Distinguish reordering from physically adding more counters.

The commutative property holds for addition: a+b=b+a. For children use nonnegative whole-number addends and totals ≤20: 3+5=5+3=8, 4+7=7+4=11, and a comparison 3+6=9. A change in temporal order can change a story's wording, but not the arithmetic total of the two quantities. Do not imply commutativity of subtraction, or introduce negative-number examples.

The experience must teach the _reason for the mathematical rule_ through inspectable quantities and controlled transformations, never through purely visual validation or a decontextualized quiz.

## LEARNER JOURNEY

1. **Count Both Groups.** Show separate trays with exactly 3 and 5 countable objects, names 'first tray three' and 'second tray five'; count 3 then 5, finishing at eight.
2. **Put Five First.** A learner-selected 'Swap order' button switches the expression 3+5 to 5+3 and reading order of tray descriptions while leaving the underlying eight counter IDs unchanged.
3. **Swap or Change a Quantity?.** Offer two explicit actions: 'Swap the two groups' gives 5+3=8; 'Add one to the second group' gives 3+6=9. Read an ordered ledger describing whether object count changed.
4. **A New Pair: Four and Seven.** Display 4+7 as two trays, 11 distinct counters. Before showing result ask predicted sum and swap; reveal both 4+7=11 and 7+4=11 through same counter IDs.

## SECTION PLAN

### Section 1 — Count Both Groups

**Purpose / learner outcome:** Count two disjoint groups in either order and justify that 3+5 and 5+3 both equal eight.

**Ordered Resource blocks in one vertical LessonSection_Config:**

1. **text — renderer supported:** “One tray holds three counters. Another holds five. How many are there in both?”
2. **scene — renderer supported, NEW custom Scene proposed:** [Addend Swap Workbench](./scenes/addendSwapWorkbench.scene-spec.md), entry 1. Show separate trays with exactly 3 and 5 countable objects, names 'first tray three' and 'second tray five'; count 3 then 5, finishing at eight.
3. **markdown — renderer supported:** “Three from one tray and five from the other make eight. These are the same eight objects whichever tray we count first.” Mathematical statement: **3 + 5 = 8**.

**Meaningful learner action:** Show separate trays with exactly 3 and 5 countable objects, names 'first tray three' and 'second tray five'; count 3 then 5, finishing at eight. Learner can inspect the same countable objects and the ordered number ledger; explanations do not require guessing or scoring.

**Feedback on misconception:** An answer of five counts one tray only; an answer of nine double-counts an object. Highlight all eight once with a count ledger.

**Model and numeric invariants:** Reordering 3/5 or 4/7 changes expression order and reading labels ONLY, never counter cardinality. A value-change action from 3+5 to 3+6 adds exactly one counter and changes total from eight to nine. Scene must not change the problem statement to make a wrong choice look correct.

**Navigation:** Offer replay/reveal then a next prediction, with no mastery gate.

**Accessibility/localization/RTL:** Every object quantity, intermediate numerical step, button label and response appears in genuinely translated accessible text; native keyboard/switch/touch actions, correct operand order under RTL and reduced motion.

**Proposed unlocked Note:** No new Note; focus on observation.

**Implementation dependencies:** Proposed self-contained prop-free entry, no new resource type, Quiz config, invented Note event or scoring state.

### Section 2 — Put Five First

**Purpose / learner outcome:** State which values swapped places and what remained unchanged, using the term addends after concrete exploration.

**Ordered Resource blocks in one vertical LessonSection_Config:**

1. **text — renderer supported:** “What if we count the five first and the three second? Did any counters arrive?”
2. **scene — renderer supported, NEW custom Scene proposed:** [Addend Swap Workbench](./scenes/addendSwapWorkbench.scene-spec.md), entry 2. A learner-selected 'Swap order' button switches the expression 3+5 to 5+3 and reading order of tray descriptions while leaving the underlying eight counter IDs unchanged.
3. **markdown — renderer supported:** “Five plus three also equals eight. We swapped which addend came first, not how many objects we had.” Mathematical statement: **5 + 3 = 8**.

**Meaningful learner action:** A learner-selected 'Swap order' button switches the expression 3+5 to 5+3 and reading order of tray descriptions while leaving the underlying eight counter IDs unchanged. Learner can inspect the same countable objects and the ordered number ledger; explanations do not require guessing or scoring.

**Feedback on misconception:** If the learner predicts ten, show no counters were duplicated; if three, show both groups still count.

**Model and numeric invariants:** Reordering 3/5 or 4/7 changes expression order and reading labels ONLY, never counter cardinality. A value-change action from 3+5 to 3+6 adds exactly one counter and changes total from eight to nine. Scene must not change the problem statement to make a wrong choice look correct.

**Navigation:** Offer replay/reveal then a next prediction, with no mastery gate.

**Accessibility/localization/RTL:** Every object quantity, intermediate numerical step, button label and response appears in genuinely translated accessible text; native keyboard/switch/touch actions, correct operand order under RTL and reduced motion.

**Proposed unlocked Note:** “Swapping two addends keeps their sum the same.”, proposed once the corresponding mathematical model and reasoning are presented; planned only.

**Implementation dependencies:** Proposed self-contained prop-free entry, no new resource type, Quiz config, invented Note event or scoring state.

### Section 3 — Swap or Change a Quantity?

**Purpose / learner outcome:** Contrast swapping factors/addends with altering a quantity; see that 3+6 differs from 3+5.

**Ordered Resource blocks in one vertical LessonSection_Config:**

1. **text — renderer supported:** “Compare swapping 3 and 5 with changing the five into six. Which action keeps the sum?”
2. **scene — renderer supported, NEW custom Scene proposed:** [Addend Swap Workbench](./scenes/addendSwapWorkbench.scene-spec.md), entry 3. Offer two explicit actions: 'Swap the two groups' gives 5+3=8; 'Add one to the second group' gives 3+6=9. Read an ordered ledger describing whether object count changed.
3. **markdown — renderer supported:** “Swapping the addends keeps the total eight. Adding one more object makes nine; that is not only a swap.” Mathematical statement: **3 + 5 = 5 + 3 = 8; 3 + 6 = 9**.

**Meaningful learner action:** Offer two explicit actions: 'Swap the two groups' gives 5+3=8; 'Add one to the second group' gives 3+6=9. Read an ordered ledger describing whether object count changed. Learner can inspect the same countable objects and the ordered number ledger; explanations do not require guessing or scoring.

**Feedback on misconception:** If the child says all changes keep eight, show the new ninth dot in the changed-quantity case. Swapping no dot is newly added.

**Model and numeric invariants:** Reordering 3/5 or 4/7 changes expression order and reading labels ONLY, never counter cardinality. A value-change action from 3+5 to 3+6 adds exactly one counter and changes total from eight to nine. Scene must not change the problem statement to make a wrong choice look correct.

**Navigation:** Offer replay/reveal then a next prediction, with no mastery gate.

**Accessibility/localization/RTL:** Every object quantity, intermediate numerical step, button label and response appears in genuinely translated accessible text; native keyboard/switch/touch actions, correct operand order under RTL and reduced motion.

**Proposed unlocked Note:** “Changing a number changes the problem; swapping only changes the order.”, proposed once the corresponding mathematical model and reasoning are presented; planned only.

**Implementation dependencies:** Proposed self-contained prop-free entry, no new resource type, Quiz config, invented Note event or scoring state.

### Section 4 — A New Pair: Four and Seven

**Purpose / learner outcome:** Use a fresh model to find 4+7 and 7+4 and explain why both equal eleven.

**Ordered Resource blocks in one vertical LessonSection_Config:**

1. **text — renderer supported:** “Four counters plus seven makes how many? Will seven plus four have the same total?”
2. **scene — renderer supported, NEW custom Scene proposed:** [Addend Swap Workbench](./scenes/addendSwapWorkbench.scene-spec.md), entry 4. Display 4+7 as two trays, 11 distinct counters. Before showing result ask predicted sum and swap; reveal both 4+7=11 and 7+4=11 through same counter IDs.
3. **markdown — renderer supported:** “There are eleven counters in both orders. We can choose whichever addend to count first; the sum is eleven.” Mathematical statement: **4 + 7 = 7 + 4 = 11**.

**Meaningful learner action:** Display 4+7 as two trays, 11 distinct counters. Before showing result ask predicted sum and swap; reveal both 4+7=11 and 7+4=11 through same counter IDs. Learner can inspect the same countable objects and the ordered number ledger; explanations do not require guessing or scoring.

**Feedback on misconception:** Ten omits a counter, twelve double-counts one. A stepwise count shows four then seven with complete total.

**Model and numeric invariants:** Reordering 3/5 or 4/7 changes expression order and reading labels ONLY, never counter cardinality. A value-change action from 3+5 to 3+6 adds exactly one counter and changes total from eight to nine. Scene must not change the problem statement to make a wrong choice look correct.

**Navigation:** Conclude with an optional short explanation in a selected sentence, optional written reply or speech to a nearby adult (no speech recognition). No scored result.

**Accessibility/localization/RTL:** Every object quantity, intermediate numerical step, button label and response appears in genuinely translated accessible text; native keyboard/switch/touch actions, correct operand order under RTL and reduced motion.

**Proposed unlocked Note:** “Swapping two addends keeps their sum the same.”, proposed once the corresponding mathematical model and reasoning are presented; planned only.

**Implementation dependencies:** Proposed self-contained prop-free entry, no new resource type, Quiz config, invented Note event or scoring state.

## CUSTOM SCENE SPECIFICATIONS

- [Addend Swap Workbench](./scenes/addendSwapWorkbench.scene-spec.md): four independently initialized prop-free Scene entries. Generic `scene` Resource rendering is available; the specific component does not yet exist.

## LESSON NOTES — UNLOCKED RECALL CUES (PLANNED)

1. “Swapping two addends keeps their sum the same.” — available only after the child encounters and can inspect the complete relevant explanation; not a correctness gate.
2. “Changing a number changes the problem; swapping only changes the order.” — available only after the child encounters and can inspect the complete relevant explanation; not a correctness gate.

Notes are future product intent, **not wired**. No Note type, unlock API, learner persistence, revision sheet, spaced schedule or mastery evidence is assumed.

## PRACTICE, RETRIEVAL AND ASSESSMENT HANDOFF

Display 4+7 as two trays, 11 distinct counters. Before showing result ask predicted sum and swap; reveal both 4+7=11 and 7+4=11 through same counter IDs. The transfer checks ability to apply the relationship in a changed context but is still **formative Scene teaching**. Assessment Architect must separately validate scored items, correct alternatives, grade-appropriate variants, Skill attribution and mastery criteria. The current Quiz adapter's select-one capability is not an implementation of these Scenes.

## GLOBAL ACCESSIBILITY AND LOCALIZATION

Genuine translation of every learner prompt, count, hint, feedback, control, status announcement and Note for all supported locales; no silent English fallback. Each image-like group/counter interaction has an equally OPERABLE ordered text state list and native keyboard/switch/touch buttons. Semantic RTL math maintains original operand positions; never geometrically mirror into a different operation. Large targets, visible focus, 200% zoom, responsive mobile, reduced-motion instantaneous numerical changes, WCAG 2.2 AA and complete offline deterministic feedback after content/locale download. Avoid color-only, drag-only, animation-only, sound-only, remote checker and compulsory writing/speech.

## PRODUCTION / PLATFORM DEPENDENCIES

Current general LessonSection_Config renderer supports ordered `text`, `markdown`, and `scene` resources. Addend Swap Workbench is proposed and needs editor approval, prop-free implementation, locale context and Scene tests. Image/audio/video/code Resource types are not generically rendered and no YouTube config exists; none used. Notes, periodic review, true PWA download and sync require separate work; no fake APIs or scored data created.

## EDITORIAL SOURCES AND OPEN QUESTIONS

- [Methodologist Brief](./methodologist-brief.md), Draft; editor approval pending.
- Canonical linked `commutativeAddition.data.ts`; shared generated taxonomy is coordinator-owned and not edited on this branch.
- [Create Lesson Content](../../../../../../studio/skills/lesson-workflow/create-lesson-content.skill.md).
- Avoid repeating an array-rotation example, which belongs to multiplication commutativity. This lesson concerns addition with two actual disjoint quantities and preserves their interpretation.

## HANDOFF

A **provisional Draft** Content document and separately reviewable Draft Scene spec. Editor must approve the Methodologist Brief before promoting content, then approve Content/Scene independently. Design Scene/Coding Agent/Assessment Architect proceed only through their own authorization. No runtime Lesson, scored Question or additional Skill identity in this deliverable.
