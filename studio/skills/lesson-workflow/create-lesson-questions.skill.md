# Create Lesson Questions — Assessment Architect authoring standard

**Persona:** [Learning Assessment Architect](../../personas/learning-assessment-architect.persona.md)
with the [Methodologist](../../personas/methodist.persona.md) as the
owner of Lesson scope and target Skills. Follow the actual current
[Create Questions Flow](./create-questions-flow.skill.md) for the
seven-stage, resumable PR procedure, independent review, materialization,
translation and final QA. This document defines **editorial quality**;
it does not authorize code, translation or independent sign-off.

## Current source of truth

Use the existing Lesson's canonical UUID directory. Its complete reviewed typed Lesson `index.ts`, approved derived `methodology.md`
and source-derived Lesson Markdown at an exact SHA establish learning
content and Quiz placement. Historical `methodologist-brief.md`, `lesson.yaml`
and `content.yaml` may remain as provenance; do not recreate them, generate
a new Lesson, or require a new Lesson Production Issue for this PR-driven flow.

Use **one Lesson-owned, progressively typed source** at:

    content/<textbook>/data/lessons/<last-hex>/<lesson-uuid>/questions/draft.ts

Stage 1 is `{ config, production } satisfies QuestionBankWorkflowStage1`,
with only the owning Lesson UUID and source/planned languages. Verify Lesson
and reference SHAs and approved methodology from the real Lesson/PR; **do not
duplicate that evidence in the Question draft**. Stage 1 has no Questions. Stage 2 refines
the **same file** to `satisfies QuestionBankWorkflowStage2`, adding the
full grouped bank in `config.questions`. Stage 3 refines that source to
`satisfies QuestionBankWorkflowStage3` with local Quiz design intent.
Stage 4 independent review corrects that same source and stores approval
evidence only in the Questions PR. Stage 5 uses exactly
`QuestionBankWorkflowStage3` and atomically consumes the reviewed draft,
creating canonical `define*` modules and the actual bank export. An incomplete Stage 1 file
must not be imported/published as the final `questions/index.ts` bank.

Use the nine actual Engine Config/Zod variants for scoring and their
plain nested ContentBlock Config data. Stage 2 Question nodes have the real
Config and optional `production.specification` for authoring resources, not
a parallel assessment/evidence record.
Do not maintain a parallel editor schema, YAML authoring source, status flags, `questionSlugs` or bank-level selection UUID list.

Use actual Engine code for the nine Question discriminators, all
Assessment Method slugs, params.restrictions Disability[] and nested
ContentBlock Config fields. Match the real UI Kit support; TypeScript
type existence alone does not establish a working interactive grader.
The Question Bank is independent from Lesson Config and Props.

## 1. Evidence coverage before item writing

Assess substantive coverage using the current Lesson/Skill documents and record
relevant review observations, coverage gaps, approval SHAs and stage status
**only in the existing Questions PR**. This is a review rubric, **not**
a mandatory TypeScript evidence matrix or per-Question `production` fields:

- Check the approved Lesson Skills and outcomes without copying them into each Question.
- Check that each Question's **required** `params.assessmentMethod` is meaningful.
- Verify response correctness, appropriate challenge, accessible presentation and
  distinctions between nonredundant Questions.
- When a local Quiz is approved, explain its Section placement in Stage 3.

An individual Question may check several connected ideas but does not
automatically demonstrate independent mastery of multiple Skills. A
Checkpoint or instructional Quest is not a Quiz and does not substitute
for a separately required assessment.

## 2. Generative breadth, rigorous curation

Develop candidates across meaningful cognitive operations, contexts,
transfer challenges and misconceptions. Keep an item only when it adds
marginal diagnostic evidence relative to the existing bank: a previously
uncovered outcome, a new cognitive operation, important boundary or
error diagnosis, valid transfer or meaningfully equivalent alternative
for accessibility/sampling. Remove near-identical variants with only
different numbers, words, distractor order or response widgets.

Keep enough independent core items for robust coverage and extension
items only with defensible additional value. There is no compulsory
count, one-item-per-Skill quota, or requirement to cover every Question
type or all sixteen Assessment Methods. If the existing UI cannot
capture valid evidence for a required method, report the gap and
request a methodology/implementation decision; never fake validity.

## 3. Source-language Question data

For each kept Question, author a genuine stable UUID, camelCase slug,
one of the actual Question types, exact Assessment Method slug,
typed restrictions and all type-specific params, locale and ContentBlock
collections. Use named slug maps and order arrays as required by Engine;
the Question itself owns complete prompts, answer keys/sets, plausible
wrong answers, meaningful distractors, hints and explanations.

All responses must be solvable under stated assumptions and evaluated
according to the actual supported scoring contract. A correct answer
must be unambiguous. For numeric input, specify appropriate units,
precision and rounding; for text, valid alternatives where supported.
Use sequence, matching and fill interactions only when the format
measures the intended construct, not for decoration. Avoid wording
tricks or literacy demands unrelated to the target competency.

Retain source locale provenance. Author only genuine language values,
no English copied into unsupported targets, and no speculative locale
placeholders. Keep actual intended Lesson language scope unchanged.
For unproduced media, omit the asset reference or use the existing reserved
resource placeholder and an optional source specification; concrete materializers
emit `TODO (BLOCKER)`. Never invent physical assets or treat unresolved
resources as publication-ready. Real ContentBlock identities remain UUIDs. Provide nonvisual
equivalence, keyboard support and readable alternatives whenever
possible. A restriction describes a potential limitation, not an
automatic accommodation or evidence about a learner's health.

## 4. Full Bank and deliberate default Quiz subsets

The bank can be far larger than any ordinary Quiz. A substantive instructional Lesson normally owns an independent bank even if **none of its Sections is a Quiz**; that bank may later support an approved Course assessment-only Lesson. Independently design
a small default Quiz selection for each pedagogically required
defineQuizSection in its actual Lesson order. Reuse an approved Quiz's
UUID, slug and existing learner copy rather than creating a duplicate.
When methodology requires no Quiz, retain the independent bank without
fabricating a Quiz Section. Another Lesson's assessment-only Quiz may later select reviewed Question UUIDs from multiple such banks, but its own Section owner—not this bank author—maintains that Quiz. Verify integrated branch ancestry, published Question ownership, target locales and the global resolver before final selection or publication.

Each Quiz's modern params.selection.questionIds is a nonempty explicit
list of **Question UUIDs**. mode all includes all **listed** IDs, not the
whole independent bank. mode sample selects from an explicit eligible
pool with a valid positive count; the current selection has no automatic
Skill/Method stratification. If arbitrary samples might omit required
coverage, use a fixed curated subset. Evaluate each Quiz separately
for appropriate outcomes, methods, item pace and cognitive load.
Unselected bank Questions remain for future Custom Practice.

Record the proposed Quiz placement/coverage rationale in the typed Stage 3
`production.quiz` and the Questions PR, **not a second selection UUID ledger**. Once authored TS is materialized, the Section owner imports
approved Question Configurators and uses their stable `.id` values in the
actual Section Config. No duplicate selection map is kept in the bank production metadata;
there is no legacy questionSlugs API or quizAssignments operation DSL.

## 5. Independent review and transfer

The Questions author cannot approve their own assessment. An
independent reviewer checks scientific truth, correct grading,
misconception validity, evidence mapping, item novelty, accessibility,
age fit and all selected Quiz subsets at a verified SHA. Methodologist
authority remains separate. Source changes require review refresh.

After the independent reviewer has directly corrected and re-verified the
Stage 3 source in the same PR at a final SHA, a separate Coding Agent
materializes through the bank-level orchestrator and its **nine kind-owned materializers**.
The reviewed `questions/draft.ts` is consumed in the same Git commit that creates
`questions/index.ts` and member modules. Keep the exact reviewed commit/blob
as provenance; reject existing output destinations.
The output is separate `questions/<type>/<slug>.ts` and grouped indexes.
The Coding Agent does not overwrite Lesson Sections, invent missing assets,
or prune unselected items. The actual Lesson Section owner then imports
selected Question Configurators in the real `defineQuizSection` and
validates global UUID/locale resolution. The existing assessment publisher
publishes all members, independently of Quiz selection.

**Trusted materialization:** follow [Create Questions Flow](./create-questions-flow.skill.md) and the [bank runbook](../../../scripts/ci/bankMaterialization/README.md). Verify the default-branch workflow and actual authorized run. A collision, stale SHA or partial output must leave reviewed input intact; do not delete historical YAML or pretend passing draft checks certify completion.

Do not claim Custom Practice UI exists merely because those resources
are now publishable.

Keep the reviewed staged TypeScript source intact on skipped, failed, partial
or conflicting materialization; the parent owns an explicit safe transition
into the canonical bank index. Preserve any pre-existing historical `questions.yaml` as provenance unless its owning migration is explicitly authorized and independently verified.
Report validation, typecheck, publisher preflight, builds and
independent review separately; a draft generator success is not
a completed Lesson or a valid mastery claim.
