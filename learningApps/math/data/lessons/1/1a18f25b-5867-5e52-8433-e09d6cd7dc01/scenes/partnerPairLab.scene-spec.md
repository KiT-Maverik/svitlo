# Partner Pair Lab — Scene Specification

Status: **Provisional Draft — pending Methodologist and Scene approval**
Owner: Educational Screenwriter
Parent Lesson / Section: [Does Every Object Have a Partner? Content](../content.md), Section 1
Methodologist objectives: [Draft Methodologist Brief](../methodologist-brief.md)
Implementation status: Proposed prop-free component; not implemented

## LEARNER PURPOSE AND CONCEPT

Classify even and odd counts by dividing objects into disjoint pairs, explaining when an item is left without a partner and why arrangement cannot change parity. This Scene's distinct responsibility is its own concrete model, prediction and learner-operated evidence.

## ACCURATE CONTENT AND MODEL LIMITATIONS

Eight objects form four disjoint pairs and no leftover: even. Nine form four pairs and one unmatched object: odd. Twelve form six pairs whether regular or scattered: even. Thirteen form six pairs and one unmatched object: odd. Zero is even mathematically, but introduced only as optional extension.

**Initial state:** Eight named cards initially unpaired; the ninth can be added on command.

**Authoritative interactive model:** Stable card IDs and disjoint two-card pair list. A card can appear in one pair only. Undo restores two available cards; total and unmatched ledger derived from authoritative state.

**Boundaries:** Grade 2 concrete collections of 1–15 items; no negative integers, formal divisibility test, memorized final-digit shortcut or scoring.

## EXPERIENCE BEATS AND LEARNER ACTIONS

### Beat 1

- **Learner-facing prompt:** “Can all eight cards find a partner?”
- **Learner action:** Make four disjoint pairs, for example 1–2,3–4,5–6,7–8.
- **Visible mathematical conclusion:** Eight is even, zero leftover.
- **Specific explanatory feedback:** If odd because four groups are visible, compare number of objects left alone: zero.
- **Verified expected result:** 8=4 pairs +0 leftover.
- **Control:** The child can reveal the worked explanation and retry without a score or automatic pass.

### Beat 2

- **Learner-facing prompt:** “One ninth card arrives. Is it still even?”
- **Learner action:** Add a ninth card and inspect the four existing pairs and one unmatched card.
- **Visible mathematical conclusion:** Nine is odd, one leftover.
- **Specific explanatory feedback:** If even selected, point to unpaired ninth card and its missing partner.
- **Verified expected result:** 9=4 pairs +1 leftover.
- **Control:** The child can reveal the worked explanation and retry without a score or automatic pass.

## INTERACTIVE OBJECTS, STATES AND RULES

Distinct labelled objects or cash-piece identities, authoritative state, count/rank/value ledger, prediction, reveal and local reset. **Control map:** Select two available cards / Pair next two sequentially; Undo; Add ninth; Reveal; Reset.

- No props, no external mode/configuration contract, no shared state between Scene instances. Scenario constants live inside this standalone Scene when a Coding Agent later implements it.
- Counts, pairs, ordinal ranks and EUR totals are always derived from the exact objects shown; valid actions preserve declared invariants and never silently add or discard identities.
- A rejected/incomplete action explains what is missing and allows correction. Reset restores only this Scene.
- There is no Question/Quiz, scoring, mastery, analytics event or Note persistence hook.

## VISUAL / AUDIO / MEDIA DIRECTION

Simple semantic HTML/SVG schematic objects and labelled values, child-paced transitions, immediate equivalents in reduced-motion mode. No mandatory audio, remote asset, drag or animation. Currency artwork, if later needed, requires rights and face-value verification; these specifications do not provide or claim licensed imagery.

## LOCALIZATION, DIRECTION AND ACCESSIBILITY

All prompts, counts, roles, numeric utterances, errors and actions need complete genuine translations for every locale (no English fallback). Nonvisual sequential state ledger and native keyboard/switch/touch controls convey exactly the same mathematics; labels never depend only on color or spatial position. RTL preserves explicit task origins, pair IDs and currency units. Plan WCAG 2.2 AA, 200% zoom, mobile and downloaded selected-locale offline functionality; not currently implemented.

## ACCEPTANCE SCENARIOS

1. 8=4 pairs +0 leftover. Incorrect case: If odd because four groups are visible, compare number of objects left alone: zero.
2. 9=4 pairs +1 leftover. Incorrect case: If even selected, point to unpaired ninth card and its missing partner.
3. No double-membership; 8 has zero leftovers, 9 has one, undo/reset stay local.
4. Keyboard, screen reader, RTL, reduced motion and offline use produce numerically identical results and explanations; resets do not alter other scenes.

## IMPLEMENTATION DEPENDENCIES AND OPEN QUESTIONS

The generic Scene resource exists but this custom Scene does **not**. Explicit editor approval of the Methodologist Brief and each Scene is pending. Later implementation must use verified localization context, self-contained prop-free components, own tests, true WCAG/RTL/offline checks and no invented APIs.
