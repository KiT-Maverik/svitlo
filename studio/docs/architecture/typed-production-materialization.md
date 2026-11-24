# Direct TypeScript source materialization

The canonical authoring source for Course, Episode, Lesson, Question Bank and Flashcard Bank is one entity-owned `draft.ts`. Stage-specific `CourseWorkflowStage3`, `EpisodeWorkflowStage2`, `LessonWorkflowStage2`, `QuestionBankWorkflowStage3` and `FlashcardBankWorkflowStage3` remain authored TypeScript contracts. Earlier editorial stages revise the same authored object; the final reviewed draft **calls its Engine source materializer directly**:

```ts
import { materializeCourse } from '@svitlo/engine/build';
// The same reviewed Course object is still checked against its final Stage 3 contract.
materializeCourse(reviewedCourse satisfies CourseWorkflowMaterializerInput);
```

The other source calls are `materializeEpisodeStage5(input)`, `materializeLessonStage6(input)`, `materializeQuestionBank(input)`, and `materializeFlashcardBank(input)`. No stage-specific command flags, YAML, AST literal decoder, semantic generated-TS preflight or custom Engine source bundle is a second authoring API. Engine's regular `package:build` emits build-time materializers and declarations.

## Trust and execution

Each exact PR command (`/course materialize`, `/episode materialize`, `/lesson materialize`, `/questions materialize`, `/flashcards materialize`) invokes an entity-specific **trusted GitHub gate** on default `develop`. The gate pins the exact same-repo Draft PR, HEAD/source blob, actor authorization, source identity and parent/child ancestry. Independent editorial reviews remain human/agent-owned and are not parsed as technical gate evidence. The candidate tree cannot edit trusted scripts, rules, workflows or Engine implementation used for the run.

The read-only analyzer checks out the pinned candidate, builds **only trusted default-branch Engine**, and evaluates the final reviewed `draft.ts` once inside the shared `scripts/ci/directMaterialization/` worker: non-root, read-only bind mounts, no network, no GitHub token or Git metadata, bounded CPU/memory/time. The ordinary imported Configurators remain normal JS/TS objects; they are passed to the materializer without an AST intermediary. Entity-specific Zod schemas and materializers validate authored inputs. Runner-only source and execution options are injected by the single-invocation context, never trusted from the authored object.

A sandbox execution result is **not** a publication certificate. Outside the worker, the trusted analyzer checks SHA-pinned source identity, output allowlists, hashes, collisions and domain-specific evidence (such as immutable existing Lesson dependencies, Episode Course handoff, real assessment references/Scene/media assets). It seals the complete generated file set in an immutable artifact. The write-token publisher never runs the authored entrypoint or regenerates its output: it reauthorizes the current HEAD/source/branch, verifies the artifact byte-for-byte, checks paths/trees/no-clobber, and makes **one non-force Git commit** that deletes the reviewed draft and creates the final source tree. Episode alone also updates exactly its reserved Course parent slot. Course inventory reconciliation is metadata-only after the commit.

## Entity boundaries

- **Course:** New Lesson UUID seeds and provisional Episode handoffs are generated at authorized Stage 5. Reused Lesson Configurators are independently verified and passed directly through `production.source`, with their real export name and original JSON-safe `sourcePatch` when a Course-local override exists. These fields are input evidence, not source Lesson mutations. Course does not implement separate Lessons or banks.
- **Episode:** Narrative ownership and immutable Course placement remain separate from Lessons. Only supported ordinary Sections/Blocks are materialized. Quest/event execution is not implied. Stage 9 Media Generation and Stage 10 QA are human-owned.
- **Lesson:** Stage 6.1 materializes the reviewed instructional Sections/Blocks. It never creates missing assessment banks or scenes; Stages 6.2/6.3 and 7–10 retain their independent ownership and reviews.
- **Questions/Flashcards:** Stage 5 creates complete standalone bank source, preserving separate Lesson ownership, the authored assessment decisions and actual resource/selection validation. Question-first evidence and independent bank review remain editorial requirements rather than machine-parsed preconditions. Neither bank edits Lesson Sections.

## Publication and historical data

Source materialization always remains `publishable:false`. Missing resources, unfinished locale work, unimplemented Scenes, independently owned banks, `TODO (BLOCKER)`, invalid IDs and required human evidence continue to block downstream publication. Completed Configurators alone are inputs for `generateLessonProps`, `generateCourseProps` and `generateAssessmentResources`.

Historical `content/math/data/lessons/**/lesson.yaml` files are preserved as user-authored legacy evidence, not executable input or a compatibility pipeline. Do not silently delete or convert them. Never interpret Draft checks, Zod parsing, or a successful materialization as review acceptance or release approval.

Stage ownership and approval remain specified in [Course Flow](../../skills/course-workflow/create-course-flow.skill.md), [Episode Flow](../../skills/episode-workflow/create-episode-flow.skill.md), [Lesson Flow](../../skills/lesson-workflow/create-lesson-flow.skill.md), [Questions Flow](../../skills/lesson-workflow/create-questions-flow.skill.md) and [Flashcards Flow](../../skills/lesson-workflow/create-flashcards-flow.skill.md).
