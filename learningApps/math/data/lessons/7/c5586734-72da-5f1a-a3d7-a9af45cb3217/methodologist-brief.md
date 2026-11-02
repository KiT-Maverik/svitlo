# Check Division with Multiplication — Methodologist Brief

Date: 2026-10-31
Lesson slug: divisionMultiplicationInverse
Methodologist status: Draft
Primary audience: **Grade 3**, within grades 1–3
Code: Not implemented
Program dependence: None

## Educational purpose

Teach that exact division and multiplication undo one another, so a product and one known nonzero factor determine the remaining factor. A quotient can be FOUND or CHECKED by multiplication, and the verification must reconstruct the ORIGINAL dividend. Children build 3 groups of 4 = 12, see 12 ÷ 3 = 4 and 12 ÷ 4 = 3, then use a new 20 ÷ 5 = 4 case.

## Target audience

Grade 3, with the listed concrete prior skills. Learning depth and audience are Lesson-specific; the canonical Skill remains grade-independent. Avoid long reading passages, drill pressure and unsupported mathematical vocabulary.

## Prerequisites

- Know small equal-group multiplication products such as 3×4=12 and 4×5=20.
- Interpret exact division with a positive divisor using equal sharing or equal grouping, and read the operand/quotient roles.
- Use a whole-number equality as a relationship and distinguish checking the original equation from trying an unrelated calculation.

## Target Skills

- [relationToMultiplication.data.ts](../../../../data/skills/arithmetic/divide/skills/relationToMultiplication.data.ts)

## Expected learning outcomes

- Show that the same twelve-item model supports 3×4=12 and 12÷3=4 when the number of groups is known.
- Use 4×3=12 and 12÷4=3 to illustrate a second valid inverse division relationship with explicitly named roles.
- Check a proposed division result by multiplying quotient × divisor and comparing to the original dividend; reject an incorrect candidate.
- Use multiplication to find/check 20÷5=4 and state exactly why 5×4=20 verifies the division.

## Essential subject matter

For exact whole-number division A÷d=q with d>0, d×q=A. With 3 groups of 4 there are 12 counters, so 3×4=12, 12÷3=4, and 12÷4=3 in the appropriate grouping interpretation; both division expressions are exact because 12=3×4. For 20÷5=4, 5×4=20 confirms the proposed quotient. A wrong proposed 20÷5=5 would imply 5×5=25, which does NOT reconstruct twenty. For 12÷3=5, check 3×5=15 and reject. This is not a claim that every possible division yields a whole-number quotient; work only with exact divisions and nonzero divisors. Avoid division by zero, multiplication of negative/fractional factors and automatic interchange of symbolic roles in a story.

## Conceptual progression and dependencies

1. **From Three Times Four to Twelve:** Show 3 labeled groups × 4 each (12 unique counter IDs) and a native 'Build product' action. Display 3×4=12 and label group count 3, group size 4, product 12.
2. **Undo Multiplication by Sharing:** Re-use the 12-counter group model, not duplicate counters. Present total 12 and three groups, reveal four each; show exact 12÷3=4 then 'Check' 3×4=12, with all numerical roles named.
3. **Another Division From the Same Product:** Change the story label to 'four in each', revealing three groups; annotate 12÷4=3, and check divisor 4 × quotient 3 = 12. Show both division facts next to 3×4=12 with their story labels.
4. **Check a New Quotient:** Independent transfer board with 20 counters, target 5 groups. Child checks candidates 4 or 5 by computing 5×candidate (20 vs 25) with optional visual groups, then selects which matches ORIGINAL dividend twenty.

## Misconceptions, examples and boundaries

Confusing the check 3×4=12 with a claim that the quotient itself is twelve; mixing 12÷3=4 and 12÷4=3 without relabeling number of groups versus size; accepting wrong results because the multiplication looks familiar; adding divisor+quotient instead of multiplying; assuming d×q=A verifies a non-exact quotient without remainder. Keep the original dividend prominently visible during every check.

## Localization, accessibility and offline intent

Full genuine translations of the exact numerator/denominator-like arithmetic roles **dividend, divisor, quotient**, group count and group size, with no English fallback. Use a clear token/number-label ledger that remains fully operable to screen-reader and keyboard users and correctly maintains order in RTL. WCAG 2.2 AA, large targets, reduced motion, offline after downloaded local-language content, and equivalent state lists are required. No compulsory speech/drag/timer/sound.

## Sources and factual verification

- [Canonical Skill source](../../../../data/skills/arithmetic/divide/skills/relationToMultiplication.data.ts), same Mathematics Skill object/UUID/translations, used directly in Playground's Division group.
- [Generated Playground taxonomy](../../../../docs/generated/skills/taxonomy.en.md), coordinator-owned output to regenerate after integrating this branch.
- [Common Core mathematics standards](https://corestandards.org/mathematics-standards/), multiplication and division relationships as comparative context, not guaranteed national curriculum alignment.

## Curriculum / Program compatibility

No Program dependence. Grade 3 is the selected audience of this particular Lesson, not a limit on the atomic Skill.

## Open editorial decisions

- Ensure the inverse-check procedure always compares the reconstructed product against the _original dividend_, not against the proposed quotient. One fact family is an example, not a claim to assess full division fluency.
- Verify that short readable operand language and model-unit names transfer naturally to the supported locales before approval.

## Methodologist handoff

**Draft and unapproved.** An adjoining provisional Screenwriter script and Scene specification may be prepared for review, but they are not approved pedagogical content or runtime code. No scored Questions are implied.
