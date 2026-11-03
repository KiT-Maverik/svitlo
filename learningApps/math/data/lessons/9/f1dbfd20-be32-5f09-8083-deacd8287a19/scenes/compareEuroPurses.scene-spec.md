# Compare Euro Purses — Scene Specification

Status: **Provisional Draft — pending Methodologist and Scene approval**
Owner: Educational Screenwriter
Parent Lesson / Section: [Different Cash, Same Total? Euro Amounts Content](../content.md), Section 3
Methodologist objectives: [Draft Methodologist Brief](../methodologist-brief.md)
Implementation status: Proposed prop-free component; not implemented

## LEARNER PURPOSE AND CONCEPT

Use the same conserved monetary value to compose different valid combinations and to compare purses by summed denominations, not count or size of cash pieces. This Scene's distinct responsibility is its own concrete model, prediction and learner-operated evidence.

## ACCURATE CONTENT AND MODEL LIMITATIONS

€6=€5+€1 (two pieces)=€2+€2+€2 (three pieces)=€2+€2+€1+€1 (four pieces). €3 amount can be €2+€1 but no standard €3 coin exists. Purse A €10 note vs B €5 note+three €2 coins =€11; purse A €5+€2=€7 vs B three €2 coins =€6; two €2 coins =€4 versus a €5 banknote =€5.

**Initial state:** Three independent preset purse comparisons: A=[€10], B=[€5,€2,€2,€2]; then A=[€5,€2],B=[€2,€2,€2]; then A=[€2,€2],B=[€5].

**Authoritative interactive model:** Selected case, two immutable lists of piece values, computed separate totals, learner prediction A/B/equal, explanation; no cross-case carryover.

**Boundaries:** Grade 2, 0–15 whole euros; legitimate €1 and €2 coins, €5 and €10 notes; no cents, rates, transactions, purchase totals, budgets, change, scoring, or automatically substituted locale-specific currency.

## EXPERIENCE BEATS AND LEARNER ACTIONS

### Beat 1

- **Learner-facing prompt:** “Which is worth more: A €10 note or B €5 note plus three €2 coins?”
- **Learner action:** Compute A=10, B=5+2+2+2=11 from individual value labels.
- **Visible mathematical conclusion:** B is higher: €11>€10.
- **Specific explanatory feedback:** If A due to big note, show B's four values summed to eleven.
- **Verified expected result:** A €10, B €11 → B greater.
- **Control:** The child can reveal the worked explanation and retry without a score or automatic pass.

### Beat 2

- **Learner-facing prompt:** “A has €5+€2; B has three €2 coins. Which wins?”
- **Learner action:** Count monetary values rather than the number of pieces.
- **Visible mathematical conclusion:** A is €7 versus B €6.
- **Specific explanatory feedback:** If B chosen due to three coins, demonstrate 2+2+2=6.
- **Verified expected result:** A €7, B €6 → A greater.
- **Control:** The child can reveal the worked explanation and retry without a score or automatic pass.

### Beat 3

- **Learner-facing prompt:** “New case: A has two €2 coins, B one €5 note.”
- **Learner action:** Independent transfer: compute 2+2=4 and compare with 5.
- **Visible mathematical conclusion:** B has more worth: €5 versus €4.
- **Specific explanatory feedback:** If A due to two coins, compare four euros with five.
- **Verified expected result:** A €4, B €5 → B greater.
- **Control:** The child can reveal the worked explanation and retry without a score or automatic pass.

## INTERACTIVE OBJECTS, STATES AND RULES

Distinct labelled objects or cash-piece identities, authoritative state, count/rank/value ledger, prediction, reveal and local reset. **Control map:** Choose case; predict A/B/equal; reveal A ledger; reveal B ledger; Explain; Reset.

- No props, no external mode/configuration contract, no shared state between Scene instances. Scenario constants live inside this standalone Scene when a Coding Agent later implements it.
- Counts, pairs, ordinal ranks and EUR totals are always derived from the exact objects shown; valid actions preserve declared invariants and never silently add or discard identities.
- A rejected/incomplete action explains what is missing and allows correction. Reset restores only this Scene.
- There is no Question/Quiz, scoring, mastery, analytics event or Note persistence hook.

## VISUAL / AUDIO / MEDIA DIRECTION

Simple semantic HTML/SVG schematic objects and labelled values, child-paced transitions, immediate equivalents in reduced-motion mode. No mandatory audio, remote asset, drag or animation. Currency artwork, if later needed, requires rights and face-value verification; these specifications do not provide or claim licensed imagery.

## LOCALIZATION, DIRECTION AND ACCESSIBILITY

All prompts, counts, roles, numeric utterances, errors and actions need complete genuine translations for every locale (no English fallback). Nonvisual sequential state ledger and native keyboard/switch/touch controls convey exactly the same mathematics; labels never depend only on color or spatial position. RTL preserves explicit task origins, pair IDs and currency units. Plan WCAG 2.2 AA, 200% zoom, mobile and downloaded selected-locale offline functionality; not currently implemented.

## ACCEPTANCE SCENARIOS

1. A €10, B €11 → B greater. Incorrect case: If A due to big note, show B's four values summed to eleven.
2. A €7, B €6 → A greater. Incorrect case: If B chosen due to three coins, demonstrate 2+2+2=6.
3. A €4, B €5 → B greater. Incorrect case: If A due to two coins, compare four euros with five.
4. All three comparisons verified numerically, no piece-count shortcut or mixed currency, local Reset.
5. Keyboard, screen reader, RTL, reduced motion and offline use produce numerically identical results and explanations; resets do not alter other scenes.

## IMPLEMENTATION DEPENDENCIES AND OPEN QUESTIONS

The generic Scene resource exists but this custom Scene does **not**. Explicit editor approval of the Methodologist Brief and each Scene is pending. Later implementation must use verified localization context, self-contained prop-free components, own tests, true WCAG/RTL/offline checks and no invented APIs.
