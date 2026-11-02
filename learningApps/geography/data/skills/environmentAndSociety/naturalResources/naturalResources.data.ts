import { buildSkillGroupConfig } from '@svitlo/engine/taxonomy';

import { explainReplenishmentAndDepletionOfNaturalResources_Skill_Data, explainWhatMakesSomethingANaturalResource_Skill_Data } from './skills';

export const naturalResources_SkillGroup_Data = buildSkillGroupConfig({
  slug: "naturalResources",
  id: "483835d0-db41-4528-b06a-05cb1953d915",
  name: {
    en: "Natural Resources",
  },
  skills: {
    explainReplenishmentAndDepletionOfNaturalResources: explainReplenishmentAndDepletionOfNaturalResources_Skill_Data,
    explainWhatMakesSomethingANaturalResource: explainWhatMakesSomethingANaturalResource_Skill_Data,
  },
  description: {
    methodological: "A natural resource is a material, stock or flow valued for human use, and availability depends on formation, replenishment, accessibility and demand. Geographic classifications should not equate renewable with inexhaustible or any deposit with a commercially recoverable resource.",
    frontend: {
      en: "Learn what makes materials and natural processes valuable resources for people.",
    },
  },
});
