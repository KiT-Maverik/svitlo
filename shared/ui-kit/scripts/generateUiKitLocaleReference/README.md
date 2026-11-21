# UI Kit Code → localized review Markdown

This build-time CLI statically reads the ten exported component dictionaries in `shared/ui-kit/data/locale/`. It does **not** execute source TypeScript, change authored values, or publish application resources. It renders every English field beside its selected language (including nested paths and accessibility labels) and links to the canonical source.

```sh
node shared/ui-kit/scripts/generateUiKitLocaleReference/generate-ui-kit-locale-reference.mjs --component audio --locale en --stdout
node shared/ui-kit/scripts/generateUiKitLocaleReference/generate-ui-kit-locale-reference.mjs --component audio --locale it --stdout --allow-missing
node --test shared/ui-kit/scripts/generateUiKitLocaleReference/generate-ui-kit-locale-reference.spec.mjs
```

`--allow-missing` is read-only draft mode: missing target fields are emitted as `%%MISSING%%` with `Missing translations: N`. Strict mode rejects absent fields. The orchestrator writes `ui-kit/<component>/<language>.md` to a one-day Actions ZIP with manifest metadata (`sourceCommit`, PR/run IDs, `missing`, `reviewReady`, per-document digest). Never treat incomplete files as approved; the owner may authorize independent review of any complete, precisely identified entity/locale without waiting for unrelated translations.
