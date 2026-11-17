# Lesson query (read-only)

Discover Lesson candidates by immutable Lesson UUID or one to 25 verified Skill UUIDs. The same static index drives the legacy `generateLessonsBySkill` Markdown lookup. No authored TypeScript or YAML is executed, and stdout mode writes no repository files.

```sh
node shared/engine/scripts/queryLessons/query-lessons.mjs --by id --lesson <uuid> --format json --stdout
node shared/engine/scripts/queryLessons/query-lessons.mjs --by skill --skill <uuid> --skill <uuid> --match all --package content/math --format json --stdout
node shared/engine/scripts/queryLessons/query-lessons.mjs --comment "/get lesson by skill <uuid>" --format json --stdout
node --test shared/engine/scripts/queryLessons/query-lessons.spec.mjs
```

On an **open same-repository PR**, a contributor with actual write/maintain/admin permission may comment:

```text
/get lesson by id <lesson-uuid> [--package content/<book>]
/get lesson by skill <skill-uuid> [<skill-uuid> ...] [--match any|all] [--package content/<book>]
```

The [GitHub workflow](../../../../.github/workflows/get-lesson.yml) authorizes on the default branch, checks out the exact PR head with read-only credentials in a separate job, uploads bounded JSON, and updates one bot comment after a trusted report validation. Comments work only once the workflow is merged to `main`. The workflow never commits or changes the PR. An optional manual dispatch takes a PR number and the same comment syntax.

Machine output: `{ query, sourceSha, matches, scanned, diagnostics, complete }`. Each match includes immutable Lesson ID, textbook, status `implemented` or `editorial-draft`, grounded file paths, all verified Skills, matching Skills, coverage, and known languages (otherwise `unknown`). A typed source and accompanying YAML are one implemented candidate; discrepancies are diagnostics.

`complete: false` means some sources were not indexed reliably: **zero verified matches is not proof of absence**. A draft is not a publishable/approved Lesson. A Skill match is not evidence of audience, language, prerequisite, depth, or Course fit.

Do not add course/grade/age/standard/title filters without a separately verified contract. Do not trust artifact source strings as permissions or execute any authored source to extract metadata.
