# One and Self Division Studio — Scene Specification

Status: Draft
Owner: Educational Screenwriter
Parent Lesson: [One Group or One in Each? Content](../content.md), Sections 1–4
Methodologist objectives: Build and read 6 ÷ 1 = 6 as one group containing six. Build and read 6 ÷ 6 = 1 as six groups of one. Compare divisor and quotient roles in both models and verify with multiplication. Apply to nine and reject 0 ÷ 0 as undefined. [Methodologist Brief](../methodologist-brief.md) is Draft.

## LEARNER PURPOSE AND CONCEPT

Use two distinct sharing models to show that dividing by one keeps the starting quantity, while a nonzero number divided by itself equals one. Avoid the false extension to 0 ÷ 0. A learner acts on exact counted objects; explanations must be numerical, inspectable and available without a scored response.

## ACCURATE CONTENT AND MODEL LIMITATIONS

For a whole number a, a ÷ 1 = a. For a positive a, a ÷ a = 1. The first model has one group of a; the second has a groups of one. 6 ÷ 1 = 6 and 6 ÷ 6 = 1; 9 ÷ 1 = 9 and 9 ÷ 9 = 1. Checks: 1×6=6, 6×1=6, 1×9=9, 9×1=9. Zero divided by one equals zero, but 0 ÷ 0 is undefined. No fraction/negative arithmetic. Do not interpret 6 ÷ 1 as 'one counter in six groups' or 6 ÷ 6 as 'six in every group'. Do not duplicate counters during sharing, or claim the rule a÷a=1 covers a=0. **Invariant:** For valid division, group count is positive, all original counter IDs appear exactly once, and groupCount×perGroup=total. The zero divisor has no quotient.

## EXPERIENCE BEATS AND LEARNER ACTIONS

1. **Six in One Group:** “Six counters shared into ONE group. How many in it?” Move all six counters from an initial pool to exactly one named receiving group; allow individual or one-action transfer. Output **6 ÷ 1 = 6; 1 × 6 = 6**. Explain: The divisor one counts groups. All six counters go into that one group. Wrong trial: If one is chosen, explain one is group count, not share size.

2. **One in Each of Six:** “Six counters shared among SIX groups. How many in each?” Give one original counter to each of six named groups, tracking the unchanged total six. Output **6 ÷ 6 = 1; 6 × 1 = 6**. Explain: Six groups each get one. The quotient is one counter per group. Wrong trial: If six is chosen, six groups of six would require thirty-six objects.

3. **The Same Whole, Different Share:** “Why are the answers to 6 ÷ 1 and 6 ÷ 6 different?” Compare two separately labeled models with ledger entries Total6/Groups1/Each6 and Total6/Groups6/Each1; select which number names groups. Output **6 ÷ 1 = 6; 6 ÷ 6 = 1**. Explain: The total remains six, but changing the number of groups changes the size of each share. Wrong trial: If child says both answers six, reveal the one-in-each group counts.

4. **Nine and a Boundary:** “Try 9 ÷ 1, 9 ÷ 9 and 0 ÷ 0. Which expression is undefined?” Offer two independent nine-counter stories and a zero-divisor non-example with no quotient result; disclose reasons without requiring a guess. Output **9 ÷ 1 = 9; 9 ÷ 9 = 1; 0 ÷ 0 undefined**. Explain: One group receives nine; nine groups receive one. The divisor cannot be zero, so 0 ÷ 0 is not one. Wrong trial: If 0÷0=1 is proposed, explain a zero divisor does not identify a unique quotient.

## INTERACTIVE OBJECTS, STATES AND RULES

- Four independent, prop-free Scene placements, one per Section. No public `mode` prop or new Resource_Config field.
- **State:** For each self-contained placement, fixed initial 6 or 9, group count, unique counter IDs, allocation, candidate, status/explanation, and independent Reset. In 0÷0, no computed quotient.
- **Objects:** countable immutable-source IDs, labeled trays, explicit group-count/size text ledger, step controls, prediction, reset/reveal.
- **Invariant:** For valid division, group count is positive, all original counter IDs appear exactly once, and groupCount×perGroup=total. The zero divisor has no quotient. Each transition conserves counters, and invalid division expressions never receive a fictitious quotient.
- Full explanation and replay work without predictions. No score, Note API, Question or mastery status.

## VISUAL / AUDIO / MEDIA DIRECTION

Simple responsive HTML/SVG counter trays with clear role labels and large numeric states; motion optional and user-triggered. Reduced motion shows the same totals immediately. No external media or drag-only interaction.

## LOCALIZATION, DIRECTION AND ACCESSIBILITY

Genuinely translate all learner phrases and statuses to all supported languages, never silent English fallback. RTL preserves math operand roles rather than mirroring them. A screen-reader user has a fully actionable ordered text/count interface through native controls and announced change states. Large touch targets, visible focus, reduced motion, zoom/mobile and offline operations after locale download are mandatory.

## ACCEPTANCE SCENARIOS

1. Six in One Group: 6 ÷ 1 = 6; 1 × 6 = 6. The divisor one counts groups. All six counters go into that one group.
2. One in Each of Six: 6 ÷ 6 = 1; 6 × 1 = 6. Six groups each get one. The quotient is one counter per group.
3. The Same Whole, Different Share: 6 ÷ 1 = 6; 6 ÷ 6 = 1. The total remains six, but changing the number of groups changes the size of each share.
4. Nine and a Boundary: 9 ÷ 1 = 9; 9 ÷ 9 = 1; 0 ÷ 0 undefined. One group receives nine; nine groups receive one. The divisor cannot be zero, so 0 ÷ 0 is not one.
5. Every incorrect prediction yields a specific numeric correction with no grade.
6. Reset and independent Sections never leak state or duplicate objects.
7. Keyboard, screen reader, RTL, reduced motion, zoom/mobile and downloaded offline provide identical mathematics.

## IMPLEMENTATION DEPENDENCIES AND OPEN QUESTIONS

The generic scene resource exists; One and Self Division Studio itself is NOT implemented. Editor must approve the Draft Brief, Content and Scene independently; Coding Agent/Scene Designer implement prop-free components and tests later. Assessment Architect controls scored questions. Keep 0 ÷ 0 as a short age-appropriate boundary and avoid requiring algebraic proof.
