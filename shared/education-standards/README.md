# EducationStandard reference catalog (authoring only)

Canonical, cross-textbook reference records for independently verified educational standards and national curricula. The only public package entrypoint is `@svitlo/education-standards/build`, which exposes `defineEducationStandard` instances **for build-time authoring and future course-alignment research only**. It must never be imported into a browser/runtime application. This package creates no registry, publisher, JSON distribution, certification, or claims of Course compliance.

Records live in `data/<jurisdiction>/<semanticSlug>.data.ts`; each carries an immutable UUID, exact official original-language name, English methodological explanation, full canonical locale dictionary and a primary source. Locale dictionaries are authored text, not automatic machine fallbacks. The source text and jurisdiction/cohort/edition are editorially verified and can be revised without regenerating UUIDs. Changing the meaning or replacing a legal instrument needs an explicit review.

After building Engine, run:

```sh
npm run package:build --workspace @svitlo/education-standards
npm run code:check:types --workspace @svitlo/education-standards
npm test --workspace @svitlo/education-standards
```

**Important:** Source URL/version metadata is reference provenance, not evidence of Course alignment, accreditation or national recognition. Final publication requires primary-source review and independently approved translations against Code-derived per-locale markdown; the existing Agent CI Artifacts workflow does **not** currently document an EducationStandard adapter. This is a Draft editorial catalog until that review has taken place.
