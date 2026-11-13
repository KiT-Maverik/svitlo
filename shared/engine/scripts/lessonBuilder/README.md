# Lesson YAML → TypeScript draft scaffolder

This Engine-owned build-time script emits a **draft authoring entrypoint** from
partially authored YAML. It saves AI editing tokens; it does **not** create valid
Lesson Props, translate, approve, typecheck or publish anything. Missing
configuration is intentionally left missing so the next author sees ordinary
TypeScript diagnostics.

## Input and output

Place the source in the canonical Lesson UUID directory:

- Required: **content.yaml** containing an authored Lesson Config tree and
  **documentLanguage** (the one locale to emit).
- Optional: **questions/questions.yaml** with a top-level **questions** map,
  grouped by Question type and slug.
- Optional: **flashcards/flashcards.yaml** with a top-level **flashcards**
  collection (**items** and **order**).

If the optional maps are already authored inline in **content.yaml**, do **not**
declare them again in separate files.

For example, the start of a **partial** content.yaml may be:

~~~yaml
documentLanguage: uk
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
node shared/engine/scripts/lessonBuilder/lessonBuilder.mjs generate --source content/playground/data/lessons/c/00000000-0000-4000-8000-00000000000c
node shared/engine/scripts/lessonBuilder/lessonBuilder.mjs check --source content/playground/data/lessons/c/00000000-0000-4000-8000-00000000000c
~~~

The generate command writes only the named draft; check is read-only and fails
on missing or stale drafts. A checksum embedded in the generated file detects
manual edits before an update. The script refuses to overwrite an unrelated
data.ts entrypoint or follow filesystem symlinks. There are no extra
requirements, manifests, blocked handoffs, or generated folders.

The separate **scripts/generateLessonProps/** publisher and all runtime APIs
remain unchanged. Existing editorial Studio descriptions of the old,
approval-gated builder are being reconciled in Agent 1's workstream; they
must not be treated as implementation behavior for this scaffolder.
