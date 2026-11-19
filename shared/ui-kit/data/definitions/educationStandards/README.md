# EducationStandard — global authored reference definitions

Canonical EducationStandard definitions belong to `@svitlo/ui-kit` under `data/definitions/educationStandards/data/<country>/*.data.ts`; the reusable `defineEducationStandard` configurator and Zod contracts remain in `@svitlo/engine/build`.

The 14 records preserve original-language official names, persistent UUIDs, English methodological descriptions, official source URLs and 30 localized frontend descriptions. Source records are build-time-only. Do **not** import their `*.data.ts` modules into runtime applications.

The established UI Kit `scripts/generateLocales/generateLocales.mjs` produces localized resources alongside component texts and Assessment Methods. Each textbook receives `public/data/uiKit/educationStandards/base.json` (invariant metadata and methodology) and `public/data/uiKit/educationStandards/<locale>.json` (per-standard short description for the selected language). The generator validates complete locale coverage, stable IDs, duplicate slugs and merged Engine Props before writing. These files are reference data only; no Course alignment, accreditation claim, new runtime registry or Content API is implied.

**Editorial decision (2026-11-18):** the project owner explicitly approved the catalog and its translations for incorporation. The underlying source references and jurisdiction-specific effective dates remain attached to each definition; use official consolidated versions and independently evaluate alignment for any Course.

Validate from the repository root after building Engine:

```sh
npm run package:build --workspace @svitlo/engine
npm run code:check:types --workspace @svitlo/ui-kit
npm run test:locales --workspace @svitlo/ui-kit
node --test scripts/generateTranslationReviewArtifacts/education-standards-reference.spec.mjs
```

Code-derived review references remain available via `/agent-artifacts generate education-standards` and must be cleaned with `/agent-artifacts cleanup` before merging a PR that materializes temporary artifacts.
