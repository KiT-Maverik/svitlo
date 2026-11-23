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

The [GitHub workflow](../../../../.github/workflows/get-lesson.yml) authorizes on the default branch, checks out the exact PR head with read-only credentials and uploads bounded JSON as a run-scoped Actions artifact. It uploads a one-day Actions ZIP containing a single `result.json` bound to the PR, run and analyzed SHA. PR comments only trigger the workflow; no result is posted back as a comment. Verify the successful run and report envelope before using its results. Comments work only after the workflow reaches the default `develop` branch. Manual dispatch accepts a PR number and the same command syntax.

The ZIP expires after one day and is never committed to the PR. Historical tracked `.agent-ci-artifacts/` files still require explicit deletion commits; the old cleanup command and standalone guard are retired.

Machine output: `{ query, sourceSha, matches, scanned, diagnostics, complete }`. Each match includes immutable Lesson ID, textbook, status `implemented` or `editorial-draft`, grounded file paths, all verified Skills, matching Skills, coverage, and known languages (otherwise `unknown`). A typed source and accompanying historical YAML are one lookup candidate; discrepancies are diagnostics. YAML-only Lessons are reported as historical editorial drafts, not supported new production inputs.

`complete: false` means some sources were not indexed reliably: **zero verified matches is not proof of absence**. A draft is not a publishable/approved Lesson. A Skill match is not evidence of audience, language, prerequisite, depth, or Course fit.

Do not add course/grade/age/standard/title filters without a separately verified contract. Do not trust artifact source strings as permissions or execute any authored source to extract metadata.
