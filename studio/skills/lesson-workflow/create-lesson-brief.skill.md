# Create Lesson Brief Skill

**Production Issue coordination:** For authorized creation or revision of Lesson methodology as part of production, find or initialize the one fixed-scope [Lesson Production Issue](./manage-lesson-production.skill.md) before opening work PRs. An Issue may include many Lessons. Read its latest scope/status, process all ready Lessons in the assigned batch and update the same Issue on handoff; do not open a new Issue for each brief or seek a separate “continue” for each Lesson. Mere investigation/brainstorming does not require a Production Issue.

**Mandatory first action:** Read [Methodologist Persona](../../personas/methodist.persona.md) **in full** and apply its professional judgment, editorial escalation rules and role boundaries. This Skill is the task-specific workflow for designing the **methodological specification of one independent Lesson**. It does not run Create Curriculum and does not author the Screenwriter-owned Lesson Content document, Questions, Scene specifications, gamification, or code.

## PURPOSE AND ARTIFACT OWNERSHIP

Create or revise an independent **Methodologist Brief** beside the files of one Lesson, following [Lesson Editorial Artifacts](../../docs/architecture/lesson-editorial-document.md). The Brief defines **what the learner should learn, why, for whom, under which prerequisites and constraints**. It is an **editorial-only Markdown file**, not Lesson runtime configuration or content to serialize into a client bundle. The Educational Screenwriter will author a **separate machine-readable `content.yaml`** in its own workflow. Never edit or create that file with this Skill.

A Lesson is **autonomous and Program-neutral**. It can exist before any Curriculum, be reused in multiple Programs/Curricula, and teach one or several independently meaningful Skills. Its storage path, slug, Skills and potential Curriculum usages are separate concerns. No one-Skill-per-Lesson or one-Lesson-per-Skill quota.

Read the focused [Lesson](../../docs/entities/lesson.md), [Lesson Content](../../docs/entities/lesson-content.md), [Section](../../docs/entities/section.md), and [Program](../../docs/entities/program.md) entity definitions for their distinct responsibilities.

Read [Svitlo Architecture & Product Principles](../../docs/architecture/README.md), particularly [Learning Experience Philosophy](../../docs/architecture/learning-experience-philosophy.md), [Internationalization & Inclusive Access](../../docs/architecture/internationalization-and-accessibility.md), [Offline/Device Compatibility](../../docs/architecture/offline-first-and-device-compatibility.md), and [Lesson Notes](../../docs/architecture/lesson-notes.md). Follow actual textbook instructions, the canonical taxonomy, and [SkillDomain](../../docs/entities/skill-domain.md), [SkillGroup](../../docs/entities/skill-group.md), [Skill](../../docs/entities/skill.md). The architecture expresses product intent, not proof of implemented runtime features.

**Backward compatibility:** Newly created Lessons use `methodology.md`. For an existing Lesson with legacy `methodologist-brief.md`, update that existing file in place. Never write both as two Methodologist Briefs in the same Lesson directory.

## REQUIRED INPUTS AND STOP CONDITIONS

Do not author a Lesson Brief until these inputs are available and checked:

1. **Package root and Lesson scope:** the specific standalone textbook application root, a proposed or existing Lesson, and a meaningful topic/educational purpose. Never default to the monorepo root or Playground.
2. **Approved Skills Taxonomy:** read `<PackageRoot>/docs/generated/skills/taxonomy.en.md` for relevant Domains, Groups, Skills and English methodological descriptions. **If absent**, run `node scripts/generate-skills-taxonomy.mjs --package content/<textbook> --locale en` from the **monorepo root**, substituting the actual package path; then read the result. The generated document is a read-only view of `*.data.ts` Code, **not** a separate canonical authority or proof of editorial approval. During staged migration, additionally consult approved but not-yet-promoted entries in `<PackageRoot>/docs/skills/taxonomy.md`, if present; this staging file can disappear after complete migration. If generation fails, a relevant entry is unavailable, or approval cannot be verified, **stop and report the blocker**, rather than guessing or treating partial output as complete.
3. **Target Skills:** identify one or more **approved, independently meaningful Skills** and specify their canonical `*.data.ts` sources under **`<PackageRoot>/data/skills/` (outside `src/`)**. Record one Markdown link per Skill, labeled with its complete `.data.ts` filename; do not use Skill titles, UUIDs, generic link labels, or old `src/data/skillsTaxonomy/` paths. Verify pedagogical Skill identity against approved taxonomy. The canonical `data/skills/` layout is already used by Mathematics and Playground. Verify actual Skill files before linking to them. If another package has not migrated yet, report the unresolved path as a migration blocker; do not invent files or fall back to `src/`.
4. **Audience:** intended learners, approximate prior knowledge and language/literacy context, and relevant accessibility needs; do not automatically assume a school grade.
5. **Intent and constraints:** intended learning outcomes or instructional problem, content boundaries, required depth, known prerequisites, references and any mandatory standards or safety requirements.
6. **Language plan:** explicitly record `documentLanguage` (language of the methodological prose, normally `en`) and a non-empty, unique, ordered `supportedLanguages` list of planned learner-facing Lesson locales. Check against `DEFAULT_SUPPORTED_LANGUAGES`. If this Lesson is proposed for a Course, include **all Course languages**; otherwise establish the planned locale set with the editor and report missing decisions instead of guessing.
7. **Assessment design decision:** explicitly decide whether any scored `Quiz` Section is educationally necessary. Read [Assessment Method keys](../../../shared/contracts/src/types/content/assessmentMethod.types.ts) and the [canonical 16 keys](../../../shared/contracts/src/types/content/assessmentMethod.ids.ts), [Question metadata](../../../shared/contracts/src/types/content/questions/common.types.ts), [Section](../../../shared/contracts/src/types/content/section.types.ts), and [Quiz parameters](../../../shared/contracts/src/types/content/quiz.types.ts). For each required Quiz, specify which verified target Skills must be assessed and one or more `AssessmentMethodKey` operations. Quiz count is **not limited to one**. These are instructional requirements, not actual Question/answer/grade designs. Record the decision as `assessmentPlan` in the Brief's YAML frontmatter using [this schema](./lesson-methodology-frontmatter.schema.json). Surface missing **material** constraints instead of inventing them.

**Optional:** compatibility with a named Curriculum or Program, delivery modality, expected duration, media/technology restrictions, locale-specific contexts, or special revision goals. If compatibility is requested, actually read the named Curriculum and reconcile scope, learning depth and prerequisites **without making it the Lesson's owner**. If none is specified, do not manufacture a Curriculum or claim compatibility with all curricula. Curriculum is **never** a prerequisite for this Skill.

If approved Skills, essential audience or substantive intent are missing, or a Skill is ambiguously identified, **stop and request the smallest necessary editorial clarification**. Do not generate an authoritative-looking Brief from guesses. Do not treat a draft or missing taxonomy as approved.

## ASSESSMENT EVIDENCE PLANNING

Consult `.agent-ci-artifacts/assessment-methods/<language>.md` when available, choosing the learner's frontend language for short labels. The extended explanations remain **English**. The reference lists all canonical Assessment Methods and distinguishes the **cognitive operation assessed** from a **Question UI type**; it is a read-only convenience view, not a replacement for `AssessmentMethodKey` identifiers in Contracts. If absent, inspect the canonical Contracts, English Engine methodology and UI Kit translations instead of making up methods or assuming defaults.

In the Methodologist Brief, decide whether this Lesson needs any **Quiz Sections**, based on the intended Skills, observable outcomes and the kind of evidence necessary to evaluate them. When justified, describe which canonical `AssessmentMethodKey` values would elicit that evidence for each targeted Skill/outcome and why distinct Methods are needed; do not mechanically assign one method per Skill or mandate a Quiz in every Lesson. This is an **assessment intent and handoff**, not an implementation of Questions, UI interaction formats, scoring, mastery thresholds or retries. The Learning Assessment Architect owns those decisions.

## METHOD AND RESPONSIBILITY BOUNDARIES

1. **Inspect before authoring.** Resolve the textbook path, existing Lesson directory/Methodologist Brief (if any), generated taxonomy descriptions, approved unpromoted staging entries when applicable, relevant references and actual implementation only if needed to validate the Code link. Preserve all existing unrelated specialist files.
2. **Establish the pedagogical contract.** Describe the desired conceptual change, observable outcomes, prior knowledge, prerequisite gaps, depth appropriate to the audience, and why the selected Skills belong together. Distinguish teaching a Skill from assessing its mastery.
3. **Specify the subject matter.** Identify essential facts, concepts, mechanisms, relationships, terminology, valid examples or counterexamples, common misconceptions, and hard exclusions. Include enough accurate substance for the Educational Screenwriter to work without inventing facts or objectives; do not write a Section-by-Section instructional plan.
4. **Design the learning progression conceptually.** Identify conceptual dependencies and the necessary transition from known to new material. Suggest appropriate kinds of understanding and transfer, without prescribing general Section count, UI widgets, concrete Questions, scoring, gamification or narrative.
   4a. **Define the Lesson assessment contract.** Make a positive decision about Quiz necessity: `assessmentPlan.quizRequired: false` with `quizzes: []`, or `true` with one or more distinct Quiz requirements, each with a stable `key`, pedagogical `purpose`, target Skill UUIDs and a non-empty list of typed `requiredAssessmentMethods`. Use exact `AssessmentMethodKey` strings (e.g. `retrieval`, `interpretation`, `application`), not method UUIDs or UI Question types. An Assessment Method specifies the **cognitive operation to assess**, not how the learner inputs an answer. A required Quiz must be justified by its assessment purpose; never add one by default. You may require several distinct Quizzes. Do **not** choose actual questions, correct answers, distractors, scoring thresholds, retries, Quiz UI layout or Section implementation details; delegate those to the appropriate specialists.
5. **Check scope and independence.** One Lesson may target multiple Skills when they form a coherent learning objective; if it becomes an entire course, propose a split for editor approval rather than silently splitting, merging, adding or renaming Skills. No grade ceilings or instructional modes may be written back into the taxonomy.
6. **Honor cross-cutting constraints.** Specify localization-sensitive terms and examples, disability-aware alternatives the experience must enable, offline completeness and low-device pedagogical equivalence. Note factual uncertainty and sources. Do not invent runtime APIs, Note events or assessment guarantees.
7. **Escalate conflicts.** The Methodologist Persona's mandatory Skill-versus-Question and disciplinary ownership gates still apply. Report specific choices in the editor handoff and do not alter approved taxonomy identities or another specialist's approved section.
8. **Write only the standalone Methodologist Brief.** Create `methodology.md` for a new Lesson, or update the existing `methodology.md` / legacy `methodologist-brief.md` in place. Include the validated `assessmentPlan` in YAML frontmatter; do not write duplicate assessment policy in another config. Never insert Methodologist content into the Lesson config, Content, runtime assets, or another role's document. Do not generate duplicate Briefs.
9. **Audit and stop.** Validate approved taxonomy references, real relative links, unique slug, stable bucket placement, coherent scope, outcomes, prerequisites, sources, role separation and status. Confirm every required Assessment Method is a real `AssessmentMethodKey`, every Quiz targets only approved Lesson Skills, no duplicate keys, and `quizRequired` agrees with the number of requirements. Validate the YAML frontmatter against [lesson-methodology-frontmatter.schema.json](./lesson-methodology-frontmatter.schema.json); the schema does not replace taxonomy/source verification. Present the Brief for **explicit editor approval**; never run Create Lesson Content or implementation automatically.

### Approval and revisions

The new document is a **Draft Methodologist Brief**, not a draft of the _implemented Lesson_. `Methodologist status: Draft` means _pending editorial review_, not approved. Only an explicit editor decision can change this to `Approved`; a later revision affecting approved outcomes, prerequisite claims, content boundaries or Target Skills requires renewed Methodologist/editor review. Status of the whole Lesson's implementation is **not** inferred from Methodologist approval. Keep open questions visible; no automatic per-Lesson historical Review files (the Persona history policy covers Taxonomy and Curriculum only).

## METHODOLOGIST BRIEF TEMPLATE

The following is an **embedded authoring template**; replace all placeholders and remove inapplicable optional notes before delivery. Canonical editorial writing is in **English**, so set `documentLanguage: en` unless an editor explicitly authorizes another editorial source language. This is **not** a localization of learner-facing Lesson content. `supportedLanguages` is the planned Lesson locale tuple; actual `Lesson.parameters.languages` and localized content must match it when implemented. Lessons may include more locales than a Course using them, but must include all Course locales. Do not treat either editorial metadata field as proof that translations have been authored or published.

```md
---
documentLanguage: en
supportedLanguages: [en, uk] # replace with approved Lesson language plan
assessmentPlan:
  quizRequired: true # set false and quizzes: [] when no Quiz is warranted
  quizzes:
    - key: explain-concept
      purpose: 'Verify understanding of the intended concept.'
      targetSkills:
        - '00b48cb0-13c2-4531-84ac-1b8d44f11055' # illustrative; verify actual Skill IDs
      requiredAssessmentMethods: [interpretation, application]
      evidenceIntent: 'Explain and apply the concept in a meaningful case.'
---

# %LESSON_TITLE% — Methodologist Brief

Date: %YYYY-MM-DD%
Lesson slug: %UNIQUE_CAMEL_CASE_SLUG%
Methodologist status: Draft
Code: [Not implemented](#)
Program dependence: None

## Educational purpose

%What this Lesson is for and why the selected Skills form a coherent learning unit.%

## Target audience

%Learner profile, prior experience, literacy/language context and meaningful accessibility considerations. Do not assume a grade unless requested.%

## Prerequisites

- %Specific prior knowledge/competence or an explicitly acknowledged gap.%

## Target Skills

- [%EXACT_SKILL_SOURCE_FILENAME_WITH_EXTENSION%](%VERIFIED_RELATIVE_PATH_TO_EXISTING_SKILL_DATA_TS%)

## Expected learning outcomes

- %Observable and audience-appropriate outcome; specify meaningful learning depth and boundaries without inventing mastery scores.%

## Assessment rationale and boundaries

%Explain why a Quiz is or is not necessary, and—if required—why each distinct Quiz key and cognitive Assessment Method is appropriate. This prose explains the YAML assessmentPlan; do not duplicate or contradict its machine identities. Do not specify implementation-level Question types, responses, retries or mastery thresholds.%

## Essential subject matter

%Accurate concepts, terminology, relationships and subject-specific explanations necessary for the outcomes; use sufficient detail to prevent downstream improvisation.%

## Conceptual progression and dependencies

%What needs to be understood first, then next, and which prerequisites require attention. This is not a Section storyboard.%

## Quiz assessment intent and evidence

%Whether Quiz Sections are justified for this Lesson. If so, map exact AssessmentMethodKey values to approved Target Skills and observable outcomes; explain what distinct evidence each should elicit and why multiple methods are required where relevant. Leave Question types, concrete Questions and scoring to the Assessment Architect.%

## Misconceptions, examples and boundaries

%Common confusions, revealing examples/non-examples, simplifications and explicit exclusions.%

## Localization, accessibility and offline intent

%Learner-language needs, culturally variable assumptions, inclusive modes, complete offline learning and equivalent low-device access. Do not invent runtime capabilities.%

## Sources and factual verification

- %Reliable source and what it supports; identify unresolved/contested claims.%

## Curriculum / Program compatibility

%Optional verified compatibility requirements and deviations, or "Not specified". This does not assign ownership of this Lesson.%

## Open editorial decisions

- %Specific unresolved question, owner and consequence; use "None" only after checking.%

## Methodologist handoff

%Readiness summary, scope decisions, unresolved blockers, and what the Screenwriter may design after explicit approval.%
```

**Assessment metadata:** `assessmentPlan` is an approved pedagogical contract, not runtime `Quiz_Parameters`. The plan is required even for a Lesson without Quiz (`quizRequired: false`, `quizzes: []`). For one or more required Quizzes, validate distinct `key` values, verified `targetSkills`, and nonempty `requiredAssessmentMethods` from the 16 canonical `AssessmentMethodKey` values. Reuse these keys in the Screenwriter's `content.yaml` `assessmentPlanKey` fields and later Question `assessmentMethod` values; actual Question item validity is a separate specialist review. The template's example UUID is illustrative, not a proposed new Skill. An approved legacy Brief without this metadata needs an explicit Methodologist amendment before a new Screenwriter plan can assert a Quiz policy.

**Localization metadata:** `documentLanguage` is the language of this editorial Brief. `supportedLanguages` lists planned learner-facing Lesson locales, not completed translations or a guarantee of runtime availability. Never silently drop a Course language when proposing a Lesson for that Course. For an existing legacy Brief without frontmatter, preserve the existing format and do not migrate it solely to add these fields unless the editor authorizes revision.

**Metadata rules:** `Code` references the **Lesson implementation**, not a Skill Code link and not a directive to embed Methodologist prose in runtime configuration. Leave exactly `Code: [Not implemented](#)` unless a real Lesson implementation has been verified, in which case use its actual relative Markdown link and exact filename. Do not fabricate a runtime UUID, registry, approval date or implementation status. The Lesson slug is a file locator, not a verified runtime ID.

**Target Skills rules:** Write a simple Markdown list with **one direct source-file link per approved Skill**, formatted exactly as `- [completeFilename.data.ts](relative/path/to/completeFilename.data.ts)`. The **link label must equal the target file's full basename**, including `.data.ts`; do not add bold Skill headings, friendly names, `Canonical Skill source` labels, UUIDs, `index.ts` aggregators, `*.ids.ts` dictionaries, generated taxonomy Markdown, or placeholder `#` links. Link directly to the `*.data.ts` file defining that **Skill**, not a Group/Domain.

The **canonical Target Skills destination is `<PackageRoot>/data/skills/`**, the existing static authoring-data tree at the textbook application root, independent of `src/`. For a Brief in `content/math/data/lessons/2/3b836ba8-cafa-517e-a34c-d7f341614012/`, an **illustrative existing** Skill location `content/math/data/skills/arithmetic/addition/skills/addMeaning.data.ts` would be linked as:

```md
- [addMeaning.data.ts](../../../../data/skills/arithmetic/addition/skills/addMeaning.data.ts)
```

The intermediate folders `arithmetic/addition/skills/` are an **example only**; use the actual Skill source-file nesting, rather than imposing that illustrative hierarchy. Compute `../../../../data/skills/` from the actual UUID Lesson directory and append the verified Skill-relative path. **Do not point any new Brief to `src/data/skillsTaxonomy/`**. Check that the Markdown label equals the exact `.data.ts` basename and the path is normalized within the target textbook's `data/skills/` tree. Verify every linked source file exists before authoring a Brief. **If a textbook has not migrated, report the missing destinations as blockers**, not verified links; do not switch to `src/` or claim those source files exist. If the source filename/nesting is genuinely unknown, raise an explicit migration decision rather than fabricate it. Generated taxonomy Markdown remains a read-only discovery aid, not a Target Skills link destination.

## FILE PLACEMENT — UUID-ADDRESSED LESSONS

Each Lesson has a stable UUID. Its **folder is the UUID** in the bucket computed by `resolveEntityPath(id)` from `@svitlo/engine/utils` (see [entity UUID addressing](../../docs/architecture/entity-uuid-addressing.md)):

```text
<PackageRoot>/data/lessons/<last-hex-digit>/<uuid>/methodology.md
```

- On creation, mint the UUID once, use the shared Engine resolver to derive the path, and save a `lesson.identity.json` with `{ "id": "<uuid>", "slug": "<camelCaseSlug>" }` if typed `lesson.data.ts` does not exist yet.
- Keep the slug unique and meaningful within the textbook; it is **metadata**, not a folder name. Never regenerate the ID if title or slug changes.
- On revision, find the existing Lesson by UUID (or search the IDE for its slug), edit the Brief in the same ID directory, and retain its identity.
- Do not manage UUID buckets, count Lesson folders, compact, rebalance, or edit `group` fields. Bucket depth changes only through a coordinated migration.
- This workflow creates **only the Brief** and, when creating a new editorial-only Lesson folder, the minimal identity file. It never creates `content.md`, runtime Lesson configurations, assets or Scenes.

Lessons remain Program-neutral and may be reused in several Curricula.

## DELIVERABLES AND ACCEPTANCE

**Output exactly one authored/updated Methodologist Brief** (`methodology.md` for new Lessons, or the existing legacy `methodologist-brief.md`) in the selected Lesson's stable UUID directory, with explicit `Draft` status and a verified Lesson Code link or the specified placeholder. Do not write companion Lesson Briefs, Lesson Content documents, runtime configs, or duplicate methodical content. Leave existing specialist and implementation artifacts untouched.

The accompanying editor-facing handoff (chat/PR, not a second mandatory file) reports:

- The actual Brief path, Lesson slug, UUID bucket, and create/update operation.
- Target Skills listed as direct relative links targeting the canonical `data/skills/` tree and labeled with exact `.data.ts` filenames; report any unresolved source-file migration, plus learning outcomes, scope and prerequisite decisions.
- Optional Curriculum/Program compatibility checks, or that none was requested.
- Factual sources, open editorial questions, approval status, explicit Quiz necessity and the required Assessment Method keys for every required Quiz, and the handoff requirements for the Screenwriter.
- Verified Code link or `[Not implemented](#)`, and any generation or taxonomy blockers.

**Acceptance gates:** genuinely approved Skill definitions read; every Target Skill has a relative `*.data.ts` link into `data/skills/` with an exact source-filename label; every destination is verified, or its unresolved migration is reported as a blocker; no links back into `src/`; no invented Skills/IDs; audience and instructional intent supported; observable outcomes and prerequisites; explicit valid `assessmentPlan` (including no-Quiz decisions and multiple Quiz support), typed Assessment Method keys and verified target Skill IDs; substantive subject content and citations; no unauthorized instructional design, assessment, gamification, code or client serialization; one separate Methodologist Brief; canonical `data/skills/` targets checked against the filesystem; no existing Lesson directories relocated without authorization; and no approval claimed without an editor decision.

**Handoff:** Once explicitly approved, the separate Brief becomes the pedagogical source for [Create Lesson Content](./create-lesson-content.skill.md), which creates structured `content.yaml` in the **same existing Lesson directory**. The Screenwriter may not modify the Brief or introduce Program narrative. Never launch the next workflow automatically.
