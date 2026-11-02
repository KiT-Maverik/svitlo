# True or False? Compare Both Sides — Methodologist Brief

Date: 2026-10-31
Lesson slug: checkEqualitiesAndInequalities
Methodologist status: Draft
Code: [Not implemented](#)
Program dependence: None

## Educational purpose

Progress from understanding the equals sign and constructing matching expressions to evaluating _complete_ mathematical claims. Include the order relations < and > as true/false statements, not only numerical equalities.

## Target audience

**Primary audience: Grade 2.** Select conceptual depth and expected independence according to these prerequisites, not a numerical grade ceiling on the canonical Skill. Plan for developing reading fluency, optional teacher/adult mediation, accessible symbols, working-memory scaffolding and multiple response modes. All examples remain legible and comprehensible without sound, exact pointer control or high-speed interaction.

## Prerequisites

- [equalityMeaning.data.ts](../../../../data/skills/algebra/equalities/skills/equalityMeaning.data.ts): equal sign compares values, not ‘answer follows’.
- [readNumericExpressions.data.ts](../../../../data/skills/algebra/expressions/skills/readNumericExpressions.data.ts): interpret simple numeric expressions and operation order inside subtraction.
- Count, add and subtract within 20 and compare whole-number magnitudes, including more/less.

## Target Skills

- [trueFalseEquality.data.ts](../../../../data/skills/algebra/equalities/skills/trueFalseEquality.data.ts)

## Expected learning outcomes

- Evaluate each side of a complete numerical claim and judge whether =, < or > describes the actual value relationship.
- Justify why `3 + 5 = 4 + 4` and `5 + 2 < 4 + 4` are true with two computed side values.
- Identify false claims such as `9 − 2 > 3 + 5` and explain whether the relation sign, not the computations, misdescribes the values.
- Correct a false comparison by choosing a mathematically valid relation, leaving values unchanged where instructed.

## Essential subject matter

An equality is true iff the two entire side values match. An inequality `A < B` is true iff A is smaller than B, and `A > B` iff A is greater than B. `3+5=4+4` is 8=8 (true); `5+2 < 4+4` is 7<8 (true); `9−2 > 3+5` compares 7>8 (false); `4+6 < 8+2` compares 10<10 (false because equal values cannot satisfy strict less-than). Do not confuse truth of a stated comparison with the ability to perform only one side's calculation. The statement 7<8 is not interchangeable with 8<7. Use labeled quantity bars and explicit mathematical value comparisons; the relation symbol's tip/arms may be explained only with unambiguous equal-unit models.

## Conceptual progression and dependencies

First inspect two known-number statements, then bring in sides containing expressions, then compare a borderline case where both sides equal but the given symbol says <; finally independently evaluate a mixture of equalities and inequalities with immediate explanatory feedback.

## Misconceptions, examples and boundaries

Treating ‘=’ as a command, interpreting < or > from the physical placement of a drawing, comparing the first numeral of each expression rather than evaluated side totals, or assuming equality satisfies strict < or >. Exclude ≤, ≥, variables, inequalities with an unknown, signed negative numbers, and formal solving of inequalities.

## Localization, accessibility and offline intent

English text is an **editorial source**, not a finished multilingual translation. Before implementation every learner-visible prompt, story, diagram label, mathematical reading, control name, feedback statement and nonvisual alternative needs **genuine, meaning-preserving translation for all current supported locales**, with no silent English fallback. Mathematical operand order, chronological events, and quantitative meaning must remain stable in RTL; adapt layout semantically rather than mirror all graphics. Offer keyboard, touch and switch alternatives to dragging, explicit textual names and values rather than color-only cues, predictable focus, zoom/mobile reflow, reduced motion and equivalent auditory/nonvisual explanations. All lesson-critical resources and feedback should be available after offline download; this is a **target** requiring future implementation checks, not a promise that PWA/Note persistence is implemented.

## Sources and factual verification

- [trueFalseEquality.data.ts](../../../../data/skills/algebra/equalities/skills/trueFalseEquality.data.ts) — directly linked Mathematics canonical Skill data; confirm exact source/UUID and domain-local composition, not a generated Markdown authority.
- [Lesson Editorial Artifacts](../../../../../../studio/docs/architecture/lesson-editorial-document.md) — independent Methodologist and Screenwriter artifacts and approval boundaries.
- [Internationalization and Accessibility](../../../../../../studio/docs/architecture/internationalization-and-accessibility.md) — current inclusive localization design requirements.
- [Common Core Mathematics Standards](https://corestandards.org/mathematics-standards/) — optional international reference for a broad progression, **not** a claim of Curriculum alignment.

## Curriculum / Program compatibility

Not specified. This Lesson is standalone and Program-neutral.

## Open editorial decisions

- Do not duplicate the earlier equalsMeaning or completeMissingEquality Lessons; this Lesson must emphasize **testing complete claims** including inequalities, not teaching equals sign meaning or filling a missing box.
- The generated Playground taxonomy view is a shared coordinator-owned artifact and may not yet include newly migrated SkillGroups; formal taxonomy approval must be independently confirmed. Do not mistake the presence of a canonical source Code object for a new editorial sign-off.
- Methodologist/editor must explicitly approve this Draft Brief before Content or Scene specifications become formally approved; current parallel drafts are **provisional**.

## Methodologist handoff

**Draft, pending explicit approval.** The Screenwriter's [provisional Content](./content.md) and [proposed Scene](./scenes/statementVerifier.scene-spec.md) are independently reviewable, not evidence that the Methodologist gate passed. No runtime Lesson, Question, Quiz, grade, scoring or Note persistence was implemented.
