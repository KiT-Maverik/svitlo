# Review Translation Skill

**Status:** Active. Read-only linguistic review of generated, Code-derived educational content.

**New entity production:** For Course, Episode, Lesson, Questions and Flashcards, use the **existing entity-owned PR and branch** for translations and independent linguistic review. No new translator PR, reviewer PR/branch, translation integration PR or Production Issue is created. Follow its own Stage workflow and [Technical Translation](./technical-translation.skill.md). The owner authorizes the review start, precise entity × locale scope and pinned source SHA; a **different agent/chat context** reviews independently and may fix only expressly authorized localized fields **on that same entity PR**. For unrelated non-entity campaigns, follow [Manage Translation Production](./manage-translation-production.skill.md) and its owner-selected working PR. Preserve historical Issue/PR campaigns using [legacy recovery](./legacy-production-issues.md) rather than silently changing their topology or permissions.

**HARD STOP — missing generator or artifacts:** Before any production review, identify the **working entity-specific localized Markdown generator** and verify it covers the exact assigned entity kind, nesting, fields and locale codes. If it is absent, unsupported or fails; or if the required generated per-locale document is missing/incomplete/stale, **STOP the review immediately**. Report the **exact missing script/adapter, entity IDs/paths, languages and required repair in the chat**, record the blocker in the **existing entity PR** (or the authorized non-entity campaign's working PR; also preserve any actual historical Issue), and do not mark review complete. **Do not replace the required localized artifact with manual navigation through Code files or fabricate generated content.** This gate also applies if an existing reference library contains some other entity kinds but not the one requested.

**Mandatory first action:** Read [Technical Translator Persona](../../personas/technical-translator.persona.md) **in full**, relevant repository `AGENTS.md`, and applicable textbook/domain instructions. Review Translation is a **linguistic and terminological** role. It does not require TypeScript expertise: code navigation, CI generation, and later typed edits are separate mechanisms.

## PURPOSE

Review one or more Svitlo localizations **by reading generated Markdown reference documents** derived from canonical typed entities. These documents contain domain/group/skill hierarchy, localized names, any localized user-facing descriptions, **canonical English methodological meaning**, and links back to the original `*.data.ts` files.

**Source of truth for Skills:** `content/<textbook>/data/skills/`. For Lessons, Courses and other locale-bearing types, verify the actual canonical paths and equivalent entity-specific generator; do not assume that a Skills taxonomy Markdown renders their content. Generated Markdown is temporary, disposable, **not** an editorial source and must never be manually corrected in place.

## Canonical review record and local language decisions

Completed review evidence is recorded in the **entity-owned `review.ts`** (for Lessons: the root `review.ts` beside `index.ts`, typed `LessonReview` when Stage 6 is implemented), **not** in per-entity/per-language Markdown review reports. Generated run-scoped Actions `*.md` is a temporary read-only _input_ to reviews, never the permanent review result.

For Lesson AI localization review, `ai.locales` is **one numeric PR** referencing the verified entity-owned Lesson PR for new work, recorded only after **all** intended Lesson languages have actually been independently reviewed and the scope/assembled Props revision verified. Do not fabricate separate translator/reviewer PRs to populate this field or treat generating all languages as reviewing all languages. Human linguistic review is recorded separately in `human.locales[language]` as that language's verified PR where actually applicable; other entity kinds follow their **actual** available Engine Review contract, never a fabricated Lesson-specific shape.

When a linguistic review reaches a decision **specific to this reviewed entity/locale**, put a concise `//` comment **immediately above the PR-valued field** in that entity's `review.ts` explaining the chosen wording/terminology and reason, for example:

```ts
human: {
  locales: {
    // This Lesson uses the localized classroom term rather than the general glossary synonym.
    uk: 1234,
  },
},
```

For a Lesson AI-wide `ai.locales` PR, put any applicable short locale-specific note immediately above its numeric entry, identifying the affected locale in the comment. Do **not** copy a full linguistic report, invent sign-off, or write the same decision into every entity; shared glossary/orthography decisions belong in global canonical guidance. Reviewer agents remain **read-only** by default: the authorized entity coordinator (or non-entity campaign coordinator) records verified PR references and comments after review gates, source revision, and real sign-off checks. If `review.ts` or stable assembled Props do not yet exist, preserve precise results in the **same entity PR** (or other authorized working PR, and a historical Issue only when it exists) until the record can be populated; **do not create substitute review Markdown**. A PR reference denotes evidence, not proof of approval by itself.

## ONE CANONICAL REPORT ARTIFACT

All agents retrieve **the actual ZIP from the successful, authorized GitHub Actions run**. There is no PR-tracked reference folder or generated-document commit. The ZIP has `manifest.json` and only the requested family/locale Markdown, with archive-root-relative paths:

```text
manifest.json
taxonomies/<textbook>/<locale>.md
lessons/<textbook>/<bucket>/<lesson-uuid>/<locale>.md
questions/<textbook>/<bucket>/<lesson-uuid>/<locale>.md
courses/<textbook>/<bucket>/<course-uuid>/<locale>.md
assessment-methods/<locale>.md
ui-kit/<component>/<locale>.md
geography-home-copy/<locale>.md
education-standards/<locale>.md
```

Generation is **scoped to the requested entity family, textbook and optional language or UUID**. Generating multiple languages never means reviewing all of them. The scope dispatcher uses the Engine language roster; each generator is verified independently for its entity kind. The manifest includes exact `sourceCommit`, `pr`, `runId`, `scope`, `generated[]`, `failures[]` and per-file `sha256` and `bytes`. `%%MISSING%%` is a draft-preview marker, not an approved translation. The latest run artifact expires after **one day**.

## GET OR REFRESH THE LIBRARY (ON DEMAND)

**The agent decides whether fresh reference material is needed and starts generation itself.** PR comments trigger the default-branch workflow only after its YAML has reached **`develop` (the default branch)**. The working PR must exist first. For Course/Lesson/Questions/Flashcards use the **current entity PR** and its pinned source SHA. Separately authorized non-entity campaigns use the owner-selected existing working PR; historical Issue/PR coordination is preserved.

An authorized PR comment triggers the existing [Agent CI Artifacts](../../../.github/workflows/agent-ci-artifacts.yml) workflow:

```text
/agent-artifacts generate skills content/astronomy qm
/agent-artifacts generate lessons content/math uk
/agent-artifacts generate questions content/astronomy qm
/agent-artifacts generate assessment-methods it
/agent-artifacts generate ui-kit audio it
/agent-artifacts generate geography-home-copy it
```

The owner-authorized commenter must have actual `write`, `maintain` or `admin` access, verified through GitHub's collaborator-permission API. The workflow resolves the same-repository open PR and immutable HEAD before checking out PR source with read-only credentials. It builds the selected reference only, validates scope/provenance/document hashes, then uploads a ZIP to **that exact Actions run**. It does not push source changes, and no user file upload is necessary.

Find the resulting run through GitHub Actions or the connected GitHub run API, confirm the generating job succeeded, list its artifacts, download the correct run's ZIP and extract it. Check `manifest.runId`/`pr`/`sourceCommit` against the actual run, working PR and reviewed HEAD; check locale/entity scope, document readiness, all referenced files, hashes and absence of relevant failures. **Stop the review** if the report is missing, expired, stale, unsafe or incomplete. Never reuse an older successful artifact after source edits. Older PR branches may need an update to the current report generator.

### Alternative: local repository checkout

```bash
node scripts/generateTranslationReviewArtifacts/generate-translation-review-artifacts.mjs --kind skills --package content/astronomy --locale qm
```

Local references are written to ignored `temp/agent-reference-library/`; in CI they are under `$RUNNER_TEMP/agent-reference-library/`. They are read-only, disposable previews, not authored sources. If no generator can actually be executed, report the blocker rather than claiming a successful review.

## REVIEW PROCESS

1. **Resolve scope and source.** Confirm the owner's specific review authorization, **different reviewer agent/context**, assigned entity IDs, locale, **existing entity PR** (or separately authorized non-entity campaign working PR), and exact current source SHA. Preserve any historical PR/Issue source constraints. Generate/refresh the relevant manifest and documents when needed; validate source provenance and the scoped hard stop.
2. **Select only useful documents.** Generate just the assigned scope, then read the **entity-appropriate localized Markdown** paths listed in the manifest: `taxonomies/<textbook>/<locale>.md` for Skills, actual `lessons/...` paths for Lessons, `assessment-methods/<locale>.md` for Assessment Methods, or a separately verified generator for other kinds. Verify source SHA, complete requested entity IDs and no relevant failures before reviewing. Do not infer Course/UI Kit support from the taxonomy generator; optionally read comparison languages. For long views, process sections/domains in batches while keeping a shared glossary and a single cumulative issue log. Do not demand user prompts for the next domain or artifact.
3. **Audit all assigned entities.** Compare every translated title and available frontend description against the English methodological definition and educational context; evaluate accuracy, grammar, orthography, tone, age appropriateness, ambiguity, false friends, scientific terminology and internal consistency across domains.
   Apply the Persona's **Learner Address & Register** policy when evaluating student-directed wording. Check the locale's natural educational register and whether singular/plural conveys real audience meaning; do not label an acceptable alternative as a definite error just because another domain uses a different form.
4. **Apply language-specific guidance.** For Crimean Tatar (`qm`), follow the Persona's **Crimean Tatar → international → Turkish** hierarchy, approved Latin spelling and provisional-review policy. A carefully adapted Turkish **technical term** may be appropriate, but Turkish entire sentences are not Crimean Tatar localization.
5. **Produce actionable findings.** Cite specific textbook, locale, canonical code link/path, field (`name.<locale>` or `description.frontend.<locale>`), current wording, recommended wording, rationale, confidence, severity and sources actually checked. Differentiate definite errors from plausible linguistic variants or unverified proposals. No false native-speaker or standards certifications. **Report separate counts for semantic/scientific errors, linguistic/terminology errors, and style/register-only harmonizations.** For address-form inconsistencies, record the locale-specific editorial rule and representative examples; do not interpret bulk style harmonization as many independent translation failures.
6. **Apply corrections only when explicitly authorized.** Review itself is read-only; the owner can authorize the independent reviewer to change scoped canonical locale fields **on the same entity PR branch**. For non-entity or historical campaigns, use only the working PR/branch specifically authorized by their coordinator. Follow [Technical Translation](./technical-translation.skill.md), avoid overlapping edits, regenerate source-pinned references and independently re-review corrected material.
7. **Report coherent results.** Record reviewed entity count, terminology decisions, findings, review verdict and exact source/review SHAs **in the existing entity PR** (or the authorized non-entity working PR; retain historical Issue evidence where applicable). The authorized coordinator later fills canonical `review.ts` references where supported. **Do not automatically merge anything because linguistic review passed.** When the authorized entity workflow is complete and reviewable, the agent marks its existing PR Ready and verifies applicable target-specific CI; the owner separately authorizes merge after real gates. Non-entity and historical campaigns retain their explicit integration permissions.

## Actions artifact retention and legacy merge safety

New reference reports are never committed. There is **no `/agent-artifacts cleanup` command or Ready-for-review cleanup hook**; the ZIP expires from GitHub Actions after one day. Keep only canonical source corrections and verified review evidence in the PR. Never merge generated Markdown or an extracted report ZIP into source history.

The standalone `Agent CI Artifacts / clean` workflow has been deleted. For legacy PR branches with **previously tracked** report files, remove them in an ordinary source commit before merging; new diagnostic jobs do not edit PR HEAD. The owner must remove the deleted status from protected-branch rulesets **before merge** while retaining all other checks and protection.

## ACCEPTANCE AND LIMITATIONS

A completed language review is supported by actually reading the requested view(s), comparing with source meaning, reporting traceable issues and accurately stating what has or has not been verified. A green CI check, present locale keys or generated Markdown alone **does not** establish native-quality translation. Record failed documents from the manifest. The reviewer does not need to inspect all other languages just because generation produced them.

**The infrastructure is reusable:** new read-only report families must use the same scoped, read-only, one-day Actions artifact pattern with explicit source/run/scope bindings and no PR report commits. Extend generators through separately reviewed CI changes.

### Integration-branch artifact integrity

Generate only for the **authorized working PR**—for Course, Episode, Lesson, Questions and Flashcards, the **existing entity PR**, not a new translator/reviewer PR. Other campaigns use their actually authorized working PR and source SHA. Validate `manifest.json` against that exact source revision, locale, entity coverage, `reviewReady` and hashes; regenerate after corrections. New reports never enter Git history. If a historical PR contains tracked report files, remove them through an explicit source commit before merge. Review findings and revision evidence belong in the working PR and canonical `review.ts` where supported.
