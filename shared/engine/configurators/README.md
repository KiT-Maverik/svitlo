# Engine entity configurators

`configurators/` houses the `define*` authoring factories and Zod-backed schemas. The former `definitions/` directory has been folded into this directory. Legacy Course creators live separately in `configurators_old/`.

The new Skill, SkillGroup, SkillDomain and AssessmentMethod factories intentionally use a minimal shape:

- `config.base` — non-localized fields such as `id`, `slug` and methodological description.
- `config.locales()` — localized fields such as names, titles and frontend descriptions.
- SkillGroup and SkillDomain configurators expose child configurators as slug-keyed `skill` and `group` maps.
- `*_Config_Schema` and `*_Props_Schema` validate the two representations.

All ten ContentBlock configurators now follow `defineText`: top-level identity (`id`, `slug`, `type`), nested `params` and `locale`, Zod-backed `*_Config_Schema` and `*_Props_Schema`, and `config.base` / `config.locales()` / `config.overrides` with per-block `override` and `disable` methods. A disabled ContentBlock deliberately replaces its parameter overrides with `{ disabled: true }`.

Checkpoint uses an explicitly ordered, slug-keyed collection: `content.items` maps unique camelCase slugs to `{ question, answer, check? }` and required `content.order` lists every slug exactly once. The Zod schema validates keys, duplicates, missing entries and unknown references. `defineCheckpoint` preserves literal item keys and constrains the `order` entries for TypeScript autocomplete. Checkpoint-wide behavior remains in `params`, localized block title in `locale`. Authoring-time child configurators remain in the returned `content` outside `config.base`; the generator must publish the question text and resolved answers by slug. Runtime adaptation and the broader array-localization design of issue #436 are separate follow-ups.

Section, Question, Lesson and Course factories still have outstanding migrations. Their current contract and the published JSON generators must not be assumed to share the ContentBlock runtime structure until those migrations are complete.
