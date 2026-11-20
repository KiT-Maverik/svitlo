# Scoped PR review Markdown generation

`generate-translation-review-artifacts.mjs` creates **only** the requested reference family and scope. It never implicitly generates all textbooks, Lessons, UI Kit strings or supported languages at once. The only write target is `.agent-ci-artifacts/` on an agent PR branch.

## Commands for PR comments

After the owner authorizes the relevant review, a GitHub user with repository `write`, `maintain`, or `admin` permission may post the following commands on a same-repository **Draft agent PR**. The workflow checks real repository permissions through GitHub's API, not the commenter's `author_association`:

```text
/agent-artifacts generate skills content/astronomy it
/agent-artifacts generate skills content/astronomy
/agent-artifacts generate lessons content/math it
/agent-artifacts generate lessons content/math
/agent-artifacts generate questions content/playground kk
/agent-artifacts generate courses content/astronomy 1e79d8fc-2223-4fa7-bc64-70d8172d3e8b uk
/agent-artifacts generate courses content/astronomy 1e79d8fc-2223-4fa7-bc64-70d8172d3e8b
/agent-artifacts generate courses content/astronomy
/agent-artifacts generate assessment-methods it
/agent-artifacts generate ui-kit audio it
/agent-artifacts generate ui-kit all it
/agent-artifacts generate geography-home-copy it
/agent-artifacts generate education-standards uk
/agent-artifacts generate education-standards
/agent-artifacts cleanup
```

For Courses, an omitted UUID selects all authored Courses in the textbook and an omitted locale selects each Course's own declared or Stage-5-planned languages. Planned, untranslated locales yield `%%MISSING%%` preview references with `reviewReady: false`; they are not considered published. Course documents contain Course/Module/Chapter localized copy and Episode-owned Sections; standalone Lessons appear only as UUID references. Modular Course references are read statically from authored TypeScript, even if standalone Lesson imports are not yet implemented; dynamic expressions fail explicitly. Course output is scoped to `.agent-ci-artifacts/courses/<book>/<bucket>/<uuid>/<locale>.md`.

For Questions, `/agent-artifacts generate questions content/astronomy qm` selects every
Question in each discovered canonical bank, including members **not selected by a
Quiz**. `--lesson <uuid>` limits the request to one bank. The static adapter
supports both canonical modular `questions/selectOneAnswer/<slug>/index.ts`
(local `content` and imported nested `defineText` blocks such as
`prompt/index.ts`, `correct/<slug>/index.ts`, and `incorrect/<slug>/index.ts`)
and the authored Playground flat `questions/<slug>.ts` bank. It includes the
complete Question prompt, hint, explanation, correct/distractor/incorrect answer
grouping and order, stable IDs, assessment method, all localized Text values and
canonical source links. Relevant Quiz Sections contribute localized `title`,
`navigationLabel`, and complete Section-owned Text/Markdown ContentBlocks,
including physical `<locale>.md` source files, stable IDs, and links.

A representative modular bank is Astronomy Lesson
`c042698a-de5b-5055-9e10-ff5621f80ed7`: **5 Questions, 35 Question Text
fields**, and Quiz `safeSkyChoices` title, navigation label, and `quizIntro`
Markdown per requested locale. Its source language is `uk`, inferred from its
single declared Lesson language. The adapter may generate review references for
`en/pl/qm` independently of this Lesson's currently publishable locale set;
that does **not** grant Lesson publication approval for those languages.
When no unambiguous single source language is declared, the adapter uses
`en` as the comparison source.

The manifest records `questionStrings`, `quizStrings`, the total localized
fields, `missing` and `reviewReady`; it is pinned to the actual reviewed
source HEAD and rejected by the trusted publisher if stale or incomplete.
Unresolved/unsafe imports, missing physical Markdown, duplicate IDs, and
unsupported authoring constructs fail closed. Missing target text is shown
explicitly as `%%MISSING%%` with `reviewReady: false`. Output remains
`.agent-ci-artifacts/questions/<book>/<bucket>/<lesson-uuid>/<locale>.md`.
Always clean these temporary artifacts before merging. Generated references
are **review input**, never independent linguistic sign-off.

For Skills, an omitted locale selects the registered textbook language roster; for Lessons, it selects **each discovered Lesson's own `params.languages`**. With a locale specified, only that locale is requested. Selecting one textbook never traverses or generates Markdown for another textbook. `ui-kit all` is an explicit request for all UI Kit component dictionaries; omitting its locale selects every registered language, and specifying a component selects only that component. Standalone references similarly accept an optional locale. EducationStandard is a global catalog owned by `shared/ui-kit/data/definitions/educationStandards`, and its omission selects precisely the canonical language roster. The build-time source catalog is owned by UI Kit definitions. There is intentionally **no** no-argument `/agent-artifacts generate` command.

The workflow's manual dispatch inputs select the same fields and additionally support an optional single Lesson UUID. Local equivalent:

```sh
node scripts/generateTranslationReviewArtifacts/generate-translation-review-artifacts.mjs --kind skills --package content/astronomy --locale it
node scripts/generateTranslationReviewArtifacts/generate-translation-review-artifacts.mjs --kind lessons --package content/math
node scripts/generateTranslationReviewArtifacts/generate-translation-review-artifacts.mjs --kind courses --package content/astronomy --course 1e79d8fc-2223-4fa7-bc64-70d8172d3e8b --locale uk
node scripts/generateTranslationReviewArtifacts/generate-translation-review-artifacts.mjs --kind lessons --package content/playground --locale uk --lesson d3048d21-8690-5255-b62c-984c69ac272c
node scripts/generateTranslationReviewArtifacts/generate-translation-review-artifacts.mjs --kind questions --package content/astronomy --lesson c042698a-de5b-5055-9e10-ff5621f80ed7 --locale qm
node scripts/generateTranslationReviewArtifacts/generate-translation-review-artifacts.mjs --kind education-standards --locale uk
```

## Canonical Skills links and older PR source revisions

Skills reference Markdown is generated from the textbook's canonical Code modules.
The PR-scoped dispatcher rewrites links from the generator's
`content/<book>/docs/generated/skills` location to
`content/<book>/data/skills/**` relative to
`.agent-ci-artifacts/taxonomies/<book>/<locale>.md`.
This covers modern Domain/Group `index.ts`, Skill `<slug>.ts`,
and legacy `*.data.ts` files. A generated reference with links under
`../../../data/skills/` is stale: those paths do **not** point to authored
Code from the PR-scoped reference location.

The trusted publisher accepts an absent optional `manifest.scope.course`
only for **non-Course** requests created by older translator branches.
Course requests still require the explicit Course-aware manifest contract;
other scope and document checks are unchanged. The publisher's validator stays
inline in the trusted GitHub workflow and does not execute PR-branch scripts.

PR comments execute the workflow from the repository's **default branch**,
but the read-only generator runs from the **source PR head**. Therefore both
the publisher fix must be merged into `main` **and** any older source PR
must incorporate the dispatcher link fix before regenerating references.
Do not treat generation or successful CI as linguistic review.

## Execution boundaries

The workflow installs locked Node dependencies. It builds Engine **only for Lessons, Courses or fully translated EducationStandard catalogs**. For a complete EducationStandard catalog it verifies the authored UI Kit definitions against Engine's Build API in memory without publishing source JavaScript. For incomplete drafts it skips the TypeScript build and uses safe static Code inspection to render absent translations as `%%MISSING%%`, without bypassing Engine's strict publication rules. A locale can be ready for linguistic review even when other locales remain incomplete. Skills/UI Kit/Assessment Methods/Geography preview generators statically read Code and do not require an Engine build. Generator unit tests and unrelated Playground smoke tests belong in ordinary development CI, **not** in every document-generation request.

Each generation **replaces only the generated reference-document portion** of `.agent-ci-artifacts/` with the requested documents and a version-3 `manifest.json`. It preserves independently produced `.agent-ci-artifacts/lesson-lookup/` and `.agent-ci-artifacts/engine-coverage/` diagnostics from the same PR, which are also committed temporarily to that branch. The manifest records `scope`, `sourceCommit`, per-document `locale`, `missing` and `reviewReady` where available, plus failures. Partial Skills/UI Kit/Geography/Assessment Methods previews may contain `%%MISSING%%` but strict authored content, runtime publication and independent linguistic-review gates are unchanged. A failed or missing requested document is not review-ready.

The EducationStandard reference is `.agent-ci-artifacts/education-standards/<language>.md`: each record carries immutable UUID, original official name and language, jurisdiction/edition, primary source URL, English methodology, selected localized short description and its canonical Code source link. A source/index mismatch, broken build or malformed metadata is recorded as a failure; a missing draft locale is counted and blocks only that language's document. Structural readiness does **not** imply linguistic or legal approval.

The low-privilege worker generates files; the trusted publishing job checks the manifest and writes **only** `.agent-ci-artifacts/` to the PR's source branch. The `cleanup` command deletes those temporary files before merge. Never merge temporary references into an integration branch or `main`.
