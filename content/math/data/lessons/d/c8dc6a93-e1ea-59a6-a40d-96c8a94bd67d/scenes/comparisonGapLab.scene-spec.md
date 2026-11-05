# Comparison Gap Lab — Scene Specification

**Status:** Provisional Draft — awaiting Methodologist/editor approval.  
**Owner:** Educational Screenwriter.  
**Parent:** [Lesson Content](../content.md), Sections 1–4; [Draft Brief](../methodologist-brief.md).  
**Technical status:** Proposed self-contained and prop-free Scene; not implemented.

## Learner purpose and invariant

The difference between two nonnegative counts of the **same unit** is the number of unmatched objects when each member of the smaller group is paired one-to-one with one member of the larger group. Changing “how many more does A have?” to “how many fewer does B have?” changes the _perspective_ but not the nonnegative numerical gap for the same two fixed counts. Do not confuse this gap with a combined total or with a multiplicative ratio.

## Scenario A — same count, no excess (Section 1)

Two labeled collections each contain **8 pencils**: Lena=8, Danylo=8. Show an optional pairing animation with manual “Pair next” and “Pair all” buttons. All eight pairs match and **0 pencils remain unmatched**. Ask “How many more does either have?” Expected “zero”. If a child answers sixteen, say “Sixteen would count _both collections together_, not how many one exceeds the other.” If learner says eight, say “Eight is the count of each collection, not an extra group.” The comparison result is explicitly shown as 8−8=0.

## Scenario B — unmatched difference (Section 2)

Lena=13 pencils, Danylo=9 pencils. Let the child reveal nine one-to-one pairs, then visibly and textually count **four unmatched pencils in Lena's collection**. Correct expression **13 − 9 = 4** and phrasing “Lena has four more pencils.” A prediction of 22 prompts “That counts both complete groups instead of the excess.” A prediction of thirteen prompts “That is Lena's full collection, not the unmatched part.” The visual groups must have a consistent equal-unit size, not a chart with arbitrary scales.

## Scenario C — ask from the other side (Section 3)

Reuse **exact same counts thirteen and nine** in a fresh self-contained instance. Display both phrases:

- “How many **more** pencils does Lena have than Danylo?”
- “How many **fewer** pencils does Danylo have than Lena?”
  Both ask for the _same nonnegative gap_ **4 pencils**. Learner can switch which sentence is read while no object count changes. If answer changes only because wording changes, say “Nine pairs match either way, leaving four in Lena's group. The number four is still the difference.” If group names are reversed, update the verbal relation, not mathematical counts.

## Scenario D — independent transfer (Section 4)

Story: **18 small books** and **11 large books** on a shelf. Ask “How many more small books than large books?” Start with only the two named counts and a completely optional matching model. Learner can form 18−11 and submit **7 books**. A hint first identifies which count is larger; a second shows pairing eleven. Candidate 29 feedback: “That would answer how many books in both categories together, not the difference.” Candidate 7 feedback: “Seven is the gap; it does _not_ mean only seven small books exist.” “Show answer and reasoning” stays available at all times.

## Interaction objects, state and numeric rules

Scenario-local integers nA, nB, unit and named group, number of revealed one-to-one pairs bounded by min(nA,nB), computed unpaired count |nA−nB|, learner's predicted gap, text wording selection, hint/reveal state and Reset. The canonical Grade 2 examples never need negative arithmetic or a “times as many” calculation. Render every object group with explicit count labels; if a drawing does not fit a small screen, a structured accessible table/ledger reports original counts, pairs and unmatched items. The answer “four pencils” refers to gap, not new group size. A single fixed scenario is owned by each **public no-props Scene instance**; scenario switching does not require hidden external props.

## Accessible and translated presentation

Each pair can be inspected in keyboard order by two clearly named group roles, with “pair next,” “pair all,” “clear pairs,” “show numeric difference,” “reset” controls. Optional drag or animation must have identical keyboard/switch/tap alternative. Screen readers announce “nine matched pairs; four Lena pencils without a partner” and the numeric difference, without relying on color or an arrow's physical direction. RTL can rearrange labels and logical focus but must preserve which group has more and the subtraction larger minus smaller. Use real translations for all locales of quantifiers, “more/fewer,” group names, counts, unit plurals, aria-like labels and feedback, with no English fallback. Offer reduced motion, visible focus, zoom/reflow, high-contrast non-color-only coding and full selected-locale offline resources after download. This is future design intent, not proof of shipped PWA.

## Acceptance cases

1. Eight versus eight pencils gives eight matched pairs and gap zero.
2. Thirteen versus nine yields nine matched pairs, four unmatched in larger group and 13−9=4.
3. “Four more” / “four fewer” use the same fixed gap, with direction correctly attributed to named child.
4. Eighteen versus eleven books yields 7 books gap, not 29 combined; “seven books” is not the small-book total.
5. All incorrect predictions get explanatory, quantity-specific feedback rather than scores.
6. Independent reset, keyboard/screen-reader, touch, RTL, zoom, reduced motion and downloaded offline paths preserve equal math.

## Technical/editorial dependencies

The generic Scene resource can eventually render this prop-free Scene, but no working implementation, scoring contract or translated dictionary is asserted. Coding Agent must implement and test mathematical invariants and access paths after editor approval. No Questions, Quizzes, grading, Note events, persistence or background service calls are designed here.
