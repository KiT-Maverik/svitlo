# Implement Skill Code Skill

Read [Skill Taxonomy Workflow](./README.md). Implementation promotes **only verified entries** after the separate [Migrate Implemented Taxonomy](./migrate-implemented-taxonomy.skill.md) quality gate; Code file presence alone never authorizes removing a Markdown entry.

**Mandatory first action:** Read [Coding Agent Persona](../../personas/coding-agent.persona.md) in full. Apply the repository's `AGENTS.md` and any package-local instructions. This is an implementation task: do not redesign the catalog, invent Skills, author curriculum, or implement assessment/learner tracking.

**Purpose:** Implement the **approved SkillDomain, SkillGroup, and Skill entries in the staging Skills Taxonomy** as a strictly typed, localized, UUID-stable taxonomy for **one standalone textbook application**, preserving the precise editorial hierarchy (including approved direct Domain → Skill ownership) with immediate child Data composition and stable UUID literals owned by each entity.

## CROSS-CUTTING RULES

This implementation must also follow [Git-First Typed Content & AI Authoring](../../docs/architecture/git-first-typed-content.md) and [Internationalization & Inclusive Access](../../docs/architecture/internationalization-and-accessibility.md). Treat every `*.data.ts` entity as reviewed, **strictly typed named-export content**, avoid default exports and undocumented identity aliases, and do not confuse translation dictionaries or stable IDs with a fully registered runtime catalog. Inspect the live Engine types and full locale roster before implementation.

## REQUIRED SOURCES — READ BEFORE WRITING

1. **Target textbook:** identify the actual `<PackageRoot>` (the specific application package, not the monorepo root), the approved scope (one Skill, Group, Domain, or bounded batch), branch, and relevant repository instructions.
2. **Editorial authority:** read the **approved** `<PackageRoot>/docs/skills/taxonomy.md`, including each in-scope entity’s heading, approved `Slug: `, `Action: `, `Status: `, explicit `Methodological description: ` (English), `User-friendly description: ` (working-language draft), hierarchy position and Code link. For these **unpromoted** entries, this is the editorial authority; implemented/promoted entries instead use reviewed Code. **No individual Markdown Definitions exist or are required**. Missing, ambiguous, unapproved or contradictory taxonomy entries are blockers; report them rather than inventing semantics or silently revising the taxonomy.
3. **Entity meanings:** read [SkillDomain](../../docs/entities/skill-domain.md), [SkillGroup](../../docs/entities/skill-group.md), and [Skill](../../docs/entities/skill.md). These are lightweight catalog categories, **not** assessment rubrics, learner results, or lessons.
4. **Authoritative TypeScript contracts in `@svitlo/contracts`:** inspect the current files under `shared/contracts/src/types/content/` (import types via `@svitlo/contracts/taxonomy`; engine builders are separate):
   - `skill.types.ts` — `SkillId`, `Skill_Config` and `Skill`.
   - `skillGroup.types.ts` — `SkillGroup_Config`, `skills`.
   - `skillDomain.types.ts` — `SkillDomain_Config`, required `groups` and optional direct `skills`.
   - `shared/contracts/src/types/languages.ts` — `LanguageCode`; verify the current supported-language list through the published localization contract.
5. **Authoritative builders:** inspect `shared/engine/src/utils/builders/config/buildSkillConfig.utils.ts`, `buildSkillGroupConfig.utils.ts`, `buildSkillDomainConfig.utils.ts`, and `validateSkillChildren.utils.ts`. Prefer their public exports from `@svitlo/engine/taxonomy` instead of copying builders into the textbook.
6. **Reference implementation (read-only example):** inspect the current Mathematics taxonomy in `learningApps/math/data/skills/`:
   - Root `index.ts` exports Domain Data only.
   - `geometry/geometry.data.ts` imports Group Data directly from `./<group>/<group>.data`.
   - `geometry/angles/angles.data.ts` imports Skills from `./skills`.
   - `geometry/angles/skills/index.ts` exports only immediate Skill Data.
   - There is no index file at a Domain or Group directory root.

**Canonical source destination:** `<PackageRoot>/data/skills/`, outside `src/` and relative to the textbook package root. The legacy `src/data/skillsTaxonomy/`, `*.ids.ts` and `index.ts` conventions must not be used for new implementations. Compare the Mathematics example with the live engine contracts.

Current contracts and [Skill](../../docs/entities/skill.md), [SkillGroup](../../docs/entities/skill-group.md), and [SkillDomain](../../docs/entities/skill-domain.md) definitions govern this workflow.

### Editorial actions and implementation status

For each current-template entity, `Action: skip|create|update|delete` describes a **separate generator instruction**; `Status: pending|implemented` describes the presently verified implementation state. Neither is a new runtime `Skill*_Config` property. These metadata fields are not instructions for this manual Coding Agent to create, update or delete files automatically. Scope and human approval are still required. In particular, never interpret `delete` as authorization for destructive changes or `Status: implemented` without verified Code. When explicitly commissioned to implement an entity despite `Action: skip`, reconcile the intended scope with the editor first.

The existing description importer cannot parse the new `Slug:`, `Action:`, and `Status:` lines. Do not run it on new-format Markdown until a separate tooling update is implemented and verified.

### Markdown → Code generator requirements

The [Markdown → Code generator](../../../scripts/implement-skills-taxonomy.mjs) performs dry-run by default, requires explicit apply, preserves existing entity UUIDs on every update, and validates the planned direct-composition graph before writing. `Action: delete` is a manual-only editorial marker. The generator has no deletion option or implementation: it emits `Manual deletion required` without altering Code or Status for that Domain. Never attempt a destructive workaround; carry out any approved deletion manually after checking references. The generator marks `Status: implemented` when Code files are created, but that status alone does not mean translations are complete or the entity is promoted. An English-only generated entity is an intermediate localization task; TypeScript must report the missing required keys until translators fill them. Leave failed entities pending and report individual outcomes; allow independent successful changes only when dependencies remain valid.

### Approved editorial slugs and Code paths

Use each new-template entity's approved `Slug: lowerCamelCase` for its own directory/file stem rather than recomputing identifiers from display names. The `<domainCamelCase>`, `<groupCamelCase>`, and `<skillCamelCase>` placeholders below refer to these approved slugs. Validate `^[a-z][A-Za-z0-9]*$` and textbook-wide slug uniqueness across all entity kinds before generating files.

A slug is a required `Skill*_Config.slug` property and must match the approved editorial slug and source filename. Keep existing UUIDs and Code paths stable. If an approved slug conflicts with an implemented path/identifier, stop for editorial resolution; do not silently rename files or reassign UUIDs. Treat slugless legacy entries as pending explicit migration.

### Direct and mixed Domain children

A Domain can embed Groups and direct Skills **at the same time**, or only one kind, but must not be empty. Group children live at `<domain>/<group>/<group>.data.ts`; direct Skills at `<domain>/skills/<skill>.data.ts`. A Group embeds its immediate Skill entities. Both `groups` and `skills` dictionaries contain the complete imported `*_Data` objects, **not** `.id` strings. No synthetic Group is required. Check all source registries and UI consumers for this topology.

## 1. STRICT TYPE AND ENTITY CONTRACT

Every runtime entity must be produced through its designated builder, using the real shared-engine types. Do not hand-author the `collection` discriminator or `fileLocation` (the latter is supplied by the source registry).

| Entity      | Authored configuration                            | Builder                  | Children                                       |
| ----------- | ------------------------------------------------- | ------------------------ | ---------------------------------------------- |
| Skill       | `slug`, `id`, `name`, `description`               | `buildSkillConfig`       | None                                           |
| SkillGroup  | `slug`, `id`, `name`, `skills`                    | `buildSkillGroupConfig`  | Complete immediate Skill entities              |
| SkillDomain | `slug`, `id`, `name`, `groups`, optional `skills` | `buildSkillDomainConfig` | Complete immediate Groups and/or direct Skills |

`Skill_Config` requires `description: { methodological: string; frontend: Readonly<Record<LanguageCode, string>> }`; descriptions on Group and Domain remain optional. For **legacy structured entries without `Slug:`, `Action:` or `Status:`**, [import-taxonomy-descriptions.mjs](../../../scripts/import-taxonomy-descriptions.mjs) can transfer descriptions to already existing Code after a successful dry-run. The current importer must not be used with new-template entries until parser compatibility is implemented and tested; preserve semantic equivalence and seek an approved implementation path in the meantime. It never translates or creates missing Code objects. The English `User-friendly description:` supplies `description.frontend.en` to Markdown → Code; it does not supply the remaining language keys. Those keys are added by a separate translation pass. A new or promoted entity **must** have `description.methodological`: a substantive, carefully edited **English** description faithful to the approved source text (translate without information loss when the staging taxonomy is in another language). This English text is for the Methodologist, Screenwriter and other agents; it may include useful conceptual distinctions, examples and caveats without becoming a lesson or assessment plan. `description.frontend` is **required on every Skill** with genuine translations for every supported language; Group/Domain frontend is optional but must be complete when present. Missing Skill frontend translations or methodological text blocks final promotion and runtime use, but do not block generating English-first Code drafts; no fallback. Builders enforce shape and completeness, not correctness of language/meaning. No mastery, grade, prerequisites, questions or learner state belong here.

- Match the names, identity, and **exact parent/child placements** approved in the taxonomy; no extra Domains, Groups, Skills, cross-domain duplicates, or synthetic groups.
- Respect the approved hierarchy: a grouped Domain references nonempty `groups`, while an ungrouped Domain uses `groups: {}` and nonempty direct `skills`. Both may coexist. Groups reference Skills through `skills`, and Skills have no children. Strongly discourage synthetic singleton Groups.
- Use stable, **literal UUID values**, owned by the entity's own `*.data.ts` file. Reuse existing UUIDs for existing identities. Generate fresh collision-free UUIDs **once** for genuinely new approved entities; never generate UUIDs during application runtime, derive them from paths, or reassign IDs during a rename/move.
- Embed complete immediate child Data objects in the parent, not just their IDs. Never copy or duplicate a child's UUID in its parent.
- Cross-check that every ID reference represents the intended immediate child and that there are no missing, duplicated, or unintended entities. **The current builders validate UUID syntax, duplicate values, and nonempty exclusive Domain membership (grouped or direct); they do not prove that a UUID belongs to the correct entity type, exists in a registry, or is globally unique.** Complete referential/type integrity is a separate **future build-time validation** responsibility. Use available static/file-level cross-checks now, but never claim the current builders enforce a full taxonomy graph.

## 2. REQUIRED DESTINATION AND FILE HIERARCHY

For the selected textbook package only:

```text
<PackageRoot>/
├── docs/
│   └── skills/
│       └── taxonomy.md                  # outstanding editorial staging, if any
└── data/
    └── skills/
        ├── index.ts                     # named Domain Data exports
        └── <domainCamelCase>/
            ├── <domainCamelCase>.data.ts # Domain config, UUID, child references
            └── <groupCamelCase>/
                ├── <groupCamelCase>.data.ts # Group config, UUID, child references
                └── skills/
                    ├── <skillCamelCase>.data.ts # Skill config, UUID
                    └── index.ts          # immediate Skill Data named exports
```

For an approved direct-Skill Domain, omit the Group directory and place its Skills in `<domainCamelCase>/skills/` with `skills/index.ts`. Both grouped and direct-Skill Domain Data import immediate child Data objects and embed the child objects themselves. **No `index.ts` exists in the Domain or Group directory root**. Do not create `*.ids.ts`, `index.ids.ts`, or `index.ts`.

Use approved lowerCamelCase slugs as directory and file stems; preserve old UUIDs on update and check collision-free UUIDs for new identities.

## 3. DIRECT COMPOSITION AND EXPORT BOUNDARIES

- **Root:** `data/skills/index.ts` exports only Domain Data from `./<domain>/<domain>.data`; no recursive descendants.
- **Domain:** `<domain>.data.ts` exports its own Domain and imports Group Data via direct paths `./<group>/<group>.data`; `groups` takes imported Group `.id` values. For a direct-Skill Domain, import from `./skills`, set `groups: {}` and populate `skills` from Skill `.id` values. **No Domain-level index.**
- **Group:** `<group>.data.ts` exports its own Group and imports immediate Skill Data through `./skills`; `skills` takes imported Skill `.id` values. **No Group-level index.**
- **Skills:** `<group>/skills/index.ts`, or `<domain>/skills/index.ts` for a direct-Skill Domain, exports immediate Skill Data only, with explicit named exports and no `export *`.
- **UUIDs:** each entity owns its original UUID literal in its own `*.data.ts`; do not reintroduce separate ID dictionaries, aliases or compatibility re-exports.

Import builders from `@svitlo/engine/taxonomy` where available. Verify actual package export/alias settings. The runtime application must consume published build outputs rather than directly importing authoring source Data.

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

1. **Inspect and reconcile:** read the approved editorial taxonomy, builder/contracts, language roster and current Math source tree. Plan exact file paths and direct-child membership.
2. **Preserve identity:** reuse existing `id` literals in `*.data.ts`; allocate a fresh UUID only for a genuinely new approved entity. Never replace an existing entity's UUID on update.
3. **Implement Skills:** write/update `<skill>.data.ts` using `buildSkillConfig`, reviewed English descriptions and own stable UUID; finish all required translations before promotion. Maintain `skills/index.ts` for immediate Skill exports only.
4. **Implement Groups:** write/update `<group>.data.ts` using `buildSkillGroupConfig`; import immediate Skills from `./skills` and embed the full Skill objects in `skills`. No Group-level index.
5. **Implement Domains:** write/update `<domain>.data.ts` using `buildSkillDomainConfig`; directly import Groups via `./<group>/<group>.data` or direct Skills via `./skills`. Embed complete child objects in `groups` and optional `skills`. No Domain-level index.
6. **Update root exports:** `data/skills/index.ts` uses named exports of Domain Data from `./<domain>/<domain>.data` only.
7. **Verify:** test UUID preservation, child membership, unresolved imports, paths, localization, TypeScript/build, index export boundaries and absence of obsolete ID index files. Do not equate builder validity with full referential integrity.
8. **Update staging links after approval and verification:** link promoted entities to their `*.data.ts` files, preserving editorial history and outstanding children.
9. **Stop:** report bounded changes and all unverified checks, without unrelated taxonomy or lesson work.

A partial implementation is not “complete” merely because its UUID or parent mapping exists. Only entities with valid `*.data.ts`, reachable direct source imports and scoped exports, complete name translations, mandatory all-locale Skill frontend (optional Group/Domain frontend), reviewed English methodological text and verified references count as **promoted**. Avoid generating empty Group/Domain placeholders that violate current reference validation; if a prerequisite child is missing, complete the approved dependencies within scope or report the blocker.

## 6. VERIFICATION / ACCEPTANCE GATES

Before reporting success, run the target package's available checks and add/fix focused tests where needed:

- **Type safety:** `Skill_Config` / `SkillGroup_Config` / `SkillDomain_Config` and builders accept all new configs; reviewed English `description.methodological` and mandatory fully localized Skill `description.frontend` (optional complete Group/Domain frontend); no invented fields; no TypeScript errors.
- **Localization:** each `name` has **exactly** the current required language-code keys (two-letter unquoted wherever legal), no gaps, duplicates, unexpected keys, empty/placeholder/copy-pasted language values.
- **Identity:** UUID syntax and stability; check uniqueness and immediate-child mappings against the in-scope files and approved hierarchy. The existing builders **cannot** resolve IDs to actual entity types/registrations; full repo-wide reference validation is deferred to a separate build-time script. Mark unverified items explicitly rather than claiming a builder-level guarantee.
- **Direct composition:** parent configurations import immediate child Data, embedding full entities without duplicated ID dictionaries or Domain-/Group-level indexes.
- **Export boundaries:** root `index.ts` exports Domains only; Domain and Group Data files each export their own entity; `skills/index.ts` exports immediate Skills. Verify imports resolve and no `export *` or recursive barrels appear. Adapt the structural checks exemplified by `learningApps/math/src/utils/builders/config/skillTaxonomyIndex.spec.ts`.
- **Topology:** physical paths and entries match the approved taxonomy and slugs (including textbook-wide slug uniqueness), with no accidental duplicate or missing entities. All non-placeholder taxonomy Code links resolve to matching implemented files and counts reconcile; the staging descriptions and approved hierarchy remain unchanged until separately verified promotion.
- **Tests:** run available package TypeScript, lint, builder, translation and index tests; cite commands/results. Run registry validation only if a real registry/test exists; `fileLocation` and global ID resolution remain separate planned infrastructure, not automatically finished by producing Data files. If tooling is unavailable, mark checks **not run**.

## RESULT / HANDOFF

Produce a reviewable code change that includes:

1. **Implementations** in `<PackageRoot>/data/skills/` following exactly the approved hierarchy and naming convention.
2. **Complete source files** for in-scope entities: `*.data.ts` with stable UUID literals, direct child imports, the root `index.ts`, and only necessary `skills/index.ts` exports; no Domain/Group indexes or duplicate UUID definitions.
3. **Fully translated names** for all required language keys in every new or changed Skill/Group/Domain; no shortcuts.
4. **Tests or updated verification** covering hierarchy integrity, UUID preservation, complete localization, valid direct imports and scoped exports.
5. **Updated Code links/counts** in `<PackageRoot>/docs/skills/taxonomy.md`, preserving its approved semantic descriptions, entity names and hierarchy. No redundant per-entity Markdown files.
6. **Concise completion report:** implemented Domains/Groups/Skills counts, paths, preserved/new IDs, verification commands and outcomes, unresolved items, and any necessary explicit migration notes.

**Scope boundary:** Do **not** move/copy the Math textbook's Mathematics taxonomy into another textbook automatically, change shared engine contracts, rewrite curriculum semantics, build a cross-textbook Skill registry, or refactor unrelated packages. Cross-textbook Skill identity synchronization is **out of scope for now**. Each textbook stays independently extractable with its own `data/skills`, depending only on explicit shared-engine contracts — no hidden coupling to another textbook's data tree.
