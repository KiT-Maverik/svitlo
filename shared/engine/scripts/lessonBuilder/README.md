# Lesson YAML → TypeScript draft scaffolder

This Engine-owned build-time script emits a **draft authoring entrypoint** from
partially authored YAML. It saves AI editing tokens; it does **not** create valid
Lesson Props, translate, approve, typecheck or publish anything. Missing
configuration is intentionally left missing so the next author sees ordinary
TypeScript diagnostics.

## Input and output

Place the source in the canonical Lesson UUID directory:

- Required: **lesson.config.yaml** — a separate, Config-shaped TypeScript
  authoring projection containing the Lesson tree, Section/ContentBlock nodes,
  and any typed Question and Flashcard collections.
- The existing Screenwriter **content.yaml** is a distinct editorial plan,
  not a Config. The scaffolder reads only its `documentLanguage` provenance
  when no `--language` override was supplied; it never reads the plan's
  Sections, Quizzes or blocks.
- Existing **questions/questions.yaml** and **flashcards/flashcards.yaml**
  remain specialist-owned editorial plans. A technical editor projects
  their approved content into `lesson.config.yaml`, not automatically
  through the scaffolder. The Builder never reinterprets those files.

Use `--language uk` (or another source locale) when no Screenwriter
`content.yaml` is available; the pure Config file does **not** carry
`documentLanguage`, matching the generated Engine `lesson.schema.json`.

For example, the start of a **partial** lesson.config.yaml may be:

~~~yaml
id: 00000000-0000-4000-8000-00000000000c
slug: lightLesson
type: lesson
params:
  languages: [uk, en]
locale:
  title:
    uk: Світло
section:
  items:
    intro:
      id: 00000000-0000-4000-8000-000000000001
      slug: intro
      type: content
      content:
        items:
          firstText:
            id: 00000000-0000-4000-8000-000000000002
            slug: firstText
            type: text
            locale:
              value:
                uk: Привіт
        order: [firstText]
  order: [intro]
~~~

The script emits **lightLesson.data.ts** beside the YAML, containing the
named export **lightLesson_Lesson = defineLesson(...)** and nested Engine
define* calls. It copies authored fields and item order literally. A missing
polymorphic type or a type with no factory is an immediate dispatch error.
The factory map comes from
**shared/engine/configurators/yaml/yamlFactoryByType.ts**; it is not duplicated
here. A locale dictionary is limited to authored documentLanguage values,
while params.languages remains untouched.

No implicit IDs, empty arrays, translations, fallback content, or missing
parameters are created. No editorial, Zod/AJV, Skills, asset, approval,
TypeScript or publication validation is performed. Use independent Engine
validators and publishers **after** the draft has been completed.

## Commands

From the repository root:

~~~bash
npm run content:generate:lessons
npm run content:check:lessons
npm run test:unit:lesson-builder
~~~

Or for one source:

~~~bash
node shared/engine/scripts/lessonBuilder/lessonBuilder.mjs generate --source content/playground/data/lessons/c/00000000-0000-4000-8000-00000000000c --language uk
node shared/engine/scripts/lessonBuilder/lessonBuilder.mjs check --source content/playground/data/lessons/c/00000000-0000-4000-8000-00000000000c --language uk
~~~

The repository-wide command discovers only folders with `lesson.config.yaml`.
The generate command writes only the named draft; check is read-only and fails
on missing or stale drafts. A checksum embedded in the generated file detects
manual edits before an update. The script refuses to overwrite an unrelated
data.ts entrypoint or follow filesystem symlinks. There are no extra
requirements, manifests, blocked handoffs, or generated folders.

The separate **scripts/generateLessonProps/** publisher and all runtime APIs
remain unchanged. The technical projection from editorial plans to Config YAML is deliberate
integration-editor work, with current approved revisions and stable identities.
It does not modify the specialist-owned source files.
