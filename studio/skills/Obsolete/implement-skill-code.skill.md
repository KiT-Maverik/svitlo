> **OBSOLETE:** Superseded by [active implement-skill-code.skill.md](../skill-taxonomy-workflow/implement-skill-code.skill.md). Retained for historical reference; do not execute.

# Implement Skill Code Skill

**Mandatory first action:** Read [Coding Agent Persona](../../personas/coding-agent.persona.md) in full. Apply the repository's `AGENTS.md` and any package-local instructions. This is an implementation task: do not redesign the catalog, invent Skills, author curriculum, or implement assessment/learner tracking.

**Purpose:** Implement the **approved SkillDomain, SkillGroup, and Skill entries in the canonical Skills Taxonomy** as a strictly typed, localized, UUID-stable taxonomy for **one standalone textbook application**, preserving the precise editorial hierarchy (including approved direct Domain → Skill ownership) and separate lightweight Data/ID import surfaces.

## CROSS-CUTTING RULES

This implementation must also follow [Git-First Typed Content & AI Authoring](../../docs/architecture/git-first-typed-content.md) and [Internationalization & Inclusive Access](../../docs/architecture/internationalization-and-accessibility.md). Treat every `*.data.ts` entity as reviewed, **strictly typed named-export content**, avoid default exports and undocumented identity aliases, and do not confuse translation dictionaries or stable IDs with a fully registered runtime catalog. Inspect the live Engine types and full locale roster before implementation.

## REQUIRED SOURCES — READ BEFORE WRITING

1. **Target textbook:** identify the actual `<PackageRoot>` (the specific application package, not the monorepo root), the approved scope (one Skill, Group, Domain, or bounded batch), branch, and relevant repository instructions.
2. **Editorial authority:** read the **approved** `<PackageRoot>/docs/skills/taxonomy.md`, including each in-scope entity’s heading, substantive description, hierarchy position and Code link. This is the sole editorial source of truth; **no individual Markdown Definitions exist or are required**. Missing, ambiguous, unapproved or contradictory taxonomy entries are blockers; report them rather than inventing semantics or silently revising the taxonomy.
3. **Entity meanings:** read [SkillDomain](../../docs/entities/skill-domain.md), [SkillGroup](../../docs/entities/skill-group.md), and [Skill](../../docs/entities/skill.md). These are lightweight catalog categories, **not** assessment rubrics, learner results, or lessons.
4. **Authoritative TypeScript contracts in `+@svitlo/contracts`:** inspect the current files under `shared/contracts/src/types/content/` (import types via `+@svitlo/contracts/taxonomy`; engine builders are separate):
   - `skill.types.ts` — `SkillId`, `Skill_Config` and `Skill`.
   - `skillGroup.types.ts` — `SkillGroup_Config`, `skillIds`.
   - `skillDomain.types.ts` — `SkillDomain_Config`, required `groupIds` and optional direct `skillIds`.
   - `shared/contracts/src/types/languages.ts` — `LanguageCode`; verify the current supported-language list through the published localization contract.
5. **Authoritative builders:** inspect `shared/engine/src/utils/builders/config/buildSkillConfig.utils.ts`, `buildSkillGroupConfig.utils.ts`, `buildSkillDomainConfig.utils.ts`, and `validateSkillReferences.utils.ts`. Prefer their public exports from `@svitlo/engine/taxonomy` instead of copying builders into the textbook.
6. **Reference implementation (read-only example):** inspect the **existing Mathematics taxonomy** in `content/math/src/data/skillsTaxonomy/`, especially:
   - `index.ts` and `index.ids.ts`;
   - `arithmetic/arithmetic.data.ts`, `arithmetic/arithmetic.ids.ts`, `arithmetic/index.data.ts`, `arithmetic/index.ids.ts`;
   - `arithmetic/addition/addition.data.ts`, `addition.ids.ts`, `index.ts`;
   - `arithmetic/addition/skills/addMeaning.data.ts`, `index.ts`, `index.ids.ts`;
   - `content/math/src/utils/builders/config/skillTaxonomyIndex.spec.ts` and the taxonomy builder/translation tests.

**Distinguish the two paths:** Math textbook's `src/math/skillsTaxonomy/` is an **existing working reference**, not the destination for a new textbook. The canonical destination for this Skill is **`<PackageRoot>/src/data/skillsTaxonomy/`** (camelCase). Do not copy a stale playground import alias or modify the playground merely because it contains the examples. If a current shared-engine contract differs from a textbook example, the current contract wins; explain a material incompatibility.

Current contracts and the canonical [Skill](../../docs/entities/skill.md), [SkillGroup](../../docs/entities/skill-group.md) and [SkillDomain](../../docs/entities/skill-domain.md) rules govern this workflow. The historical conventions have been consolidated here; do not reintroduce obsolete directory layouts or locale counts.

### Direct-Skill Domains — mandatory compatibility gate

Before implementing a Domain with **zero Groups**, inspect and verify the `+@svitlo/contracts` `SkillDomain_Config`, the `@svitlo/engine` `buildSkillDomainConfig`, validation, **source registry and every downstream taxonomy index, exporter, loader and display/ancestry consumer**. The engine type and builder now permit `skillIds` with `groupIds: {}`, but this **does not prove** an existing textbook's grouped-only index, builder composition or UI supports direct Skills. Add focused tests for direct and grouped membership and for no mixed/empty Domain. Stop and report a blocker rather than generating a synthetic Group or falsely claiming end-to-end integration. No new Skill IDs may be invented to satisfy a directory layout.

**Direct Domain source layout:** place Skills under `<domainCamelCase>/skills/<skillCamelCase>.data.ts` and their UUIDs in the established ID-only surfaces for that Domain; the Domain's `index.ids.ts` maps direct **Skill IDs** instead of Group IDs. Keep the existing grouped layouts unchanged for Domains that have meaningful Groups. Confirm all generated imports and index exports obey the existing `Data` vs `IDs` conventions and translation completeness before shipping.

## 1. STRICT TYPE AND ENTITY CONTRACT

Every runtime entity must be produced through its designated builder, using the real shared-engine types. Do not hand-author the `collection` discriminator or `fileLocation` (the latter is supplied by the source registry).

| Entity      | Authored configuration                        | Builder                  | References                                                      |
| ----------- | --------------------------------------------- | ------------------------ | --------------------------------------------------------------- |
| Skill       | `id`, `name`                                  | `buildSkillConfig`       | None                                                            |
| SkillGroup  | `id`, `name`, `skillIds`                      | `buildSkillGroupConfig`  | Immediate child Skill IDs                                       |
| SkillDomain | `id`, `name`, `groupIds`, optional `skillIds` | `buildSkillDomainConfig` | Either immediate SkillGroup IDs or direct Skill IDs, never both |

The current contracts do **not** contain `description`. The explanatory prose in the permanent Markdown taxonomy is editorial; **never invent** a runtime field or copy a description into TypeScript without an approved engine contract change. Likewise, no mastery evidence, assessment rules, scores, learner records, grade, prerequisites, question references, or UI state belong to these configs.

- Match the names, identity, and **exact parent/child placements** approved in the taxonomy; no extra Domains, Groups, Skills, cross-domain duplicates, or synthetic groups.
- Respect the approved hierarchy: a grouped Domain references nonempty `groupIds`, while an ungrouped Domain uses `groupIds: {}` and nonempty direct `skillIds`. Never mix both. Groups reference Skills through `skillIds`, and Skills have no children. Strongly discourage synthetic singleton Groups.
- Use stable, **literal UUID values**, established at authoring time in `*.ids.ts` files. Reuse existing UUIDs for existing identities. Generate fresh collision-free UUIDs **once** for genuinely new approved entities; never generate UUIDs during application runtime, derive them from paths, or reassign IDs during a rename/move.
- Build explicit `as const` maps of child IDs and preserve stable meaning. Refer to **ID-only modules**, never child `*.data.ts` modules, when establishing relationships.
- Cross-check that every ID reference represents the intended immediate child and that there are no missing, duplicated, or unintended entities. **The current builders validate UUID syntax, duplicate values, and nonempty exclusive Domain membership (grouped or direct); they do not prove that a UUID belongs to the correct entity type, exists in a registry, or is globally unique.** Complete referential/type integrity is a separate **future build-time validation** responsibility. Use available static/file-level cross-checks now, but never claim the current builders enforce a full taxonomy graph.

## 2. REQUIRED DESTINATION AND FILE HIERARCHY

Create or extend only the selected taxonomy subtree in the **specific textbook package**:

```text
<PackageRoot>/
├── docs/
│   └── skills/
│       └── taxonomy.md                 # approved editorial hierarchy (existing)
└── src/
    └── data/
        └── skillsTaxonomy/
            ├── index.ts            # Domain Data exports ONLY
            ├── index.ids.ts             # Domain ID-only exports ONLY
            └── <domainCamelCase>/
                ├── <domainCamelCase>.data.ts    # Domain config
                ├── <domainCamelCase>.ids.ts     # Domain UUID
                ├── index.ts                # this Domain Data ONLY
                ├── index.ids.ts                 # immediate Group or direct Skill ID mapping (based on Domain mode)
                └── <groupCamelCase>/
                    ├── <groupCamelCase>.data.ts  # Group config
                    ├── <groupCamelCase>.ids.ts   # Group UUID
                    ├── index.ts             # this Group Data ONLY
                    ├── index.ids.ts              # Group UUID export; no Skill Data
                    └── skills/
                        ├── <skillCamelCase>.data.ts
                        ├── index.ts         # Skills in THIS Group ONLY
                        └── index.ids.ts          # Skill UUIDs in THIS Group ONLY
```

Repeat Domain, Group, and Skill directories strictly according to `docs/skills/taxonomy.md`. Names are **camelCase** directory and filename segments; entity Data files use `*.data.ts`, ID literals/maps use `*.ids.ts`, and two index surfaces are named `index.ts` / `index.ids.ts`.

The reference Mathematics tree has `index.ts` on every collection level, but some legacy Group directories have no `index.ids.ts`. **For new textbook output, create both `index.ts` and `index.ids.ts` at each level**, including Groups: the Group-level `index.ids.ts` is a named, ID-only re-export of its existing `<group>.ids.ts`, **not** a second UUID literal or a recursive aggregator. Reuse existing UUIDs, avoid duplicate ID definitions, and never re-export child Skill configurations. Root, Domain, and Skills ID indexes retain their distinct, direct-level responsibilities.

Use the target package's actual alias/export configuration for imports (`@svitlo/engine/taxonomy` for shared builders where available). Do not assume the reference textbook's `@/utils` alias applies in a different package. Avoid duplicating shared engine types or builders inside `src/data/`.

## 3. DATA VS ID MODULES — SEPARATE IMPORT SURFACES

**Reason for the split:** consumers frequently need a stable identifier without the translated config and its imports. An `*.ids.ts` module must be safe to import on its own: **no Data imports, no builder calls, no full entity initialization**, no deep/re-exported Data graphs. This keeps downstream dependency graphs small and decouples identity from display data. Do not claim bundle-size gains without measurement; enforce the static dependency boundary.

### Data barrels: own level only, never recursively flatten children

| File                                                   | It may export                       | It MUST NOT export                              |
| ------------------------------------------------------ | ----------------------------------- | ----------------------------------------------- |
| `skillsTaxonomy/index.data.ts`                         | Domain Data from each direct Domain | Group or Skill Data; recursive child `export *` |
| `skillsTaxonomy/<domain>/index.data.ts`                | That Domain Data                    | Any Group/Skill Data                            |
| `skillsTaxonomy/<domain>/<group>/index.data.ts`        | That Group Data                     | Any Skill or Domain Data                        |
| `skillsTaxonomy/<domain>/<group>/skills/index.data.ts` | This Group's individual Skill Data  | Group, Domain, or unrelated Group's Skills      |

Use explicit, named, locally scoped exports in stable/alphabetical order; no `export *`, recursive barrels, indirect export of nested Data, side-effect imports, or eager aggregation of the full taxonomy. Export **only the entity collection represented by that level**. Consumers obtain all Domains from the root Data barrel; obtain a particular Group via its own Group Data barrel; obtain the Skills belonging to a Group via that Group's Skills Data barrel. A **global list of all Group or Skill Data** is not silently supplied by the root barrel.

### ID-only indexes: immediate relationships, without Data

- Root `index.ids.ts` exposes **Domain ID dictionaries** by importing Domain `*.ids.ts` only.
- Domain `<domain>.ids.ts` contains its stable Domain UUID. Its `index.ids.ts` assembles a named `<domain>_SkillGroups_Ids` map of **immediate** Group UUIDs, importing Group `*.ids.ts` only; it does not aggregate Skills.
- Group `<group>.ids.ts` contains its stable Group UUID. The Group-level `index.ids.ts` **re-exports only that Group's ID object**, not child Data, child IDs, or transitive descendants. Its Group Data imports Skill IDs directly from `skills/index.ids.ts`.
- `<group>/skills/index.ids.ts` holds the static UUID literals for that Group's **direct Skills** as one typed/read-only dictionary (`as const`). There is no need for a separate `*.ids.ts` for every individual Skill.
- The Group's `*.data.ts` imports `skillIds` from its own `skills/index.ids.ts`. The Domain's `*.data.ts` imports `groupIds` from its own `index.ids.ts`. Neither imports child Data merely to extract an ID.

The distinction is deliberate: **Data barrels are same-level**, while an **ID mapping may contain immediate child IDs** to express group/domain membership. “One level” means no recursive aggregation of descendant Data **or** ID catalogs; a Domain never collects grandchildren Skills and the root never collects nested Group/Skill Data. Direct consumers can import a dedicated ID module without importing a full localized config.

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

1. **Inspect and reconcile:** read the approved editorial taxonomy (including authoritative descriptions), type/builder contracts, **full current supported language set**, reference Mathematics tree and existing target code. Produce an exact in-scope file/ID plan. The taxonomy is the **permanent editorial source of truth**, not a runtime registry; do not couple the application to reading it at runtime. Never mutate another textbook to satisfy this one.
2. **Reserve identity:** create/reuse Skill UUID literals in the Group's `skills/index.ids.ts`, Group UUID in `<group>.ids.ts`, Domain UUID in `<domain>.ids.ts`. Check uniqueness against the target package; preserve established identifiers.
3. **Implement Skill Data:** write one `<skill>.data.ts` per approved Skill with `buildSkillConfig`, its ID-only import, and full `name` dictionary. Update the local `skills/index.data.ts` with **only the Group's Skill Data**.
4. **Implement Group Data:** create/update `<group>.data.ts` with `buildSkillGroupConfig`, full `name`, own UUID, and exact `skillIds` from its `skills/index.ids.ts`. Maintain `<group>/index.data.ts` as **Group Data only** and `<group>/index.ids.ts` as the **Group UUID-only** re-export.
5. **Implement Domain Data:** create/update `<domain>/index.ids.ts` with the direct Groups' UUIDs only; build `<domain>.data.ts` using `buildSkillDomainConfig` with full `name`, own UUID, and exact `groupIds`. Keep `<domain>/index.data.ts` **Domain Data only**.
6. **Complete root indexes:** update root `index.ts` to export the selected Domain Data entries and root `index.ids.ts` to export Domain ID dictionaries. Do not aggregate nested Group/Skill Data into the root.
7. **Verify what is currently possible:** cross-check taxonomy names against source paths and immediate-child ID maps, duplicate/missing IDs, wrong-level exports, circular dependencies, dynamic UUID generation, and translations. Report any unverified cross-file identity/registration requirements as **pending build-time integrity checks**; do not misattribute them to current TypeScript builders.
8. **Update taxonomy implementation links only after verified implementation:** replace the entity's single standalone Markdown link in `<PackageRoot>/docs/skills/taxonomy.md` with a relative link to its actual `*.data.ts` file. The visible link text must be the **complete file basename, including every suffix and the `.ts` extension** (for example, `[addition.data.ts](%VERIFIED_RELATIVE_PATH%)`); do not prefix the link with `Code:`. Recompute only the **Code files** counts. Preserve headings, descriptions, hierarchy and all other implementation links. **Never create or update individual Markdown Definition files.** An unverified/partial implementation retains exactly `[Not implemented](#)`.
9. **Stop:** report only the bounded task, validations, and anything incomplete. Do not proceed to unrelated Domains, lessons, question generation, or assessment.

A partial implementation is not “complete” merely because its UUID or parent mapping exists. Only entities with valid `*.data.ts`, reachable own-level Data exports, complete translations, and verified references count as implemented. Avoid generating empty Group/Domain placeholders that violate current reference validation; if a prerequisite child is missing, complete the approved dependencies within scope or report the blocker.

## 6. VERIFICATION / ACCEPTANCE GATES

Before reporting success, run the target package's available checks and add/fix focused tests where needed:

- **Type safety:** `Skill_Config` / `SkillGroup_Config` / `SkillDomain_Config` and builders accept all new configs; no unsupported `description` or invented fields; no TypeScript errors.
- **Localization:** each `name` has **exactly** the current required language-code keys (two-letter unquoted wherever legal), no gaps, duplicates, unexpected keys, empty/placeholder/copy-pasted language values.
- **Identity:** UUID syntax and stability; check uniqueness and immediate-child mappings against the in-scope files and approved hierarchy. The existing builders **cannot** resolve IDs to actual entity types/registrations; full repo-wide reference validation is deferred to a separate build-time script. Mark unverified items explicitly rather than claiming a builder-level guarantee.
- **Data/IDs isolation:** `*.ids.ts` modules never import Data or builders; importing a parent Data config does not require importing child Data solely to access child IDs.
- **Export boundaries:** root Data exports Domains only, Domain Data exports its own Domain only, Group Data exports its Group only, Skills Data exports only that Group's Skills. Verify no nested/re-exported Data from higher levels and no `export *`. Adapt the structural checks exemplified by `content/math/src/utils/builders/config/skillTaxonomyIndex.spec.ts`.
- **Topology:** physical paths and entries match the approved taxonomy, with no accidental duplicate or missing entities. All non-placeholder taxonomy Code links resolve to matching implemented files and counts reconcile; the permanent descriptions and approved hierarchy remain unchanged.
- **Tests:** run available package TypeScript, lint, builder, translation and index tests; cite commands/results. Run registry validation only if a real registry/test exists; `fileLocation` and global ID resolution remain separate planned infrastructure, not automatically finished by producing Data files. If tooling is unavailable, mark checks **not run**.

## RESULT / HANDOFF

Produce a reviewable code change that includes:

1. **Implementations** in `<PackageRoot>/src/data/skillsTaxonomy/` following exactly the approved hierarchy and naming convention.
2. **Complete source files** for in-scope entities: `*.data.ts`, stable `*.ids.ts` / child ID dictionaries, and correctly scoped `index.ts` / `index.ids.ts` at **every** level, with no duplicated UUID values.
3. **Fully translated names** for all required language keys in every new or changed Skill/Group/Domain; no shortcuts.
4. **Tests or updated verification** covering hierarchy integrity, ID reference independence, complete localization and shallow barrel exports.
5. **Updated Code links/counts** in `<PackageRoot>/docs/skills/taxonomy.md`, preserving its approved semantic descriptions, entity names and hierarchy. No redundant per-entity Markdown files.
6. **Concise completion report:** implemented Domains/Groups/Skills counts, paths, preserved/new IDs, verification commands and outcomes, unresolved items, and any necessary explicit migration notes.

**Scope boundary:** Do **not** move/copy the Math textbook's Mathematics taxonomy into another textbook automatically, change shared engine contracts, rewrite curriculum semantics, build a cross-textbook Skill registry, or refactor unrelated packages. Cross-textbook Skill identity synchronization is **out of scope for now**. Each textbook stays independently extractable with its own `src/data/skillsTaxonomy`, depending only on explicit shared-engine contracts — no hidden coupling to another textbook's data tree.
