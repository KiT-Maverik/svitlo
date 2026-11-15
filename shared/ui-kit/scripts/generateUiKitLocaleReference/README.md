# UI Kit Code → localized review Markdown

This build-time CLI statically reads the ten exported component dictionaries in `shared/ui-kit/data/locale/`. It does **not** execute source TypeScript, change authored values, or publish application resources. It renders every English field beside its selected language (including nested paths and accessibility labels) and links to the canonical source.

```sh
node shared/ui-kit/scripts/generateUiKitLocaleReference/generate-ui-kit-locale-reference.mjs --component audio --locale en --stdout
node shared/ui-kit/scripts/generateUiKitLocaleReference/generate-ui-kit-locale-reference.mjs --component audio --locale it --stdout --allow-missing
node --test shared/ui-kit/scripts/generateUiKitLocaleReference/generate-ui-kit-locale-reference.spec.mjs
```

`--allow-missing` is read-only draft mode: missing target fields are emitted as `%%MISSING%%` with `Missing translations: N`. Strict mode rejects absent fields. The orchestrator writes temporary documents to `.agent-ci-artifacts/ui-kit/<component>/<language>.md` and records `missing` and `reviewReady` in the manifest. Never treat a document with missing fields as approved or perform independent review before the full translation integration barrier.
