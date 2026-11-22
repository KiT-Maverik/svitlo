# Source materializers — Agent C

Eight concrete TypeScript source materializers are implemented in the owned folders `text/`, `markdown/`, `code/`, `image/`, `video/`, `youtube/`, `audio/` and `subtitles/`.

## Parent integration contract

Each `materialize<Kind>(draftConfig, options)` accepts a plain authoring Config derived from the corresponding real Engine Config type, with optional staged `params`/`locale` and separate production notes. It returns `{exportName, files, diagnostics}`. File paths are **relative to this concrete node's own output directory** (not the root Course/Lesson directory). `index.ts` imports the actual `define<Kind>` from `@svitlo/engine/build`, supplies exact Config identity and `typeof languages` generic; the caller must pass the relative `languagesImport` pointing to the parent-owned source-only `languages.ts`.

The renderers never touch the filesystem and cannot clobber reviewed files. Parent #775 must implement atomic create-only preflight, symlink/path rejection, collision/ID checks across siblings, prefixing of relative paths and eventual typechecks against the real Engine. It must also adopt/standardize the local function signature, publish the integration exports, and wire these adjacent `*.spec.ts` tests into the package test script (the child PR cannot edit the manifest). No runtime YAML dependency or second Config parser is introduced.

## Historical parity inventory (#772, older YAML-to-TS)

| Kind | Specialized behavior retained | N/A / parent-owned |
| --- | --- | --- |
| Text | full exact inline `%_%id: camelCase; value: text%_%` text; real Zod and variable validation; source locale only | nested child maps |
| Markdown | `markdown.md` or source-locale `<language>.md`, `readMarkdown(import.meta.url, ...)`, replacement variables and exact Markdown/math text | nested child maps |
| Code | full language-to-extension map, exact bytes in `code.<extension>`, `readCodeSource` and Code replacement variables | nested child maps |
| Image | source-locale filename/alt/fallback, nil UUID `.webp` pending filename and sizing/alt TODOs | child collections |
| Video | filename `.mp4`, poster `.webp`, source-locale labels and separate pending TODOs | child collections |
| Youtube | strict owned `defineYoutube`, mode/href/accessible label source fidelity; no physical asset placeholder | child collections |
| Audio | filename `.mp3`, translated title/description and explicit pending TODO | child collections |
| Subtitles | filename `.vtt` and language filtering, no fabricated WebVTT data | child collections |

Every type retains immutable UUID and slug, qualified pending diagnostics, source-language translation pruning and planned-language TODO, optional `specification.md` sidecars, stable module imports/exports, and no physical media file fabrication. All eight implement the same renderer/relative-plan shape **independently**, with adjacent tests.

**Deliberately not ported into these leaf renderers:** `items/order` and child path boundaries (parents own them), Section/Scene/assessment pending scaffolds (Agents B/D/E), global `languages.ts` ownership, identity allocation, writer, and orchestrator integration (parent #775). The previous YAML renderer's broad recursive serializer is not imported or executed. Dynamic arbitrary evaluated TS expressions not representable by a plain Config require a separately specified parent-level authoring expression contract; no unsafe raw-expression injection is implemented.

## Verification

Adjacent tests cover named module shape, TypeScript *syntax parsing*, non-English exact source, source-locale filtering and planned-language TODO, source reader paths, missing content/media, stable re-runs, untouched input Config, and invalid identity. Full emitted-source configurator **typechecking**, parent-level create-only preflight and integration test invocation are outstanding parent dependencies, **not claimed to pass here**.
