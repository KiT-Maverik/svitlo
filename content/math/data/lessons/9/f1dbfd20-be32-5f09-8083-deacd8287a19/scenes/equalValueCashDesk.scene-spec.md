# Equal-Value Cash Desk — Scene Specification

Status: **Provisional Draft — pending Methodologist and Scene approval**
Owner: Educational Screenwriter
Parent Lesson / Section: [Different Cash, Same Total? Euro Amounts Content](../content.md), Section 1
Methodologist objectives: [Draft Methodologist Brief](../methodologist-brief.md)
Implementation status: Proposed prop-free component; not implemented

## LEARNER PURPOSE AND CONCEPT

Use the same conserved monetary value to compose different valid combinations and to compare purses by summed denominations, not count or size of cash pieces. This Scene's distinct responsibility is its own concrete model, prediction and learner-operated evidence.

## ACCURATE CONTENT AND MODEL LIMITATIONS

€6=€5+€1 (two pieces)=€2+€2+€2 (three pieces)=€2+€2+€1+€1 (four pieces). €3 amount can be €2+€1 but no standard €3 coin exists. Purse A €10 note vs B €5 note+three €2 coins =€11; purse A €5+€2=€7 vs B three €2 coins =€6; two €2 coins =€4 versus a €5 banknote =€5.

**Initial state:** Empty tray with target €6 and choices €1/€2 coins, €5/€10 notes. Several copies allowed as teaching pieces, not as claims of a real wallet's contents.

**Authoritative interactive model:** List of selected cash-piece unique IDs, exact face values, computed running total, comparison snapshot and reveal. Any removal updates total immediately.

**Boundaries:** Grade 2, 0–15 whole euros; legitimate €1 and €2 coins, €5 and €10 notes; no cents, rates, transactions, purchase totals, budgets, change, scoring, or automatically substituted locale-specific currency.

## EXPERIENCE BEATS AND LEARNER ACTIONS

### Beat 1

- **Learner-facing prompt:** “Can one banknote and one coin make €6?”
- **Learner action:** Add €5 note then €1 coin, observe €5 then €6.
- **Visible mathematical conclusion:** €5+€1=€6 with two pieces.
- **Specific explanatory feedback:** If €5 selected alone, show one euro missing. If €5+€2, sum is seven.
- **Verified expected result:** €5+€1=€6.
- **Control:** The child can reveal the worked explanation and retry without a score or automatic pass.

### Beat 2

- **Learner-facing prompt:** “Make the same six euros with coins only.”
- **Learner action:** Remove first pair, add three individual €2 coins, compare prior total.
- **Visible mathematical conclusion:** Three coins still sum €6, equal in value to two-piece combination.
- **Specific explanatory feedback:** If three euros guessed from coin count, show 2+2+2.
- **Verified expected result:** €2+€2+€2=€6.
- **Control:** The child can reveal the worked explanation and retry without a score or automatic pass.

### Beat 3

- **Learner-facing prompt:** “Is a €3 euro coin needed to make amount €3?”
- **Learner action:** Identify fictional €3 ordinary coin; instead combine real €2 and €1.
- **Visible mathematical conclusion:** €3 is a valid total, not an ordinary euro coin denomination.
- **Specific explanatory feedback:** If fictional coin accepted, show the actual euro coin set.
- **Verified expected result:** €2+€1=€3; no standard €3 coin.
- **Control:** The child can reveal the worked explanation and retry without a score or automatic pass.

## INTERACTIVE OBJECTS, STATES AND RULES

Distinct labelled objects or cash-piece identities, authoritative state, count/rank/value ledger, prediction, reveal and local reset. **Control map:** Add a denomination; remove one specific piece; show sum ledger; compare combinations; Reveal; Reset.

- No props, no external mode/configuration contract, no shared state between Scene instances. Scenario constants live inside this standalone Scene when a Coding Agent later implements it.
- Counts, pairs, ordinal ranks and EUR totals are always derived from the exact objects shown; valid actions preserve declared invariants and never silently add or discard identities.
- A rejected/incomplete action explains what is missing and allows correction. Reset restores only this Scene.
- There is no Question/Quiz, scoring, mastery, analytics event or Note persistence hook.

## VISUAL / AUDIO / MEDIA DIRECTION

Simple semantic HTML/SVG schematic objects and labelled values, child-paced transitions, immediate equivalents in reduced-motion mode. No mandatory audio, remote asset, drag or animation. Currency artwork, if later needed, requires rights and face-value verification; these specifications do not provide or claim licensed imagery.

## LOCALIZATION, DIRECTION AND ACCESSIBILITY

All prompts, counts, roles, numeric utterances, errors and actions need complete genuine translations for every locale (no English fallback). Nonvisual sequential state ledger and native keyboard/switch/touch controls convey exactly the same mathematics; labels never depend only on color or spatial position. RTL preserves explicit task origins, pair IDs and currency units. Plan WCAG 2.2 AA, 200% zoom, mobile and downloaded selected-locale offline functionality; not currently implemented.

## ACCEPTANCE SCENARIOS

1. €5+€1=€6. Incorrect case: If €5 selected alone, show one euro missing. If €5+€2, sum is seven.
2. €2+€2+€2=€6. Incorrect case: If three euros guessed from coin count, show 2+2+2.
3. €2+€1=€3; no standard €3 coin. Incorrect case: If fictional coin accepted, show the actual euro coin set.
4. Both €6 compositions true; €2+€2+€1+€1 also possible; no fictional coin used; all selected pieces removable.
5. Keyboard, screen reader, RTL, reduced motion and offline use produce numerically identical results and explanations; resets do not alter other scenes.

## IMPLEMENTATION DEPENDENCIES AND OPEN QUESTIONS

The generic Scene resource exists but this custom Scene does **not**. Explicit editor approval of the Methodologist Brief and each Scene is pending. Later implementation must use verified localization context, self-contained prop-free components, own tests, true WCAG/RTL/offline checks and no invented APIs.
