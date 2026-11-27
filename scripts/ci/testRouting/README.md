# Nested Ready test routing contract

`test-routing.spec.mjs` checks the **actual YAML** path filters used by the
scoped Web and UI Kit Ready workflows. It models the workflows' ordered
positive and negative path globs and proves that a single relevant changed
file selects its intended suite. It also checks the referenced package scripts:
Web must execute selection-negative tests, host components and published
content integration; UI Kit must execute the package-owned tests on direct
Engine assessment, education-standard and language contract edits.

Run after `npm ci`, using the repository's pinned Node 26:

```sh
node --test scripts/ci/testRouting/test-routing.spec.mjs
```

Both workflows run this test before their actual package test commands.
Dropping any required positive glob (or replacing a real runner with a
typecheck-only step) must fail. Course-only Web routes remain under the
existing Course navigation workflow and are explicitly excluded from the
ordinary Web job, so routine component or asset edits do not install
Playwright. Other Engine source families are deliberately not included in
UI Kit's downstream trigger without a direct owned dependency.

This is **static route regression evidence**, not a claim that GitHub has
executed a particular changed-file event. Current-head Ready Actions jobs
must still be inspected for actual test execution and results. Draft
events intentionally defer expensive tests; `develop → main` uses the
existing Production Quality authority. No workflow is dispatched and no
source or generated content is mutated by this check.
