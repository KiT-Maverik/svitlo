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
analysis from **trusted** description updates. The analysis reads authored YAML
1.2 as data, never imports Course/Lesson TypeScript. GitHub PR status is distinct
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

**Known scope boundary:** when a Course has only generated TypeScript and no
parsable technical `config.yaml`, source inventory is explicitly incomplete; it
does not infer Lesson membership from filenames. Future Course TS AST extraction
must be independently reviewed before claiming support. Historical Lesson PRs
without explicit marker cannot be matched by title or branch. Existing
implemented standalone Lessons need no new implementation PR and appear as
`Reused / existing` once verified from their canonical UUID directory.
