# Equal Group Composer — Scene Specification

Status: Draft
Owner: Educational Screenwriter
Parent Lesson / Section: [Multiplication as Equal Groups](../content.md), Sections 1 and 3
Methodologist objective(s): Identify a quantity as a number of equal groups, connect it to repeated equal addends, and recognize that uneven addends do not directly form a fixed equal-group representation. [Methodologist Brief](../methodologist-brief.md).

## LEARNER PURPOSE AND CONCEPT

Children should **count what is in each group**, not simply add “number of groups” and “group size”. The Scene makes an equal group’s quantity physically inspectable and contrasts it with a nearly equal row. Explicit group-by-group evidence, rather than a decorative visual similarity, motivates why repeated addition works only with identical addends.

## ACCURATE CONTENT AND MODEL LIMITATIONS

- Sections use groups with natural-number sizes 1–5 and total ≤25.
- Section 1: exactly 3 equal groups, 4 counters per group, 12 total; text list [4,4,4]; corresponding repeated sum 4 + 4 + 4 = 12. Group count 3 is **not** another group of three objects.
- Section 3: [4,4,4] is equal-sized; [4,3,4] is **unequal**, totals 12 and 11 respectively. The latter still has a valid ordinary addition sum 4+3+4=11; it is not the same as a direct “three identical addends” representation.
- An unequal group model may be rearranged to illustrate a different decomposition, but this Scene does not silently change group sizes or reclassify unequal groups as equal. “No equal addends in THIS pictured three-group arrangement” is the precise limit, not “no multiplication is possible anywhere.”
- The Scene’s lesson examples are finite observations, not proof of general multiplication laws.

## EXPERIENCE BEATS AND LEARNER ACTIONS

**Section 1 / observe and count**

1. Display three named containers with four visible identical countable counters each. Prompt: “How many groups? How many counters in each? How many altogether?” Labels for “groups” and “in each group” are distinctly spelled out.
2. Child can tap/select a group or use “Inspect group 1/2/3” buttons. Announce that group’s count and keep it visible. “Count them all” reveals incremental totals 4, 8, 12, followed by 4+4+4=12.
3. Prediction choices 7, 12, 14 optional. For 7: “Three plus four names the group count and group size. But there are four counters in EACH of three groups.” For 14: “Four, eight, twelve; not fourteen.” For 12: “All three groups contain four, making twelve.” Every response gives a retry/reveal path without score.
4. “Show groups as a list” gives “group 1: four; group 2: four; group 3: four; all groups: twelve”. This representation must remain usable without seeing counters.

**Section 3 / compare equal vs uneven**

1. A fresh Scene instance presents two labeled examples, one after another: group counts [4,4,4] and [4,3,4]. Ask: “Are all the groups the same size?”
2. Learner checks groups individually. For [4,4,4], “Each group has four: same size.” For [4,3,4], “The middle has three. The others have four. They are not all equal.”
3. Choice “same size / not all the same size” is allowed before reveal; early guesses prompt checking all three. Exact text compares observed counts, not only colors or icon states.
4. Display matching addition: 4+4+4=12 or 4+3+4=11. Ask “Could we use ONE addend repeated three times to describe these displayed groups?” Only the first is a direct repeated-equal-addend sum. In the second, do not say “mathematically impossible” or silently move counters.
5. Optional “Try equal groups again” resets with either example. No time pressure, forced answer, grade or achievement message.

## INTERACTIVE OBJECTS, STATES AND RULES

- Objects: indexed group containers, exact countable counters, “group count” and “per group” labels, ordered accessible group-count list, total counter label, per-group inspection controls, choice/reveal/reset controls, explanatory feedback.
- One **prop-free** Scene entry per Section placement (observation/contrast) with different initial examples and independent state; “mode” is editorial, not a new runtime prop.
- State: current example, inspected groups, guess (optional), which counts and explanatory sums are visible, whether contrast has been revealed.
- Invariant: group count array describes exactly the rendered counters; whole W=sum(group sizes). Report equal-sized iff all array elements are equal. No hidden deletion or duplication of objects.
- Boundaries: no negative/fractional counters; counts ≤5, total ≤25 in authored examples. Reset restores the appropriate placement, never changes the other Scene.
- No assessment semantics or persisted responses. Answer choices teach the model and can be bypassed to access the explanation.

## VISUAL / AUDIO / MEDIA DIRECTION

Use lightweight, high-contrast HTML/SVG counter groups with sufficient spacing to count. Border/label/number marks indicate grouping; color is optional and redundant. A subtle highlight during counting can follow each group, with a text equivalent and reduced-motion instant update. Do not add celebratory animation, background story, external imagery, embedded music or video.

## LOCALIZATION, DIRECTION AND ACCESSIBILITY

- All learner prompts, group labels, amount words, equality messages, controls and accessible names must be genuinely translated across the full language roster; “three groups of four” must remain semantically precise.
- Screen reader receives “three groups: group one four, group two four, group three four, altogether twelve”; for unequal row, name the group with a different count. Native controls allow inspection and decision without pointer precision or dragging.
- RTL changes prose/control placement but does not change numeric group order or swap roles of group count vs per-group quantity. Explicit labels prevent relying on left/right visual placement.
- Keyboard/touch/switch operation, 200% zoom, visible focus, large targets, countable nonvisual list, reduced motion and offline equivalence are required. No timed question or audio-only feedback. Smaller screens may stack groups if group membership is unambiguous.
- Local deterministic counts and explanations must work after full locale/package download without remote calls, on weak devices.

## ACCEPTANCE SCENARIOS

1. Three groups of four yield exactly twelve objects and 4+4+4=12; “3+4=7” is not falsely treated as the total.
2. Inspector names each group’s exact count, with identical keyboard and screen reader access.
3. For [4,4,4], every group equal, total 12, three equal addends; the equality verdict is “same”.
4. For [4,3,4], total 11, the second group differs, and fixed identical-addend claim is rejected without saying “no other pattern”.
5. Learner can inspect or reveal without guessing and reset without cross-Section state leakage.
6. RTL, reduced motion, screen reader, keyboard, 200% zoom, mobile and offline states show identical counts and explanatory comparisons.

## IMPLEMENTATION DEPENDENCIES AND OPEN QUESTIONS

The generic Section scene block and prop-free/localized Scene pattern exist; this specific Scene and two placements are **proposed** and await editor approval, implementation and own tests. Coding Agent chooses internal sharing and localization mechanism, not a new public mode prop. Assessment Architect separately owns any scored distinction between the two canonical Skills.
