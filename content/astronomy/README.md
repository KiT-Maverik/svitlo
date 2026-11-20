# Astronomy textbook package

`@svitlo/astronomy` is a platform-neutral textbook distribution, not a Next.js host.

Canonical authoring sources include `data/skills/` and reviewed, UUID-addressed Lesson modules in `data/lessons/`. Source Lesson `observationJournal` / `ef83055e-8a1f-5111-9761-bd459591d993` was materialized by the strict Stage 6 Engine finalizer. The two React Scenes live in `scenes/` and are loaded by the generated registry. Their code is not included in the build-time authoring modules.

The Lesson currently has Ukrainian educational text. Its declared `en/pl/qm` translations and typed review digest are **not complete**; a source-only Draft is not a full four-locale published Lesson. Do not fabricate locale dictionaries, media, or a successful production manifest. NASA source information is reproduced as offline-readable authored text; the NASA photograph itself has not been distributed.

## Build and verify

From the repository root after `npm ci`:

```bash
npm run content:generate:scenes --workspace @svitlo/astronomy
npm run content:check:scenes --workspace @svitlo/astronomy
npm run test:components --workspace @svitlo/astronomy
npm run code:check:types --workspace @svitlo/astronomy
npm run package:build --workspace @svitlo/astronomy
npm run test:publish --workspace @svitlo/astronomy
npm run test:portability --workspace @svitlo/astronomy
```

Stage 6 can validate source locale independently, but complete production-mode Props publication and package builds require genuine translations and review evidence. The `package:build` script uses the shared Engine publisher and fails closed on missing required resources.

## Prebuilt resource publication

```sh
svitlo-astronomy publish --output /absolute/path/to/host/public
```

The package CLI publishes only legitimately generated resources from the build. A host owns routing, UI providers, offline packages and service workers; a Scene's lack of network calls alone does not establish host-wide offline readiness.
