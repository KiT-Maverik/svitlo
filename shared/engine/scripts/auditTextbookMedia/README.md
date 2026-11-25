# Audit unused textbook media

This Engine-owned, read-only CLI helps identify **possible** unused files in the
textbook-wide media directory introduced by PR #615:

```text
content/<book>/assets/{images,audio,video,subtitles}/<UUID>.<extension>
```

Run from the monorepo root, without compiling the Engine or running Props
generators:

```sh
npm run content:check:unused-media --workspace @svitlo/engine -- --package content/math
npm run content:check:unused-media --workspace @svitlo/engine -- --package content/math --json
```

The command enumerates all regular files under the selected textbook's
`assets/` and scans its authored text sources (`.ts`, `.tsx`, `.js`, `.json`,
`.yaml`, `.md`, `.css`, and related formats) for **literal full**
`UUID.extension` references. It includes source Scenes, nested Lesson and
Course definitions, and user-facing Markdown. It ignores generated output,
`dist/`, dependencies, fixtures, tests, README, methodology and specialist
`specification.md` handoffs. Nil UUID draft placeholders do not count as
usage. Files with nonstandard paths/names are listed separately; this is not
a replacement for Engine Zod media validation.

The report contains asset totals, referenced files, unreferenced candidates,
potentially recoverable bytes, and nonstandard paths. `--json` provides
machine-readable output. **Unused candidates do not fail the command.**
Missing `assets/` is valid. Unreadable files and unsafe filesystem links
produce a real error rather than a misleading completeness claim.

## Limitations

This is a _static heuristic_, not a definitive dependency graph. It may
under-report usage when a Scene dynamically constructs filenames, when an asset
is referenced by code outside the selected textbook, or when a newer build
provides references not present in authored sources. Conversely, literal
references in unused authored code or comments can make an unused asset look
used. Do not automatically remove assets from this output. Examine each
candidate and run the regular build/preview after any manual deletion.

It does not invoke `build.props()`, change media publishing behavior, validate
Codec bytes, delete files, or participate in the default textbook build / CI
gate. This allows audits while Lessons and media production are unfinished.

Validation:

```sh
node --test shared/engine/scripts/auditTextbookMedia/auditTextbookMedia.spec.mjs
```
