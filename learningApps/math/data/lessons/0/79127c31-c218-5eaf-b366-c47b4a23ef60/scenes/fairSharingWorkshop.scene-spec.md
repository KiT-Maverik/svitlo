# Fair Sharing Workshop — Scene Specification

Status: Draft
Owner: Educational Screenwriter
Parent Lesson / Sections: [Share Equally: How Many in Each Group?](../content.md), Sections 1–4
Methodologist source: [Methodologist Brief](../methodologist-brief.md) (Draft, not approved).

## LEARNER PURPOSE AND CONCEPT

Introduce partitive division through an exact, fair share: when the total and the number of groups are known, the learner must discover the size of EACH group. The distinction between the number of recipients and the number of objects in each share is the concept, not a division sign memorized ahead of the experience.

The learner actively discovers what the numerical answer counts, including the correct units, by moving a small known total into labeled groups or using an equivalent accessible numeric action.

## ACCURATE CONTENT AND MODEL LIMITATIONS

With an exact whole-number share, 12 objects and 3 groups give 4 each, written 12 ÷ 3 = 4. The shares must all match: 4+4+4=12. A second exact case 10 ÷ 2 = 5 uses two groups of five. When trying to share 13 counters among 3 groups, four go in each and one remains: there is NO equal share of all thirteen into three whole-number groups; do not falsely write 13 ÷ 3 = 4 as an exact identity. The remainder is observed as one leftover object without a full formal remainder algorithm. A divisor of zero is not used.

**Misconceptions / boundaries:** Confusing the known three groups with the answer 'three in each'; placing twelve counters in each group (thirty-six total); calling an unequal distribution fair; pretending thirteen can be shared exactly without splitting an object; copying the size from an earlier case. A share distributes, it does not clone the original counters.

**Conservation invariant:** Allocated counters plus leftover exactly equals the original total; every counter has exactly one location. Equal sharing has equal per-group counts. For 12 with three groups there are 4 each and 0 left; for 13 there are 4 each and 1 left; for 10 with two groups there are 5 each and 0 left.

## EXPERIENCE BEATS AND LEARNER ACTIONS

1. **Section 1: Give Everyone an Equal Share.** Prompt “Twelve counters must be shared among three groups. Can you give each group the same number?”. Start and learner action: Start 12 uniquely identified counters in a source area and 3 empty labeled groups. Child activates 'Give one to each group' (three moves per complete round) or accessible single-step distribute; three complete rounds plus one produce four each. Display **12 ÷ 3 = 4** with unit-labeled explanation: Twelve shared equally among three groups leaves four counters in every group. We used every counter once and nobody has extra. For a mistaken attempt: If a child predicts three in each, count 3+3+3=9 with three still unassigned; distribute the remaining three, one to each. Reveal available without any required prediction.

2. **Section 2: What Do the Numbers Mean?.** Prompt “In 12 ÷ 3 = 4, which number counts all counters, which counts groups, and which counts each share?”. Start and learner action: Keep the completed twelve-counter sharing scene. Learner activates labeled positions in the expression; highlight total 12, group count 3 and per-group size 4 with full screen-reader names, then reveal 4+4+4=12. Display **12 ÷ 3 = 4; 4 + 4 + 4 = 12** with unit-labeled explanation: Twelve is the total. Three says how many groups are receiving a share. Four tells us how many counters each receives. For a mistaken attempt: For 'three in each', inspect all three trays and count four in one; do not allow positions to be swapped silently. Reveal available without any required prediction.

3. **Section 3: What if One Counter Is Left?.** Prompt “What changes when you share thirteen counters among three groups? Can every counter fit into an equal whole-number share?”. Start and learner action: Fresh independent 13-counter scene, three groups; allow four fair rounds assigning twelve, then leave exactly one visibly in the source area. Narrate 'four each; one left over' and explicitly refuse to label 13÷3=4 an exact equality. Display **13 = 3 × 4 + 1** with unit-labeled explanation: Three groups can each have four, but one counter remains. Sharing all thirteen into three equal groups of whole counters is not exact. For a mistaken attempt: If a learner adds leftover to one tray, counts become 5,4,4 and shares are unequal; show counts and correct by restoring that one to the source area. Reveal available without any required prediction.

4. **Section 4: Share Ten With Two Groups.** Prompt “Ten counters and two groups: how many does each get?”. Start and learner action: New exact transfer with ten objects and two groups; child predicts 4/5/6, distributes or reveals the groups, then validates 5+5=10. Display **10 ÷ 2 = 5** with unit-labeled explanation: Two equal shares of five use all ten counters. The group count is two, and the group size is five. For a mistaken attempt: Four each only uses eight with two left; six each would require twelve, more than we started with. Reveal available without any required prediction.

## INTERACTIVE OBJECTS, STATES AND RULES

- Four independently initialized **prop-free Scene entries**, one per Section; no invented public React `mode` prop or new Resource_Config field.
- Objects: Three large labeled share trays (or two for transfer), a source counter pile with stable IDs and a tally of each group; allow 'one to each' and direct accessible step controls, not drag-only distribution. Exact source object count, group IDs, per-group memberships, remaining unassigned counters, learner step controls, numerical status, original word problem and mathematical statement.
- State: Per-section initial total 12/13/10, group count 3 or 2, stable counter identities and allocations, leftover pool, number of fair distribution rounds, prediction, explanation and reset; initial states isolated.
- Invariants: Allocated counters plus leftover exactly equals the original total; every counter has exactly one location. Equal sharing has equal per-group counts. For 12 with three groups there are 4 each and 0 left; for 13 there are 4 each and 1 left; for 10 with two groups there are 5 each and 0 left. Non-exact grouping remains a leftover state and must not be mislabeled as an exact quotient.
- Wrong trials show numerical comparison, not an accepted equality; Reset/Undo/Read/Show solution controls remain available. No scoring, Note persistence or mastery system.

## VISUAL / AUDIO / MEDIA DIRECTION

Three large labeled share trays (or two for transfer), a source counter pile with stable IDs and a tally of each group; allow 'one to each' and direct accessible step controls, not drag-only distribution. Simple lightweight HTML/SVG and large count labels are enough. Each step may move one counter per group or a whole complete group with identical state totals. Reduced motion immediately presents the same before/after quantities. Avoid generated media, animated prizes, WebGL, compulsory audio, remote evaluation or drag-only objects.

## LOCALIZATION, DIRECTION AND ACCESSIBILITY

Translate every instruction, group label, numeric status, aria description, error and feedback authentically for all supported languages; never silently use English. Preserve group-count/group-size semantic order in LTR/RTL rather than mirroring mathematics. A keyboard/switch/screen-reader user can inspect and execute every grouping move through native controls and an ordered accessible counter ledger, not a static description. Child-size targets, high contrast, visible focus, 200% zoom, reduced motion, responsive mobile and offline after the chosen locale package download are required. No speech recognition or precise dragging.

## ACCEPTANCE SCENARIOS

1. 12 into 3 distributes 4 per group, no lost/cloned counters, and 4+4+4=12.
2. All three roles in 12÷3=4 are identified, including '3 groups' and '4 in each'.
3. 13 into 3 leaves one unassigned after three groups of four, and is never labeled as exact 13÷3=4.
4. 10 into 2 yields five each and verifies 5+5=10.
5. A wrong prediction gives its exact numerical feedback and allows retry/undo and solution reveal, with no score.
6. Every Section placement resets independently; counters never duplicated, omitted or ambiguously classified.
7. Keyboard, assistive technology, RTL, reduced motion, zoomed mobile and local offline use expose the same group roles, numbers and model steps.

## IMPLEMENTATION DEPENDENCIES AND OPEN QUESTIONS

Generic Scene rendering is supported; **Fair Sharing Workshop is only proposed**. Editor first approves the Draft Brief, then Content and Scene independently before Design Scene implementation with tests. Coding Agent verifies genuine locale data, prop-free entries, accessibility and offline. Assessment Architect owns any scored Questions. Editorial decision: Formally introducing quotient/remainder terminology is optional for Grade 2; retain the accuracy of the non-exact case. Do not overlap the existing unknownDividend Lesson's purpose of recovering a hidden starting total.
