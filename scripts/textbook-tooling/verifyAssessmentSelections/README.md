# Verify generated assessment selections

A strict textbook production build must not publish a Lesson with a Quiz or Flashcards Section whose referenced Question/Flashcard resources are missing. Validating the Section Config alone cannot prove that separately authored banks have been generated.

`verifyAssessmentSelections(staticRoot)` is a **read-only, deterministic post-generation check** called from `buildTextbook/build.mjs` after the existing Lesson and combined assessment publishers have staged their JSON files. For every enabled Quiz/Flashcards Section in the published Lesson's base Props, it verifies:

- A Lesson-owned `assessment-manifest.json` exists.
- **Every explicit candidate UUID** (including those not chosen in a sampled Quiz run) exists in the manifest with the correct Lesson owner and resource kind.
- The selected Question/Flashcard has a generated `base.json`.
- Every declared Lesson language is present in the metadata and any advertised language-specific JSON file exists.
- Disabled Sections are not release dependencies, and unrelated/unselected bank resources are not required by this reference gate.

The independent assessment publisher already validates manifest schema and generated bank content; this step checks **cross-resource reachability and actual staged files**. It does not generate banks, edit YAML, invent UUIDs, override Course Lesson selections, review translations or certify offline/Scene/editorial quality. The source production requirements and exact target locale remain authoritative.

```sh
node --test scripts/textbook-tooling/verifyAssessmentSelections/verifyAssessmentSelections.spec.mjs
```

The parent `package:build` runs this automatically in production. `SVITLO_MEDIA_MODE=draft` skips this final gate because intentionally incomplete drafts must remain scaffoldable; that mode is not acceptable as Ready/merge evidence.
