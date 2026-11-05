# Subtraction Stories Lab — Scene Specification

Status: Draft
Owner: Educational Screenwriter
Parent Lesson / Section: [What Does Subtraction Tell Us?](../content.md), Sections 1–4
Methodologist objective(s): Model removing, comparing and finding a missing part with a correct subtraction equality. [Methodologist Brief](../methodologist-brief.md) (Draft).

## LEARNER PURPOSE AND CONCEPT

The interactive comparison of **three situations with the same numbers** reveals what subtraction means beyond physically taking something away. The learner observes why “five” can mean five remaining, five more or five in an unknown part; the numeric relationship is conserved but the story semantics differ.

## ACCURATE CONTENT AND MODEL LIMITATIONS

Removal: 9 originally, remove 4, 5 remain. Comparison: two unchanged collections 9 and 4, match 4 pairs and see 5 surplus in the larger. Missing part: 9 total, known 4, unknown 5. Transfer uses 8 and 3, difference 5, in the same three interpretations. No negative values, exceeding 20, invented sum or inequality. In comparison, do NOT remove from either collection. In missing-part, do NOT hide the only visible evidence of the unknown group's count.

## EXPERIENCE BEATS AND LEARNER ACTIONS

1. **Remove entry:** Render 9 counters and an action “Remove 4.” On activation, move exactly four to a labeled removed area. “Five are left”; display 9−4=5. Wrong predictions 4/6 get a counting explanation and retry.
2. **Compare entry:** Two rows of 9 and 4. “Match the groups” links four pairs while both rows stay intact; mark five extra in the larger. Feedback for summing 9+4: “That finds the combined total, not how many more.”
3. **Missing entry:** Show a whole of nine with four in the known group and five unlabelled counters in the other. “Reveal missing part” labels five and shows 9−4=5 and 4+5=9.
4. **Transfer entry:** Choose one of three 8-versus-3/8-take-away-3/8-whole-3-known contexts; render each explicitly with story-specific action. Then show 8−3=5 and ask “What does five mean in THIS story?”
5. Every entry has “Show steps,” “Read the model,” “Reset,” and supports bypassing predictions. Interpretive feedback is narrative, not a scored answer report.

## INTERACTIVE OBJECTS, STATES AND RULES

- Four independent prop-free Scene entries, one per Section, with mode encoded in editorial placement rather than invented public props. Coding Agent may reuse internals while keeping state separate.
- Stateful counters, known/removed/matched/missing roles, story selection, optional prediction, reveal state, and explanation log. Removing preserves original = removed + remaining; comparing preserves both starting collections; unknown-part preserves whole = known + missing.
- Arithmetic exact: 9−4=5 and 8−3=5; no response may claim 9+4=5 or that a comparison required literal deletion. Reset returns to initial case without modifying any other Section.
- No scoring, per-learner progress/analytics or Skill mastery mechanics.

## VISUAL / AUDIO / MEDIA DIRECTION

Simple high-contrast countable HTML/SVG counters; group borders and text labels distinguish roles. Matching/removed objects are tracked in labeled areas. Learner-controlled subtle transformations, instant state transitions under reduced motion. No decorative narrative or asset generation; audio optional with equivalent text.

## LOCALIZATION, DIRECTION AND ACCESSIBILITY

Translate “taken away,” “left,” “more than,” “difference,” “known part” and “whole” accurately for all required locales. Ordered accessible state lists provide equivalent interaction and role labels without vision, dragging or color. Keyboard/switch/touch-friendly controls, screen-reader announcements, 200% zoom, child-size targets, RTL semantic math order and reduced-motion equivalence. Offline deterministic model/feedback after complete locale download; no network or audio dependence.

## ACCEPTANCE SCENARIOS

1. Removal 9−4=5 leaves five of the original nine and tracks four removed.
2. Comparison of 9 and 4 pairs four from both groups, leaves five unmatched only in larger, deletes nothing.
3. Whole nine split known four + missing five, check four+five=nine.
4. Transfer 8−3=5 has three distinct verbal answer roles depending on selected story; no context mismatch.
5. Wrong predictions are reversible with explanations; reveal/reset works without graded result.
6. Complete keyboard/screen reader/RTL/reduced-motion/offline alternatives reproduce all meanings and counts.

## IMPLEMENTATION DEPENDENCIES AND OPEN QUESTIONS

Typed scene/renderer are available; this Scene family is proposed, not implemented, and requires approved upstream Brief and Scene spec, prop-free components with own tests and locale data. Assessment Architect alone approves graded questions. Do not invent Score/Note/public mode APIs.
