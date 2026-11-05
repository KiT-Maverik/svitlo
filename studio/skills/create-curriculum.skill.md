# Create Curriculum Skill

**Mandatory first action:** Read [Methodologist Persona](../personas/methodist.persona.md) in full and adopt its professional responsibilities, judgment, and role boundaries **before** planning or generating content. Do not assume the persona is automatically loaded.

**Purpose:** Create or review a structured Curriculum for **any discipline, textbook, course, learning audience, or educational context**, using an editorial briefing and existing Skills Taxonomy. This Skill does not author detailed Lesson Learning Briefs, storyboards, assessments, or code.

## CROSS-CUTTING PRODUCT INTENT

Read the [Learning Experience Philosophy](../docs/architecture/learning-experience-philosophy.md), [Internationalization & Inclusive Access](../docs/architecture/internationalization-and-accessibility.md) and [Offline/Device Compatibility](../docs/architecture/offline-first-and-device-compatibility.md) when selecting outcomes and learning progressions. The Curriculum is a pedagogical plan, **not a pledge that all these runtime capabilities are complete**; it should preserve accessible, internationally applicable and offline-capable learning intent. The [Lesson Notes mechanism](../docs/architecture/lesson-notes.md) is planned and belongs to detailed Lesson authoring, not as fabricated Curriculum runtime fields.

## ENTITY DEFINITIONS — REQUIRED READING

Before inspecting the taxonomy, read [SkillDomain](../docs/entities/skill-domain.md), [SkillGroup](../docs/entities/skill-group.md), and [Skill](../docs/entities/skill.md). These documents own the semantics and boundaries of the referenced entities; this Curriculum Skill owns their pedagogical sequencing and use.

## NON-NEGOTIABLE START CONDITIONS

**Do not begin drafting a Curriculum until both conditions are satisfied:**

1. **Editorial briefing received.** Identify the target package root, textbook/course/program and requested scope, audience, entry level, outcomes, and constraints.
2. **Taxonomy available.** Read the approved `<PackageRoot>/docs/skills/taxonomy.md`, including the substantive description and hierarchy for every relevant SkillDomain, SkillGroup, and Skill. It is the sole editorial authority; implementation Code and UUIDs are not substitutes for the taxonomy.

If a required input is absent or taxonomy files cannot be inspected, **stop Curriculum generation**, describe what is missing, and request the smallest necessary briefing or access. Do not infer the audience, invent a textbook scope, or manufacture Skills to keep writing. Existing Curriculum or Lesson files can inform the briefing but cannot substitute for the Skills Taxonomy. Before revising an existing Curriculum, inspect its existing dated Review (if any) in the history path defined below; it is context, not a substitute for the current approved Curriculum and taxonomy.

### Editorial briefing — required fields

- **Package root:** root of the **specific standalone textbook application** being authored (for example, `<MonorepoRoot>/content/<textbook>/`). The app directory is the package root; the monorepo root, its root-level `backend/`, and shared libraries are not. Use the actual app path from the repository/briefing rather than assuming a fixed monorepo layout.
- **Learning resource:** title or working title of the textbook/course/learning program, discipline or interdisciplinary theme, and requested scope (whole resource, level, module, or lesson).
- **Audience:** learner category and approximate age or professional stage when relevant; prior knowledge, literacy and language proficiency; learning context and meaningful accessibility needs. School grades are optional, not universal.
- **Intent:** desired educational outcomes, depth, boundaries, mandatory source materials, and whether alignment with a specified local standard or accreditation is required.
- **Taxonomy:** consult [Skill Taxonomy Workflow](./skill-taxonomy-workflow/README.md). For _unpromoted_ Skills read approved staging `<PackageRoot>/docs/skills/taxonomy.md`; for _promoted_ Skills read verified canonical Code definitions (localized `name` and `description`). A missing staging file is valid only after complete promotion. Do not guess scope or derive semantics from names alone.

Clarify optional constraints when they matter: language(s) of output, locale/cultural setting, delivery conditions, available time, modality, assessment goals, and existing resources. Do not force a country, age range, grade, timetable, or instructional duration onto a brief that does not require one. Canonical editorial Curriculum prose and structural identifiers remain in English. Target learner-language requirements are fulfilled through separate localization artifacts, not by changing the canonical Curriculum document.

## SOURCE OF TRUTH: SKILLS TAXONOMY

- **Catalog inventory:** Code for fully promoted entries, approved Markdown staging for outstanding entries, as defined by [Create Skills Taxonomy Skill](./skill-taxonomy-workflow/create-skills-taxonomy.skill.md). Read relevant Domain, Group and Skill names/descriptions from the correct authoritative source for each entry; there are no separate Skill Definition files.
- For unpromoted entries, the staging Markdown preserves approved meaning and links; Code is authoritative only after reviewed promotion. Missing Code does not block Curriculum planning. Preserve traceability without creating duplicate Skill definitions.
- **Check every referenced file exists** and refers to the intended entity. Resolve Markdown links relative to the _generated Curriculum or brief file_, **never** relative to this instruction file.
- Taxonomy **editorial approval** is distinct from runtime implementation and learner mastery. If approval or the meaning of an in-scope entity is unresolved, report a blocker; do not rely on a nonexistent per-entity Draft/Approved status.
- Prefer a **specific Skill** as a learning target. Link to a SkillGroup or SkillDomain only for genuinely broad context or prerequisites, and make the intended breadth explicit.
- The taxonomy is a catalog, **not** the curriculum. Derive prerequisites and progression from instructional reasoning and the audience's needs, not from folder order.
- Reuse relevant existing Skills. If no adequate Skill exists, identify a **taxonomy gap for editorial review**; do not invent a definition, a link, or an assertion of completeness. Do not silently modify the taxonomy.
- The same Skill may be taught across multiple lessons and a lesson may address several Skills. Note partial coverage where the full Skill is broader than the lesson.

## OPERATING PROTOCOL

### Stage 1 — Curriculum design

1. **Read the brief and authoritative catalog.** Inspect promoted entities in Code and unpromoted ones in `<PackageRoot>/docs/skills/taxonomy.md`, read the relevant descriptions, and confirm audience, scope, outcomes, prior learning, and subject references.
2. **Define observable outcomes.** State what learners should be able to do, distinguish essential competencies from optional enrichment, and adjust depth to the audience. Do not confuse topic coverage with demonstrated capability.
3. **Build the learning progression.** Sequence modules and lessons according to conceptual dependencies, cognitive load, worked examples, transfer, retrieval, and increasing independence. Do not mirror the taxonomy tree mechanically; do not force one Skill per lesson.
4. **Map outcomes to the canonical Skills.** Cite existing files with working relative Markdown links. Specify meaningful prerequisites, including plain-language knowledge or existing Skill/SkillGroup/SkillDomain references. Note missing coverage separately.
5. **Author the Curriculum with the embedded template below.** Its structure is binding for Curriculum documents; replace placeholders with context-specific content. Create no redundant metadata, copied IDs, fixed number of modules, or curriculum details unsupported by the brief.
6. **Audit before handoff.** Verify subject accuracy, progression, alignment with intended outcomes, links and names, prerequisite feasibility, content boundaries, locale-specific assumptions, and template completeness. Flag unresolved issues explicitly.
7. **Stop for review.** Deliver the Curriculum and an economical summary of decisions and open issues. Do **not** automatically proceed to detailed lessons, scripts, questions, or implementation. If there is a qualifying, explicitly agreed historical decision, append it to the existing Review rather than generating one per Module, Lesson, revision or editor meeting.

**Handoff:** After editorial approval, a different task-specific Skill may produce detailed Lesson Learning Briefs. That work is **outside this Skill** and must not start automatically.

## CURRICULUM REVIEW — OPTIONAL DATED HISTORY, NOT A SECOND CURRICULUM

Apply the **mandatory review-history policy** in [Methodologist Persona](../personas/methodist.persona.md), but **only to the Curriculum being authored/reviewed**. Use this **stable path per actual Curriculum**, deriving `<curriculumSlug>` from its canonical document's actual directory:

```text
<PackageRoot>/docs/history/curriculums/<curriculumSlug>/curriculum-review.md
```

Title: **Curriculum Review**. The canonical Curriculum remains `<PackageRoot>/docs/curriculum/<curriculumSlug>/<curriculumSlug>.curriculum.md`. Its learning plan, metadata, links and educational decisions must not be replaced by a history file.

**Creation versus reuse (mandatory):**

- **File exists for this Curriculum:** reuse it. Append **only materially new editor-approved decisions** or actual changes to earlier agreements as dated entries; preserve the original review date. Never create separate files for Grades, Modules, individual Lessons, iterations, PRs, review sessions or every question discussed. A different genuinely independent Curriculum may have its own stable record.
- **File does not exist:** **do not generate a Review** for the initial Curriculum, routine feedback, a small revision or the mere presence of open editorial questions. A new history is eligible only when (a) the Curriculum has a **substantially older original date**, is part of an already **implemented textbook or learning program**, and is now undergoing a significant post-implementation redesign; (b) the editor has **explicitly declared a new generation** of the textbook/Curriculum; or (c) the editor has **explicitly requested that this particular review be preserved as dated history**. Inspect the existing Curriculum, real implementation and editorial brief; **age or implementation alone is never enough**.
- **New generation, prior Review present:** append a dated generation section **to the same Curriculum Review** by default. If the editor explicitly requires separate histories, use the version-scoped location described by the Persona and a stable approved generation key. Never silently create `curriculum-review-v2.md`, `curriculum-review-final.md`, date-suffixed duplicates or per-Lesson Review files.
- **No qualifying decision/trigger:** update the canonical Curriculum if authorized; otherwise present alternatives for review. Leave `docs/history/` untouched, including when no historical document exists. Do not invent a milestone or create a history file solely because the methodologist is running this Skill.

**What to record:** the **Original review date**, dates of subsequent **actual decisions** in `YYYY-MM-DD`, the Curriculum identifier and audience/scope, specific alternative learning sequences or content boundaries considered, what the editor approved/rejected, why, implications for modules/lesson planning, and later superseding decisions. Cite the canonical Curriculum and relevant evidence. Record concrete agreements, **not** speculative course plans, pending-approval proposals, long TODO lists, teaching scripts, duplicated learning-plan content or a log of agent work.

**Review handoff:** Explicitly state whether you updated an existing historical file, created a new one **under a verified trigger**, or appropriately left history unchanged. The only normally required output of this Skill remains its **one canonical Curriculum document**.

## QUALITY AND ACCEPTANCE GATES

A Curriculum is ready for editorial review only when:

- The briefing and approved authoritative Code and/or staging `<PackageRoot>/docs/skills/taxonomy.md` (including relevant entity descriptions) are actually read.
- The plan covers requested outcomes without invented or unverifiable competencies.
- Every Skill reference points to a verified authoritative Skill definition (Code for promoted, staging Markdown for unpromoted) and matches an existing named entry. The staging taxonomy's `Code` link may remain `[Not implemented](#)`; a Curriculum need not duplicate it.
- The order is pedagogically defensible, and required prior learning is available or explicitly identified as a gap.
- Outcomes are observable, specific, appropriate for the audience, and consistent across the Curriculum, modules, and lessons.
- Subject claims, examples, and calculations are accurate; uncertain or contested material is identified for review.
- Locale, linguistic, cultural, accessibility, and standards assumptions are explicit rather than silently universalized.
- Missing information, taxonomy gaps, and unresolved educational choices are reported **separately** instead of obscured by plausible prose.
- Any dated Curriculum Review is in its **one stable, artifact-specific history location**, reflects decisions actually approved by the editor, preserves dates and supersession, and was created only after satisfying the explicit creation gate. No per-item or per-meeting Review files.
- The Curriculum remains a pedagogical specification, not an implementation plan.

Use compact, structured Markdown. English is the mandatory language of the canonical Curriculum, independent of the learner-facing locale. Keep file references clickable in final artifacts and preserve the embedded template's section structure.

## CURRICULUM TEMPLATE

Use the following template **as written**, replacing placeholders with content appropriate to the brief. Its Markdown file paths are relative to the **generated Curriculum file**, not this Skill. This embedded template is canonical; no separate `curriculum-template.md` is required.

**Prerequisites authoring guidance (not part of generated Curriculum):**
Allowed records:

- Plain text: %TEXT_PREREQUISITE%
- Skill: **%SKILL_NAME%** — [Skills Taxonomy](%VERIFIED_RELATIVE_ENTITY_SOURCE_PATH%)
- SkillGroup: **%SKILL_GROUP_NAME%** — [Skills Taxonomy](%VERIFIED_RELATIVE_ENTITY_SOURCE_PATH%)
- SkillDomain: **%SKILL_DOMAIN_NAME%** — [Skills Taxonomy](%VERIFIED_RELATIVE_ENTITY_SOURCE_PATH%)

Choose only applicable types. All names must match the approved authoritative Code or staging source exactly. Replace each `%VERIFIED_RELATIVE_ENTITY_SOURCE_PATH%` with the exact relative URL to that Skill/Group/Domain `*.data.ts` file if promoted, otherwise the existing staging taxonomy file (with verified anchor if useful). Never leave the placeholder in output. Do not invent per-entity Definition paths, UUIDs or redundant Code links. A Group/Domain prerequisite indicates general familiarity, not mastery of every child.

**Never include this authoring guidance or template notes in the produced Curriculum document.**

```md
# %NAME%

Date: %CURRENT_DATE%

%Program description in a form of a detailed reasonably long text.%

Skills Taxonomy: [Skills Taxonomy](%VERIFIED_RELATIVE_ENTITY_SOURCE_PATH%)

## TARGET AUDIENCE

Ages: %AGE_RANGE%
%Audience description in a form of a detailed reasonably long text.%

## PREREQUISITES

- %ITEM_1%
- ...

## EXPECTED RESULTS

- %ITEM_1%
- ...

## SCOPE & EDITORIAL NOTES

Scope: %IN_SCOPE%
Exclusions: %OUT_OF_SCOPE%
Progression: %SEQUENCING_CONSTRAINTS%
Dependencies: %UNRESOLVED_DEPENDENCIES_OR_GAPS%

## LEARNING PLAN

### %MODULE_INDEX_NUMBER% - %MODULE_NAME%

Definition: %Module Markdown document link. Default [Not implemented](#). Replace only with a verified file link.%
Code: %Module runtime code link. Default [Not implemented](#). Replace only with a verified file link.%
Goal: %MODULE_GOAL%
%Module description in a form of a detailed reasonably long text.%

#### %LESSON_INDEX_NUMBER% - %LESSON_NAME%

Definition: %Lesson Markdown document/learning brief link. Default [Not implemented](#). Replace only with a verified file link.%
Code: %Lesson runtime code link. Default [Not implemented](#). Replace only with a verified file link.%
Goal: %LESSON_GOAL%
%Lesson description in a form of a detailed reasonably long text.%
Target skills:

- **%SKILL_NAME%** — [Skills Taxonomy](%VERIFIED_RELATIVE_ENTITY_SOURCE_PATH%)
- ...
```

## RESULT

Create or update **one canonical Curriculum document** at (an optional historical Review has its own strictly gated path above):

```text
<PackageRoot>/
└── docs/
    └── curriculum/
        └── %CURRICULUM_SLUG in English kebab-case%/
            └── %CURRICULUM_SLUG in English kebab-case%.curriculum.md
```

- Use `<PackageRoot>` from the briefing: the **target textbook/package root**, never the monorepo root. Keep `docs/curriculum/` literal and derive a semantic **English kebab-case** Curriculum slug once for both directory and filename (e.g. `grade-1/grade-1.curriculum.md`).
- Fill the file using the embedded **CURRICULUM TEMPLATE**. Review existing content before updating it; do not create a substitute `README.md` or automatically generate module, lesson, or assessment files.
- Verify the output path, replace all template placeholders, and resolve links relative to the **resulting Curriculum file**. From `<PackageRoot>/docs/curriculum/<name>/`, the legacy staging taxonomy link is `../../skills/taxonomy.md`; it must not be invented when the staging file was legitimately removed. Code-backed references need their actual verified relative paths. For absent **module/lesson** Definitions or Code, use `[Not implemented](#)` independently; these artifacts have their own lifecycle. **Skills** do not have separate Definition files: verify names and substantive descriptions in their authoritative Code or staging source. Skill Code may be absent.
- Unless the editor has requested a qualifying history, **do not create a second Curriculum artifact or a Review**. If a matching Review exists and a new editorial agreement was actually approved, append it with its actual date; preserve the original date and record if the same file was reused in the handoff.

## CANONICAL LANGUAGE, FILE OWNERSHIP AND LINK LABELS — MANDATORY

- All editorial Curriculum documents, metadata, headings, module and lesson titles, Markdown link labels, directory names, file names, and URL/path slugs **MUST be written in English**. Use semantic English kebab-case slugs, not Ukrainian or another language transliterated into Latin letters. A requested learner-facing localization belongs in separate localization content; it does not change canonical repository paths or editorial document language.
- Keep each grade's canonical Curriculum document **inside that grade's own directory** (for example `docs/curriculum/grade-1/grade-1.curriculum.md`), not as a sibling of `grade-1/`. The grade directory's `README.md`, if retained, is a concise index to the canonical Curriculum, modules, and lessons, never a second Curriculum. Module and lesson `README.md` files must have explicitly differentiated index/brief responsibilities; never duplicate the grade-level Curriculum.
- When referring to a target Skill in a Markdown link, the **visible label must be the exact canonical Skill heading in `docs/skills/taxonomy.md`**, not an invented lesson-specific description or a label inferred from the TypeScript filename. The Code filename is an implementation detail, not the Skill's pedagogical name. For example, a Skill named `Number Bonds to 10` must not be relabeled `Addition and Subtraction Bonds of Ten` merely because the lesson teaches addition.
- Resolve Skill links against the canonical taxonomy's **actual heading and anchor**, not directly against `*.data.ts`, unless the link is explicitly labeled as implementation Code. Maintain the distinction between pedagogical reference and implementation location.
- For any rename or relocation, update **all incoming and outgoing relative Markdown links**, references in templates, indexes, history documents, and code where relevant. Verify every local link resolves, and scan for Cyrillic characters in editorial content and transliterated Ukrainian names in canonical paths. Stop review approval on unresolved mismatches or broken links.
- Apply the language and ownership rules when **reviewing existing documents**, not only when generating new ones. Do not accept a partially translated Curriculum as compliant.
