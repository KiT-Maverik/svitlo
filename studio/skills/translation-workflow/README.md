# Translation Workflow

**Persona:** [Technical Translator](../../personas/technical-translator.persona.md), for linguistic judgment across supported languages.

- **[Review Translation](./review-translation.skill.md):** read-only linguistic QA using **Code-derived Markdown**. One on-demand CI command generates the **complete collection** of Code Skills taxonomies and canonical Lesson Markdown in **every supported language** into the PR-only `.agent-ci-artifacts/` folder. The reviewer independently chooses which documents to read for the assigned locale and subject. No coding expertise is required to review the generated text.
- **[Technical Translation](./technical-translation.skill.md):** implementation of actual localized text changes in canonical `*.data.ts` / `*.locale.ts` files; mandatory TypeScript and source validation.
- **[Common Translation](./common-translation.skill.md):** placeholder for future standalone document translation.

Reusable agent CI workflow: [Agent CI Artifacts](../../../.github/workflows/translation-review.yml). In a PR conversation, a **repository-owner-authored** `/agent-artifacts generate` triggers generation for that PR's head branch; when the agent is finished, `/agent-artifacts cleanup` removes its tracked artifacts. The workflow must exist in **main** before slash commands become active. A [dedicated merge guard](../../../.github/workflows/agent-ci-artifacts-guard.yml) blocks temporary files from entering `main` or `new-lesson` after the relevant workflow is active on the target branch. See [Agent CI Artifacts architecture](../../docs/architecture/agent-ci-artifacts.md).

**Never edit generated Markdown to change translations.** It is a disposable view of canonical code. Do not add `.agent-ci-artifacts/` to `.gitignore`: the reviewer must access its temporary documents in the PR branch, and cleanup must remove them before merge.

## Lesson translation review references

Canonical Lessons are discovered under `learningApps/<textbook>/data/lessons/<group>/<slug>/<slug>.data.ts`. The same on-demand command builds `.agent-ci-artifacts/lessons/<textbook>/<group>/<slug>/<language>.md`. Reviewers should select the assigned Lesson and language, verify `manifest.json` for missing documents/failures, compare the source meaning, and make changes only to canonical authored code. Do not edit temporary Markdown.

Lesson artifacts depend on the separate `scripts/generate-lessons-markdown.mjs` CLI being delivered by the Lesson → Markdown task (Agent 4). If it is not present, `manifest.json` explicitly records the missing dependency; generated Skills references are still usable. See the [Agent CI Artifacts architecture](../../docs/architecture/agent-ci-artifacts.md) for the CLI contract and behavior with integration PRs.
