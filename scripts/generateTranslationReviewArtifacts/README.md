# Scoped PR review Markdown generation

`generate-translation-review-artifacts.mjs` creates **only** the requested reference family and scope. It never implicitly generates all textbooks, Lessons, UI Kit strings or supported languages at once. The only write target is `.agent-ci-artifacts/` on an agent PR branch.

## Commands for PR comments

After the owner authorizes the relevant review, a GitHub user with repository `write`, `maintain`, or `admin` permission may post the following commands on a same-repository **Draft agent PR**. The workflow checks real repository permissions through GitHub's API, not the commenter's `author_association`:

```text
/agent-artifacts generate skills content/astronomy it
/agent-artifacts generate skills content/astronomy
/agent-artifacts generate lessons content/math it
/agent-artifacts generate lessons content/math
/agent-artifacts generate assessment-methods it
/agent-artifacts generate ui-kit audio it
/agent-artifacts generate ui-kit all it
/agent-artifacts generate geography-home-copy it
/agent-artifacts generate education-standards uk
/agent-artifacts generate education-standards
/agent-artifacts cleanup
```

For Skills, an omitted locale selects the registered textbook language roster; for Lessons, it selects **each discovered Lesson's own `params.languages`**. With a locale specified, only that locale is requested. Selecting one textbook never traverses or generates Markdown for another textbook. `ui-kit all` is an explicit request for all UI Kit component dictionaries; omitting its locale selects every registered language, and specifying a component selects only that component. Standalone references similarly accept an optional locale. EducationStandard is a global catalog owned by `shared/education-standards`, and its omission selects precisely the canonical language roster. It requires the catalog from PR #640 to be available on the checked-out source branch. There is intentionally **no** no-argument `/agent-artifacts generate` command.

The workflow's manual dispatch inputs select the same fields and additionally support an optional single Lesson UUID. Local equivalent:

```sh
node scripts/generateTranslationReviewArtifacts/generate-translation-review-artifacts.mjs --kind skills --package content/astronomy --locale it
node scripts/generateTranslationReviewArtifacts/generate-translation-review-artifacts.mjs --kind lessons --package content/math
node scripts/generateTranslationReviewArtifacts/generate-translation-review-artifacts.mjs --kind lessons --package content/playground --locale uk --lesson d3048d21-8690-5255-b62c-984c69ac272c
node scripts/generateTranslationReviewArtifacts/generate-translation-review-artifacts.mjs --kind education-standards --locale uk
```

## Execution boundaries

The workflow installs locked Node dependencies. It builds Engine **only for Lessons or EducationStandard**, whose typed authoring data must load through Engine; for EducationStandard it also builds the global `@svitlo/education-standards` package and reads only its build-only exports. The EducationStandard adapter inspects typed source statically to represent absent draft locales as `%%MISSING%%`; complete entries are cross-checked with the Build API before marking a document review-ready.  Skills/UI Kit/Assessment Methods/Geography preview generators statically read Code and do not require an Engine build. Generator unit tests and unrelated Playground smoke tests belong in ordinary development CI, **not** in every document-generation request.

Each generation **replaces** the previous temporary `.agent-ci-artifacts/` library with only the newly requested documents and a version-3 `manifest.json`. The manifest records `scope`, `sourceCommit`, per-document `locale`, `missing` and `reviewReady` where available, plus failures. Partial Skills/UI Kit/Geography/Assessment Methods previews may contain `%%MISSING%%` but strict authored content, runtime publication and independent linguistic-review gates are unchanged. A failed or missing requested document is not review-ready.

The EducationStandard reference is `.agent-ci-artifacts/education-standards/<language>.md`: each record carries immutable UUID, original official name and language, jurisdiction/edition, primary source URL, English methodology, selected localized short description and its canonical Code source link. A source/index mismatch, broken build or malformed metadata is recorded as a failure; a missing draft locale is counted and blocks only that language's document. Structural readiness does **not** imply linguistic or legal approval.

The low-privilege worker generates files; the trusted publishing job checks the manifest and writes **only** `.agent-ci-artifacts/` to the PR's source branch. The `cleanup` command deletes those temporary files before merge. Never merge temporary references into an integration branch or `main`.
