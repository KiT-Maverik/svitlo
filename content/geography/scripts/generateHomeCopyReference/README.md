# Geography Home Copy → localized review Markdown

This package-owned, build-time tool reads the actual two-field `geographyHomeCopy` tuple dictionary in `content/geography/data/homeCopy.ts` without executing source TypeScript. It emits an English/target-language comparison for review; it never creates published content or edits the source.

```sh
node content/geography/scripts/generateHomeCopyReference/generate-home-copy-reference.mjs --locale uk --stdout
node content/geography/scripts/generateHomeCopyReference/generate-home-copy-reference.mjs --locale it --stdout --allow-missing
node --test content/geography/scripts/generateHomeCopyReference/generate-home-copy-reference.spec.mjs
```

The optional `--allow-missing` mode is a read-only draft preview: absent translated strings appear only as `%%MISSING%%`. Strict mode fails closed. The PR-scoped orchestrator writes `geography-home-copy/<language>.md` to a one-day Actions ZIP with a `manifest.json` containing `missing`, `reviewReady` and SHA-pinned source identity. Independent review is permitted only for a complete, authorized entity/locale at its verified source SHA; unrelated incomplete locales do not automatically block that review.
