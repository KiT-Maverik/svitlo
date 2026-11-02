# Finding an Unknown Subtrahend — Methodologist Brief

Date: 2026-10-31
Lesson slug: unknownSubtrahend
Methodologist status: Draft
Code: [Not implemented](#)
Program dependence: None

## Educational purpose

Develop the understanding that when a subtraction's starting whole and remainder are known, the _amount taken away_ can be found by subtracting the remainder from the original whole. In 11 − □ = 7, the unknown is 4 because 11 − 7 = 4, verified by 11 − 4 = 7. This is distinct from finding the minuend, where the starting amount itself is missing.

## Target audience

Children aged 6–8 in grades 1–2 with counting, taking-away and part–whole knowledge within 20. Offer countable and nonvisual models to children with mixed reading proficiency, no mandatory typing or spoken response.

## Prerequisites

- Understand initial whole, removed part and remaining part as distinct story quantities.
- Subtract and add small nonnegative numbers (with counters if needed).
- Recognize □ as an unknown, read the equals sign as comparison, and check an arithmetic statement.

## Target Skills

- [unknownSubtrahend.data.ts](../../../../data/skills/algebra/unknowns/skills/unknownSubtrahend.data.ts)

## Expected learning outcomes

- Point to or name □ in 11 − □ = 7 as the _removed_ amount rather than the starting whole or remainder.
- Use a known whole of 11 and leftover of 7 to find four removed: 11 − 7 = 4.
- Describe the relationship using a model with precisely eleven initial counters, seven remaining and four removed.
- Verify by substituting 4 into **11 − 4 = 7**, and distinguish the method from □ − 4 = 7.

## Essential subject matter

In a − □ = c for nonnegative whole-number quantities with 0 ≤ c ≤ a, the removed quantity is a − c. The difference is the remainder, and it must not be subtracted from itself to find the unknown. For 11 − □ = 7, 11 − 7 = 4, then 11 − 4 = 7. When instead □ − 4 = 7, finding the unknown _starting_ number uses 7 + 4 = 11. Both examples share the same quantities but assign them different known/unknown roles. This distinction must be made explicit in each explanation.

## Conceptual progression and dependencies

Start with a full collection of eleven and a fixed display of seven remaining; determine how many left the collection. Link the visible difference to 11−7=4. Then show 11−□=7 and replace the box with the found amount to verify. Compare the placement of the unknown with the previously introduced unknown-minuend case. End with a transfer example 14−□=9, within 20.

## Misconceptions, examples and boundaries

Errors include subtracting 7−11, assuming □=7 because it is the number after equals, calculating 11+7=18 as the removed amount, confusing 11−□=7 with □−11=7 or □−4=7, and checking only 11−7 instead of 11−4=7. Use 11−□=7 → 4 and 14−□=9 → 5. Exclude negative unknowns, remainders beyond whole, symbolic equation transformations and multiple unknowns.

## Localization, accessibility and offline intent

Distinguish “was taken away” from “is left” and “started with” in every locale; describe the blank as missing removed quantity. Show number order correctly in RTL. Whole/removed/remaining counters must have equivalent accessible ordered text and keyboard-operated reveal/restore controls. All required feedback and translations locally available after download.

## Sources and factual verification

- [Code-generated Playground taxonomy](../../../../docs/generated/skills/taxonomy.en.md), approved unknownSubtrahend Skill semantics.
- [Common Core Mathematics Standards](https://corestandards.org/mathematics-standards/), early-grade unknown-number equations, comparative reference.
- [IES/WWC Elementary Mathematics Intervention](https://ies.ed.gov/ncee/wwc/PracticeGuide/26), concrete and symbolic models.

## Curriculum / Program compatibility

Not specified; independent Lesson.

## Open editorial decisions

- Editor: verify that children understand the role contrast with unknown minuend without turning it into a second lesson.
- Confirm nonnegative whole-number range through 20 and accessible story language.

## Methodologist handoff

Draft pending editor approval. Screenwriter should teach locating the removed part and checking the **original** subtraction; no automatic assessed mastery or runtime authoring follows.
