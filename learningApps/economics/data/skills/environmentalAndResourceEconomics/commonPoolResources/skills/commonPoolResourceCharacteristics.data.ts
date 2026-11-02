import { buildSkillConfig } from '@svitlo/engine/taxonomy';

export const commonPoolResourceCharacteristics_Skill_Data = buildSkillConfig({
  slug: "commonPoolResourceCharacteristics",
  id: "5109775f-ea3f-4c86-a8a9-eed76e5d559a",
  name: {
    en: "Ресурси спільного користування",
  },
  description: {
    methodological: "Identify shared-access resources where use by one participant reduces availability to others.",
    frontend: {
      en: "Recognize resources that become scarcer when many people use them.",
    },
  },
});
