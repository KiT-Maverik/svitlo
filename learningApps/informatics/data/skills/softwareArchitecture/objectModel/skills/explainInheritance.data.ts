import { buildSkillConfig } from '@svitlo/engine/taxonomy';

export const explainInheritance_Skill_Data = buildSkillConfig({
  slug: "explainInheritance",
  id: "4ab219a6-3b8f-4d43-912d-96faa16016b2",
  name: {
    en: "Explain Inheritance",
  },
  description: {
    methodological: "Explain relationships between base and derived types, where a derived type inherits defined properties or operations and may specialize them. Inheritance denotes an 'is a kind of' relationship, not a 'contains a part' relationship.",
    frontend: {
      en: "Explain how a specialized class can inherit behavior from a broader class.",
    },
  },
});
