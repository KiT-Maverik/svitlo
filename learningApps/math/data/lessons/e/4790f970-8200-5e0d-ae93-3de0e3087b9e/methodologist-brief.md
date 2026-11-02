# One Example Is Not a Rule — Methodologist Brief

Date: 2026-10-31
Lesson slug: oneExampleIsNotProof
Methodologist status: Draft
Code: [Not implemented](#)
Program dependence: None

## Educational purpose

Teach the boundary between a single confirming example and a universal claim, then use a precise counterexample to refute a false mathematical rule. The two Skills are distinct but pedagogically joined: evidence of one case is weak for 'all', whereas one genuine failing case settles a false universal statement.

## Target audience

Children in **Grades 3** with variable literacy, numeric fluency and communication needs. Grade selection determines the proposed Lesson depth, not a ceiling on the canonical Skill's scope. Use concise language, concrete representations before symbolic abstraction when helpful, learner-controlled pacing, alternative response modes and relevant prerequisite refreshers.

## Prerequisites

- Distinguish odd and even nonnegative whole numbers and add within 20.
- Read quantified everyday statements such as 'every' and 'some'; know how to test a supplied example against a numerical claim.
- Be ready to explain a simple numeric example in words or symbols without requiring formal written proofs.

## Target Skills

- [distinguishExampleRule.data.ts](../../../../data/skills/reasoning/argumentation/skills/distinguishExampleRule.data.ts)
- [findCounterexample.data.ts](../../../../data/skills/reasoning/argumentation/skills/findCounterexample.data.ts)

## Expected learning outcomes

- Identify the difference between a particular example ('3+5=8') and a universal statement ('every sum of two odd numbers is odd').
- Explain why a true example like 1+3=4 does not establish a universal rule about all pairs of odd numbers yielding a value of four.
- Find and verify a counterexample to the false claim 'all sums of two odd numbers are odd', e.g. 3+5=8 (even).
- Explain that a counterexample must satisfy a claim's conditions yet violate its conclusion, and that failure to find one is not itself proof of a universal claim.

## Essential subject matter

A universal mathematical statement asserts a property for every member of a clearly specified class. A _confirming example_ tests one case but cannot establish all cases. For the false claim 'every sum of two odd whole numbers is odd', choosing 3 and 5 (both odd) gives 3+5=8 (even), so this is a counterexample. Another false universal: 'every number greater than 5 is odd' has counterexample 6, because 6>5 and 6 is even. A number outside the premises is not a counterexample: 4+5=9 does not refute a statement about two odd addends because 4 is even. For a true assertion such as 'adding zero to a whole number leaves it unchanged', checking 4+0=4 is just one confirming instance and does not by itself constitute proof of all such sums. Formal parity proofs and infinite-domain quantification are out of this Lesson's depth.

## Conceptual progression and dependencies

Begin by collecting two or three true arithmetic cases and asking what they show; introduce the exact word 'every' as a stronger claim; test a tempting false statement by selecting a case that genuinely meets its conditions but fails its conclusion; contrast a misleading non-counterexample; finish with a novel false 'every' claim and a learner-authored counterexample.

## Misconceptions, examples and boundaries

'I tried two cases and both worked, so it's always true'; 'one wrong-looking example proves it'; a counterexample may violate the premise; 'couldn't find a counterexample' means proof; reversing 'some' and 'every'. Keep examples within whole numbers 0–20 and basic parity, avoid formal proof methods, logic notation, ambiguous domains and inherently contested generalizations.

## Localization, accessibility and offline intent

The English copy is **editorial source text**, not ready multilingual Lesson content. Before implementation, translate every learner-visible explanation, prompt, accessible description, symbol reading and feedback accurately into all supported locales; no English placeholders, invented translation or silent fallback. RTL adaptations preserve numeric operand order, mathematical relations and temporal dependencies rather than indiscriminate mirroring. All diagram/picture meanings must exist in readable, screen-reader-accessible text. Provide keyboard, switch and touch alternatives to any manipulation; use distinct labels beyond colors, visible focus, zoom/reflow, reduced motion and no timed-only requirements. Offline completeness requires all selected locale strings, resources and interactive feedback after download; this is an implementation target, not a statement about currently working PWA support.

## Sources and factual verification

- [distinguishExampleRule.data.ts](../../../../data/skills/reasoning/argumentation/skills/distinguishExampleRule.data.ts) — canonical Mathematics Skill Code and methodological scope, copied without changing UUIDs or localization.
- [findCounterexample.data.ts](../../../../data/skills/reasoning/argumentation/skills/findCounterexample.data.ts) — canonical Mathematics Skill Code and methodological scope, copied without changing UUIDs or localization.
- [Lesson Editorial Artifacts](../../../../../../studio/docs/architecture/lesson-editorial-document.md) — separate Brief/Content/Scene ownership and explicit approval policy.
- [Internationalization and Accessibility](../../../../../../studio/docs/architecture/internationalization-and-accessibility.md) — locale and inclusive design requirements.
- [Common Core State Standards for Mathematics](https://corestandards.org/mathematics-standards/) — optional age-sequence reference, not an assertion of Curriculum alignment.

## Curriculum / Program compatibility

Not specified. This standalone Lesson is Program-neutral and does not presume compatibility with an unreviewed Curriculum.

## Open editorial decisions

- Editor to approve pairing two independently assessable reasoning Skills in a single contrastive Lesson; do not merge their canonical Skill identities or claim formal general proof coverage.
- Formal Methodologist/editor approval and required localized content remain outstanding; the [Content](./content.md) and [Scene specification](./scenes/counterexampleDetective.scene-spec.md) are **provisional Draft** parallel review artifacts, not approved Screenwriter deliverables.
- The coordinator owns the shared Playground skills index and generated taxonomy. Domain-local copied Code does not itself prove that the generated taxonomy or all external editorial gates have been refreshed.

## Methodologist handoff

**Draft pending explicit approval.** Following review, the Screenwriter may revise the independently authored Content and Scene specs. Do not infer mastery from a prediction, an on-screen interaction, a completed calculation or a voluntary explanation. No runtime Lesson, Question, Quiz, scoring, progress or Note API is created.
