# Zero Removal Explorer — Scene Specification

Status: Draft
Owner: Educational Screenwriter
Parent Lesson / Section: [Taking Away Zero](../content.md), Sections 1–4
Methodologist objective(s): Explain and predict unchanged quantity in a−0=a, while keeping “zero taken” distinct from “none remain”. [Methodologist Brief](../methodologist-brief.md) (Draft).

## LEARNER PURPOSE AND CONCEPT

Make an apparently uneventful action—removing NOTHING—mathematically observable through a precise before/taken/after ledger. A nonzero removal and a zero-length number-line displacement provide purposeful contrasting evidence.

## ACCURATE CONTENT AND MODEL LIMITATIONS

Default 7−0=7, contrast 7−2=5, number-line 7−0=7 and optional 7−2=5, transfer 13−0=13, boundary 0−0=0. For a−0, 0≤a≤20, no counters move or disappear. Reversing a−0 to 0−a is not equivalent for a>0; avoid teaching negative results within the counter model. Start/removed/remaining roles never swap.

## EXPERIENCE BEATS AND LEARNER ACTIONS

1. **Removal:** Show seven countable counters. Ask “Take away zero. How many remain?” A native control “Take away 0” leaves all seven; show before 7 / removed 0 / after 7, with explanation. Optional guesses 0/6/7 and corrective messages.
2. **Contrast:** Two independent trials begin from 7, not an accidental consecutive subtraction. On one, remove zero and show 7; on the other, remove two and show 5; label exactly which trial belongs to which result.
3. **Number line:** Start at 7. “Jump back zero” leaves the point exactly at 7, with audible/text status “start seven, zero moved, still seven.” “Jump back two” lands at 5. A zero-length hop must not vanish without an explicit label.
4. **Transfer:** Start at 13; 13−0=13. Optional 0−0=0 as an empty collection. A reverse-order explanation names 0−13 as an inappropriate remove-thirteen-from-zero counter model, never as “thirteen”.
5. Expose “Show why,” “Reset,” “Try again,” optional help and a clear explanation on all paths. Learner can bypass guess; none of these states records success.

## INTERACTIVE OBJECTS, STATES AND RULES

Four prop-free Section-specific entries; presentation variants are editorial and not a React mode prop. Objects include fixed countable counters, removed-counter area, before/after ledger, number-line indicator, zero-sized step marker, prediction controls, reset/reveal feedback. Invariant after = start − removed with removed ∈ [0,start]. For zero removal, after=start. No auto-change of starter counts; reset restores chosen Section entry. No QuizState or mastery.

## VISUAL / AUDIO / MEDIA DIRECTION

Lightweight HTML/SVG counters, number line with clear labeled start/end, stable quantity. Intentionally little animation: stationary state emphasized through the numeric ledger, not empty motion. Reduced motion is exactly equivalent. No assets or online calls.

## LOCALIZATION, DIRECTION AND ACCESSIBILITY

All text, roles, controls, accessible status and arithmetic localized into every supported language; avoid English fallback. Keyboard/touch/switch controls, readable focus, screen-reader model, textual “no change” annunciation, semantic RTL operators and increasing direction, 200% zoom, mobile and reduced motion. Offline after download everything is local deterministic logic. No drag-only, color-only or narration-only route.

## ACCEPTANCE SCENARIOS

1. 7−0 remains 7 with zero removed; guess “0 remain” corrected.
2. 7−2 remains 5; side-by-side trials do not contaminate each other's starting number.
3. Number-line zero hop starts/ends at 7, with perceivable status even without movement; two-back hop lands at 5.
4. 13−0=13 and 0−0=0 without contradictions; 0−13 never claimed to be 13.
5. Reset, “Show why” and options are fully usable without scores.
6. RTL, screen reader, keyboard, reduced motion, mobile and offline provide identical arithmetic meaning.

## IMPLEMENTATION DEPENDENCIES AND OPEN QUESTIONS

Scene generic renderer exists, Zero Removal Explorer does not. Requires prior Methodologist/editor approval and Scene Designer implementation with own tests and locale data. No invented props, assessment APIs or Note event.
