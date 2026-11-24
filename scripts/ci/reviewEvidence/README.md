# Source-pinned PR review evidence

Shared trusted verification for entity materialization gates. The canonical evidence format and independent review rule are in [Studio](../../../studio/rules/independent-review.md). Callers must separately verify the authorized invocation actor, entity identity, branch/path, pinned source and revalidate evidence before writing. This helper does not authorize source transitions or publication.

```sh
node --test scripts/ci/reviewEvidence/review-evidence.spec.mjs
```
