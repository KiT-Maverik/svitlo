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
