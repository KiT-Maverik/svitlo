# Blocking TODO CI guard

This read-only repository-wide check rejects unresolved `TODO (BLOCKER):` source comments **and numeric `0` evidence in canonical Lesson/Course `review.ts` files**. Ordinary `TODO:` and `TODO(asset):` markers are not part of this guard; existing content and asset checks remain separate.

Generated TypeScript uses the pure Engine \`renderBlockerTodo\` or \`renderBlockerSpecification\` helper. A one-line \`// TODO (BLOCKER): ...\` or a single reviewed-brief block \`/*\n * TODO (BLOCKER): ...\n * ...\n */\` both fail the guard. Quoted marker text inside string/template values does not count. See [canonical blocker semantics](../../../studio/personas/coding-agent.persona.md#actionable-generated-source-blockers).

## CLI

```sh
node --test scripts/ci/checkBlockerTodos/check-blocker-todos.spec.mjs
node scripts/ci/checkBlockerTodos/check-blocker-todos.mjs full
node scripts/ci/checkBlockerTodos/check-blocker-todos.mjs diff <base-sha> <head-sha>
```

- `full`: scan **all Git-tracked source files** in the checkout; ignore Markdown documentation, binary assets, and untracked output.
- `diff`: scan **added lines only** in the full merge-base PR diff (`git diff base...head`). Unchanged inherited blockers, including unchanged files renamed in the PR, do not fail this mode.
- The scanner ignores TODO markers inside quoted string/template values and recognizes source comment delimiters such as `//`, `/*`, `*`, `#`, and JSX block comments. The exact canonical marker has a space: `TODO (BLOCKER):`.
- In canonical `content/<book>/data/{courses,lessons}/<bucket>/<uuid>/review.ts` files, numeric `0` means unreviewed (stage PR, AI locales, human acceptance or optional human locale/scientific evidence). Ready/merge is blocked even if the TODO comment is removed. Unrelated Skill taxonomy review files are unaffected.
- Failures emit GitHub Actions annotations with file and line numbers.

## GitHub Actions

`Blocker TODOs / clean` runs on every PR to any branch, regardless of changed paths. Draft PRs are exempt from blocker scanning. Ready PRs targeting `main` use `full`; Ready PRs targeting an integration/other branch use `diff`. Merge-queue jobs follow the corresponding target-branch mode. The scanner regression tests run in every invocation.

To prevent merges, add `Blocker TODOs / clean` to the protected branch ruleset's required status checks. Changing workflow YAML alone does **not** configure branch protection.
