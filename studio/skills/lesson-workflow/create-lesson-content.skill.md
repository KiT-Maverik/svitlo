# Create Lesson Content — machine-readable Screenwriter plan

**Production Issue coordination:** For authorized Lesson production, find/create the [fixed-scope Lesson Production Issue](./manage-lesson-production.skill.md), reconcile its UUID membership and actual approved sources, and register the bounded Screenwriter assignment. Process all independently ready Lessons in a batch; update per-Lesson status/PR/handoff, keeping blocked Lessons visible. A fresh Issue per Lesson or per Section is not required. The Issue does not replace independent methodology approval.

**First:** Read [Educational Screenwriter Persona](../../personas/educational-screenwriter.persona.md), applicable `AGENTS.md` and [Studio architecture](../../docs/architecture/README.md). This skill plans the **learning experience** for one or more selected, approved Lessons. It does not implement Lesson TypeScript, produce localized runtime responses, design assessment validity, or create Program story content.

## Inputs and role boundaries

For each explicitly assigned Lesson, locate the existing UUID directory:
`content/<textbook>/data/lessons/<last-hex-digit>/<lesson-uuid>/`. The path comes from `resolveEntityPath(lessonId)`. Never infer a UUID from the slug or move folders.

- **Required, approved:** `methodology.md` (or legacy `methodologist-brief.md`) with explicit `Methodologist status: Approved`; check direct canonical Target Skill source links, outcomes, prerequisites, audience, conceptual accuracy, language plan and the Methodologist's `assessmentPlan` frontmatter.
- **Methodologist:** decides **whether any Quiz Sections are required**, how many pedagogically distinct Quiz requirements exist, which Skills each must assess, and the exact **AssessmentMethodKey** values required per Quiz. The Screenwriter cannot override those decisions or pretend a missing approval was granted.
- **Educational Screenwriter:** specifies how learners encounter the subject: a meaningful ordered Section journey, actual learner-facing explanations/prompts, purposeful ContentBlocks, pacing, interactions, accessibility, media and Scene specifications. Places and narratively integrates required Quiz Sections without defining Question correctness or mastery thresholds.
- **Learning Assessment Architect:** authors/validates Question items, mapping to the approved Assessment Methods, answer correctness, distractors, scoring, retries and assessment evidence. `Question_Data_Meta.assessmentMethod` is an `AssessmentMethodKey` and is **not** a Question input widget or a UUID field.
- **Coding Agent:** implements typed Lesson, Section, ContentBlock, Quiz and Question data through current Engine creators, handles media/scenes and builds/tests resources. A screenwriter's plan does not imply platform support.
- **Scene Designer/Coding Agent:** produces approved `scenes/<key>.scene-spec.md` implementations through [Design Scene](../design-scene.skill.md), not by improvising from a one-line label.

Read actual contracts rather than the old `Resource_Config` / `blockType` model: [Lesson](../../../shared/contracts/src/types/content/lesson.types.ts), [Section](../../../shared/contracts/src/types/content/section.types.ts), [ContentBlocks](../../../shared/contracts/src/types/content/blocks/index.ts), [Quiz parameters](../../../shared/contracts/src/types/content/quiz.types.ts), [Questions](../../../shared/contracts/src/types/content/questions/index.ts) and [Assessment Method keys](../../../shared/contracts/src/types/content/assessmentMethod.ids.ts). Check current UI Kit/renderer, supported features, Playground examples, Story/Scene integrations, and build/generation conventions. Do not assume that being represented by a contract guarantees actual runtime rendering.

### Selecting work

This skill works in a user-selected Lesson, set of Lessons, or a bounded Course Module/Chapter whose exact existing Lesson UUIDs are given. It may discover missing plans, but **discovery alone never authorizes arbitrary content authoring**. Process each Lesson independently with its own approved Methodology. Keep the Lesson autonomous, reusable, Course/Program-neutral and understandable without characters, missions or course progression.

If critical Methodologist decisions are missing or ambiguous, record the exact blocker and stop that Lesson. In particular, **do not infer `quizRequired: false` from the absence of an assessment plan**. New methodology files must include the [Methodology frontmatter contract](./lesson-methodology-frontmatter.schema.json). For an approved legacy Brief with no `assessmentPlan`, request a Methodologist amendment/approval rather than inventing quiz policy or a competing plan.

## Canonical output: content.yaml

Create exactly **one canonical, machine-readable `content.yaml`** in the same Lesson folder (or revise it in place). This is the Screenwriter-owned source of truth for the Lesson experience; no separate mandatory `content.md` is generated. Use the [Lesson Content JSON Schema](./lesson-content.schema.json), interpreted as a YAML 1.2 document.

```text
content/<textbook>/data/lessons/<bucket>/<lesson-uuid>/
  methodology.md                 # existing Approved Methodologist Brief
  lesson.identity.json           # when no implemented Lesson exists
  content.yaml                   # new Screenwriter-owned machine-readable plan
  scenes/
    <scene-key>.scene-spec.md    # only where a custom Scene is requested
```

If a legacy `content.md`, `script.md` or older Section storyboard already exists, read it and report an explicit migration decision. Do not overwrite, delete or silently maintain two competing canonical Lesson plans. Migration to `content.yaml` is an authorized editorial revision, not an automatic global file migration.

The YAML contains **source-language editorial content and machine identities**, not fabricated full runtime `Lesson<'data'>`, `Section<'data'>` or `Quiz_Parameters`. Stable `key` fields identify _planned_ Sections and blocks; the implementation stage maps these to stable UUIDs and slugs in existing contracts without regenerating a Lesson ID. The renderer and generator may need additional technical fields; do not invent unsupported schema properties.

## Source language and localization

- `documentLanguage` is the **single source language of all learner-facing ordinary text** authored in `content.yaml`: titles, narrative copy, feedback and prompts. It can differ from the Methodology's editorial language, but **must be included** in `supportedLanguages`. `supportedLanguages` is copied from the approved Lesson Methodology (nonempty, unique and from the supported registry); it means _planned_ target locales, not delivered translations.
- Plain YAML strings under `title`, `sourceText` and other learner-facing fields belong **only to `documentLanguage`**. A truly untranslatable title (symbol, chemical formula, numerical notation) may use `{value: "...", invariant: true}` for schema-supported titles. Do not treat arbitrary scalars as invariant just to silence type errors.
- A future Markdown/YAML-to-entity generator consumes `content.yaml` and, optionally, the approved `methodology.md` and Scene Markdown specs. Its first pass creates folders and source-locale authored TS values **only for `documentLanguage`**. It must **not** copy source content into all planned target locales, add fallback strings, weaken `SupportedLanguages`, or lie about completed translations.
- **Temporary TypeScript missing-locale errors are an expected intermediate authoring state**, not proof of completion. Preserve them visibly to guide a future translation agent. Translation completes `supportedLanguages` before normal production typecheck/build/publication gates can pass. Generators must never publish incomplete locales as though complete. The generator itself is **not implemented by this skill**.
- Store full, substantive learner-facing source copy (including math/code expressions when needed); only reference verified local media or clearly marked pending asset requests. No user-facing text baked into images without accessible/localized alternatives.

## Structured content rules

1. **One ordered tree:** `sections` is an array and its order is pedagogical order. Every regular Section has `key`, an actual Section `type` from the current contracts (excluding `quiz`), `title`, `purpose`, and a nonempty, ordered `blocks` array. No arbitrary multi-column outer Section layout. Meaningful interactive Scenes may have their own internal layout.
2. **Current ContentBlock names:** `text`, `markdown`, `checkpoint`, `code`, `audio`, `video`, `youtube`, `image`, `carousel`, `scene`. Do not use the obsolete `blockType` property or invent new supported types. For each block, record its editorial `key`, actual type, pedagogical purpose, source copy/structured spec, implementation `readiness`, and accessible alternative. Read current renderer and typed contracts to assess feasibility.
3. **Quiz is a Section, never a ContentBlock.** Zero, one or multiple Quiz Sections are valid **only if the approved Methodologist plan permits/requires them**. Every required `assessmentPlan.quizzes[].key` must map to exactly one `type: quiz` Section's `assessmentPlanKey`; no extra quizzes are invented. Match `targetSkills` and `requiredAssessmentMethods` **exactly** to the approved requirement; the latter are **AssessmentMethodKey** strings from `assessmentMethod.ids.ts`, not UUIDs or UI Question types. No `blocks` field on a Quiz Section.
4. **Question ownership:** `questionBriefs` may specify intended evidence and cognitive operation, but must not invent the actual Question bank, correct responses, scoring, grading or mastery policy. The Assessment Architect produces validated items. Do not assume each cognitive operation corresponds to one Question type; the type is a UI interaction mechanism.
5. **Scenes and assets:** any custom `scene` block refers to a matching entry in `sceneSpecifications`. Author a separate, precise `scenes/<key>.scene-spec.md` describing models, states, interactions, content, a11y, locale, RTL, reduced motion, offline fallback and acceptance scenarios. Mark it `draft` until independently approved. Media blocks describe an `assetRequest` with clear status (`pending` unless a real file is verified) and alt/caption/transcript intent, never a fabricated URL.
6. **Experience quality:** use prediction, visualization, exploration, useful feedback, worked examples, retrieval and transfer as appropriate. No compulsory theory/practice/quiz recipe; no decorative interaction quotas. Preserve accuracy, cognitive load, age suitability, inclusive keyboard/touch access, RTL, low-end/offline equivalence and meaningful non-visual alternatives. A `checkpoint` is a learning/reflection block, **not** scored Quiz evidence.
7. **Dependencies:** `productionDependencies` explicitly records missing Scenes, media, Assessment Architect deliverables, platform capabilities and localizations. `notesPlan` is an editorial recall-cue proposal if needed; do not imply a Notes runtime exists.
8. **Review:** do not edit Methodology, approved taxonomy, other specialists' designs, code or runtime resources under this skill. `status: draft` until explicit editorial approval.

## Minimal illustrative content.yaml

The sample identifiers, text and Assessment Methods are **illustrative**; replace with verified Lesson UUID, existing Methodologist Quiz keys and approved Skill UUIDs. Do not copy the sample into an actual Lesson without validation.

```yaml
schemaVersion: 1
kind: lesson-content-plan
status: draft
lessonId: '11111111-1111-4111-8111-111111111111'
lessonSlug: additionMeaning
methodologySource: methodology.md
documentLanguage: uk
supportedLanguages: [uk, en]
title: 'Що означає додавання?'
learningIntent: "Зрозуміти об'єднання двох множин і пояснити отриманий результат."
sections:
  - key: combine-objects
    type: theory
    title: "Об'єднуємо предмети"
    purpose: 'Наочно побачити значення додавання.'
    blocks:
      - key: first-observation
        type: markdown
        purpose: 'Зробити прогноз перед перевіркою.'
        readiness: available
        sourceText: 'У кошику два яблука. Покладемо ще одне. Скільки стане?'
        accessibility: 'Пояснення повне без кольору, руху або зображення.'
  - key: explain-the-result
    type: quiz
    title: 'Поясни результат'
    purpose: 'Перевірити розуміння операції, а не вгадування символу.'
    assessmentPlanKey: explain-the-result
    targetSkills: ['00b48cb0-13c2-4531-84ac-1b8d44f11055']
    requiredAssessmentMethods: [interpretation, application]
    questionBriefs:
      - assessmentMethod: interpretation
        evidenceIntent: "Учень пояснює, що означає об'єднання множин."
sceneSpecifications: []
productionDependencies:
  - kind: assessment
    description: 'Question bank and answer validity require Assessment Architect approval.'
    status: pending
```

For a Lesson with `assessmentPlan.quizRequired: false`, **omit the Quiz Section entirely**; don't produce an empty placeholder Quiz. To model multiple required Quizzes, include multiple distinct `type: quiz` Sections, each mapping to its own approved `assessmentPlanKey`.

## Workflow and acceptance

1. Read the selected Lesson's verified approved Methodology (including `assessmentPlan`), target Skill definitions, `supportedLanguages`, existing editorial artifacts and relevant current code.
2. Choose a single supported source `documentLanguage`; construct a substantial learner journey as an ordered Section array; define the actual educational text and interaction intent for each block. Keep it Course-neutral.
3. Place every required Methodologist Quiz exactly once, map its Skill targets and Assessment Methods, and record Assessment Architect dependencies. Do not add optional or additional quizzes without an explicit Methodologist amendment.
4. Define necessary independent Scene specifications and media requests with honest readiness; document source citations, a11y and unresolved dependencies.
5. Write `content.yaml` as the **single canonical Screenwriter deliverable** and optional separate Scene Markdown specifications. Validate YAML syntax and [JSON Schema](./lesson-content.schema.json), unique keys, target UUID/path, `documentLanguage ∈ supportedLanguages`, Quiz matching and a11y completeness. JSON Schema alone cannot verify external Methodology references or all semantic invariants.
6. Hand off for independent editor and specialist approval. **Stop after editorial files**. Do not auto-start Question authoring, media generation, scene implementation, code generation, TS type-assertion suppression, translation or publication.

**Definition of done:** one reviewed, structured Lesson plan with single-language authored learner text, no invented supported locale translations, exact approved Quiz requirements, a meaningful ordered Section/ContentBlock sequence, explicit dependencies and traceable Scene specifications. The downstream generator may turn this plan into folders and source-locale files, but that generator is a separately authorized future task.
