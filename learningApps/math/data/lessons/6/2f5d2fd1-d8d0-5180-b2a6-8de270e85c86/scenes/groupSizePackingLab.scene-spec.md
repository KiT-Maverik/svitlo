# Group Size Packing Lab — Scene Specification

Status: Draft
Owner: Educational Screenwriter
Parent Lesson / Sections: [Make Groups of a Given Size](../content.md), Sections 1–4
Methodologist source: [Methodologist Brief](../methodologist-brief.md) (Draft, not approved).

## LEARNER PURPOSE AND CONCEPT

Introduce quotitive division as discovering the NUMBER of equal-sized groups that fit a total when the SIZE of each group is already given. Show the contrast with the prior fair-sharing story: 12 ÷ 3 = 4 now means 'how many groups of three can be made?' rather than 'how many in each of three groups?'. The arithmetic is the same but the units of the input and answer change.

The learner actively discovers what the numerical answer counts, including the correct units, by moving a small known total into labeled groups or using an equivalent accessible numeric action.

## ACCURATE CONTENT AND MODEL LIMITATIONS

Quotitive division knows total 12 and group size 3, and determines four groups, written 12÷3=4 because 3+3+3+3=12. This story differs from 12 shared AMONG 3 groups, where 12÷3=4 reports four in each. Both are valid interpretations with different units for divisor and quotient. If total 14 and fixed size 4, create 3 complete groups (12 counters) with 2 left over; no statement 14÷4=3 as an exact whole-number equality. Transfer 20 objects at 5 each gives 4 complete groups.

**Misconceptions / boundaries:** Confusing a requested group size with a required number of groups; counting an incomplete group as a full group; constructing groups of four instead of groups of three; thinking three groups of three uses all twelve; treating quotient units as always items-per-group. No formal remainder algorithm, negative numbers, fractions or grouping by zero.

**Conservation invariant:** Every complete group has exactly target size; group count × target size + leftover = original total. Twelve with size3 →4 groups/0 leftover; fourteen with size4 →3 groups/2 leftover; twenty with size5 →4 groups/0 leftover. Incomplete leftovers cannot be recorded as complete groups.

## EXPERIENCE BEATS AND LEARNER ACTIONS

1. **Section 1: Build Groups of Three.** Prompt “We have twelve counters. Make groups with exactly three counters each. How many groups can we make?”. Start and learner action: Start 12 independent counter IDs and a 'Make next group of 3' native control. Child creates four labeled groups of exactly three while pool counts 12→9→6→3→0, each group using exactly one set of three. Display **12 ÷ 3 = 4** with unit-labeled explanation: Twelve contains four complete groups of three. Here three means how many counters belong in EACH group; four means how many groups we made. For a mistaken attempt: If a learner predicts three groups, show three groups of three use only nine and three counters still wait for a fourth group. Reveal available without any required prediction.

2. **Section 2: Same Symbols, Different Question.** Prompt “Compare 'share 12 among 3 groups' and 'make groups of 3 from 12'. Does the answer four mean the same thing?”. Start and learner action: Present two explicitly labeled models with the exact same 12÷3=4 equality: partitive sharing makes 3 groups of 4; grouping makes 4 groups of 3. Learner chooses which number describes groups versus counters in each, without silently changing either story. Display **12 ÷ 3 = 4** with unit-labeled explanation: In fair sharing, we know THREE groups and find FOUR in each. In grouping, we know THREE in each and find FOUR groups. The number sentence is identical; the story says what the answer counts. For a mistaken attempt: If a child claims four groups in the sharing model, name the three fixed recipient trays and count four inside each; preserve the unit labels. Reveal available without any required prediction.

3. **Section 3: When Some Do Not Fit.** Prompt “Fourteen counters in groups of four. How many COMPLETE groups can you make, and what remains?”. Start and learner action: New 14-counter pool with target group size four; 'Pack a complete group' produces three groups of 4, leaves 2 in source. A fourth group cannot be formed. Show explicitly '3 complete groups and 2 left'. Display **14 = 3 × 4 + 2** with unit-labeled explanation: Three complete groups take twelve counters; two are left over. Two counters are not a complete group of four. Division here is not exact in whole numbers. For a mistaken attempt: If child counts four groups, show final unfinished pair has only two, so it cannot count as a full group of four. Reveal available without any required prediction.

4. **Section 4: Build Groups of Five.** Prompt “Twenty counters: how many groups of five can we build?”. Start and learner action: Transfer with pool 20, group size 5, learner predicts 3/4/5, groups via accessible action and checks four groups use all twenty. Display **20 ÷ 5 = 4; 4 × 5 = 20** with unit-labeled explanation: Four groups of five use twenty counters. Four tells how many complete groups, and five is their required size. For a mistaken attempt: Three groups use fifteen and leave five; five groups would need twenty-five, more than provided. Reveal available without any required prediction.

## INTERACTIVE OBJECTS, STATES AND RULES

- Four independently initialized **prop-free Scene entries**, one per Section; no invented public React `mode` prop or new Resource_Config field.
- Objects: An unassigned countable source pool plus an ordered row of full groups, each with a visible and accessible target group size. Incomplete leftovers are explicitly separate, not an unlabeled half-built group. Exact source object count, group IDs, per-group memberships, remaining unassigned counters, learner step controls, numerical status, original word problem and mathematical statement.
- State: Initial total 12/14/20 and target group size 3/4/5, stable counter IDs, array of complete-group membership, remaining source count, selected candidate, explanation/reset; independent per Section.
- Invariants: Every complete group has exactly target size; group count × target size + leftover = original total. Twelve with size3 →4 groups/0 leftover; fourteen with size4 →3 groups/2 leftover; twenty with size5 →4 groups/0 leftover. Incomplete leftovers cannot be recorded as complete groups. Non-exact grouping remains a leftover state and must not be mislabeled as an exact quotient.
- Wrong trials show numerical comparison, not an accepted equality; Reset/Undo/Read/Show solution controls remain available. No scoring, Note persistence or mastery system.

## VISUAL / AUDIO / MEDIA DIRECTION

An unassigned countable source pool plus an ordered row of full groups, each with a visible and accessible target group size. Incomplete leftovers are explicitly separate, not an unlabeled half-built group. Simple lightweight HTML/SVG and large count labels are enough. Each step may move one counter per group or a whole complete group with identical state totals. Reduced motion immediately presents the same before/after quantities. Avoid generated media, animated prizes, WebGL, compulsory audio, remote evaluation or drag-only objects.

## LOCALIZATION, DIRECTION AND ACCESSIBILITY

Translate every instruction, group label, numeric status, aria description, error and feedback authentically for all supported languages; never silently use English. Preserve group-count/group-size semantic order in LTR/RTL rather than mirroring mathematics. A keyboard/switch/screen-reader user can inspect and execute every grouping move through native controls and an ordered accessible counter ledger, not a static description. Child-size targets, high contrast, visible focus, 200% zoom, reduced motion, responsive mobile and offline after the chosen locale package download are required. No speech recognition or precise dragging.

## ACCEPTANCE SCENARIOS

1. 12 grouped in threes creates four and none left; the total sequence 12,9,6,3,0 is accurate.
2. The two stories 12÷3=4 are visually and verbally distinct, and labels attach to the correct units.
3. 14 grouped in fours creates 3 complete groups and leaves 2, not an exact whole-number quotient equality.
4. 20 grouped in fives creates 4 groups and verifies 4×5=20.
5. A wrong prediction gives its exact numerical feedback and allows retry/undo and solution reveal, with no score.
6. Every Section placement resets independently; counters never duplicated, omitted or ambiguously classified.
7. Keyboard, assistive technology, RTL, reduced motion, zoomed mobile and local offline use expose the same group roles, numbers and model steps.

## IMPLEMENTATION DEPENDENCIES AND OPEN QUESTIONS

Generic Scene rendering is supported; **Group Size Packing Lab is only proposed**. Editor first approves the Draft Brief, then Content and Scene independently before Design Scene implementation with tests. Coding Agent verifies genuine locale data, prop-free entries, accessibility and offline. Assessment Architect owns any scored Questions. Editorial decision: Do not duplicate the earlier fair-sharing exercise: the group size here is specified first and the unknown is the NUMBER of groups. For Grade 2, use leftover observations without requiring formal division-with-remainder notation.
