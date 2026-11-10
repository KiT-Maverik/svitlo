# Engine entity configurators

`configurators/` houses the `define*` authoring factories and Zod-backed schemas. The former `definitions/` directory has been folded into this directory. Legacy Course creators live separately in `configurators_old/`.

The new Skill, SkillGroup, SkillDomain and AssessmentMethod factories intentionally use a minimal shape:

- `config.base` — non-localized fields such as `id`, `slug` and methodological description.
- `config.locales()` — localized fields such as names, titles and frontend descriptions.
- SkillGroup and SkillDomain configurators expose child configurators as slug-keyed `skill` and `group` maps.
- `*_Config_Schema` and `*_Props_Schema` validate the two representations.

All ten ContentBlock configurators now follow `defineText`: top-level identity (`id`, `slug`, `type`), nested `params` and `locale`, Zod-backed `*_Config_Schema` and `*_Props_Schema`, and `config.base` / `config.locales()` / `config.overrides` with per-block `override` and `disable` methods. A disabled ContentBlock deliberately replaces its parameter overrides with `{ disabled: true }`.

Checkpoint is a composite ContentBlock: authored child answers stay on the returned configurator's `items` rather than being serialized as raw child configs. Its indexed questions live in `locale.items`; the authored child answer list lives in `params.items` for validation. Publishing must resolve children and use index-safe base/locale merging (see TODO #436).

Section, Question, Lesson and Course factories still have outstanding migrations. Their current contract and the published JSON generators must not be assumed to share the ContentBlock runtime structure until those migrations are complete.
