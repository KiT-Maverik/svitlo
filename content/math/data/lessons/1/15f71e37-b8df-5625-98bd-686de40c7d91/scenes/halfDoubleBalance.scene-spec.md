# Half and Double Balance — Scene Specification

Status: Draft
Owner: Educational Screenwriter
Parent Lesson: [Half and Double: Divide by Two Content](../content.md), Sections 1–4
Methodologist objectives: Make two equal shares of twelve and name six as half. Verify the half by doubling six to obtain twelve. Contrast two groups of six with six groups of two, labeling the quotient units. Transfer exact halving to sixteen and ten and check via doubling. [Methodologist Brief](../methodologist-brief.md) is Draft.

## LEARNER PURPOSE AND CONCEPT

Integrate exact division by two with halving/doubling as inverse actions; two equal shares are formed and their combined amount restores the whole. Distinguish two large shares from pairs of two. A learner acts on exact counted objects; explanations must be numerical, inspectable and available without a scored response.

## ACCURATE CONTENT AND MODEL LIMITATIONS

12 ÷ 2 = 6, 6 + 6 = 12, and 2×6=12; 16÷2=8 with 2×8=16; 10÷2=5 with 2×5=10. For the sharing story 12÷2=6 means TWO groups each containing SIX; for grouping it means SIX complete groups of TWO. For thirteen whole counters divided among two groups, six each leaves one leftover; 13÷2=6 is not an exact whole-number equality. Whole even amounts ≤20; no forced half-objects or fractions. Shares of seven and five are not equal even though they total twelve. Doubling six is not adding one; don't confuse the two meanings of the quotient six or discard one leftover from thirteen. **Invariant:** Every original counter has exactly one location; for even N, equalShare×2=N. Thirteen in two whole-number groups may leave one explicitly unallocated, never become an exact equality.

## EXPERIENCE BEATS AND LEARNER ACTIONS

1. **Two Equal Halves:** “Share twelve counters into TWO equal groups. How many in each?” Use 'Give one to each' for six rounds, distributing unique counters into two labeled trays; offer grouped actions and text totals. Output **12 ÷ 2 = 6**. Explain: Two groups each have six. Six is half of twelve. Wrong trial: If 7 and 5 are offered, compare group counts and rebalance one counter.

2. **Double the Half:** “If one half is six, what is double six?” Show both complete shares and allow the learner to recombine them and read both the addition and multiplication checks. Output **6 + 6 = 12; 2 × 6 = 12**. Explain: Doubling means two equal groups of six; together they reconstruct twelve. Wrong trial: If seven is chosen, show that six plus one differs from six plus six.

3. **Two Groups or Groups of Two?:** “What changes if we make GROUPS OF two instead of TWO groups?” Show two explicitly labeled story panels: two groups of six vs six groups of two, preserving exact twelve and expression 12÷2=6. Output **12 ÷ 2 = 6**. Explain: In sharing the six counts objects per group; in grouping it counts complete pairs. Wrong trial: If child claims two groups in the pairing story, read every one of six pairs.

4. **Halve Sixteen and Ten:** “Find half of sixteen and half of ten, then double each answer.” Offer independently reset 16- and 10-counter models, with optional odd thirteen contrast. Check eight and five by multiplying by two. Output **16 ÷ 2 = 8; 2 × 8 = 16; 10 ÷ 2 = 5; 2 × 5 = 10**. Explain: Eight doubled is sixteen; five doubled is ten. A leftover in an odd model does not produce an exact result. Wrong trial: If nine is half sixteen, double nine gives eighteen; if six is half ten, double six gives twelve.

## INTERACTIVE OBJECTS, STATES AND RULES

- Four independent, prop-free Scene placements, one per Section. No public `mode` prop or new Resource_Config field.
- **State:** Independent initial amounts 12, 16, 10 (optional 13 contrast), stable IDs, two share trays or pairs of two, allocated/remaining, trial/check, explanation/reset.
- **Objects:** countable immutable-source IDs, labeled trays, explicit group-count/size text ledger, step controls, prediction, reset/reveal.
- **Invariant:** Every original counter has exactly one location; for even N, equalShare×2=N. Thirteen in two whole-number groups may leave one explicitly unallocated, never become an exact equality. Each transition conserves counters, and invalid division expressions never receive a fictitious quotient.
- Full explanation and replay work without predictions. No score, Note API, Question or mastery status.

## VISUAL / AUDIO / MEDIA DIRECTION

Simple responsive HTML/SVG counter trays with clear role labels and large numeric states; motion optional and user-triggered. Reduced motion shows the same totals immediately. No external media or drag-only interaction.

## LOCALIZATION, DIRECTION AND ACCESSIBILITY

Genuinely translate all learner phrases and statuses to all supported languages, never silent English fallback. RTL preserves math operand roles rather than mirroring them. A screen-reader user has a fully actionable ordered text/count interface through native controls and announced change states. Large touch targets, visible focus, reduced motion, zoom/mobile and offline operations after locale download are mandatory.

## ACCEPTANCE SCENARIOS

1. Two Equal Halves: 12 ÷ 2 = 6. Two groups each have six. Six is half of twelve.
2. Double the Half: 6 + 6 = 12; 2 × 6 = 12. Doubling means two equal groups of six; together they reconstruct twelve.
3. Two Groups or Groups of Two?: 12 ÷ 2 = 6. In sharing the six counts objects per group; in grouping it counts complete pairs.
4. Halve Sixteen and Ten: 16 ÷ 2 = 8; 2 × 8 = 16; 10 ÷ 2 = 5; 2 × 5 = 10. Eight doubled is sixteen; five doubled is ten. A leftover in an odd model does not produce an exact result.
5. Every incorrect prediction yields a specific numeric correction with no grade.
6. Reset and independent Sections never leak state or duplicate objects.
7. Keyboard, screen reader, RTL, reduced motion, zoom/mobile and downloaded offline provide identical mathematics.

## IMPLEMENTATION DEPENDENCIES AND OPEN QUESTIONS

The generic scene resource exists; Half and Double Balance itself is NOT implemented. Editor must approve the Draft Brief, Content and Scene independently; Coding Agent/Scene Designer implement prop-free components and tests later. Assessment Architect controls scored questions. The combined lesson must provide separately observable understanding of division by two and the inverse half/double relationship.
