# Receipt and Payment Inspector — Scene Specification

Status: **Provisional Draft — awaiting Methodologist and independent Scene approval**
Owner: Educational Screenwriter
Parent Lesson / Section: [How Much Change Comes Back? Content](../content.md), Section 3
Methodologist objectives: [Draft Methodologist Brief](../methodologist-brief.md), not yet approved
Implementation: **proposed independent, self-contained prop-free Scene**, not built

## LEARNER PURPOSE AND CONCEPT

Transfer the rule into a changed number/item context without the first Scene's state or answer. Compute change as the nonnegative difference between sufficient payment and price; verify by adding price and change to get the paid amount, distinguishing both exact payment and insufficient payment from positive change.

## ACCURATE CONTENT AND MODEL LIMITATIONS

**Canonical mathematical rule:** For payment M at least price P in the same currency, change C=M−P and price+change=payment. Example: €10 paid for €6 yields €4, using two real €2 coins; €10 paid for €7 yields €3, using €2+€1. €15 paid as €10+€5 for a €11 purchase yields €4, since 11+4=15. Proposed €3 change on an €8 item paid with €10 is wrong because 8+3=11>10; €2 is correct. If €5 is paid for a price of €8, payment is insufficient by €3 and there is no nonnegative returned change. Exact €10 paid for €10 price returns €0. Never present negative euros as cash returned or invent ordinary euro coins of denomination €3 or €4.

**Initial state:** Four independently selectable cases: price €11, paid €10+€5 notes (=€15); price €8, paid €10 with proposed €3 return; price €8, paid €5 (short); price €10, paid €10 (exact).

**Authoritative model:** Selected fixed case, authentic payment pieces with stable values, total paid, price, proposed return, sufficient/exact/insufficient classification, revealed equality check and Reset. Insufficient payment is shown as shortfall separately, never negative returned money.

**Instructional boundary:** The shortfall is labelled '€3 more needed', not a financial recommendation or a negative change. The user does not perform a real checkout.

No displayed answer, aria readout, animation result or feedback may contradict the object counts, place values, numeric order, exact group membership or real face values in the model.

## EXPERIENCE BEATS AND LEARNER ACTIONS

### Beat 1 — A €11 item is paid with one €10 and one €5 note. How much should be returned?

- **Exact learner-facing invitation:** “A €11 item is paid with one €10 and one €5 note. How much should be returned?”
- **Controllable investigation:** Show actual payment €10+€5=€15, then compute difference €15−€11, checking €11+€4=€15.
- **Observed correct consequence:** €4 change is due on €15 paid for €11.
- **Evidence from actual model:** €10+€5=€15; €15−€11=€4; €11+€4=€15.
- **Misconception-sensitive feedback and repair:** If €5 suggested, price+return becomes €16; if 'two euros' chosen, show the two cash pieces have face values ten and five.
- **Agency:** Prediction optional. Show a complete annotated Reveal without requiring a correct answer; allow Undo/Reset and retry, never lock progress behind timed or scored success.

### Beat 2 — The cashier returns €3 for a €8 item paid with €10. Check it; what about too little or exact payment?

- **Exact learner-facing invitation:** “The cashier returns €3 for a €8 item paid with €10. Check it; what about too little or exact payment?”
- **Controllable investigation:** Calculate €8+€3=€11 to reject the return, correct to €2, then inspect €5 paid for €8 (short €3) and €10 paid for €10 (return €0).
- **Observed correct consequence:** €2 is correct; insufficient €5-for-€8 is not change; exact €10 gives €0 return.
- **Evidence from actual model:** €8+€2=€10; €8−€5=€3 shortfall; €10−€10=€0 change.
- **Misconception-sensitive feedback and repair:** If negative change proposed for the short payment, distinguish three euros still owed from euros handed back. If exact payment returns a coin, price+return exceeds money paid.
- **Agency:** Prediction optional. Show a complete annotated Reveal without requiring a correct answer; allow Undo/Reset and retry, never lock progress behind timed or scored success.

## INTERACTIVE OBJECTS, STATES AND RULES

- **Objects and controls:** Stable unique group/counter/card/cash identifiers, explicit numbers and roles, text ledger, prediction and explanations. Choose case, Predict change or payment status, Inspect pieces and payment total, Test price+return equality, Reveal expected change/shortfall, Reset.
- **Invariants and consistency:** Selected fixed case, authentic payment pieces with stable values, total paid, price, proposed return, sufficient/exact/insufficient classification, revealed equality check and Reset. Insufficient payment is shown as shortfall separately, never negative returned money. All derived visual and text values use a single authoritative local state. One object cannot be counted, paired or removed twice unless an action legitimately reverses a previous change.
- **Self-contained:** No props, external mode, new Resource kind, cross-Section mutable state or unverified event API. Each new Scene's pedagogical constants must be defined inside its own future component.
- **Reset and feedback:** Reset restores this Scene's own initial state and does not change another Section. Incorrect or partial states produce a specific cause-and-effect explanation.
- **Assessment boundary:** No timed pass, Question/Quiz, scoring, mastery attribution, persistent Note unlock or fabricated analytics hook.

## VISUAL / AUDIO / MEDIA DIRECTION

Lightweight labelled HTML/SVG or semantic native controls are sufficient; maintain exact countable items and visually discoverable relationships at small sizes. If animations help, make them learner-paced with a reduced-motion instantaneous alternative. No mandatory audio, precision drag, externally fetched imagery or 3D asset. Money appears only as clearly schematic euro cards with real denominations; do not imply copyrighted currency images have been provided.

## LOCALIZATION, DIRECTION AND ACCESSIBILITY

Read each payment piece, paid total, price, claimed return, and checked equality separately. Under RTL the mathematical addition/subtraction and money-unit interpretation remain unchanged.

All learner-facing prompts, controls, errors, numerals/number words, object identities, accessible state messages and Notes require **genuine translations for every current Engine-supported locale**, with no fallback. Mathematical order, operand identities, currency units and grouping must be preserved in semantic RTL, not flipped mechanically. WCAG 2.2 AA: touch/keyboard/switch controls, visible focus, nonvisual ordered evidence ledger, color-independent status, reduced motion, high zoom and mobile support. Equivalent selected-language instructional data and interaction must remain usable once downloaded offline; these are **requirements, not delivered production features**.

## ACCEPTANCE SCENARIOS

1. €11 price with €15 paid yields €4 change.
2. False €3 return on €8 paid €10 is rejected, €2 accepted.
3. €5 for €8 is insufficient by €3 without negative change.
4. €10 for €10 returns zero.
5. Beat 1 correct model: €10+€5=€15; €15−€11=€4; €11+€4=€15. Test misconception route: If €5 suggested, price+return becomes €16; if 'two euros' chosen, show the two cash pieces have face values ten and five.
6. Beat 2 correct model: €8+€2=€10; €8−€5=€3 shortfall; €10−€10=€0 change. Test misconception route: If negative change proposed for the short payment, distinguish three euros still owed from euros handed back. If exact payment returns a coin, price+return exceeds money paid.
7. Complete the same task with keyboard, switch, screen reader, RTL, reduced motion, mobile/high zoom and downloaded selected-language offline resources; the numerical result and instructional explanation are identical.
8. Reset only this Scene and verify no other Section's state changed and no score, mastery or Note event occurred.

## IMPLEMENTATION DEPENDENCIES AND OPEN QUESTIONS

This is a **proposed** Scene. Generic `scene` Resource rendering exists; Receipt and Payment Inspector does **not**. Editor approval of the Methodologist Brief, Content and this Scene spec is pending. Future implementation must verify the actual localization context and Renderer contracts before authoring any React; QA must test all examples and error branches, translations, semantic RTL, accessibility and real airplane-mode offline delivery.
