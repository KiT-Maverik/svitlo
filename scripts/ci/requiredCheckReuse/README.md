# Required check reuse on PR description edits

The `edited` event is retained for base retargets. On a description-only edit,
the required job may reuse a prior successful GitHub Actions check on the exact
current PR merge commit. The lookup is read-only and fails closed: absent,
failed, pending, cancelled, or ambiguous results run the normal validation.
The current required job still completes and reports its own result. No reuse
is allowed on code changes, base changes, Draft → Ready, or manual dispatch.
