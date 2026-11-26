# Explicit Web content selection

The Web host requires `SVITLO_TEXTBOOK` when preparing, typechecking,
building or starting. Select a package by slug (`math`) or full npm identity
(`@svitlo/math`). The package must be installed and export compiled
`.` metadata and its `svitlo-<slug>` Publish CLI. `./scenes` and
`./styles` are optional, but styles require Scenes.

The resolver reads only the installed package's manifest and its compiled
public artifacts. `prepare-textbook.mjs` builds available local workspaces,
invokes the package-owned Publish CLI, validates staging, cleans the previous
selected package's owned public resources, stages host-owned UI Kit files and
emits generated TypeScript selection bindings. It never imports another
package's authored `src/` or `data/` modules.

For Web testing only, choose `SVITLO_TEXTBOOK=web-fixture-alpha` or
`web-fixture-beta`. The `test:integration` suite exercises both selections,
their real published files, compiled Scene bindings, locale resources and
stale-resource cleanup; it restores alpha for browser tests. Neither fixture
is a required Web dependency or an implicit selection.

## Published resources and runtime selection

Web textbook publication outputs under `apps/web/public/.svitlo/` and
`apps/web/public/textbooks/` are generated at preparation time and **must not
be committed**. Keep original textbook media in the owning `content/<book>/`
package. Tracking published files causes selection switches to dirty the Git
worktree, disabling the Production Quality helper's verified package-build reuse.
The integration suite checks this invariant after each fixture switch in CI.

Publication cleanup is manifest-owned: switching the selected package removes its obsolete owned files and prunes **only now-empty directories on those removed paths**, stopping at the generated collection boundary (for example `public/data/courses` or `public/textbooks`). Files not listed by the manifest, nonempty directories, other resource roots, and authored sources are untouched. A one-time whole-tree migration sweep is **not needed**.

The **runtime Course catalog does not read publication ownership manifests**. It enumerates `public/data/courses/<uuid>/base.json` resources, ignoring genuinely empty leftover UUID directories and rejecting nonempty folders with missing bases, malformed JSON, or invalid resource identity/languages. This means runtime cannot identify an otherwise valid but accidentally retained publication from an earlier textbook without a separate runtime registry; such files must instead be removed by the existing publication/ownership cleanup. A missing `base.json` inside a truly empty old UUID directory is intentionally not treated as corruption when no ownership record is available at runtime.

A direct Course URL never enumerates the catalog. For a supported interface locale that the Course does **not** declare, the Course detail route chooses the first declared language in `params.languages` that has a published locale JSON file; if all locales are invariant/base-only, it uses the first declared language and validates the assembled base. `params.languages` order is publisher-controlled and deterministic; the current Course publication contract exposes no separate default/document-language field. Sparse locale JSON files are optional when no override differs from `base.json`. A requested _declared_ language is never silently replaced when its published JSON is malformed or its resolved tree fails validation.

The interface URL and interface translations remain unchanged. The Course page displays an accessible fallback notice (in the host's existing Ukrainian/English Course UI localization), while the Lesson/Episode/Assessment links use the selected content language. Those activity routes retain their explicit language contract and **do not independently negotiate a new content language**; a broader lesson-level language selection feature is outside this PR.
