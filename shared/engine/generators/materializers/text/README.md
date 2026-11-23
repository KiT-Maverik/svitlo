# Source materializers — Agent C

Eight concrete TypeScript source materializers are implemented in the owned folders `text/`, `markdown/`, `code/`, `image/`, `video/`, `youtube/`, `audio/` and `subtitles/`.

## Parent integration contract

Each `materialize<Kind>(draftConfig, options)` accepts a plain authoring Config derived from the corresponding real Engine Config type, with optional staged `params`/`locale` and separate production notes. **The materializer refuses incomplete mandatory fields before returning files**: the draft input type is intentionally broader than a valid emitted Config, and a `TODO (BLOCKER)` comment does not make a missing required property type-safe. It returns `{exportName, files, diagnostics}`. File paths are relative to the enclosing Course/Lesson/bank source root. Callers supply an optional **`directory`** to prefix the concrete node's own files; nested callers must supply the actual relative `languagesImport`. `index.ts` imports the actual `define<Kind>` from `@svitlo/engine/build`, supplies exact Config identity and `typeof languages` generic; the caller must pass the relative `languagesImport` pointing to the parent-owned source-only `languages.ts`.

The renderers never touch the filesystem and cannot clobber reviewed files. Every diagnostic has `severity: 'warning'` so composition can preserve a consistent result type. Parent #775 must implement atomic create-only preflight, symlink/path rejection, collision/ID checks across siblings, dispatcher integration and invocation of real Engine source typechecks. It must also adopt/standardize the local function signature, publish the integration exports, and wire these adjacent `*.spec.ts` tests into the package test script (the child PR cannot edit the manifest). No runtime YAML dependency or second Config parser is introduced.

## Historical parity inventory (#772, older YAML-to-TS)

| Kind      | Specialized behavior retained                                                                                                            | N/A / parent-owned |
| --------- | ---------------------------------------------------------------------------------------------------------------------------------------- | ------------------ |
| Text      | full exact inline `%_%id: camelCase; value: text%_%` text; real Zod and variable validation; source locale only                          | nested child maps  |
| Markdown  | `markdown.md` or source-locale `<language>.md`, `readMarkdown(import.meta.url, ...)`, replacement variables and exact Markdown/math text | nested child maps  |
| Code      | full language-to-extension map, exact bytes in `code.<extension>`, `readCodeSource` and Code replacement variables                       | nested child maps  |
| Image     | source-locale filename/alt/fallback, nil UUID `.webp` pending filename and sizing/alt TODOs                                              | child collections  |
| Video     | filename `.mp4`, poster `.webp`, source-locale labels and separate pending TODOs                                                         | child collections  |
| Youtube   | strict owned `defineYoutube`, mode/href/accessible label source fidelity; no physical asset placeholder                                  | child collections  |
| Audio     | filename `.mp3`, translated title/description and explicit pending TODO                                                                  | child collections  |
| Subtitles | filename `.vtt` and language filtering, no fabricated WebVTT data                                                                        | child collections  |

Every type retains immutable UUID and slug, qualified pending diagnostics, source-language translation pruning and planned-language TODO, optional `specification.md` sidecars, stable module imports/exports, and no physical media file fabrication. Incomplete mandatory fields such as Text/Markdown copy, Code source, Image sizing, or accessible media labels now **throw without returning a plan**. A reserved Nil UUID media filename, by contrast, is explicitly valid in the Engine media-reference schema: it may produce a type-valid but publication-blocked `index.ts` when other required properties are already reviewed. It is never an invented media file. All eight implement the same renderer/relative-plan shape **independently**, with adjacent tests.

**Deliberately not ported into these leaf renderers:** `items/order` and child path boundaries (parents own them), Section/Scene/assessment pending scaffolds (Agents B/D/E), global `languages.ts` ownership, identity allocation, writer, and orchestrator integration (parent #775). The previous YAML renderer's broad recursive serializer is not imported or executed. Dynamic arbitrary evaluated TS expressions not representable by a plain Config require a separately specified parent-level authoring expression contract; no unsafe raw-expression injection is implemented.

## Verification

Adjacent tests cover named module shape, TypeScript syntax parsing, non-English exact source, source-locale filtering and planned-language TODO, source reader paths, **fail-closed incomplete mandatory Configs**, reserved valid media placeholders, stable re-runs, untouched input Config, and invalid identity.

`text/typecheckGeneratedSources.spec.ts` additionally runs a semantic **TypeScript program** against the real `@svitlo/engine/build` package self-reference (`dist/build.d.ts`), including complete sources for all eight kinds plus pending-media sources for Image/Video/Audio/Subtitles; this is **not** a compiler stub and does not merely parse AST syntax. It requires an Engine package build before running. To execute it and every adjacent test from the repository root:

```bash
npm run package:build --workspace @svitlo/engine
npm exec --workspace @svitlo/engine -- tsc -p tsconfig.test.json
node --test shared/engine/.test-build/generators/materializers/*/*.spec.js
```

Parent #775 owns integrating these specs into the repository's normal test runner. **The new suite has been added but not executed/verified in this Draft PR** (Draft CI runs lightweight checks only); parent-level create-only preflight and end-to-end composition remain outstanding. Do not recommend merge without SHA-pinned executed validation.

## Compatibility audit against parent #775 (Course Stages 1–4)

The current `CourseWorkflowStage1`–`CourseWorkflowStage3` types author **Course-level** Stage 1 planning, Stage 2 placement and Stage 3 Lesson resolution. Stage 4 is independent review of the same Stage 3 source, not a fourth leaf ContentBlock shape. None contains concrete ContentBlocks yet, so there is no need to alter `defineText`/`defineMarkdown`/media Config schemas or the derived leaf `DraftConfig` types.

The root planner uses **`production.languages: { document, planned }`**, not config.params.languages. The Stage 5 orchestrator must bridge these named properties to each leaf's **`documentLanguage`** and **`plannedLanguages`** context; this intentionally keeps the eight same-kind renderers independent of a Course-only wrapper and usable by Lesson, Episode, Question and Flashcard callers. Every adjacent test now declares a `CourseWorkflowStage1Languages`-typed planning fixture and verifies that mapping. The new Lesson `build.overrides().id` is a Course-reuse reference field; it never belongs to any leaf ContentBlock Config or published Props patch.

Sibling materializers #777/#779/#780 return paths under the parent-assigned child directory, plus severity-qualified diagnostics. These eight modules now accept `directory` and return prefixed files; their `production` sidecar stays separate from Config and a nested node requires an explicit `languagesImport`. Callback adaptation and parent-level collision/writer behavior remain #775 work. **No completed Stage 5 shared dispatcher/type contract or full Engine typecheck is claimed here.**
