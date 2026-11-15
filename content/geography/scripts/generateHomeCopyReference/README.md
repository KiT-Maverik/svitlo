# Geography Home Copy → localized review Markdown

This package-owned, build-time tool reads the actual two-field `geographyHomeCopy` tuple dictionary in `content/geography/data/homeCopy.ts` without executing source TypeScript. It emits an English/target-language comparison for review; it never creates published content or edits the source.

```sh
node content/geography/scripts/generateHomeCopyReference/generate-home-copy-reference.mjs --locale uk --stdout
node content/geography/scripts/generateHomeCopyReference/generate-home-copy-reference.mjs --locale it --stdout --allow-missing
node --test content/geography/scripts/generateHomeCopyReference/generate-home-copy-reference.spec.mjs
```

The optional `--allow-missing` mode is a read-only draft preview: absent translated strings appear only as `%%MISSING%%`. Strict mode fails closed. The PR-scoped orchestrator writes `.agent-ci-artifacts/geography-home-copy/<language>.md` with a `missing` count and `reviewReady` indicator. This does not bypass the campaign's all-translator integration gate.
