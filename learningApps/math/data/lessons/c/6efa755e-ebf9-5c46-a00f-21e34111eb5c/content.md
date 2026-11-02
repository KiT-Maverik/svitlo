# How Much Change Comes Back? — Content

Status: **Provisional Draft — pending Methodologist approval**
Target Lesson: `learningApps/playground/Data/Lessons/1/calculateChangeInEuros/`
Primary audience: Grade 2
Methodologist source: [Draft Methodologist Brief](./methodologist-brief.md) (not yet approved)
Target Skills: exactly the canonical linked Skill files in the Brief; no copied UUIDs or alternate taxonomy
Program dependence: None
Runtime Lesson: **Not implemented**

## INSTRUCTIONAL CONCEPT

Compute change as the nonnegative difference between sufficient payment and price; verify by adding price and change to get the paid amount, distinguishing both exact payment and insufficient payment from positive change.

**Exact mathematical foundation and reference model:** For payment M at least price P in the same currency, change C=M−P and price+change=payment. Example: €10 paid for €6 yields €4, using two real €2 coins; €10 paid for €7 yields €3, using €2+€1. €15 paid as €10+€5 for a €11 purchase yields €4, since 11+4=15. Proposed €3 change on an €8 item paid with €10 is wrong because 8+3=11>10; €2 is correct. If €5 is paid for a price of €8, payment is insufficient by €3 and there is no nonnegative returned change. Exact €10 paid for €10 price returns €0. Never present negative euros as cash returned or invent ordinary euro coins of denomination €3 or €4.

The learner actively constructs or changes a representation, predicts its effect and explains a discrepancy. The Lesson does **not** consist of a long Markdown lecture plus a token quiz. One Scene provides the guided causal encounter, a short reflection section retrieves the rule and challenges a shortcut, and a **different** second Scene tests the rule with changed numbers and a new context. Correct answers are accompanied by verifiable evidence, not praise alone.

## LEARNER JOURNEY

1. **Question and prediction:** “A €6 item is paid with €10. How many euros should come back?” Learner can think or select an outcome before acting, but is not forced to make a guess.
2. **Manipulate and notice:** €10−€6=€4; €6+€4=€10. €10−€7=€3; €7+€2+€1=€10. An object/amount/count ledger connects concrete items with the written numbers.
3. **Explain the counterexample:** An item is €8. You hand over €10. A cashier offers €3 back. Does the price plus return match what you paid? Child attempts a reasoning response before the short worked explanation.
4. **Independent transfer:** A €11 item is paid with one €10 and one €5 note. How much should be returned? The second Scene has its own state and a new number, item or money configuration; it is not a prop-mode clone.
5. **Conclude and retrieve:** The final worked example and the planned Note express the enduring principle without a time limit, score or mastery claim.

## SECTION PLAN

### Section 1 — Cashier's Change Workbench

- **Purpose:** Develop the principle through a manipulable concrete model and a counterexample.
- **Current Section contract:** `LessonSection_Config`, one **vertically ordered nonempty** list of typed resources, not a Quiz.
- **Ordered Resource blocks:**
  1. **`text` — existing generic renderer:** “A €6 item is paid with €10. How many euros should come back?”
  2. **`scene` — generic type supported, bespoke implementation proposed:** [Cashier's Change Workbench](./scenes/cashierChangeWorkbench.scene-spec.md). Price tag €6, paid by a real €10 banknote, empty return tray with accessible choices of actual €1/€2 coins. A second independent price tag €7 with the same payment.
  3. **`markdown` — existing generic renderer:** “Exactly €4 change is due; two €2 coins are a valid return. €10−€6=€4; €6+€4=€10.”
- **Learner-controlled beats, observations and feedback:**
  - **Beat 1: “A €6 item is paid with €10. How many euros should come back?”** Build €4 in the return tray with two €2 coins, then check €6+€4=€10. **Result:** Exactly €4 change is due; two €2 coins are a valid return. **Why the plausible mistake fails:** For €3, show €6+€3=€9 and the missing euro; for €6, show €6+€6=€12 exceeds the payment. **Verified model:** €10−€6=€4; €6+€4=€10.
  - **Beat 2: “An item costs €7 and is paid with €10. Can you return real coins?”** Select the alternate case and add one €2 and one €1 coin, then check the sum. **Result:** €3 change, composed as a genuine €2 coin and €1 coin. **Why the plausible mistake fails:** For only €2, price+return is €9; for €4 the sum €11 exceeds the payment. **Verified model:** €10−€7=€3; €7+€2+€1=€10.
- **Independent controls:** Choose €6/€10 or €7/€10 case, Add/Remove €1 or €2 coin, Inspect amount paid, Check return equation, Reveal, Reset. Full worked reveal is always available and Reset applies only to this Scene, without scoring or locks.
- **Mathematical state:** Selected case, price and payment sum, individual selected returned cash-piece IDs, computed return value, missing difference, verification expression and Reset. Price+return is checked against actual paid value.
- **Instructional boundary:** Do not offer nonstandard €3 or €4 single coins as if valid. The current payment is sufficient for both Scene cases.
- **Accessibility and RTL:** Separate semantic ledger fields Price, Paid, Returned, Check. Every coin has value/kind and stable ID; keyboard and screen reader can build exactly the same change amount without dragging. Show the same model in an ordered text ledger, with native buttons and no required audio or drag. Error feedback is specific, never just a success badge.
- **Transition and Note:** After explanation ask the learner which relationship remains true in the next changed model; proposed recall cue “Change is the part of sufficient payment left after the price: price + change = amount paid.” is planned only, with no event or persistence.

### Section 2 — Check the Cashier's Result

- **Purpose:** Retrieve a numerical invariant and contrast it with a likely mistaken shortcut without score or response validation.
- **Current Section shape:** `LessonSection_Config`, one ordered vertical Resource column.
- **Ordered content blocks:**
  1. **`text` (existing renderer):** “An item is €8. You hand over €10. A cashier offers €3 back. Does the price plus return match what you paid?”
  2. **`markdown` (existing renderer):** “No: 8+3=11, but you paid 10. The right return is €2 because 8+2=10.”
  3. **`markdown` (existing renderer):** “When €5 is offered for a €8 cost, €3 more is needed; this isn't negative change. Exact €10 for €10 means zero change.”
- **Instructional dialogue:** Invite a child to give a private, spoken or recorded-on-paper answer before reading the explanation. The existing text/Markdown blocks do not implement hidden-answer input or auto-grading, so no such widget, correctness tracking or KnowledgeCheckpoint API is claimed.
- **Misconception feedback:** Subtracting payment from cost and treating a negative as returned change; treating the price itself as change; counting the number of cash pieces rather than value; believing exact payment gives money back; accepting a cashier's return without checking the price+return equality. Use the detailed preceding Scene model if the child remains unsure.
- **Navigation and access:** The explanation remains legible to a screen reader and does not require a visual page transition, sound or animation.

### Section 3 — Receipt and Payment Inspector

- **Purpose:** Apply the principle to unfamiliar quantities or representations, not replay the first model.
- **Current Section contract:** `LessonSection_Config`, one **vertically ordered nonempty** list of typed resources, not a Quiz.
- **Ordered Resource blocks:**
  1. **`text` — existing generic renderer:** “A €11 item is paid with one €10 and one €5 note. How much should be returned?”
  2. **`scene` — generic type supported, bespoke implementation proposed:** [Receipt and Payment Inspector](./scenes/receiptAndPaymentInspector.scene-spec.md). Four independently selectable cases: price €11, paid €10+€5 notes (=€15); price €8, paid €10 with proposed €3 return; price €8, paid €5 (short); price €10, paid €10 (exact).
  3. **`markdown` — existing generic renderer:** “€4 change is due on €15 paid for €11. €10+€5=€15; €15−€11=€4; €11+€4=€15.”
- **Learner-controlled beats, observations and feedback:**
  - **Beat 1: “A €11 item is paid with one €10 and one €5 note. How much should be returned?”** Show actual payment €10+€5=€15, then compute difference €15−€11, checking €11+€4=€15. **Result:** €4 change is due on €15 paid for €11. **Why the plausible mistake fails:** If €5 suggested, price+return becomes €16; if 'two euros' chosen, show the two cash pieces have face values ten and five. **Verified model:** €10+€5=€15; €15−€11=€4; €11+€4=€15.
  - **Beat 2: “The cashier returns €3 for a €8 item paid with €10. Check it; what about too little or exact payment?”** Calculate €8+€3=€11 to reject the return, correct to €2, then inspect €5 paid for €8 (short €3) and €10 paid for €10 (return €0). **Result:** €2 is correct; insufficient €5-for-€8 is not change; exact €10 gives €0 return. **Why the plausible mistake fails:** If negative change proposed for the short payment, distinguish three euros still owed from euros handed back. If exact payment returns a coin, price+return exceeds money paid. **Verified model:** €8+€2=€10; €8−€5=€3 shortfall; €10−€10=€0 change.
- **Independent controls:** Choose case, Predict change or payment status, Inspect pieces and payment total, Test price+return equality, Reveal expected change/shortfall, Reset. Full worked reveal is always available and Reset applies only to this Scene, without scoring or locks.
- **Mathematical state:** Selected fixed case, authentic payment pieces with stable values, total paid, price, proposed return, sufficient/exact/insufficient classification, revealed equality check and Reset. Insufficient payment is shown as shortfall separately, never negative returned money.
- **Instructional boundary:** The shortfall is labelled '€3 more needed', not a financial recommendation or a negative change. The user does not perform a real checkout.
- **Accessibility and RTL:** Read each payment piece, paid total, price, claimed return, and checked equality separately. Under RTL the mathematical addition/subtraction and money-unit interpretation remain unchanged. Show the same model in an ordered text ledger, with native buttons and no required audio or drag. Error feedback is specific, never just a success badge.
- **Transition and Note:** After explanation ask the learner which relationship remains true in the next changed model; proposed recall cue “Insufficient payment has a shortfall, not returned change; exact payment gives zero change.” is planned only, with no event or persistence.

## CUSTOM SCENE SPECIFICATIONS

- [Cashier's Change Workbench](./scenes/cashierChangeWorkbench.scene-spec.md) — distinct concrete exploration.
- [Receipt and Payment Inspector](./scenes/receiptAndPaymentInspector.scene-spec.md) — separately initialized changed-context transfer.

Both are **proposed prop-free Scene components**, not existing React code. Generic `scene` Resource support alone does not implement the named Scenes, and no new Resource discriminator, Scene mode prop or undocumented app context is assumed.

## LESSON NOTES — UNLOCKED RECALL CUES (PLANNED)

1. “Change is the part of sufficient payment left after the price: price + change = amount paid.” — after the first worked contrast, independently of the answer given.
2. “Insufficient payment has a shortfall, not returned change; exact payment gives zero change.” — after inspecting the transfer case's worked reasoning.

Each Note is a concise future recall cue, **not** an implemented unlocked Note entity. Note IDs, unlock events, persistence, synchronization, revision sheets and spaced retrieval schedules require separate architectural review and implementation.

## PRACTICE, RETRIEVAL AND ASSESSMENT HANDOFF

Guided manipulation in Section 1, short verbal retrieval in Section 2 and different-context transfer in Section 3 create varied formative practice. Their completion is not a validated measure of mastery of each target Skill. Any future scored Question, Quiz, correct-answer security, thresholds, retry policy or formal assessment evidence belongs to the Learning Assessment Architect and is deliberately absent.

## GLOBAL ACCESSIBILITY AND LOCALIZATION

All learner-facing prompts, controls, errors, numerals/number words, object identities, accessible state messages and Notes require **genuine translations for every current Engine-supported locale**, with no fallback. Mathematical order, operand identities, currency units and grouping must be preserved in semantic RTL, not flipped mechanically. WCAG 2.2 AA: touch/keyboard/switch controls, visible focus, nonvisual ordered evidence ledger, color-independent status, reduced motion, high zoom and mobile support. Equivalent selected-language instructional data and interaction must remain usable once downloaded offline; these are **requirements, not delivered production features**.

Learner-facing samples in this Markdown are **English editorial source only**. No translation dictionaries or alternative locale content are falsely claimed. Euro amounts must stay EUR in every language; a different currency requires verified denominations and an approved separate pedagogical adaptation.

## PRODUCTION / PLATFORM DEPENDENCIES

| Feature                                                   | Verified / proposed                      | Later responsibility                                 |
| --------------------------------------------------------- | ---------------------------------------- | ---------------------------------------------------- |
| `LessonSection_Config` with ordered `Resource_Config`     | Existing TypeScript contract             | Coding Agent assembles only after editorial approval |
| Generic `text`, `markdown`, `scene` renderer              | Observed in Playground                   | Bespoke Scenes remain unimplemented                  |
| Cashier's Change Workbench, Receipt and Payment Inspector | **Proposed** Screenwriter specifications | Editor approval, Scene Designer, independent tests   |
| Genuine locales, RTL and nonvisual controls               | Product requirements, not delivered      | Localization and accessibility QA                    |
| Selected-language offline Lesson and asset download       | Product target, unverified               | PWA/integration and offline E2E                      |
| Notes, revision sheet, progress, persistent mastery       | Planned or unverified, not wired         | Separate architecture                                |
| Questions, Quizzes, grading                               | Not authored                             | Assessment Architect                                 |

## EDITORIAL SOURCES AND OPEN QUESTIONS

- [Draft Methodologist Brief](./methodologist-brief.md), which links directly to canonical Skills.
- [Lesson Content entity](../../../../../../studio/docs/entities/lesson-content.md), [Section entity](../../../../../../studio/docs/entities/section.md), [Learning Philosophy](../../../../../../studio/docs/architecture/learning-experience-philosophy.md).
- Editor must approve the Brief first, then Content and each Scene separately. Full locale translation and all nonvisual/RTL/offline behavior need implementation-stage tests.

## HANDOFF

**Provisional Screenwriter Draft, not Approved.** No React components, runtime Lesson data, scored Questions, Quiz, mastery, Notes persistence or assumed existing offline feature were created.
