# Finding and Continuing Number Patterns — Methodologist Brief

Date: 2026-10-30
Lesson slug: numberPatterns
Methodologist status: Draft
Code: [Not implemented](#)
Program dependence: None

## Educational purpose

Help learners recognize that a predictable numerical sequence can be described by a consistent additive step and then continued. The two Skills are taught together because finding a plausible step and applying it to later terms are connected yet independently meaningful abilities. The focus is reasoning about change, not memorizing a string of answers.

## Target audience

Children aged 6–8 in grades 1–2, with mixed reading fluency and experience of skip-counting. Use short spoken and written directions, visible numerals, optional concrete objects and number lines, and ways to respond without relying on speech, color recognition or precise dragging.

## Prerequisites

- Count forward reliably and compare nearby whole numbers; know that addition increases a quantity and subtraction decreases it in the examples used.
- For independent work with steps above one, be able to add a small constant repeatedly; learners who cannot yet do so need concrete counting support.

## Target Skills

- [arithmeticPattern.data.ts](../../../../data/skills/algebra/patterns/skills/arithmeticPattern.data.ts)
- [growingPattern.data.ts](../../../../data/skills/algebra/patterns/skills/growingPattern.data.ts)

## Expected learning outcomes

- Recognize a consistent increment or decrement in a short finite number sequence and describe it in everyday language (for example, “three more each time”).
- Check the proposed step against **every** adjacent pair in the supplied sequence rather than only the first pair.
- Continue a sequence by applying the verified local rule and explain why a proposed next term fits or fails.
- Distinguish a simple constant-step sequence from one where successive differences are unequal; avoid claiming that any finite list proves a unique universal rule.

## Essential subject matter

A **term** is one entry in an ordered sequence; a **step** (or difference) is the change from a term to the next. For 4, 7, 10, 13, each consecutive difference is +3, so 16 is a natural continuation under the constant-step interpretation. For 12, 10, 8, 6, each step is −2; the skill includes constant-step decrease when supported by the learner's numeracy. For 2, 5, 9, the differences +3 and +4 are not constant, so “add three each time” does not fit all observed terms. A growing additive sequence can be shown as additional counters, equal jumps on a number line, and symbolic calculations. A finite collection of terms can fit more than one conceivable rule; here the instructional convention is the simplest constant additive step **consistent with all supplied transitions**, not an absolute uniqueness theorem. Worth future recall: a claimed rule needs to agree with every observed change.

## Conceptual progression and dependencies

Start from counting and comparing adjacent quantities. Make each change visible; use the same additive step in at least two transitions; articulate that step before extending the sequence. Shift from objects/number-line jumps to numerals and verbal rules. Contrast a constant-step example with an uneven-change example and explain why a single guessed difference is insufficient. The Screenwriter chooses actual representations and learning interactions, not the Methodologist.

## Misconceptions, examples and boundaries

Learners may copy a familiar counting rhyme without checking the numbers; infer a rule from a single gap; add the previous **term** instead of the fixed **step**; or assume a sequence must increase. Useful contrasts are 3, 6, 9, 12 (add 3) versus 3, 6, 10, 15 (changes are not constant). Keep number ranges small (prefer within 30 initially) and positive, nonnegative examples. Exclude geometric sequences, algebraic nth-term formulas, and ambiguous “guess the pattern” puzzles requiring unstated context.

## Localization, accessibility and offline intent

Use culture-neutral object collections and numerals with explicit verbal alternatives; localize “term”, “step”, “more/less” and directional movement on number lines. In RTL languages, choose a mathematically meaningful number-line direction and label it rather than mechanically mirroring arrow semantics. Provide keyboard and nonvisual alternatives to ordered visual sequences, descriptive text for counters, clear symbols distinct from colors, and reduced-motion options. All selected lessons and representations must be able to function offline once downloaded, including explanatory feedback, without online-only assets. Small-device access must preserve the same mathematical reasoning.

## Sources and factual verification

- [Common Core Mathematics Standards](https://corestandards.org/mathematics-standards/), especially 1.OA.C.5 (counting related to addition/subtraction) and 2.NBT.A.2 (skip-counting); these are comparison references, not a claim of Curriculum alignment.
- [IES/WWC, Organizing Instruction and Study](https://ies.ed.gov/ncee/wwc/PracticeGuide/1), recommendations to connect concrete/abstract representations and require explanatory reasoning.
- [Playground generated English taxonomy](../../../../docs/generated/skills/taxonomy.en.md), source of the two target Skill methodological descriptions.

## Curriculum / Program compatibility

Not specified. The Lesson is standalone and Program-neutral; numerical depth is selected for the audience rather than attributed to an unverified national Curriculum.

## Open editorial decisions

- Editor: confirm that the two related pattern Skills should remain in one independent Lesson; either could later be taught or assessed separately without altering its Skill identity.

## Methodologist handoff

Ready for editor review of scope, prerequisites and both Skill references. Once approved, the Screenwriter may design accessible ways to discover, justify, and continue an additive pattern, including short recall cues. Do not infer Skill mastery from merely extending one sequence.
