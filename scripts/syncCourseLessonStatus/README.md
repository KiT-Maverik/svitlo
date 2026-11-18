# Synchronize Course Lesson statuses

This repository-wide GitHub coordination utility maintains **only** the marker-delimited
`Lessons` section of a Course parent Draft PR's description. The seven-stage
Course Flow checklist is manually and independently verified; the automatic
Lesson inventory is **not** a replacement for Stage 3 approval or Lesson production.

The trusted GitHub Actions workflow (after it reaches the default branch) accepts:

- Manual PR comment `/course-status sync` on an open Course parent PR from an
  actor with verified repository write/maintain/admin permission.
- `workflow_dispatch` with the exact parent PR number (same permission gate).
- Same-repository Course/Lesson PR lifecycle events, only when identity markers
  unambiguously link the PR to a Course parent.

Script roles: `synchronizer.mjs` provides pure inventory/status/Markdown and
sentinel enforcement; `sync-course-lessons.mjs` separates read-only source
analysis from **trusted** description updates. The analysis reads authored YAML 1.2 or static materialized Course TypeScript
AST as data; it never imports or executes Course/Lesson TypeScript. GitHub PR status is distinct
from verified Lesson source readiness. The analyzer reuses the static `buildLessonIndex` from #638 and checks declared target languages and actual merged PR SHA ancestry. This does **not** assert independently approved translations or publication readiness. New Lesson implementation PRs must use:

```md
<!-- svitlo-course-lesson:v1 -->

Course: <course-uuid>
Lesson: <lesson-uuid>
Parent PR: #<number>
```

Run tests with `node --test scripts/syncCourseLessonStatus/synchronizer.spec.mjs`.
A manual analysis from a read-only checkout uses:

```sh
node scripts/syncCourseLessonStatus/sync-course-lessons.mjs analyze \
  --repo KiT-Maverik/svitlo --pr 123 --sha <40-character-head-sha> \
  --root <immutable-course-checkout> --out <result.json>
```

The updater accepts that bounded JSON report only after strict schema, source
SHA, Course identity and non-managed-body hash validation. The final GitHub
PATCH is not atomic compare-and-swap; it re-reads before writing, rejects
changed non-managed text or a moved Course head and leaves an explicit race
risk requiring re-run. Idempotent content is not patched.

**Materialized Course support:** once Stage 5 commits the Course's modular
TypeScript files, the analyzer statically traverses `defineCourse` →
`defineModule`/`defineChapter` imports and their ordered `content.items/order`
without executing any authored TypeScript. Lesson UUID identities come from the
materializer's durable Course `methodology.md` (with validation against
`lesson.yaml`'s `config.id` where present, and against the referenced Lesson
source when already implemented). **TODO comment text is never an identity
source.** The analyzer handles the temporary editorial `course.yaml` and the
finalized TS-only Course; it rejects ambiguous placements/IDs, missing source,
unsafe imports and inconsistent plans rather than guessing. The existing
technical `config.yaml` reader is retained only for historical Courses, not
introduced as an intermediate new Course source.

After a Course Stage 5 materialize or finalize commit, the dedicated command
workflow refreshes the existing managed `Lessons` block automatically:
read-only inventory with the new HEAD, then trusted `pull-requests:write`
update under the same per-Course concurrency group. Future Lesson PR lifecycle
events still use the existing synchronizer. A matching Lesson PR contributes
its **actual PR title, number, link, and status**; unstarted Lessons retain
`Not started`. User-maintained stage checklists and all text outside the
Lessons markers are preserved. GitHub's PR-body PATCH is not an atomic CAS:
on concurrent edits, the updater fails closed; the owner can rerun
`/course-status sync`.

Historical Lesson PRs without the explicit identity marker cannot be matched
by fuzzy title/branch searches. Existing implemented standalone Lessons need
no new implementation PR and appear as `Reused / existing` once verified
from their canonical UUID directory.

A Stage 1/2 Course that has not allocated Lesson slots displays `NOT ALLOCATED`
instead of the misleading `INCOMPLETE` when its source inventory is readable and
has no diagnostics; this is **not** a claim of completed Lesson production.
Malformed Lesson markers from unrelated PRs, including illustrative snippets,
are excluded from the global inventory. A marker explicitly referencing the
current Course UUID **or** parent PR must pass full identity and Course-branch
checks; malformed or conflicting associated claims are reported and fail closed.
