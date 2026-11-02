# Subtraction Across Ten and with Place-Value Columns — Methodologist Brief

Date: 2026-10-30
Lesson slug: subtractionAcrossTenAndColumns
Methodologist status: Draft
Code: [Not implemented](#)
Program dependence: None

## Educational purpose

Help learners understand **regrouping as preserving quantity** while subtracting, first when crossing a ten boundary and then when organizing tens and ones in aligned written columns. Both Skills are related through one exchange: one ten becomes ten ones. The purpose is a reasoned method, not a rote “borrow a one” instruction.

## Target audience

Children aged 6–8 in grades 1–2, especially learners ready for place-value work with two-digit numbers. Younger or less prepared learners should first revisit decomposition of ten and one-digit subtraction; column notation is not a prerequisite for every learner to understand crossing ten.

## Prerequisites

- Represent a two-digit number as tens and ones, recognizing that one ten equals ten ones.
- Subtract within 10 and use part–whole ideas for related facts.
- Read a two-digit written numeral correctly; alignment of tens with tens and ones with ones may be new.
- Learners who cannot conserve the number when regrouping need concrete place-value modelling before the column algorithm.

## Target Skills

- [crossTenSubtraction.data.ts](../../../../data/skills/arithmetic/subtraction/skills/crossTenSubtraction.data.ts)
- [columnSubtraction.data.ts](../../../../data/skills/arithmetic/subtraction/skills/columnSubtraction.data.ts)

## Expected learning outcomes

- Explain an across-ten subtraction (for example, 13 − 7) using decomposition or one ten exchanged for ten ones, with the starting quantity unchanged.
- Explain why subtracting the ones digit of 17 from the ones digit of 32 requires regrouping in the standard column setup.
- Show that 32 can be re-expressed from 3 tens + 2 ones as 2 tens + 12 ones and then compute 32 − 17 = 15 without changing the difference.
- Align tens and ones in a two-digit written subtraction, describe each exchange and check plausibility by counting/composing the result or by inverse addition.

## Essential subject matter

The base-ten system represents 32 as three tens and two ones. The same quantity is two tens and twelve ones because one ten equals ten ones. Hence in 32 − 17, subtract 7 ones from 12 ones and 1 ten from 2 tens, leaving 1 ten and 5 ones = 15. In 13 − 7, exchanging 1 ten to obtain 13 ones is one interpretation; another valid age-appropriate strategy is break seven into three and four: 13 − 3 − 4 = 6. These are **different representations of the same subtraction**, not separate answers. In the written column method align **place values**, not just digit positions by visual guesswork; an exchange decreases the tens count and increases the ones count by ten, preserving total value. Key future recall: ten ones = one ten; exchanging changes form, not value.

## Conceptual progression and dependencies

Review the ten–one equivalence using bundles or place-value blocks. Show crossing ten in small values, including a second equivalent mental decomposition strategy. Build from known two-digit numbers with tens and ones to a correct column alignment. Explain a single explicit exchange with an accompanying value model, then connect the physical exchange to the altered written digits and finally check the difference. The Screenwriter may vary instructional representations but must not introduce an unsupported new algorithm.

## Misconceptions, examples and boundaries

The written mark may be mistaken for arbitrarily changing the original number; learners may subtract the smaller ones digit from the larger irrespective of which number contains it (for 32 − 17, incorrectly doing 7 − 2), omit lowering the tens count after exchange, align digits by left edge, or claim “borrowing” changes the result. Explain with 3 tens + 2 ones = 2 tens + 12 ones and contrast wrong 3 tens + 12 ones. Start with two-digit nonnegative minuends and subtrahends; avoid negative differences, long multicolumn algorithms, decimals and multiple sequential exchanges.

## Localization, accessibility and offline intent

Keep tens and ones terminology distinct and consistent across languages; translate “exchange/regroup” to emphasize quantity preservation, avoiding misleading literal borrowing metaphors. Math columns are place-value structures that should not be reversed mechanically for RTL languages; use labeled tens/ones and explicit reading order. Provide an accessible structured-text description of each column, keyboard-operable alternatives to moving blocks, screen-reader announcement of the exchange, and alternatives to color-only or visual-only marks. Animations are optional and reducible, while reasoning and feedback remain fully available offline and on weak devices.

## Sources and factual verification

- [Common Core Mathematics Standards](https://corestandards.org/mathematics-standards/), 1.OA.C.6 (addition/subtraction within 20), 2.NBT.B.7 (place-value models and written methods) and 2.NBT.B.9 (explain methods); used as comparison references.
- [IES/WWC, Elementary Mathematics Intervention](https://ies.ed.gov/ncee/wwc/PracticeGuide/26), place-value representations and explicit mathematical language.
- [Playground generated English taxonomy](../../../../docs/generated/skills/taxonomy.en.md), definitions for crossing ten and column method.

## Curriculum / Program compatibility

Not specified. The two concepts form a coherent independent Lesson for learners with place-value prerequisites; particular grade sequence and depth require later Curriculum review.

## Open editorial decisions

- Editor: confirm combined Lesson scope versus two separate Lessons if the range of learners (age 6 versus age 8) makes column notation a distinct instructional stage. This Draft intentionally covers both requested Skills.
- Editor: approve initial two-digit scope only; this Lesson-depth choice does not limit the broader age-neutral Skill definitions.

## Methodologist handoff

Draft for explicit editor approval. After approval, the Screenwriter may plan a concrete and symbolic comparison showing why exchanging tens for ones preserves value, and then link it to a written method. No preordained widget, test score, or formal mastery certification is implied.
