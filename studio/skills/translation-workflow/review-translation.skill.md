# Review Translation Skill

**Status:** Active. Read-only linguistic review of generated, Code-derived educational content.

**New Course/Lesson/Questions/Flashcards localizations:** Follow [Manage Translation Production](./manage-translation-production.skill.md) and the **existing entity-owned PR** with its exact frozen entity × locale scope. For historical Issue/PR campaigns preserve the [legacy protocol](./legacy-production-issues.md). Only the owner authorizes review start, different reviewer/context, source PR/SHA and scope. There is no separate translator, integration or reviewer PR for these entity types; independence is between **people/agent contexts and a pinned source revision**, not branches.

**HARD STOP — missing generator or artifacts:** Before any production review, identify the **working entity-specific localized Markdown generator** and verify it covers the exact assigned entity kind, nesting, fields and locale codes. If it is absent, unsupported or fails; or if the required generated per-locale document is missing/incomplete/stale, **STOP the review immediately**. Explicitly report the **exact missing script/adapter, entity IDs/paths, languages and required repair in the chat**, record the blocked state in the parent Issue, and do not mark review complete. **Do not replace the required localized artifact with manual navigation through Code files or fabricate generated content.** This gate also applies if an existing reference library contains some other entity kinds but not the one requested.

**Mandatory first action:** Read [Technical Translator Persona](../../personas/technical-translator.persona.md) **in full**, relevant repository `AGENTS.md`, and applicable textbook/domain instructions. Review Translation is a **linguistic and terminological** role. It does not require TypeScript expertise: code navigation, CI generation, and later typed edits are separate mechanisms.

## PURPOSE

Review one or more Svitlo localizations **by reading generated Markdown reference documents** derived from canonical typed entities. These documents contain domain/group/skill hierarchy, localized names, any localized user-facing descriptions, **canonical English methodological meaning**, and links back to the original `*.data.ts` files.

**Source of truth for Skills:** `content/<textbook>/data/skills/`. For Lessons, Courses and other locale-bearing types, verify the actual canonical paths and equivalent entity-specific generator; do not assume that a Skills taxonomy Markdown renders their content. Generated Markdown is temporary, disposable, **not** an editorial source and must never be manually corrected in place.

## Canonical review record and local language decisions

Completed review evidence is recorded in the **entity-owned `review.ts`** (for Lessons: the root `review.ts` beside `index.ts`, typed `LessonReview` when Stage 6 is implemented), **not** in per-entity/per-language Markdown review reports. Generated `.agent-ci-artifacts/**/*.md` is a temporary read-only _input_ to reviews, never the permanent review result.

For Lesson AI localization review, `ai.locales` is **one numeric PR**: the **entity PR** whose complete intended Lesson languages were actually independently reviewed at verified source/assembled Props revisions. Never infer review from generation alone. Human linguistic review is recorded separately in `human.locales[language]` as the **same entity PR number** for that approved language when the actual Engine type supports it; reviewer identity, evidence SHA and independence are recorded in that PR tracker, not encoded by a distinct PR number. Other entity types follow their real Review contract.

When a linguistic review reaches a decision **specific to this reviewed entity/locale**, put a concise `//` comment **immediately above the PR-valued field** in that entity's `review.ts` explaining the chosen wording/terminology and reason, for example:

```ts
human: {
  locales: {
    // This Lesson uses the localized classroom term rather than the general glossary synonym.
    uk: 1234,
  },
},
```

For a Lesson AI-wide `ai.locales` PR, put any applicable short locale-specific note immediately above its numeric entry, identifying the affected locale in the comment. Do **not** copy a full linguistic report, invent sign-off, or write the same decision into every entity; shared glossary/orthography decisions belong in global canonical guidance. Reviewer agents remain **read-only** by default: the authorized entity coordinator records verified PR references and comments after review gates, source revision, and real sign-off checks. If `review.ts` or stable assembled Props do not yet exist, preserve precise results and PR links in the same entity PR (and an existing historical Issue if one exists) until the record can be populated; **do not create substitute review Markdown**. A PR reference denotes evidence, not proof of approval by itself.

## ONE CANONICAL GENERATED LIBRARY

All agents share the repository-level temporary folder. The existing generator may emit several entity kinds, but **review is allowed only for the kinds actually supported by the current code and manifest**:

```text
.agent-ci-artifacts/
  manifest.json
  assessment-methods/
    <language>.md
  lessons/
    <textbook>/<bucket>/<lesson-slug>/<language>.md
  taxonomies/
    astronomy/
      qm.md
      en.md
      tr.md
      ...
    biology/
      qm.md
      ...
    <other textbooks with Code Skills taxonomies>/
      <every supported language key>.md
```

Generation is **scoped by entity family and, for Skills/Lessons, textbook**. Supplying a language generates only that language; omitting it generates only the selected textbook's registered Skills locales or each Lesson's declared `params.languages`. It never implicitly generates other textbooks or entity families. **Generating multiple languages does not mean reviewing or altering all languages.** If the task is to review Crimean Tatar Astronomy, read `.agent-ci-artifacts/taxonomies/astronomy/qm.md`; use other Markdown files only when they materially help terminology comparison.

The scope dispatcher reads the current Engine language roster. The global EducationStandard catalog has its own `education-standards/<language>.md` adapter (only available after the code and catalog dependency are merged); the same source-SHA, completeness and independent-review gates apply. Skills use [Skills Code → Markdown](../../../shared/engine/scripts/generateSkillsTaxonomy/generate-skills-taxonomy.mjs), Lessons use [Lesson Code → Markdown](../../../shared/engine/scripts/generateLessonsMarkdown/generate-lessons-markdown.mjs), and Assessment Methods, UI Kit dictionaries and Geography home copy have explicit standalone adapters. Courses require a separately verified generator. It rewrites source links for the temporary directory. `manifest.json` records which files were actually generated, which failed, and the exact source commit. **Do not assume 100% generation coverage if the manifest contains failures.** Never fabricate missing artifacts.

## GET OR REFRESH THE LIBRARY (ON DEMAND)

**The agent decides whether fresh reference material is needed and starts generation itself, rather than asking the user to generate one language after another.** It is **not** automatically generated for every commit or PR; ordinary PR validation stays independent.

### Preferred: CI on a specific PR branch

**A PR must already exist before its comment can trigger CI.** For new Course/Lesson/Questions/Flashcards work, that is the **already existing entity PR**. Generate and review on its current branch at the owner-authorized pinned source SHA; do not start a separate translator/reviewer branch, new seed PR, or PR solely to host reference files. Keep it Draft for content authoring unless the owner explicitly authorizes Ready for CI/merge. The same scoped generator and trusted cleanup commands work on an open same-repository PR.

A single **permanent** workflow, [Agent CI Artifacts](../../../.github/workflows/translation-review.yml), accepts an owner-authorized command posted in the PR conversation:

```text
/agent-artifacts generate skills content/astronomy qm
/agent-artifacts generate lessons content/math uk
/agent-artifacts generate assessment-methods it
/agent-artifacts generate ui-kit audio it
/agent-artifacts generate geography-home-copy it
```

The workflow resolves the PR, checks out its **current head commit** (not necessarily `main`), generates **only the selected reference family, textbook and requested locale(s)** on an isolated read-only worker, and then commits the resulting `.agent-ci-artifacts/` files **only to the same PR branch**. The agent can read them directly through GitHub as ordinary files, by exact path. It does **not** need the user to upload the Markdown. For manual execution, GitHub Actions → **Agent CI Artifacts** → **Run workflow** requires the PR number, `generate` and an explicit reference scope (kind, textbook where applicable, optional locale/component/Lesson UUID).

**Important deployment prerequisite:** GitHub only processes `issue_comment` and `workflow_dispatch` from workflows present on the **default branch**. If this workflow has not yet been merged into `main`, comment commands will not run. Do not claim a CI job exists or was triggered. In that situation, use a checkout/local execution, or report the activation prerequisite. On first adoption, merge the workflow infrastructure via a clean PR with no `.agent-ci-artifacts/` data; only then run it for translation-review PRs.

**Authentication:** PR comment commands require the author's current repository permission to be `write`, `maintain`, or `admin`, verified through the GitHub collaborator-permission API. GitHub maps the `maintain` role to `permission: write`; `author_association` alone is not authorization. Failed lookups and read-only users are rejected. An authorized GitHub connector account can post the same commands. Check the actual Actions run rather than presuming the comment started CI. Only in-repository, open PR branches can be modified. The generation worker cannot push source edits; the separate publish job only commits reference materials. A stale job whose source branch has advanced will fail to push rather than overwrite newer work.

### Alternative: agent with local repo checkout

From the repository root, run:

```bash
node scripts/generateTranslationReviewArtifacts/generate-translation-review-artifacts.mjs --kind skills --package content/astronomy --locale qm
```

This generates only the requested scope into `.agent-ci-artifacts/` locally. Omit `--locale` only when the assigned review needs all languages available in that scope. The agent may use these documents in the local checkout. If GitHub access is only via a file-reading connector and no workflow has been activated, do **not** pretend local execution occurred.

For Flashcard Bank translation, use the scoped [Flashcard Bank reference adapter](../../../shared/engine/scripts/generateFlashcardReviewArtifacts/README.md), not the separate Lesson `--purpose flashcards` design context. Verify every bank card, including front/back/hint, localized flags, source UUIDs and missing fields at the pinned source SHA. Check real default-branch Action support before issuing `/agent-artifacts generate flashcards`; if not yet deployed, run the local read-only adapter or record the exact scoped blocker.

## REVIEW PROCESS

1. **Resolve scope and source.** Confirm the owner's specific review authorization, reviewer independence, assigned entity IDs, locale, working PR, and current head SHA. For entity-owned work, review the **same existing Course/Lesson/Questions/Flashcards PR** at its expressly selected unmerged source SHA. Generate/refresh the relevant manifest and documents only when needed; validate source provenance and the scoped hard stop.
2. **Select only useful documents.** Generate just the assigned scope, then read the **entity-appropriate localized Markdown** paths listed in the manifest: `taxonomies/<textbook>/<locale>.md` for Skills, actual `lessons/...` paths for Lessons, `assessment-methods/<locale>.md` for Assessment Methods, or a separately verified generator for other kinds. Verify source SHA, complete requested entity IDs and no relevant failures before reviewing. Do not infer Course/UI Kit support from the taxonomy generator; optionally read comparison languages. For long views, process sections/domains in batches while keeping a shared glossary and a single cumulative issue log. Do not demand user prompts for the next domain or artifact.
3. **Audit all assigned entities.** Compare every translated title and available frontend description against the English methodological definition and educational context; evaluate accuracy, grammar, orthography, tone, age appropriateness, ambiguity, false friends, scientific terminology and internal consistency across domains.
   Apply the Persona's **Learner Address & Register** policy when evaluating student-directed wording. Check the locale's natural educational register and whether singular/plural conveys real audience meaning; do not label an acceptable alternative as a definite error just because another domain uses a different form.
4. **Apply language-specific guidance.** For Crimean Tatar (`qm`), follow the Persona's **Crimean Tatar → international → Turkish** hierarchy, approved Latin spelling and provisional-review policy. A carefully adapted Turkish **technical term** may be appropriate, but Turkish entire sentences are not Crimean Tatar localization.
5. **Produce actionable findings.** Cite specific textbook, locale, canonical code link/path, field (`name.<locale>` or `description.frontend.<locale>`), current wording, recommended wording, rationale, confidence, severity and sources actually checked. Differentiate definite errors from plausible linguistic variants or unverified proposals. No false native-speaker or standards certifications. **Report separate counts for semantic/scientific errors, linguistic/terminology errors, and style/register-only harmonizations.** For address-form inconsistencies, record the locale-specific editorial rule and representative examples; do not interpret bulk style harmonization as many independent translation failures.
6. **Apply corrections only when explicitly authorized.** Review itself is read-only; the entity PR owner (or an existing historical Issue) may authorize the independent reviewer to change canonical typed locale fields in the **working branch** (the same entity PR for both translation and independent review). Follow [Technical Translation](./technical-translation.skill.md), avoid overlapping edits, regenerate and re-review corrected material.
7. **Report coherent results.** Record reviewed entity count, terminology decisions, findings and source SHA in the working PR/Issue. Where the Issue explicitly authorizes immediate integration after review, clean generated artifacts and merge the **same reviewed translator PR** after satisfying scoped validation and actual GitHub merge rules; record real merge evidence. The coordinator later fills canonical `review.ts` references where supported.

## REQUIRED CLEANUP BEFORE MERGE

When the review is done, **the agent requests cleanup** through the PR conversation:

```text
/agent-artifacts cleanup
```

The same reusable workflow deletes **all tracked `.agent-ci-artifacts/` files** in that PR branch in a cleanup commit. Switching a draft PR to **Ready for review** also requests cleanup automatically for PRs targeting `main`. The cleanup is deliberate: **do not delete files before the agent finishes reading them**.

GitHub's [Agent CI Artifacts / clean check](../../../.github/workflows/agent-ci-artifacts-guard.yml) runs on **every PR into `main`**, even docs-only PRs, and fails if the directory remains; FastGate also refuses it when FastGate runs. Configure the dedicated check as a **required status check** in the repository's `main` ruleset to guarantee enforcement. While the temporary folder is present, a red merge check is **expected and must not be bypassed**; request cleanup, confirm the directory is gone and the check is green, then merge.

**Do not add the directory to `.gitignore`**: agents must be able to read its files through GitHub while reviewing. Do not create or delete workflow YAML per review, and do not merge generated documents into `main`. CI runners and one-day transport artifacts are disposed of automatically; **the committed PR library remains until the cleanup commit**, so do not confuse runner expiration with Git branch cleanup.

## ACCEPTANCE AND LIMITATIONS

A completed language review is supported by actually reading the requested view(s), comparing with source meaning, reporting traceable issues and accurately stating what has or has not been verified. A green CI check, present locale keys or generated Markdown alone **does not** establish native-quality translation. Record failed documents from the manifest. The reviewer does not need to inspect all other languages just because generation produced them.

**The infrastructure is intentionally reusable:** other agent tasks may eventually put their temporary machine-generated reference documents into `.agent-ci-artifacts/`, with the same generation-on-demand, PR-only commit, and cleanup-before-merge discipline; add new generators through separately reviewed CI changes, not ad hoc one-off jobs.

### Integration-branch artifact integrity

For every new Course/Lesson/Questions/Flashcards translation review, generate on the **existing entity PR**. Verify `manifest.json` `sourceCommit` against the exact reviewed revision and check requested entity × locale coverage, missing fields, `reviewReady`, failures and real source links. After authorized source corrections regenerate affected references and re-review. Use `/agent-artifacts cleanup` and confirm **the entity PR** contains no `.agent-ci-artifacts/` before its owner-approved merge. A no-change review records the evidence in that same PR (and historical Issue only when applicable); temporary Markdown must never be merged into `develop`/`main`.
