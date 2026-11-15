# PR-scoped Agent CI reference library

The single root orchestrator `generate-translation-review-artifacts.mjs` generates Code-derived Markdown for every language listed in Engine's `DEFAULT_SUPPORTED_LANGUAGES` and every discovered supported source family: Skills, Lessons, Lessons by Skill, Assessment Methods, UI Kit component dictionaries and Geography home copy. No language-specific workflow or separate per-locale orchestration is required.

```sh
node scripts/generateTranslationReviewArtifacts/generate-translation-review-artifacts.mjs
```

It writes **only** `.agent-ci-artifacts/` and records source commit, generated files, per-document failures, and available `missing`/`reviewReady` coverage fields in `manifest.json`. Missing translations produce `%%MISSING%%` only in draft Markdown where supported; structural/generator failures remain explicit. Production TypeScript and publication generators are strict and never use the marker. The on-demand GitHub workflow publishes these documents to the agent PR branch only. Always remove this directory before merging. Independent reviewers must check `sourceCommit`, their exact files, `reviewReady === true`, and no relevant manifest failures; they may not review from an incomplete reference.
