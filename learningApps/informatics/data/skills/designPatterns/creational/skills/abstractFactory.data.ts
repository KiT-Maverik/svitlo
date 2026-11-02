import { buildSkillConfig } from '@svitlo/engine/taxonomy';

export const abstractFactory_Skill_Data = buildSkillConfig({
  slug: "abstractFactory",
  id: "724c070d-5608-4b68-b197-99ac97d3a36a",
  name: {
    en: "Abstract Factory",
  },
  description: {
    methodological: "Use one factory to supply a compatible family of related products, such as interface elements for a particular platform, while hiding concrete types.",
    frontend: {
      en: "Use a factory that builds matching families of related objects.",
    },
  },
});
