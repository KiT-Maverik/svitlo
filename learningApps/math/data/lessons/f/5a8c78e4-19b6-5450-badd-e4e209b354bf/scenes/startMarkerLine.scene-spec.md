# Start Marker Line — Scene Specification

Status: **Provisional Draft — pending Methodologist and Scene approval**
Owner: Educational Screenwriter
Parent Lesson / Section: [Which One Is Third? Position Depends on the Start Content](../content.md), Section 1
Methodologist objectives: [Draft Methodologist Brief](../methodologist-brief.md)
Implementation status: Proposed prop-free component; not implemented

## LEARNER PURPOSE AND CONCEPT

Recognize the ordinal position of an object in an explicitly directed sequence; distinguish its rank from the number of objects and show that changing origin or order changes rank but not total. This Scene's distinct responsibility is its own concrete model, prediction and learner-operated evidence.

## ACCURATE CONTENT AND MODEL LIMITATIONS

For A,B,C,D,E,F counted from A, C is third; counted from F, C is fourth. The total remains six in both cases. Swapping Star and Rain in Sun,Moon,Star,Cloud,Rain makes Star fifth while total stays five. Ordinal position is relative to an order and its starting direction.

**Initial state:** Six identifiable bags A,B,C,D,E,F and explicit START initially at A. Child can deliberately switch START to F. C is the focus object.

**Authoritative interactive model:** START end A or F; selected bag identity, prediction, trace ledger and total six. Position is i+1 from A, 6-i from F; changing START does not move bags.

**Boundaries:** Grade 1: five or six identifiable items and explicit START marker; no number-line lengths, sorting magnitude, ordinal spelling drills, speed tests or grades.

## EXPERIENCE BEATS AND LEARNER ACTIONS

### Beat 1

- **Learner-facing prompt:** “Which bag is third from START at A?”
- **Learner action:** Learner traces A first, B second, C third.
- **Visible mathematical conclusion:** C is third; six bags total.
- **Specific explanatory feedback:** Choosing D triggers A=first, B=second, C=third, D=fourth.
- **Verified expected result:** C third from A; six in total.
- **Control:** The child can reveal the worked explanation and retry without a score or automatic pass.

### Beat 2

- **Learner-facing prompt:** “Now START at F. Where is C?”
- **Learner action:** Learner predicts then counts F,E,D,C.
- **Visible mathematical conclusion:** C is fourth; still six bags.
- **Specific explanatory feedback:** For third, show F first, E second, D third, C fourth.
- **Verified expected result:** C fourth from F; six in total.
- **Control:** The child can reveal the worked explanation and retry without a score or automatic pass.

## INTERACTIVE OBJECTS, STATES AND RULES

Distinct labelled objects or cash-piece identities, authoritative state, count/rank/value ledger, prediction, reveal and local reset. **Control map:** Select START end; select bag; Step from START; Reveal trace; Reset.

- No props, no external mode/configuration contract, no shared state between Scene instances. Scenario constants live inside this standalone Scene when a Coding Agent later implements it.
- Counts, pairs, ordinal ranks and EUR totals are always derived from the exact objects shown; valid actions preserve declared invariants and never silently add or discard identities.
- A rejected/incomplete action explains what is missing and allows correction. Reset restores only this Scene.
- There is no Question/Quiz, scoring, mastery, analytics event or Note persistence hook.

## VISUAL / AUDIO / MEDIA DIRECTION

Simple semantic HTML/SVG schematic objects and labelled values, child-paced transitions, immediate equivalents in reduced-motion mode. No mandatory audio, remote asset, drag or animation. Currency artwork, if later needed, requires rights and face-value verification; these specifications do not provide or claim licensed imagery.

## LOCALIZATION, DIRECTION AND ACCESSIBILITY

All prompts, counts, roles, numeric utterances, errors and actions need complete genuine translations for every locale (no English fallback). Nonvisual sequential state ledger and native keyboard/switch/touch controls convey exactly the same mathematics; labels never depend only on color or spatial position. RTL preserves explicit task origins, pair IDs and currency units. Plan WCAG 2.2 AA, 200% zoom, mobile and downloaded selected-locale offline functionality; not currently implemented.

## ACCEPTANCE SCENARIOS

1. C third from A; six in total. Incorrect case: Choosing D triggers A=first, B=second, C=third, D=fourth.
2. C fourth from F; six in total. Incorrect case: For third, show F first, E second, D third, C fourth.
3. A-origin gives third; F-origin gives fourth; neither changes six stable bag identities. Reset restores A-origin.
4. Keyboard, screen reader, RTL, reduced motion and offline use produce numerically identical results and explanations; resets do not alter other scenes.

## IMPLEMENTATION DEPENDENCIES AND OPEN QUESTIONS

The generic Scene resource exists but this custom Scene does **not**. Explicit editor approval of the Methodologist Brief and each Scene is pending. Later implementation must use verified localization context, self-contained prop-free components, own tests, true WCAG/RTL/offline checks and no invented APIs.
