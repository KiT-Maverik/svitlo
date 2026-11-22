# Typed production authoring and entity-owned source materialization

**Status:** proposed implementation specification only. The Draft PR is the work tracker. This file does not claim an implemented or validated pipeline.

## Objective and boundaries

Replace temporary YAML editorial input and YAML-to-TypeScript builders with one evolving **typed TypeScript production object** per Course, Lesson, Question Bank and Flashcard Bank. Agents author and review the object, then source materialization splits it into independently editable TypeScript modules, methodology/specification documents and necessary source handoffs. This creates **authored source code**, not JSON resources for runtime publication.

Keep configurators and their **build.props() / build.overrides()** unchanged as source publication APIs. **Do not add build.files(), build.sourceFiles(), filesystem I/O or stage-specific production logic to define* configurators.** Source materialization is a separate Engine build-time capability.

## Stage contracts and production data

- **Course Stage 1 — methodology.** One TS object with immutable root Course UUID, Config identity/metadata, verified Skill outcomes/prerequisites, age/grade and standards references as applicable. Language planning lives exclusively in **production.languages: { document, planned }**: no Config params.languages until materialization. Production also owns methodology, evidence/sources, open decisions and accessibility constraints. The completed Stage 1 TypeScript type must require every approved methodological deliverable, not wrap them all in Partial. No Course hierarchy.
- **Stage 2 — macrostructure.** `CourseWorkflowStage2` extends `CourseWorkflowStage1` by adding `config.content`; the nested collection types reuse `Course_Config`, `Module_Config`, `Chapter_Config`, `Lesson_Config` and `Episode_Config` for existing Config metadata. Course items may be Module/Chapter/Lesson slot/Episode slot; Modules may contain Chapter/Lesson slot/Episode slot; Chapters may contain only Lesson slot/Episode slot. Ordered `{ items, order }` is mandatory at every level. Module/Chapter have stable slugs, required title and unit methodology, outcomes/prerequisites, depth and sequencing reason, but no materialized UUID yet. Lesson placeholders contain only `config.type` and nonempty verified `config.skills`; Episode placeholders contain only `config.type` plus **required `production.focus` and `production.purpose`** explaining the intended situation and why the Episode belongs here; they do not contain scene outlines, dialogue, script, Sections or identity. **Lesson matching remains Stage 3**, not Stage 2. When replacing the YAML workflow, update its Stage 2 instructions and keep concise JSDoc hints synchronized with the canonical Skill. Do not invent Lesson IDs, titles/objectives, Episode Sections or scenario content.
- **Stage 3 — placement and content planning.** `CourseWorkflowStage3` extends Stage 2 with **two** Lesson outcomes in `production.kind`: `new` (partial real `Lesson_Config` fields, full in-place methodology and Course intent; no UUID, languages or Sections) or `existing` with a single uniform `production.existing: { id, base?, locale? }` reference. Direct reuse sets only `id`; a Course-local adaptation can use the genuine `lesson.build.overrides(...)` result with `{ id, base, locale }`. Both have the same object type, without a string/object union or separate override branch. The Course-local slug and planned Skill list remain in `config`, but `config.id` is forbidden. `production.matching` holds verified source/evidence, and optional `overrideRationale` records editorial justification; the Course Skill/review must require it for substantive patches, since the uniform TypeScript shape intentionally does not branch on patch presence. Shared Course/Module/Chapter/Episode structure remains intact; new Lesson UUIDs are assigned only at Stage 5. The Course materializer may normalize the same reference shape regardless of patch presence, but still must resolve the source Lesson and bridge the current `course.build.overrides` raw-patch contract instead of directly serializing the reference as a Configurator. Substantive matching and assessment intent still follow the canonical Course Workflow Skill.
- **Stage 4 — independent review.** Review the same Stage 3 object at a pinned Git SHA; the independent Methodologist **immediately corrects methodological findings** in the Course PR, checks the final corrected SHA, and records the changes without a redundant review round or routine backtracking to Stage 3. Stage 4 is not a fourth type.
- **Final Stage 5 input.** The canonical `CourseWorkflowMaterializerInput = CourseWorkflowStage3` type lives alongside the stage contracts in `shared/engine/types/workflow/`. Once the Course orchestrator is implemented, it must accept this exact type, with additional source-SHA/review verification and runtime checks. It must not duplicate the shape.
- **Assessment planning for each Lesson placement.** The Methodologist makes all four explicit and independent `CourseWorkflowStage3AssessmentRequirements` boolean decisions: `questionBankRequired`, `flashcardBankRequired`, `quizSectionRequired`, `flashcardsSectionRequired`. For a new Lesson they live in `production.assessment` through `CourseWorkflowStage3LessonIntent`; reused placements also require `production.assessment`. A Bank is not the same thing as a Quiz/Flashcards Section, and `quizRequiredForCompletion` is a separate Lesson Config completion requirement. The separate standalone Lesson methodology workflow must eventually expose the same decisions, without adding runtime Config fields. Stage 5 propagates requirements to the new independent Lesson handoff; it must not invent bank resources.
- **Stage 5 — materialization.** Read the approved typed object, assign missing IDs, generate modular sources and minimal independent new-Lesson authoring handoffs. Materialization does NOT approve the work, fabricate a complete Lesson, or start a Lesson PR.

Derive stage TS types from the current Engine **Course_Config, Lesson_Config, Question/Flashcard Config** and authoritative Zod definitions using **Pick/Omit** and explicit stage-specific refinements where possible. Avoid independent copies of final Config field contracts. Nested Configurator fields require deliberate replacement: current **Course_Config.content.items**, **Lesson_Config.section.items** and similar fields hold *Configurator instances*, while staged production authoring holds ordinary nested *Config-data nodes*. Shallow Pick of those fields is not valid. Do not weaken final Config/Props validators merely to type incomplete authoring stages.

Represent **config** versus **production** clearly. Production-only fields (methodology, editor instructions, original document language, sources, assessment rationale, media/Scene briefs and unresolved decisions) never enter the final configurator or runtime Props. Planned locale codes are not proof of translation completion.

## Existing Lesson reuse and overrides

An existing Lesson placement always stores **`production.existing: { id, base?, locale? }`**, whether the Lesson is reused unchanged (`{ id: importedLesson.id }`) or adapted using the validated **`lesson.build.overrides(patch, { languages })`** result (`{ id, base, locale }`). This is exactly one TypeScript object shape, not a string/object union; `id` is mandatory and `base`/`locale` are optional, derived from the existing Lesson Build return contract. Its `id` is immutable reference metadata, never a Props patch. `production.overrideRationale` is optional structurally, but the Course Workflow Skill and independent reviewer must require a substantive rationale when the Course changes the Lesson. The same Lesson can be reused multiple times with different patches; actual matching evidence remains in `production.matching`, without duplicating the Lesson ID.

**Compatibility warning:** the current Course publisher expects *raw nested patches* as input to course.build.overrides(), not an already-built **{ id, base, locale }** result. The new authoring/materialization/publication path must explicitly support the built result or preserve the authored call expression, validate its language scope and imported Lesson compatibility and never pass a built patch into the legacy raw-patch parameter. Do not duplicate/rewrite the independent Lesson or introduce mutable shared configurator override state.

For a **new Lesson**, Stage 3 retains full methodology and stable placement but no required lessonId yet. Stage 5 assigns an immutable UUID and creates the minimal standalone Lesson production source/handoff; separate Lesson Production remains separately authorized.

## UUID lifecycle

Allocate the root Course UUID once when Course production starts. During Stages 1–4, new nested Module/Chapter/Episode/Section/ContentBlock and other supported owned nodes do **not** require agent-invented UUIDs. On materialization derive them deterministically from the root identity, concrete entity kind and stable full placement keys.

Existing **deriveCourseEntityId(courseId, kind, placement)** in **shared/engine/scripts/materializeCourseFlow/materialize-course-flow.mjs** already creates deterministic UUIDv5-shaped IDs using SHA-1. Extract/adapt a small pure Engine helper from it; extend type/placement coverage while retaining stable existing IDs where relevant. Check duplicates and invalid placement paths, never silently replace explicit or imported identities.

An allocated UUID is written into final TypeScript source **once**. A subsequent slug change or move must not recalculate that identity. Existing imported Lesson/Question/Flashcard/Scene IDs remain untouched. Identical approved input and same placement produce identical first-materialization IDs and output bytes. Invalid collisions are blockers, not signals to generate random alternatives.

## One materializer for every concrete entity/configurator kind

Implement **independent, explicit materializers for each actual configurator kind**, not only Course/Lesson/Questions/Flashcards roots. Inventory current Engine kinds before implementation: Course, Module, Chapter, Episode, Lesson; concrete Content/Quiz/Flashcards/Quest Section types; all ContentBlocks (Text, Markdown, Code, Image, Audio, Video, Scene, Carousel, Checkpoint and others); nested CarouselSlide, CheckpointItem/Answer and Quest Stage/Task; Question, Flashcard and other independently owned configured entities where source decomposition applies.

**Rules of ownership:**
1. Parent materializers own collection ordering, allowed child kinds and the child's placement directory. They delegate to the **materializer of the child's own concrete type**.
2. Child materializers own their TypeScript expression, variable/export naming from slug, imports, files, relative directories and deeper children. A parent never duplicates a child's source-generation logic.
3. The **same Section materializer** must materialize Sections under **both Lesson and Episode**, producing identical relative directory structure for equivalent inputs (e.g. sections/introduction/index.ts and nested content).
4. Respect each kind's intended separate module structure, local index.ts and existing textbook import aliases. Support colocated Markdown/Code sources and Scene TSX/specifications without losing TypeScript expressions, module references, or React implementation boundaries.
5. Existing independent configurators are referenced/imported, not copied into the parent's source tree.
6. **No premature universal registry, generic AST/source renderer, abstract materializer superclass, factories or shared child-composition abstractions.** Write each concrete materializer separately with tests, accepting intentional duplication and readable code. Only genuinely cross-cutting infrastructure should be shared initially: UUID helper, path safety and atomic file writing.
7. Root Course/Lesson/Questions/Flashcards commands orchestrate their entity materializers; they are **not** the only materializers.

The precise method/file names may be selected when implementing individual entities. Do not force a common complex output type or framework merely to make implementations appear uniform.

## Safe source emission, reviews and CI

- Materializer output consists of deterministic **authored TS/TSX/Markdown and approved asset/source handoffs**, NOT published JSON. Preserve source expressions or use a safe TypeScript representation; evaluated JS objects cannot by themselves recover all import bindings and expression syntax.
- Support validation-only preflight, read-only check and explicitly authorized create-only write. Preflight all target paths, forbid traversal/symlinks/collisions, preserve human-edited modules and refuse divergent rewrites. Trusted source changes must remain atomic and SHA-pinned.
- Emit syntactically valid TypeScript; completed sources must typecheck and satisfy the actual Configurator Build contracts. Incomplete stages/drafts must remain visibly blocked rather than inventing Lessons, Question IDs, media, translations, answer keys or review approvals. Preserve Preview-versus-production lint/publication restrictions.
- Keep Course-specific storyline in Episodes; standalone instructional Lessons remain Course-neutral. Question and Flashcard banks retain independent ownership and approval. Translation and independent review stay in the owning PR.
- Tests must cover each concrete materializer, parent/child consistency, Lesson-versus-Episode Section equivalence, identity stability, nested overrides, source imports, idempotence, create-only safety, localized source behavior and actual TS/build validation (record executed checks).

## Implementation work order

1. Production TS contracts and stage-specific types, derived from canonical Engine Config schemas while replacing nested Configurator instances with typed authoring nodes.
2. Small deterministic UUID utility, path guards and safe atomic writer; preserve existing IDs/behavior.
3. Independently implemented and tested **entity-level** materializers (not universal generation abstraction); demonstrate the same Section under Lesson and Episode first.
4. Course and Lesson root orchestration, contextual imported Lesson references/built sparse overrides, and child source modules; then Question/Flashcard, nested blocks, media and Scene cases.
5. Replace the old YAML sources, YAML schema generators, Course/Lesson/Question/Flashcard YAML-to-TS builders, validators and entrypoints *after parity is demonstrated*. Update Studio Skills/Personas/Rules, architecture/entities, CLI, CI, trusted PR commands and review provenance. **No legacy compatibility aliases or second lasting authoring format**.
6. Run and document Engine tests, TypeScript, lint, package/build/Preview/production checks, verify exact published resource compatibility and reconcile conflicting in-flight work.

**Coordination:** existing YAML-driven integration **PR #769** and agent PRs **#770–#774** cover a different design. Do not silently merge, retarget or close them in this specification-only PR. Explicitly review which independently useful pending-preview/Scene safety pieces should be carried forward before implementation; the YAML-specific approach is intended to be superseded.

## Acceptance criteria

- [ ] Stage-specific typed source works through Course Stages 1–4 without YAML; Stage 4 is source-pinned independent review, not a duplicate Config schema.
- [ ] Config versus production-only fields are cleanly separated; no duplication of canonical Config fields; planned locales do not masquerade as translations.
- [ ] Existing Lesson import and id, built recursive sparse overrides, selected languages and Course placement association remain correct, with no raw-patch/publication-patch confusion.
- [ ] Every applicable concrete Configurator type has an independent materializer and tests; equivalent Section materializes to the same relative structure under Lesson and Episode.
- [ ] New UUIDs are deterministic at first materialization and permanently persisted; existing identifiers are preserved, with duplicate/collision checks.
- [ ] Generated source is readable, correctly imported/exported and syntactically/type valid where complete; pending drafts are visibly blocked from production.
- [ ] File writes are preflighted, no-clobber, deterministic and safely atomic; reruns do not replace edited authored files.
- [ ] Existing runtime JSON publication, independent asset/bank/translation workflows and review gates do not regress.
- [ ] YAML-only contracts/entrypoints and obsolete workflow guidance are removed only after verified typed replacement; no compatibility shim.
- [ ] Validation results and migration/reconciliation with #769–#774 are explicitly recorded before Ready.

## Out of scope

No runtime Props/JSON generation in materializers; no build.files() on Configurators; no fabricated completed educational content; no simultaneous multi-PR implementation authorization; no automatic changes to unrelated existing PRs.
