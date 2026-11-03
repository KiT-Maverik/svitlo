# Make Ten First — Content

Status: Draft — provisional Screenwriter draft pending Methodologist Brief approval
Target Lesson: learningApps/playground/Data/Lessons/1/additionMakeTen/
Audience: Primary **Grade 2**. Prerequisites: Understand ten as a full ten-frame, number complements to ten (such as 8 needs 2), addition within ten, and decomposition of five into two plus three; no written column algorithm required.
Methodologist source: [Methodologist Brief](./methodologist-brief.md) (Draft; not approved)
Target Skill: `makeTenStrategy.data.ts` from the linked canonical Skill in the Brief
Program dependence: None

## INSTRUCTIONAL CONCEPT

Teach a strategically useful addition decomposition: split one addend so part fills the first addend to ten, then add the remainder. Use counter frames of ten, transparent part labels and the invariant that no counter is lost or added by regrouping. Demonstrate 8+5=8+2+3=13, then transfer to 9+6 and 7+6.

Use nonnegative whole-number examples with results at most 20. For 8+5, 8 needs 2 to reach 10, so 5 = 2+3 and 8+5 = (8+2)+3 = 10+3 =13. For 9+6, 9 needs 1 and 6=1+5, total 15. For 7+6, 7 needs 3 and 6=3+3, total 13. The decomposition and rearrangement preserve five/six exactly. Do not claim make-ten is the only valid mental strategy or teach the full associative law as the independent target.

The experience must teach the _reason for the mathematical rule_ through inspectable quantities and controlled transformations, never through purely visual validation or a decontextualized quiz.

## LEARNER JOURNEY

1. **How Much to Complete Ten?.** Show one ten-frame with eight occupied cells and two empty. Child selects 'Count empty places', fills precisely two when offered and labels full ten.
2. **Split Five Into Two and Three.** Show separate source tray of exactly five counters. 'Move two to frame' transfers two actual IDs into the last empty cells; remaining tray now visibly has THREE, not five.
3. **Now Add the Three Left.** Use separate visible full ten-frame (10) and remaining three counters; learner controls 'Add the three' while text shows original eight plus five unchanged across transformation.
4. **Use Ten on a Different Sum.** Two staged transfer problems: 9+6 uses 1 and 5, yielding 15; on explicit request, 7+6 uses 3 and 3, yielding 13. Child predicts then steps through frame/split/add or requests entire worked model.

## SECTION PLAN

### Section 1 — How Much to Complete Ten?

**Purpose / learner outcome:** Identify how many more counters are needed to fill a ten-frame when eight are shown.

**Ordered Resource blocks in one vertical LessonSection_Config:**

1. **text — renderer supported:** “Eight counters fill eight places in a ten-frame. How many places are empty?”
2. **scene — renderer supported, NEW custom Scene proposed:** [Ten Bridge Builder](./scenes/tenBridgeBuilder.scene-spec.md), entry 1. Show one ten-frame with eight occupied cells and two empty. Child selects 'Count empty places', fills precisely two when offered and labels full ten.
3. **markdown — renderer supported:** “Eight needs two more to make ten. The empty places tell us the exact number to take from the next addend.” Mathematical statement: **8 + 2 = 10**.

**Meaningful learner action:** Show one ten-frame with eight occupied cells and two empty. Child selects 'Count empty places', fills precisely two when offered and labels full ten. Learner can inspect the same countable objects and the ordered number ledger; explanations do not require guessing or scoring.

**Feedback on misconception:** A response of one leaves a visibly empty slot; three would exceed the ten-frame, so show only two positions remaining.

**Model and numeric invariants:** At all times, the number of counters in the filled original first-addend positions plus moved counters plus remaining source counters equals the original a+b. The number moved from second tray equals 10−a in the authored examples, never larger than second addend; remaining count equals b−(10−a). Scene must not change the problem statement to make a wrong choice look correct.

**Navigation:** Offer replay/reveal then a next prediction, with no mastery gate.

**Accessibility/localization/RTL:** Every object quantity, intermediate numerical step, button label and response appears in genuinely translated accessible text; native keyboard/switch/touch actions, correct operand order under RTL and reduced motion.

**Proposed unlocked Note:** No new Note; focus on observation.

**Implementation dependencies:** Proposed self-contained prop-free entry, no new resource type, Quiz config, invented Note event or scoring state.

### Section 2 — Split Five Into Two and Three

**Purpose / learner outcome:** Decompose five into two and three, make a full ten, then find 8+5=13 while conserving all counters.

**Ordered Resource blocks in one vertical LessonSection_Config:**

1. **text — renderer supported:** “We want to add five to eight. Can we give two to finish the ten and keep the other three?”
2. **scene — renderer supported, NEW custom Scene proposed:** [Ten Bridge Builder](./scenes/tenBridgeBuilder.scene-spec.md), entry 2. Show separate source tray of exactly five counters. 'Move two to frame' transfers two actual IDs into the last empty cells; remaining tray now visibly has THREE, not five.
3. **markdown — renderer supported:** “We used two of the five counters to complete the ten. Three of the same five remain to add later. We did not create any new counters.” Mathematical statement: **5 = 2 + 3; 8 + 2 = 10**.

**Meaningful learner action:** Show separate source tray of exactly five counters. 'Move two to frame' transfers two actual IDs into the last empty cells; remaining tray now visibly has THREE, not five. Learner can inspect the same countable objects and the ordered number ledger; explanations do not require guessing or scoring.

**Feedback on misconception:** If a learner tries to keep five in the tray after moving two, show that this would count seven contributions; the original added amount is only five.

**Model and numeric invariants:** At all times, the number of counters in the filled original first-addend positions plus moved counters plus remaining source counters equals the original a+b. The number moved from second tray equals 10−a in the authored examples, never larger than second addend; remaining count equals b−(10−a). Scene must not change the problem statement to make a wrong choice look correct.

**Navigation:** Offer replay/reveal then a next prediction, with no mastery gate.

**Accessibility/localization/RTL:** Every object quantity, intermediate numerical step, button label and response appears in genuinely translated accessible text; native keyboard/switch/touch actions, correct operand order under RTL and reduced motion.

**Proposed unlocked Note:** “Splitting an addend changes its parts, not its total.”, proposed once the corresponding mathematical model and reasoning are presented; planned only.

**Implementation dependencies:** Proposed self-contained prop-free entry, no new resource type, Quiz config, invented Note event or scoring state.

### Section 3 — Now Add the Three Left

**Purpose / learner outcome:** Explain why 8+2+3 and 8+5 have the same total and reject a decomposition that changes five.

**Ordered Resource blocks in one vertical LessonSection_Config:**

1. **text — renderer supported:** “Ten is full. Three counters are still waiting. How many counters altogether?”
2. **scene — renderer supported, NEW custom Scene proposed:** [Ten Bridge Builder](./scenes/tenBridgeBuilder.scene-spec.md), entry 3. Use separate visible full ten-frame (10) and remaining three counters; learner controls 'Add the three' while text shows original eight plus five unchanged across transformation.
3. **markdown — renderer supported:** “We started with eight and five: thirteen counters. The split let us make ten first, then add three. Nothing was lost or duplicated.” Mathematical statement: **8 + 5 = (8 + 2) + 3 = 10 + 3 = 13**.

**Meaningful learner action:** Use separate visible full ten-frame (10) and remaining three counters; learner controls 'Add the three' while text shows original eight plus five unchanged across transformation. Learner can inspect the same countable objects and the ordered number ledger; explanations do not require guessing or scoring.

**Feedback on misconception:** If the child answers fifteen, compare the original eight plus five against a nonexistent extra two; if twelve, count all three outside the full frame.

**Model and numeric invariants:** At all times, the number of counters in the filled original first-addend positions plus moved counters plus remaining source counters equals the original a+b. The number moved from second tray equals 10−a in the authored examples, never larger than second addend; remaining count equals b−(10−a). Scene must not change the problem statement to make a wrong choice look correct.

**Navigation:** Offer replay/reveal then a next prediction, with no mastery gate.

**Accessibility/localization/RTL:** Every object quantity, intermediate numerical step, button label and response appears in genuinely translated accessible text; native keyboard/switch/touch actions, correct operand order under RTL and reduced motion.

**Proposed unlocked Note:** “Fill the ten first, then add what is left.”, proposed once the corresponding mathematical model and reasoning are presented; planned only.

**Implementation dependencies:** Proposed self-contained prop-free entry, no new resource type, Quiz config, invented Note event or scoring state.

### Section 4 — Use Ten on a Different Sum

**Purpose / learner outcome:** Apply the make-ten strategy to 9+6=15 and 7+6=13 with hints if necessary.

**Ordered Resource blocks in one vertical LessonSection_Config:**

1. **text — renderer supported:** “Try nine plus six. How much makes ten? How many of the six remain? Then try seven plus six.”
2. **scene — renderer supported, NEW custom Scene proposed:** [Ten Bridge Builder](./scenes/tenBridgeBuilder.scene-spec.md), entry 4. Two staged transfer problems: 9+6 uses 1 and 5, yielding 15; on explicit request, 7+6 uses 3 and 3, yielding 13. Child predicts then steps through frame/split/add or requests entire worked model.
3. **markdown — renderer supported:** “Nine needs one to reach ten; six splits one and five, giving fifteen. Seven needs three; six splits three and three, giving thirteen. Use the same method, but each number needs a different complement.” Mathematical statement: **9 + 6 = (9 + 1) + 5 = 15; 7 + 6 = (7 + 3) + 3 = 13**.

**Meaningful learner action:** Two staged transfer problems: 9+6 uses 1 and 5, yielding 15; on explicit request, 7+6 uses 3 and 3, yielding 13. Child predicts then steps through frame/split/add or requests entire worked model. Learner can inspect the same countable objects and the ordered number ledger; explanations do not require guessing or scoring.

**Feedback on misconception:** If nine plus six is given as sixteen, show ten and five; if seven plus six is fourteen, show ten and three. Split only what the source tray contains.

**Model and numeric invariants:** At all times, the number of counters in the filled original first-addend positions plus moved counters plus remaining source counters equals the original a+b. The number moved from second tray equals 10−a in the authored examples, never larger than second addend; remaining count equals b−(10−a). Scene must not change the problem statement to make a wrong choice look correct.

**Navigation:** Conclude with an optional short explanation in a selected sentence, optional written reply or speech to a nearby adult (no speech recognition). No scored result.

**Accessibility/localization/RTL:** Every object quantity, intermediate numerical step, button label and response appears in genuinely translated accessible text; native keyboard/switch/touch actions, correct operand order under RTL and reduced motion.

**Proposed unlocked Note:** “Fill the ten first, then add what is left.”, proposed once the corresponding mathematical model and reasoning are presented; planned only.

**Implementation dependencies:** Proposed self-contained prop-free entry, no new resource type, Quiz config, invented Note event or scoring state.

## CUSTOM SCENE SPECIFICATIONS

- [Ten Bridge Builder](./scenes/tenBridgeBuilder.scene-spec.md): four independently initialized prop-free Scene entries. Generic `scene` Resource rendering is available; the specific component does not yet exist.

## LESSON NOTES — UNLOCKED RECALL CUES (PLANNED)

1. “Fill the ten first, then add what is left.” — available only after the child encounters and can inspect the complete relevant explanation; not a correctness gate.
2. “Splitting an addend changes its parts, not its total.” — available only after the child encounters and can inspect the complete relevant explanation; not a correctness gate.

Notes are future product intent, **not wired**. No Note type, unlock API, learner persistence, revision sheet, spaced schedule or mastery evidence is assumed.

## PRACTICE, RETRIEVAL AND ASSESSMENT HANDOFF

Two staged transfer problems: 9+6 uses 1 and 5, yielding 15; on explicit request, 7+6 uses 3 and 3, yielding 13. Child predicts then steps through frame/split/add or requests entire worked model. The transfer checks ability to apply the relationship in a changed context but is still **formative Scene teaching**. Assessment Architect must separately validate scored items, correct alternatives, grade-appropriate variants, Skill attribution and mastery criteria. The current Quiz adapter's select-one capability is not an implementation of these Scenes.

## GLOBAL ACCESSIBILITY AND LOCALIZATION

Genuine translation of every learner prompt, count, hint, feedback, control, status announcement and Note for all supported locales; no silent English fallback. Each image-like group/counter interaction has an equally OPERABLE ordered text state list and native keyboard/switch/touch buttons. Semantic RTL math maintains original operand positions; never geometrically mirror into a different operation. Large targets, visible focus, 200% zoom, responsive mobile, reduced-motion instantaneous numerical changes, WCAG 2.2 AA and complete offline deterministic feedback after content/locale download. Avoid color-only, drag-only, animation-only, sound-only, remote checker and compulsory writing/speech.

## PRODUCTION / PLATFORM DEPENDENCIES

Current general LessonSection_Config renderer supports ordered `text`, `markdown`, and `scene` resources. Ten Bridge Builder is proposed and needs editor approval, prop-free implementation, locale context and Scene tests. Image/audio/video/code Resource types are not generically rendered and no YouTube config exists; none used. Notes, periodic review, true PWA download and sync require separate work; no fake APIs or scored data created.

## EDITORIAL SOURCES AND OPEN QUESTIONS

- [Methodologist Brief](./methodologist-brief.md), Draft; editor approval pending.
- Canonical linked `makeTenStrategy.data.ts`; shared generated taxonomy is coordinator-owned and not edited on this branch.
- [Create Lesson Content](../../../../../../studio/skills/lesson-workflow/create-lesson-content.skill.md).
- Prerequisite place-value ten-frame competence must be verified before use in Grade 2; the source Skill stays grade-independent and the Lesson does not claim to teach all addition strategies.

## HANDOFF

A **provisional Draft** Content document and separately reviewable Draft Scene spec. Editor must approve the Methodologist Brief before promoting content, then approve Content/Scene independently. Design Scene/Coding Agent/Assessment Architect proceed only through their own authorization. No runtime Lesson, scored Question or additional Skill identity in this deliverable.
