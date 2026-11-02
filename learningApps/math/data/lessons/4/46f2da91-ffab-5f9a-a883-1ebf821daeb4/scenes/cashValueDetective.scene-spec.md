# Cash Value Detective — Scene Specification

Status: **Provisional Draft — pending Methodologist and Scene approval**
Owner: Educational Screenwriter
Parent Lesson / Section: [Read the Value: Euro Coins and Banknotes Content](../content.md), Section 3
Methodologist objectives: [Draft Methodologist Brief](../methodologist-brief.md)
Implementation status: Proposed prop-free component; not implemented

## LEARNER PURPOSE AND CONCEPT

Recognize actual denominations in an explicitly named euro currency case study, and distinguish face value from physical size or national-side design. This Scene's distinct responsibility is its own concrete model, prediction and learner-operated evidence.

## ACCURATE CONTENT AND MODEL LIMITATIONS

Euro coins: 1,2,5,10,20,50 cents, and one/two euros. Europa-series banknotes include five and ten euros. Standard circulating five-euro coin does not exist. Fifty-cent coin diameter 24.25 mm exceeds one-euro coin diameter 23.25 mm, but one euro equals 100 cents and exceeds 50 cents in value.

**Initial state:** Two schematic coins: 50c (24.25 mm diameter), €1 (23.25 mm); equivalence reference €1=100c. Another case shows valid €5 note and explicitly fictional ordinary €5 coin.

**Authoritative interactive model:** Selected comparison, shown conversion note, classification of valid/fictional schematic piece, explanation.

**Boundaries:** Grade 2 real euro case study; core items one- and two-euro coins plus five- and ten-euro notes; 50-cent contrast supported by explicit conversion reference. No changing currency automatically with UI locale, no purchase or exchange rates, no unlicensed banknote art.

## EXPERIENCE BEATS AND LEARNER ACTIONS

### Beat 1

- **Learner-facing prompt:** “The 50-cent coin is wider. Which coin is worth more?”
- **Learner action:** Compare 50c to €1 using the reference 100 cents per euro.
- **Visible mathematical conclusion:** €1 is worth more though 50c coin is physically wider.
- **Specific explanatory feedback:** If 50 picked due to numeral or size, normalize to 50 versus 100 cents.
- **Verified expected result:** 50c width 24.25mm>€1 width 23.25mm; monetary 50c<100c.
- **Control:** The child can reveal the worked explanation and retry without a score or automatic pass.

### Beat 2

- **Learner-facing prompt:** “Which is genuine ordinary euro cash: €5 note or a drawing of €5 coin?”
- **Learner action:** Classify valid banknote and explicitly fictional ordinary €5 coin.
- **Visible mathematical conclusion:** Real €5 note; no standard ordinary €5 euro coin.
- **Specific explanatory feedback:** If coin accepted, display verified euro coin list ending at €2.
- **Verified expected result:** €5 banknote exists; standard €5 coin does not.
- **Control:** The child can reveal the worked explanation and retry without a score or automatic pass.

## INTERACTIVE OBJECTS, STATES AND RULES

Distinct labelled objects or cash-piece identities, authoritative state, count/rank/value ledger, prediction, reveal and local reset. **Control map:** Predict higher value; show cents conversion; inspect coin diameter and value; mark fictional; Reveal; Reset.

- No props, no external mode/configuration contract, no shared state between Scene instances. Scenario constants live inside this standalone Scene when a Coding Agent later implements it.
- Counts, pairs, ordinal ranks and EUR totals are always derived from the exact objects shown; valid actions preserve declared invariants and never silently add or discard identities.
- A rejected/incomplete action explains what is missing and allows correction. Reset restores only this Scene.
- There is no Question/Quiz, scoring, mastery, analytics event or Note persistence hook.

## VISUAL / AUDIO / MEDIA DIRECTION

Simple semantic HTML/SVG schematic objects and labelled values, child-paced transitions, immediate equivalents in reduced-motion mode. No mandatory audio, remote asset, drag or animation. Currency artwork, if later needed, requires rights and face-value verification; these specifications do not provide or claim licensed imagery.

## LOCALIZATION, DIRECTION AND ACCESSIBILITY

All prompts, counts, roles, numeric utterances, errors and actions need complete genuine translations for every locale (no English fallback). Nonvisual sequential state ledger and native keyboard/switch/touch controls convey exactly the same mathematics; labels never depend only on color or spatial position. RTL preserves explicit task origins, pair IDs and currency units. Plan WCAG 2.2 AA, 200% zoom, mobile and downloaded selected-locale offline functionality; not currently implemented.

## ACCEPTANCE SCENARIOS

1. 50c width 24.25mm>€1 width 23.25mm; monetary 50c<100c. Incorrect case: If 50 picked due to numeral or size, normalize to 50 versus 100 cents.
2. €5 banknote exists; standard €5 coin does not. Incorrect case: If coin accepted, display verified euro coin list ending at €2.
3. Real coin diameters and denomination lists match official sources; units kept consistent; fictional coin clearly identified.
4. Keyboard, screen reader, RTL, reduced motion and offline use produce numerically identical results and explanations; resets do not alter other scenes.

## IMPLEMENTATION DEPENDENCIES AND OPEN QUESTIONS

The generic Scene resource exists but this custom Scene does **not**. Explicit editor approval of the Methodologist Brief and each Scene is pending. Later implementation must use verified localization context, self-contained prop-free components, own tests, true WCAG/RTL/offline checks and no invented APIs.
