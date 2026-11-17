# Review Lesson Methodology — Methodology Compliance

**Persona:** independent [Methodologist](../../personas/methodist.persona.md) **other than the Stage 1 author**. **Coordinator:** [Create Lesson Flow](./create-lesson-flow.skill.md), Stage 5. This is the final *pedagogical compliance* check, not an alternative Stage 1 Methodology authoring task.

Read the latest complete `lesson.yaml` with its original `production.methodology`, each Section, block, user-facing explanation, worked example and full **Scene/image/audio/video/Quest production specifications**, the real approved Skills/reference sources and exact Content/Experience Review SHAs. Verify learning outcomes, prerequisites, scientific correctness, conceptual depth, misconceptions, formative feedback, progression, Quiz `assessmentPlan` coverage, accessibility and Course neutrality. Missing substantive teaching or vague necessary media/Scene specifications **block** Methodology Compliance even if a basic string schema permits them. A not-yet-created asset binary or future locale does **not** by itself block methodological review. Question answers and scoring remain the separate Assessment Architect's responsibility.

Record source SHA, Skill/outcome-by-Section coverage, exact defects/paths, independent verdict, reviewer and sign-off in Lesson PR. Screenwriter repairs approved content fixes; independent reviews of changed source become stale as appropriate. Do not self-approve, introduce `draft`/`approved` frontmatter, create duplicate methodology-review.md or fabricate `review.ts` Props-digest approvals.

## Detailed methodological audit

Assess every Section against the verified Stage 1 methodology and verified references:

1. **Subject correctness:** facts, examples, explanations, analogies, diagrams and interactive Scene behavior are scientifically/academically correct within stated simplifications; identify unverified or contested claims.
2. **Coverage:** all and only intended Skills and observable outcomes are appropriately taught. Distinguish exposure, active practice, assessment evidence and actual demonstrated mastery; no accidental omissions or unauthorized learning goals.
3. **Prerequisites and progression:** assumed knowledge matches the approved learner profile, progression makes conceptual sense, misconceptions are corrected, and depth/complexity remains appropriate.
4. **Assessment contract:** the Methodologist's `assessmentPlan.quizRequired` is respected. A Lesson may have zero, one, or multiple Quiz Sections. Every required Quiz intent must map to an actual planned Quiz Section in `lesson.yaml` and retain the approved Skill IDs and cognitive `AssessmentMethodKey` coverage. Review the current Engine Quiz parameters instead of relying on legacy `content.yaml` fields. Check that the cognitive operations are pedagogically appropriate and not confused with the Question UI type. A `checkpoint` is not a Quiz. Actual Questions/answers, validity of distractors, retry/grading/mastery policy belong to the Assessment Architect.
5. **Role and autonomy boundaries:** Lesson remains usable independently of its Course, mascot, storyline or surrounding Lessons unless prerequisites were explicitly approved; Course-specific sequencing does not redefine a reusable Lesson's scope.
6. **Accessibility/localization relevance:** meaningful learner outcomes remain attainable through the specified accommodations and language plan; note conceptual/cultural assumptions, but leave UI/engineering QA to specialists.
7. **Production gaps:** missing media and scenes may remain explicit production dependencies when the educational specification is complete. Do not reject a draft merely because the asset does not exist yet. Do flag assets whose educational meaning, accuracy or acceptance criteria are too vague to implement.

Review actual `AssessmentMethodKey` definitions in Engine and the generated `.agent-ci-artifacts/assessment-methods/en.md` reference if it exists; the reference is **optional and derived**, never an authority that overrides canonical source. Do not invent unsupported Assessment Method IDs.
