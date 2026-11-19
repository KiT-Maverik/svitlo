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

The [GitHub workflow](../../../../.github/workflows/get-lesson.yml) authorizes on the default branch, checks out the exact PR head with read-only credentials in a separate analysis job, uploads bounded JSON, and validates the report in a trusted `contents: write` job. It then commits a stable query-hash-named `.json` plus a human-readable `.md` to **`.agent-ci-artifacts/lesson-lookup/` in the source PR branch**. PR comments only trigger the workflow; no result is posted back as a comment. Repeating a query replaces only its two files and preserves other queries and unrelated temporary references. The branch must still point to the analyzed SHA; otherwise publishing stops safely and a fresh request is required. Comments work only after the workflow reaches `main`. Manual dispatch accepts a PR number and the same command syntax.

These documents are temporary and must be removed with `/agent-artifacts cleanup` (or the existing ready-for-review cleanup path) before merging. The Agent CI Artifacts guard deliberately rejects a merge containing `.agent-ci-artifacts/`.

Machine output: `{ query, sourceSha, matches, scanned, diagnostics, complete }`. Each match includes immutable Lesson ID, textbook, status `implemented` or `editorial-draft`, grounded file paths, all verified Skills, matching Skills, coverage, and known languages (otherwise `unknown`). A typed source and accompanying YAML are one implemented candidate; discrepancies are diagnostics.

`complete: false` means some sources were not indexed reliably: **zero verified matches is not proof of absence**. A draft is not a publishable/approved Lesson. A Skill match is not evidence of audience, language, prerequisite, depth, or Course fit.

Do not add course/grade/age/standard/title filters without a separately verified contract. Do not trust artifact source strings as permissions or execute any authored source to extract metadata.
