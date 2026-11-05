# Playground textbook package

Follow root `AGENTS.md` and the applicable Studio guidance.
Authored `data/`, React DOM Scenes, their CSS and book-owned media belong
to this textbook. Next.js routes, navigation and other host integrations do not.
Do not import application-owned files, duplicate UI Kit flags, or import authored
`*.data.ts` from the production Scene or textbook entrypoints.

`npm run build --workspace @svitlo/playground` must create the complete
`dist/` distribution, including compiled JS, public declarations, Scene styles,
localized lesson/analytics JSON and any book assets. `scripts/publish.mjs` is
a public, framework-independent CLI for distributing those **prebuilt** resources.
Never regenerate content during publication or delete unrelated host resources.
Keep `./scenes`'s generated Scene Registry static and lazy; run
`npm run check:scenes --workspace @svitlo/playground` after edits.

For changes to this contract, validate the packed package with
`npm run test:portability --workspace @svitlo/playground` and resource
publication with `npm run test:publish --workspace @svitlo/playground`,
plus Web integration and standard package boundary checks.
