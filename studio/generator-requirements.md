# Generator Requirements

**Scope:** build-time generators that turn canonical textbook authoring data into
publishable, runtime-consumable resources. This document is the common contract for
future data generators; additions should be recorded here before implementation.

## 1. Separation of authoring and runtime data

- Authoring configuration (for example, `data/skills/**/*.data.ts`) remains the
  single source of truth. Browser code must not import it, execute a builder,
  or depend directly on its module graph.
- Generators execute before app development/build and produce deterministic static
  files. Never modify authoring data as a side effect.
- Publish one language per file. Never ship multi-language dictionaries to the
  runtime for one locale; never silently fall back to English or insert placeholders.
- Fail clearly on missing required translations, invalid entity identities, or
  unsupported fields. Check mode is read-only; write mode validates before replacing
  its generated output, preserving unrelated public assets.

## 2. Generated directory convention

- Generated resources belong under `content/<textbook>/public/data/`.
  **Always use lower-case `data` and `skills` in paths**.
- The entire `**/public/data/` subtree is Git-ignored and must contain no tracked
  files. It is regenerated for `predev` and `prebuild`.
- Entity-oriented generators and tests live under `scripts/generators/data/`.
  Purpose-built page generators live under
  `scripts/generators/pages/<camelCasePageName>/`. Paths are relative to each
  script rather than depending on the current working directory.

## 3. Optional entity-level metadata projection

Only when an entity-oriented runtime consumer specifically requires it, the
legacy entity-level publisher may publish one directory per Skill, SkillGroup
and SkillDomain, with:

```text
public/data/skills/<domain>/
  meta.json
  uk.json
  en.json
  <group>/
    meta.json
    uk.json
    en.json
    <skill>/
      meta.json
      uk.json
      en.json
```

A Domain with direct Skills places their directories directly below the Domain.
Domains may contain both Groups and direct Skills.

- `meta.json` holds only locale-independent values, currently `id`,
  `collection`, and applicable child-slug lists `groups`/`skills`.
  These lists describe links to separate child directories, **not embedded
  localized children or bare UUID foreign keys**.
- The generator derives `collection` from the canonical entity kind and
  validates it against the shared `Collection` type
  (`@svitlo/contracts/content`, exported through `@svitlo/engine/content`).
  For Skills: `"skill"`; Groups: `"skillGroup"`; Domains: `"skillDomain"`.
  Authoring builders already supply this discriminator to entity objects;
  it must also be emitted in each generated `meta.json` automatically.
- `<language>.json` holds only locale-dependent values: `name` and, where
  authored for frontend display, `description`.
- The original `description.methodological` is editorial-only. For runtime
  copy, select exactly `description.frontend[language]`; this is mandatory
  for Skill and optional for Group/Domain.
- Never duplicate `id`, `collection`, child structure, or other invariant
  fields in locale files. Never include a `language` field (filename provides
  it) or a `slug` field (directory path provides it) in **any** published JSON.
- Validate authored `slug` against the corresponding `*.data.ts` basename,
  even though it is not serialized. Keep UUID globally unique within a textbook.

Example `meta.json` for a Group:

```json
{
  "id": "00000000-0000-4000-8000-000000000003",
  "collection": "skillGroup",
  "skills": ["testRecognizeRed", "testRecognizeOrange"]
}
```

Example `uk.json` for the same Group:

```json
{ "name": "Теплі кольори" }
```

## 4. No generated catalog index for entity projections

- Do **not** generate `public/data/skills/index.json`: no `version`,
  no `languages` list, and no `domains` list in published resources.
- Supported languages come from the shared localization types/registry; the
  language code in the filename is the registry's `language` field.
  Thus `be-tarask` uses `be.json`, without treating it as a separate
  unsupported locale or silently swapping its orthography.
- The textbook declares its root SkillDomain slugs in its own typed page/config
  boundary, which may be passed to a reusable UI Kit component later.
  Do not import authoring `*.data.ts` to discover root domains in browser code.
- An entity-level loader, when used, traverses child path segments from
  `meta.json`, fetches the requested locale for each node, validates the
  runtime schema and reconstructs entities in memory. **The current
  skillAnalytics page intentionally does not use this projection**: its own
  generator publishes one complete localized page JSON instead. Missing
  files or unknown Collection values remain hard errors.
- Offline packs may cache shared `meta.json` once and only the selected locales.
  Browser caches are independent of source-control tracking.

## 5. Verification and shared component boundary

- Test deterministic generation, malformed/duplicate identity, missing
  translations, mixed Domain child types, stale output cleanup, and strict
  read-only check mode.
- Verify generated schemas against the runtime loader (including slug from
  path, language from filename and `collection` from metadata).
- The Playground Skills page is a prototype, but its data transport and map
  must depend on an injected textbook Domain list and generic published
  resources, so moving the view to `shared/ui-kit` does not bring
  Playground-only fixtures or other textbook authoring data into the kit.

## 6. Page-specific publication

- Each page can have its own generator at
  `scripts/generators/pages/<camelCasePageName>/`, with lowercase `pages`.
  `skillAnalytics` is the page name, not `mindMap`.
- Emit exactly one self-contained `public/data/pages/<camelCasePageName>/<language>.json`
  per locale, containing only the fields that the page consumes.
  Do not add speculative fields to global entity metadata.
- The skillAnalytics projection contains the complete localized
  Domain → Group → Skill tree with canonical UUIDs, slugs, shared Collection
  discriminators and user-facing text. Slugs are retained inside this payload
  because nested items do not have individual file paths.
- Progress, mastery and profile-specific analytics are joined at runtime
  by UUID and must never appear in public generated files.
- Subject and Program views are separate filters: Program membership must
  derive from verified Program-to-Skill relationships, not guesses.
- Keep the page loader and view generic for later extraction to UI Kit;
  authoring `*.data.ts` may only be read at build time.
- Report sizes for **all** supported locales (UTF-8, gzip, Brotli) and test
  stable output, missing translations and locale isolation.

## 7. Compact Course publications (new Build API)

The new Course configurator publisher is
`scripts/generators/data/publish-course-data.mjs`. Its caller supplies a
`defineCourse` configurator and, optionally, one separate Course-owned
`build.overrides` authoring patch. The publication target for each textbook
is `public/data/courses/<courseId>/base.json` and sparse
`public/data/courses/<courseId>/<language>.json` files.

This is a **single publication context per Course**, not a standalone Lesson
publication. Course, Module and Chapter keep complete Props in their ordered
hierarchy; a Lesson leaf contains only its UUID, `type: 'lesson'`, and optional
`overrides` with sparse already-built Props. Never duplicate the Lesson's
full resource or serialize authoring Config, Build methods or internal
collection markers into Course files. Locale-only overrides live in the
language file and invariant overrides in base. Because published child arrays
replace atomically, translated arrays must repeat the full effective array
(including invariant sibling values) to avoid losing base overrides.

The Course's existing `build.props` and `build.overrides` validate and
materialize authoring data; the publisher only projects their completed
Props and the separately built Lesson patches. The compact Course resource
is intentionally not a full standalone `course_Props_Schema` response:
Course runtime assemblers must later resolve Lesson IDs and apply these
patches after the Lesson base and selected locale. This is distinct from the
legacy per-TOC/episode/override publisher still used by existing Playground
routes; do not silently switch those consumers until they support this format.

A Course write replaces only its own generated directory; read-only
check mode detects changed, missing or stale files. Tests must verify
locale isolation, four-layer Course resolution, full replacement of arrays,
independent Lesson overrides, deterministic reruns and duplicate IDs.
