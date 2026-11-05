# Pair-Step Workbench — Scene Specification

Status: **Provisional Draft — pending Methodologist and independent Scene approval**
Owner: Educational Screenwriter
Parent Lesson / Section: [Two at a Time: Counting Pairs Content](../content.md), Section 1
Methodologist objectives: [Methodologist Brief](../methodologist-brief.md) (**Draft, not approved**)
Implementation status: Proposed standalone **prop-free Scene**, not implemented

## LEARNER PURPOSE AND CONCEPT

Make +2 observable as the consequence of adding one distinct pair and retain separate counters for pairs and individual objects.

**Underlying number relationship:** A pair contains exactly two items, so each additional separate pair increases the total number of items by two, while the count of pairs increases by one. Starting with zero objects and adding pairs gives totals 0,2,4,6,8,10: one pair has 2 objects, three pairs 6, five pairs 10. Six pairs contain 12 individual items; seven pairs contain 14. Counting by twos means repeated +2 and can also start at 1: one loose object plus successive pairs gives 1,3,5,7,9. Thus 'count by twos' does not mean every starting number is even; the start is a separate fact. Group count and item count are distinct.

The child must be able to change or examine the representation, form a prediction, see the exact model and explain why a plausible wrong shortcut fails.

## ACCURATE CONTENT AND MODEL LIMITATIONS

**Initial state:** Empty workbench with pair shelf; a new-pair action produces two separately named mittens joined as pair 1, pair 2, etc., up to five pairs. Two ledgers show number of pairs and total individual mittens.

**Model and invariant:** List of complete disjoint pair IDs, exactly two child object IDs per pair, totalItems = 2×pairCount, current prediction, step log and reset. Adding a pair increments pairCount by 1 and itemCount by 2; no loose mittens in this first Scene.

**Numerical and pedagogical limits:** Grade 2: up to seven concrete pairs (14 objects) and one-loose-plus-four-pairs transfer (9 objects). No general multiplication theorem, memorized times tables, abstract parity proof, fraction pairs or large counts. This differs from algebra's `numberPatterns`: the target is pair quantity and constant group addition, not inferring arbitrary unknown rules.

**Boundary case / nuance:** A pair cannot be partially added or contain three objects; Add Pair is the only quantity-increasing action. A child may inspect individual members whenever wanted; source pair/member IDs must remain unique.

## EXPERIENCE BEATS AND LEARNER ACTIONS

### Beat 1 — Add one pair at a time. What totals do you see after one, two, three pairs?

1. **Invitation:** “Add one pair at a time. What totals do you see after one, two, three pairs?”
2. **Controllable investigation:** Add pairs 1,2,3; observe totals 2,4,6. Compare groups count 3 with item count 6.
3. **Correct visible consequence:** After three groups of two, there are six individual mittens.
4. **Worked number evidence:** 3 pairs, 6 mittens; 2→4→6.
5. **Mistaken or incomplete route:** If three objects is predicted, point to two individual members in each of three distinct groups: 2+2+2.
6. **Explanatory Reveal and replay:** Permit a full annotated number/object ledger before retry, with no score or time limit. The child can also reset just this Scene without locking other Sections.

### Beat 2 — Keep adding until you have five pairs. How many mittens now?

1. **Invitation:** “Keep adding until you have five pairs. How many mittens now?”
2. **Controllable investigation:** Add pair 4 then pair 5, advancing total 8 then 10 without recounting from the first mitten.
3. **Correct visible consequence:** Five pairs have ten mittens; each addition increased total by two.
4. **Worked number evidence:** 4 pairs=8; 5 pairs=10.
5. **Mistaken or incomplete route:** If nine is predicted, count the last pair's two members added to the earlier eight: 8+2=10.
6. **Explanatory Reveal and replay:** Permit a full annotated number/object ledger before retry, with no score or time limit. The child can also reset just this Scene without locking other Sections.

## INTERACTIVE OBJECTS, STATES AND RULES

- **Semantic objects:** Named countable group members, ticks, operands or operator controls, each with stable identity, a visible state and an equivalent ordered textual ledger.
- **Control map:** Add one full pair; Remove last pair; Predict next object total; Reveal per-pair ledger; Reset.
- **Deterministic state:** The numbers, chosen preset, group members, selected values, prediction, Reveal state and Reset all come from the self-contained Scene's own constants and actions, not caller props.
- **Integrity:** Every displayed result, spoken/narrated number, count, step or comparison derives from the same authoritative model. Prevent duplicate membership or phantom items. Do not silently mutate counts when moving viewports, swapping layout direction or resetting.
- **Independence:** The proposed component has **no props** and no mutable state shared with a Lesson or another Scene; each Section contains its own independently resettable placement.
- **Boundaries:** A pair cannot be partially added or contain three objects; Add Pair is the only quantity-increasing action. A child may inspect individual members whenever wanted; source pair/member IDs must remain unique.
- **Assessment boundary:** Prediction and feedback are formative only. No Question bank, Quiz, correct-answer security contract, mastery metric, score, persistent Note event, timed completion or invented platform API.

## VISUAL / AUDIO / MEDIA DIRECTION

Use lightweight HTML/SVG or ordinary semantic controls for individual items and groups, with a concise number ledger. Animation may highlight an interval, pair or new group but may never be the only carrier of information; reduced-motion mode updates state immediately. No required audio, live external service, asset generation or ornamental 3D. If optional sound is added later, localized captions/transcripts and downloaded media must preserve full learning.

## LOCALIZATION, DIRECTION AND ACCESSIBILITY

The two ledgers are separately labelled 'number of pairs' and 'number of mittens'. Announce 'pair 4 added, two mittens, total eight' without color-only markers; keyboard and switch add a whole pair without dragging.

Every learner-facing prompt, number word, accessible description, feedback branch, state announcement and Note requires a complete genuine translation for the current Engine-supported roster, with no silent English fallback. RTL changes reading presentation but not mathematical operand order, number-line increasing direction, counting origin or grouping identity. WCAG 2.2 AA: native keyboard/switch/touch operation, visible focus, nonvisual ordered model ledger, non-color explanations, reduced motion, legible 200% zoom/mobile experience. All selected-language models, scripts, assets and feedback must be locally available after the lesson package is downloaded. These are production requirements, not claims that localization/PWA behavior currently exists.

## ACCEPTANCE SCENARIOS

1. 0→1→2→3 pairs produces 0→2→4→6 objects.
2. Five pairs have exactly ten separate items.
3. Removing a pair decreases pair count by one and object count by two.
4. No item belongs to two pairs; no phantom loose item appears.
5. For Beat 1, verify exact expected result: 3 pairs, 6 mittens; 2→4→6. Test plausible wrong response: If three objects is predicted, point to two individual members in each of three distinct groups: 2+2+2.
6. For Beat 2, verify exact expected result: 4 pairs=8; 5 pairs=10. Test plausible wrong response: If nine is predicted, count the last pair's two members added to the earlier eight: 8+2=10.
7. All interactions work by keyboard, switch and touch with full nonvisual ledger, correct semantic RTL, reduced motion, mobile/high zoom and identical downloaded-offline mathematics.
8. Reset affects this Scene only, not another Section; no scoring or unimplemented Note event is emitted.

## IMPLEMENTATION DEPENDENCIES AND OPEN QUESTIONS

Each custom Scene is independently initialized, self-contained and **prop-free**; no caller supplies mode or numerical props. Scenarios and variables reside in that Scene's own authored module once implemented. The generic `scene` Resource type is supported, but this particular Scene has **not** been implemented. No invented API, registration, event, Note persistence, assessment, score or mastery side effect is assumed.

Editor must explicitly approve the Methodologist Brief and each proposed Content/Scene separately. Then the Scene Designer/Coding Agent implements real React code and tests in another authorized stage. QA must test all positive/negative cases, complete locales, RTL, accessibility and offline packaging; this Draft creates none of those features.
