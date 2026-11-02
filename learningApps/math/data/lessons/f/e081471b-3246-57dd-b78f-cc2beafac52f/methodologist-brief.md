# Parentheses Change the Grouping — Methodologist Brief

Date: 2026-10-31
Lesson slug: parenthesesChangeGrouping
Methodologist status: Draft
Code: [Not implemented](#)
Program dependence: None

## Educational purpose

Show that parentheses make grouped operations explicit and may change a numerical expression's value. Start with same-operation subtraction groupings, then contrast multiplication with addition so parentheses are understood as an order rule rather than a decorative bracket.

## Target audience

Children in **Grades 3** with variable literacy, numeric fluency and communication needs. Grade selection determines the proposed Lesson depth, not a ceiling on the canonical Skill's scope. Use concise language, concrete representations before symbolic abstraction when helpful, learner-controlled pacing, alternative response modes and relevant prerequisite refreshers.

## Prerequisites

- Read and evaluate short numerical expressions with addition, subtraction and multiplication facts within 5×5.
- Understand a binary operation's operands, and that 'start with ten, remove four, then remove two' is not necessarily the same as 'start with ten and remove the difference between four and two'.
- Be introduced to the conventional precedence of multiplication over addition in an unparenthesized expression; if not ready, use the pre-teaching bridge before independent comparison.

## Target Skills

- [parentheses.data.ts](../../../../data/skills/algebra/expressions/skills/parentheses.data.ts)

## Expected learning outcomes

- Identify which part of an expression parentheses group, and evaluate that inside part before combining it with the remaining expression.
- Calculate (10 − 4) − 2 = 4 and 10 − (4 − 2) = 8 and explain why the results differ.
- Calculate 2 × (3 + 4) = 14 and compare with 2 × 3 + 4 = 10, explicitly stating the unparenthesized multiplication-before-addition convention.
- Reject removal or movement of parentheses when it changes operand grouping, and verify by evaluating both expressions.

## Essential subject matter

Parentheses specify a subexpression to evaluate before applying its result in the outer expression. (10 − 4) − 2 means first find 10−4=6, then 6−2=4. By contrast 10 − (4 − 2) means first find 4−2=2, then 10−2=8. Similarly, 2 × (3+4)=2×7=14, while the conventional unparenthesized 2×3+4 is (2×3)+4=10. Parentheses can be nested in advanced expressions, and valid evaluation must respect nesting and other precedence rules, but nested groups and mixed division are a later depth progression, not an instruction to redefine the canonical Skill. Use no unexplained arbitrary order or claims that all parentheses change a value: (2+3)+4 = 2+(3+4) = 9 is a valid contrast.

## Conceptual progression and dependencies

Use a two-stage process with labeled grouping, display two subtraction expressions with identical numerals, explain the computation inside the marked region first, then investigate an example involving multiplication and addition. Show a benign grouping with an unchanged result to avoid the misconception that brackets always change answers. End with an independent transfer question.

## Misconceptions, examples and boundaries

Always calculate left to right even when parentheses are present; subtract 4 from 10 before computing (4−2) in 10−(4−2); assume parentheses always change the result; treat 2×3+4 as 2×(3+4) in conventional notation. Explicitly defer nested parentheses, division precedence, fractions and variables beyond this introductory Grade 3 Lesson; report that full canonical Skill mastery spans a broader progression.

## Localization, accessibility and offline intent

The English copy is **editorial source text**, not ready multilingual Lesson content. Before implementation, translate every learner-visible explanation, prompt, accessible description, symbol reading and feedback accurately into all supported locales; no English placeholders, invented translation or silent fallback. RTL adaptations preserve numeric operand order, mathematical relations and temporal dependencies rather than indiscriminate mirroring. All diagram/picture meanings must exist in readable, screen-reader-accessible text. Provide keyboard, switch and touch alternatives to any manipulation; use distinct labels beyond colors, visible focus, zoom/reflow, reduced motion and no timed-only requirements. Offline completeness requires all selected locale strings, resources and interactive feedback after download; this is an implementation target, not a statement about currently working PWA support.

## Sources and factual verification

- [parentheses.data.ts](../../../../data/skills/algebra/expressions/skills/parentheses.data.ts) — canonical Mathematics Skill Code and methodological scope, copied without changing UUIDs or localization.
- [Lesson Editorial Artifacts](../../../../../../studio/docs/architecture/lesson-editorial-document.md) — separate Brief/Content/Scene ownership and explicit approval policy.
- [Internationalization and Accessibility](../../../../../../studio/docs/architecture/internationalization-and-accessibility.md) — locale and inclusive design requirements.
- [Common Core State Standards for Mathematics](https://corestandards.org/mathematics-standards/) — optional age-sequence reference, not an assertion of Curriculum alignment.

## Curriculum / Program compatibility

Not specified. This standalone Lesson is Program-neutral and does not presume compatibility with an unreviewed Curriculum.

## Open editorial decisions

- Confirm prerequisites for multiplication-before-addition convention and that advanced nested/combined operation evaluation is intentionally deferred to later lessons rather than claimed taught here.
- Formal Methodologist/editor approval and required localized content remain outstanding; the [Content](./content.md) and [Scene specification](./scenes/groupingWorkbench.scene-spec.md) are **provisional Draft** parallel review artifacts, not approved Screenwriter deliverables.
- The coordinator owns the shared Playground skills index and generated taxonomy. Domain-local copied Code does not itself prove that the generated taxonomy or all external editorial gates have been refreshed.

## Methodologist handoff

**Draft pending explicit approval.** Following review, the Screenwriter may revise the independently authored Content and Scene specs. Do not infer mastery from a prediction, an on-screen interaction, a completed calculation or a voluntary explanation. No runtime Lesson, Question, Quiz, scoring, progress or Note API is created.
