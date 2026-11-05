# Missing Removal Investigator — Scene Specification

Status: Draft
Owner: Educational Screenwriter
Parent Lesson / Section: [Finding an Unknown Subtrahend](../content.md), Sections 1–4
Methodologist objective(s): Find missing amount removed from known starting total and remainder, check the original equality. [Methodologist Brief](../methodologist-brief.md), Draft.

## LEARNER PURPOSE AND CONCEPT

The child does not see the removal happen, but can reconstruct its amount from an original set and the part remaining. An explicit counter ledger and substitution check make the unknown **second operand** meaningful. Unlike finding a missing beginning, this task starts with the whole known.

## ACCURATE CONTENT AND MODEL LIMITATIONS

- 11 initial, 7 remaining, 4 removed. Finding formula 11−7=4; checking formula 11−4=7.
- 11−□=7: candidates 3/4/7 yield remainders 8/7/4. A guess of 7 is the observed _remainder_, not the amount taken away.
- □−4=7 as a brief position contrast has missing beginning 11, not a missing removed amount.
- Transfer 14−□=9: 14−9=5; candidates 4/5/6 produce 10/9/8 and checked value five.
- Model only nonnegative whole numbers within 20, with removed ∈ [0, initial]. No negative results, counters silently duplicated or invalid equality presented as accepted.

## EXPERIENCE BEATS AND LEARNER ACTIONS

1. **Before/after entry:** Show a full ordered collection of eleven counters. Mark seven in a “still here” group and four in a “what went away?” group whose numeric label is hidden. Prompt “How many are no longer here?” The four positions remain countable or represented textually.
2. Offer optional choices 4/7/18. For 7, “That is how many stayed; count the other four.” For 18, “We only started with eleven.” “Reveal the missing group” names four and explains the model without requiring guess.
3. **Finding entry:** Display both state groups and activate “Match the seven we still have.” Four unmatched original counters are identified as taken away. Show 11−7=4, then reconstruct 7+4=11. The child can inspect all quantities.
4. **Substitution entry:** Show original 11−□=7 and candidate 3/4/7 controls. Substitute into exactly the second operand and calculate 11−3=8, 11−4=7, 11−7=4. Label mismatches “does not match seven” rather than true equalities.
5. Display side-by-side explanations within this Scene for □−4=7 (missing beginning 11) and 11−□=7 (missing removed 4). Read each missing role aloud as text; do not change the Lesson Skill target.
6. **Transfer entry:** 14−□=9, choices 4/5/6, with before/after counting available on request. Check each candidate by original subtraction; show 14−9=5 to find, then 14−5=9 to verify.
7. All entries have “Show the groups,” “Show explanation,” “Try again” and “Reset”; different entries initialize independently and never persist a score.

## INTERACTIVE OBJECTS, STATES AND RULES

Four distinct prop-free Scene entries for the Sections, with no invented runtime mode prop. Objects: indexed original counters, remaining/removed categories, hidden label, original equation with tagged operand roles, candidate buttons, exact arithmetic feedback, accessible state ledger and reset/reveal controls. Invariant total=removed+remaining for each example. Incorrect candidate C is evaluated as total−C (not as total−remaining) and explicitly labeled a _trial_ when it disagrees. A change of example resets state and explanation; no forced retries, mastery or QuestionState.

## VISUAL / AUDIO / MEDIA DIRECTION

Use low-cost HTML/SVG countable counter groups with labeled trays “started” and “left”, and unpaired counters. Animations optional, user-paced and not necessary for meaning. Short enough for the age group; no narratives, sound-only correctness cue, assets or network dependence.

## LOCALIZATION, DIRECTION AND ACCESSIBILITY

Translate every role and control, especially “taken away” vs “still here”, across all required languages. RTL does not swap minuend/subtrahend meanings. Native keyboard/touch/switch controls and navigable text counts enable the same reconstruction without visual grouping or drag. Announce full original equation with blank as “missing amount removed” and full trial arithmetic. Large tap targets, visible focus, 200% zoom, mobile, reduced motion and offline local deterministic arithmetic/accessibility parity required. No voice recognition or color-only status.

## ACCEPTANCE SCENARIOS

1. Eleven original and seven remaining imply four removed; no extra counters.
2. 11−7=4 is shown as finding, 11−4=7 as checking, clearly distinguished.
3. Candidate 3/4/7 for 11−□=7 results in 8/7/4 respectively, with only four satisfying.
4. Brief contrast □−4=7 vs 11−□=7 identifies different missing roles and values.
5. Transfer 14−□=9 finds five; 4 yields ten, 6 yields eight, and candidate five yields nine.
6. Hints, reset, text-only, keyboard, screen-reader, RTL, reduced motion, mobile and offline work with identical math, no score.

## IMPLEMENTATION DEPENDENCIES AND OPEN QUESTIONS

The Scene Resource integration exists; this Scene is proposed, requiring Brief and spec approval before Design Scene implementation and own tests. Coding Agent must ensure prop-free isolated entrypoints, complete real locales and offline use. Assessment Architect owns any validated scored questions. No new Skill, Question type, API or Notes runtime is introduced.
