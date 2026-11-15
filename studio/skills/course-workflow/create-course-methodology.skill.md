# Create Course Methodology

**Mandatory first action:** Read and apply the [Methodologist Persona](../../personas/methodist.persona.md) in full. Read the [Course entity](../../docs/entities/course.md), [Skill](../../docs/entities/skill.md), [SkillGroup](../../docs/entities/skill-group.md), [SkillDomain](../../docs/entities/skill-domain.md), and [UUID-based entity addressing](../../docs/architecture/entity-uuid-addressing.md). The persona defines professional judgment; this skill defines the specific task.

## Purpose and scope

Create or revise the **permanent methodological specification for exactly one Course** in a textbook content package. This document describes why the Course exists, whom it serves, what competencies it targets, its pedagogical approach, prerequisites, and which educational standards it demonstrably aligns with.

**Do not create a Table of Contents, Module/Chapter plan, Lesson brief, story, scenario, assessment questions, UX, code, or a Course runtime data file.** Course Methodology is an editorial artifact for future specialists and maintainers, not a generated frontend resource. An existing course may use this skill to document or revise its rationale.

## Inputs

Establish the following from the editorial request and repository; ask only for materially missing information rather than guessing:

- **Textbook/package:** exact existing content/<textbook> package and subject area. Read its AGENTS.md and relevant rules. Do not default to Playground or create a textbook unrequested.
- **Course identity:** existing immutable Course UUID, or authorization to assign a new UUID once for a new Course. Confirm the proposed title and intent.
- **Audience:** learner profile, entry competence, age/grade only when applicable, language/literacy, learning context, accessibility considerations.
- **Course purpose and form:** foundational, advanced, specialization, refresher, mini-course, or a context-specific description; desired outcomes, boundaries, depth and approximate scale.
- **Curriculum/standards compatibility:** named educational frameworks, qualification standards, jurisdiction, version and extent of alignment when requested. An unspecified standard is not automatically applicable.
- **Document language:** `documentLanguage` names the **Methodology's editorial language**. Independently, `supportedLanguages` is an explicit **non-empty, duplicate-free, ordered** list of planned Course locales. Validate these against `DEFAULT_SUPPORTED_LANGUAGES`; they will define the Course's `parameters.languages` and every attached Lesson's minimum language coverage. They do **not** certify that any translations are finished. The Methodology may use an editorial language not in this list; the separate TOC must choose a supported source language for future Course title localization.
- **Narrative/scenario choice:** scenarioMode is **none** or **story** only when the editor has made that decision; omit it and flag an open decision otherwise. A story is never presumed to be necessary. If the learning goals suggest a guided interactive experience, record its pedagogical rationale and accessibility constraints without prescribing a Quest Section, Stage/Task script or UI behavior. Those are Educational Screenwriter choices after the Course plan is approved.
- **Assessment boundary:** decide what observable evidence of learning the Course should support; do not equate completion of an interactive mission with demonstrated Skill mastery. Explicit scored Quiz requirements for each standalone Lesson are determined in that Lesson's Methodologist `assessmentPlan`, then validated by the Assessment Architect; Episode narrative activities never silently acquire a Quiz requirement.
- **Constraints and available evidence:** instructional time if specified, teaching modality, required references, domain-specific safety, content exclusions, technology/offline constraints where meaningful.
- **Skill taxonomy:** verify relevant promoted Skills, SkillGroups and SkillDomains in textbook data/skills and their methodological descriptions. If available, consult generated docs/generated/skills/taxonomy.en.md as an index (not a replacement for the canonical sources); consult approved staging taxonomy only for entries not yet promoted.

A complete 150–350-skill inventory is **not** a prerequisite for this methodology document. Analyze relevant domains, group summaries, representative skills and known entry requirements; leave exhaustive selection, sequencing, dependency graph and skill-to-lesson mapping to other skills. Never claim full skill coverage without checking it.

## Prerequisites contract

Represent applicable entry requirements in machine-readable Frontmatter, using separate collections:

- **skills:** verified Skill UUIDs.
- **skillGroups:** verified SkillGroup UUIDs. Specify in prose whether prerequisite means familiarity with a group or mastery of particular skills; do not silently require every group member.
- **skillDomains:** verified SkillDomain UUIDs; describe the intended breadth.
- **courses:** verified Course UUIDs; do not reference a planned Course as an implemented prerequisite without stating its status.
- **text:** supplementary human-language entry knowledge/conditions that do not map cleanly to a registered entity.

Empty collections mean no requirements of that type have been identified; missing/unverified requirements are explicitly flagged as open issues. Never invent a canonical taxonomy ID. A prerequisite is a requirement for **starting this Course**, not an ordered target skill or an intra-course dependency.

## Procedure

1. Read the Methodologist Persona, textbook guidance, actual Course contract, existing Course Methodology (if revising), pertinent references, and necessary canonical skill sources.
2. Confirm learner profile, scope, measurable intended outcomes, course type/depth, entry conditions and evidence constraints. Distinguish verified facts from editorial assumptions.
3. Analyze appropriate pedagogical approaches and likely misconceptions. Specify **what and why**, conceptual depth and principles for teaching/assessing, not UI controls, Section sequences, scene mechanics or authored lessons.
4. Document standards compatibility with **specific versions, sources and supported extent** (full, partial, or intended/unverified). Do not assert certification or formal compliance on the basis of similarity alone; mark unknown alignments for review.
5. Identify any taxonomy gaps that impede a coherent course. Record **proposals** with rationale and tentative labels, never forge Skill IDs or edit approved taxonomy automatically. Follow persona escalation on Skill-versus-Question classification.
6. Create/update the single Methodology Markdown file using the stable location below. Keep a compact YAML Frontmatter for parseable metadata and substantive Markdown for durable reasoning. Preserve approved context and unrelated files when revising.
7. Check UUID/path, source references, the editorial `documentLanguage`, valid unique non-empty `supportedLanguages`, prerequisites, standards, open decisions and clear role boundaries. For an existing authored Course, compare the planned list with actual `parameters.languages` and report discrepancies rather than silently rewriting either source. Finish with a review handoff; do not invoke another course-workflow skill automatically.

## Output path and identity

One file only, within the **selected existing textbook package**:

```text
content/<textbook>/data/courses/<bucket>/<course-uuid>/methodology.md
```

Obtain the relative bucket path with **resolveEntityPath(courseId)** from @svitlo/engine/utils. The bucket is the last hexadecimal character of the normalized UUID; never allocate buckets by count, derive an ID from a slug or re-mint an existing Course ID. On an existing Course, locate and reuse its ID and Methodology document, updating in place. Create the missing courses/bucket/UUID directories for a new Course; do **not** relocate existing flat data/courses/*.data.ts implementations as a side effect. Do not create a sample Course merely to demonstrate this skill.

The methodology.md document stays alongside the Course throughout and after implementation; it is not part of the Course runtime payload.

## Document template

Replace every example/placeholder with verified case-specific information. Omit an undecided optional scenarioMode rather than inventing its value. The YAML is **editorial metadata**, not a claim that runtime serializers already consume it; localizable text in Course TypeScript must follow its own ContentBlock contracts.

```yaml
---
schemaVersion: 1
kind: course-methodology
status: draft
courseId: <verified-or-new-uuid>
documentLanguage: uk
supportedLanguages: [uk, en]
courseType: <foundational-or-case-specific-description>
scenarioMode: none
standards:
  - name: <standard-name>
    version: <version-or-unspecified>
    jurisdiction: <applicable-jurisdiction>
    alignment: <full-or-partial-or-intended>
    source: <verified-reference>
prerequisites:
  skills: []
  skillGroups: []
  skillDomains: []
  courses: []
  text: null
skillGapProposals: []
---

# Course Methodology: <course-title>

## Course rationale and purpose
<Why this Course is needed; scope and exclusions.>

## Target audience and entry profile
<Developmental/professional stage, prior learning, context and accessibility needs.>

## Intended learning outcomes and depth
<Observable outcomes, expected application and boundaries.>

## Pedagogical principles
<Evidence-informed teaching, conceptual progression principles, differentiation and feedback philosophy, without scripting sections/UX.>

## Standards compatibility and evidence
<For each standard: version, covered areas, known gaps and sources.>

## Prerequisite rationale
<Why each referenced prerequisite is necessary; clarify group/domain breadth and free-text conditions.>

## Evaluation principles
<What counts as useful evidence of learning; avoid prescribing concrete Questions or runtime scoring.>

## Localization and inclusion considerations
<Language, cultural, accessibility and offline pedagogical requirements without inventing runtime features.>

## Taxonomy gaps and unresolved decisions
<Explain skillGapProposals, unknown constraints and who must decide.>

## Sources and methodological justification
<Specific reliable references and rationale for significant decisions.>
```

Use only standards records that are actually applicable; use an empty standards array if none are specified, and explicitly document any unknown alignment. Put only approved or independently verified UUID references in prerequisites; pending proposals stay in skillGapProposals with no fake canonical ID. Mark the whole document **draft** until explicitly approved.

## Acceptance criteria

- Exactly one methodology.md under the right textbook data/courses/<bucket>/<uuid>, sharing the existing Course ID when applicable.
- Machine-readable courseId, editorial documentLanguage, non-empty duplicate-free supportedLanguages verified against the real language roster, scenarioMode (when determined), standards and all five prerequisite kinds.
- Audience, purpose, goals, depth, pedagogy, evaluation intent, exclusions, accessibility/localization and evidence explained with specificity.
- References verified and gaps proposed openly; no invented taxonomy identifiers, compliance claims or downstream artifacts.
- Useful as durable documentation after the Course is built; no requirement for narrative, TOC, implemented Lessons or runtime code.
