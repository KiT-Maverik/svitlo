# Missing Divisor Sharing Lab — Scene Specification

Status: Draft
Owner: Educational Screenwriter
Parent Lesson / Section: [Finding an Unknown Divisor](../content.md), Sections 1–4
Methodologist objective(s): Identify a missing divisor, reconstruct it from known total and nonzero quotient using exact equal sharing, verify original equation, reject zero divisor. [Methodologist Brief](../methodologist-brief.md), Draft.

## LEARNER PURPOSE AND CONCEPT

The child sees that division's **divisor** is the number of groups in this expressly labeled equal-sharing story. If twelve items are shared and each group receives four, there must be three groups. The child actively constructs those groups, then checks **12 ÷ 3 = 4**. A second story “groups of three give four groups” is mathematically valid but must always be given its different “group size” labels rather than silently substituted.

## ACCURATE CONTENT AND MODEL LIMITATIONS

- Complete: 12÷3=4 (total 12, 3 groups, 4 each).
- Missing divisor: 12÷□=4 gives d=3 using 12÷4=3; verify 12÷3=4. Candidates 2/3/4 yield actual quotients 6/4/3.
- Zero is not a valid divisor: 12÷0 is undefined. Do not invent a result or treat “0 groups” as an exact sharing.
- Transfer 20÷□=5 yields d=4; find as 20÷5=4 and check 20÷4=5. Candidates 2/4/5 produce actual quotients 10/5/4. Wrong candidates can be checked arithmetically without fabricating a visual group model outside selected small-factor scope.
- Nonzero dividend and quotient, exact whole-number division, small correct factors 1–5, totals ≤25; no fractions, remainders, negative values or zero quotient edge cases in this Lesson.
- Invariant in equal sharing: group count G × per-group S = total W, and W÷G=S with G>0. The unknown divisor here is G. The total counters do not appear twice when grouping.

## EXPERIENCE BEATS AND LEARNER ACTIONS

1. **Known division entry:** Show exactly twelve counters divided into three labeled containers with four each. Prompt “How many counters altogether? How many groups? How many in each?” Announce “twelve total, three groups, four in each; 12÷3=4”.
2. **Build the groups entry:** Display twelve available counters and a “Make next group of four” control. On each action move exactly four to a numbered group and update “used/available/group count” ledger: after one (4 used,8 left), two (8 used,4 left), three (12 used,0 left). Then display **3 groups** and finding calculation 12÷4=3. Optional “Show all groups” bypasses repeated steps.
3. **Trial check entry:** Display original 12÷□=4, candidate 2/3/4/0 buttons. Each positive candidate replaces □ in exactly the original position and shows actual quotient plus explicit fit/mismatch: 2→6, 3→4, 4→3. Zero option instead clearly announces **“not defined; cannot divide by zero”**, with no quotient and no invented group state.
4. Keep original equality visible. Explain that the candidate 4 is the known **quotient**, not the unknown divisor; 12÷4=3 does not equal the right-hand four. Offer “Show why” to re-open the three groups of four.
5. **Transfer entry:** New independent state 20÷□=5, candidates 2/4/5. Optional group construction produces four groups of five with no remainder. Trial quotients 10/5/4; 20÷4=5 fits. End with “Four groups of five use twenty counters.”
6. Every Section entry has independently scoped Reset, Hint, Read groups, Show full solution and non-scored replay; no forced response required.

## INTERACTIVE OBJECTS, STATES AND RULES

Four independent self-contained **prop-free Scene entries**; do not invent a public React mode prop or typed Resource field. Objects: total counter pool, numbered group containers, per-group target, count ledger, original dividend/divisor/quotient labels, candidate buttons, substitution/result panel, accessibility text log and reset/reveal controls. State is initial story, completed groups, unused counters, trial divisor, evaluated quotient or undefined-zero message, explanation visibility. Group construction consumes objects without duplication. Trial C fits only if C is positive integer and W/C equals stated nonzero quotient exactly. A wrong mathematical trial must be labeled “does not fit”, never rendered as a true equality. No graded state or mastery evidence.

## VISUAL / AUDIO / MEDIA DIRECTION

Use simple countable HTML/SVG counter containers with integer group headings, large equation display and a persistent total/used/remaining text ledger. Subtle motion optional to show four objects being moved together; reduced motion shows identical state instantly. No external image/video/audio, color-based correctness, game rewards or online evaluation.

## LOCALIZATION, DIRECTION AND ACCESSIBILITY

Translate all child-facing text, terminology, numeric state and aria labels into every supported language, without English fallback. Keep “number of groups” (divisor in this story) distinct from “in each group” (quotient), also in RTL math direction. Screen-reader/keyboard users can operate all group-making and trial controls and inspect “group one four; group two four; group three four; total twelve,” with correct full original equality narration. No drag-only, sound-only, timed or speech-recognition action. Touch targets, visible focus, zoom/mobile, reduced motion, high contrast and offline after a completed download all offer equivalent mathematics and explanations.

## ACCEPTANCE SCENARIOS

1. Complete 12÷3=4 model has exactly three groups of four, twelve total.
2. Building three groups of four uses all twelve once, and 12÷4=3 correctly finds missing divisor.
3. Checking candidates for 12÷□=4: 2→6 mismatch, 3→4 match, 4→3 mismatch, 0→undefined/rejected.
4. Transfer 20÷□=5: 2→10 mismatch, 4→5 match, 5→4 mismatch, with four groups of five for the correct model.
5. No invented quotient for division by zero, no remainder or counter duplication, no score. All hints/reveal/reset work.
6. RTL, screen reader, keyboard, reduced motion, mobile/zoom and local offline executions preserve exact group arithmetic and roles.

## IMPLEMENTATION DEPENDENCIES AND OPEN QUESTIONS

Existing generic scene Resource/rendering is available; this particular Scene is proposed and needs editor approval of upstream Draft Brief, separate Scene spec approval and later Design Scene tests. Coding Agent chooses actual prop-free component organization, locale wiring and offline behavior; Assessment Architect validates graded checks if separately authorized. The advanced prerequisite gate remains mandatory.
