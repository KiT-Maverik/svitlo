# Textbook-wide UUID media assets — implementation plan

**Status:** Proposed architecture and implementation requirements only. **Not implemented by this document or its planning PR.** Do not treat the current Engine, lesson scaffolders, or publisher as already supporting this contract.

## Goal and rationale

Make authored binary media independent of the Lesson, Section, and ContentBlock in which they are used. Store physical files once per textbook; reference each by its stable `UUID.extension` filename. Keep the existing `{ base, locale }` Build result, avoid individual resource configurators, avoid file-path arguments in authored Config, and let textbook generation validate references and stage the entire assets tree. This enables reuse across lessons, predictable AI authoring, and previews before media production is complete.

This proposal **supersedes the colocated, slug-named media portion** of `studio/docs/architecture/lesson-generated-source-layout.md` and the current `resolveLessonMedia` / `stageLessonMedia` approach. It does **not** supersede that document's modular TypeScript layout, Markdown/Code source rules, Scene module ownership, or source-draft preservation rules. Reconcile canonical documentation when the implementation is authorized.

## A. Authoring layout and identity

```text
content/<textbook>/
  assets/
    images/
      550e8400-e29b-41d4-a716-446655440000.webp
    audio/
      550e8400-e29b-41d4-a716-446655440001.mp3
    video/
      550e8400-e29b-41d4-a716-446655440002.mp4
    subtitles/
      550e8400-e29b-41d4-a716-446655440003.vtt
  data/
    lessons/
    courses/
    skills/
  generated/
```

- `assets/` is a top-level textbook folder, **not `data/assets/`** and not a child of an individual ContentBlock.
- A media UUID identifies the **physical asset**, not the ID or slug of the consuming ContentBlock.
- The full filename is `UUID.extension`; UUID must be canonical, extension must be lowercase and supported. No resource UUID subfolders, `source.*`, locale folders, or slug-derived names.
- A resource can be referenced by several blocks, lessons, locales, or roles; language selection remains the responsibility of the consuming Config.
- Do not require a global UUID registry or reject equal UUID stems across *different extensions* solely for uniqueness: lookup uses the **complete filename** in a known media category. Normal filesystem full-path uniqueness suffices. Validate filename and target-path safety.
- Files are authored externally to TypeScript; an asset's content is **not generated from** its reference. No `defineImageResource`, `defineAudioResource`, `defineVideoResource`, `defineSubtitlesResource`, or `defineResourceName` helper.

## B. File extension and filename schemas

Implement canonical lists analogous to `shared/engine/schemas/languages.schemas.ts` (final module naming must match existing Engine conventions):

| Category | Allowed extensions |
| --- | --- |
| Image | `svg`, `png`, `jpg`, `jpeg`, `webp`, `gif`, `avif` |
| Audio | `mp3`, `wav`, `ogg`, `m4a`, `flac` |
| Video | `mp4`, `webm` |
| Subtitles | `vtt`, `srt` |

- Derive the TypeScript extension unions and Zod enums from these readonly tuples. The combined union of supported extensions may be reused by generic utilities, but **each media field validates against its category**, so a video file cannot be used as an image.
- Provide reusable filename schemas composed of the canonical UUID schema, a period separator, and the relevant extension enum. There must be **no unrelated UUID regex** maintained in a second place.
- A custom validator that splits at the single separating period is reasonable for runtime validation, but **do not use a Zod-only `.refine()` that drops filename constraints from generated JSON Schema**. Prefer a Zod composition such as `z.templateLiteral([z.uuid(), '.', z.enum(imageExtensions)])` if current Zod-to-JSON-Schema conversion preserves the exact restrictions. Otherwise choose a schema implementation whose JSON Schema output genuinely validates the filename; prove this with tests.
- Reject paths, separators, traversal, extra dots, uppercase/noncanonical extensions and malformed UUIDs. No existence checks in these schemas.
- Regenerate the checked-in editor-facing YAML JSON Schemas with the existing `generateYamlSchemas` workflow; test both direct Zod parsing and validation of the **generated** JSON Schema (valid filenames, wrong type, invalid UUID, and malformed paths).
- Preserve the existing strict Config/Overrides derivation and sparse localization semantics; do not create hand-maintained, divergent YAML-only filename rules.

## C. Media Config field contract

Use the author-facing name `fileName` consistently for *primary* local media:

| Configurator | Current local field | Target authoring field |
| --- | --- | --- |
| `defineImage` | `locale.src` | `locale.fileName` |
| `defineAudio` | `locale.fileLocation` | `locale.fileName` |
| `defineVideo` | `locale.fileLocation` | `locale.fileName` |
| `defineSubtitles` | `locale.fileLocation` | `locale.fileName` |
| Video poster | `locale.poster` | `locale.posterFileName` (image extension schema) |

Example (illustrative UUIDs):

```ts
defineImage({
  id: imageBlockId,
  slug: 'solarSystem',
  type: 'image',
  params: { width: 800, height: 600 },
  locale: {
    fileName: '550e8400-e29b-41d4-a716-446655440000.webp',
    alt: { en: 'Solar System', uk: 'Сонячна система' },
  },
});
```

- A `fileName` may be language-invariant or localized using the existing Config localization switch; keep `alt`, accessible names, descriptions, fallback text, and other user-facing localization independent.
- Adapt nested Image children in Carousel; Video poster is **a filename reference**, not an Image ContentBlock. Include relevant caption/subtitle consumers and applicable Quest media contracts without accidentally enabling unsupported runtime entities.
- Preserve media-specific accessibility/required-field rules and effective-override validation.
- Audit current external URL support separately. External URLs must not pass through the local filename schema; retain an explicit safe external-media path/contract where supported. Do not silently break already supported YouTube or remote Image use cases.
- No `sourceDir`, `PWD`, `import.meta.url`, slugs, filesystem paths, or file extension metadata duplicated in local media Config.

## D. Build and publication responsibilities

**Keep the Build envelope exactly `{ base, locale }`. Do not add a `files` array/manifest or file-copy side effects to `define*()` or `build.props()`.**

The textbook's build-time generator already knows the textbook root. Extend its **media-specific reference handling** to inspect the supplied, already-composed media data and identify physical assets from the block type and named media fields:

- `image.fileName` → `assets/images/<filename>`
- `audio.fileName` → `assets/audio/<filename>`
- `video.fileName` → `assets/video/<filename>`
- `video.posterFileName` → `assets/images/<filename>`
- `subtitles.fileName` → `assets/subtitles/<filename>`

This is an **intentional, narrowly scoped change** to the present generator rule that completed Props are opaque. It may inspect known typed media slots (including nested/ordered block structures) and provide resource validation/URL resolution; it must **not** recreate Config, Build, child ordering, localization merge, or override semantics. It consumes the exact requested locale scope and the actual built results. Preserve current `build.props()` / `build.overrides()` semantics, including independently built patches and disabled children. For context-specific Course overrides, check references from the **effective publishable context**, not blindly every authored/disabled block.

**Runtime URL contract:** resolve the local filename/category to the existing portable textbook namespace, e.g. `/textbooks/<book>/assets/images/<filename>`, and ensure the final UI Kit/Runtime Props contain the URLs or equivalent established runtime fields they actually consume. The current schemas and UI Kit use `src` / `fileLocation`, not `fileName`. Define and test the exact typed projection/validation point in the implementation so neither a filename accidentally reaches an unsupported Runtime Prop nor the generator must rediscover Config. No generic untyped JSON rewriting. Keep the app runtime independent of Node and source files.

**Packaging:** the textbook build copies the **whole** `content/<book>/assets/` directory into its existing portable distribution namespace, e.g. `dist/static/textbooks/<book>/assets/`. The consumer publisher can then stage/publish this subtree as it does other textbook resources. No per-reference file-copy plan or selective copying is needed. Unreferenced assets may be packaged; this is an accepted initial space tradeoff. Preserve collision checks with `public/` and `static/`, symlink/path safety, deterministic output, `dist/manifest.json` accounting and stale-file cleanup.

## E. Missing media: draft vs production generation

An asset reference can be structurally valid and **not exist on disk yet**. This is not a malformed Config and should not fail TypeScript merely because a binary is unproduced.

- **Source scaffolding:** assign/preserve a stable, syntactically valid `UUID.extension` reference for planned media and author it in the technical YAML Config; never emit fake `imaginary.webp`, use a null filename in completed Config, invent a new UUID on every rebuild, or fabricate binary content. Resource UUID assignment is a one-time authoring action; repeated scaffolding must be deterministic and preserve the YAML source and the existing create-only/`SKIP` safeguards.
- **Draft generator mode:** run ordinary structural Config/Props validation; collect missing-reference diagnostics; still write previewable Props JSON with predictable resource URLs. UI Kit may display its existing unavailable/broken-media fallback when the file is absent. Missing binary media is a warning, **not** a reason to omit the block or block the preview.
- **Production generator mode:** first prepare and structurally validate results, then inspect **all referenced media files** across the requested publication scope. Accumulate **all** missing or otherwise invalid physical asset diagnostics, with textbook, lesson/block ID, locale/role, filename and expected path. Report one aggregated failure, **do not publish partial/new Production Props or assets**, and do not leave stale successful output masquerading as the new build.
- Distinguish missing physical files from malformed filenames, invalid Config, inaccessible files, unsafe symlinks, and invalid formats. Structural Zod errors remain errors in both modes; Draft relaxes **existence only**.
- Draft/Production is a **generation/publishing policy**, not a new `draft.props()` or `draft.overrides()` API for this media task. Keep ordinary `build.props({ languages })` and `build.overrides(patch, { languages })` unchanged unless a separate non-media Draft requirement is authorized.
- Do not turn missing-media validation into a browser-runtime file-system lookup. Runtime handles loading failures/fallback presentation only. A browser visit cannot perform the production-readiness check.

## F. Migration scope, implementation order, and tests

Review the current implementations and tests before editing, in particular:

1. `shared/engine/schemas/languages.schemas.ts` and current Zod/JSON Schema conversion.
2. `shared/engine/configurators/contentBlocks/define{Image,Audio,Video,Subtitles}/`, their Overrides schemas and validators, Carousel child assembly, and UI Kit renderers.
3. `shared/engine/configurators/yaml/` and `shared/engine/scripts/generateYamlSchemas/`: **current YAML-only media projections use `null`**, which is intentionally superseded by valid, file-not-yet-present names.
4. `shared/engine/scripts/lessonBuilder/`, its scoped instructions/fixtures, and the technical `lesson.yaml` contract; it is a draft source scaffolder, not a Props publisher.
5. `shared/engine/scripts/generateLessonProps/`, `shared/engine/generators/lessons/`, `scripts/textbook-tooling/buildTextbook/{build.mjs,stageLessonMedia.mjs}`, `scripts/textbook-tooling/publishTextbook/`, and actual `dist/manifest.json` consumers.
6. Studio architecture and media-authoring instructions, including `lesson-generated-source-layout.md` and specialist handoffs; migrate/retire the obsolete colocated media contract, while preserving local Markdown/Code/Scene rules.

Suggested implementation batches **after separate owner authorization**:

- **Contracts:** extension tuples, Zod filename schemas, schema-generated YAML acceptance and unit tests.
- **Media Config/Build/Runtime bridge:** authoring `fileName` unification, typed runtime URL projection, nested media and override tests.
- **Generator and packaging:** textbook-level `assets/` copy, draft/production diagnostics, aggregation, safe atomic publishing, collision and cleanup tests, removal of legacy colocated asset staging.
- **Source authoring and Studio:** deterministic valid-name YAML scaffolding, JSON Schema regeneration, fixtures, authoring instructions, explicit migration of relevant existing source files.

Acceptance tests must cover: invalid UUID; invalid extension for a specific media type; generated JSON Schema parity; invariant and localized media; cross-Lesson reuse; Video poster and Subtitles; Carousel nesting; effective overrides/disabled blocks; absent Draft asset (warning + JSON + fallback-capable URL); multiple absent Production assets (one complete diagnostic, no partial publication); entire folder copied including unused files; collision/symlink safety; non-media Markdown/Code/Scene untouched; expected public URL; runtime rendering; and a fresh package build/publish cycle. Run relevant Engine TypeScript/tests, YAML-schema generation `--check`, textbook publishing tests and UI Kit tests; report actual results, not assumptions.

## Explicit exclusions

- No separate media Resource Configurator or filename-construction helper.
- No `files` Build-result metadata, per-block `sourceDir`, or per-file copy manifest.
- No blanket weakening of production Props schemas or `RequireLanguages`.
- No redesign of Scene executable modules, Markdown/Code local-source handling, Questions/Flashcards authoring ownership, or existing Lesson UUID folder addressing.
- No publication-readiness claim based merely on an emitted JSON document, a Zod pass, or missing-file warnings.
- This planning PR does not implement any of the above; implementation and any code/fixture migration require a separate instruction.
