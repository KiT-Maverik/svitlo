# Equal Groups Builder — Scene Specification

Status: Draft
Owner: Educational Screenwriter
Parent Lesson / Section: [Finding an Unknown Dividend](../content.md), Sections 1–2
Methodologist objective(s): Interpret exact division as equal groups and reconstruct a missing whole from divisor and quotient, with the selected sharing interpretation. [Methodologist Brief](../methodologist-brief.md).

## LEARNER PURPOSE AND CONCEPT

Learners use a _countable_ collection rather than guessing a symbol. When sharing among three groups gives four in each, the whole is the sum of all group counts. The Scene makes 3 groups of 4 into 4 + 4 + 4 and 3 × 4; it must never equate “3 groups” with “3 items in each” without explaining the chosen story.

## ACCURATE CONTENT AND MODEL LIMITATIONS

- Exact grouping data: group count G, size S, whole W = G × S, with 2 ≤ G,S ≤ 5 and W ≤ 20; zero divisors prohibited, no remainders or negative counters.
- Section 1: W=12, G=3, S=4, visible whole and known grouped model; the correct original equality 12 ÷ 3 = 4 is read “share 12 among 3 groups; 4 each”.
- Section 2: same groups remain visible, but the **numeric name of the whole** is hidden; reveal 4 + 4 + 4 = 12, then 3 × 4 = 12. Never hide the counters required to calculate.
- Optional model contrast: group objects in sets of 3, yielding 4 groups; explain that this is the **group-size** interpretation of division by three. Do not change the numerical conclusion or mix interpretations within a single explanation.
- W is conserved; moving counters changes representation, not quantity. The finite small-factor model excludes division with a remainder, long division and a generic mathematical proof.

## EXPERIENCE BEATS AND LEARNER ACTIONS

1. **Known whole (Section 1):** Display 12 distinct counters and 3 empty, clearly named group containers. “Can we share these equally among three groups?” Permit a learner-paced “Place next counter” or “Show equal sharing” operation. Each counter is assigned to a group deterministically; groups fill to 4 each, no leftovers. Announce: “Group one has four. Group two has four. Group three has four.”
2. Display “12 altogether ÷ 3 groups = 4 in each group.” Offer text-only review of the same three group counts; compare the total with the visible twelve. Optional “Try again” resets the counters to the ungrouped whole.
3. **Hidden whole (Section 2):** Display 3 groups already holding 4 counters each. Replace only the total numeral with “?”. Prompt: “How many counters in all three groups?” Offer “Count one group”, “Count all”, and candidate 7 / 12 / 14 buttons. A child may request the explanation without picking.
4. For 7: “Three plus four only names two things; we must count the four in every group: 4 + 4 + 4.” For 14: “Four, then eight, then twelve—there are twelve counters here.” For 12: “Yes. There are three equal groups of four, so twelve altogether.” The feedback is explanatory and unscored.
5. On reveal display 4 + 4 + 4 = 12 followed by 3 × 4 = 12; animate only to align each +4 with a specific group, not as a compulsory timed movie. Let the child review the link between groups and multiplication.
6. End with “If the total is missing, can the groups help you find it?” Provide “Yes. Count all equal groups” in text, not a score.

## INTERACTIVE OBJECTS, STATES AND RULES

- Objects: group containers indexed 1–G, countable counters (W total), separate labels for groups count G and per-group amount S, current whole label (known or hidden), ordered text ledger, “Share,” “Count,” “Reveal total,” “Reset,” and choice buttons.
- Placements are **two independent prop-free self-contained Scene entries**, not a new React mode prop. Coding Agent chooses composition and locale wiring without leaking state between Sections.
- Known-whole state: counters assigned or unassigned, group counts, revealed division relationship. Assignment must preserve count W; an “automatic share” button completes a mathematically equal distribution.
- Hidden-whole state: candidate, reveal state, equal-group representation; value W computed from G×S. A wrong candidate can appear as a tentative label but never as a verified total.
- Boundaries: no selected G=0, no unequal “exact sharing,” no disappearing counters or simulated remainder presented as valid; Reset returns to the placement’s initial state.
- Instructional state is not QuizState, grading, performance analytics or a permanent Skills record.

## VISUAL / AUDIO / MEDIA DIRECTION

Simple lightweight HTML/SVG 2D containers with large countable counters and numerals. Group borders, textual captions and ordinal labels distinguish groups independently of color. Optional one-at-a-time placement animation follows learner control; reduced-motion instantly presents the same grouping. No asset generation, streamed video, narration requirement, 3D or reward mechanics.

## LOCALIZATION, DIRECTION AND ACCESSIBILITY

All verbal prompts, “in each”, group-number descriptions, total, count, multiplication and feedback must be localized genuinely for every supported language. In RTL, adapt prose and control layout semantically while preserving mathematical order and the relationship among G, S and W. Equivalently usable nonvisual ordered table lists each group’s index/count and the total; keyboard/switch users can operate “assign next counter”, “show group”, “reset” and response choices. Voice recognition and precise dragging are never required; all counts are shown as text. Screen reader announces each changed group count once. Use 200%-zoom-friendly responsive arrangements and reduced-motion equivalence. Offline after a complete content download, all math/state/feedback work locally even on weak devices.

## ACCEPTANCE SCENARIOS

1. Known W=12 and three groups: exactly four objects in each and zero unassigned; 12 ÷ 3 = 4, not 3 ÷ 4.
2. Hidden total: three groups of four yield 4 + 4 + 4 = 12 and 3 × 4 = 12, with all twelve counters always countable.
3. Wrong guess 7/14 receives numeric explanation; show solution without selecting is permitted; no score.
4. Reset and Section isolation: hidden-total Section never changes already visited known-whole grouping.
5. Alternative “groups of three” is expressly labeled and yields 4 groups rather than silently recasting “three groups”.
6. No invalid zero-divisor or remainder scenario; no counter or group count is lost.
7. Keyboard, screen reader, touch, RTL, reduced motion, narrow mobile and offline models produce exactly the same group totals and feedback.

## IMPLEMENTATION DEPENDENCIES AND OPEN QUESTIONS

Existing Scene Resource and renderer are available; this specific Scene is **proposed** and requires separate editor approval, Design Scene implementation, own tests, full locale context and accessible count-list equivalence. The readiness prerequisite is the Methodologist/editor's decision, not a widget-detected diagnostic. Coding Agent must implement prop-free Scene entrypoints, may share internal logic and must avoid invented assessment/Note APIs.
