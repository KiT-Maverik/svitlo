# Pair Surprise — Scene Specification

Status: **Provisional Draft — pending Methodologist and Scene approval**
Owner: Educational Screenwriter
Parent Lesson / Section: [Does Every Object Have a Partner? Content](../content.md), Section 3
Methodologist objectives: [Draft Methodologist Brief](../methodologist-brief.md)
Implementation status: Proposed prop-free component; not implemented

## LEARNER PURPOSE AND CONCEPT

Classify even and odd counts by dividing objects into disjoint pairs, explaining when an item is left without a partner and why arrangement cannot change parity. This Scene's distinct responsibility is its own concrete model, prediction and learner-operated evidence.

## ACCURATE CONTENT AND MODEL LIMITATIONS

Eight objects form four disjoint pairs and no leftover: even. Nine form four pairs and one unmatched object: odd. Twelve form six pairs whether regular or scattered: even. Thirteen form six pairs and one unmatched object: odd. Zero is even mathematically, but introduced only as optional extension.

**Initial state:** Twelve named dots shown first as tidy rows and then scattered without changing IDs; new thirteen-shell challenge.

**Authoritative interactive model:** Stable IDs, layout variant, disjoint pair list, unpaired summary. Layout change alters position only, not quantity.

**Boundaries:** Grade 2 concrete collections of 1–15 items; no negative integers, formal divisibility test, memorized final-digit shortcut or scoring.

## EXPERIENCE BEATS AND LEARNER ACTIONS

### Beat 1

- **Learner-facing prompt:** “Does scattering twelve dots turn them odd?”
- **Learner action:** Scatter same twelve distinct dots, then make six pairs.
- **Visible mathematical conclusion:** Twelve remains even.
- **Specific explanatory feedback:** If odd due to crooked layout, match each dot before and after and show six complete pairs.
- **Verified expected result:** 12=6 pairs +0 both ways.
- **Control:** The child can reveal the worked explanation and retry without a score or automatic pass.

### Beat 2

- **Learner-facing prompt:** “Prove whether thirteen shells are even or odd.”
- **Learner action:** Independent thirteen-shell case; form six disjoint pairs and count remaining one.
- **Visible mathematical conclusion:** Thirteen is odd.
- **Specific explanatory feedback:** If two shells unmatched, show they can still form one pair before deciding.
- **Verified expected result:** 13=6 pairs +1 leftover.
- **Control:** The child can reveal the worked explanation and retry without a score or automatic pass.

## INTERACTIVE OBJECTS, STATES AND RULES

Distinct labelled objects or cash-piece identities, authoritative state, count/rank/value ledger, prediction, reveal and local reset. **Control map:** Scatter/restore; Pair distinct objects; Undo; Show ledger; Reset.

- No props, no external mode/configuration contract, no shared state between Scene instances. Scenario constants live inside this standalone Scene when a Coding Agent later implements it.
- Counts, pairs, ordinal ranks and EUR totals are always derived from the exact objects shown; valid actions preserve declared invariants and never silently add or discard identities.
- A rejected/incomplete action explains what is missing and allows correction. Reset restores only this Scene.
- There is no Question/Quiz, scoring, mastery, analytics event or Note persistence hook.

## VISUAL / AUDIO / MEDIA DIRECTION

Simple semantic HTML/SVG schematic objects and labelled values, child-paced transitions, immediate equivalents in reduced-motion mode. No mandatory audio, remote asset, drag or animation. Currency artwork, if later needed, requires rights and face-value verification; these specifications do not provide or claim licensed imagery.

## LOCALIZATION, DIRECTION AND ACCESSIBILITY

All prompts, counts, roles, numeric utterances, errors and actions need complete genuine translations for every locale (no English fallback). Nonvisual sequential state ledger and native keyboard/switch/touch controls convey exactly the same mathematics; labels never depend only on color or spatial position. RTL preserves explicit task origins, pair IDs and currency units. Plan WCAG 2.2 AA, 200% zoom, mobile and downloaded selected-locale offline functionality; not currently implemented.

## ACCEPTANCE SCENARIOS

1. 12=6 pairs +0 both ways. Incorrect case: If odd due to crooked layout, match each dot before and after and show six complete pairs.
2. 13=6 pairs +1 leftover. Incorrect case: If two shells unmatched, show they can still form one pair before deciding.
3. Twelve stays even through arrangement changes; thirteen yields exactly one leftover; nonvisual pairing works.
4. Keyboard, screen reader, RTL, reduced motion and offline use produce numerically identical results and explanations; resets do not alter other scenes.

## IMPLEMENTATION DEPENDENCIES AND OPEN QUESTIONS

The generic Scene resource exists but this custom Scene does **not**. Explicit editor approval of the Methodologist Brief and each Scene is pending. Later implementation must use verified localization context, self-contained prop-free components, own tests, true WCAG/RTL/offline checks and no invented APIs.
