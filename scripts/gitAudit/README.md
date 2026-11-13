# Repository Git audit

Read-only repository-wide diagnostics for the current Git history. The workflow
lives at `.github/workflows/repository-git-audit.yml` and is intentionally
**manual only**: GitHub Actions **Run workflow**, or an exact `/repo-audit`
comment on an existing Issue or PR by an OWNER, MEMBER, or COLLABORATOR. The
comment must be created after the workflow has landed on the default branch.

The workflow checks out the **default branch** with `fetch-depth: 0`, installs
no npm dependencies, runs the collector's isolated fixture test, then writes
`git-audit.json` and `git-audit.md` to a seven-day Actions artifact. The Markdown
report is also written to the run's Job Summary, readable through GitHub Actions
logs/API. Unmatched comments do not run the job; no scheduled or push trigger.

For a local audit from the repository root:

```bash
node --test scripts/gitAudit/git-audit.spec.mjs
node scripts/gitAudit/git-audit.mjs --output /tmp/svitlo-git-audit
```

The collector uses Git's committed HEAD and fetched refs. It does not run
`git gc`, remove Git objects, commit, push, or modify the worktree. It records:
HEAD snapshot counts and raw file sizes; counts of reachable commits, blobs,
branches and tags; pack and loose-object stats; largest reachable blobs and
blobs not referenced by the HEAD snapshot; directory/extension breakdown; and
first-parent monthly snapshot sizes and commit counts.

**Interpretation:** raw snapshot/blob byte totals are not packed Git byte totals;
Git reports runner-specific pack sizes; a path shown for an old blob is only
one observed historical path. `historical-only` does **not** imply safe-to-delete
or a reclaimable byte count. GitHub can retain additional PR/internal refs,
so a runner checkout cannot establish the exact size or potential cleanup
savings of GitHub's server-side repository. Untracked and dirty worktree files
are not considered.
