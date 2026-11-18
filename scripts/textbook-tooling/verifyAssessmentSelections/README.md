# Verify generated assessment selections

A strict textbook production build must reject enabled Quiz or Flashcards Sections if any selected Question/Flashcard UUID or any required real translation is unavailable.

`verifyAssessmentSelections(staticRoot)` is a deterministic, read-only post-generation check called by `buildTextbook/build.mjs`. It reads the textbook-wide `data/assessments/manifest.json` and validates **every candidate UUID** (not only the randomly sampled subset), kind, globally addressed `data/questions/<bucket>/<uuid>` or `data/flashcards/<bucket>/<uuid>` base, and all effective Lesson publication languages. Cross-Lesson Question references are allowed: `ownerLessonId` describes authored provenance only.

Production requires actual requested-locale JSON for localized resources. Missing patch files fail even when an English patch is present; runtime fallback must not mask release incompleteness. A resource without any locale fragments can be used as invariant-only content only if its base has no locale-bearing fields. Disabled Sections and unrelated bank entries are not selected dependencies.

The independent Assessment publisher validates manifest metadata, content hashes, and bank generation. This check proves selected-resource reachability in the staged distribution; it does not generate editorial YAML, approve translations, validate Course-specific overrides, implement offline Web installation, or certify instructional quality.

```sh
node --test scripts/textbook-tooling/verifyAssessmentSelections/verifyAssessmentSelections.spec.mjs
```

The parent `package:build` runs this gate in production. `SVITLO_MEDIA_MODE=draft` skips it for incomplete draft scaffolding only and cannot establish release readiness.
