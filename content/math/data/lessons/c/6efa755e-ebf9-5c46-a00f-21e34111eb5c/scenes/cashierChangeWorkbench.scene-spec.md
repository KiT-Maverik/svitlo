# Cashier's Change Workbench — Scene Specification

Status: **Provisional Draft — awaiting Methodologist and independent Scene approval**
Owner: Educational Screenwriter
Parent Lesson / Section: [How Much Change Comes Back? Content](../content.md), Section 1
Methodologist objectives: [Draft Methodologist Brief](../methodologist-brief.md), not yet approved
Implementation: **proposed independent, self-contained prop-free Scene**, not built

## LEARNER PURPOSE AND CONCEPT

Reveal the causal mathematical principle in an operable first model. Compute change as the nonnegative difference between sufficient payment and price; verify by adding price and change to get the paid amount, distinguishing both exact payment and insufficient payment from positive change.

## ACCURATE CONTENT AND MODEL LIMITATIONS

**Canonical mathematical rule:** For payment M at least price P in the same currency, change C=M−P and price+change=payment. Example: €10 paid for €6 yields €4, using two real €2 coins; €10 paid for €7 yields €3, using €2+€1. €15 paid as €10+€5 for a €11 purchase yields €4, since 11+4=15. Proposed €3 change on an €8 item paid with €10 is wrong because 8+3=11>10; €2 is correct. If €5 is paid for a price of €8, payment is insufficient by €3 and there is no nonnegative returned change. Exact €10 paid for €10 price returns €0. Never present negative euros as cash returned or invent ordinary euro coins of denomination €3 or €4.

**Initial state:** Price tag €6, paid by a real €10 banknote, empty return tray with accessible choices of actual €1/€2 coins. A second independent price tag €7 with the same payment.

**Authoritative model:** Selected case, price and payment sum, individual selected returned cash-piece IDs, computed return value, missing difference, verification expression and Reset. Price+return is checked against actual paid value.

**Instructional boundary:** Do not offer nonstandard €3 or €4 single coins as if valid. The current payment is sufficient for both Scene cases.

No displayed answer, aria readout, animation result or feedback may contradict the object counts, place values, numeric order, exact group membership or real face values in the model.

## EXPERIENCE BEATS AND LEARNER ACTIONS

### Beat 1 — A €6 item is paid with €10. How many euros should come back?

- **Exact learner-facing invitation:** “A €6 item is paid with €10. How many euros should come back?”
- **Controllable investigation:** Build €4 in the return tray with two €2 coins, then check €6+€4=€10.
- **Observed correct consequence:** Exactly €4 change is due; two €2 coins are a valid return.
- **Evidence from actual model:** €10−€6=€4; €6+€4=€10.
- **Misconception-sensitive feedback and repair:** For €3, show €6+€3=€9 and the missing euro; for €6, show €6+€6=€12 exceeds the payment.
- **Agency:** Prediction optional. Show a complete annotated Reveal without requiring a correct answer; allow Undo/Reset and retry, never lock progress behind timed or scored success.

### Beat 2 — An item costs €7 and is paid with €10. Can you return real coins?

- **Exact learner-facing invitation:** “An item costs €7 and is paid with €10. Can you return real coins?”
- **Controllable investigation:** Select the alternate case and add one €2 and one €1 coin, then check the sum.
- **Observed correct consequence:** €3 change, composed as a genuine €2 coin and €1 coin.
- **Evidence from actual model:** €10−€7=€3; €7+€2+€1=€10.
- **Misconception-sensitive feedback and repair:** For only €2, price+return is €9; for €4 the sum €11 exceeds the payment.
- **Agency:** Prediction optional. Show a complete annotated Reveal without requiring a correct answer; allow Undo/Reset and retry, never lock progress behind timed or scored success.

## INTERACTIVE OBJECTS, STATES AND RULES

- **Objects and controls:** Stable unique group/counter/card/cash identifiers, explicit numbers and roles, text ledger, prediction and explanations. Choose €6/€10 or €7/€10 case, Add/Remove €1 or €2 coin, Inspect amount paid, Check return equation, Reveal, Reset.
- **Invariants and consistency:** Selected case, price and payment sum, individual selected returned cash-piece IDs, computed return value, missing difference, verification expression and Reset. Price+return is checked against actual paid value. All derived visual and text values use a single authoritative local state. One object cannot be counted, paired or removed twice unless an action legitimately reverses a previous change.
- **Self-contained:** No props, external mode, new Resource kind, cross-Section mutable state or unverified event API. Each new Scene's pedagogical constants must be defined inside its own future component.
- **Reset and feedback:** Reset restores this Scene's own initial state and does not change another Section. Incorrect or partial states produce a specific cause-and-effect explanation.
- **Assessment boundary:** No timed pass, Question/Quiz, scoring, mastery attribution, persistent Note unlock or fabricated analytics hook.

## VISUAL / AUDIO / MEDIA DIRECTION

Lightweight labelled HTML/SVG or semantic native controls are sufficient; maintain exact countable items and visually discoverable relationships at small sizes. If animations help, make them learner-paced with a reduced-motion instantaneous alternative. No mandatory audio, precision drag, externally fetched imagery or 3D asset. Money appears only as clearly schematic euro cards with real denominations; do not imply copyrighted currency images have been provided.

## LOCALIZATION, DIRECTION AND ACCESSIBILITY

Separate semantic ledger fields Price, Paid, Returned, Check. Every coin has value/kind and stable ID; keyboard and screen reader can build exactly the same change amount without dragging.

All learner-facing prompts, controls, errors, numerals/number words, object identities, accessible state messages and Notes require **genuine translations for every current Engine-supported locale**, with no fallback. Mathematical order, operand identities, currency units and grouping must be preserved in semantic RTL, not flipped mechanically. WCAG 2.2 AA: touch/keyboard/switch controls, visible focus, nonvisual ordered evidence ledger, color-independent status, reduced motion, high zoom and mobile support. Equivalent selected-language instructional data and interaction must remain usable once downloaded offline; these are **requirements, not delivered production features**.

## ACCEPTANCE SCENARIOS

1. €10−€6 yields €4, with €6+€4=€10 verification.
2. €10−€7 yields €3 with valid €2+€1 coin return.
3. Any amount chosen recomputes price+returned from actual denomination values.
4. Reset is local and does not affect receipt inspection.
5. Beat 1 correct model: €10−€6=€4; €6+€4=€10. Test misconception route: For €3, show €6+€3=€9 and the missing euro; for €6, show €6+€6=€12 exceeds the payment.
6. Beat 2 correct model: €10−€7=€3; €7+€2+€1=€10. Test misconception route: For only €2, price+return is €9; for €4 the sum €11 exceeds the payment.
7. Complete the same task with keyboard, switch, screen reader, RTL, reduced motion, mobile/high zoom and downloaded selected-language offline resources; the numerical result and instructional explanation are identical.
8. Reset only this Scene and verify no other Section's state changed and no score, mastery or Note event occurred.

## IMPLEMENTATION DEPENDENCIES AND OPEN QUESTIONS

This is a **proposed** Scene. Generic `scene` Resource rendering exists; Cashier's Change Workbench does **not**. Editor approval of the Methodologist Brief, Content and this Scene spec is pending. Future implementation must verify the actual localization context and Renderer contracts before authoring any React; QA must test all examples and error branches, translations, semantic RTL, accessibility and real airplane-mode offline delivery.
