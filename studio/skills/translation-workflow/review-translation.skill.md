# Review Translation Skill

**Status:** Active. Read-only linguistic review of generated, Code-derived educational content.

**Mandatory first action:** Read [Technical Translator Persona](../../personas/technical-translator.persona.md) **in full**, relevant repository `AGENTS.md`, and applicable textbook/domain instructions. Review Translation is a **linguistic and terminological** role. It does not require TypeScript expertise: code navigation, CI generation, and later typed edits are separate mechanisms.

## PURPOSE

Review one or more Svitlo localizations **by reading generated Markdown reference documents** derived from canonical typed entities. These documents contain domain/group/skill hierarchy, localized names, any localized user-facing descriptions, **canonical English methodological meaning**, and links back to the original `*.data.ts` files.

**Source of truth:** `learningApps/<textbook>/data/skills/`. Generated Markdown is temporary, disposable, **not** an editorial source and must never be manually corrected in place.

## ONE CANONICAL GENERATED LIBRARY

All agents share the repository-level temporary folder:

```text
.agent-ci-artifacts/
  manifest.json
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

One generation always attempts **every available textbook taxonomy in every registered language**. There is **no user-facing option to generate one book, one domain, or one locale**. The agent simply picks the documents it needs from this complete reference library, according to its assigned scope. **Generating all languages does not mean reviewing or altering all languages.** If the task is to review Crimean Tatar Astronomy, read `.agent-ci-artifacts/taxonomies/astronomy/qm.md`; use other Markdown files only when they materially help terminology comparison.

The generator reads `shared/contracts/src/types/languages.ts` for the real language roster and auto-discovers textbooks with `learningApps/*/data/skills`. It uses the established read-only [Code → Markdown generator](../../../scripts/generate-skills-taxonomy.mjs) in `--stdout` mode, then rewrites canonical source links for the temporary directory. `manifest.json` records which files were actually generated, which failed, and the exact source commit. **Do not assume 100% generation coverage if the manifest contains failures.** Never fabricate missing artifacts.

## GET OR REFRESH THE LIBRARY (ON DEMAND)

**The agent decides whether fresh reference material is needed and starts generation itself, rather than asking the user to generate one language after another.** It is **not** automatically generated for every commit or PR; ordinary PR validation stays independent.

### Preferred: CI on a specific PR branch

**A PR must already exist before its comment can trigger CI.** If starting a review with no source changes yet, create a branch from the current `main`, add a small **temporary** `.agent-ci-artifacts/review-request.md` marker (review purpose only), and open a **draft PR** into `main`. This seed marker is overwritten by generation and deleted during final cleanup; it must never be merged. Keep the PR in **Draft** while reviewing, since marking it Ready for review initiates cleanup.

A single **permanent** workflow, [Agent CI Artifacts](../../../.github/workflows/translation-review.yml), accepts an owner-authorized command posted in the PR conversation:

```text
/agent-artifacts generate
```

The workflow resolves the PR, checks out its **current head commit** (not necessarily `main`), generates **all** taxonomies × languages on an isolated read-only worker, and then commits the resulting `.agent-ci-artifacts/` files **only to the same PR branch**. The agent can read them directly through GitHub as ordinary files, by exact path. It does **not** need the user to upload the Markdown. For manual execution, GitHub Actions → **Agent CI Artifacts** → **Run workflow** takes a PR number and `generate` operation.

**Important deployment prerequisite:** GitHub only processes `issue_comment` and `workflow_dispatch` from workflows present on the **default branch**. If this workflow has not yet been merged into `main`, comment commands will not run. Do not claim a CI job exists or was triggered. In that situation, use a checkout/local execution, or report the activation prerequisite. On first adoption, merge the workflow infrastructure via a clean PR with no `.agent-ci-artifacts/` data; only then run it for translation-review PRs.

**Authentication:** PR comments trigger only if authored by the repository **OWNER**; a GitHub connector posting as the owner's account can submit that command. Check the actual Actions run rather than presuming the comment started CI. Only in-repository, open PR branches can be modified. The generation worker cannot push source edits; the separate publish job only commits reference materials. A stale job whose source branch has advanced will fail to push rather than overwrite newer work.

### Alternative: agent with local repo checkout

From the repository root, run:

```bash
node scripts/generate-translation-review-artifacts.mjs
```

This runs exactly the same all-taxonomies/all-locales generation and populates `.agent-ci-artifacts/` locally. The agent may use these documents in the local checkout. If GitHub access is only via a file-reading connector and no workflow has been activated, do **not** pretend local execution occurred.

## REVIEW PROCESS

1. **Resolve scope and source.** Determine the assigned textbook(s), locale(s), branch/PR, and authoritative English meaning. Locate `manifest.json`; generate/refresh once if missing or stale relative to the intended source. Record the commit to which the generated documents refer.
2. **Select only useful documents.** The complete library is generated, but the reviewer reads the relevant `taxonomies/<textbook>/<locale>.md` views; optionally read comparison languages. For long views, process sections/domains in batches while keeping a shared glossary and a single cumulative issue log. Do not demand user prompts for the next domain or artifact.
3. **Audit all assigned entities.** Compare every translated title and available frontend description against the English methodological definition and educational context; evaluate accuracy, grammar, orthography, tone, age appropriateness, ambiguity, false friends, scientific terminology and internal consistency across domains.
   Apply the Persona's **Learner Address & Register** policy when evaluating student-directed wording. Check the locale's natural educational register and whether singular/plural conveys real audience meaning; do not label an acceptable alternative as a definite error just because another domain uses a different form.
4. **Apply language-specific guidance.** For Crimean Tatar (`qm`), follow the Persona's **Crimean Tatar → international → Turkish** hierarchy, approved Latin spelling and provisional-review policy. A carefully adapted Turkish **technical term** may be appropriate, but Turkish entire sentences are not Crimean Tatar localization.
5. **Produce actionable findings.** Cite specific textbook, locale, canonical code link/path, field (`name.<locale>` or `description.frontend.<locale>`), current wording, recommended wording, rationale, confidence, severity and sources actually checked. Differentiate definite errors from plausible linguistic variants or unverified proposals. No false native-speaker or standards certifications. **Report separate counts for semantic/scientific errors, linguistic/terminology errors, and style/register-only harmonizations.** For address-form inconsistencies, record the locale-specific editorial rule and representative examples; do not interpret bulk style harmonization as many independent translation failures.
6. **Apply corrections only when explicitly authorized.** This skill alone is read-only. For edits, switch to [Technical Translation](./technical-translation.skill.md) and its actual TypeScript verification gate; modify **only** authorized locale fields in canonical code. Refresh the temporary library if another review of the updated text is required.
7. **Report coherent results.** Provide overall coverage, key terminology decisions, number of reviewed entities and outstanding questions. Complete the entire assigned scope without unnecessary user interruptions.

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
