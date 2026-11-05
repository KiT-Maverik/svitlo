# Euro Cash Viewer — Scene Specification

Status: **Provisional Draft — pending Methodologist and Scene approval**
Owner: Educational Screenwriter
Parent Lesson / Section: [Read the Value: Euro Coins and Banknotes Content](../content.md), Section 1
Methodologist objectives: [Draft Methodologist Brief](../methodologist-brief.md)
Implementation status: Proposed prop-free component; not implemented

## LEARNER PURPOSE AND CONCEPT

Recognize actual denominations in an explicitly named euro currency case study, and distinguish face value from physical size or national-side design. This Scene's distinct responsibility is its own concrete model, prediction and learner-operated evidence.

## ACCURATE CONTENT AND MODEL LIMITATIONS

Euro coins: 1,2,5,10,20,50 cents, and one/two euros. Europa-series banknotes include five and ten euros. Standard circulating five-euro coin does not exist. Fifty-cent coin diameter 24.25 mm exceeds one-euro coin diameter 23.25 mm, but one euro equals 100 cents and exceeds 50 cents in value.

**Initial state:** Schematic labelled €1 coin, €2 coin, €5 note, €10 note; two labelled descriptions of different national sides for the same €2 value.

**Authoritative interactive model:** Selected item, coin or banknote kind, face value, optional national-side description. No amounts are added.

**Boundaries:** Grade 2 real euro case study; core items one- and two-euro coins plus five- and ten-euro notes; 50-cent contrast supported by explicit conversion reference. No changing currency automatically with UI locale, no purchase or exchange rates, no unlicensed banknote art.

## EXPERIENCE BEATS AND LEARNER ACTIONS

### Beat 1

- **Learner-facing prompt:** “Find the €2 coin and the €5 banknote.”
- **Learner action:** Inspect four schematics with readable face value and kind.
- **Visible mathematical conclusion:** €2 is a coin and €5 a note.
- **Specific explanatory feedback:** If a €5 coin selected, show ECB euro coins top out at €2 (as well as smaller cent coins).
- **Verified expected result:** €1/€2 coins; €5/€10 banknotes.
- **Control:** The child can reveal the worked explanation and retry without a score or automatic pass.

### Beat 2

- **Learner-facing prompt:** “Does different artwork change a €2 coin value?”
- **Learner action:** Show two labelled national-side descriptions on the same €2 schematic.
- **Visible mathematical conclusion:** Both are worth €2.
- **Specific explanatory feedback:** If values guessed different, show the unchanged face label €2.
- **Verified expected result:** €2 remains €2 irrespective of national-side artwork.
- **Control:** The child can reveal the worked explanation and retry without a score or automatic pass.

## INTERACTIVE OBJECTS, STATES AND RULES

Distinct labelled objects or cash-piece identities, authoritative state, count/rank/value ledger, prediction, reveal and local reset. **Control map:** Choose item; inspect denomination/kind; switch schematic country-side description; Reveal; Reset.

- No props, no external mode/configuration contract, no shared state between Scene instances. Scenario constants live inside this standalone Scene when a Coding Agent later implements it.
- Counts, pairs, ordinal ranks and EUR totals are always derived from the exact objects shown; valid actions preserve declared invariants and never silently add or discard identities.
- A rejected/incomplete action explains what is missing and allows correction. Reset restores only this Scene.
- There is no Question/Quiz, scoring, mastery, analytics event or Note persistence hook.

## VISUAL / AUDIO / MEDIA DIRECTION

Simple semantic HTML/SVG schematic objects and labelled values, child-paced transitions, immediate equivalents in reduced-motion mode. No mandatory audio, remote asset, drag or animation. Currency artwork, if later needed, requires rights and face-value verification; these specifications do not provide or claim licensed imagery.

## LOCALIZATION, DIRECTION AND ACCESSIBILITY

All prompts, counts, roles, numeric utterances, errors and actions need complete genuine translations for every locale (no English fallback). Nonvisual sequential state ledger and native keyboard/switch/touch controls convey exactly the same mathematics; labels never depend only on color or spatial position. RTL preserves explicit task origins, pair IDs and currency units. Plan WCAG 2.2 AA, 200% zoom, mobile and downloaded selected-locale offline functionality; not currently implemented.

## ACCEPTANCE SCENARIOS

1. €1/€2 coins; €5/€10 banknotes. Incorrect case: If a €5 coin selected, show ECB euro coins top out at €2 (as well as smaller cent coins).
2. €2 remains €2 irrespective of national-side artwork. Incorrect case: If values guessed different, show the unchanged face label €2.
3. All illustrated pieces explicitly schematic; euro cash type values correct; no imaginary ordinary €5 coin presented as real.
4. Keyboard, screen reader, RTL, reduced motion and offline use produce numerically identical results and explanations; resets do not alter other scenes.

## IMPLEMENTATION DEPENDENCIES AND OPEN QUESTIONS

The generic Scene resource exists but this custom Scene does **not**. Explicit editor approval of the Methodologist Brief and each Scene is pending. Later implementation must use verified localization context, self-contained prop-free components, own tests, true WCAG/RTL/offline checks and no invented APIs.
