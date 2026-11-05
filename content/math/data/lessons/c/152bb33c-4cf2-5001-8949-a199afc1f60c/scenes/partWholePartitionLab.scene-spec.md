# Part–Whole Partition Lab — Scene Specification

**Status:** Provisional Draft — pending Methodologist/editor approval.  
**Owner:** Educational Screenwriter.  
**Parent:** [Lesson Content](../content.md), Sections 1–4; [Draft Brief](../methodologist-brief.md).  
**Technical status:** New proposed prop-free, self-contained Scene; not implemented.

## Mathematical invariant and learner purpose

Two **disjoint** groups cover exactly one counted whole. When part A and part B are both known, whole = A + B. When whole and a part are known, missing part = whole − known part, with nonnegative count and an explicit premise that there are no additional categories. Preserve object count when changing the question from unknown whole to unknown part. A color shift or a new hidden label never creates or destroys objects. Learner actions are for instruction, not a scored Question or proof of Skill mastery.

## Scenario A — two known parts, unknown whole (Section 1)

Display **6 red buttons** and **4 blue buttons** as two countable, separately labeled piles. Ask “How many buttons altogether?” with the total hidden. A learner can use an accessible **Join groups** action (not mandatory drag), revealing 10 in a whole tray and the expression **6 + 4 = 10 buttons**. If learner predicts 6, explain “That is only the red group; the blue group has four more buttons.” If a learner guesses 14, show the six-plus-four count rather than only a correctness icon. Maintain source group labels after joining. A “Split again” action reveals the original partition without changing the total.

## Scenario B — known whole, unknown part (Section 2)

Begin with one full tray of **10 buttons**, exactly six labeled red; the other four remain as **unknown ‘all the rest are blue’**. Ask which amount is included inside the whole rather than a separate amount added to ten. Learner selects a missing-part value with stepper, number entry, or optional token placement; 4 gives **10 − 6 = 4**, and reverse recombination **6 + 4 = 10**. For 16, say “Ten already includes six red; adding six again double-counts those buttons.” For candidate 5, say “Six and five would make eleven, more than the known whole ten.”

## Scenario C — change the question, not the objects (Section 3)

A stable **ten-button** collection consists of six red and four blue. Independently present three question cards:

1. **Whole unknown:** given 6 and 4 → 6 + 4 = **10**.
2. **Blue part unknown:** whole 10 and red 6 → 10 − 6 = **4**.
3. **Red part unknown:** whole 10 and blue 4 → 10 − 4 = **6**.
   Optional fourth variant: all ten red and “rest blue” yields **10 − 10 = 0 blue**. A user can inspect which role has the question mark and request an explanation before answering. Wrong operation feedback must identify whether the whole was _already_ known; no keyword-only arithmetic. Each question card opens as a new local starting state, independent of Sections A/B.

## Scenario D — independent transfer (Section 4)

Story: 15 marbles in a bag, 9 green, **all remaining are yellow**. Show a fifteen-unit tray; nine have green-group labels and six have unassigned part labels. Learner proposes the yellow count, then performs a two-stage visual/text check: subtract 9 from whole 15 → **6 yellow**; add 9 + 6 → **15 whole**. Candidate 24 gets “You counted the nine green again”; candidate 7 yields “Nine and seven would be sixteen, not fifteen.” Hints “Fifteen includes the nine green” and “What joins nine to make fifteen?” plus “Reveal full explanation” are always available.

## Interactions, state and calculation integrity

Store scenario-local declared whole/count roles, the displayed tokens, the learner's candidate, optional reveal of whole and part labels, hint level, explanatory state. All totals derive from the actual stored counts, never a visual CSS width. When a role is hidden, it is labeled **unknown** rather than removed from the model. A “Join groups” state must not duplicate tokens. All units are explicit “buttons” or “marbles”. Support zero-part cases. The conditional premise “these are all the groups” is essential; no implicit third color. Reset restores only the active instance. A shared internal helper is allowed, but _public Scene components take absolutely no props_; do not add Resource_Config scenario attributes.

## Visual/audio, inclusivity, localization and offline

Offer a diagram with equal-sized counted elements and a **text ledger**: “Whole ten; red part six; blue part four” or pre-reveal “blue part unknown”. Screen readers can navigate this without visual color, and can hear or read every change and calculation; focus is managed around reveals. Provide keyboard/switch/tap controls for joining, assigning and adjusting counters, never drag-only; visible focus, large targets, reflow/zoom and reduced-motion instant feedback. Color may help group recognition but names and quantities must convey it independently. RTL preserves math operand roles and the whole/parts concept; translate every story, number, question, alt description, unit and feedback genuinely into each supported locale. All resources and interactions must work offline after a future selected-package download; do not assert the existing app implements caching.

## Acceptance cases for eventual tests

- Six red and four blue disjoint buttons total ten without double counting.
- Whole ten, six red, all rest blue → four blue; six plus four reconstructs ten.
- Question switch preserves same counts but changes requested unknown among 10, 4 and 6.
- Whole ten with all ten red → zero blue is valid.
- Fifteen marbles, nine green → six yellow; nine plus six equals fifteen. Candidates 24 and 7 get relation-specific feedback.
- Text/screen-reader, keyboard, touch, RTL, zoom/reduced-motion and downloaded-offline modes have equivalent mathematical facts.
- Scene does not persist answers, score, or claim mastery.

## Dependencies and open approvals

The generic Scene Resource exists, but this custom Scene, locale dictionaries, accessible handlers and tests do not. Coding Agent must verify actual Playground context and implement/validate after explicit editor approval. No code, Question, Quiz, scoring, backend, persistence or Note event is authorized by this specification.
