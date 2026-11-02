# Missing Factor Groups — Scene Specification

Status: Draft
Owner: Educational Screenwriter
Parent Lesson / Section: [Finding an Unknown Factor](../content.md), Sections 1–4
Methodologist objective(s): Reconstruct unknown nonzero-known-factor multiplication input by exact division, then verify in the original multiplication. [Methodologist Brief](../methodologist-brief.md), Draft.

## LEARNER PURPOSE AND CONCEPT

A missing factor is a meaningful group count or group size in a chosen concrete model, not a random digit. The child rebuilds equal groups from total and a known factor, then performs multiplication to check the original statement. Group-count-first is an **example convention**, not a mathematical claim that factor position always determines a story's real-world role.

## ACCURATE CONTENT AND MODEL LIMITATIONS

- Complete: 3 groups of 4 → 3×4=12, twelve counters.
- Unknown per-group: 3×□=12, 12÷3=4, check 3×4=12. Candidates 3/4/5 lead to products 9/12/15.
- Unknown count: □×4=12, 12÷4=3, check 3×4=12. Candidate 4 would create 16, not twelve.
- Transfer: 4×□=20, 20÷4=5, check 4×5=20; choices 4/5/6 yield products 16/20/24. The fact that a _wrong candidate's product_ may exceed 25 does not authorize a larger group model; use exact textual computation.
- Exact positive whole-number groups, sizes up to five and total ≤25 in correct examples. The given known factor must be nonzero. If known factor were 0 with product 0, missing partner would not be uniquely determined; explicitly outside scope.
- A group-count-first convention is stated whenever a multiplication is mapped to groups.

## EXPERIENCE BEATS AND LEARNER ACTIONS

1. **Complete-model entry:** Three labeled groups with four exact counters each. Learner selects “Count one group” or “Count all”; shows 4+4+4=12, then “3 groups × 4 each = 12” with factors/product roles.
2. **Missing-size entry:** Show twelve countable counters and _three_ labeled equal-group containers. “Share the twelve among three groups” distributes exactly four each, with a learner-paced or one-step control; reveal 12÷3=4 and 3×4=12. Offer candidate 3/4/5 with full product comparison and retry.
3. **Missing-count entry:** Show twelve original counters and the instruction “Make groups of four.” “Make next group” consumes exactly four and increments group count; after three groups, all twelve are used. Display □×4=12 → 3×4=12. A guess of four groups is rejected with 4×4=16, requiring extra objects not provided.
4. **Transfer entry:** Start 4×□=20 and group count 4, hide group size. Candidate 4/5/6 tested in unchanged original; 16/20/24 respectively. “Show groups” reveals 20 shared among four groups giving five each, with 20÷4=5.
5. Every entry offers “Show steps,” “Read groups,” “Explain answer,” “Reset” and non-scored hints; can reveal full explanation without an attempt.

## INTERACTIVE OBJECTS, STATES AND RULES

Four prop-free Scene entries with independent initial state, no invented public mode props. Objects: group containers and exact group counts, bounded counter pool, equality with accessible missing-factor position, candidate choices, computed products and an ordered text ledger. Math invariant: if G groups have S each, total=G×S, and correct missing input=product÷known nonzero factor when exact. A wrong trial never creates fictitious counters in the _correct_ model. State: active example, groups completed, counters used, selected candidate, revealed explanations. Reset and switching stories restore original data; no grading or mastery.

## VISUAL / AUDIO / MEDIA DIRECTION

Lightweight HTML/SVG groups, number chips with explicit factor/product labels and a steady total. Optional stepped spreading/assembling animation. Reduced motion shows identical before/after and corresponding text. No sound, downloaded video, WebGL, mascot or interactive dragging required.

## LOCALIZATION, DIRECTION AND ACCESSIBILITY

Natural translations for every child-facing phrase including “groups of”, “in each”, “factor”, “product” and hint/result in all supported locales; no fallbacks. RTL keeps multiplication operand identities and chosen group convention semantically stable. Nonvisual interactive list “three groups; four in each; total twelve” and accessible calculator/result statements support entire scene. All controls keyboard/touch/switch accessible, child-sized, visible focus, screen-reader status, responsive/zoomed layout, reduced motion and full local offline logic after download. No dragging, rapid taps or speech recognition requirement.

## ACCEPTANCE SCENARIOS

1. 3 groups of 4 equals twelve, represented by both 4+4+4=12 and 3×4=12.
2. 3×□=12 finds four by exact sharing, wrong 3/5 show nine/fifteen.
3. □×4=12 finds _three groups_, wrong four groups require sixteen, no group-role ambiguity.
4. 4×□=20 yields five, checked 4×5=20; wrong 4/6 give 16/24.
5. No known zero factor, division remainder or invalid total silently introduced. Explanation accessible without guesses.
6. Reset/isolation, RTL, nonvisual/keyboard, reduced motion, mobile and offline behave equivalently.

## IMPLEMENTATION DEPENDENCIES AND OPEN QUESTIONS

Generic scene Resource exists; this Scene is **proposed** and depends on Brief approval, independent Scene editorial approval, Design Scene implementation and tests. Coding Agent validates prop-free entries and complete locale/offline behavior; Assessment Architect owns graded competence evidence, not these trial choices. Readiness prerequisites are a genuine editorial gate.
