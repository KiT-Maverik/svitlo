# Questions Builder — independent Stage B bank draft

This Engine-owned, **create-only** scaffolder converts an approved
Lesson-root questions.yaml into modular Question Configurator TypeScript.
It **reuses** the existing Lesson renderLessonModules, the canonical Engine
yamlQuestion_Schema, questionTypes, and yamlFactoryByType registry. It
does not introduce another Question schema or a Props publisher.

The input must be in the canonical Lesson UUID folder:

    content/<book>/data/lessons/<bucket>/<lesson-uuid>/questions.yaml

That Lesson must have a real authored index.ts or *.data.ts and a
constants.ts exporting LessonLanguages. This scaffolder never creates
the Lesson root, Sections, or language declarations. An owner without
constants.ts must coordinate the canonical language scope, not invent
a duplicate declaration.

## Source contract

The questions values are **exact current Engine Question Config shapes**,
grouped by Question type and camelCase slug with stable UUIDs. Nested
ContentBlocks use exact Engine Config shapes and { items, order } collections.
The source locale is explicit; target locales are completed later without
fake translations.

The optional quizSelections is a temporary reviewed handoff mapping
Quiz Section UUIDs to explicitly selected Question UUID arrays. It is
not a second bank, a Section Config, a new selection algorithm, or a
runtime artifact. Sampling and pedagogical coverage require independent
review.

Example (illustrative only; replace with approved IDs and content):

    documentLanguage: en
    questions:
      answerWithNumber:
        additionResult:
          id: 00000000-0000-4000-8000-000000000010
          slug: additionResult
          type: answerWithNumber
          params:
            assessmentMethod: application
            restrictions: []
            correctAnswers: [2]
          locale:
            placeholder: { en: Enter a number }
          content:
            question:
              items:
                prompt:
                  id: 00000000-0000-4000-8000-000000000011
                  slug: prompt
                  type: text
                  params: {}
                  locale: { value: { en: What is 1 + 1? } }
              order: [prompt]
    quizSelections:
      00000000-0000-4000-8000-000000000012:
        - 00000000-0000-4000-8000-000000000010

quizSelections may be omitted when no embedded Quiz is approved. Use
shared/engine/yaml-schemas/question.schema.json to author _individual_
Question Configs; the minimal wrapper groups them, identifies source
language, and optionally records the reviewed Section mapping.

## Commands

From the repository root after npm ci and Engine build:

    npm run package:build --workspace @svitlo/engine
    node shared/engine/scripts/questionsBuilder/questionsBuilder.mjs --preflight --source content/<book>/data/lessons/<bucket>/<uuid>/questions.yaml
    node shared/engine/scripts/questionsBuilder/questionsBuilder.mjs --write --source content/<book>/data/lessons/<bucket>/<uuid>/questions.yaml
    node shared/engine/scripts/questionsBuilder/questionsBuilder.mjs --check --source content/<book>/data/lessons/<bucket>/<uuid>/questions.yaml
    node shared/engine/scripts/questionsBuilder/questionsBuilder.mjs --verify-sections --source content/<book>/data/lessons/<bucket>/<uuid>/questions.yaml
    node --test shared/engine/scripts/questionsBuilder/questionsBuilder.spec.mjs

--preflight validates complete current Engine Question authoring shapes
and chosen UUIDs, then renders drafts without writes. --write creates
only absent files with exclusive flags; an authored questions/index.ts
causes a full SKIP before stale YAML is parsed. An orphan/partial tree
is a blocker, never a reason to overwrite. --check compares generated
bytes only for untouched drafts; do not run it against subsequently
human-edited or completed TypeScript. --verify-sections reads real modular
Section sources and verifies explicit Question UUID selections and static
Section registration/order. Custom/dynamic composition needs manual review.

Generated tree:

    <lesson-uuid>/questions/index.ts
    <lesson-uuid>/questions/<questionType>/<questionSlug>/index.ts
    <lesson-uuid>/questions/<questionType>/<questionSlug>/<blockSlug>/index.ts

Markdown/Code source handling and missing-media draft markers are reused
from the Lesson renderer. Each pending media block inherits one real
`TODO (BLOCKER):` source comment above its export as well as the field-level
`TODO(asset)` hints; no separate Question media logic is introduced. The resulting grouped questions export is
consumable by the existing generateAssessmentResources --kind question
publisher. **Every Question remains in the independent bank**, including
unselected members. Publication is separate; it validates the full
Lesson language set, real assets, and published Props. Engine type
availability does not imply every UI Kit Question renderer is complete.

## Integration with Lesson and Flashcards flows

1. Verify Lesson SHA, approved methodology, derived Lesson Markdown,
   target Skills, all existing Quizzes, and source/target locales. Author
   and independently review the full bank and intentional small subsets.
2. Generate the bank on the existing Questions child PR. The Lesson
   Section owner reuses/creates only approved Quiz modules and adjusts
   the minimal Section registry/order. This tool does NOT edit Sections.
3. Run --verify-sections and the independent assessment publisher,
   then scoped TypeScript, UI Kit and content build checks.
4. Remove questions.yaml _manually only after_ full source transfer,
   actual selection materialization, assets and locales are verified.
   Skipped/failed/partial generation must retain YAML. There is no
   automatic deletion that could lose editorial source.
5. Integrate Questions before starting/rebasing Flashcards Section work
   to avoid concurrent sections/index.ts edits. The actual owning Lesson's
   Flashcards workflow is downstream of its Questions integration, not a
   dependency blocking the Questions PR.

Custom Practice UI/scheduling, translation, editorial approvals and
cross-asset media searches are outside this generator.

## Pending Lesson Section handoff

When Lesson Stage 6 defers an incomplete Quiz Section, its full accepted Section `config`/`production`, UUID, copy and relative order may appear in optional top-level `sectionDrafts: { items, order }` in `questions.yaml`. This is temporary source-only material for the independent Questions workflow, **not** a Question record, Quiz selection, validation bypass or approved bank. Complete the real `questions` bank first; the Section specialist uses the handoff to integrate an actual `defineQuizSection` later. The Questions Builder accepts and ignores this optional authoring handoff while continuing to strictly validate substantive Question records; it never generates Lesson Sections itself. An initially empty bank draft intentionally fails Question Bank preflight until authored.
