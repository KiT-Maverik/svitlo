import { buildSkillConfig } from '@svitlo/engine/taxonomy';

export const waterContaminants_Skill_Data = buildSkillConfig({
  slug: "waterContaminants",
  id: "5d76deb2-0dd6-4756-a041-bc05e0b42e62",
  name: {
    en: "Water Contaminants",
  },
  description: {
    methodological: "Classify dissolved and particulate contaminants by chemical identity and behavior without assuming visible clarity proves safety.",
    frontend: {
      en: "Recognize different water contaminants without assuming clear water is safe.",
    },
  },
});
