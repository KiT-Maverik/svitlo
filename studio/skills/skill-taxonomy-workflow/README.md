# Skill Taxonomy Workflow

**Status:** staged transition to a single Code source of truth. Approved editorial Markdown must not be destroyed before lossless, reviewed migration.

## GENERATOR AND SOURCE BOUNDARIES

The canonical Math-style source is `<PackageRoot>/data/skills/`, not `Data/skills/` or legacy `src/data/skillsTaxonomy/`. UUID literals live in entity-owned `*.data.ts`; no separate ID indexes or Domain/Group root barrels are allowed. Code → Markdown is a **read-only derived view** and never reconstructs editorial `Slug`, `Action` or `Status`. **The Code → Markdown generator now reads the canonical `data/skills/` hierarchy and validates structural integrity using the FastGate checker before producing a derived Markdown view.** Markdown → Code is a separate, explicitly authorized write operation.

## THE FIVE STAGES

1. **[Create Skills Taxonomy](./create-skills-taxonomy.skill.md)** — Methodologist authors an initial or additional draft catalog under `<PackageRoot>/docs/skills/taxonomy.md`; resolves Scope/Skill identity and preserves approved earlier decisions. The editable Markdown holds only **not-yet-promoted** entities and parent scaffolding necessary to represent them.
2. **[Skills Taxonomy Exception Review](./review-skills-taxonomy-exceptions.skill.md)** — independent Methodologist Persona audit of full draft scope and semantic issues. **This is read-only and does not confer editorial approval**. Record any editor decisions through the approved authoring/history gate.
3. **[Implement Skill Code](./implement-skill-code.skill.md)** — Coding Agent implements accurate local `SkillDomain`, `SkillGroup`, `Skill` objects and IDs with fully localized names and canonical English `description.methodological`. Every **Skill** must additionally have `description.frontend` in every supported language. For Groups and Domains `frontend` is optional, but must be complete when present. Never silently synthesize translations from names.
4. **[Migrate Implemented Taxonomy](./migrate-implemented-taxonomy.skill.md)** — independently compare every staging entry against its verified code object and all required name translations, the English methodological meaning, any present frontend translations and parent/child membership. Only remove a fully verified item once the editor approves its promotion. Never lose unimplemented descendants.
5. **[Generate Skills Taxonomy](../../../scripts/generate-skills-taxonomy.mjs)** — optional, repeatable **read-only-from-Code** generation of Markdown with localized names, complete localized Skill user-friendly descriptions (available Group/Domain frontend copy), and canonical English methodological prose in `<PackageRoot>/docs/generated/skills/taxonomy.<locale>.md`. Default `en`. Generated material is not authoring input.

## CANONICAL CODE STRUCTURE

Each textbook's authoring taxonomy belongs under `<PackageRoot>/data/skills/`: root `index.ts` exports Domain Data; each Domain `<domain>.data.ts` imports immediate Groups directly without a Domain `index.ts`; each Group `<group>.data.ts` imports Skills through the Group's `skills/index.ts`. A direct-Skill Domain may use its own `skills/index.ts` instead of Groups. There is no Group-directory `index.ts` and no `*.ids.ts`/ID index layer. Every entity's stable UUID literal lives in its own `*.data.ts`; parents embed imported child entities directly into `groups` and `skills`.

## SOURCE OF TRUTH BY STAGE

- **Before promotion:** the approved `docs/skills/taxonomy.md` is the editorial authority for outstanding, not-yet-migrated entries and required hierarchical scaffolding. The code objects, if already present but incomplete, do **not** supersede the approved prose.
- **After individual promotion:** the verified `*.data.ts` object is authoritative for ID, localized name, English methodological description, any approved complete frontend copy, immediate catalog membership and the code representation of the entity. Its Markdown definition must not be re-authored in the staging catalog. Git history preserves the original drafting work.
- **After complete promotion:** `docs/skills/taxonomy.md` may be removed **only if no unpromoted entries or unresolved editor decisions remain and the full Code catalog regenerates without errors**. Generated documents remain derived assets; never edit them by hand.
- **Mixed state:** a parent Domain/Group heading can remain as a _container_ for not-yet-promoted children. Do not remove this scaffold or orphan children. Its displayed description is temporary editorial context until its whole subtree can be safely represented via Code.
- **Approval:** human editor approves semantic/translation migration; compiler presence, locale-key counts and link existence alone cannot prove correct translation or same meaning.

## EDITORIAL SLUGS

For newly authored or deliberately migrated staging taxonomies, `Slug: lowerCamelCase`, `Action: skip|create|update|delete`, and `Status: pending|implemented` appear in that order directly below each Domain, Group and Skill heading, before counts and the standalone Code link. The default is `Action: skip` and `Status: pending` for new unimplemented entries. `Action` directs the separate Markdown → Code generator but does not itself authorize writes; `Status` reports verified current implementation, not editorial approval. A skipped entry stays in the taxonomy and counts. `Action: delete` is a manual-only editorial marker: no generator flag or automatic deletion path exists; removal requires separate explicit editor approval and dependency review. All Domain, Group and Skill slugs are globally unique within a single textbook, across all entity kinds and ancestors. Preserve approved slugs across display-name changes. Slugs are required `Skill*_Config.slug` fields, distinct from UUIDs. Existing slugless documents remain legacy. The Code-to-Markdown generator intentionally omits `Slug`, `Action` and `Status`: only `Action` and `Status` are editorial planning metadata; `slug` is stored in Code. Its Code → generated Markdown → parsed-view test proves preservation of fields **stored in Code**, not restoration of the editable editorial template's action/status mapping. Do not mistake the derived view for a replacement authoring document.

## CONTRACT AND COMPATIBILITY

`Skill_Config` requires `description: { methodological: string; frontend: Readonly<Record<LanguageCode, string>> }`: Skills need reviewed English methodology **and** student-facing copy in every supported locale. `SkillGroup_Config` and `SkillDomain_Config` retain transitional optional descriptions; if a Group/Domain supplies `frontend`, it must cover every locale. The runtime builders validate these requirements. Code-to-Markdown reads TypeScript source via AST without running the TypeScript checker, so it independently rejects Skills lacking `description.frontend` rather than silently omitting the text. Never deploy partial dictionaries or fallback text; English-only Markdown → Code output is a temporary localization work item, not a promoted artifact. Type checks and presence tests do not establish translation quality; that requires editorial review. Descriptions are taxonomy semantics, not learning-depth limits, questions or mastery data.

For the fully migrated `data/skills/` Code taxonomy:

```sh
node scripts/generate-skills-taxonomy.mjs --package content/math
node scripts/generate-skills-taxonomy.mjs --package content/math --locale uk
node scripts/generate-skills-taxonomy.mjs --package content/math --locale uk --stdout
node scripts/generate-skills-taxonomy.mjs --package content/math --locale uk --check
npm run test:taxonomy-generator
```

The generator **fails** for missing localized names or English methodology and for missing or incomplete Skill frontend descriptions; Group/Domain frontend dictionaries remain optional but must be complete when present. Mathematics now has **13 Domains, 60 Groups and 277 Skills** in Code; its staging `content/math/docs/skills/taxonomy.md` was removed following the approved editorial migration and must not be recreated. The generator statically reads `*.data.ts` source without executing textbook modules and validates entity slugs against their filenames. `--stdout` previews without writes, `--check` compares a previously generated file byte-for-byte and fails on drift, and normal generation writes only changed content. They cannot be used together. The regression suite checks the real Code catalog for each supported locale, correct counts, hierarchy, source links, labels, methodological meaning and user-friendly copy. It does not prove translated semantic quality or full UUID graph integrity.

## NO-LOSS RULES

Before changing any staging taxonomy record: preserve exact approved semantic meaning; verify source links; reconcile actual Code UUID and parent; verify locale roster at runtime contract; verify translation quality, not merely presence; inspect all downstream users; keep reportable evidence and editor approval; commit an auditable diff. If any check fails, retain the record. Do not auto-delete all implemented-looking entries. Do not remove archived originals in `studio/skills/Obsolete`; they are marked as historical.

**Localization of generated views:** `--locale` localizes catalog names and available `User-friendly description (<locale>)` copy; the methodological description remains English in _every_ output. Generated views do **not** contain editorial Slug/Action/Status metadata and must not claim to be a fully translated methodological document or a round-trip of the editorial staging format.

## Markdown → Code entity generator

The permanent [Markdown → Code generator](../../../scripts/implement-skills-taxonomy.mjs) consumes the approved, editable `docs/skills/taxonomy.md` and optionally a separately reviewed JSON localization dictionary keyed by scoped entity path (for example `domain/group/skill`). It targets only `<PackageRoot>/data/skills/` with directly composed typed Data entities. UUIDs belong to each entity's own `*.data.ts`; successful updates preserve them. It emits required runtime `slug` fields and complete child entities; it never emits separate ID files or ID-only membership maps.

```sh
node scripts/implement-skills-taxonomy.mjs --package content/<textbook> --translations <reviewed-locales.json>
node scripts/implement-skills-taxonomy.mjs --package content/<textbook> --translations <reviewed-locales.json> --apply
node --test scripts/implement-skills-taxonomy.spec.mjs
```

Dry-run is the default; `--apply` is required for writes. Generated changes are validated against the FastGate Skill graph checker in an isolated temporary tree first. The generator takes `name.en` from each Markdown heading and `description.frontend.en` from its user-friendly description. Other languages remain absent until separately translated; no fallback or placeholder is emitted. It accepts optional partial reviewed translations, but rejects empty, invalid or unsupported locale values, invalid identity references, and mismatched Code links. Missing locales deliberately produce TypeScript errors and must be completed before running those Code objects in an app. `Action: skip` leaves existing Code unchanged. `Action: delete` never removes Code or changes the entity's `Status`. The generator reports `Manual deletion required` for that Domain, while independent valid Domains can still be processed. There is no deletion CLI option. Do not substitute this generated Code for independent editorial promotion review. Mathematics has no staging Markdown and must not be reconstructed to run the generator. Generator regression tests remain available **manually** via `npm run test:taxonomy-generator` and `node --test scripts/implement-skills-taxonomy.spec.mjs`; no dedicated taxonomy-generator CI workflow runs automatically.

## Deterministic Markdown → Code description import

The [description importer](../../../scripts/import-taxonomy-descriptions.mjs) reads the **new, labeled** `Methodological description: ` and `User-friendly description: ` fields of every Domain, Group and Skill. It uses verified standalone implementation links to update **existing** `*.data.ts` configs in a safe, dry-run-first process. The first field must already be approved English; the second is working-language frontend draft copy **only**, never automatically mapped to `description.frontend`. The importer has **not** been updated to parse `Slug:`, `Action:` or `Status:`; those fields currently cause unknown-content errors. Do not run it on the new template. Generator/parser/runtime changes are deferred to separate work. For legacy structured inputs, it rejects unknown fields, legacy free-form descriptions, incomplete Code links and conflicting values rather than guessing or overwriting. It does not create missing UUIDs, translate material or generate new Skill files.

```sh
node scripts/import-taxonomy-descriptions.mjs --package content/math
node scripts/import-taxonomy-descriptions.mjs --package content/math --write
npm run test:taxonomy-import
```

**Math migration boundary:** Mathematics uses its reviewed Code catalog (13 Domains / 60 Groups / 277 Skills) as the source of truth. Its old staging taxonomy has been removed; never restore it from a stale branch or overwrite it with a generated view. The description importer is **not** compatible with new-format Slug/Action/Status metadata and is not a route to changing implemented Math skills. Promotion and runtime use of new entities requires names in every supported language, complete Skill `description.frontend`, English methodology and validated parent/child export maps; the English-first generator may create incomplete Code objects before that translation step. For other subjects with pending editorial taxonomy entries, preserve the editable staging catalog until each entry has passed its promotion gate.
