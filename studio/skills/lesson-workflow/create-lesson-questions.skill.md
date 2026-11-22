# Create Lesson Questions — Assessment Architect authoring standard

**Persona:** [Learning Assessment Architect](../../personas/learning-assessment-architect.persona.md)
with the [Methodologist](../../personas/methodist.persona.md) as the
owner of Lesson scope and target Skills. Follow the actual current
[Create Questions Flow](./create-questions-flow.skill.md) for the
seven-stage, resumable PR procedure, independent review, materialization,
translation and final QA. This document defines **editorial quality**;
it does not authorize code, translation or independent sign-off.

## Current source of truth

Use the existing Lesson's canonical UUID directory. Its complete typed
Lesson source, approved methodology.md (legacy methodologist-brief.md
where present), and derived Lesson Markdown at an exact SHA establish
learning content and Quiz placement. There may be no lesson.yaml after
Resource Production. Do not recreate it, generate a new Lesson, assume
content.yaml exists, or require a new Lesson Production Issue for
this PR-driven flow.


Use **one Lesson-owned, progressively typed source** at:

    content/<textbook>/data/lessons/<last-hex>/<lesson-uuid>/questions/index.ts

Stage 1 is `{ config, production } satisfies QuestionBankWorkflowStage1`,
verified against the owning Lesson UUID and exact source SHA. It contains
pedagogical/evidence intent but **no actual Questions yet**. Stage 2 refines
the **same file** to `satisfies QuestionBankWorkflowStage2`, adding the
full grouped bank in `config.questions`. Stage 3 refines that source to
`satisfies QuestionBankWorkflowStage3` with local Quiz design intent.
Stage 4 independent review corrects that same source and stores approval
evidence only in the Questions PR. Stage 5 uses exactly
`QuestionBankWorkflowMaterializerInput` and, after the parent #775 bridge
has been verified, transitions the reviewed staging index into canonical
`define*` modules and an actual bank export. An incomplete Stage 1 file
must not be imported/published as the final `questions/index.ts` bank.

Use the nine actual Engine Config/Zod variants for scoring and their
plain nested ContentBlock Config data; specialized Stage 2 nodes hold
production-only assessment rationale, not fields on the final Config.
Do not maintain an editorial parallel schema, YAML, status flags,
`questionSlugs`, or bank-level selection UUID list. The legacy
[Questions Builder](../../../shared/engine/scripts/questionsBuilder/README.md)
and generated `question.schema.json` remain for **pre-existing YAML
consumers** until #775 migrates their orchestration. They cannot consume
the new typed staged index.

Use actual Engine code for the nine Question discriminators, all
Assessment Method slugs, params.restrictions Disability[] and nested
ContentBlock Config fields. Match the real UI Kit support; TypeScript
type existence alone does not establish a working interactive grader.
The Question Bank is independent from Lesson Config and Props.

## 1. Evidence coverage before item writing

For each intended assessment, record substantive source-language **production.evidenceIntent** and, per Stage 2 item, **production.evidence** and distinctness; keep review verdicts, approval SHAs and stage status only in the Questions PR:

- Approved target Skill and observable outcome/subcompetency.
- Required cognitive Assessment Method and the actual mental operation.
- Knowledge aspect, representation, context, difficulty and
  misconception/boundary or prerequisite distinction.
- Expected valid observable evidence and grading limitation.
- core or extension coverage role, with an explicit distinctness reason.
- Intended Quiz placement, if one is pedagogically approved.

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
Only reuse verified Lesson media UUIDs; add ContentBlock UUIDs as real
authored identities, never make up physical assets. Provide nonvisual
equivalence, keyboard support and readable alternatives whenever
possible. A restriction describes a potential limitation, not an
automatic accommodation or evidence about a learner's health.

## 4. Full Bank and deliberate default Quiz subsets

The bank can be far larger than any ordinary Quiz. A substantive instructional Lesson normally owns an independent bank even if **none of its Sections is a Quiz**; that bank may later support an approved Course assessment-only Lesson. Independently design
a small default Quiz selection for each pedagogically required
defineQuizSection in its actual Lesson order. Reuse an approved Quiz's
UUID, slug and existing learner copy rather than creating a duplicate.
When methodology requires no Quiz, retain the independent bank without
fabricating a Quiz Section. Another Lesson's assessment-only Quiz may later select reviewed Question UUIDs from multiple such banks, but its own Section owner—not this bank author—maintains that Quiz. Verify integrated branch ancestry, published Question ownership, target locales and PR #668's global resolver before final selection or publication.

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
materializes via the **nine kind-owned materializers from #780**, composed
by the #775 bank-level writer/orchestrator. The staging `questions/index.ts`
must be transitioned with explicit source/SHA preservation: it collides
with the canonical final bank entrypoint and cannot be quietly clobbered.
The output is separate `questions/<type>/<slug>.ts` and grouped indexes.
The Coding Agent does not overwrite Lesson Sections, invent missing assets,
or prune unselected items. The actual Lesson Section owner then imports
selected Question Configurators in the real `defineQuizSection` and
validates global UUID/locale resolution. The existing assessment publisher
publishes all members, independently of Quiz selection.

**Migration constraint:** the typed bridge is pending parent #775
verification. The old YAML Questions Builder and trusted comment command
still serve existing YAML sources, not this new TS workflow. Never run
them against a typed staged index, nor delete active legacy scripts until
their callers have migrated.

Do not claim Custom Practice UI exists merely because those resources
are now publishable.

Keep the reviewed staged TypeScript source intact on skipped, failed, partial
or conflicting materialization; the parent owns an explicit safe transition
into the canonical bank index. Remove any pre-existing legacy questions.yaml
only after source/IDs/Quiz integration have been independently verified.
Report validation, typecheck, publisher preflight, builds and
independent review separately; a draft generator success is not
a completed Lesson or a valid mastery claim.
