# Opt-in media and generated-resource assertion

The **`assert: media`** label is an opt-in request for a strict physical-media and generated-resource audit on an existing Course/Lesson PR that targets `main`.

The independent [Assert media resources](../../../.github/workflows/assert-media.yml) workflow runs on `pull_request.ready_for_review` **only if the label is present**; it also runs if the label is added after Ready, when subsequent commits are pushed while Ready and labeled, or when a labeled Ready PR is reopened. A Draft PR does not run the assertion. The check is deliberately **not a mandatory branch-protection status**; the separate always-reported `Content packages build` continues to own required CI behavior. If the label is missing, this optional job skips.

The workflow executes the existing UUID-root `verifyProductionAssets` source scanner to reject unfinished `TODO(asset)`, Nil UUID media and temporary YAML in the affected Lesson/Course source scope. It then calls this runner with the PR base/head commit SHAs. The runner:
- Requires at least one changed Lesson, Course or `content/<book>/assets/` path and a real content workspace.
- Builds only those affected textbook workspaces with **`SVITLO_MEDIA_MODE=production`**. Existing publishers validate real physical files, UUID filenames, missing media, complete declared locales, independent Question/Flashcard resources and effective Section selections.
- Reads each resulting `dist/manifest.json` and checks that all published resource files are real, nonempty regular files without path traversal, and that the changed UUID-addressed Lessons/Courses actually publish their `base.json`. Flat Course entrypoints require an actual Course base publication.
- Never fabricates assets or publishes draft-scoped substitutes. Production output is generated in the CI workspace; the assertion does not commit artifacts or merge the PR.

```sh
node --test scripts/ci/assertMedia/assert-media.spec.mjs
node scripts/ci/assertMedia/assert-media.mjs <base-sha> <head-sha>
```

**Important:** This assertion only proves physical/local technical publication for the commit it checked. It does not approve content quality, independent reviews, scene runtime, accessibility or delivery to remote hosts. The label is not a successful-result marker and removal must not bypass mandatory merge checks.

The repository label catalog is `.github/labels.json`. Its label-sync workflow creates `assert: media` in GitHub after this feature is merged into `main`; adding a label definition in a Draft branch alone does not create the label on GitHub.
