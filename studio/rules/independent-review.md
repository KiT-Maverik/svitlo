# Independent review

An independent review is performed in a new chat. Follow the applicable entity workflow, inspect the actual authored source, correct in-scope defects and record the final verdict and reviewed revision in the existing entity PR.

Course, Episode and Bank materialization require their applicable accepted review evidence and explicit authorization. Lesson Stage 6.1 requires an authorized command and valid pinned typed source, not parsed review records. Lesson Stages 3–5 still record actual findings, corrections, verdicts and reviewed revisions in the existing PR as editorial evidence; no machine-readable format is required for Lesson materialization.

## Materialization evidence

Record one line for each required review in the existing entity PR description:

```text
- Review evidence (v1): <stage> | <accepted or rejected> | <reviewed commit SHA> | <reviewed source blob SHA>
```

Use Stage `4` for Course and Banks, Stages `3`, `4` for Episode, and `questions-na` for the reviewed Questions N/A decision in the parent Lesson PR. Record the actual verdict, full 40-character Git commit and blob SHAs, and retain the substantive findings and corrections in the same PR. The final required review must match the current HEAD and canonical source blob. Earlier Episode reviews retain their actual source revisions in ancestry order. Replace stale evidence for the affected stage; do not append duplicate records. An accepted verdict is not authorization to materialize, publish or merge.
