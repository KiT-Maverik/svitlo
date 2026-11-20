# Astronomy textbook package

`@svitlo/astronomy` is a **platform-neutral textbook distribution**, not a Next.js app.
Authored taxonomy (`data/skills/`), Lesson modules (`data/lessons/`) and the
textbook-owned Scene implementations (`scenes/`) remain separate. The taxonomy
contains 13 domains. Scene implementations are exported as the optional
`@svitlo/astronomy/scenes` entrypoint and CSS as `@svitlo/astronomy/styles`.

## Lesson Scenes

The reviewed Lesson `skyChangesOverview` (Lesson #661) references three stable UUIDs:

- Day / night comparison: `80ecd1b4-8405-41ad-ac71-bd97d0f2c9e8`
- Dated lunar phase and cloud counterexample: `fae02030-82c2-4c8a-a18a-3a1a789a8477`
- Separate day/Moon questions: `14cd71cf-f81d-44fd-ba4b-9346384ba037`

The static, lazy `sceneLoader.ts` must be generated (not hand-maintained).
Source text comes from the **already selected** `ContentBlock_Scene_Props`
response, with missing keys rejected rather than replaced by another language.
Scenes use no runtime astronomy API or mandatory learner account.

**Not release-ready:** the day/night evidence pair is not yet sourced and
validated with real image provenance, rights, visible sky and UTC/local-time
solar checks. The evidence-step button stays disabled; two teaching SVG diagrams
are not photographs. Independent key-by-key prerecorded audio is also missing;
no network TTS or fabricated offline audio is shipped. The Lesson's three
separate narrated Audio blocks remain pending too. See
[`scenes/README.md`](./scenes/README.md) and the existing Lesson PR #661.

## Build and verify

After `npm ci`, from the repository root:

```sh
npm run content:generate:scenes --workspace @svitlo/astronomy
npm run content:check:scenes --workspace @svitlo/astronomy
npm run test:components --workspace @svitlo/astronomy
npm run code:check:scenes --workspace @svitlo/astronomy
npm run code:check:types --workspace @svitlo/astronomy
npm run code:lint:check --workspace @svitlo/astronomy
SVITLO_MEDIA_MODE=draft npm run package:build --workspace @svitlo/astronomy
```

The `code:check:scenes` command is an actual strict scoped TypeScript project for the Scene TSX/modules and their imported runtime contracts, without weakening compiler options. It separates Scene correctness from unrelated missing Course sibling Lesson imports; success does **not** certify all authored Course/Lesson sources.

**Do not present a draft-mode package build as production validation.** Production
media verification correctly rejects missing Lesson Audio assets, incomplete
Scene evidence and other authored TODOs. Preserve external Course sibling
dependency errors as a separate integration concern.

The final package must contain compiled Scene chunks, stylesheet, metadata,
localized Lesson JSON and all actually required physical resources.
Publication/portability checks remain mandatory before Ready.

## Publish prebuilt resources

```sh
svitlo-astronomy publish --output /absolute/path/to/host/public
```

The public CLI copies verified prebuilt package resources to the host's public
directory using its ownership manifest. Hosts own routing, locale selection,
UI Kit providers, platform installation and offline delivery.
