# Two-Step Transfer — Scene Specification

Status: **Provisional Draft — pending Methodologist and independent Scene approval**
Owner: Educational Screenwriter
Parent Lesson / Section: [Two at a Time: Counting Pairs Content](../content.md), Section 3
Methodologist objectives: [Methodologist Brief](../methodologist-brief.md) (**Draft, not approved**)
Implementation status: Proposed standalone **prop-free Scene**, not implemented

## LEARNER PURPOSE AND CONCEPT

Transfer +2 grouping to a novel setting with more groups, then contrast a starting amount of one with adding groups of two.

**Underlying number relationship:** A pair contains exactly two items, so each additional separate pair increases the total number of items by two, while the count of pairs increases by one. Starting with zero objects and adding pairs gives totals 0,2,4,6,8,10: one pair has 2 objects, three pairs 6, five pairs 10. Six pairs contain 12 individual items; seven pairs contain 14. Counting by twos means repeated +2 and can also start at 1: one loose object plus successive pairs gives 1,3,5,7,9. Thus 'count by twos' does not mean every starting number is even; the start is a separate fact. Group count and item count are distinct.

The child must be able to change or examine the representation, form a prediction, see the exact model and explain why a plausible wrong shortcut fails.

## ACCURATE CONTENT AND MODEL LIMITATIONS

**Initial state:** Challenge 1: six separately numbered two-object pairs of socks, one more pair can be added (seven pairs). Challenge 2: one loose bead and separate two-bead strips; up to four whole strips can be added.

**Model and invariant:** Selected preset (sock pairs or one loose bead plus strips); immutable start amount 0 for sock preset or 1 for bead preset, count of whole two-item groups and total=start+2×groups. Independent prediction, explanation and local reset.

**Numerical and pedagogical limits:** Grade 2: up to seven concrete pairs (14 objects) and one-loose-plus-four-pairs transfer (9 objects). No general multiplication theorem, memorized times tables, abstract parity proof, fraction pairs or large counts. This differs from algebra's `numberPatterns`: the target is pair quantity and constant group addition, not inferring arbitrary unknown rules.

**Boundary case / nuance:** A +2 step never discards the one starting bead; sock challenge cannot silently count pair units as individual units; switching presets resets only the transfer Scene.

## EXPERIENCE BEATS AND LEARNER ACTIONS

### Beat 1 — Six pairs of socks are on a shelf. Without counting every sock, how many socks? Add one more pair.

1. **Invitation:** “Six pairs of socks are on a shelf. Without counting every sock, how many socks? Add one more pair.”
2. **Controllable investigation:** Inspect six pair labels, apply 2,4,6,8,10,12, then add pair seven to show 14 socks.
3. **Correct visible consequence:** Six pairs contain twelve socks; seven pairs contain fourteen.
4. **Worked number evidence:** 6×2=12; (6+1) pairs=14 socks, represented through repeated +2.
5. **Mistaken or incomplete route:** If six or seven socks chosen, distinguish pairs from individual socks and enumerate 2 for each complete pair.
6. **Explanatory Reveal and replay:** Permit a full annotated number/object ledger before retry, with no score or time limit. The child can also reset just this Scene without locking other Sections.

### Beat 2 — Start with one loose bead. Add pairs of beads. What totals do you visit?

1. **Invitation:** “Start with one loose bead. Add pairs of beads. What totals do you visit?”
2. **Controllable investigation:** Keep the single initial bead fixed and add four two-bead strips one at a time. Read 1,3,5,7,9.
3. **Correct visible consequence:** The total always rises by two even though all displayed totals are odd.
4. **Worked number evidence:** 1→3→5→7→9: step +2 with initial 1.
5. **Mistaken or incomplete route:** If even totals predicted because the jump is two, distinguish the one loose starting bead from each later pair; 1+2=3.
6. **Explanatory Reveal and replay:** Permit a full annotated number/object ledger before retry, with no score or time limit. The child can also reset just this Scene without locking other Sections.

## INTERACTIVE OBJECTS, STATES AND RULES

- **Semantic objects:** Named countable group members, ticks, operands or operator controls, each with stable identity, a visible state and an equivalent ordered textual ledger.
- **Control map:** Choose scenario; Add one group of two; Inspect total count and group count; Predict; Reveal; Reset.
- **Deterministic state:** The numbers, chosen preset, group members, selected values, prediction, Reveal state and Reset all come from the self-contained Scene's own constants and actions, not caller props.
- **Integrity:** Every displayed result, spoken/narrated number, count, step or comparison derives from the same authoritative model. Prevent duplicate membership or phantom items. Do not silently mutate counts when moving viewports, swapping layout direction or resetting.
- **Independence:** The proposed component has **no props** and no mutable state shared with a Lesson or another Scene; each Section contains its own independently resettable placement.
- **Boundaries:** A +2 step never discards the one starting bead; sock challenge cannot silently count pair units as individual units; switching presets resets only the transfer Scene.
- **Assessment boundary:** Prediction and feedback are formative only. No Question bank, Quiz, correct-answer security contract, mastery metric, score, persistent Note event, timed completion or invented platform API.

## VISUAL / AUDIO / MEDIA DIRECTION

Use lightweight HTML/SVG or ordinary semantic controls for individual items and groups, with a concise number ledger. Animation may highlight an interval, pair or new group but may never be the only carrier of information; reduced-motion mode updates state immediately. No required audio, live external service, asset generation or ornamental 3D. If optional sound is added later, localized captions/transcripts and downloaded media must preserve full learning.

## LOCALIZATION, DIRECTION AND ACCESSIBILITY

Ordered ledger names preset start, group count, item count and every +2 increase. Equivalent keyboard actions and meaningful numeric labels work in both LTR/RTL without requiring visual grouping.

Every learner-facing prompt, number word, accessible description, feedback branch, state announcement and Note requires a complete genuine translation for the current Engine-supported roster, with no silent English fallback. RTL changes reading presentation but not mathematical operand order, number-line increasing direction, counting origin or grouping identity. WCAG 2.2 AA: native keyboard/switch/touch operation, visible focus, nonvisual ordered model ledger, non-color explanations, reduced motion, legible 200% zoom/mobile experience. All selected-language models, scripts, assets and feedback must be locally available after the lesson package is downloaded. These are production requirements, not claims that localization/PWA behavior currently exists.

## ACCEPTANCE SCENARIOS

1. Six pairs=12 individual socks; seven pairs=14.
2. One loose plus four pairs=9 objects with totals 1,3,5,7,9.
3. Switching scenarios cannot carry over group counts.
4. All readouts distinguish group count from member count.
5. For Beat 1, verify exact expected result: 6×2=12; (6+1) pairs=14 socks, represented through repeated +2. Test plausible wrong response: If six or seven socks chosen, distinguish pairs from individual socks and enumerate 2 for each complete pair.
6. For Beat 2, verify exact expected result: 1→3→5→7→9: step +2 with initial 1. Test plausible wrong response: If even totals predicted because the jump is two, distinguish the one loose starting bead from each later pair; 1+2=3.
7. All interactions work by keyboard, switch and touch with full nonvisual ledger, correct semantic RTL, reduced motion, mobile/high zoom and identical downloaded-offline mathematics.
8. Reset affects this Scene only, not another Section; no scoring or unimplemented Note event is emitted.

## IMPLEMENTATION DEPENDENCIES AND OPEN QUESTIONS

Each custom Scene is independently initialized, self-contained and **prop-free**; no caller supplies mode or numerical props. Scenarios and variables reside in that Scene's own authored module once implemented. The generic `scene` Resource type is supported, but this particular Scene has **not** been implemented. No invented API, registration, event, Note persistence, assessment, score or mastery side effect is assumed.

Editor must explicitly approve the Methodologist Brief and each proposed Content/Scene separately. Then the Scene Designer/Coding Agent implements real React code and tests in another authorized stage. QA must test all positive/negative cases, complete locales, RTL, accessibility and offline packaging; this Draft creates none of those features.
