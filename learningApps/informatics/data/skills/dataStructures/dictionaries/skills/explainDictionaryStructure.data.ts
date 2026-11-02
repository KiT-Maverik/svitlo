import { buildSkillConfig } from '@svitlo/engine/taxonomy';

export const explainDictionaryStructure_Skill_Data = buildSkillConfig({
  slug: "explainDictionaryStructure",
  id: "b6e8bf86-54ec-4a63-bae9-643a63bacf1c",
  name: {
    en: "Explain Dictionary Structure",
  },
  description: {
    methodological: "A dictionary maps keys to values; keys need not be numeric or correspond to array positions.",
    frontend: {
      en: "Understand how a dictionary retrieves information by key rather than position.",
    },
  },
});
