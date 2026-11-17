# Implement Skill Code Skill

Read [Skill Taxonomy Workflow](./README.md). Implementation promotes **only verified entries** after the separate [Migrate Implemented Taxonomy](./migrate-implemented-taxonomy.skill.md) quality gate; Code file presence alone never authorizes removing a Markdown entry.

**Mandatory first action:** Read [Coding Agent Persona](../../personas/coding-agent.persona.md) in full. Apply the repository's `AGENTS.md` and any package-local instructions. This is an implementation task: do not redesign the catalog, invent Skills, author curriculum, or implement assessment/learner tracking.

**Purpose:** Implement the **approved SkillDomain, SkillGroup, and Skill entries in the staging Skills Taxonomy** as a strictly typed, localized, UUID-stable taxonomy for **one standalone textbook application**, preserving the precise editorial hierarchy (including approved direct Domain → Skill ownership) with immediate child Data composition and stable UUID literals owned by each entity.

## CROSS-CUTTING RULES

This implementation must also follow [Git-First Typed Content & AI Authoring](../../docs/architecture/git-first-typed-content.md) and [Internationalization & Inclusive Access](../../docs/architecture/internationalization-and-accessibility.md). Treat every canonical Skill `<slug>.ts` or Domain/Group `index.ts` entity as reviewed, **strictly typed named-export content**, avoid default exports and undocumented identity aliases, and do not confuse translation dictionaries or stable IDs with a fully registered runtime catalog. Inspect the live Engine types and full locale roster before implementation.

## REQUIRED SOURCES — READ BEFORE WRITING

1. **Target textbook:** identify the actual `<PackageRoot>` (the specific application package, not the monorepo root), the approved scope (one Skill, Group, Domain, or bounded batch), branch, and relevant repository instructions.
2. **Editorial authority:** read the **approved** `<PackageRoot>/docs/skills/taxonomy.md`, including each in-scope entity’s heading, approved `Slug: `, `Action: `, `Status: `, explicit `Methodological description: ` (English), `User-friendly description: ` (working-language draft), hierarchy position and Code link. For these **unpromoted** entries, this is the editorial authority; implemented/promoted entries instead use reviewed Code. **No individual Markdown Definitions exist or are required**. Missing, ambiguous, unapproved or contradictory taxonomy entries are blockers; report them rather than inventing semantics or silently revising the taxonomy.
3. **Entity meanings:** read [SkillDomain](../../docs/entities/skill-domain.md), [SkillGroup](../../docs/entities/skill-group.md), and [Skill](../../docs/entities/skill.md). These are lightweight catalog categories, **not** assessment rubrics, learner results, or lessons.
4. **Authoritative ownership:** the Skill UUID field is defined by Engine's `Skill_Config['id']` schema. Skill, SkillGroup and SkillDomain config types and Zod schemas live under `shared/engine/configurators/skills/`.
5. **Authoritative configurators:** import `defineSkill`, `defineSkillGroup` and `defineSkillDomain` from `@svitlo/engine/build`; inspect their schemas and implementations under `shared/engine/configurators/skills/`. Compose children in direct, typed slug-keyed maps (`skills`, `groups`), not positional authoring arrays, `{ items, order }` wrappers, or built child Props. Skills taxonomy overrides are forbidden.
6. **Reference implementation (read-only example):** inspect Mathematics at `content/math/data/skills/`:
   - Root `index.ts` exports Domain configurators only.
   - `geometry/index.ts` imports Groups directly from `./<group>` and/or Skills from `./<skill>`.
   - `geometry/angles/index.ts` imports Skills directly from `./<skill>`.
   - `geometry/angles/<skill>.ts` owns each Skill's stable UUID.
   - No extra nested `skills/index.ts` or redundant re-exports.

**Canonical source destination:** `<PackageRoot>/data/skills/`, outside `src/` and relative to the textbook package root. Do not introduce legacy `src/data/skillsTaxonomy/`, `*.ids.ts`, `*.data.ts` for taxonomy entities, or intermediate Skill barrels.

Current contracts and [Skill](../../docs/entities/skill.md), [SkillGroup](../../docs/entities/skill-group.md), and [SkillDomain](../../docs/entities/skill-domain.md) definitions govern this workflow.

### Editorial actions and implementation status

For each current-template entity, `Action: skip|create|update|delete` describes a **separate generator instruction**; `Status: pending|implemented` describes the presently verified implementation state. Neither is a new runtime `Skill*_Config` property. These metadata fields are not instructions for this manual Coding Agent to create, update or delete files automatically. Scope and human approval are still required. In particular, never interpret `delete` as authorization for destructive changes or `Status: implemented` without verified Code. When explicitly commissioned to implement an entity despite `Action: skip`, reconcile the intended scope with the editor first.

The existing description importer cannot parse the new `Slug:`, `Action:`, and `Status:` lines. Do not run it on new-format Markdown until a separate tooling update is implemented and verified.

### Markdown → Code generator requirements

The [Markdown → Code generator](../../../shared/engine/scripts/implementSkillsTaxonomy/implement-skills-taxonomy.mjs) performs dry-run by default, requires explicit apply, preserves existing entity UUIDs on every update, and validates the planned direct-composition graph before writing. `Action: delete` is a manual-only editorial marker. The generator has no deletion option or implementation: it emits `Manual deletion required` without altering Code or Status for that Domain. Never attempt a destructive workaround; carry out any approved deletion manually after checking references. The generator marks `Status: implemented` when Code files are created, but that status alone does not mean translations are complete or the entity is promoted. An English-only generated entity is an intermediate localization task; TypeScript must report the missing required keys until translators fill them. Leave failed entities pending and report individual outcomes; allow independent successful changes only when dependencies remain valid.

### Approved editorial slugs and Code paths

Use each new-template entity's approved `Slug: lowerCamelCase` for its own directory/file stem rather than recomputing identifiers from display names. The `<domainCamelCase>`, `<groupCamelCase>`, and `<skillCamelCase>` placeholders below refer to these approved slugs. Validate `^[a-z][A-Za-z0-9]*$`, uniqueness of sibling slugs within their immediate parent, and textbook-wide uniqueness of UUIDs before generating files.

A slug is a required `Skill*_Config.slug` property and must match the approved editorial slug and source filename. Keep existing UUIDs and Code paths stable. If an approved slug conflicts with an implemented path/identifier, stop for editorial resolution; do not silently rename files or reassign UUIDs. Treat slugless legacy entries as pending explicit migration.

### Direct and mixed Domain children

A Domain can embed Groups and direct Skills **at the same time**, or only one kind, but must not be empty. Group configs live at `<domain>/<group>/index.ts`; direct Skills at `<domain>/<skill>.ts`, grouped Skills at `<domain>/<group>/<skill>.ts`. A Group embeds its immediate Skill configurators. Both `groups` and `skills` dictionaries contain complete imported child configurators, **not** `.id` strings. No synthetic Group is required. Check all source registries and UI consumers for this topology.

## 1. STRICT TYPE AND ENTITY CONTRACT

Every runtime entity must be produced through its designated builder, using the real shared-engine types. Do not hand-author the `collection` discriminator or `fileLocation` (the latter is supplied by the source registry).

| Entity      | Authored configuration                                | Builder             | Children                               |
| ----------- | ----------------------------------------------------- | ------------------- | -------------------------------------- |
| Skill       | `slug`, `id`, `name`, `description`                   | `defineSkill`       | None                                   |
| SkillGroup  | `slug`, `id`, `name`, `skills`                        | `defineSkillGroup`  | Slug-keyed Skill configurator map      |
| SkillDomain | `slug`, `id`, `title`, optional `groups` and `skills` | `defineSkillDomain` | Slug-keyed Group and direct Skill maps |

The Engine `Skill_Config` schema requires `description: { methodological: string; frontend: Readonly<Record<LanguageCode, string>> }`; Group and Domain methodological descriptions are required; their frontend descriptions remain optional. For **legacy structured entries without `Slug:`, `Action:` or `Status:`**, [import-taxonomy-descriptions.mjs](../../../shared/engine/scripts/importTaxonomyDescriptions/import-taxonomy-descriptions.mjs) can transfer descriptions to already existing Code after a successful dry-run. The current importer must not be used with new-template entries until parser compatibility is implemented and tested; preserve semantic equivalence and seek an approved implementation path in the meantime. It never translates or creates missing Code objects. The English `User-friendly description:` supplies `description.frontend.en` to Markdown → Code; it does not supply the remaining language keys. Those keys are added by a separate translation pass. A new or promoted entity **must** have `description.methodological`: a substantive, carefully edited **English** description faithful to the approved source text (translate without information loss when the staging taxonomy is in another language). This English text is for the Methodologist, Screenwriter and other agents; it may include useful conceptual distinctions, examples and caveats without becoming a lesson or assessment plan. `description.frontend` is **required on every Skill** with genuine translations for every supported language; Group/Domain frontend is optional but must be complete when present. Missing Skill frontend translations or methodological text blocks final promotion and runtime use, but do not block generating English-first Code drafts; no fallback. Configurator schemas enforce shape and completeness, not correctness of language/meaning. No mastery, grade, prerequisites, questions or learner state belong here.

- Match the names, identity, and **exact parent/child placements** approved in the taxonomy; no extra Domains, Groups, Skills, cross-domain duplicates, or synthetic groups.
- Respect the approved hierarchy: a grouped Domain references nonempty `groups`, while a direct-Skill Domain may omit `groups` and provide nonempty `skills`. Both may coexist. Groups reference Skills through `skills`, and Skills have no children. Strongly discourage synthetic singleton Groups.
- Use stable, **literal UUID values**, owned by the entity's canonical `.ts` file. Reuse existing UUIDs for existing identities. Generate fresh collision-free UUIDs **once** for genuinely new approved entities; never generate UUIDs during application runtime, derive them from paths, or reassign IDs during a rename/move.
- Embed complete immediate child Data objects in the parent, not just their IDs. Never copy or duplicate a child's UUID in its parent.
- Cross-check that every ID reference represents the intended immediate child and that there are no missing, duplicated, or unintended entities. **The current builders and static structure checker validate UUID syntax, sibling slug/UUID collisions, and nonempty Domain/Group membership (including mixed Domain structures); they do not prove that a UUID exists in an external registry or is globally unique across all textbooks.** Complete referential/type integrity is a separate **future build-time validation** responsibility. Use available static/file-level cross-checks now, but never claim the current builders enforce a full taxonomy graph.

## 2. REQUIRED DESTINATION AND FILE HIERARCHY

For the selected textbook package only:

```text
<PackageRoot>/
├── docs/
│   └── skills/
│       └── taxonomy.md                  # outstanding editorial staging only
└── data/
    └── skills/
        ├── index.ts                     # Domain named exports
        └── <domainCamelCase>/
            ├── index.ts                 # Domain config, UUID and Group/Skill maps
            ├── <directSkillCamelCase>.ts # optional directly owned Skill
            └── <groupCamelCase>/
                ├── index.ts             # Group config, UUID and Skill map
                └── <skillCamelCase>.ts  # Skill config and UUID
```

Use approved lowerCamelCase slugs as directories/file stems; Domain and Group use `index.ts`, individual Skills use `<slug>.ts`. Preserve existing UUIDs on update.

## 3. DIRECT COMPOSITION AND EXPORT BOUNDARIES

- **Root:** `data/skills/index.ts` exports only Domain configurators from `./<domain>`, no descendant barrels.
- **Domain:** `<domain>/index.ts` exports its Domain, imports Groups directly from `./<group>` and/or Skills from `./<skill>`, and embeds full configurators in `groups` and optional `skills`.
- **Group:** `<domain>/<group>/index.ts` exports its Group, imports immediate Skills from `./<skill>`, and embeds full configurators in its `skills` map.
- **Skill:** `<domain>/<group>/<skill>.ts` (or direct `<domain>/<skill>.ts`) exports a single short-named Skill configurator.
- **Identity:** each entity owns its original UUID literal. No `items`, `order`, `build.overrides()`, ID dictionaries, `skills/` barrels or compatibility re-exports.

Import authoring configurators from `@svitlo/engine/build` using the public exports. Runtime consumers use published JSON rather than authored TypeScript.

## 4. LOCALIZATION — COMPLETE, LANGUAGE-CODE KEYS

`name` is a strictly typed `Readonly<Record<LanguageCode, string>>`. Populate **every language code required by the current engine/package contract** for **every** Skill, Group, and Domain. Never fill only English/Ukrainian; do not silently fallback, duplicate English into other locales, or leave an empty string or translation placeholder.

- Use the **two-letter language codes** (`en`, `uk`, `pl`, `be`, etc.) from `LanguageCode` as the dictionary **keys**, **without quotes**: `en: '...'`, not `'en': '...'` or `en: "..."`. Use two-letter unquoted keys consistently when supported by the actual type.
- **Do not use full locale tags as keys** (`uk-UA`, `en-US`, `be-tarask`, etc.). The current engine language descriptor has both a full `locale` and a `language` code; Skill `name` dictionaries are keyed by `language`. For example, `be-tarask` is the locale definition, and the current language key is `be`.
- If the engine introduces a language code that is **not** a legal unquoted TypeScript identifier (or is not two letters), follow the real `LanguageCode` contract and TypeScript syntax rather than truncating/misrepresenting it; document the exception for review. Do not rewrite the localization engine as part of this Skill.
- Read the supported set from the active package/engine, **not** from a copied historical count. All translations must be genuine, relevant to their meanings, and culturally/linguistically sensible.

Example of the **key style only** (not a complete `name` object; production must include every supported key):

```ts
name: {
  en: 'Addition',
  uk: 'Додавання',
  pl: 'Dodawanie',
  be: 'Складаньне',
}
```

Use the repo's configured string quote preference independently of the **no-quotation language keys** rule.

## 5. REQUIRED IMPLEMENTATION ORDER

1. **Inspect and reconcile:** read the approved editorial taxonomy, Engine schemas, language roster, and current source graph.
2. **Preserve identity:** retain each existing UUID and scoped child-parent membership. Allocate a new UUID only for a genuinely new approved entity.
3. **Implement Skills:** write/update `<skill>.ts` with reviewed English descriptions, translations and the stable UUID.
4. **Implement Groups:** write/update `<group>/index.ts`, import immediate Skills and assemble the direct `skills` dictionary.
5. **Implement Domains:** write/update `<domain>/index.ts`, import Groups and/or directly owned Skills, and assemble direct `groups`/`skills` dictionaries.
6. **Update root exports:** `data/skills/index.ts` exports short-named Domain configurators only.
7. **Verify:** preserve parentage/UUID/locales, compile TypeScript, run Engine checker/generator, check external imports, and test published resources.
8. **Reconcile staging links:** after editorial approval, link promoted entities to canonical `index.ts` or `<slug>.ts` paths without discarding unresolved notes.
9. **Stop:** report checks and unresolved issues without unrelated content changes.

A partial implementation is not complete solely because a UUID or parent mapping exists. Only entities with valid canonical source paths, complete required locales, methodological text and reviewed references count as promoted.

## 6. VERIFICATION / ACCEPTANCE GATES

Before reporting success, run the target package's available checks and add/fix focused tests where needed:

- **Type safety:** the Engine Skill, SkillGroup and SkillDomain configurator schemas and builders accept all new configs; reviewed English `description.methodological` and mandatory fully localized Skill `description.frontend` (optional complete Group/Domain frontend); no invented fields; no TypeScript errors.
- **Localization:** each `name` has **exactly** the current required language-code keys (two-letter unquoted wherever legal), no gaps, duplicates, unexpected keys, empty/placeholder/copy-pasted language values.
- **Identity:** UUID syntax and stability; check uniqueness and immediate-child mappings against the in-scope files and approved hierarchy. The existing builders **cannot** resolve IDs to actual entity types/registrations; full repo-wide reference validation is deferred to a separate build-time script. Mark unverified items explicitly rather than claiming a builder-level guarantee.
- **Direct composition:** parent configurations import immediate children in direct maps, without duplicated ID dictionaries or `skills/` barrels.
- **Export boundaries:** root `index.ts` exports Domains only; Domain and Group own their `index.ts` files; Skills are exported directly from `<slug>.ts` without additional barrels. Verify imports resolve and no `export *` or recursive barrels appear. Adapt the structural checks exemplified by `content/math/src/utils/builders/config/skillTaxonomyIndex.spec.ts`.
- **Topology:** physical paths and entries match the approved taxonomy and slugs (including immediate-parent slug uniqueness), with no accidental duplicate or missing entities. All non-placeholder taxonomy Code links resolve to matching implemented files and counts reconcile; the staging descriptions and approved hierarchy remain unchanged until separately verified promotion.
- **Tests:** run available package TypeScript, lint, builder, translation and index tests; cite commands/results. Run registry validation only if a real registry/test exists; `fileLocation` and global ID resolution remain separate planned infrastructure, not automatically finished by producing Data files. If tooling is unavailable, mark checks **not run**.

## RESULT / HANDOFF

Produce a reviewable code change that includes:

1. **Implementations** in `<PackageRoot>/data/skills/` following exactly the approved hierarchy and naming convention.
2. **Complete source files** for in-scope entities: canonical `index.ts` files for Domains/Groups and `<slug>.ts` for Skills, with stable UUID literals and direct child imports; no nested `skills/` barrels or duplicate UUID definitions.
3. **Fully translated names** for all required language keys in every new or changed Skill/Group/Domain; no shortcuts.
4. **Tests or updated verification** covering hierarchy integrity, UUID preservation, complete localization, valid direct imports and scoped exports.
5. **Updated Code links/counts** in `<PackageRoot>/docs/skills/taxonomy.md`, preserving its approved semantic descriptions, entity names and hierarchy. No redundant per-entity Markdown files.
6. **Concise completion report:** implemented Domains/Groups/Skills counts, paths, preserved/new IDs, verification commands and outcomes, unresolved items, and any necessary explicit migration notes.

**Scope boundary:** Do **not** move/copy the Math textbook's Mathematics taxonomy into another textbook automatically, change shared engine contracts, rewrite curriculum semantics, build a cross-textbook Skill registry, or refactor unrelated packages. Cross-textbook Skill identity synchronization is **out of scope for now**. Each textbook stays independently extractable with its own `data/skills`, depending only on explicit shared-engine contracts — no hidden coupling to another textbook's data tree.
