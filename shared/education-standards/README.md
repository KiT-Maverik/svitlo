# EducationStandard reference catalog (authoring only)

This package owns a small **global, cross-textbook reference catalog**. Its `@svitlo/education-standards/build` entrypoint exposes 14 immutable `defineEducationStandard` declarations and a deterministic, typed `educationStandards` tuple. Build-only data must never be loaded in runtime applications. No standard publisher, browser registry, Course schema change, certification or Course-alignment claim is provided.

Each record lives in `data/<jurisdiction>/<semanticSlug>.data.ts` and contains a persisted UUID, an official original-language name, a substantive English methodology, a complete 30-language frontend-description dictionary and verified primary-reference URL. Different annexes of one legal instrument are listed separately only where they govern distinct levels of education. `params.version` denotes the official originating edition and any known amending context; always verify the legally applicable consolidated text and transition dates before using a standard for curricular alignment.

**Editorial status:** Source information has been researched against official publishers; the methodology, precise legal applicability and **all 420 localized descriptions** require independent methodological and linguistic review before declaring this catalog approved. In particular, do not treat `qm` as Turkish; Crimean Tatar requires separate review of its proper Latin orthography and terminology. These descriptions are original drafts, not approved government translations.

After the Engine package is built, verify:

```sh
npm run package:build --workspace @svitlo/education-standards
npm run code:check:types --workspace @svitlo/education-standards
npm test --workspace @svitlo/education-standards
npm run code:format:check
```

**Review gate:** The Code-derived EducationStandard Markdown adapter is included in the catalog's combined review branch, but its on-demand PR-comment dispatcher requires the corresponding workflow from PR #644 to reach the default branch. For every independent review, generate `.agent-ci-artifacts/education-standards/<language>.md` from the exact current PR head and verify `manifest.json` (`sourceCommit`, 14 distinct IDs per selected language, missing=0, reviewReady=true). A successful generator smoke test does not constitute independent linguistic approval. A source URL, a valid TypeScript build or a Course UUID reference does not establish alignment, compliance or accreditation.

Sources and jurisdiction-specific transition notes are recorded in PR #640's evidence comment.
