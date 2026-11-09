# Engine entity configurators

`configurators/` houses the `define*` authoring factories and Zod-backed schemas. The former `definitions/` directory has been folded into this directory. Legacy Course creators live separately in `configurators_old/`.

The new Skill, SkillGroup, SkillDomain and AssessmentMethod factories intentionally use a minimal shape:

- `config.base` — non-localized fields such as `id`, `slug` and methodological description.
- `config.locales()` — localized fields such as names, titles and frontend descriptions.
- SkillGroup and SkillDomain configurators expose child configurators as slug-keyed `skill` and `group` maps.
- `*_Config_Schema` and `*_Props_Schema` validate the two representations.

Other existing ContentBlock, Section, Question, Lesson and Course factories still implement the earlier `Definition` shape, including test/override methods. This PR does not migrate those factories or the published JSON generators; consumers must use each concrete configurator's API rather than assuming a uniform runtime shape.
