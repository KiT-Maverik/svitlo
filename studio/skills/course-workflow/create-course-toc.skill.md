# Create Course Table of Contents (TOC)

**Mandatory first action:** Read [Methodologist Persona](../../personas/methodist.persona.md) in full. Then read the [Course entity](../../docs/entities/course.md), [Skill](../../docs/entities/skill.md), [SkillGroup](../../docs/entities/skill-group.md), [SkillDomain](../../docs/entities/skill-domain.md), [UUID addressing](../../docs/architecture/entity-uuid-addressing.md), and [Skill Taxonomy Workflow](../skill-taxonomy-workflow/README.md). This skill is a **course-level pedagogical planning task**, not Lesson authoring or runtime Course assembly.

## Purpose

Derive an **ordered, machine-readable, skill-based Course Table of Contents** from an **existing Course methodology.md** and the verified textbook Skill taxonomy.

It answers: _Which competencies should learners acquire, in what sequence and in which appropriate structural groupings?_ It does **not** locate existing Lessons, create Lesson definitions, prescribe Lesson Sections, insert Episodes, or invent a story or learning-experience storyboard.

**Input prerequisite:** the Methodology document produced by [Create Course Methodology](./create-course-methodology.skill.md) must already exist for the exact Course ID. It may be a draft, but material unresolved methodological decisions must be reported; do not silently override them. This skill does not automatically run the methodology skill.

**Output:** exactly one `toc.yaml` alongside that `methodology.md`, at:

```text
content/<textbook>/data/courses/<bucket>/<course-uuid>/toc.yaml
```

Resolve `<bucket>/<course-uuid>` using the repository `resolveEntityPath(courseId)` utility; reuse the Methodology's immutable Course UUID, rather than deriving it from a title. Update an existing `toc.yaml` in place; do not create alternate drafts or relocate existing flat Course `*.data.ts` files.

## Required inputs and authoritative sources

1. **Course Methodology:** read the entire `methodology.md`, including YAML Frontmatter and rationale. Confirm `courseId`, editorial `documentLanguage`, non-empty `supportedLanguages`, subject/textbook, target audience, depth, outcomes, standards, prerequisites, scope exclusions, available time and relevant open questions. Do not change the Course's entry prerequisites or planned languages while producing its TOC; if authored Course Data already exists, compare its `parameters.languages` and report contradictions.
2. **Actual taxonomy:** examine the relevant `content/<textbook>/data/skills/` hierarchy, the Skills' `description.methodological`, Groups, Domains and their actual canonical IDs. Do not infer competencies from a skill's display name alone, folder order or generic examples.
3. **Generated English full taxonomy:** inspect `content/<textbook>/docs/generated/skills/taxonomy.en.md` if fresh. Its canonical generation command, from the monorepo root, is:

   ```sh
   node scripts/generate-skills-taxonomy.mjs --package content/<textbook> --locale en
   ```

   For a **no-write** preview, use `--stdout`; `--check` verifies an existing generated file without rewriting it. The generator is `scripts/generate-skills-taxonomy.mjs`, documented in [Skill Taxonomy Workflow](../skill-taxonomy-workflow/README.md), and may be run in a GitHub-managed checkout. Do **not** assert a GitHub Actions workflow creates this file unless an actual workflow has been verified. The derived Markdown carries localized English names and canonical English methodological descriptions, and links to source files. It is a read-only **view**, not a new authority and does **not** contain reliable machine-readable Skill UUIDs on its own.

4. **Staging where applicable:** approved `docs/skills/taxonomy.md` may contain unpromoted skills. Preserve them as documented gaps/candidates when they lack a verified canonical UUID; never manufacture identifiers or treat draft taxonomy as approved.
5. **Other references only where needed:** curriculum standard source material, validated prerequisites, and previously implemented Course structure if revising an existing plan. An implemented Lesson registry is **not** an input prerequisite.

If the Methodology file is absent, the generated taxonomy fails to generate or the relevant taxonomy cannot be verified, **stop and report the precise blocker**. Never produce a plausible but ungrounded list of Skills.

## Plan the progression

1. Extract the specific intended learning outcomes, depth and scope from Methodology. Distinguish skills to be **taught by this Course** from prerequisites learners are expected to possess _on entry_. Do not mechanically include every Skill in the catalog or omit necessary preparatory instruction merely because it belongs to another Domain.
2. Read the entire relevant taxonomy for coverage, organized **by Domain and Group in bounded batches** (often 150–350 skills). Maintain a coverage checklist across batches so no relevant target is silently skipped. Use the generated Markdown for semantic discovery; open and verify only selected `*.data.ts` files to resolve exact Skill IDs and source paths. Reuse prior verified findings across batches.
3. Choose actual Skill IDs for the scope. Identify missing competencies and questionable splits/merges as **open taxonomy proposals**, not fake Skill IDs. Apply the Methodologist Persona's mandatory editorial escalation before changing taxonomy ownership or identity.
4. Determine a pedagogically sound **learning sequence** using prerequisite knowledge, conceptual dependencies, learner readiness, cognitive load, gradual complexity, reinforcement, and intended depth. **Dependency relationships and presentation order are distinct**: do not assume taxonomy tree order is instructional order. Identify unmet entry requirements, dependency cycles and skills appearing before their necessary foundation.
5. Group the sequence only when it aids comprehension: modules for major parts, chapters for meaningful subdivisions, **planned lesson slots** for coherent target outcomes. A small Course may contain only top-level lesson slots. A slot targets **one or several actual Skills**; one Skill may legitimately recur across several slots for introductory teaching, practice or deeper treatment. Do not force one Skill per slot or one slot per Skill.
6. Write the ordered tree into `toc.yaml` using the exact format and [schema](./course-toc.schema.json) below. Array position is the learning order — do not add a redundant `order` property. Keep a stable editorial `key` per node and a human-readable `title`; for lesson slots state an observable `objective` and, where useful, `depth` and `sequenceReason`.
7. Audit the entire Course, not just each local batch: coverage against Methodology outcomes, duplication vs intentional spiral/reinforcement, cross-module dependencies, required depth, entry prerequisites, standards-related gaps, valid taxonomy references and structural nesting. List unresolved issues explicitly. Ask for editor approval rather than claiming completion when essential gaps remain.

## Structural rules

The editorial plan mirrors **only the grouping options** of actual authored Course contracts. It is **not** the runtime `Course_Toc`: the latter resolves real Lesson IDs, titles and Episodes, whereas planned lesson slots here represent **target skills before Lessons necessarily exist**.

| Parent                 | Permitted child types              |
| ---------------------- | ---------------------------------- |
| Course (`content`)     | `module`, `chapter`, `lesson`      |
| `module` (`children`)  | `chapter`, `lesson`                |
| `chapter` (`children`) | `lesson`                           |
| `lesson`               | None; leaf with non-empty `skills` |

Modules do not contain other Modules; Chapters do not contain other Chapters; Lessons have no `children`. No artificial module/chapter wrappers; no forced minimum number of levels. Episodes can be added **later by a different skill**, at Course/Module/Chapter level or by Course-owned Lesson section/event integration. This skill must **never** insert Episode nodes, scenario Sections, dialogue or story requirements, even if the Course eventually uses a story.

Each planned lesson has a stable `key` for matching and later conversion, **not** an assigned runtime Lesson UUID. The `skills` field is a non-empty list of objects:

- `id` — the real, verified canonical **Skill UUID**, which is the **machine identity**. A folder path or a name is not the stable key.
- `name` — exact current English Skill name from the canonical source, provided for review.
- `source` — verified repository-root-relative `content/<textbook>/data/skills/.../*.data.ts` location for traceability. Useful for the reviewer, but never the authoritative identity; if a Skill file moves, update this reference.

An optional `lessonId` and `lessonSelectionNote` can be set later by [Match Course TOC Lessons](./match-course-toc-lessons.skill.md), but must not be invented during initial TOC design. No per-slot implementation status is needed.

Repeated Skill IDs in **different** lesson slots are valid when educationally intentional; duplicates **within the same slot** are not. Groups/Domains are for taxonomy navigation, **not** substitutes for concrete Skill targets in lesson leaves. An unimplemented or unavailable Lesson does not prevent including the Skill.

## Document language and supported languages

Record both fields separately in the **root** of `toc.yaml`:

- `documentLanguage` is the source language used in the _editable TOC_ for ordinary titles, objectives and other descriptive text. It tells later Course authoring tools **which locale field receives those values**. It does **not** imply a Course already has other translations.
- `supportedLanguages` is the non-empty, unique ordered list of Course locales, copied from the Methodology and checked against `DEFAULT_SUPPORTED_LANGUAGES`. It must match eventual `Course.parameters.languages`; this is the minimum set required of every Course Lesson. These are _planned_ languages, not proof of completed translations.

If the Methodology `documentLanguage` is in `supportedLanguages`, use it for the TOC by default. If the Methodology is in a different editorial language, **explicitly author or translate** the TOC in a supported locale; its own `documentLanguage` may differ. Do not project a TOC into Course-localized fields unless the chosen source language is in `supportedLanguages`; otherwise record the blocker instead of guessing translations.

A plain scalar `title: "Лічба"` is **translatable source-locale text**. It must not be interpreted as an intentionally non-localized TypeScript string. For truly language-independent content, mark the field explicitly:

```yaml
title:
  value: 'H₂O'
  invariant: true
```

Use this only for identical-in-all-locales values, never to bypass translations. In current Course contracts `Locale_Options<SupportedLanguages>` is a union of a **complete** locale dictionary and an **intentional invariant string**. A future converter must place source text into `documentLanguage`, require real translations for remaining supported locales before publication, and turn `invariant: true` into the scalar invariant alternative. Do not replicate one translation across languages as a fallback.

The Course's SupportedLanguages generic propagates to nested Modules, Chapters, Episodes, Sections and Course-owned ContentBlocks. Attached standalone Lessons are referenced by ID: their actual `parameters.languages` must cover **all** Course supported languages and may include more. Do not redundantly repeat language arrays on each Chapter or Lesson slot.

## Machine-readable output contract

Write actual **YAML 1.2** (`toc.yaml`, not a Markdown code fence) conforming to [course-toc.schema.json](./course-toc.schema.json) after YAML parsing. `schemaVersion: 1`, `kind: course-toc-plan`, `status: draft`, `documentLanguage` (TOC source locale) and `supportedLanguages` (planned Course locales) are mandatory. The `content` tree is ordered; `openIssues` records genuine gaps, disputed dependencies or unsupported scope. Keep all consumer-relevant information **in YAML**, not only in chat or prose.

Example (illustrative Math Skill from the canonical source; the Course UUID below is a placeholder, not an existing Course):

```yaml
schemaVersion: 1
kind: course-toc-plan
status: draft
courseId: '11111111-1111-4111-8111-111111111111'
documentLanguage: uk
supportedLanguages: [uk, en]
content:
  - type: module
    key: arithmetic
    title: 'Арифметика'
    children:
      - type: chapter
        key: addition
        title: 'Додавання'
        children:
          - type: lesson
            key: addition-meaning
            title: 'Що означає додавання?'
            objective: "Розуміти об'єднання двох множин як додавання"
            depth: foundational
            skills:
              - id: '00b48cb0-13c2-4531-84ac-1b8d44f11055'
                name: 'Addition — Meaning and models'
                source: content/math/data/skills/arithmetic/addition/skills/addMeaning.data.ts
openIssues: []
```

**The example is documentation only.** For a real Course, use its actual UUID, its own textbook's canonical skill sources, and case-specific titles. All nodes' `key` values must be unique in the entire plan; these are stable editorial keys, not final runtime entity IDs. `name` is English even when the document is Ukrainian; it is the verified cross-language catalog label, not learner-facing localization.

Missing required Skills must be recorded in `openIssues`, with a suggested location and impact; do **not** add fictional skills or unresolved placeholder IDs to lesson leaves. If unresolved gaps prevent a coherent tree, keep the plan a **draft** and report the incomplete coverage rather than treating it as ready for production.

## Acceptance and handoff

- `methodology.md` exists; output `toc.yaml` is in the same UUID bucket directory with matching `courseId` and `supportedLanguages`. The TOC `documentLanguage` is explicit and must be a supported Course language for direct projection, even if the Methodology itself was written in another language.
- English generated taxonomy was consulted or regeneration was attempted and any blockers reported. Every Skill ID/name/source triple resolves to a real verified canonical Skill definition. No taxonomy files were silently edited.
- YAML parses; the unique supported locale set is valid, scalar text has a source locale and invariant titles have explicit markers; nested tree follows [schema](./course-toc.schema.json); all node keys are unique; all Lesson leaves have at least one verified Skill ID; no Episodes, implemented Lesson IDs, scenario content, or duplicate `order` fields.
- Coverage and pedagogical order are audited globally, including multi-skill lessons, repeated skills, missing preparatory competencies and varying depth.
- `openIssues` clearly distinguishes missing taxonomy competencies and actual blockers from completed work; `status: approved` is only an explicit editor decision.
- Deliver a concise summary: scope, skill/slot counts, sequence rationale, gaps and pending approvals. **Do not** automatically run Lesson matching, scenario creation or code generation.

## Responsibilities

The Methodologist alone owns this skill's educational choices. This plan specifies _what to teach and in what sequence_, not _how to render, animate, narrate, evaluate via concrete questions or code an experience_. The Course Methodology document remains unchanged unless the editor separately authorizes a methodology revision.
